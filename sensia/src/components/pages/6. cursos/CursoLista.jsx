
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
              className={`w-full text-left p-3 rounded-lg border transition
                ${
                  activo
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-white hover:bg-gray-50"
                }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{curso.nombre}</p>
                  <p className="text-xs opacity-70">
                    {curso.categoria} - Parte {curso.parte}
                  </p>
                </div>

                <span>
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
