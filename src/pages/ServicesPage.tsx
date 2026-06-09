import { ServicesHeroSection } from '@/sections/services/ServicesHeroSection';
import { ServicesContentSection } from '@/sections/services/ServicesContentSection';
import { ServicesCTASection } from '@/sections/services/ServicesCTASection';

export function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesContentSection />
      <ServicesCTASection />
    </>
  );
}
