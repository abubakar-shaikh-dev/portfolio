export function OpenSourceHeroSection() {
  return (
    <section className="relative border-b border-border-primary/60 bg-bg-primary pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="section-container">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-primary/80 bg-bg-secondary px-3.5 py-1 text-xs text-text-secondary animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-accent">// OPEN_SOURCE_TOOLS</span>
        </div>

        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in-up" style={{ animationDelay: '180ms' }}>
          Open Source
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg animate-fade-in-up" style={{ animationDelay: '260ms' }}>
          Developer utilities, CLI tools, and libraries built and maintained for the community.
        </p>
      </div>
    </section>
  );
}
