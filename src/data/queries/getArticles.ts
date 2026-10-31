import articlesJson from '@/data/json/articles.json';
import { fetchCollection, fetchOne } from '@/lib/db';
import type { Article, ArticleCategory } from '@/data/types/article.types';

const FALLBACK = articlesJson as Article[];

/** Newest first, preserving the curated JSON order. */
export async function getAllArticles(): Promise<Article[]> {
  return fetchCollection<Article>('articles', FALLBACK, { sort: { order: 1 } });
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const fromDb = await fetchOne<Article>('articles', { slug }, null);
  return fromDb ?? FALLBACK.find((a) => a.slug === slug);
}

export async function getArticleCategories(): Promise<ArticleCategory[]> {
  return [
    { id: 'all', label: 'All' },
    { id: 'backend', label: 'Backend & APIs' },
    {id: 'devops', label: 'Infrastructure & DevOps' },
    { id: 'ai', label: 'AI & Real-time' },
    { id: 'security', label: 'Security & Tooling' },
  ];
}
