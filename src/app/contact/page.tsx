import type { Metadata } from 'next';
import { ContactHeroSection } from './sections/ContactHeroSection';
import { ContactContentSection } from './sections/ContactContentSection';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Abubakar Shaikh for full-stack development, DevOps consulting, or engineering collaborations.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactContentSection />
    </>
  );
}
