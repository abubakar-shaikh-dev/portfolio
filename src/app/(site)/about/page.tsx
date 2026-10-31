import type { Metadata } from 'next';
import { AboutHeroSection } from './sections/AboutHeroSection';
import { AboutContentSection } from './sections/AboutContentSection';
import { CollaborateCTASection } from './sections/CollaborateCTASection';

import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Abubakar Shaikh — Full Stack Software Engineer with 3+ years experience building scalable MERN applications and DevOps workflows.',
  keywords: [
    'Abubakar Shaikh', 'Full Stack Developer', 'Software Engineer', 'MERN Stack Developer',
    'React Developer', 'Node.js Developer', 'DevOps Engineer', 'TypeScript Developer',
  ],
  openGraph: {
    title: 'About | Abubakar Shaikh',
    description:
      'Learn about Abubakar Shaikh — Full Stack Software Engineer with 3+ years experience building scalable MERN applications and DevOps workflows.',
    url: `${SITE_URL}/about`,
    type: 'profile',
    images: [
      {
        url: '/images/abubakar-shaikh-profile.webp',
        width: 1200,
        height: 1200,
        alt: 'Abubakar Shaikh — Full Stack Software Engineer',
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <AboutContentSection />
      <CollaborateCTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            mainEntity: {
              '@type': 'Person',
              '@id': `${SITE_URL}/#person`,
              name: 'Abubakar Shaikh',
              url: SITE_URL,
              image: `${SITE_URL}/images/abubakar-shaikh-profile.webp`,
              jobTitle: 'Full Stack Software Engineer',
              description:
                'Full Stack Software Engineer with 3+ years experience specializing in scalable MERN applications, microservices architecture, DevOps workflows, and AI integrations.',
              knowsAbout: [
                'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'NestJS',
                'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Microservices', 'DevOps',
              ],
              sameAs: [
                'https://www.linkedin.com/in/abubakar-shaikh-dev',
                'https://github.com/abubakar-shaikh-dev',
                'https://x.com/abubakarshaikh_dev',
                'https://instagram.com/abubakarshaikh.dev',
              ],
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
