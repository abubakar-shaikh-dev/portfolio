/**
 * Shared motion tokens for framer-motion, mirroring the CSS easing custom
 * properties in globals.css (`--ease-*`). One source of truth for beziers
 * and springs — never hardcode an inline cubic-bezier array in components.
 *
 * All transitions use compositor-only properties (opacity, transform) —
 * see the motion system notes in globals.css.
 */
import type { Transition } from 'framer-motion';

/** cubic-bezier(0.23, 1, 0.32, 1) — the site-wide "out-premium" ease */
export const EASE_OUT_PREMIUM: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** cubic-bezier(0.22, 1, 0.36, 1) — the "liquid" entrance ease */
export const EASE_LIQUID: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Staggered mobile-menu list items (Navbar) — one ease-out, no spring overshoot */
export const SPRING_MENU_ITEM: Transition = { duration: 0.35, ease: EASE_OUT_PREMIUM };

/** Admin drawer slide-in (AdminShell, mobile bottom sheets) */
export const SPRING_DRAWER: Transition = { type: 'spring', stiffness: 380, damping: 42 };

/** Centered dialog panels (modal) */
export const SPRING_MODAL: Transition = { type: 'spring', stiffness: 380, damping: 34 };
