export default function AdminPanelBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-100 dark:from-amber-900/30 dark:via-brand-dark dark:to-yellow-900/20 border border-amber-300/50 dark:border-amber-700/30 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">&#9881;&#65039;</span>
              <h2 className="font-heading text-xl text-amber-900 dark:text-amber-200">
                Panel de Administraci&oacute;n
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[11px] font-bold uppercase tracking-wide">
                Pr&oacute;ximamente
              </span>
            </div>
            <p className="text-sm text-amber-800/80 dark:text-amber-200/60 mb-4 max-w-lg">
              Gestiona tu negocio desde un solo lugar. Incluido exclusivamente en el plan Premium.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Editar men\u00FA en tiempo real',
                'Gesti\u00F3n de pedidos',
                'Estad\u00EDsticas de ventas',
                'Control de inventario',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-amber-900 dark:text-amber-100/80"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 dark:bg-amber-500/10 flex items-center justify-center text-xs text-amber-600 dark:text-amber-400">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
