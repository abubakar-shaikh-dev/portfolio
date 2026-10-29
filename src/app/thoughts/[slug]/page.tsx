import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react';
import { getArticleBySlug, getAllArticles } from '@/data/queries/getArticles';
import { articleContent } from '@/data/articleContent';
import { notFound } from 'next/navigation';

const BASE_URL = 'https://abubakarshaikh.dev';

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

  const articleUrl = `${BASE_URL}/thoughts/${slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      title: `${article.title} | Abubakar Shaikh`,
      description: article.excerpt,
      url: articleUrl,
      type: 'article',
      publishedTime: article.dateISO,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: '/images/profile_2.webp',
          width: 1200,
          height: 1200,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.excerpt,
      images: ['/images/profile_2.webp'],
    },
    alternates: {
      canonical: articleUrl,
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

  // Get related articles (same category, excluding current)
  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 2);

  // If not enough related by category, fill with recent articles
  if (relatedArticles.length < 2) {
    const moreArticles = allArticles
      .filter((a) => a.slug !== slug && !relatedArticles.some((r) => r.slug === a.slug))
      .slice(0, 2 - relatedArticles.length);
    relatedArticles.push(...moreArticles);
  }

  const articleUrl = `${BASE_URL}/thoughts/${slug}`;

  return (
    <section className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="section-container">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 hidden sm:block">
            <ol className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link href="/thoughts" className="transition-colors hover:text-white">Thoughts</Link>
              </li>
              <li><ChevronRight className="h-3 w-3" /></li>
              <li className="text-text-secondary truncate max-w-[200px]" aria-current="page">{article.title}</li>
            </ol>
          </nav>

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
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {article.title}
              </h1>
              <p className="text-lg leading-relaxed text-text-secondary sm:text-xl">
                {content.subtitle}
              </p>
              <div className="flex flex-wrap gap-6 pt-2 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <time dateTime={article.dateISO}>{article.date}</time>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  {article.readTime} read
                </span>
                <span className="flex items-center gap-2">
                  By {article.author}
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

          {/* Related Articles — Internal Linking per 30x-seo-internal-links */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 border-t border-border-primary/60 pt-12">
              <h2 className="mb-6 font-mono text-xs uppercase tracking-wider text-accent">
                // RELATED_ARTICLES
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/thoughts/${related.slug}`}
                    className="group rounded-xl border border-border-primary/60 bg-bg-secondary/40 p-6 transition-[border-color,background-color] duration-150 hover:border-accent/40 hover:bg-bg-secondary/80"
                  >
                    <span className="mb-2 inline-block rounded-md border border-border-primary/80 bg-bg-primary px-2 py-0.5 font-mono text-[10px] font-semibold text-accent">
                      {related.category}
                    </span>
                    <h3 className="text-base font-semibold text-white transition-colors group-hover:text-accent">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted line-clamp-2">
                      {related.excerpt}
                    </p>
                    <span className="mt-3 inline-block font-mono text-xs text-text-muted">
                      {related.readTime} read
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Article/BlogPosting + BreadcrumbList JSON-LD per 30x-seo-schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            url: articleUrl,
            datePublished: article.dateISO,
            dateModified: article.dateISO,
            author: {
              '@type': 'Person',
              '@id': `${BASE_URL}/#person`,
              name: article.author,
            },
            publisher: {
              '@type': 'Organization',
              '@id': `${BASE_URL}/#organization`,
              name: 'Abubakar Shaikh',
              logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/images/profile_2.webp`,
              },
            },
            image: `${BASE_URL}/images/profile_2.webp`,
            keywords: article.tags.join(', '),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': articleUrl,
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Thoughts', item: `${BASE_URL}/thoughts` },
                { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
              ],
            },
          }),
        }}
      />
    </section>
  );
}
