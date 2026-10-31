import { Section } from '@/components/atoms/Section';
import { Reveal } from '@/components/atoms/Reveal';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { getAllProjects } from '@/data/queries/getProjects';

export async function LatestProjectsSection() {
  const projects = await getAllProjects();

  return (
    <Section className="border-b border-border-primary/40">
      <Reveal>
        <SectionHeader
          label="Things I build"
          title="Featured Projects"
          viewAllLink="/projects"
          viewAllLabel="View all projects"
        />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={index * 70} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
