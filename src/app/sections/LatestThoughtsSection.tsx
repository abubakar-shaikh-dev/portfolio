import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { getAllArticles } from '@/data/queries/getArticles';

export async function LatestThoughtsSection() {
  const articles = await getAllArticles();

  return (
    <section className="bg-surface-elevated py-20" style={{ backgroundColor: 'rgba(20,20,20,0.3)' }}>
      <div className="section-container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mono-accent mb-3">// things_i_write_about</p>
            <h2 className="text-display-md font-display font-bold text-white">Latest Thoughts</h2>
          </div>
          <Link
            href="/thoughts"
            className="hidden items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent-orange sm:flex"
          >
            All articles <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <Link
          href="/thoughts"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent-orange sm:hidden"
        >
          All articles <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
