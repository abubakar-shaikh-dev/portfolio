import { CTABanner } from '@/components/molecules/CTABanner';

export function ServicesCTASection() {
  return (
    <CTABanner
      label="GET_IN_TOUCH"
      title="Interested in working together?"
      description="Reach out via LinkedIn to discuss your requirements and how I can help your organisation."
      buttonText="Connect on LinkedIn"
      buttonLink="https://www.linkedin.com/in/abubakar-shaikh-dev"
      external
    />
  );
}
