import { SectionLabel } from '@/components/atoms/SectionLabel';

export function ThoughtsHeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="section-container">
        <div>
          <SectionLabel label="THOUGHTS" />
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Thoughts</h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Deep dives into backend engineering, DevOps, AI integrations, and security tooling.
          </p>
        </div>
      </div>
    </section>
  );
}
