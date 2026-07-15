# 001 — Introduce Custom Easing Tokens and Standardize Global Motion Styles

- **Status**: TODO
- **Commit**: 1ea4a49
- **Severity**: HIGH
- **Category**: Easing & duration / Cohesion & tokens
- **Estimated scope**: 2 files (src/app/globals.css, tailwind.config.js)
- **Flag**: Tweak (non-breaking extension)

## Problem

The codebase relies on default CSS/Tailwind transitions (`ease` or `cubic-bezier(0.4, 0, 0.2, 1)`) which feel linear, weak, and unpolished. There are no centralized easing curves in the CSS system, leading to inconsistent hover/color animations.

Locations:
- [src/app/globals.css:182](file:///e:/portfolio/src/app/globals.css#L182)
```css
.card {
  /* ... */
  transition: border-color 0.2s ease, transform 0.2s ease;
}
```

- [tailwind.config.js](file:///e:/portfolio/tailwind.config.js) - lacks explicit custom easing definitions matching Apple/Emil design bars.

## Target

Establish premium custom curves:
1. `--ease-out`: `cubic-bezier(0.23, 1, 0.32, 1)` (snappy responsiveness on entry/interaction).
2. `--ease-in-out`: `cubic-bezier(0.77, 0, 0.175, 1)` (cohesive on-screen movement).

Add these tokens in CSS and map them to Tailwind extensions so we can use classes like `ease-out-premium` or `ease-in-out-premium`.

```css
/* target: src/app/globals.css */
:root {
  --ease-out-premium: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out-premium: cubic-bezier(0.77, 0, 0.175, 1);
}
```

## Repo conventions to follow

- Global variables are declared in `@layer base` under `:root` in [globals.css](file:///e:/portfolio/src/app/globals.css#L6).
- Tailwind extends configuration in [tailwind.config.js](file:///e:/portfolio/tailwind.config.js#L6).

## Steps

1. **Update `src/app/globals.css`**:
   Add the following variables inside the `:root` block in `@layer base` (around line 34):
   ```css
   --ease-out-premium: cubic-bezier(0.23, 1, 0.32, 1);
   --ease-in-out-premium: cubic-bezier(0.77, 0, 0.175, 1);
   ```

2. **Update `tailwind.config.js`**:
   Add custom easing properties in the `theme.extend` object:
   ```javascript
   transitionTimingFunction: {
     'out-premium': 'var(--ease-out-premium)',
     'in-out-premium': 'var(--ease-in-out-premium)',
   }
   ```

## Boundaries

- Do NOT change any color tokens or spacing configs.
- Do NOT touch javascript animations in this plan.

## Verification

- **Mechanical**: Run `pnpm run build` to confirm CSS builds without syntax errors.
- **Feel check**:
  - Open DevTools, select any element with `ease-out-premium`, and verify that the custom cubic-bezier is active.
  - In DevTools Animations tab, verify the speed curves of hover states.
- **Done when**: `var(--ease-out-premium)` is defined and accessible via CSS and Tailwind utility classes (`ease-out-premium`).
