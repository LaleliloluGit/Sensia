import { Link, useLocation } from "react-router-dom"
import videoLogo from "./../../assets/logo_def.png"

/**
 * Componente de encabezado para la aplicación Sensia. 
 * Proporciona navegación entre las diferentes secciones de la aplicación, 
 * incluyendo Inicio, Registrar emoción, Test, Diario y Cursos. 
 * El encabezado es fijo en la parte superior de la pantalla y se adapta a diferentes tamaños de pantalla.
 * @returns 
 */
function Header() {
  const location = useLocation()

  // Definimos los enlaces de navegación
  const links = [
    { to: "/sensia", label: "Inicio" },
    { to: "/sensia/registrar_emocion", label: "Registrar Emoción" },
    { to: "/sensia/alexithimia_test", label: "Test Alexitimia" },
    { to: "/sensia/diario_emocional", label: "Diario Emociones" },
    { to: "/sensia/cursos", label: "Cursos" },
  ]

  // Función para determinar si un enlace está activo (coincide con la ruta actual)
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 px-4 md:px-8 pt-4">
      <div className="max-w-7xl mx-auto rounded-2xl border border-white/30 bg-white/95 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <div className="h-20 px-4 md:px-6 flex items-center justify-between gap-4">

          {/* IZQUIERDA */}
          <Link to="/sensia" className="flex items-center gap-3">
            <img src={videoLogo} alt="Logo Sensia" className="w-18" />
          </Link>

          {/* CENTRO */}
          <nav className="hidden lg:flex items-center gap-2">
            {links.map((link, index) => (
              <Link key={index} to={link.to}
                className={`px-4 py-2 rounded-xl text-md font-medium transition no-underline ${isActive(link.to)
                  ? "text-slate-900! border-primario"
                  : "text-slate-800! bg-hover"
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
              className="hidden md:inline-flex px-4 py-2 rounded-xl border-primario bg-primario !text-slate-800 text-sm font-semibold hover:bg-slate-100 transition"
            >
              Nueva entrada
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header