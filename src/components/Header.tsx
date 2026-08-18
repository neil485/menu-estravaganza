import { useState } from 'react';
import ReservationModal from './ReservationModal';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const [spinning, setSpinning] = useState(false);
  const [showReservation, setShowReservation] = useState(false);

  const handleClick = () => {
    setSpinning(true);
    onToggleTheme();
    setTimeout(() => setSpinning(false), 400);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-cream/90 dark:bg-brand-darker/90 backdrop-blur-md border-b border-brand-cream-dark dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setShowReservation(true)}
            className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all bg-brand-primary text-white hover:bg-brand-primary-dark active:scale-95"
          >
            Reservaciones
          </button>
          <button
            onClick={handleClick}
            className="p-2 rounded-full bg-brand-cream-dark dark:bg-neutral-900 hover:bg-brand-primary/10 dark:hover:bg-neutral-800 hover:scale-110 active:scale-95 transition-all"
            aria-label="Cambiar tema"
          >
            <span className={`text-xl inline-block ${spinning ? 'animate-spin-slow' : 'animate-swing'}`}>
              {isDark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
            </span>
          </button>
        </div>
      </header>
      <ReservationModal isOpen={showReservation} onClose={() => setShowReservation(false)} />
    </>
  );
}
