import { CTABanner } from '@/components/molecules/CTABanner';

export function CollaborateCTASection() {
  return (
    <CTABanner
      label="Collaborate"
      title="Want to work together?"
      description="Available for software engineering and DevOps consulting. Let's discuss how we can build together."
      buttonText="View services"
      buttonLink="/services"
    />
  );
}
