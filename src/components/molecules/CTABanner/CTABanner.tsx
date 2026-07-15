import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/atoms/SectionLabel';

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
    <span className="inline-flex items-center gap-2 bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a1a1a]">
      {buttonText}
      <ArrowRight className="h-4 w-4" />
    </span>
  );

  return (
    <section className="bg-accent-orange py-16">
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <SectionLabel label={label} />
            <h2 className="mt-2 text-2xl font-bold text-[#0a0a0a] md:text-3xl">{title}</h2>
            <p className="mt-2 max-w-2xl text-[#0a0a0a]/80">{description}</p>
          </div>
          {external ? (
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonContent}
            </a>
          ) : (
            <Link href={buttonLink}>
              {buttonContent}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
