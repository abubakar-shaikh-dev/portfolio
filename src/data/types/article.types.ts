import type { ArticleContent } from '@/data/articleContent';

export interface Article {
  /** Full body content from the DB (admin-edited); the static map is the fallback */
  content?: ArticleContent;
  id: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  readTime: string;
  tags: string[];
  slug: string;
  category: string;
  author: string;
}

export interface ArticleCategory {
  id: string;
  label: string;
}
