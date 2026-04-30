import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryTabs from './components/CategoryTabs';
import MenuGrid from './components/MenuGrid';
import InfoSection from './components/InfoSection';
import SocialSection from './components/SocialSection';
import WhatsAppButton from './components/WhatsAppButton';
import SearchBar from './components/SearchBar';
import TierSelectorBar from './components/TierSelectorBar';
import AdminPanelBanner from './components/AdminPanelBanner';
import { useTheme } from './hooks/useTheme';
import { TierProvider, useTier } from './context/TierContext';
import { categories, menuItems } from './data/menuData';
import type { FlatMenuItem } from './types/menu';

const categoryNotes: Record<string, string> = {
  desayunos: 'Todos los desayunos incluyen cafe',
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
  }));
}

function AppContent() {
  const { isDark, toggle } = useTheme();
  const { tierConfig } = useTier();
  const [categoriaActiva, setCategoriaActiva] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCat = categories.find((c) => c.id === categoriaActiva);

  // Busqueda global
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    const resultados = flattenAllItems().filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    return (
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
        <MenuGrid
          items={resultados}
          categoryName={`Resultados: "${searchQuery}"`}
        />
        {tierConfig.showWhatsApp && <WhatsAppButton />}
        {tierConfig.showAdminBanner && <AdminPanelBanner />}
        <TierSelectorBar />
        <footer className="text-center py-8 text-sm text-brand-brown/60 dark:text-brand-cream/40">
          <p className="font-heading text-lg">Extravaganza</p>
          <p>Restaurant &amp; Bar &middot; Corinto, El Salvador</p>
        </footer>
      </div>
    );
  }

  // Secciones especiales
  if (categoriaActiva === 'info') {
    return (
      <div className="min-h-screen pb-20 bg-brand-cream dark:bg-brand-dark transition-colors">
        <Header isDark={isDark} onToggleTheme={toggle} />
        <Hero />
        <CategoryTabs
          categories={categories}
          activeCategory={categoriaActiva}
          onSelect={setCategoriaActiva}
        />
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
        <InfoSection />
        {tierConfig.showWhatsApp && <WhatsAppButton />}
        {tierConfig.showAdminBanner && <AdminPanelBanner />}
        <TierSelectorBar />
        <footer className="text-center py-8 text-sm text-brand-brown/60 dark:text-brand-cream/40">
          <p className="font-heading text-lg">Extravaganza</p>
          <p>Restaurant &amp; Bar &middot; Corinto, El Salvador</p>
        </footer>
      </div>
    );
  }

  if (categoriaActiva === 'siguenos') {
    return (
      <div className="min-h-screen pb-20 bg-brand-cream dark:bg-brand-dark transition-colors">
        <Header isDark={isDark} onToggleTheme={toggle} />
        <Hero />
        <CategoryTabs
          categories={categories}
          activeCategory={categoriaActiva}
          onSelect={setCategoriaActiva}
        />
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
        <SocialSection />
        {tierConfig.showWhatsApp && <WhatsAppButton />}
        {tierConfig.showAdminBanner && <AdminPanelBanner />}
        <TierSelectorBar />
        <footer className="text-center py-8 text-sm text-brand-brown/60 dark:text-brand-cream/40">
          <p className="font-heading text-lg">Extravaganza</p>
          <p>Restaurant &amp; Bar &middot; Corinto, El Salvador</p>
        </footer>
      </div>
    );
  }

  // Categoria normal con items del menu
  const items = flattenItems(categoriaActiva);

  return (
    <div className="min-h-screen pb-20 bg-brand-cream dark:bg-brand-dark transition-colors">
      <Header isDark={isDark} onToggleTheme={toggle} />
      <Hero />
      <CategoryTabs
        categories={categories}
        activeCategory={categoriaActiva}
        onSelect={setCategoriaActiva}
      />
      <SearchBar query={searchQuery} onChange={setSearchQuery} />
      <MenuGrid
        items={items}
        categoryName={activeCat?.name ?? ''}
        categoryNote={categoryNotes[categoriaActiva]}
      />
      {tierConfig.showWhatsApp && <WhatsAppButton />}
      {tierConfig.showAdminBanner && <AdminPanelBanner />}
      <TierSelectorBar />
      <footer className="text-center py-8 text-sm text-brand-brown/60 dark:text-brand-cream/40">
        <p className="font-heading text-lg">Extravaganza</p>
        <p>Restaurant &amp; Bar &middot; Corinto, El Salvador</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TierProvider>
      <AppContent />
    </TierProvider>
  );
}
