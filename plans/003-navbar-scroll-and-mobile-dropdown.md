# 003 — Optimize Navbar Scroll Transitions & Hardware-Accelerated Mobile Dropdown

- **Status**: TODO
- **Commit**: 1ea4a49
- **Severity**: HIGH
- **Category**: Performance / Accessibility / Interruptibility
- **Estimated scope**: 1 file (src/components/organisms/Navbar/Navbar.tsx)
- **Flag**: Tweak (refines and optimizes existing animations)

## Problem

1. **Sluggish Transition & Layout Shifts**: The scroll state changes in Navbar take `500ms` using `transition-all`. This includes layout-affecting changes (max-width, padding, margin) which force recalculations of the entire page layout for half a second.
2. **Main-Thread Animations**: The mobile menu dropdown uses Framer Motion's `x` and `y` shorthand properties. These run on the main thread via `requestAnimationFrame`, dropping frames under load.
3. **No Reduced Motion Gating for JS**: Framer Motion y-axis animations are not gated for users with `prefers-reduced-motion`.

## Target

1. Optimize scroll transitions to use explicit, fast transitions (`300ms` duration with the new `ease-out-premium` easing) to avoid sluggish feel.
2. Shift Framer Motion properties to use hardware-accelerated CSS `transform` strings directly (`transform: "translateY(-20px)"`).
3. Gate motion translations behind the Framer Motion `useReducedMotion` hook.

## Repo conventions to follow

- Navbar animations live inside [Navbar.tsx](file:///e:/portfolio/src/components/organisms/Navbar/Navbar.tsx).
- All changes must keep the component server/client rendering bounds clean (`'use client'` at top).

## Steps

1. **Update imports in `Navbar.tsx`**:
   Import `useReducedMotion` from `framer-motion`:
   ```typescript
   import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
   ```

2. **Initialize reduced motion detector**:
   Add inside the `Navbar` component function:
   ```typescript
   const shouldReduceMotion = useReducedMotion();
   ```

3. **Replace `transition-all duration-500` with optimized specific transitions**:
   - For the outer `<nav>` element (line 21):
     Replace: `transition-all duration-500`
     With: `transition-[padding-top] duration-300 ease-out-premium` (using the custom premium easing curve).
   - For the inner `<div className={...}>` container (line 26):
     Replace: `transition-all duration-500`
     With: `transition-[max-width,padding,background-color,box-shadow,border-radius] duration-300 ease-out-premium`.

4. **Rewrite Mobile Dropdown animations in `Navbar.tsx`**:
   - For the overlay/backdrop (line 84):
     Modify the backdrop transition to fade cleanly over `200ms` using the custom premium curve:
     ```tsx
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
       className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
       aria-hidden="true"
       onClick={() => setIsMobileMenuOpen(false)}
     />
     ```
   - For the menu container (line 92):
     Change to use hardware-accelerated `transform` string and respect `shouldReduceMotion`:
     ```tsx
     const translateYVal = shouldReduceMotion ? "translateY(0px)" : "translateY(-20px)";
     // ...
     <motion.div
       initial={{ transform: translateYVal, opacity: 0 }}
       animate={{ transform: "translateY(0px)", opacity: 1 }}
       exit={{ transform: translateYVal, opacity: 0 }}
       transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
       className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-accent-orange bg-[#0a0a0a] md:hidden"
     >
     ```
   - For the staggered list items (line 114):
     Change to hardware-accelerated `transform` string and respect `shouldReduceMotion`:
     ```tsx
     const translateXVal = shouldReduceMotion ? "translateX(0px)" : "translateX(-20px)";
     // ...
     <motion.li
       key={link.href}
       initial={{ opacity: 0, transform: translateXVal }}
       animate={{ opacity: 1, transform: "translateX(0px)" }}
       transition={{ delay: index * 0.04, duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
     >
     ```

## Boundaries

- Do NOT change any navigation routes or markup layout.
- Do NOT add external hooks outside of `framer-motion`.

## Verification

- **Mechanical**: Run `pnpm run build` and `pnpm run typecheck` to verify correct imports and types.
- **Feel check**:
  - Scroll past 50px to trigger scroll state. The navbar must adjust its shape and layout instantly (over `300ms`) without any visible stutter or jump.
  - Enable prefers-reduced-motion in DevTools and open the mobile menu. It should cross-fade in place without moving down or staggering from the side.
