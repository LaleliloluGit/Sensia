import { useState } from "react"
import "./../../../style/login_register.css"
import { Link, useNavigate } from "react-router-dom"
import logo from "./../../../assets/logo_login.png"

/**
 * Componente de formulario de login. Permite a los usuarios ingresar su nombre de usuario y contraseña para acceder a la aplicación.
 * Valida los campos antes de enviar la solicitud al backend, maneja la respuesta del servidor y redirige al usuario según corresponda.
 * @returns 
 */
export default function FormLogin() {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [campoError, setCampoError] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setCampoError(prev => ({
            ...prev,
            [name]: ""
        }));

        setError("");
    };

    const validateAllFields = async () => {
        const newErrors = {};

        for (const [key, value] of Object.entries(formData)) {
            const error = validateField(value);

            if (error) {
                newErrors[key] = error;
                setCampoError(newErrors);
                return false; // 🔴 se detiene aquí
            }
        }

        setCampoError({});
        return true;
    };

    const validateField = (value) => {
        if (!value.trim()) return "Este campo es obligatorio";
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar todos los campos antes de enviar
        const isValid = await validateAllFields();
        if (!isValid) return;

        try {
            const { username, password } = formData;
            const response = await fetch('http://localhost:3000/sensia/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {

                setError(data.error || "Error desconocido");

            } else {

                const usuarioCompleto = {
                    ...data.usuario,
                };

                console.log(usuarioCompleto);

                // setUsuario(usuarioCompleto);
                sessionStorage.setItem('usuario', JSON.stringify(usuarioCompleto));
                sessionStorage.setItem('token', data.token);
                if (usuarioCompleto) {
                    navigate('/sensia');
                } else {
                    navigate('/verificacion');
                }
            }
        } catch (err) {

            setError("Error de conexión con el servidor: " + err.message);

        }
    };


    return (
        <>
            <form action="" onSubmit={handleSubmit} className="form_login">
                <img src={logo} alt="" className="login_logo" />

                <div className="login_register_inputs">
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="username" />
                    {campoError.username && <p className="text-sm text-red-500 col-span-2 pt-2 ">{campoError.username}</p>}

                </div>
                <div className="login_register_inputs">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" />
                    {campoError.password && <p className="text-sm text-red-500 col-span-2 pt-2 ">{campoError.password}</p>}

                </div>
                <div className="login_register_buttons login_register_inputs">
                    <button type="submit">Acceder</button>
                    <Link to="/register" className="button">Go to Register</Link>
                </div>
                {error && <p className="text-red-600 col-span-2 text-center mt-2">{error}</p>}
            </form>

        </>
    )
}

