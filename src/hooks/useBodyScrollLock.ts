import { useEffect } from 'react';

/**
 * Locks body scrolling while `locked` is true (e.g. mobile menu overlay)
 * and restores the previous overflow value on cleanup or unlock.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
