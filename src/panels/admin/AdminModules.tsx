const modules = [
  {
    icon: '🪑',
    title: 'Gestion de Mesas',
    features: ['Agregar y eliminar mesas', 'Configurar zonas y capacidad', 'Asignar meseros por zona'],
  },
  {
    icon: '🍽️',
    title: 'Gestion de Platillos',
    features: ['Crear y editar platillos', 'Subir fotografias', 'Configurar precios y variantes'],
  },
  {
    icon: '📦',
    title: 'Gestion de Inventario',
    features: ['Control de stock en tiempo real', 'Alertas de inventario bajo', 'Registro de entradas y salidas'],
  },
  {
    icon: '📱',
    title: 'Gestion de Menu Digital',
    features: ['Editar categorias y orden', 'Activar y desactivar platillos', 'Personalizar apariencia del menu'],
  },
  {
    icon: '👥',
    title: 'Gestion de Usuarios',
    features: ['Crear cuentas de empleados', 'Asignar roles y permisos', 'Historial de actividad por usuario'],
  },
];

export default function AdminModules() {
  return (
    <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 p-4">
      <h3 className="font-heading text-sm text-brand-brown/50 dark:text-brand-cream/50 mb-4 uppercase tracking-wider">
        Modulos del Sistema
      </h3>
      <div className="space-y-3">
        {modules.map((mod) => (
          <div
            key={mod.title}
            className="rounded-lg border border-brand-primary/10 p-3 hover:border-brand-primary/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{mod.icon}</span>
              <span className="font-heading text-sm text-brand-brown dark:text-brand-cream">{mod.title}</span>
            </div>
            <ul className="space-y-1 ml-7">
              {mod.features.map((f) => (
                <li key={f} className="text-xs text-brand-brown/50 dark:text-brand-cream/50 flex items-start gap-1.5">
                  <span className="text-brand-primary shrink-0 mt-0.5">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
