import Link from 'next/link';
import { Pencil, Plus } from 'lucide-react';
import { Reveal } from '@/components/atoms/Reveal';
import { getAllServices } from '@/data/queries/getServices';
import { deleteServiceAction } from '../actions';
import { getAllSkills } from '@/data/queries/getSkills';
import { SkillsForm } from './SkillsForm';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  const [services, skills] = await Promise.all([getAllServices(), getAllSkills()]);

  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">// MANAGE_SERVICES</p>
            <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-white">Services & Skills</h1>
          </div>
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black transition-[background-color,transform] duration-150 hover:bg-white/90 active:scale-97"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> New service
          </Link>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <ul className="mt-8 space-y-3">
          {services.map((service) => (
            <li
              key={service.id}
              className="flex flex-col justify-between gap-3 rounded-lg border border-border-primary/60 bg-bg-secondary/40 p-4 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{service.title}</p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-text-muted">
                  {service.techStack.join(' · ')}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/services/${service.id}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent"
                >
                  <Pencil className="h-3 w-3" aria-hidden="true" /> Edit
                </Link>
                <form action={deleteServiceAction}>
                  <input type="hidden" name="id" value={service.id} />
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
        </ul>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-10 rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">// HERO_SKILLS</p>
          <h2 className="font-display mt-2 text-xl font-bold text-white">Core technologies (home hero)</h2>
          <p className="mt-1 text-sm text-text-secondary">Two rows of comma-separated skills shown under the hero.</p>
          <div className="mt-5">
            <SkillsForm initial={skills} />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
