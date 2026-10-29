import { Section } from '@/components/atoms/Section';
import { Reveal } from '@/components/atoms/Reveal';
import { RepoCard } from '@/components/molecules/RepoCard';
import { getAllRepos } from '@/data/queries/getRepos';

export async function RepoGridSection() {
  const repos = await getAllRepos();

  return (
    <Section>
      <div className="grid gap-6 sm:grid-cols-2">
        {repos.map((repo, index) => (
          <Reveal key={repo.id} delay={(index % 2) * 70} className="h-full">
            <RepoCard repo={repo} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
