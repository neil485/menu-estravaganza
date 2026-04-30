import type { FlatMenuItem } from '../types/menu';
import { useTier } from '../context/TierContext';

interface MenuCardProps {
  item: FlatMenuItem;
  onClick?: () => void;
}

export default function MenuCard({ item, onClick }: MenuCardProps) {
  const { tierConfig } = useTier();

  return (
    <div onClick={onClick} className={`group bg-white dark:bg-[#2a1f0e] rounded-xl border border-brand-cream-dark dark:border-brand-brown/50 overflow-hidden hover:shadow-lg hover:border-brand-primary/40 dark:hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-0.5 ${onClick ? 'cursor-pointer' : ''}`}>
      {tierConfig.showImages && (
        <div className="h-36 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-brand-cream-dark/60 dark:bg-brand-brown/30 flex items-center justify-center">
              <span className="text-sm italic text-brand-brown-light/40 dark:text-neutral-600">
                Imagen aqu&iacute;
              </span>
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-heading text-brand-brown dark:text-brand-cream text-lg group-hover:text-brand-primary dark:group-hover:text-brand-primary-light transition-colors">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-brand-primary dark:text-brand-primary-light shrink-0">
            {item.price > 0 ? `$${item.price.toFixed(2)}` : 'Consultar'}
          </span>
        </div>
        <p className="text-sm text-brand-brown-light/70 dark:text-brand-cream-dark/70 mt-1 leading-relaxed">
          {item.description}
        </p>
        {item.note && (
          <span className="inline-block mt-2 text-xs bg-brand-primary/10 text-brand-primary dark:text-brand-secondary px-2 py-0.5 rounded-full font-medium">
            {item.note}
          </span>
        )}
      </div>
    </div>
  );
}
