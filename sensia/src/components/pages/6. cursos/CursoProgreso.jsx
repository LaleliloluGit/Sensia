
/**
 * Componente que muestra el progreso del usuario en la realización de cursos.
 * Calcula el porcentaje de cursos completados y lo muestra en una barra de progreso.
 * @param {*} param0 
 * @returns 
 */
export default function CursoProgreso({ total, completados }) {
  // Calcula el porcentaje de cursos completados
  const porcentaje = total ? Math.round((completados / total) * 100) : 0;

  return (
    <div className="rounded-xl mi-header-p">
      <h3 className="font-semibold text-lg">Tu progreso</h3>

      <p className="text-sm text-gray-500 mb-2">
        {completados} de {total} cursos completados
      </p>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-indigo-500 h-2 rounded-full"
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-2">{porcentaje}% completado</p>
    </div>
  );
}
