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
      <section className="py-8 md:py-12">
        <div className="section-container">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`rounded-md border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-[border-color,background-color,color,transform] duration-150 ease-out-premium active:scale-97 ${
                  activeFilter === category.id
                    ? 'border-accent bg-accent font-semibold text-black'
                    : 'border-border-primary/80 bg-bg-secondary/60 text-text-secondary hover:border-accent/50 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
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
