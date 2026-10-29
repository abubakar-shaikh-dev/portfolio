import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  /** Extra classes on the <section> element (backgrounds, borders) */
  className?: string;
}

/**
 * Standard content section: vertical rhythm + the shared section-container
 * that defines the site's left/right content bounds (max-w 1200px, 24px gutters).
 */
export function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="section-container">{children}</div>
    </section>
  );
}
