"use client";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FilterBar({ categories, selectedCategory, onSelectCategory }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-6 w-full md:w-64 flex-shrink-0">
      <div>
        <h3 className="text-zinc-900 dark:text-white font-black uppercase tracking-widest mb-4 border-b border-zinc-200 dark:border-white/10 pb-2">
          Categorías
        </h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`text-sm uppercase tracking-wider font-bold transition-colors ${
                  selectedCategory === category 
                    ? 'text-zinc-900 dark:text-white' 
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-zinc-900 dark:text-white font-black uppercase tracking-widest mb-4 border-b border-zinc-200 dark:border-white/10 pb-2 mt-8">
          Filtros
        </h3>
        <p className="text-zinc-500 text-xs italic">Filtros ordenables próximos a integrarse...</p>
      </div>
    </div>
  );
}
