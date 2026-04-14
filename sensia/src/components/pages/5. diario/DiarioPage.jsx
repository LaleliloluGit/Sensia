import { useEffect, useState } from "react"
import PageTitle from "../../common/PageTitle"

/**
 * Componente que muestra el diario emocional del usuario.
 * Permite filtrar por emoción y buscar por texto en la descripción de la situación.
 * Carga los registros emocionales, emociones y partes del cuerpo desde la API.
 * @returns 
 */
export default function DiarioPage() {

  const [registrosUsuario, setRegistrosUsuario] = useState([])
  const [registrosFiltrados, setRegistrosFiltrados] = useState([])

  const [filtroEmocion, setFiltroEmocion] = useState("")
  const [busquedaTexto, setBusquedaTexto] = useState("")

  const [error, setError] = useState("")

  // Obtenemos el usuario actual desde sessionStorage para filtrar los registros
  const usuario = JSON.parse(sessionStorage.getItem("usuario"))
  const usuario_id = usuario?.id

  // Cargamos los registros emocionales al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuario = JSON.parse(sessionStorage.getItem("usuario"))
        if (!usuario) {
          setError("Usuario no encontrado")
          return
        }

        const resRegistros = await fetch(`http://localhost:3000/sensia/registros_emocionales/completo/${usuario_id}`)

        const dataRegistros = await resRegistros.json()

        setRegistrosUsuario(dataRegistros)

      } catch (err) {
        setError("Error al cargar datos" + err)
      }
    }

    cargarDatos()
  }, [])


  // Aplicamos los filtros de emoción y búsqueda de texto cada vez que cambian los registros del usuario, 
  // el filtro de emoción o el texto de búsqueda
  useEffect(() => {
    let resultado = [...registrosUsuario]

    if (filtroEmocion !== "") {
      resultado = resultado.filter((registro) => registro.emocion_nombre === filtroEmocion)
    }

    if (busquedaTexto !== "") {
      resultado = resultado.filter((registro) =>
        registro.descripcion_situacion
          ?.toLowerCase()
          .includes(busquedaTexto.toLowerCase())
      )
    }

    setRegistrosFiltrados(resultado)
  }, [registrosUsuario, filtroEmocion, busquedaTexto])

  // Función para formatear la fecha en formato DD/MM/YYYY
  const formatearFecha = (fecha) => {
    if (!fecha) return ""
    const f = new Date(fecha)
    return `${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()}`
  }

  // Obtenemos la lista de emociones únicas para mostrar en el filtro
  const listaEmociones = [...new Set(registrosUsuario.map((registro) => registro.emocion_nombre))]

  return (
    <div className="min-h-screen w-screen px-4 py-8 relative">

      <div className="max-w-7xl mx-auto pr-4">
        <PageTitle title="Diario emocional" h1="Revisa tus emociones registradas" h2="Aqui puedes revisar tus emociones, sentimientos y buscar por palabras clave" />
        <div className="mi-header p-4">

          <div className="rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar..."
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              className="border p-2 rounded-lg flex-1"
            />

            <select
              value={filtroEmocion}
              onChange={(e) => setFiltroEmocion(e.target.value)}
              className="border p-2 rounded-lg"
            >
              <option value="">Todas</option>
              {listaEmociones.map((emocion, index) => (
                <option key={index} value={emocion}>
                  {emocion}
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : registrosFiltrados.length === 0 ? (
            <p>No hay registros</p>
          ) : (
            <div className="space-y-4">
              {registrosFiltrados.map((registro) => (
                <div
                  key={registro.id}
                  className="shadow-sm rounded-2xl p-8 bg-transparent"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-bold">
                      {registro.emocion_nombre}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatearFecha(registro.fecha_hora)}
                    </span>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <span className="bg-blue-100 px-2 py-1 rounded text-sm">
                      {registro.parte_cuerpo_nombre}
                    </span>

                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      Intensidad {registro.intensidad}/10
                    </span>
                  </div>

                  <p className="text-gray-700">
                    {registro.descripcion_situacion}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
