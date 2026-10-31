import type { Metadata } from 'next';
import { ProjectsHeroSection } from './sections/ProjectsHeroSection';
import { ProjectGridSection } from './sections/ProjectGridSection';

// ISR: admin edits surface within a minute without a redeploy
export const revalidate = 60;

import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Portfolio of personal and commercial projects — AI-powered apps, developer tools, and full-stack web applications.',
  keywords: [
    'Full Stack Projects', 'Web Application Portfolio', 'AI Powered Apps', 'Developer Tools',
    'MERN Stack Projects', 'Voice AI Agent', 'React Projects', 'Node.js Applications',
  ],
  openGraph: {
    title: 'Projects | Abubakar Shaikh',
    description:
      'Portfolio of personal and commercial projects — AI-powered apps, developer tools, and full-stack web applications.',
    url: `${SITE_URL}/projects`,
    type: 'website',
    images: [
      {
        url: '/images/profile_2.webp',
        width: 1200,
        height: 1200,
        alt: 'Abubakar Shaikh — Project Portfolio',
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHeroSection />
      <ProjectGridSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Projects — Abubakar Shaikh',
            url: `${SITE_URL}/projects`,
            description: 'Portfolio of personal and commercial projects — AI-powered apps, developer tools, and full-stack web applications.',
            author: { '@id': `${SITE_URL}/#person` },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
