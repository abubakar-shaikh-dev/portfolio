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
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <SectionLabel label={label} />
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
      </div>
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="group inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-white"
        >
          <span>{viewAllLabel || 'View all'}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 ease-out-premium group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
