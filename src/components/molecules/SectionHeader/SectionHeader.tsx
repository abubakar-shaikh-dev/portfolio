import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/atoms/SectionLabel';

interface SectionHeaderProps {
  label: string;
  title: string;
  viewAllLink?: string;
  viewAllLabel?: string;
}

export function SectionHeader({ label, title, viewAllLink, viewAllLabel }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <SectionLabel label={label} />
        <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">{title}</h2>
      </div>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="group inline-flex items-center gap-2 font-mono text-sm text-text-secondary transition-colors hover:text-accent-orange"
        >
          {viewAllLabel || 'View all'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
