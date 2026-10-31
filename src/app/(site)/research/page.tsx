import type { Metadata } from 'next';
import { ResearchHeroSection } from './sections/ResearchHeroSection';
import { PaperListSection } from './sections/PaperListSection';
import { getAllPapers } from '@/data/queries/getPapers';
import { SITE_URL } from '@/lib/constants';

// ISR: admin edits surface within a minute without a redeploy
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Research papers, publications, and preprints by Abubakar Shaikh — peer-reviewed work and manuscripts from doctoral research.',
  keywords: [
    'Research Papers', 'Academic Publications', 'Peer-Reviewed Papers', 'Preprints',
    'Doctoral Research', 'PhD Publications', 'Abubakar Shaikh Research',
  ],
  openGraph: {
    title: 'Research | Abubakar Shaikh',
    description:
      'Research papers, publications, and preprints by Abubakar Shaikh — peer-reviewed work and manuscripts from doctoral research.',
    url: `${SITE_URL}/research`,
    type: 'website',
    images: [
      {
        url: '/images/profile_2.webp',
        width: 1200,
        height: 1200,
        alt: 'Abubakar Shaikh — Research Publications',
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/research`,
  },
};

export default async function ResearchPage() {
  const papers = await getAllPapers();

  // ScholarlyArticle items only for papers with a real external URL (DOI/arXiv/PDF)
  const scholarlyArticles = papers
    .map((paper) => ({ paper, link: paper.links.doi ?? paper.links.arxiv ?? paper.links.pdf }))
    .filter(({ link }) => Boolean(link))
    .map(({ paper, link }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'ScholarlyArticle',
        headline: paper.title,
        datePublished: String(paper.year),
        author: { '@id': `${SITE_URL}/#person` },
        url: link,
        isAccessibleForFree: true,
      },
    }));

  return (
    <>
      <ResearchHeroSection />
      <PaperListSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Research Papers — Abubakar Shaikh',
            url: `${SITE_URL}/research`,
            description: 'Research papers, publications, and preprints by Abubakar Shaikh.',
            author: { '@id': `${SITE_URL}/#person` },
            ...(scholarlyArticles.length > 0
              ? { mainEntity: { '@type': 'ItemList', itemListElement: scholarlyArticles } }
              : {}),
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Research', item: `${SITE_URL}/research` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
