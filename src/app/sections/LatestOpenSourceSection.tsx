import { Section } from '@/components/atoms/Section';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { RepoCard } from '@/components/molecules/RepoCard';
import { getAllRepos } from '@/data/queries/getRepos';

export async function LatestOpenSourceSection() {
  const repos = await getAllRepos();

  return (
    <Section className="border-b border-border-primary/40">
      <SectionHeader
        label="OPEN_SOURCE_PROJECTS"
        title="Latest Open Source"
        viewAllLink="/open-source"
        viewAllLabel="View all repos"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {repos.slice(0, 4).map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </Section>
  );
}
