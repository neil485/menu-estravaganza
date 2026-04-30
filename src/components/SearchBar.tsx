interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar en el men\u00FA..."
          className="w-full px-4 py-2.5 pl-10 rounded-xl border border-brand-cream-dark dark:border-brand-brown/50 bg-white dark:bg-[#2a1f0e] text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-neutral-600 focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary outline-none transition-colors text-sm"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
