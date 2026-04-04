function Formulario_registro_emocional({
  emocionFinalSeleccionada,
  partesCuerpo,
  formData,
  setFormData,
  handleSubmit,
  handleChange,
  mensaje,
  error,
  loadingGuardar,
}) {
  return (
    <div className="col-span-12 mt-8">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/30 bg-white/80">
          {/* PANEL IZQUIERDO */}
          <div className=" p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-3">
                Registro emocional
              </p>

              <h3 className="text-3xl font-bold text-slate-800 mb-3">
                {emocionFinalSeleccionada.nombre}
              </h3>

              <p className="text-slate-600 leading-relaxed mb-8">
                Indica dónde sientes esta emoción en tu cuerpo y añade una pequeña
                descripción para guardar el registro.
              </p>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm mb-6">
                <p className="text-sm text-slate-500 mb-2">Emoción seleccionada</p>
                <div className="inline-flex items-center rounded-full bg-slate-800 text-white px-4 py-2 text-sm font-medium">
                  {emocionFinalSeleccionada.nombre}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  ¿En qué parte del cuerpo la sientes?
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {partesCuerpo.map((parte) => {
                    const activa = Number(formData.parte_cuerpo_id) === Number(parte.id)

                    return (
                      <button
                        key={parte.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            parte_cuerpo_id: parte.id,
                          }))
                        }
                        className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                          activa
                            ? "bg-slate-800 text-white border-slate-800 shadow-lg scale-[1.02]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:shadow-md"
                        }`}
                      >
                        <p className="font-semibold">{parte.nombre}</p>
                        <p
                          className={`text-xs mt-1 leading-relaxed ${
                            activa ? "text-slate-200" : "text-slate-500"
                          }`}
                        >
                          {parte.descripcion}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL DERECHO */}
          <div className="p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Describe lo que sientes
                </label>
                <textarea
                  name="descripcion_situacion"
                  value={formData.descripcion_situacion}
                  onChange={handleChange}
                  rows="8"
                  placeholder="Escribe aquí qué sientes, qué ha pasado o cualquier detalle que quieras recordar de este momento..."
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 outline-none resize-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition"
                />
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-700">
                    Intensidad emocional
                  </label>
                  <span className="rounded-full bg-slate-800 text-white px-3 py-1 text-sm font-bold">
                    {formData.intensidad}/10
                  </span>
                </div>

                <input
                  type="range"
                  name="intensidad"
                  min="1"
                  max="10"
                  value={formData.intensidad}
                  onChange={handleChange}
                  className="w-full accent-slate-800"
                />

                <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
                  <span>Suave</span>
                  <span>Media</span>
                  <span>Alta</span>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                {mensaje && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                    {mensaje}
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loadingGuardar}
                  className="w-full rounded-2xl bg-slate-900 text-white py-4 font-semibold text-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loadingGuardar ? "Guardando registro..." : "Guardar registro emocional"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Formulario_registro_emocional