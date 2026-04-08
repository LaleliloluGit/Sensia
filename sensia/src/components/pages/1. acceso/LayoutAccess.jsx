import FormLogin from "./FormLogin"
import FormRegister from "./FormRegister"

/**
 * Muestra el formulario de login o registro según el parámetro 'form'.
 * @param {{ form: string }} param0 
 * @returns 
 */
export default function LayoutAccess({ form }) {
  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen  relative w-full overflow-hidden">

      {/* Div gigante centrado */}
      <div className="arcoiris absolute w-[300vw] h-[300vh] -z-20"></div>

      {
        form === 'login' ? <FormLogin /> : <FormRegister />
      }

    </div>
  )
}

