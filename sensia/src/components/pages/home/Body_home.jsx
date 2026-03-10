import { Link } from "react-router-dom"
import Porcentaje_mensual_registros from "./Porcentaje_mensual_registros"
import Porcentaje_mensual_tests from "./Porcentaje_mensual_tests"

function Body_home() {

  return (
    <div className="mt-24 h-screen w-screen grid grid-cols-12 border-2 border-red-500 relative">
      <Porcentaje_mensual_registros />
      <Porcentaje_mensual_tests />
      <Link to="./registrar_emocion" className="col-span-12 border-2 border-pink-500 relative h-min">
        <p>Enlace a registro de Emociones</p><br/>
      </Link>
    </div>
  )
}

export default Body_home
