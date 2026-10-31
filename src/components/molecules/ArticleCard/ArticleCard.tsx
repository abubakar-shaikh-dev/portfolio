import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { Article } from '@/data/types/article.types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/thoughts/${article.slug}`}
      className="group flex h-full flex-col justify-between rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6 transition-[border-color,background-color,transform] duration-150 ease-out-premium hover:border-accent/40 hover:bg-bg-secondary active:scale-98"
    >
      <div>
        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-text-muted">
          <time>{article.date}</time>
          <span className="text-border-primary">•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-text-muted" />
            {article.readTime}
          </span>
        </div>
        <h3 className="line-clamp-2 text-lg font-medium text-white transition-colors duration-150 group-hover:text-accent">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {article.excerpt}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border-primary/60 bg-bg-primary px-2.5 py-0.5 font-mono text-[10px] text-text-muted transition-colors duration-150 group-hover:border-accent/20 group-hover:text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
