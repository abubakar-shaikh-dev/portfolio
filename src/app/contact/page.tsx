import type { Metadata } from 'next';
import { ContactHeroSection } from './sections/ContactHeroSection';
import { ContactContentSection } from './sections/ContactContentSection';

const BASE_URL = 'https://abubakarshaikh.dev';

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
    url: `${BASE_URL}/contact`,
    type: 'website',
    images: [
      {
        url: '/images/profile_2.webp',
        width: 1200,
        height: 1200,
        alt: 'Contact Abubakar Shaikh',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Contact | Abubakar Shaikh',
    description:
      'Get in touch for full-stack development, DevOps consulting, or engineering collaborations.',
    images: ['/images/profile_2.webp'],
  },
  alternates: {
    canonical: `${BASE_URL}/contact`,
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
            url: `${BASE_URL}/contact`,
            description: 'Get in touch for full-stack development, DevOps consulting, or engineering collaborations.',
            mainEntity: {
              '@type': 'Person',
              '@id': `${BASE_URL}/#person`,
              name: 'Abubakar Shaikh',
              email: 'shaikhabubakar2380@gmail.com',
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
