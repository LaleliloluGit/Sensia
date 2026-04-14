import { Outlet } from "react-router-dom"
import Header from "./Header"

/**
 * Componente principal para la página de inicio. 
 * Contiene un fondo con un arcoíris animado, un encabezado y un espacio para mostrar el contenido de las subrutas.
 * @returns 
 */
function Layout() {
  return (
    <div className="min-h-screen w-screen relative">
      <div className="w-screen h-screen fixed top-0 left-0 overflow-hidden">
        <div className="arcoiris absolute w-[300vw] h-[300vh] -z-20"></div>
      </div>

      <Header />

      <main className="relative z-10 pt-26 ">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout