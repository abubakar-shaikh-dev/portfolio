import { Star, ExternalLink } from 'lucide-react';
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
      className="card group block p-6"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-mono text-sm font-semibold text-white transition-colors group-hover:text-accent-orange">
          {repo.name}
        </h3>
        <ExternalLink
          className="h-3.5 w-3.5 shrink-0 text-text-muted opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
        {repo.description}
      </p>
      <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5"
            style={{ backgroundColor: repo.languageColor }}
          />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3" aria-hidden="true" />
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
