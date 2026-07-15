import { SectionLabel } from '@/components/atoms/SectionLabel';

export function OpenSourceHeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="section-container">
        <div>
          <SectionLabel label="OPEN_SOURCE" />
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Open Source</h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Projects and modules I build and maintain in the open.
          </p>
        </div>
      </div>
    </section>
  );
}
