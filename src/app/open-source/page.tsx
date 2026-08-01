import type { Metadata } from 'next';
import { OpenSourceHeroSection } from './sections/OpenSourceHeroSection';
import { RepoGridSection } from './sections/RepoGridSection';

const BASE_URL = 'https://abubakarshaikh.dev';

export const metadata: Metadata = {
  title: 'Open Source',
  description:
    'Open source projects and developer tools built and maintained by Abubakar Shaikh — including SKELR, FEATIFY, and XENC.',
  keywords: [
    'Open Source Projects', 'Developer Tools', 'SKELR CLI', 'FEATIFY', 'XENC Encryption',
    'Node.js CLI Tools', 'Database Isolation', 'Service Scaffolding', 'Web Crypto API',
  ],
  openGraph: {
    title: 'Open Source | Abubakar Shaikh',
    description:
      'Open source projects and developer tools built and maintained by Abubakar Shaikh — including SKELR, FEATIFY, and XENC.',
    url: `${BASE_URL}/open-source`,
    type: 'website',
    images: [
      {
        url: '/images/profile_2.webp',
        width: 1200,
        height: 1200,
        alt: 'Abubakar Shaikh — Open Source Projects',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Open Source | Abubakar Shaikh',
    description:
      'Open source projects and developer tools — SKELR, FEATIFY, and XENC.',
    images: ['/images/profile_2.webp'],
  },
  alternates: {
    canonical: `${BASE_URL}/open-source`,
  },
};

export default function OpenSourcePage() {
  return (
    <>
      <OpenSourceHeroSection />
      <RepoGridSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Open Source Projects — Abubakar Shaikh',
            url: `${BASE_URL}/open-source`,
            description: 'Open source projects and developer tools built and maintained by Abubakar Shaikh.',
            author: { '@id': `${BASE_URL}/#person` },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Open Source', item: `${BASE_URL}/open-source` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
