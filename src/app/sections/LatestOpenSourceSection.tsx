import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RepoCard } from '@/components/molecules/RepoCard';
import { getAllRepos } from '@/data/queries/getRepos';

export async function LatestOpenSourceSection() {
  const repos = await getAllRepos();

  return (
    <section className="py-20">
      <div className="section-container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mono-accent mb-3">// things_i_open_source</p>
            <h2 className="text-display-md font-display font-bold text-white">Latest Open Source</h2>
          </div>
          <Link
            href="/open-source"
            className="hidden items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent-orange sm:flex"
          >
            View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {repos.slice(0, 5).map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        <Link
          href="/open-source"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent-orange sm:hidden"
        >
          View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
