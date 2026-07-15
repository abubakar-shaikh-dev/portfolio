import type { Metadata } from 'next';
import { ServicesHeroSection } from './sections/ServicesHeroSection';
import { ServicesContentSection } from './sections/ServicesContentSection';
import { ServicesCTASection } from './sections/ServicesCTASection';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Full-stack web development, backend architecture, DevOps automation, and AI integration services by Abubakar Shaikh.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesContentSection />
      <ServicesCTASection />
    </>
  );
}
