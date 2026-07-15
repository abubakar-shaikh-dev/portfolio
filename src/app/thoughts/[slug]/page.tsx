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
    <section className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/thoughts"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:text-accent-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to thoughts
            </Link>
          </div>

          <article className="space-y-8">
            <header className="space-y-4 border-b border-border-primary pb-8">
              <span className="inline-block border border-border-primary bg-bg-secondary px-2.5 py-0.5 font-mono text-xs uppercase tracking-wider text-accent-orange">
                {article.category}
              </span>
              <h1 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                {article.title}
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                {content.subtitle}
              </p>
              <div className="flex flex-wrap gap-6 pt-2 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent-orange" />
                  {article.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent-orange" />
                  {article.readTime} read
                </span>
              </div>
            </header>

            <div className="border-l-2 border-accent-orange pl-6 py-1">
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
                    <div className="border border-border-primary bg-[#0f0f0f] p-5 font-mono text-sm leading-relaxed text-[#c9d1d9] overflow-x-auto rounded-sm">
                      <pre><code>{section.code}</code></pre>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="border border-border-primary bg-bg-secondary p-8 space-y-3">
              <h3 className="text-lg font-bold uppercase tracking-wider font-mono text-accent-orange">
                // Summary
              </h3>
              <p className="leading-relaxed text-text-secondary">
                {content.conclusion}
              </p>
            </div>

            <footer className="flex flex-wrap items-center justify-between border-t border-border-primary pt-8">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border-primary bg-bg-secondary px-2.5 py-0.5 font-mono text-xs text-text-muted"
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
