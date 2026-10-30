import Link from 'next/link';
import { Pencil, Plus } from 'lucide-react';
import { Reveal } from '@/components/atoms/Reveal';
import { getAllProjects } from '@/data/queries/getProjects';
import { deleteProjectAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">// MANAGE_PROJECTS</p>
            <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-white">Projects</h1>
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition-[background-color,transform] duration-150 hover:bg-white/90 active:scale-97"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> New project
          </Link>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <ul className="mt-8 space-y-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex flex-col justify-between gap-3 rounded-lg border border-border-primary/60 bg-bg-secondary/40 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">
                  {project.name}
                  {project.featured && <span className="ml-2 font-mono text-[10px] text-accent">FEATURED</span>}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-text-muted">
                  /{project.slug} · {project.year} · {project.status}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent"
                >
                  <Pencil className="h-3 w-3" aria-hidden="true" /> Edit
                </Link>
                <form action={deleteProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-red-500/60 hover:text-red-400"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
          {projects.length === 0 && (
            <li className="rounded-lg border border-dashed border-border-primary/60 p-8 text-center font-mono text-xs text-text-muted">
              No projects yet — create the first one.
            </li>
          )}
        </ul>
      </Reveal>
    </div>
  );
}
