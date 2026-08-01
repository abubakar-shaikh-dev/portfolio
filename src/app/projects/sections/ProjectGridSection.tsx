import { ProjectCard } from '@/components/molecules/ProjectCard';
import { getAllProjects } from '@/data/queries/getProjects';

export async function ProjectGridSection() {
  const projects = await getAllProjects();

  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
