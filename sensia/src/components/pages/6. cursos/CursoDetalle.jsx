import { useEffect, useState } from "react";

const TIEMPO = 25

export default function CursoDetalle({ curso, completado, onCompletar, guardando }) {
  const [segundos, setSegundos] = useState(TIEMPO);

  useEffect(() => {
    if (!curso) return;

    setSegundos(TIEMPO);

    const interval = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [curso]);

  if (!curso) {
    return (
      <div className="mi-header-p rounded-3xl p-10 text-center text-gray-500">
        No hay curso seleccionado
      </div>
    );
  }

  const bloqueado = segundos > 0 || completado;

  return (
    <section className="mi-header-p rounded-3xl p-8 md:p-10 shadow-sm border border-white/60">
      <div className="flex flex-col gap-8">

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white/70 border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700">
            {curso.categoria}
          </span>

          <span className="rounded-full bg-white/70 border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700">
            Parte {curso.parte}
          </span>

          {completado && (
            <span className="rounded-full bg-green-50 border border-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
              Completado
            </span>
          )}
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
            {curso.nombre}
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            {curso.descripcion}
          </p>
        </div>

        {curso.imagen_url && (
          <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
            <img
              src={curso.imagen_url}
              alt={curso.nombre}
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>
        )}

        <div className="rounded-3xl bg-white/70 border border-gray-100 p-6 md:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Contenido del curso
          </h3>

          <p className="whitespace-pre-line text-gray-700 leading-8">
            {curso.contenido}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl bg-white/50 border border-gray-100 p-5">
          <div>
            {!completado && segundos > 0 && (
              <p className="text-gray-700 font-medium">
                Podrás continuar en{" "}
                <span className="font-bold">{segundos}s</span>
              </p>
            )}

            {!completado && segundos === 0 && (
              <p className="text-gray-700 font-medium">
                Ya puedes marcar este curso como completado.
              </p>
            )}

            {completado && (
              <p className="text-green-700 font-medium">
                Curso completado correctamente.
              </p>
            )}
          </div>

          <button
            onClick={onCompletar}
            disabled={bloqueado || guardando}
            className={`px-6 py-3 rounded-xl font-bold transition shadow-sm ${
              bloqueado || guardando
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-900 hover:-translate-y-0.5"
            }`}
          >
            {guardando
              ? "Guardando..."
              : completado
              ? "Completado"
              : "Marcar como completado"}
          </button>
        </div>
      </div>
    </section>
  );
}