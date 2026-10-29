import { Section } from '@/components/atoms/Section';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { getAllProjects } from '@/data/queries/getProjects';

export async function LatestProjectsSection() {
  const projects = await getAllProjects();

  return (
    <Section className="border-b border-border-primary/40">
      <SectionHeader
        label="THINGS_I_BUILD"
        title="Featured Projects"
        viewAllLink="/projects"
        viewAllLabel="View all projects"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
