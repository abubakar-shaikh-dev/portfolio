import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getArticleBySlug, getAllArticles } from '@/data/queries/getArticles';
import { articleContent } from '@/data/articleContent';
import { notFound } from 'next/navigation';

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Abubakar Shaikh`,
      description: article.excerpt,
      type: 'article',
      authors: 'Abubakar Shaikh',
      tags: article.tags,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const content = articleContent[slug];

  if (!article || !content) {
    notFound();
  }

  return (
    <section className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/thoughts"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to thoughts
            </Link>
          </div>

          <article className="space-y-8">
            <header className="space-y-4 border-b border-border-primary/60 pb-8">
              <span className="inline-block rounded-md border border-border-primary/80 bg-bg-secondary px-3 py-1 font-mono text-xs font-semibold text-accent">
                {article.category}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {article.title}
              </h1>
              <p className="text-lg leading-relaxed text-text-secondary sm:text-xl">
                {content.subtitle}
              </p>
              <div className="flex flex-wrap gap-6 pt-2 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  {article.readTime} read
                </span>
              </div>
            </header>

            <div className="border-l-2 border-accent pl-6 py-1">
              <p className="text-lg leading-relaxed text-text-secondary italic">
                {content.introduction}
              </p>
            </div>

            <div className="space-y-12 py-4">
              {content.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {section.heading}
                  </h2>
                  <p className="leading-relaxed text-text-secondary text-base">
                    {section.body}
                  </p>
                  {section.code && (
                    <div className="rounded-xl border border-border-primary/80 bg-[#0c0c0c] p-6 font-mono text-sm leading-relaxed text-[#c9d1d9] overflow-x-auto shadow-inner">
                      <pre><code>{section.code}</code></pre>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-8 space-y-3 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-accent">
                // SUMMARY
              </h3>
              <p className="leading-relaxed text-text-secondary">
                {content.conclusion}
              </p>
            </div>

            <footer className="flex flex-wrap items-center justify-between border-t border-border-primary/60 pt-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border-primary/60 bg-bg-secondary px-3 py-1 font-mono text-xs text-text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
