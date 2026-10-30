import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a CSS media query. SSR and the hydration render report
 * `false` (mobile-first), then React swaps in the live value.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onStoreChange);
      return () => mql.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
