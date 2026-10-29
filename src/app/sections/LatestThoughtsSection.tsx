import { Section } from '@/components/atoms/Section';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { getAllArticles } from '@/data/queries/getArticles';

export async function LatestThoughtsSection() {
  const articles = await getAllArticles();

  return (
    <Section className="border-b border-border-primary/40 bg-bg-primary/50">
      <SectionHeader
        label="THINGS_I_WRITE_ABOUT"
        title="Latest Thoughts"
        viewAllLink="/thoughts"
        viewAllLabel="All articles"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 6).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </Section>
  );
}
