import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { getAllArticles } from '@/data/queries/getArticles';

export async function LatestThoughtsSection() {
  const articles = await getAllArticles();

  return (
    <section className="border-b border-border-primary/40 bg-bg-primary/50 py-16 md:py-24">
      <div className="section-container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              // THINGS_I_WRITE_ABOUT
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Latest Thoughts
            </h2>
          </div>
          <Link
            href="/thoughts"
            className="group hidden items-center gap-1.5 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-white sm:flex"
          >
            <span>All articles</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 ease-out-premium group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <Link
          href="/thoughts"
          className="group mt-8 flex items-center justify-center gap-1.5 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-white sm:hidden"
        >
          <span>All articles</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 ease-out-premium group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
