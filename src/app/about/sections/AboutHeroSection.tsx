import Image from 'next/image';

export function AboutHeroSection() {
  return (
    <section className="relative border-b border-border-primary/60 bg-bg-primary pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex flex-col items-center">
            <div className="mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-accent/80 bg-bg-secondary p-1 shadow-xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <Image
                src="/images/profile_2.webp"
                alt="Abubakar Shaikh — Full Stack Software Engineer"
                width={112}
                height={112}
                unoptimized
                priority
                className="h-full w-full rounded-full object-cover grayscale transition-[filter,transform] duration-250 ease-out-premium hover:grayscale-0 hover:scale-105"
              />
            </div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-primary/80 bg-bg-secondary px-3.5 py-1 text-xs text-text-secondary animate-fade-in-up" style={{ animationDelay: '180ms' }}>
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-accent">// ABOUT_ME</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in-up" style={{ animationDelay: '260ms' }}>
              About Me
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg animate-fade-in-up" style={{ animationDelay: '340ms' }}>
              Full Stack Software Engineer with professional experience shipping production-grade applications, scalable APIs, and automated DevOps workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
