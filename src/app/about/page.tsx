import type { Metadata } from 'next';
import { AboutHeroSection } from './sections/AboutHeroSection';
import { AboutContentSection } from './sections/AboutContentSection';
import { CollaborateCTASection } from './sections/CollaborateCTASection';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Abubakar Shaikh — Full Stack Software Engineer with 3+ years experience building scalable MERN applications and DevOps workflows.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <AboutContentSection />
      <CollaborateCTASection />
    </>
  );
}
