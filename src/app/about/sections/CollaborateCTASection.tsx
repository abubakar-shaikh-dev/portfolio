import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/atoms/SectionLabel';

export function CollaborateCTASection() {
  return (
    <section className="bg-accent-orange py-16">
      <div className="section-container">
        <div className="flex flex-col items-center text-center">
          <SectionLabel label="COLLABORATE" />
          <h2 className="mt-2 text-2xl font-bold text-[#0a0a0a] md:text-3xl">
            Want to work together?
          </h2>
          <p className="mt-2 max-w-xl text-[#0a0a0a]/80">
            Available for software engineering and DevOps consulting. Let&apos;s discuss how we can build together.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a1a1a]"
          >
            View services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
