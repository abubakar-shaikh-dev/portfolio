'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in ms — layer siblings with index * 70 for cascades */
  delay?: number;
  /** Extra classes on the wrapper (e.g. h-full inside card grids) */
  className?: string;
}

/**
 * Scroll-triggered liquid reveal. Wraps server-rendered content, then
 * adds .is-revealed once the block is ~12% in view (fires once). The
 * hidden state only applies when JS is present (html.js gate), so
 * no-JS visitors always see the content. Reduced motion lands instantly.
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion is handled purely in CSS (reveals land instantly),
    // so the observer is the only state writer here.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={`${revealed ? 'is-revealed' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
