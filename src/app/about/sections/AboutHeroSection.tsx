import { SectionLabel } from '@/components/atoms/SectionLabel';

export function AboutHeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-col items-center">
            <div className="mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-accent-orange bg-bg-secondary">
              <img src="/images/profile.webp" alt="Abubakar Shaikh" className="h-full w-full object-cover" />
            </div>
            <SectionLabel label="ABOUT" />
            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">About Me</h1>
            <p className="mt-4 text-text-secondary">
              Full Stack Software Engineer with professional experience shipping production-grade applications, scalable APIs, and automated DevOps workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
