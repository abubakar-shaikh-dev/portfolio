import { SectionLabel } from '@/components/atoms/SectionLabel';

export function ServicesHeroSection() {
  return (
    <section className="relative overflow-hidden bg-grid-pattern pt-32 pb-20">
      <div className="section-container hero-content-wrapper">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <SectionLabel label="SERVICES" />
            <h1 className="font-display mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-7xl">
              Services <span className="text-accent-orange">&amp; Advisory</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-text-secondary md:text-lg">
              Advisory &amp; consultancy services with hands-on expertise building and deploying scalable web applications, real-time AI networks, and automated cloud pipelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
