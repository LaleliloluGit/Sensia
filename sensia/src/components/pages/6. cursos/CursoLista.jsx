
/**
 * Componente que muestra una lista de cursos.
 * Recibe los cursos disponibles, el ID del curso activo, los cursos completados y una función para seleccionar un curso.
 * Marca de color el curso activo y muestra un ícono de check para los cursos completados.
 * @param {*} param0 
 * @returns 
 */
export default function CursoLista({
  cursos,
  cursoActivoId,
  cursosCompletados,
  onSeleccionarCurso,
}) {
  return (
    <div className="rounded-xl mi-header-p">
      <h3 className="font-semibold mb-3">Cursos</h3>

      <div className="space-y-2">
        {cursos.map((curso) => {
          const activo = curso.id === cursoActivoId;
          const completado = cursosCompletados.includes(curso.id);

          return (
            <button
              key={curso.id}
              onClick={() => onSeleccionarCurso(curso)}
              className={`w-full text-left px-0 mx-0 rounded-lg border transition
                ${
                  activo
                    ? "bg-indigo-500 border-indigo-500"
                    : "bg-red-500 hover:bg-gray-50"
                }`}
            >
              <div className="flex justify-between items-center ">
                <div className="flex justify-center items-center">
                  <p className="text-sm opacity-70 ">
                    {curso.categoria.toUpperCase()[0] + curso.categoria.slice(1) }
                  </p>
                  <p className="text-sm opacity-70">
                    - {curso.parte}/3
                  </p>
                </div>

                <span className="ml-3">
                  {completado ? "✅" : "📘"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
