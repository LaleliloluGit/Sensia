import { useEffect, useMemo, useState } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

/**
 * Componente que muestra la evolución mensual de los registros emocionales guardados por el usuario.
 * Obtiene todos los registros emocionales del usuario, 
 * los agrupa por mes y muestra una gráfica de área con la evolución a lo largo del año.
 * @returns 
 */
function Porcentaje_mensual_registros() {
  const [registros, setRegistros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getRegistros = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3000/sensia/registros_emocionales/todos")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Error al obtener registros emocionales")
        }

        setRegistros(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getRegistros()
  }, [])

  const dataGrafica = useMemo(() => {
    const acumulado = Array.from({ length: 12 }, (_, index) => ({
      mes: MESES[index],
      total: 0,
    }))

    registros.forEach((registro) => {
      if (!registro.fecha_hora) return
      const fecha = new Date(registro.fecha_hora)
      const mes = fecha.getMonth()
      if (!Number.isNaN(mes)) {
        acumulado[mes].total += 1
      }
    })

    return acumulado
  }, [registros])

  const totalRegistros = registros.length
  const maxMes = Math.max(...dataGrafica.map((item) => item.total), 0)

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm h-full">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">
            Registros emocionales
          </p>
          <h3 className="text-2xl font-bold text-slate-800">Evolución mensual</h3>
          <p className="text-slate-500 mt-2">
            Número de registros emocionales guardados por mes.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="rounded-2xl bg-slate-100 px-4 py-3 min-w-[110px]">
            <p className="text-xs text-slate-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-slate-800">{totalRegistros}</p>
          </div>

          <div className="rounded-2xl bg-sky-50 px-4 py-3 min-w-[110px]">
            <p className="text-xs text-slate-500 mb-1">Pico mensual</p>
            <p className="text-2xl font-bold text-slate-800">{maxMes}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[320px] flex items-center justify-center text-slate-500">
          Cargando gráfica...
        </div>
      ) : error ? (
        <div className="h-[320px] flex items-center justify-center text-red-600">
          {error}
        </div>
      ) : (
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataGrafica}>
              <defs>
                <linearGradient id="colorRegistros" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#0f172a"
                strokeWidth={3}
                fill="url(#colorRegistros)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default Porcentaje_mensual_registros