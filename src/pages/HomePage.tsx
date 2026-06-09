import { HeroSection } from '@/sections/home/HeroSection';
import { LatestThoughtsSection } from '@/sections/home/LatestThoughtsSection';
import { LatestOpenSourceSection } from '@/sections/home/LatestOpenSourceSection';
import { LatestProjectsSection } from '@/sections/home/LatestProjectsSection';

import { PreviouslyAtSection } from '@/sections/home/PreviouslyAtSection';
import { CTABannerSection } from '@/sections/home/CTABannerSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <LatestThoughtsSection />
      <LatestOpenSourceSection />
      <LatestProjectsSection />

      <PreviouslyAtSection />
      <CTABannerSection />
    </>
  );
}
