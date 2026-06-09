import { useState, useMemo } from 'react';
import { ThoughtsHeroSection } from '@/sections/thoughts/ThoughtsHeroSection';
import { ThoughtsFilterSection } from '@/sections/thoughts/ThoughtsFilterSection';
import { ThoughtsListSection } from '@/sections/thoughts/ThoughtsListSection';
import { articles } from '@/data/articles';

export function ThoughtsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'all') return articles;
    return articles.filter((article) => article.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <ThoughtsHeroSection />
      <ThoughtsFilterSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <ThoughtsListSection articles={filteredArticles} />
    </>
  );
}
