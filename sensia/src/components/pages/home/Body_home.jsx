import { Link } from "react-router-dom"
import Porcentaje_mensual_registros from "./Porcentaje_mensual_registros"
import Porcentaje_mensual_tests from "./Porcentaje_mensual_tests"


/**
 * Componente principal del panel de inicio. 
 * Muestra un resumen visual de la evolución mensual de los registros emocionales y los tests de alexitimia, 
 * y ofrece enlaces a las principales acciones: 
 * registrar una nueva emoción, realizar un test de alexitimia o revisar el diario emocional, entre otras.
 * @returns 
 */
export default function Body_home() {
  return (
    <div className="min-h-screen w-screen px-4 py-8 relative">
      <div className="max-w-7xl mx-auto pr-4">
        {/* HEADER */}
        <section className="mb-8">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white p-8 md:p-10 shadow-xl">
            <p className="uppercase tracking-[0.25em] text-sm text-slate-300 mb-3">
              Panel principal
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Bienvenida a Sensia</h1>
            <p className="text-slate-200 max-w-2xl leading-relaxed">
              Visualiza la evolución mensual de los registros emocionales y los tests de
              alexitimia desde un panel más claro, moderno y visual.
            </p>
          </div>
        </section>

        {/* GRÁFICAS */}
        <section className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-12 xl:col-span-7">
            <Porcentaje_mensual_registros />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <Porcentaje_mensual_tests />
          </div>
        </section>

        {/* ACCIONES */}
        <section className="grid grid-cols-12 gap-6">
          <Link
            to="./registrar_emocion"
            className="col-span-12 md:col-span-6 group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">
                  Registro emocional
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Añadir nueva emoción
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Registra cómo te sientes, en qué parte del cuerpo lo notas y guarda el
                  momento con contexto.
                </p>
              </div>

              <div className="rounded-2xl bg-sky-100 text-sky-700 px-4 py-2 font-semibold group-hover:scale-105 transition">
                Ir
              </div>
            </div>
          </Link>

          <Link
            to="./alexithimia_test"
            className="col-span-12 md:col-span-6 group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">
                  Test psicológico
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Realizar test de alexitimia
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Completa el test para obtener un nuevo registro y seguir tu evolución a lo
                  largo del tiempo.
                </p>
              </div>

              <div className="rounded-2xl bg-violet-100 text-violet-700 px-4 py-2 font-semibold group-hover:scale-105 transition">
                Ir
              </div>
            </div>
          </Link>
          <Link
            to="./diario_emocional"
            className="col-span-12 md:col-span-6 group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">
                  Diario personal
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Ver diario emocional
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Revisa tus emociones guardadas como páginas de un libro personal y observa
                  tu evolución.
                </p>
              </div>

              <div className="rounded-2xl bg-amber-100 text-amber-700 px-4 py-2 font-semibold group-hover:scale-105 transition">
                Ir
              </div>
            </div>
          </Link>
          <Link
            to="./cursos"
            className="col-span-12 md:col-span-6 group rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">
                  Cursos
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Ver cursos
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Explora nuestros cursos para aprender más sobre la gestión de emociones y el bienestar mental.
                </p>
              </div>

              <div className="rounded-2xl bg-amber-100 text-amber-700 px-4 py-2 font-semibold group-hover:scale-105 transition">
                Ir
              </div>
            </div>
          </Link>
        </section>

      </div>
    </div>
  )
}
