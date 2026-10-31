import { CTABanner } from '@/components/molecules/CTABanner';

export function CTABannerSection() {
  return (
    <CTABanner
      label="Available for"
      title="Available for Full Stack & DevOps Projects"
      description="Open to software engineering, API development, database optimization, and DevOps pipeline architectures. Let's discuss how we can build together."
      buttonText="View services"
      buttonLink="/services"
    />
  );
}
