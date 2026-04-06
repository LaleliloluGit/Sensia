import { useEffect, useState } from "react";
import CursoLista from "./CursoLista";
import CursoDetalle from "./CursoDetalle";
import ProgresoCursos from "./ProgresoCurso";
import HeaderComponent from "../../common/HeaderComponent";

/**
 * Componente principal para la sección de cursos.
 * Carga la lista de cursos disponibles y el progreso del usuario, y permite marcar cursos como completados.
 * Utiliza el estado local para gestionar la lista de cursos, el curso activo, los cursos completados y los errores.
 * Al montar el componente, se realiza una solicitud al backend para obtener la lista de cursos y el 
 * progreso del usuario, y se actualiza el estado en consecuencia.
 * @returns 
 */
function CursosPage() {
  const [cursos, setCursos] = useState([]);
  const [cursoActivo, setCursoActivo] = useState(null);
  const [cursosCompletados, setCursosCompletados] = useState([]);
  const [error, setError] = useState("");

  // Cargar cursos y progreso del usuario al montar el componente
  useEffect(() => {

    const cargarDatos = async () => {

      try {
        // Limpiar errores previos
        setError("");

        // 1. Cargar todos los cursos
        const resCursos = await fetch("http://localhost:3000/Sensia/cursos/todos");
        const cursosData = await resCursos.json();
        
        // 2. Guardar cursos en estado
        setCursos(cursosData);
        
        // 3. Si no hay cursos, no seleccionar ninguno
        if (!cursosData.length) {
          setCursoActivo(null);
          return;
        }
        
        // 4. Si hay cursos, cargar progreso del usuario
        const usuario = JSON.parse(sessionStorage.getItem("usuario"));
        if (!usuario?.id) {
          setCursoActivo(cursosData[0]);
          return;
        }
        const resCursosCompletados = await fetch(
          `http://localhost:3000/Sensia/registros_cursos/usuario_id/${usuario.id}`
        );
        const cursosCompletadosData = await resCursosCompletados.json();

        // 5. Extraer IDs de cursos completados y actualizar estado
        const completados = cursosCompletadosData.map((registro) => registro.curso_id);
        setCursosCompletados(completados);

        // 6. Seleccionar el primer curso no completado
        const siguienteCurso = cursosData.find(
          (curso) => !completados.includes(curso.id)
        );

        // 7. Actualizar curso activo
        setCursoActivo(siguienteCurso || cursosData[0]);
      } catch (err) {
        setError("Error cargando cursos: " + err.message);
      }
    };

    cargarDatos();
  }, []);

  /**
   * Funcion para marcar un curso como completado. 
   * Envía una solicitud al backend para guardar el progreso del usuario y luego actualiza el estado local 
   * para reflejar el cambio.
   * @returns 
   */
  const handleCompletarCurso = async () => {
    try {
  
      const usuario = JSON.parse(sessionStorage.getItem("usuario"));
      if (!usuario?.id || !cursoActivo) return;

      // Enviar solicitud al backend para guardar el progreso del curso
      await fetch("http://localhost:3000/Sensia/registros_cursos/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: usuario.id,
          curso_id: cursoActivo.id,
          fecha: new Date().toISOString(),
        }),
      });

      // Actualizar estado local para reflejar el curso completado
      const nuevosCompletados = [...cursosCompletados, cursoActivo.id];
      setCursosCompletados(nuevosCompletados);

      // Seleccionar el siguiente curso no completado
      const siguienteCurso = cursos.find(
        (curso) => !nuevosCompletados.includes(curso.id)
      );
      
      if (siguienteCurso) {
        setCursoActivo(siguienteCurso);
      }
    } catch (err) {
      setError("Error guardando progreso: " + err.message);
    }
  };

  return (
    <div className="p-6 min-h-screen max-w-7xl mx-auto">
      <HeaderComponent h1="Cursos" h2="Realiza los cursos de Sensia para conocer mas sobre las emociones y los sentimientos" />

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-6">
          <ProgresoCursos
            total={cursos.length}
            completados={cursosCompletados.length}
          />

          <CursoLista
            cursos={cursos}
            cursoActivoId={cursoActivo?.id}
            cursosCompletados={cursosCompletados}
            onSeleccionarCurso={setCursoActivo}
          />
        </div>

        <CursoDetalle
          curso={cursoActivo}
          completado={
            cursoActivo ? cursosCompletados.includes(cursoActivo.id) : false
          }
          onCompletar={handleCompletarCurso}
        />
      </div>
    </div>
  );
}

export default CursosPage;