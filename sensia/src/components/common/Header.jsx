import { Link, useLocation } from "react-router-dom"
import videoLogo from "./../../assets/logo_def.png"

function Header() {
  const location = useLocation()

  const links = [
    { to: "/sensia", label: "Inicio" },
    { to: "/sensia/registrar_emocion", label: "Registrar emoción" },
    { to: "/sensia/alexithimia_test", label: "Test" },
    { to: "/sensia/diario_emocional", label: "Diario" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 w-full z-30 px-4 md:px-8 pt-4">
      <div className="max-w-7xl mx-auto rounded-2xl border border-white/30 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <div className="h-20 px-4 md:px-6 flex items-center justify-between gap-4">

          {/* IZQUIERDA */}
          <Link to="/sensia" className="flex items-center gap-3">
            <img src={videoLogo} alt="Logo Sensia" className="w-18" />

            {/* <div className="">
              <p className="text-[45px] ml-3 text-slate-800 leading-none">
                Sensia
              </p>
            </div> */}
          </Link>

          {/* CENTRO */}
          <nav className="hidden lg:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition no-underline ${isActive(link.to)
                    ? "text-slate-900! bg-slate-200"
                    : "text-slate-800! hover:bg-slate-100"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* DERECHA */}
          <div className="flex items-center gap-3">
            <Link
              to="/sensia/registrar_emocion"
              className="hidden md:inline-flex px-4 py-2 rounded-xl border border-slate-300 !text-slate-800 text-sm font-semibold hover:bg-slate-100 transition"
              // className="hidden md:inline-flex px-4 py-2 rounded-xl bg-slate-900 !text-white text-sm font-semibold hover:bg-slate-800 transition"
            >
              Nueva entrada
            </Link>
          </div>
        </div>

        {/* MOBILE */}
        {/* <div className="lg:hidden border-t border-slate-200/70 px-3 py-3 flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition ${isActive(link.to)
                  ? "bg-slate-200 text-slate-900"
                  : "bg-slate-100 text-slate-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div> */}
      </div>
    </header>
  )
}

export default Header