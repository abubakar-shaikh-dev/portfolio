import type { Metadata } from 'next';
import { ResearchHeroSection } from './sections/ResearchHeroSection';
import { PaperListSection } from './sections/PaperListSection';

// ISR: admin edits surface within a minute without a redeploy
export const revalidate = 60;

const BASE_URL = 'https://abubakarshaikh.dev';

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
    url: `${BASE_URL}/research`,
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
  twitter: {
    card: 'summary',
    title: 'Research | Abubakar Shaikh',
    description: 'Research papers, publications, and preprints by Abubakar Shaikh.',
    images: ['/images/profile_2.webp'],
  },
  alternates: {
    canonical: `${BASE_URL}/research`,
  },
};

export default function ResearchPage() {
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
            url: `${BASE_URL}/research`,
            description: 'Research papers, publications, and preprints by Abubakar Shaikh.',
            author: { '@id': `${BASE_URL}/#person` },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Research', item: `${BASE_URL}/research` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
