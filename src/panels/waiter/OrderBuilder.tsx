import { useState } from 'react';
import { menuItems, categories } from '../../data/menuData';
import type { OrderItem } from '../../types/restaurant';

interface OrderBuilderProps {
  tableLabel: string;
  onSubmit: (items: OrderItem[]) => void;
  onCancel: () => void;
}

export default function OrderBuilder({ tableLabel, onSubmit, onCancel }: OrderBuilderProps) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState(categories[0].id);

  const foodCategories = categories.filter(
    (c) => !['info', 'siguenos'].includes(c.id)
  );

  function updateQty(itemId: string, delta: number) {
    setItems((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: next };
    });
  }

  const selectedCount = Object.values(items).reduce((a, b) => a + b, 0);
  const catItems = menuItems.filter((m) => m.category === activeCat);

  function handleSubmit() {
    const orderItems: OrderItem[] = Object.entries(items).map(([id, qty]) => {
      const mi = menuItems.find((m) => m.id === id)!;
      return {
        menuItemId: id,
        name: mi.name,
        quantity: qty,
        unitPrice: mi.price ?? 0,
      };
    });
    onSubmit(orderItems);
  }

  return (
    <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 overflow-hidden">
      <div className="p-4 border-b border-brand-primary/10 flex justify-between items-center">
        <h3 className="font-heading text-lg text-brand-primary">
          Nueva Orden - Mesa {tableLabel}
        </h3>
        <button onClick={onCancel} className="text-sm text-brand-brown/40 hover:text-brand-brown dark:text-brand-cream/40 dark:hover:text-brand-cream cursor-pointer">
          Cancelar
        </button>
      </div>

      {/* Category mini-tabs */}
      <div className="flex overflow-x-auto gap-1 p-2 bg-brand-cream/50 dark:bg-brand-dark/50 scrollbar-hide">
        {foodCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors cursor-pointer
              ${activeCat === cat.id
                ? 'bg-brand-primary text-white'
                : 'text-brand-brown/60 dark:text-brand-cream/50 hover:bg-brand-primary/10'
              }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Items list */}
      <div className="max-h-64 overflow-y-auto p-2 space-y-1">
        {catItems.map((item) => {
          const qty = items[item.id] || 0;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-cream/50 dark:hover:bg-brand-dark/30"
            >
              <div className="flex-1 min-w-0">
                <span className="text-sm text-brand-brown dark:text-brand-cream truncate block">
                  {item.name}
                </span>
                <span className="text-xs text-brand-primary">${(item.price ?? 0).toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 ml-2">
                {qty > 0 && (
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-7 h-7 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-bold flex items-center justify-center cursor-pointer hover:bg-brand-primary/20"
                  >
                    -
                  </button>
                )}
                {qty > 0 && (
                  <span className="text-sm font-semibold text-brand-brown dark:text-brand-cream w-4 text-center">
                    {qty}
                  </span>
                )}
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-7 h-7 rounded-full bg-brand-primary text-white text-sm font-bold flex items-center justify-center cursor-pointer hover:bg-brand-primary-dark"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <div className="p-4 border-t border-brand-primary/10 flex justify-between items-center">
        <span className="text-sm text-brand-brown/60 dark:text-brand-cream/50">
          {selectedCount} items
        </span>
        <button
          onClick={handleSubmit}
          disabled={selectedCount === 0}
          className="px-6 py-2 bg-brand-primary text-white font-heading rounded-lg
            hover:bg-brand-primary-dark transition-colors cursor-pointer
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Enviar a Cocina
        </button>
      </div>
    </div>
  );
}
