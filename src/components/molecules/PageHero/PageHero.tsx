import Image from 'next/image';

interface PageHeroImage {
  src: string;
  alt: string;
}

interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  image?: PageHeroImage;
}

export function PageHero({ label, title, description, image }: PageHeroProps) {
  const badgeDelay = image ? '180ms' : '100ms';
  const titleDelay = image ? '260ms' : '180ms';
  const descriptionDelay = image ? '340ms' : '260ms';

  return (
    <section className="relative border-b border-border-primary/60 bg-bg-primary pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="section-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {image && (
            <div
              className="mb-6 h-28 w-28 overflow-hidden rounded-full border-2 border-accent/80 bg-bg-secondary p-1 shadow-xl animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={112}
                height={112}
                unoptimized
                priority
                className="h-full w-full rounded-full object-cover grayscale transition-[filter,transform] duration-300 ease-out-premium hover:grayscale-0 hover:scale-105"
              />
            </div>
          )}

          <div
            className={`inline-flex items-center gap-2 rounded-full border border-border-primary/80 bg-bg-secondary px-3.5 py-1 text-xs text-text-secondary animate-fade-in-up ${
              image ? 'mb-3' : 'mb-4'
            }`}
            style={{ animationDelay: badgeDelay }}
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-accent">// {label}</span>
          </div>

          <h1
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in-up"
            style={{ animationDelay: titleDelay }}
          >
            {title}
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg animate-fade-in-up"
            style={{ animationDelay: descriptionDelay }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
