import { useEffect } from "react"
import "./../../../style/login_register.css"
import { Link } from "react-router-dom"
import logo from "./../../../assets/logo_login.png"


function Form_register() {

    const checkFields = (e) => {
        console.log('Hola desde el form del logins')
        console.log(e.target)
    }

    useEffect(() => {
        console.log('Hola desde el login')
    }, [])

    return (
        <>

            <form action="" onSubmit={checkFields} className="form_register">
                <img src={logo} alt="" className="login_logo" />

                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" />
                </div>
                <div className="login_register_buttons">
                    <button type="submit">Acceder</button>
                    <button>
                        <Link to="/">Go to Login</Link>
                    </button>
                </div>
            </form>
        </>
    )
}

export default Form_register
