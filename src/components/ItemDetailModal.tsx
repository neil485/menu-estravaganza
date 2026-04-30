import type { FlatMenuItem } from '../types/menu';

interface ItemDetailModalProps {
  item: FlatMenuItem | null;
  onClose: () => void;
}

export default function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white dark:bg-[#2a1f0e] rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-brand-cream-dark dark:border-brand-brown/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 text-lg leading-none"
        >
          &times;
        </button>

        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
        ) : (
          <div className="w-full h-40 bg-brand-cream-dark/60 dark:bg-brand-brown/30 flex items-center justify-center">
            <span className="text-sm italic text-brand-brown-light/40 dark:text-neutral-600">Sin imagen</span>
          </div>
        )}

        <div className="p-5">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-xl font-heading text-brand-brown dark:text-brand-cream">
              {item.name}
            </h3>
            <span className="text-xl font-bold text-brand-primary dark:text-brand-primary-light shrink-0">
              {item.price > 0 ? `$${item.price.toFixed(2)}` : 'Consultar'}
            </span>
          </div>
          <p className="text-sm text-brand-brown-light/70 dark:text-brand-cream-dark/70 leading-relaxed">
            {item.description}
          </p>
          {item.note && (
            <span className="inline-block mt-3 text-xs bg-brand-primary/10 text-brand-primary dark:text-brand-secondary px-2 py-0.5 rounded-full font-medium">
              {item.note}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
