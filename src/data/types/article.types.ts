export interface Article {
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
