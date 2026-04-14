import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import preguntas from "../../../data/alexitimiaPreguntas.json";
import "../../../style/test_alexithimia.css";
import PageTitle from "../../common/PageTitle";

const OPCIONES = [
  { valor: 1, texto: "Totalmente en desacuerdo" },
  { valor: 2, texto: "Muy en desacuerdo" },
  { valor: 3, texto: "En desacuerdo" },
  { valor: 4, texto: "Algo en desacuerdo" },
  { valor: 5, texto: "Ni de acuerdo ni en desacuerdo" },
  { valor: 6, texto: "Algo de acuerdo" },
  { valor: 7, texto: "De acuerdo" },
  { valor: 8, texto: "Muy de acuerdo" },
  { valor: 9, texto: "Casi totalmente de acuerdo" },
  { valor: 10, texto: "Totalmente de acuerdo" },
];

/**
 * Componente principal para el test de alexitimia. 
 * Muestra una serie de preguntas con opciones de respuesta en una escala del 1 al 10.
 * Permite al usuario seleccionar una respuesta para cada pregunta, retroceder a la pregunta anterior y, al finalizar, 
 * envía los resultados al backend para su almacenamiento y redirige a la página de resultados.
 * @returns 
 */
export default function TestPage() {
  const navigate = useNavigate();

  const [respuestas, setRespuestas] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [testEnviado, setTestEnviado] = useState(false);
  const [fade, setFade] = useState(false);

  const indiceActual = respuestas.length;
  const testTerminado = indiceActual >= preguntas.length;
  const preguntaActual = testTerminado ? null : preguntas[indiceActual];

  const puntuacionTotal =
    respuestas.reduce((acc, item) => acc + item.valor, 0) / 2;

  const seleccionarRespuesta = (valor, textoOpcion) => {
    if (!preguntaActual || enviando) return;

    setFade(true);

    setTimeout(() => {
      const nuevaRespuesta = {
        pregunta_id: preguntaActual.id,
        pregunta: preguntaActual.texto,
        valor,
        texto_respuesta: textoOpcion,
      };

      setRespuestas((prev) => [...prev, nuevaRespuesta]);
      setError("");
      setFade(false);
    }, 250); // duración del fade
  };

  const retroceder = () => {
    if (respuestas.length === 0 || enviando) return;

    setRespuestas((prev) => prev.slice(0, -1));
    setError("");
  };

  const obtenerNivelAlexitimia = async (puntuacion) => {
    const response = await fetch(
      `http://localhost:3000/sensia/niveles_alexithimia/puntuacion/${puntuacion}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener el nivel de alexitimia.");
    }

    return response.json();
  };

  const enviarTest = async () => {
    try {
      setEnviando(true);
      setError("");

      const usuarioGuardado = sessionStorage.getItem("usuario");

      if (!usuarioGuardado) {
        throw new Error("No se encontró 'usuario' en sessionStorage.");
      }

      let usuarioId;

      try {
        const usuarioParseado = JSON.parse(usuarioGuardado);
        usuarioId = usuarioParseado?.id;

        if (!usuarioId) {
          throw new Error();
        }
      } catch {
        throw new Error(
          "El objeto 'usuario' de sessionStorage no es válido o no contiene el campo id."
        );
      }

      const nivelData = await obtenerNivelAlexitimia(puntuacionTotal);

      const payload = {
        usuario_id: usuarioId,
        respuestas: respuestas.map((r) => r.valor).join(","),
        puntuacion_total: puntuacionTotal,
        nivel_alexithimia: nivelData?.id || null,
      };

      const response = await fetch(
        "http://localhost:3000/sensia/registros_test/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || "No se pudo guardar el test correctamente."
        );
      }

      setTestEnviado(true);

      // Redirigir a la página de resultados con la puntuación total y el nivel de alexitimia obtenido
      navigate("/sensia/resultado_test", {
        state: {
          puntuacionTotal,
          nivelAlexitimia: nivelData,
        },
      });
    } catch (err) {
      setError(err.message || "Ha ocurrido un error al enviar el test.");
    } finally {
      setEnviando(false);
    }
  };

  useEffect(() => {
    if (testTerminado && !testEnviado && !enviando) {
      enviarTest();
    }
  }, [testTerminado, testEnviado, enviando]);

  if (testTerminado) {
    return (
      <div className="z-10 w-screen grid grid-cols-12 relative mt-24 px-6 md:px-8">
        <div className="col-span-12 max-w-3xl mx-auto w-full bg-[#ffffffbb] rounded-2xl shadow-lg border border-gray-200 px-6 py-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Test de Alexitimia</h2>
          <p className="text-lg">
            {enviando
              ? "Guardando resultados y redirigiendo..."
              : error || "Preparando resultado..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen px-4 py-8 relative">

      <div className="max-w-7xl mx-auto pr-4">
        <PageTitle title="Test Alexithimia" h1="Realiza el test de Alexitimia" h2="Responde las siguientes preguntas para conocer tu nivel de alexitimia" />


        <div className="col-span-12 grid border-gray-600 border rounded-2xl mi-header" >
          <div className="col-span-12 mb-8">
            <p className="text-center text-lg mb-2">
              Pregunta {indiceActual + 1} de {preguntas.length}
            </p>

            <div className="w-full bg-gray-100 border-gray-400 border rounded-full h-3">

              <div
                className="bg-primario h-3 rounded-full transition-all"
                style={{ width: `${((indiceActual + 1) / preguntas.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-center items-center min-h-28 col-span-12">

            <h3 className={`col-span-12 text-center text-2xl md:text-3xl font-semibold max-w-4xl mx-auto leading-relaxed  duration-300 ${fade ? "opacity-0" : "opacity-100"}`}>
              {preguntaActual?.texto}
            </h3>
          </div>

          <div className="col-span-12 flex justify-between text-sm md:text-base mb-3 px-2">
            <span className="font-medium text-green-600">
              1 · Totalmente en desacuerdo
            </span>

            <span className="font-medium text-red-600">
              10 · Totalmente de acuerdo
            </span>
          </div>

          <div className="col-span-12 grid grid-cols-5 md:grid-cols-10 gap-3 mb-10">
            {OPCIONES.map((opcion) => (
              <button
                key={opcion.valor}
                onClick={() => seleccionarRespuesta(opcion.valor, opcion.texto)}
                disabled={enviando}
                className="py-4 rounded-xl font-bold text-lg shadow transition transform hover:scale-105 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: `hsl(${(10 - opcion.valor) * 12}, 70%, 50%)`,
                }}
              >
                {opcion.valor}
              </button>
            ))}
          </div>

          <div className="col-span-12 flex justify-center mt-4">
            <button
              onClick={retroceder}
              disabled={respuestas.length === 0 || enviando}
              className="px-6 py-3 rounded-lg transition text-3xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Retroceder
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
}