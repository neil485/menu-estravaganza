import { useState } from 'react';
import type { FlatMenuItem } from '../types/menu';
import MenuCard from './MenuCard';
import ItemDetailModal from './ItemDetailModal';

interface MenuGridProps {
  items: FlatMenuItem[];
  categoryName: string;
  categoryNote?: string;
}

export default function MenuGrid({ items, categoryName, categoryNote }: MenuGridProps) {
  const [selectedItem, setSelectedItem] = useState<FlatMenuItem | null>(null);

  // Agrupar por subcategoria si existe
  const hasSubcategories = items.some((item) => item.subcategory);

  const grouped = hasSubcategories
    ? items.reduce<{ label: string; items: FlatMenuItem[] }[]>((acc, item) => {
        const label = item.subcategory ?? '';
        const existing = acc.find((g) => g.label === label);
        if (existing) {
          existing.items.push(item);
        } else {
          acc.push({ label, items: [item] });
        }
        return acc;
      }, [])
    : [{ label: '', items }];

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h2 className="text-2xl font-heading text-brand-brown dark:text-brand-cream">{categoryName}</h2>
        {categoryNote && (
          <p className="text-sm text-brand-primary dark:text-brand-primary-light mt-1 font-medium">{categoryNote}</p>
        )}
      </div>
      {grouped.map((group) => (
        <div key={group.label || 'default'} className={group.label ? 'mb-6' : ''}>
          {group.label && (
            <h3 className="text-lg font-heading text-brand-primary dark:text-brand-primary-light mb-3 border-b border-brand-primary/20 dark:border-brand-primary-light/20 pb-1">
              {group.label}
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {group.items.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
      ))}
      <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
