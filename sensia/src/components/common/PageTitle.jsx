/**
 * Componente de encabezado reutilizable para las páginas de Sensia.
 *
 * @param {string} h1 - El título principal a mostrar.
 * @param {string} h2 - El subtítulo o descripción a mostrar debajo del título.
 */
export default function PageTitle({ title, h1, h2 }) {
    // return (
    //     <div className="mb-6 col-span-12">
    //         <h2 className="col-span-12 text-center text-4xl font-bold mb-6">
    //             {h1}
    //         </h2>
    //         <p className="text-slate-500 text-center">
    //             {h2}
    //         </p>
    //     </div>
    // )
    return (
        <section className="mb-8 col-span-12">
            <div className="relative overflow-hidden rounded-3xl mi-header">
                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-4xl">
                        <p className="mb-3 inline-flex items-center rounded-full bg-primario px-3 py-2 mb-5 text-xs font-medium uppercase tracking-[px] text-black">
                            {title}
                        </p>

                        <h1 className="mb-3 text-3xl font-bold tracking-wide text-slate-900 md:text-4xl">
                            {h1}
                        </h1>

                        <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                            {h2}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}