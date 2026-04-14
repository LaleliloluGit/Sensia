import "./../../../style/login_register.css"
import { Link, useNavigate } from "react-router-dom"
import logo from "./../../../assets/logo_login.png"
import { useState } from "react"

/**
 * Componente de formulario de registro. 
 * Permite a los usuarios ingresar su información personal, validar los campos antes de enviar la solicitud al backend,
 * @returns 
 */
export default function FormRegister() {

    const [formData, setFormData] = useState({
        nombre: "",
        apellido1: "",
        apellido2: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    })
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [campoError, setCampoError] = useState({});

    // Valida que todos los campos estén completos y que las contraseñas coincidan antes de enviar el formulario
    const validateAllFields = async () => {
        const newErrors = {};

        for (const [key, value] of Object.entries(formData)) {
            const error = validateField(value);

            if (error) {
                newErrors[key] = error;
                setCampoError(newErrors);
                return false;
            }
        }

        // validar que las contraseñas coincidan
        if (formData.password !== formData.password2) {
            newErrors.password2 = "Las contraseñas no coinciden";
            setCampoError(newErrors);
            return false;
        }

        setCampoError({});
        return true;
    };

    // Valida que un campo no esté vacío
    const validateField = (value) => {
        if (!value.trim()) return "Este campo es obligatorio";
        return "";
    };

    // Maneja el cambio en los campos del formulario, actualizando el estado y limpiando los errores correspondientes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setCampoError(prev => ({
            ...prev,
            [name]: ""
        }));

        setError("");
    };

    // Maneja el envío del formulario, validando los campos, 
    // enviando la solicitud al backend y manejando la respuesta para redirigir al usuario o mostrar errores
    const handleSubmit = async (e) => {

        e.preventDefault();

        const isValid = await validateAllFields();
        if (!isValid) return;

        try {
            const { nombre, apellido1, apellido2, username, email, password } = formData;
            const response = await fetch('http://localhost:3000/sensia/usuarios/crear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, apellido1, apellido2, username, email, password })
            });

            const data = await response.json();

            if (!response.ok) {

                setError(data.error || "Error desconocido");

            } else {

                const usuarioCompleto = {
                    ...data.usuario,
                };

                console.log("Usuario registrado:", usuarioCompleto);

                // setUsuario(usuarioCompleto);
                sessionStorage.setItem('token', data.token);
                if (usuarioCompleto) {
                    navigate('/');
                } else {
                    navigate('/verificacion');
                }
            }
        } catch (err) {

            setError("Error de conexión con el servidor: " + err.message);

        }
    }


    return (
        <div className="mt-[10vh] pb-[15vh]">

            <form action="" onSubmit={handleSubmit} className="form_register">
                <img src={logo} alt="" className="login_logo" />

                <div className="login_register_inputs">
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
                    {campoError.nombre && <p className="text-sm text-red-500 col-span-2 pt-2 ">{campoError.nombre}</p>}

                </div>
                <div className="login_register_inputs">
                    <input type="text" name="apellido1" value={formData.apellido1} onChange={handleChange} placeholder="Primer apellido" />
                    {campoError.apellido1 && <p className="text-sm text-red-500 col-span-2 pt-2 ">{campoError.apellido1}</p>}

                </div>
                <div className="login_register_inputs">
                    <input type="text" name="apellido2" value={formData.apellido2} onChange={handleChange} placeholder="Segundo apellido" />
                    {campoError.apellido2 && <p className="text-sm text-red-500 col-span-2 pt-2 ">{campoError.apellido2}</p>}

                </div>
                <div className="login_register_inputs">
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                    {campoError.username && <p className="text-sm text-red-500 col-span-2 pt-2 ">{campoError.username}</p>}

                </div>
                <div className="login_register_inputs">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    {campoError.email && <p className="text-sm text-red-500 col-span-2 pt-2 ">{campoError.email}</p>}

                </div>
                <div className="login_register_inputs">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" />
                    {campoError.password && <p className="text-sm text-red-500 col-span-2 pt-2 ">{campoError.password}</p>}

                </div>
                <div className="login_register_inputs">
                    <input type="password" name="password2" value={formData.password2} onChange={handleChange} placeholder="Repite contraseña" />
                    {campoError.password2 && <p className="text-sm text-red-500 col-span-2 pt-2 ">{campoError.password2}</p>}

                </div>
                <div className="login_register_buttons login_register_inputs">
                    <button type="submit">Registrate</button>
                    <Link to="/" className="button">Go to login</Link>
                </div>
                {error && <p className="text-red-600 col-span-2 text-center mt-2">{error}</p>}
            </form>
        </div>
    )
}

