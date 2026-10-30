import Link from 'next/link';
import { Pencil, Plus } from 'lucide-react';
import { Reveal } from '@/components/atoms/Reveal';
import { getAllRepos } from '@/data/queries/getRepos';
import { deleteRepoAction } from '../actions';
import { ConfirmSubmit } from '../confirm-submit';

export const dynamic = 'force-dynamic';

export default async function AdminReposPage() {
  const repos = await getAllRepos();

  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">// MANAGE_REPOS</p>
            <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-white">Open Source</h1>
          </div>
          <Link
            href="/admin/repos/new"
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition-[background-color,transform] duration-150 hover:bg-white/90 active:scale-97"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> New repo
          </Link>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <ul className="mt-8 space-y-3">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="flex flex-col justify-between gap-3 rounded-lg border border-border-primary/60 bg-bg-secondary/40 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <p className="truncate font-mono font-semibold text-white">{repo.name}</p>
                <p className="mt-0.5 font-mono text-[10px] text-text-muted">
                  {repo.language} · ★ {repo.stars} · {repo.forks} forks
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/repos/${repo.id}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent"
                >
                  <Pencil className="h-3 w-3" aria-hidden="true" /> Edit
                </Link>
                <ConfirmSubmit
                  action={deleteRepoAction}
                  id={repo.id}
                  title={`Delete “${repo.name}”?`}
                  description="This removes the repository from the open-source grid. This action cannot be undone."
                  triggerClassName="rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-red-500/60 hover:text-red-400"
                >
                  Delete
                </ConfirmSubmit>
              </div>
            </li>
          ))}
          {repos.length === 0 && (
            <li className="rounded-lg border border-dashed border-border-primary/60 p-8 text-center font-mono text-xs text-text-muted">
              No repos yet.
            </li>
          )}
        </ul>
      </Reveal>
    </div>
  );
}
