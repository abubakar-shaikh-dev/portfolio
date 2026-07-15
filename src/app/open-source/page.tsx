import type { Metadata } from 'next';
import { OpenSourceHeroSection } from './sections/OpenSourceHeroSection';
import { RepoGridSection } from './sections/RepoGridSection';

export const metadata: Metadata = {
  title: 'Open Source',
  description:
    'Open source projects and developer tools built and maintained by Abubakar Shaikh — including SKELR, FEATIFY, and XENC.',
};

export default function OpenSourcePage() {
  return (
    <>
      <OpenSourceHeroSection />
      <RepoGridSection />
    </>
  );
}
