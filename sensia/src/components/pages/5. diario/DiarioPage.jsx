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

    window.scrollTo({
      top: 0,
      behavior: "smooth", // o "auto" si no quieres animación
    });

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

        {/* Cabecero */}
        <PageTitle title="Diario emocional" h1="Revisa tus emociones registradas" h2="Aqui puedes revisar tus emociones, sentimientos y buscar por palabras clave" />
        {/* FILTROS */}
        <div className="mi-header p-6">
          <div className="rounded-2xl bg-[#d2cad8]/35 border border-[#d2cad8] shadow-sm mb-8 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 backdrop-blur-sm">
            <input
              type="text"
              placeholder="Buscar por situación..."
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              className="md:col-span-2 w-full rounded-xl border border-[#d8d0de] bg-white/85 px-4 py-3 text-gray-700 outline-none transition focus:border-[#c3b8cb] focus:ring-2 focus:ring-[#d2cad8]/40"
            />

            <select
              value={filtroEmocion}
              onChange={(e) => setFiltroEmocion(e.target.value)}
              className="w-full rounded-xl border border-[#d8d0de] bg-white/85 px-4 py-3 text-gray-700 outline-none transition focus:border-[#c3b8cb] focus:ring-2 focus:ring-[#d2cad8]/40"
            >
              <option value="">Todas las emociones</option>
              {listaEmociones.map((emocion, index) => (
                <option key={index} value={emocion}>
                  {emocion}
                </option>
              ))}
            </select>
          </div>

          {/* RESULTADOS */}
          {error ? (
            <p className="text-red-500 text-center font-medium">{error}</p>
          ) : registrosFiltrados.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No hay registros que coincidan con la búsqueda.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {registrosFiltrados.map((registro) => (
                <article
                  key={registro.id}
                  className="rounded-3xl bg-[#f8f5fa] border border-[#c091dd] shadow-sm p-6 transition hover:shadow-md hover:-translate-y-1 hover:border-[#c3b8cb]"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <span className="text-sm text-gray-500">
                        {formatearFecha(registro.fecha_hora)}
                      </span>

                      <h3 className="text-2xl font-bold mt-1 text-gray-800">
                        {registro.emocion_nombre}
                      </h3>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-[#d2cad8] border border-[#c3b8cb] flex items-center justify-center font-bold text-[#5f5467]">
                      {registro.intensidad}/10
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200">
                      {registro.parte_cuerpo_nombre}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-sm font-medium border border-gray-200">
                      Intensidad {registro.intensidad}
                    </span>
                  </div>

                  <div className="bg-white/60 rounded-2xl p-4 border border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {registro.descripcion_situacion || "Sin descripción registrada."}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div >
  )
}
