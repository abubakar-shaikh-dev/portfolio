# 005 — Animation Audit & Micro-Interactions Optimization

- **Status**: DONE
- **Commit**: current
- **Severity**: MEDIUM
- **Category**: Easing & Duration, Physicality & Origin
- **Estimated scope**: 4 files (`src/lib/animations.ts`, `ContactContentSection.tsx`, `VideoCard.tsx`, `Navbar.tsx`)

## Problem

1. **`src/lib/animations.ts:15`**: `staggerChildren: 0.1` (100ms) exceeds the recommended 30–80ms stagger delay budget, making animated list items feel slightly sluggish when cascading.
```ts
/* src/lib/animations.ts:15 — current */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

2. **`src/app/contact/sections/ContactContentSection.tsx:163`**: Input focus border transitions use `duration-300` (`transition-[border-color,opacity,background-color] duration-300`), creating a slight delay when focusing form fields.
```tsx
/* src/app/contact/sections/ContactContentSection.tsx:163 — current */
className={`w-full border bg-bg-primary px-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent transition-[border-color,opacity,background-color] duration-300 disabled:opacity-60 disabled:bg-bg-primary/50 disabled:border-border-primary/50 disabled:cursor-not-allowed ${...}`}
```

3. **`src/components/molecules/VideoCard/VideoCard.tsx:14`**: VideoCard image scale and play overlay use `duration-300` without `:active` press feedback on click.
```tsx
/* src/components/molecules/VideoCard/VideoCard.tsx:14 — current */
className="group block transition-transform duration-150 ease-out-premium active:scale-98"
```

4. **`src/components/organisms/Navbar/Navbar.tsx:88`**: Mobile drawer exit transition uses `duration: 0.25` (250ms) which is slower than ideal exit feedback.
```tsx
/* src/components/organisms/Navbar/Navbar.tsx:88 — current */
transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
```

---

## Target

1. **`src/lib/animations.ts`**: Update `staggerChildren` to `0.05` (50ms) for snappy, natural staggered cascades.
```ts
/* target */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
```

2. **`src/app/contact/sections/ContactContentSection.tsx`**: Reduce input focus border transition to `duration-150 ease-out-premium`.

3. **`src/components/molecules/VideoCard/VideoCard.tsx`**: Add `active:scale-97` and gate hover scale transitions.

4. **`src/components/organisms/Navbar/Navbar.tsx`**: Set mobile menu exit transition duration to `0.15` (150ms).

---

## Repo conventions to follow

- Easing curve: `cubic-bezier(0.23, 1, 0.32, 1)` mapped as `ease-out-premium` in Tailwind config.
- Tactile press scale: `active:scale-97` for buttons, `active:scale-98` for large cards.

---

## Steps

1. In `src/lib/animations.ts`, change `staggerChildren: 0.1` to `staggerChildren: 0.05`.
2. In `src/app/contact/sections/ContactContentSection.tsx`, update form input transition classes from `duration-300` to `duration-150 ease-out-premium`.
3. In `src/components/molecules/VideoCard/VideoCard.tsx`, add `active:scale-97` to the video card wrapper.
4. In `src/components/organisms/Navbar/Navbar.tsx`, update mobile drawer exit transition to `duration: 0.15`.

---

## Boundaries

- Do NOT change component layout or data fetching structure.
- Do NOT add new third-party animation dependencies.

---

## Verification

- **Mechanical**: `pnpm run typecheck && pnpm run lint`.
- **Feel check**:
  - Click form input fields in `/contact` and observe immediate border focus feedback (150ms).
  - Open and close mobile navigation drawer and confirm exit animation snaps closed in 150ms.
- **Done when**: All motion checks pass with zero lint or type errors.
