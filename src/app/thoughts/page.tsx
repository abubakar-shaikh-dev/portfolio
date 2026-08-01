import type { Metadata } from 'next';
import { ThoughtsHeroSection } from './sections/ThoughtsHeroSection';
import { ThoughtsListWrapper } from './sections/ThoughtsListWrapper';

const BASE_URL = 'https://abubakarshaikh.dev';

export const metadata: Metadata = {
  title: 'Thoughts',
  description:
    'Deep dives into backend engineering, DevOps, AI integrations, and security tooling by Abubakar Shaikh.',
  keywords: [
    'Technical Blog', 'Backend Engineering', 'DevOps Articles', 'AI Integration Tutorials',
    'Node.js Guides', 'Web Security', 'Software Architecture', 'Full Stack Development Blog',
  ],
  openGraph: {
    title: 'Thoughts | Abubakar Shaikh',
    description:
      'Deep dives into backend engineering, DevOps, AI integrations, and security tooling by Abubakar Shaikh.',
    url: `${BASE_URL}/thoughts`,
    type: 'website',
    images: [
      {
        url: '/images/profile_2.webp',
        width: 1200,
        height: 1200,
        alt: 'Abubakar Shaikh — Technical Blog',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Thoughts | Abubakar Shaikh',
    description:
      'Deep dives into backend engineering, DevOps, AI integrations, and security tooling.',
    images: ['/images/profile_2.webp'],
  },
  alternates: {
    canonical: `${BASE_URL}/thoughts`,
  },
};

export default function ThoughtsPage() {
  return (
    <>
      <ThoughtsHeroSection />
      <ThoughtsListWrapper />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Thoughts — Abubakar Shaikh',
            url: `${BASE_URL}/thoughts`,
            description: 'Deep dives into backend engineering, DevOps, AI integrations, and security tooling.',
            author: { '@id': `${BASE_URL}/#person` },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Thoughts', item: `${BASE_URL}/thoughts` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
