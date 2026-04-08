import "../../../style/efectos.css";


/**
 * Componente que representa una tarjeta para registrar una emoción. 
 * Muestra el nombre de la emoción, su definición y sus síntomas.
 * Permite seleccionar la emoción para añadirla a la lista de emociones seleccionadas.
 * El borde de la tarjeta cambia de color según la emoción seleccionada.
 * @param {*} param0 
 * @returns 
 */
export default function CardEmocion({
  emocion,
  emocionesSeleccionadas,
  setEmocionesSeleccionadas
}) {

  const borderClass =
    emocionesSeleccionadas.length === 0
      ? `border-${emocion.nombre.toLowerCase()}`
      : `border-${emocionesSeleccionadas[0]?.nombre.toLowerCase()}`;

  return (
    <article className={`col-span-6 lg:col-span-4 efecto-ampliar min-h-80 rounded-2xl mi-header hover:shadow-2xl cursor-pointer mb-8 p-5 flex flex-col gap-4 transition-all duration-300 ${borderClass}`}
      onClick={() =>
        setEmocionesSeleccionadas((prev) => [...prev, emocion])
      }
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-800 leading-tight">
          {emocion.nombre}
        </h3>
      </div>

      {/* Definición */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Definición
        </p>
        <p className="text-sm leading-6 text-slate-700 line-clamp-4">
          {emocion.definicion}
        </p>
      </div>

      {/* Separador */}
      <div className="h-px w-full bg-slate-200" />

      {/* Síntomas */}
      <div className="flex flex-col gap-2 mt-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Síntomas
        </p>

        <ul className="space-y-2 text-sm text-slate-700">
          {emocion.sintomas.split(";").map((sintoma, index) => {
            const formattedSintoma = sintoma.trim();
            return (
              <li key={index} className="flex items-start gap-2 leading-5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                <span>
                  {formattedSintoma.charAt(0).toUpperCase() + formattedSintoma.slice(1)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
