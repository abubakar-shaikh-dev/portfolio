export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  category: string;
}

export interface ArticleCategory {
  id: string;
  label: string;
}
