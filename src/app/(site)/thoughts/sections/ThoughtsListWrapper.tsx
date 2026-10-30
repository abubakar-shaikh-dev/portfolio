import { getAllArticles, getArticleCategories } from '@/data/queries/getArticles';
import { ThoughtsListSectionClient } from './ThoughtsListSection';

export async function ThoughtsListWrapper() {
  const [articles, categories] = await Promise.all([
    getAllArticles(),
    getArticleCategories(),
  ]);

  return <ThoughtsListSectionClient articles={articles} categories={categories} />;
}
