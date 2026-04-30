import type { Category } from '../types/menu';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export default function CategoryTabs({ categories, activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="sticky top-[49px] z-40 bg-brand-cream/90 dark:bg-brand-darker/90 backdrop-blur-md border-b border-brand-cream-dark dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <nav className="flex gap-1 px-4 py-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-brand-cream-dark dark:bg-neutral-900 text-brand-brown dark:text-gray-300 hover:bg-brand-primary/10 dark:hover:bg-neutral-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
