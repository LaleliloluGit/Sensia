import { Link } from "react-router-dom"
import Form_login from "./Form_login"
import Form_register from "../register/Form_register"

function Login({ form }) {
  return (
    <div className="login_container relative w-full h-screen overflow-hidden">

      {/* Div gigante centrado */}
      <div className="arcoiris absolute w-[300vw] h-[300vh] -z-20"></div>

      {
        form === 'login' ? <Form_login /> : <Form_register />
      }

    </div>
  )
}
export default Login
