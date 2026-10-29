import { HeroSection } from './sections/HeroSection';
import { LatestThoughtsSection } from './sections/LatestThoughtsSection';
import { LatestOpenSourceSection } from './sections/LatestOpenSourceSection';
import { LatestProjectsSection } from './sections/LatestProjectsSection';
import { PreviouslyAtSection } from './sections/PreviouslyAtSection';
import { CTABannerSection } from './sections/CTABannerSection';

// ISR: admin edits surface within a minute without a redeploy
export const revalidate = 60;

export default function HomePage() {
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
