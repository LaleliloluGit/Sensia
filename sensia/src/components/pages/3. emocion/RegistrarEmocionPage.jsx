import { useEffect, useState } from "react"
import PageTitle from "../../common/PageTitle"
import NavEmocion from "./NavEmocion"
import FinalForm from "./FinalForm"
import CardEmocion from "./CardEmocion"


/**
 * Componente principal para el registro de emociones. Permite seleccionar emociones de grado 1, 2 y 3,
 * y una vez seleccionada la emoción de grado 3, muestra un formulario para registrar la emoción con detalles adicionales.
 * @returns 
 */
export default function RegistrarEmocionPage() {

  const [emocionesSeleccionadas, setEmocionesSeleccionadas] = useState([])
  const [emocionesPrincipales, setEmocionesPrincipales] = useState([])
  const [emocionesSecundarias, setEmocionesSecundarias] = useState([])
  const [emocionesTerciarias, setEmocionesTerciarias] = useState([])


  const [formData, setFormData] = useState({
    parte_cuerpo_id: "",
    descripcion_situacion: "",
    intensidad: 5,
  })

  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")


  // Al cargar el componente, se obtienen las emociones principales y las partes del cuerpo
  useEffect(() => {
    
    const getEmocionesPrincipales = async () => {
      try {
        const response = await fetch("http://localhost:3000/sensia/emociones/principales")
        const data = await response.json()
        setEmocionesPrincipales(data)
      } catch (error) {
        console.error("Error al obtener las emociones principales:", error)
      }
    }

    getEmocionesPrincipales()
  }, [])

  // Cuando se selecciona una emoción, se obtienen las emociones del siguiente grado
  //  y se resetean las emociones de grados superiores
  useEffect(() => {
    
    const getEmocionesGrado = async (grado) => {
      try {
        const response = await fetch(
          "http://localhost:3000/sensia/emociones/emocion_sup/" +
          encodeURIComponent(emocionesSeleccionadas[grado-2].nombre)
        )
        const data = await response.json()

        if(grado === 2) {
          setEmocionesSecundarias(data)
          setEmocionesTerciarias([])
        } else if (grado === 3) {
          setEmocionesTerciarias(data)
        }

      } catch (error) {
        console.error("Error al obtener las emociones secundarias:", error)
      }
    }

    if (emocionesSeleccionadas.length === 1) {
      getEmocionesGrado(2)
    }

    if (emocionesSeleccionadas.length === 2) {
      getEmocionesGrado(3)
    }

    if (emocionesSeleccionadas.length === 0) {
      setEmocionesSecundarias([])
      setEmocionesTerciarias([])
    }

    setFormData({
      parte_cuerpo_id: "",
      descripcion_situacion: "",
      intensidad: 5,
    })
    setMensaje("")
    setError("")
  }, [emocionesSeleccionadas])



  let emocionesActuales;

  // Se determina qué emociones mostrar según el número de emociones seleccionadas y 
  // se obtiene la emoción final seleccionada (la de grado 3) y la parte del cuerpo 
  // seleccionada para usarlas en el formulario de registro emocional
  if (emocionesSeleccionadas.length === 0) {
    emocionesActuales = emocionesPrincipales;
  } else if (emocionesSeleccionadas.length === 1) {
    emocionesActuales = emocionesSecundarias;
  } else if (emocionesSeleccionadas.length === 2) {
    emocionesActuales = emocionesTerciarias;
  } else {
    emocionesActuales = [];
  }

  const emocionFinalSeleccionada =
    emocionesSeleccionadas.length === 3
      ? emocionesSeleccionadas[emocionesSeleccionadas.length - 1]
      : null


  return (
    <div className="min-h-screen w-screen px-4 py-8 relative">

      <div className="max-w-7xl mx-auto pr-4 grid grid-cols-12 gap-x-8">

        {/* Nav */}
        <NavEmocion
          emocionesSeleccionadas={emocionesSeleccionadas}
          setEmocionesSeleccionadas={setEmocionesSeleccionadas}
        />

        {/* Header */}
        <PageTitle
          title="Registrar emociones"
          h1="Registra lo que estas sintiendo"
          h2="Explora la ruleta de emociones y completa tu registro emocional seleccionando la emoción que mejor describa lo que sientes en este momento."
        />

        
        {/* Muestreo de emociones si aun no tenemos la emocion final */}
        {emocionesSeleccionadas.length < 3 &&
          emocionesActuales.map((emocion, index) => (
            <CardEmocion
              key={emocion.id ?? index}
              emocion={emocion}
              emocionesSeleccionadas={emocionesSeleccionadas}
              setEmocionesSeleccionadas={setEmocionesSeleccionadas}
            />
          ))}

        {/* Se muestra el formulario si tenemos una emocion final seleccionada */}
        {emocionFinalSeleccionada && (
          <FinalForm
            emocionFinalSeleccionada={emocionFinalSeleccionada}
            formData={formData}
            setFormData={setFormData}
            setMensaje={setMensaje}
            setError={setError}
            mensaje={mensaje}
            error={error}
          />
        )}
      </div>
    </div>
  )
}
