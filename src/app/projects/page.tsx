import type { Metadata } from 'next';
import { ProjectsHeroSection } from './sections/ProjectsHeroSection';
import { ProjectGridSection } from './sections/ProjectGridSection';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Portfolio of personal and commercial projects — AI-powered apps, developer tools, and full-stack web applications.',
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHeroSection />
      <ProjectGridSection />
    </>
  );
}
