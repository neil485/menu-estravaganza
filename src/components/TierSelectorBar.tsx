import { useState } from 'react';
import { useTier, TIERS, type TierLevel } from '../context/TierContext';

const tierOrder: TierLevel[] = ['basico', 'profesional', 'premium'];

const tierColors: Record<TierLevel, string> = {
  basico: 'border-gray-400',
  profesional: 'border-brand-primary',
  premium: 'border-amber-500',
};

export default function TierSelectorBar() {
  const { tier, setTier } = useTier();
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white/80 dark:bg-brand-darker/80 backdrop-blur-md border-t border-brand-cream-dark dark:border-brand-brown/50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-brown dark:text-brand-cream">
            Plan {TIERS[tier].name} — ${TIERS[tier].price} {TIERS[tier].priceLabel}
          </span>
          <button
            onClick={() => setCollapsed(false)}
            className="text-sm font-medium text-brand-primary dark:text-brand-primary-light hover:underline"
          >
            Cambiar plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white/90 dark:bg-brand-darker/90 backdrop-blur-md border-t border-brand-cream-dark dark:border-brand-brown/50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-brand-brown dark:text-brand-cream">
            Selecciona tu plan
          </h3>
          <button
            onClick={() => setCollapsed(true)}
            className="text-xs text-gray-500 dark:text-neutral-400 hover:text-brand-primary transition-colors"
          >
            Minimizar
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x pb-1 scrollbar-hide">
          {tierOrder.map((t) => {
            const config = TIERS[t];
            const isActive = tier === t;
            return (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`snap-start shrink-0 flex-1 min-w-[160px] rounded-xl border-2 p-3 text-left transition-all duration-200 ${
                  isActive
                    ? `${tierColors[t]} scale-[1.02] shadow-md bg-white dark:bg-[#2a1f0e]`
                    : 'border-transparent bg-brand-cream/50 dark:bg-brand-brown/20 hover:border-gray-300 dark:hover:border-neutral-600'
                }`}
              >
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-heading text-sm text-brand-brown dark:text-brand-cream">
                    {config.name}
                  </span>
                  <span className="text-base font-bold text-brand-primary dark:text-brand-primary-light">
                    ${config.price}
                  </span>
                </div>
                <div className="text-[10px] font-normal text-gray-500 dark:text-neutral-400 mt-0.5">
                  {config.priceLabel}
                </div>
                <ul className="mt-1.5 space-y-0.5">
                  {config.features.map((f) => (
                    <li key={f} className="text-[11px] text-gray-600 dark:text-neutral-400 flex items-start gap-1">
                      <span className="text-brand-primary shrink-0">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
