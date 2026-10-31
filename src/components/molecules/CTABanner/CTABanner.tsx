import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/atoms/Reveal';
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
    <span className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition-[background-color,transform] duration-150 ease-out-premium hover:bg-white/90 active:scale-97 sm:w-auto">
      {buttonText}
      <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out-premium group-hover:translate-x-1" />
    </span>
  );

  return (
    <Section>
      <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-border-primary/80 bg-gradient-to-b from-bg-secondary to-bg-primary p-8 md:p-12">
        <div className="relative flex flex-col items-stretch justify-between gap-6 sm:items-start lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-text-muted">
              // {label}
            </span>
            <h2 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>

          {external ? (
            <a href={buttonLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              {buttonContent}
            </a>
          ) : (
            <Link href={buttonLink} className="w-full sm:w-auto">
              {buttonContent}
            </Link>
          )}
        </div>
      </div>
      </Reveal>
    </Section>
  );
}
