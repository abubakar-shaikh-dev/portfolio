import { RepoCard } from '@/components/molecules/RepoCard';
import { getAllRepos } from '@/data/queries/getRepos';

export async function RepoGridSection() {
  const repos = await getAllRepos();

  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        <div className="grid gap-6 sm:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </section>
  );
}
