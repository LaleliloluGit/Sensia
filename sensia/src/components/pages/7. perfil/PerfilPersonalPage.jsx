import { Link } from "react-router-dom"
import PageTitle from "../../common/PageTitle"
import GraficaRegistros from "./GraficaRegistros"
import GraficaTests from "./GraficaTests"

export default function PerfilPersonalPage() {
  const usuarioGuardado = sessionStorage.getItem("usuario")
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null

  const nombreCompleto = [
    usuario?.nombre,
    usuario?.apellido1,
    usuario?.apellido2,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="min-h-screen w-screen px-4 py-8 relative">
      <div className="max-w-7xl mx-auto pr-4">
        <PageTitle
          title="Perfil personal"
          h1={nombreCompleto || usuario?.username || "Tu espacio personal"}
          h2="Consulta tu información personal, revisa tu actividad reciente y accede cómodamente a las herramientas principales de Sensia."
        />

        <section className="grid grid-cols-12 gap-6 mb-8">
          <article className="col-span-12 lg:col-span-5 mi-header">
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-3">
              Datos personales
            </p>
            <div className="space-y-4 text-slate-700">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Nombre</p>
                <p className="text-xl font-semibold text-slate-900">
                  {nombreCompleto || "No disponible"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Usuario</p>
                <p className="text-lg font-medium text-slate-900">
                  {usuario?.username || "No disponible"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Email</p>
                <p className="text-lg font-medium break-all text-slate-900">
                  {usuario?.email || "No disponible"}
                </p>
              </div>
            </div>
          </article>

          <article className="col-span-12 lg:col-span-7 mi-header">
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-3">
              Tu panel
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Sigue tu proceso emocional
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Desde aquí puedes registrar emociones, consultar tu diario, revisar tus tests y continuar aprendiendo con los cursos disponibles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/sensia/registrar_emocion"
                className="rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-slate-800 hover:-translate-y-1 transition"
              >
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">Registro</p>
                <p className="text-xl font-semibold">Nueva emocion</p>
              </Link>

              <Link
                to="/sensia/diario_emocional"
                className="rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-slate-800 hover:-translate-y-1 transition"
              >
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">Diario</p>
                <p className="text-xl font-semibold">Ver historial personal</p>
              </Link>

              <Link
                to="/sensia/alexithimia_test"
                className="rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-slate-800 hover:-translate-y-1 transition"
              >
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">Test</p>
                <p className="text-xl font-semibold">Evaluar alexitimia</p>
              </Link>

              <Link
                to="/sensia/cursos"
                className="rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-slate-800 hover:-translate-y-1 transition"
              >
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">Cursos</p>
                <p className="text-xl font-semibold">Seguir aprendiendo</p>
              </Link>
            </div>
          </article>
        </section>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-7">
            <GraficaRegistros />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <GraficaTests />
          </div>
        </section>
      </div>
    </div>
  )
}
