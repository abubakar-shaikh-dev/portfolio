import type { Metadata } from 'next';
import { ContactHeroSection } from './sections/ContactHeroSection';
import { ContactContentSection } from './sections/ContactContentSection';

import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Abubakar Shaikh for full-stack development, DevOps consulting, or engineering collaborations.',
  keywords: [
    'Hire Full Stack Developer', 'Contact Software Engineer', 'Freelance Developer',
    'DevOps Consulting', 'Engineering Collaboration', 'Web Development Inquiry',
  ],
  openGraph: {
    title: 'Contact | Abubakar Shaikh',
    description:
      'Get in touch with Abubakar Shaikh for full-stack development, DevOps consulting, or engineering collaborations.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [
      {
        url: '/images/abubakar-shaikh-profile.webp',
        width: 1200,
        height: 1200,
        alt: 'Contact Abubakar Shaikh',
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactContentSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Abubakar Shaikh',
            url: `${SITE_URL}/contact`,
            description: 'Get in touch for full-stack development, DevOps consulting, or engineering collaborations.',
            mainEntity: {
              '@type': 'Person',
              '@id': `${SITE_URL}/#person`,
              name: 'Abubakar Shaikh',
              email: 'shaikhabubakar2380@gmail.com',
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
