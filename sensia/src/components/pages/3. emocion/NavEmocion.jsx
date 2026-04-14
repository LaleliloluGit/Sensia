

/**
 * Componente que muestra el encabezado para las emociones seleccionadas.
 * Muestra las emociones seleccionadas como un camino navegable y el título y subtítulo del registro de emociones.
 * @param {*} param0 
 * @returns 
 */
export default function NavEmocion({ emocionesSeleccionadas, setEmocionesSeleccionadas }) {
  return (
    <div className="col-span-12">
      {emocionesSeleccionadas.length > 0 && (

        <div className="col-span-12 flex flex-wrap cursor-pointer ml-6 text-gray-500 mb-4">

          {emocionesSeleccionadas.map((emocion, index) => (

            <div key={emocion.nombre} className="flex items-center">

              <p
                onClick={() => {
                  setEmocionesSeleccionadas(emocionesSeleccionadas.slice(0, index))
                }}
                className="hover:text-black transition"
              >
                {emocion.nombre}
              </p>
              {index < emocionesSeleccionadas.length - 1 && <p className="mx-2">/</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
