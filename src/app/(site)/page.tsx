import { HeroSection } from './sections/HeroSection';
import { LatestThoughtsSection } from './sections/LatestThoughtsSection';
import { LatestOpenSourceSection } from './sections/LatestOpenSourceSection';
import { LatestProjectsSection } from './sections/LatestProjectsSection';
import { PreviouslyAtSection } from './sections/PreviouslyAtSection';
import { CTABannerSection } from './sections/CTABannerSection';
import { getAllProjects } from '@/data/queries/getProjects';
import { SITE_URL } from '@/lib/constants';

// ISR: admin edits surface within a minute without a redeploy
export const revalidate = 60;

export default async function HomePage() {
  const projects = await getAllProjects();
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <HeroSection />
      <LatestThoughtsSection />
      <LatestOpenSourceSection />
      <LatestProjectsSection />
      <PreviouslyAtSection />
      <CTABannerSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Featured Projects — Abubakar Shaikh',
            itemListElement: featuredProjects.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${SITE_URL}/projects/${project.slug}`,
              name: project.name,
            })),
          }),
        }}
      />
    </>
  );
}
