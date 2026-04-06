import { useLocation, useNavigate } from "react-router-dom";


/**
 * Componente para mostrar el resultado del test de alexitimia.
 * Recibe la puntuación total y el nivel de alexitimia a través del estado de la ubicación (location.state) después de completar el test.
 * Si no se encuentran los datos necesarios, muestra un mensaje de error y un botón para volver al test.
 * Si los datos están disponibles, muestra la puntuación total, el nivel identificado, una barra de puntuación visual y una descripción detallada del resultado.
 * Incluye también un aviso de que el resultado es orientativo y no sustituye una evaluación profesional, y ofrece opciones para repetir el test o volver al inicio.
 * @returns 
 */
export default function ResultadoTest() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extraemos la puntuación total y el nivel de alexitimia del estado de la ubicación
  const { puntuacionTotal, nivelAlexitimia } = location.state || {};

  if (!nivelAlexitimia) {
    return (
      <div className="z-10 w-screen grid grid-cols-12 relative px-6 md:px-8">
        <div className="col-span-12 max-w-4xl mx-auto w-full bg-[#ffffffbb] rounded-2xl shadow-lg border border-gray-200 px-6 py-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Resultado no disponible</h2>
          <p className="text-lg text-gray-700 mb-6">
            No se han encontrado los datos del resultado.
          </p>

          <button
            onClick={() => navigate("/sensia/test_alexitimia")}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition font-medium shadow"
          >
            Ir al test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="z-10 w-screen grid grid-cols-12 relative mt-6 px-6 md:px-8 pb-16 pr-8">
      <h2 className="col-span-12 text-center text-3xl md:text-4xl font-bold mb-6">
        Resultado del Test de Alexitimia
      </h2>

      <div className="col-span-12 max-w-7xl mx-auto w-full bg-[#ffffffbb] rounded-2xl shadow-lg border border-gray-200 px-6 py-8 md:p-10 pr-18">
        {/* Puntuación y nivel */}
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            Tu puntuación total
          </p>

          <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            {puntuacionTotal}
          </p>

          <div className="inline-block bg-blue-50 border border-blue-200 rounded-2xl px-5 py-3">
            <p className="text-sm md:text-base text-gray-500 mb-1">
              Nivel identificado
            </p>

            <p className="text-xl md:text-2xl font-semibold text-gray-800">
              {nivelAlexitimia.nivel}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Rango orientativo: {nivelAlexitimia.rango_minimo} - {nivelAlexitimia.rango_maximo}
            </p>
          </div>
        </div>

        {/* Barra de puntuación */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all"
              style={{ width: `${puntuacionTotal}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Puntuación dentro de la escala general del test
          </p>
        </div>

        {/* Descripción desde BBDD */}
        <section className="mb-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 border-b pb-2">
            ¿Qué significa este resultado?
          </h3>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 md:p-6">
            <p className="text-base md:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
              {nivelAlexitimia.descripcion}
            </p>
          </div>
        </section>

        {/* Aviso */}
        <section className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 md:p-6">
            <p className="text-lg md:text-base text-gray-700 leading-relaxed">
              Este resultado es orientativo y no sustituye una evaluación psicológica profesional.
              Puede servir como punto de partida para reflexionar sobre tu forma de identificar,
              comprender y expresar emociones.
            </p>
          </div>
        </section>

        {/* Botones */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/sensia/alexithimia_test")}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-medium"
          >
            Repetir test
          </button>

          <button
            onClick={() => navigate("/sensia")}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition font-medium shadow"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}