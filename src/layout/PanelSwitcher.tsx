import { useNavigate, useLocation } from 'react-router-dom';

const panels = [
  { path: '/menu', label: 'Menu', icon: '🍽️' },
  { path: '/mesero', label: 'Mesero', icon: '👤' },
  { path: '/cocina', label: 'Cocina', icon: '🔥' },
  { path: '/admin', label: 'Admin', icon: '📊' },
];

export default function PanelSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-brand-brown dark:bg-brand-darker border-b border-brand-primary/30">
      <div className="max-w-6xl mx-auto flex items-center gap-1 px-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => navigate('/')}
          className="px-3 py-3 text-sm font-heading text-brand-cream/70 hover:text-brand-primary transition-colors shrink-0 cursor-pointer"
        >
          Inicio
        </button>
        <span className="text-brand-primary/30 select-none">|</span>
        {panels.map((panel) => {
          const isActive = location.pathname === panel.path;
          return (
            <button
              key={panel.path}
              onClick={() => navigate(panel.path)}
              className={`px-3 py-3 text-sm font-heading transition-colors shrink-0 cursor-pointer
                ${isActive
                  ? 'text-brand-primary border-b-2 border-brand-primary'
                  : 'text-brand-cream/60 hover:text-brand-cream'
                }`}
            >
              <span className="mr-1">{panel.icon}</span>
              {panel.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
