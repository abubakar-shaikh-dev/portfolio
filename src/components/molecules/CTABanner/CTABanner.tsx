import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/atoms/Section';

interface CTABannerProps {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  external?: boolean;
}

export function CTABanner({ label, title, description, buttonText, buttonLink, external = false }: CTABannerProps) {
  const buttonContent = (
    <span className="group inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-black transition-[background-color,transform] duration-150 ease-out-premium hover:bg-white/90 active:scale-97">
      {buttonText}
      <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out-premium group-hover:translate-x-1" />
    </span>
  );

  return (
    <Section>
      <div className="relative overflow-hidden rounded-2xl border border-border-primary/80 bg-gradient-to-b from-bg-secondary to-bg-primary p-8 md:p-12 shadow-2xl">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              // {label}
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>

          {external ? (
            <a href={buttonLink} target="_blank" rel="noopener noreferrer">
              {buttonContent}
            </a>
          ) : (
            <Link href={buttonLink}>
              {buttonContent}
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}
