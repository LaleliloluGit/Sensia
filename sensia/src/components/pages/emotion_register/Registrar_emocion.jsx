import { useEffect, useState } from "react"
import Card_registrar_emocion from "./Card_registrar_emocion"
import Formulario_registro_emocional from "./Formulario_registro_emocional"

function HeaderEmociones({ emocionesSeleccionadas, setEmocionesSeleccionadas }) {
  return (
    <div className="col-span-12">
      {emocionesSeleccionadas.length > 0 && (
        <div className="col-span-12 flex flex-wrap cursor-pointer ml-6 text-gray-500 mb-4">
          {emocionesSeleccionadas.map((emocion, index) => (
            <div key={emocion.id ?? emocion.nombre} className="flex items-center">
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

      <div className="mb-6">
        <h2 className="col-span-12 text-center text-4xl font-bold mb-6">
          Registro de emociones
        </h2>
        <p className="text-slate-500 text-center">
          Explora la ruleta de emociones y completa tu registro emocional seleccionando la emoción que mejor describa lo que sientes en este momento.
        </p>
      </div>
    </div>
  )
}

function Registrar_emocion() {
  const [emocionesSeleccionadas, setEmocionesSeleccionadas] = useState([])
  const [emocionesPrincipales, setEmocionesPrincipales] = useState([])
  const [emocionesSecundarias, setEmocionesSecundarias] = useState([])
  const [emocionesTerciarias, setEmocionesTerciarias] = useState([])
  const [partesCuerpo, setPartesCuerpo] = useState([])

  const [formData, setFormData] = useState({
    parte_cuerpo_id: "",
    descripcion_situacion: "",
    intensidad: 5,
  })

  const [loadingGuardar, setLoadingGuardar] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [error, setError] = useState("")

  const usuario = sessionStorage.getItem("usuario");
  const usuario_id = usuario ? JSON.parse(usuario).id : null;




  useEffect(() => {
    const getEmociones = async () => {
      try {
        const response = await fetch("http://localhost:3000/sensia/emociones/principales")
        const data = await response.json()
        setEmocionesPrincipales(data)
      } catch (error) {
        console.error("Error al obtener las emociones principales:", error)
      }
    }

    const getPartesCuerpo = async () => {
      try {
        const response = await fetch("http://localhost:3000/sensia/partes_cuerpo/todos")
        const data = await response.json()
        setPartesCuerpo(data)
      } catch (error) {
        console.error("Error al obtener las partes del cuerpo:", error)
      }
    }

    getEmociones()
    getPartesCuerpo()
  }, [])

  useEffect(() => {
    const getEmocionesGradoDos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/sensia/emociones/emocion_sup/" +
          encodeURIComponent(emocionesSeleccionadas[0].nombre)
        )
        const data = await response.json()
        setEmocionesSecundarias(data)
        setEmocionesTerciarias([])
      } catch (error) {
        console.error("Error al obtener las emociones secundarias:", error)
      }
    }

    const getEmocionesGradoTres = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/sensia/emociones/emocion_sup/" +
          encodeURIComponent(emocionesSeleccionadas[1].nombre)
        )
        const data = await response.json()
        setEmocionesTerciarias(data)
      } catch (error) {
        console.error("Error al obtener las emociones terciarias:", error)
      }
    }

    if (emocionesSeleccionadas.length === 1) {
      getEmocionesGradoDos()
    }

    if (emocionesSeleccionadas.length === 2) {
      getEmocionesGradoTres()
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

  const emocionesActuales =
    emocionesSeleccionadas.length === 0
      ? emocionesPrincipales
      : emocionesSeleccionadas.length === 1
        ? emocionesSecundarias
        : emocionesSeleccionadas.length === 2
          ? emocionesTerciarias
          : []

  const emocionFinalSeleccionada =
    emocionesSeleccionadas.length === 3
      ? emocionesSeleccionadas[emocionesSeleccionadas.length - 1]
      : null

  const parteSeleccionada = partesCuerpo.find(
    (parte) => Number(parte.id) === Number(formData.parte_cuerpo_id)
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "intensidad" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje("")
    setError("")

    if (!usuario_id) {
      setError("No se ha encontrado el usuario logueado.")
      return
    }

    if (!emocionFinalSeleccionada?.id) {
      setError("Debes seleccionar una emoción de grado 3.")
      return
    }

    if (!formData.parte_cuerpo_id) {
      setError("Debes seleccionar una parte del cuerpo.")
      return
    }

    if (!formData.descripcion_situacion.trim()) {
      setError("Debes escribir una descripción.")
      return
    }

    try {
      setLoadingGuardar(true)

      const body = {
        usuario_id,
        emocion_id: emocionFinalSeleccionada.id,
        parte_cuerpo_id: Number(formData.parte_cuerpo_id),
        descripcion_situacion: formData.descripcion_situacion.trim(),
        fecha_hora: new Date().toISOString().slice(0, 19).replace("T", " "),
        intensidad: formData.intensidad,
      }

      const response = await fetch("http://localhost:3000/sensia/registros_emocionales/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.detalle || "No se pudo guardar el registro emocional")
      }

      setMensaje("Registro emocional guardado correctamente.")
      setError("")
      setFormData({
        parte_cuerpo_id: "",
        descripcion_situacion: "",
        intensidad: 5,
      })
    } catch (err) {
      console.error("Error al guardar el registro emocional:", err)
      setError(err.message)
    } finally {
      setLoadingGuardar(false)
    }
  }

  return (
    <div className="w-screen grid grid-cols-12 relative mt-6 pb-12 max-w-7xl mx-auto">
      <HeaderEmociones
        emocionesSeleccionadas={emocionesSeleccionadas}
        setEmocionesSeleccionadas={setEmocionesSeleccionadas}
      />

      {emocionesSeleccionadas.length < 3 &&
        emocionesActuales.map((emocion, index) => (
          <Card_registrar_emocion
            key={emocion.id ?? index}
            emocion={emocion}
            emocionesSeleccionadas={emocionesSeleccionadas}
            setEmocionesSeleccionadas={setEmocionesSeleccionadas}
          />
        ))}

      {emocionFinalSeleccionada && (
        <Formulario_registro_emocional
          emocionFinalSeleccionada={emocionFinalSeleccionada}
          partesCuerpo={partesCuerpo}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          mensaje={mensaje}
          error={error}
          loadingGuardar={loadingGuardar}
        />
      )}
    </div>
  )
}

export default Registrar_emocion