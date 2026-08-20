import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const roles = [
  { id: 'mesero', label: 'Mesero', icon: '👤', path: '/mesero' },
  { id: 'cocina', label: 'Cocina', icon: '🔥', path: '/cocina' },
  { id: 'admin', label: 'Administrador', icon: '📊', path: '/admin' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('mesero');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Ingresa usuario y contrasena');
      return;
    }

    setLoading(true);
    // Simular autenticacion
    setTimeout(() => {
      const role = roles.find((r) => r.id === selectedRole);
      navigate(role?.path ?? '/');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-dark flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-4xl md:text-5xl text-brand-primary animate-shimmer mb-1">
          Extravaganza
        </h1>
        <p className="font-heading text-sm text-brand-brown/50 dark:text-brand-cream/40 tracking-widest uppercase">
          Restaurant &amp; Bar
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white dark:bg-brand-brown-light/40 rounded-2xl border border-brand-primary/20 shadow-xl shadow-brand-primary/5 p-8">
        <h2 className="font-heading text-xl text-brand-brown dark:text-brand-cream text-center mb-6">
          Iniciar Sesion
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs text-brand-brown/50 dark:text-brand-cream/50 uppercase tracking-wider mb-1.5">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ej. carlos.mesero"
              className="w-full px-4 py-2.5 rounded-lg border border-brand-primary/20 bg-brand-cream/50 dark:bg-brand-dark/50
                text-brand-brown dark:text-brand-cream placeholder:text-brand-brown/30 dark:placeholder:text-brand-cream/30
                focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30
                transition-colors text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-brand-brown/50 dark:text-brand-cream/50 uppercase tracking-wider mb-1.5">
              Contrasena
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2.5 rounded-lg border border-brand-primary/20 bg-brand-cream/50 dark:bg-brand-dark/50
                text-brand-brown dark:text-brand-cream placeholder:text-brand-brown/30 dark:placeholder:text-brand-cream/30
                focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30
                transition-colors text-sm"
            />
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-xs text-brand-brown/50 dark:text-brand-cream/50 uppercase tracking-wider mb-1.5">
              Rol
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`py-2 px-2 rounded-lg text-center transition-all duration-200 cursor-pointer
                    ${selectedRole === role.id
                      ? 'bg-brand-primary/15 border-brand-primary text-brand-primary dark:text-brand-primary-light border-2 scale-[1.02]'
                      : 'bg-brand-cream/50 dark:bg-brand-dark/50 border border-brand-primary/10 text-brand-brown/50 dark:text-brand-cream/50 hover:border-brand-primary/30'
                    }`}
                >
                  <span className="text-lg block">{role.icon}</span>
                  <span className="text-[11px] font-medium">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 rounded-lg py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-heading text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer
              ${loading
                ? 'bg-brand-primary/50 text-white/70 cursor-wait'
                : 'bg-brand-primary text-white hover:bg-brand-primary-dark active:scale-[0.98] shadow-md hover:shadow-lg hover:shadow-brand-primary/20'
              }`}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-brand-primary/10" />
          <span className="text-[10px] text-brand-brown/30 dark:text-brand-cream/30 uppercase tracking-wider">o</span>
          <div className="flex-1 h-px bg-brand-primary/10" />
        </div>

        {/* Menu link */}
        <button
          onClick={() => navigate('/menu')}
          className="w-full py-2.5 rounded-lg border border-brand-primary/20 text-sm text-brand-brown/60 dark:text-brand-cream/50
            hover:border-brand-primary/40 hover:text-brand-primary dark:hover:text-brand-primary-light
            transition-colors cursor-pointer"
        >
          Ver Menu Digital
        </button>
      </div>

      <p className="mt-8 text-[11px] text-brand-brown/30 dark:text-brand-cream/20">
        Demo de Sistema de Extravaganza Restaurant
      </p>
    </div>
  );
}
