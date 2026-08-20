import { useNavigate } from 'react-router-dom';

const modules = [
  {
    path: '/menu',
    icon: '🍽️',
    title: 'Menu Digital',
    description: 'Explora nuestro menu completo con categorias, busqueda y mas.',
  },
  {
    path: '/mesero',
    icon: '👤',
    title: 'Panel de Mesero',
    description: 'Gestiona mesas, crea ordenes y envia pedidos a cocina.',
  },
  {
    path: '/cocina',
    icon: '🔥',
    title: 'Panel de Cocina',
    description: 'Visualiza ordenes pendientes y gestiona la preparacion.',
  },
  {
    path: '/admin',
    icon: '📊',
    title: 'Administracion',
    description: 'Dashboard con estadisticas, inventario y control total.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-dark flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl text-brand-primary mb-2">Extravaganza</h1>
        <p className="font-heading text-lg text-brand-brown/70 dark:text-brand-cream/50">
          Restaurant &amp; Bar &middot; Sistema de Gestion
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
        {modules.map((mod) => (
          <button
            key={mod.path}
            onClick={() => navigate(mod.path)}
            className="group bg-white dark:bg-brand-brown-light/40 rounded-2xl p-8 text-left
              border border-brand-primary/20 hover:border-brand-primary
              shadow-md hover:shadow-xl hover:shadow-brand-primary/10
              transition-all duration-300 cursor-pointer
              hover:-translate-y-1"
          >
            <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
              {mod.icon}
            </span>
            <h2 className="font-heading text-xl text-brand-brown dark:text-brand-cream mb-2">
              {mod.title}
            </h2>
            <p className="text-sm text-brand-brown/60 dark:text-brand-cream/50 leading-relaxed">
              {mod.description}
            </p>
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate('/login')}
        className="mt-10 px-6 py-2.5 rounded-lg border border-brand-primary/30 text-sm font-heading text-brand-primary
          hover:bg-brand-primary hover:text-white transition-all duration-200 cursor-pointer"
      >
        Iniciar Sesion
      </button>

      <p className="mt-6 text-xs text-brand-brown/40 dark:text-brand-cream/30">
        Demo de Sistema de Extravaganza Restaurant
      </p>
    </div>
  );
}
