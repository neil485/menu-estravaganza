import { useState } from 'react';
import type { FlatMenuItem } from '../types/menu';
import MenuCard from './MenuCard';
import ItemDetailModal from './ItemDetailModal';
import { useTier } from '../context/TierContext';

interface MenuGridProps {
  items: FlatMenuItem[];
  categoryName: string;
  categoryNote?: string;
}

export default function MenuGrid({ items, categoryName, categoryNote }: MenuGridProps) {
  const { tierConfig } = useTier();
  const [selectedItem, setSelectedItem] = useState<FlatMenuItem | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h2 className="text-2xl font-heading text-brand-brown dark:text-brand-cream">{categoryName}</h2>
        {categoryNote && (
          <p className="text-sm text-brand-primary dark:text-brand-primary-light mt-1 font-medium">{categoryNote}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onClick={tierConfig.showItemModal ? () => setSelectedItem(item) : undefined}
          />
        ))}
      </div>
      {tierConfig.showItemModal && (
        <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}
