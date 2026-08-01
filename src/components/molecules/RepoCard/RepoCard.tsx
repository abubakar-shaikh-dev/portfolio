import { Star, ArrowUpRight } from 'lucide-react';
import type { Repo } from '@/data/types/repo.types';

interface RepoCardProps {
  repo: Repo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={`https://github.com/abubakar-shaikh-dev/${repo.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col justify-between rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6 transition-[border-color,background-color,transform] duration-150 ease-out-premium hover:border-accent/40 hover:bg-bg-secondary active:scale-98"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono text-base font-bold text-white transition-colors duration-150 group-hover:text-accent">
            {repo.name}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-150 ease-out-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {repo.description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-4 font-mono text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: repo.languageColor || '#10b981' }}
          />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
          {repo.stars}
        </span>
        {repo.forks > 0 && (
          <span className="flex items-center gap-1">
            {repo.forks} forks
          </span>
        )}
      </div>
    </a>
  );
}
