import { useState } from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import CategoryTabs from '../../components/CategoryTabs';
import MenuGrid from '../../components/MenuGrid';
import InfoSection from '../../components/InfoSection';
import SocialSection from '../../components/SocialSection';
import WhatsAppButton from '../../components/WhatsAppButton';
import SearchBar from '../../components/SearchBar';
import { useTheme } from '../../hooks/useTheme';
import { categories, menuItems } from '../../data/menuData';
import type { FlatMenuItem } from '../../types/menu';

const categoryNotes: Record<string, string> = {
  desayunos: 'Todos los desayunos incluyen cafe',
  'platos-fuertes': 'Todos los platos incluyen tortillas',
};

function flattenItems(categoryId: string): FlatMenuItem[] {
  return menuItems
    .filter((item) => item.category === categoryId)
    .map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price ?? 0,
      category: item.category,
      note: item.note,
      image: item.image,
      subcategory: item.subcategory,
    }));
}

function flattenAllItems(): FlatMenuItem[] {
  return menuItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price ?? 0,
    category: item.category,
    note: item.note,
    image: item.image,
    subcategory: item.subcategory,
  }));
}

export default function MenuPanel() {
  const { isDark, toggle } = useTheme();
  const [categoriaActiva, setCategoriaActiva] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCat = categories.find((c) => c.id === categoriaActiva);

  const renderFooter = () => (
    <footer className="text-center py-8 text-sm text-brand-brown/60 dark:text-brand-cream/40">
      <p className="font-heading text-lg">Extravaganza</p>
      <p>Restaurant &amp; Bar &middot; Corinto, El Salvador</p>
    </footer>
  );

  const renderShell = (content: React.ReactNode) => (
    <div className="min-h-screen pb-20 bg-brand-cream dark:bg-brand-dark transition-colors">
      <Header isDark={isDark} onToggleTheme={toggle} />
      <Hero />
      <CategoryTabs
        categories={categories}
        activeCategory={categoriaActiva}
        onSelect={(id) => {
          setCategoriaActiva(id);
          setSearchQuery('');
        }}
      />
      <SearchBar query={searchQuery} onChange={setSearchQuery} />
      {content}
      <WhatsAppButton />
      {renderFooter()}
    </div>
  );

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    const resultados = flattenAllItems().filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    return renderShell(
      <MenuGrid items={resultados} categoryName={`Resultados: "${searchQuery}"`} />
    );
  }

  if (categoriaActiva === 'info') return renderShell(<InfoSection />);
  if (categoriaActiva === 'siguenos') return renderShell(<SocialSection />);

  const items = flattenItems(categoriaActiva);
  return renderShell(
    <MenuGrid
      items={items}
      categoryName={activeCat?.name ?? ''}
      categoryNote={categoryNotes[categoriaActiva]}
    />
  );
}
