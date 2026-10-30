import Link from 'next/link';
import { Pencil, Plus } from 'lucide-react';
import { Reveal } from '@/components/atoms/Reveal';
import { getAllArticles } from '@/data/queries/getArticles';
import { deleteArticleAction } from '../actions';
import { ConfirmSubmit } from '../confirm-submit';

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">// MANAGE_ARTICLES</p>
            <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-white">Articles</h1>
          </div>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition-[background-color,transform] duration-150 hover:bg-white/90 active:scale-97"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> New article
          </Link>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <ul className="mt-8 space-y-3">
          {articles.map((article) => (
            <li
              key={article.id}
              className="flex flex-col justify-between gap-3 rounded-lg border border-border-primary/60 bg-bg-secondary/40 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{article.title}</p>
                <p className="mt-0.5 font-mono text-[10px] text-text-muted">
                  /{article.slug} · {article.category} · {article.date}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/articles/${article.id}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent"
                >
                  <Pencil className="h-3 w-3" aria-hidden="true" /> Edit
                </Link>
                <ConfirmSubmit
                  action={deleteArticleAction}
                  id={article.id}
                  title={`Delete “${article.title}”?`}
                  description="This permanently removes the article from the live site. This action cannot be undone."
                  triggerClassName="rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-red-500/60 hover:text-red-400"
                >
                  Delete
                </ConfirmSubmit>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
