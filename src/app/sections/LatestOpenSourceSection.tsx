import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RepoCard } from '@/components/molecules/RepoCard';
import { getAllRepos } from '@/data/queries/getRepos';

export async function LatestOpenSourceSection() {
  const repos = await getAllRepos();

  return (
    <section className="border-b border-border-primary/40 py-16 md:py-24">
      <div className="section-container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              // OPEN_SOURCE_PROJECTS
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Latest Open Source
            </h2>
          </div>
          <Link
            href="/open-source"
            className="group hidden items-center gap-1.5 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-white sm:flex"
          >
            <span>View all repos</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 ease-out-premium group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {repos.slice(0, 4).map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        <Link
          href="/open-source"
          className="group mt-8 flex items-center justify-center gap-1.5 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-white sm:hidden"
        >
          <span>View all repos</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 ease-out-premium group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
