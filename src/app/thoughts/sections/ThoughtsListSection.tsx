'use client';

import { useState, useMemo } from 'react';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { getAllArticles, getArticleCategories } from '@/data/queries/getArticles';

interface ThoughtsListSectionProps {
  articles: Awaited<ReturnType<typeof getAllArticles>>;
  categories: Awaited<ReturnType<typeof getArticleCategories>>;
}

export function ThoughtsListSectionClient({ articles, categories }: ThoughtsListSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'all') return articles;
    return articles.filter((article) => article.category === activeFilter);
  }, [activeFilter, articles]);

  return (
    <>
      <section className="pb-8">
        <div className="section-container">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
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

      <section className="pb-20">
        <div className="section-container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
