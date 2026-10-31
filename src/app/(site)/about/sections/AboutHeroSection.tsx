import { PageHero } from '@/components/molecules/PageHero';

export function AboutHeroSection() {
  return (
    <PageHero
      label="About me"
      title="About Me"
      description="Full Stack Software Engineer with professional experience shipping production-grade applications, scalable APIs, and automated DevOps workflows."
      image={{
        src: '/images/abubakar-shaikh-profile.webp',
        alt: 'Abubakar Shaikh — Full Stack Software Engineer',
      }}
    />
  );
}
