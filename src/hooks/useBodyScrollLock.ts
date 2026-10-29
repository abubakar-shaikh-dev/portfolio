import { useEffect } from 'react';

/**
 * Locks scrolling while `locked` is true (e.g. mobile menu overlay) and
 * restores the previous overflow values on cleanup or unlock. Locks both
 * the root and body: the viewport scroller varies across browsers, and
 * iOS Safari does not honor body-only locks.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const body = document.body;
    const previous = [root.style.overflow, body.style.overflow];
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous[0];
      body.style.overflow = previous[1];
    };
  }, [locked]);
}
