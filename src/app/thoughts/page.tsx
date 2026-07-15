import type { Metadata } from 'next';
import { ThoughtsHeroSection } from './sections/ThoughtsHeroSection';
import { ThoughtsListWrapper } from './sections/ThoughtsListWrapper';

export const metadata: Metadata = {
  title: 'Thoughts',
  description:
    'Deep dives into backend engineering, DevOps, AI integrations, and security tooling by Abubakar Shaikh.',
};

export default function ThoughtsPage() {
  return (
    <>
      <ThoughtsHeroSection />
      <ThoughtsListWrapper />
    </>
  );
}
