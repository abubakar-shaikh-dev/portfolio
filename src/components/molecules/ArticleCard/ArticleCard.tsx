import Link from 'next/link';
import type { Article } from '@/data/types/article.types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/thoughts/${article.slug}`}
      className="card group block p-6"
    >
      <div className="mb-3 flex items-center gap-2 text-xs text-text-muted">
        <time>{article.date}</time>
        <span className="text-border-primary">·</span>
        <span>{article.readTime}</span>
      </div>
      <h3 className="line-clamp-2 font-semibold text-white transition-colors group-hover:text-accent-orange">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
        {article.excerpt}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="bg-surface-hover px-2 py-0.5 font-mono text-[11px] text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
