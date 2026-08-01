import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/types/project.types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col justify-between rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6 transition-[border-color,background-color,transform] duration-150 ease-out-premium hover:border-accent/40 hover:bg-bg-secondary active:scale-98"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-white transition-colors duration-150 group-hover:text-accent">
            {project.name}
          </h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-150 ease-out-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border-primary/60 bg-bg-primary px-2.5 py-0.5 font-mono text-[10px] text-text-muted transition-colors duration-150 group-hover:border-accent/20 group-hover:text-text-secondary"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="font-mono text-[10px] text-text-muted">
            +{project.stack.length - 4}
          </span>
        )}
      </div>
    </Link>
  );
}
