import { useEffect, useState } from "react";

const TIEMPO = 25;

/**
 * Componente que muestra el detalle de un curso y permite marcarlo como completado.
 * Recibe el curso seleccionado, si ya está completado, una función para marcarlo como completado y un estado de guardado.
 */
function CursoDetalle({ curso, completado, onCompletar, guardando }) {
  const [segundos, setSegundos] = useState(TIEMPO);

  useEffect(() => {
    if (!curso) return;

    setSegundos(TIEMPO);

    // Inicia el conteo regresivo
    const interval = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Limpia el intervalo al desmontar o cambiar de curso
    return () => clearInterval(interval);
  }, [curso]);

  if (!curso) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        No hay curso seleccionado
      </div>
    );
  }

//   El curso está bloqueado si aún quedan segundos o si ya se completó
  const bloqueado = segundos > 0 || completado;

  return (
    <div className="rounded-xl mi-header-p">
      <div className="flex gap-2">
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          {curso.categoria}
        </span>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          Parte {curso.parte}
        </span>
      </div>

      <h2 className="text-xl font-bold">{curso.nombre}</h2>

      <p className="text-gray-600">{curso.descripcion}</p>

      {curso.imagen_url && (
        <img
          src={curso.imagen_url}
          alt=""
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      <div className="bg-gray-100 p-4 rounded whitespace-pre-line">
        {curso.contenido}
      </div>

      {!completado && segundos > 0 && (
        <p className="text-orange-600">
          Espera {segundos}s para continuar
        </p>
      )}

      {completado && (
        <p className="text-green-600">Curso completado</p>
      )}

      <button
        onClick={onCompletar}
        disabled={bloqueado || guardando}
        className={`px-4 py-2 rounded text-white
          ${
            bloqueado
              ? "bg-indigo-300"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
      >
        {guardando
          ? "Guardando..."
          : completado
          ? "Completado"
          : "Marcar como completado"}
      </button>
    </div>
  );
}

export default CursoDetalle;