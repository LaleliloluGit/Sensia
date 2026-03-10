import { useEffect, useState } from "react"
import Card_registrar_emocion from "./Card_registrar_emocion"

function Registrar_emocion() {
  const [emocionesSeleccionadas, setEmocionesSeleccionadas] = useState([])
  const [emocionesPrincipales, setEmocionesPrincipales] = useState([])
  const [emocionesSecundarias, setEmocionesSecundarias] = useState([])
  const [emocionesTerciarias, setEmocionesTerciarias] = useState([])

  useEffect(() => {
    const getEmociones = async () => {
      try {
        const response = await fetch("http://localhost:3000/sensia/emociones/principales")
        const data = await response.json()
        setEmocionesPrincipales(data)
      } catch (error) {
        console.error("Error al obtener las emociones:", error)
      }
    }
    getEmociones()
  }, [])

  useEffect(() => {
    if (emocionesSeleccionadas.length == 1) {
      const getEmocionesGradoDos = async () => {
        try {
          const response = await fetch("http://localhost:3000/sensia/emociones/emocion_sup/" + emocionesSeleccionadas[0].nombre)
          const data = await response.json()
          setEmocionesSecundarias(data)
        } catch (error) {
          console.error("Error al obtener las emociones:", error)
        }
      }
      getEmocionesGradoDos()
    }
    if (emocionesSeleccionadas.length == 2) {
      const getEmocionesGradoTres = async () => {
        try {
          const response = await fetch("http://localhost:3000/sensia/emociones/emocion_sup/" + emocionesSeleccionadas[1].nombre)
          const data = await response.json()
          setEmocionesTerciarias(data)
        } catch (error) {
          console.error("Error al obtener las emociones:", error)
        }
      }
      getEmocionesGradoTres()
    }
    console.log(emocionesSeleccionadas)
  }, [emocionesSeleccionadas])

  return (
    <>
      {
        emocionesSeleccionadas.length == 0 &&
        <div className="w-screen grid grid-cols-12 relative mt-24 pr-6">
          <h2 className="col-span-12 text-center text-2xl font-bold mb-4">Selecciona la emocion que te identifica</h2>
          {emocionesPrincipales.map((emocion, index) => (
            <Card_registrar_emocion
              key={index}
              emocion={emocion}
              emocionesSeleccionadas={emocionesSeleccionadas}
              setEmocionesSeleccionadas={setEmocionesSeleccionadas}
            />
          ))}
        </div>
      }
      {
        emocionesSeleccionadas.length == 1 &&
        <div className="w-screen grid grid-cols-12 relative mt-24 pr-6">
          <div className="flex cursor-pointer ml-6 text-gray-500">
            <p onClick={() => {
              setEmocionesSeleccionadas([])
            }}>{emocionesSeleccionadas[0].nombre}</p>
            <p className="mx-2">/</p>
          </div>
          <h2 className="col-span-12 text-center text-2xl font-bold mb-4">Selecciona la emocion que te identifica</h2>
          {emocionesSecundarias.map((emocion, index) => (
            <Card_registrar_emocion
              key={index}
              emocion={emocion}
              emocionesSeleccionadas={emocionesSeleccionadas}
              setEmocionesSeleccionadas={setEmocionesSeleccionadas}
            />
          ))}</div>
      }
      {
        emocionesSeleccionadas.length == 2 &&
        <div className="w-screen grid grid-cols-12 relative mt-24 pr-6">
          <div className="flex cursor-pointer ml-6 text-gray-500">
            <p onClick={() => {
              setEmocionesSeleccionadas([])
            }}>{emocionesSeleccionadas[0].nombre}</p>
            <p className="mx-2">/</p>
            <p onClick={() => {
              setEmocionesSeleccionadas(prev => [prev[0]])
            }}>{emocionesSeleccionadas[1].nombre}</p>
          </div>
          <h2 className="col-span-12 text-center text-2xl font-bold mb-4">Selecciona la emocion que te identifica</h2>
          {emocionesTerciarias.map((emocion, index) => (
            <Card_registrar_emocion
              key={index}
              emocion={emocion}
              emocionesSeleccionadas={emocionesSeleccionadas}
              setEmocionesSeleccionadas={setEmocionesSeleccionadas}
            />
          ))}</div>
      }
    </>
  )
}

export default Registrar_emocion