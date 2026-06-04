import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import videoLogo from "./../../assets/logo_def.png"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { to: "/sensia", label: "Inicio" },
    { to: "/sensia/registrar_emocion", label: "Registrar emoción" },
    { to: "/sensia/alexithimia_test", label: "Test Alexitimia" },
    { to: "/sensia/diario_emocional", label: "Diario emociones" },
    { to: "/sensia/cursos", label: "Cursos" },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
      sessionStorage.clear()
      navigate("/")
    }
  }

  const handleProfile = () => {
    navigate("/sensia/perfil_personal")
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-30 px-4 md:px-8 pt-4">
      <div className="max-w-7xl mx-auto rounded-2xl border border-white/30 bg-white/95 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

        <div className="h-20 px-4 md:px-6 flex items-center justify-between gap-4">
          <Link to="/sensia" className="flex items-center gap-3">
            <img src={videoLogo} alt="Logo Sensia" className="w-18" />
          </Link>

          <nav className="hidden lg:flex items-center text-center gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-md font-medium transition no-underline ${
                  isActive(link.to)
                    ? "text-slate-900! border-primario"
                    : "text-slate-800! bg-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={handleProfile} className="px-4 py-2 rounded-xl text-sm font-semibold transition">
              <i className="fa-regular fa-circle-user"></i>
            </button>

            <button onClick={handleLogout} className="px-4 py-2 rounded-xl text-sm font-semibold transition">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden px-4 py-2 rounded-xl text-xl"
          >
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden px-4 pb-4 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-md font-medium transition no-underline ${
                  isActive(link.to)
                    ? "text-slate-900! border-primario"
                    : "text-slate-800! bg-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleProfile}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition"
              >
                <i className="fa-regular fa-circle-user"></i>
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  )
}

export default Header