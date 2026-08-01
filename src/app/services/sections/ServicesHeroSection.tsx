export function ServicesHeroSection() {
  return (
    <section className="relative border-b border-border-primary/60 bg-bg-primary pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-primary/80 bg-bg-secondary px-3.5 py-1 text-xs text-text-secondary animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-accent">// SERVICES_&amp;_ADVISORY</span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in-up" style={{ animationDelay: '180ms' }}>
            Services &amp; Advisory
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg animate-fade-in-up" style={{ animationDelay: '260ms' }}>
            Advisory &amp; consultancy services with hands-on expertise building and deploying scalable web applications, real-time backend systems, and automated cloud pipelines.
          </p>
        </div>
      </div>
    </section>
  );
}
