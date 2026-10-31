'use client';

import { useState, useEffect } from 'react';

/**
 * Whether the page is scrolled past `threshold`. The state is a boolean that
 * only flips when the threshold is crossed — identical-value setState bails
 * out of re-renders, so the consumer (Navbar) re-renders twice per page visit,
 * not on every scroll frame.
 */
export function useScrollPosition(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', check, { passive: true });
    check();

    return () => window.removeEventListener('scroll', check);
  }, [threshold]);

  return { isScrolled };
}
