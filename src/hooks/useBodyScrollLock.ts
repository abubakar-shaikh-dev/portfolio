import { useEffect } from 'react';

// Reference-counted so nested locks (a modal opened over the admin drawer,
// for example) restore the original overflow only when the last lock releases.
let lockCount = 0;
let previousOverflow: [string, string] | null = null;

/**
 * Locks scrolling while `locked` is true (e.g. mobile menu overlay) and
 * restores the previous overflow values on cleanup or unlock. Locks both
 * the root and body: the viewport scroller varies across browsers, and
 * iOS Safari does not honor body-only locks.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    lockCount += 1;
    if (lockCount === 1 && previousOverflow === null) {
      const root = document.documentElement;
      const body = document.body;
      previousOverflow = [root.style.overflow, body.style.overflow];
      root.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    }

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0 && previousOverflow !== null) {
        const [rootOverflow, bodyOverflow] = previousOverflow;
        document.documentElement.style.overflow = rootOverflow;
        document.body.style.overflow = bodyOverflow;
        previousOverflow = null;
      }
    };
  }, [locked]);
}
