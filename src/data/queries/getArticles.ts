import articlesJson from '@/data/json/articles.json';
import type { Article, ArticleCategory } from '@/data/types/article.types';

export async function getAllArticles(): Promise<Article[]> {
  return articlesJson as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getAllArticles();
  return articles.find((a) => a.slug === slug);
}

export async function getArticleCategories(): Promise<ArticleCategory[]> {
  return [
    { id: 'all', label: 'All' },
    { id: 'backend', label: 'Backend & APIs' },
    {id: 'devops', label: 'Infrastructure & DevOps' },
    { id: 'ai', label: 'AI & WebRTC' },
    { id: 'security', label: 'Security & Tooling' },
  ];
}
