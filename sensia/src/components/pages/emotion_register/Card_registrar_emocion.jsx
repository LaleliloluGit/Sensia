import "../../../style/efectos.css";

function Card_registrar_emocion({
  emocion,
  emocionesSeleccionadas,
  setEmocionesSeleccionadas
}) {







  return (
    <div
      onClick={() =>
        setEmocionesSeleccionadas(prev => [...prev, emocion])
      }
      className={`col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2
      efecto-ampliar
      ${emocionesSeleccionadas.length === 0
          ? `bg-${emocion.nombre.toLowerCase()}`
          : `bg-${emocionesSeleccionadas[0]?.nombre.toLowerCase()}`}
      min-h-140 border border-gray-500 rounded-lg cursor-pointer shadow-xl
      m-6 p-6 px-4 text-lg
      flex flex-col`}
    >

      {/* Título */}
      <p className="text-xl h-8 mx-auto font-bold">
        {emocion.nombre}
      </p>

      {/* Definición */}
      <p className="mt-10 h-35 overflow-hidden">
        {emocion.definicion}
      </p>

      {/* Síntomas */}
      <div className="mt-10 flex flex-col gap-1">
        <p>Sintomas:</p>
        {emocion.sintomas.split(";").map((sintoma, index) => {
          const formattedSintoma = sintoma.trim();
          return (
            <p key={index}>• {formattedSintoma.charAt(0).toUpperCase() + formattedSintoma.slice(1)}</p>
          )
        })}
      </div>

    </div>
  )
}

export default Card_registrar_emocion