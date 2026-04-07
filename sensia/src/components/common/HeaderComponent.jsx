/**
 * Componente de encabezado reutilizable para las páginas de Sensia.
 *
 * @param {string} h1 - El título principal a mostrar.
 * @param {string} h2 - El subtítulo o descripción a mostrar debajo del título.
 */
export default function HeaderComponent({h1, h2}) {
    return (
        <div className="mb-6 col-span-12">
            <h2 className="col-span-12 text-center text-4xl font-bold mb-6">
                {h1}
            </h2>
            <p className="text-slate-500 text-center">
                {h2}
            </p>
        </div>
    )
}