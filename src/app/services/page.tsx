import type { Metadata } from 'next';
import { ServicesHeroSection } from './sections/ServicesHeroSection';
import { ServicesContentSection } from './sections/ServicesContentSection';
import { ServicesCTASection } from './sections/ServicesCTASection';
import { getAllServices } from '@/data/queries/getServices';

// ISR: admin edits surface within a minute without a redeploy
export const revalidate = 60;

const BASE_URL = 'https://abubakarshaikh.dev';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Full-stack web development, backend architecture, DevOps automation, and AI integration services by Abubakar Shaikh.',
  keywords: [
    'Full Stack Development Services', 'Backend Architecture', 'DevOps Automation',
    'AI Integration', 'Node.js Consulting', 'React Development', 'Microservices Architecture',
    'AWS Deployment', 'CI/CD Pipeline', 'API Development',
  ],
  openGraph: {
    title: 'Services | Abubakar Shaikh',
    description:
      'Full-stack web development, backend architecture, DevOps automation, and AI integration services by Abubakar Shaikh.',
    url: `${BASE_URL}/services`,
    type: 'website',
    images: [
      {
        url: '/images/profile_2.webp',
        width: 1200,
        height: 1200,
        alt: 'Abubakar Shaikh — Engineering Services',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Services | Abubakar Shaikh',
    description:
      'Full-stack web development, backend architecture, DevOps automation, and AI integration services.',
    images: ['/images/profile_2.webp'],
  },
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      <ServicesHeroSection />
      <ServicesContentSection />
      <ServicesCTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Services — Abubakar Shaikh',
            url: `${BASE_URL}/services`,
            description: 'Full-stack web development, backend architecture, DevOps automation, and AI integration services.',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: services.map((service, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Service',
                  name: service.title,
                  description: service.description,
                  provider: { '@id': `${BASE_URL}/#person` },
                },
              })),
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
              ],
            },
          }),
        }}
      />
    </>
  );
}
