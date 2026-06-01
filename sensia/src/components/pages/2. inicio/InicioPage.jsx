import { Link, useNavigate } from "react-router-dom"
import PageTitle from "../../common/PageTitle"
import imagen01 from "../../../assets/imagen01.jpg"
import imagen02 from "../../../assets/imagen02.jpg"
import imagen03 from "../../../assets/imagen03.jpg"
import { useEffect } from "react"

export default function InicioPage() {
   const navigate = useNavigate()

   useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // o "auto" si no quieres animación
    });
  }, []);

  const handleTest = () => {
    navigate("/sensia/alexithimia_test")
  }

  return (
    <div className="min-h-screen w-screen px-4 py-8 relative">
      <div className="max-w-7xl mx-auto pr-4">
        <PageTitle
          title="Inicio"
          h1="Explora el mundo emocional con Sensia"
          h2="Adéntrate para comprender mejor tus sentimientos, tus emociones, la alexitimia y el cuidado del bienestar emocional."
        />

        <section className="grid grid-cols-12 gap-6 mb-8">
          <article className="col-span-12 lg:col-span-8 mi-header overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-3">
                  Emociones y sentimientos
                </p>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Entender lo que sientes es el primer paso para cuidarte mejor
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Las emociones suelen aparecer como respuestas inmediatas ante lo que vivimos. Los sentimientos, en cambio, son experiencias más elaboradas que construimos a partir de esas emociones, nuestros pensamientos y nuestra historia personal.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Aprender a diferenciarlos ayuda a poner nombre a lo que ocurre dentro de ti, reconocer patrones y tomar decisiones con más claridad.
                </p>
              </div>

              <div className="min-h-[280px] max-h-[450px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400">
                <img src={imagen01} alt="Imagen principal" className="w-full h-full object-cover " />
              </div>
            </div>
          </article>

          <aside className="col-span-12 lg:col-span-4 grid gap-6">
            <article className="mi-header">
              <p className="text-sm uppercase tracking-widest text-slate-400 mb-3">
                Alexitimia
              </p>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Cuando identificar o expresar emociones cuesta
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                No significa ausencia de emociones, sino dificultad para traducirlas en palabras o comprenderlas con precisión. Muchas personas pueden experimentar sensaciones intensas en su interior, pero les resulta complicado identificar exactamente qué estan sintiendo, diferenciar una emocion de otra o expresar con claridad lo que les ocurre.
              </p>
              <button onClick={handleTest}
                className="inline-flex rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 hover:-translate-y-1 transition"
              >
                Hacer test de alexitimia
              </button>
            </article>

            {/* <div className="min-h-[180px] rounded-3xl border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400">
            </div> */}
          </aside>
        </section>

        <section className="grid grid-cols-12 gap-6 mb-8">
          <article className="col-span-12 md:col-span-5 mi-header">
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-3">
              Señales frecuentes
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Qué observar
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Confusión al hablar de emociones, dificultad para diferenciar entre sensaciones físicas y estados emocionales, o tendencia a describir solo hechos externos.
            </p>
          </article>

          <article className="col-span-12 md:col-span-7 mi-header">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="min-h-[220px] rounded-[2rem] overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400">
                <img src={imagen03} alt="Imagen tercera" className="w-full h-full object-cover min-h-[220px]" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-3">
                  Autoconocimiento
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Prácticas útiles
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Registrar lo que sientes, revisar tu cuerpo, identificar el contexto y poner palabras sencillas a cada experiencia puede mejorar la conciencia emocional poco a poco.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="grid grid-cols-12 gap-6 mb-8">
          <article className="col-span-12 mi-header">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-3">
                  Aprendizaje
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Sigue profundizando en tu mundo emocional
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Sensia también puede acompañarte con recursos prácticos para entender mejor tus reacciones emocionales y construir un lenguaje interno más claro.
                </p>
              </div>

              <Link
                to="/sensia/cursos"
                className="inline-flex w-fit rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 hover:-translate-y-1 transition"
              >
                Ver cursos
              </Link>
              
            </div>
          </article>
        </section>

        <section className="grid grid-cols-12 gap-6">
          <Link
            to="/sensia/perfil_personal"
            className="col-span-12 md:col-span-6 group rounded-3xl mi-header hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">
                  Perfil personal
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Accede a tu espacio personal
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Consulta tu informacion, tus graficas y tus accesos directos desde un apartado propio.
                </p>
              </div>

              <div className="rounded-2xl bg-secundario px-4 py-2 font-semibold group-hover:scale-105 transition">
                Ir
              </div>
            </div>
          </Link>

          <Link
            to="/sensia/diario_emocional"
            className="col-span-12 md:col-span-6 group rounded-3xl mi-header hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-slate-400 mb-2">
                  Diario emocional
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Revisa tu historial
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Vuelve sobre tus registros para detectar patrones, cambios y emociones repetidas.
                </p>
              </div>

              <div className="rounded-2xl bg-secundario px-4 py-2 font-semibold group-hover:scale-105 transition">
                Ir
              </div>
            </div>
          </Link>
        </section>
      </div>
    </div>
  )
}