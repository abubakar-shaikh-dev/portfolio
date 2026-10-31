import { ArrowUpRight, Code2, ExternalLink, FileText, Link2 } from 'lucide-react';
import type { Paper, PaperStatus } from '@/data/types/paper.types';
import { PAPER_STATUS_LABELS } from '@/data/queries/getPapers';
import { SITE_NAME } from '@/lib/constants';

const STATUS_STYLES: Record<PaperStatus, string> = {
  published: 'border-accent/40 bg-accent/10 text-accent',
  preprint: 'border-border-primary bg-bg-secondary text-text-secondary',
  'under-review': 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  'in-progress': 'border-border-primary/60 bg-bg-secondary/60 text-text-muted',
};

interface PaperCardProps {
  paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
  const links = [
    { label: 'PDF', href: paper.links.pdf, icon: FileText },
    { label: 'DOI', href: paper.links.doi, icon: Link2 },
    { label: 'arXiv', href: paper.links.arxiv, icon: ExternalLink },
    { label: 'Code', href: paper.links.code, icon: Code2 },
  ].filter((link): link is { label: string; href: string; icon: typeof FileText } => Boolean(link.href));

  return (
    <article className="group flex h-full flex-col rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6 transition-[border-color,background-color] duration-150 ease-out-premium hover:border-accent/40 hover:bg-bg-secondary">
      <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px]">
        <span
          className={`rounded-md border px-2.5 py-0.5 ${STATUS_STYLES[paper.status]}`}
        >
          {PAPER_STATUS_LABELS[paper.status] ?? paper.status}
        </span>
        <span className="text-text-muted">{paper.venue} · {paper.year}</span>
      </div>

      <h3 className="text-lg font-medium leading-snug text-white transition-colors duration-150 group-hover:text-accent">
        {paper.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {paper.authors.map((author, index) => (
          <span key={author}>
            {index > 0 && <span className="text-text-muted">, </span>}
            <span className={author === SITE_NAME ? 'font-medium text-white' : undefined}>{author}</span>
          </span>
        ))}
      </p>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-secondary">
        {paper.abstract}
      </p>

      <div className="mt-auto pt-5">
        {paper.keywords.length > 0 && (
          <p className="font-mono text-[10px] text-text-muted">
            {paper.keywords.map((keyword) => `#${keyword}`).join(' ')}
          </p>
        )}
        {links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border-primary/70 bg-bg-primary px-3 py-1.5 font-mono text-[11px] text-text-secondary transition-[border-color,color,transform] duration-150 ease-out-premium hover:border-accent/50 hover:text-accent active:scale-97"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-150 group-hover:opacity-60" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
