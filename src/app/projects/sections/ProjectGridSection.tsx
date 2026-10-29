import { Section } from '@/components/atoms/Section';
import { Reveal } from '@/components/atoms/Reveal';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { getAllProjects } from '@/data/queries/getProjects';

export async function ProjectGridSection() {
  const projects = await getAllProjects();

  return (
    <Section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 3) * 70} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
