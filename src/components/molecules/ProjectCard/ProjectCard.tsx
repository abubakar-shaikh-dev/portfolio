import Link from 'next/link';
import type { Project } from '@/data/types/project.types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col justify-between border border-border-primary bg-bg-secondary p-6 transition-[border-color,transform] duration-200 ease-out-premium hover:border-accent-orange hover:-translate-y-0.5 active:scale-98"
    >
      <div>
        <h3 className="mb-2 text-base font-semibold text-white transition-colors group-hover:text-accent-orange">
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary line-clamp-3">
          {project.description}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="border border-border-primary bg-bg-primary px-2.5 py-0.5 font-mono text-[10px] text-text-secondary transition-colors group-hover:border-accent-orange/30 group-hover:text-white"
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="font-mono text-[10px] text-text-muted">
            +{project.stack.length - 4} more
          </span>
        )}
      </div>
    </Link>
  );
}
