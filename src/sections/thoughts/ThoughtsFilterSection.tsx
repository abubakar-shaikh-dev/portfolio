import { categories } from '@/data/articles';

interface ThoughtsFilterSectionProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ThoughtsFilterSection({ activeFilter, onFilterChange }: ThoughtsFilterSectionProps) {
  return (
    <section className="pb-8">
      <div className="section-container">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onFilterChange(category.id)}
              className={`border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                activeFilter === category.id
                  ? 'border-accent-orange bg-accent-orange text-white'
                  : 'border-border-primary bg-transparent text-text-secondary hover:border-accent-orange hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
