import { useEffect, useMemo, useState } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]


/**
 * Componente que muestra un gráfico de barras con el número de tests de alexitimia completados por mes.
 * Obtiene los registros de test desde el backend, los procesa para calcular el total por mes y la media mensual,
 * y los muestra en una gráfica utilizando Recharts.
 * @returns 
 */
export default function GraficaTests() {
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getTests = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3000/sensia/registros_test/todos")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Error al obtener registros de test")
        }

        setTests(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getTests()
  }, [])

  const dataGrafica = useMemo(() => {
    const acumulado = Array.from({ length: 12 }, (_, index) => ({
      mes: MESES[index],
      total: 0,
    }))

    tests.forEach((test) => {
      if (!test.fecha_hora) return
      const fecha = new Date(test.fecha_hora)
      const mes = fecha.getMonth()
      if (!Number.isNaN(mes)) {
        acumulado[mes].total += 1
      }
    })

    return acumulado
  }, [tests])

  const totalTests = tests.length
  const mediaMensual = totalTests > 0 ? (totalTests / 12).toFixed(1) : 0

  return (
    <div className="rounded-3xl mi-header h-full">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">
            Tests de alexitimia
          </p>
          <h3 className="text-2xl font-bold text-slate-800">Registros por mes</h3>
          <p className="text-slate-500 mt-2">
            Seguimiento mensual del número de tests completados.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-100 px-4 py-3">
            <p className="text-xs text-slate-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-slate-800">{totalTests}</p>
          </div>

          <div className="rounded-2xl bg-violet-50 px-4 py-3">
            <p className="text-xs text-slate-500 mb-1">Media/mes</p>
            <p className="text-2xl font-bold text-slate-800">{mediaMensual}</p>
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
            <BarChart data={dataGrafica} barCategoryGap={18}>
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
              <Bar dataKey="total" fill="#7c3aed" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
