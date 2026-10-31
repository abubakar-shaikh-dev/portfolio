import { Section } from '@/components/atoms/Section';
import { Reveal } from '@/components/atoms/Reveal';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { RepoCard } from '@/components/molecules/RepoCard';
import { getAllRepos } from '@/data/queries/getRepos';

export async function LatestOpenSourceSection() {
  const repos = await getAllRepos();

  return (
    <Section className="border-b border-border-primary/40">
      <Reveal>
        <SectionHeader
          label="Open source projects"
          title="Latest Open Source"
          viewAllLink="/open-source"
          viewAllLabel="View all repos"
        />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {repos.slice(0, 4).map((repo, index) => (
          <Reveal key={repo.id} delay={index * 70} className="h-full">
            <RepoCard repo={repo} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
