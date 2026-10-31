import type { Metadata } from 'next';
import { OpenSourceHeroSection } from './sections/OpenSourceHeroSection';
import { RepoGridSection } from './sections/RepoGridSection';

// ISR: admin edits surface within a minute without a redeploy
export const revalidate = 60;

import { SITE_URL } from '@/lib/constants';

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
    url: `${SITE_URL}/open-source`,
    type: 'website',
    images: [
      {
        url: '/images/abubakar-shaikh-profile.webp',
        width: 1200,
        height: 1200,
        alt: 'Abubakar Shaikh — Open Source Projects',
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/open-source`,
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
            url: `${SITE_URL}/open-source`,
            description: 'Open source projects and developer tools built and maintained by Abubakar Shaikh.',
            author: { '@id': `${SITE_URL}/#person` },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Open Source', item: `${SITE_URL}/open-source` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
