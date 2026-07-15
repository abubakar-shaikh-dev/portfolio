# 002 — Add Tactile Press Feedback (:active Scale) and Gate Mobile Hovers

- **Status**: TODO
- **Commit**: 1ea4a49
- **Severity**: HIGH
- **Category**: Physicality & origin / Accessibility
- **Estimated scope**: 8 files (button.tsx, SocialButtons.tsx, ProjectCard.tsx, RepoCard.tsx, ArticleCard.tsx, TopicCard.tsx, VideoCard.tsx, globals.css, ServicesContentSection.tsx)
- **Flag**: Tweak (applies non-breaking active scales and gates hover states)

## Problem

1. **Lack of tactile feedback**: Buttons, cards, and links have hover animations but do not scale down or respond visually when clicked (violates Apple Fluid Interface guidelines and Emil Kowalski's core button press principle: `scale(0.97)` on `:active`).
2. **Sticky hover on mobile**: Tapping elements on touch screens triggers sticky orange borders and scale-ups that linger until another area is clicked, indicating lack of hover media query gating.

## Target

Implement instant tactile feedback (`transform: scale(0.97-0.98)` / `active:scale-97` / `:active` triggers) on all clickable cards and buttons. Gate hover states using CSS media queries so they only execute when a pointer is present.

```css
/* Target active and hover gating on card elements */
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    border-color: var(--color-accent-orange);
    transform: translateY(-2px);
  }
}
.card:active {
  transform: translateY(0px) scale(0.98);
  transition: transform 100ms var(--ease-out-premium);
}
```

## Repo conventions to follow

- Hover styles are typically applied using Tailwind class syntax (e.g., `hover:border-accent-orange`).
- Global elements like `.card` live in [globals.css](file:///e:/portfolio/src/app/globals.css).

## Steps

1. **Update `.card` in `src/app/globals.css`**:
   Replace the hover style of `.card` to only trigger on fine pointer devices and add press scale:
   ```css
   /* Card component */
   .card {
     display: block;
     background-color: var(--color-surface-elevated);
     border: 1px solid var(--color-surface-border);
     transition: border-color 150ms var(--ease-out-premium), transform 150ms var(--ease-out-premium);
   }

   @media (hover: hover) and (pointer: fine) {
     .card:hover {
       border-color: var(--color-accent-orange);
       transform: translateY(-2px);
     }
   }

   .card:active {
     transform: translateY(0px) scale(0.98);
     transition: transform 100ms var(--ease-out-premium);
   }
   ```

2. **Update UI Button in `src/components/ui/button.tsx`**:
   Modify the default styles in `buttonVariants` (around line 7) to add active scale feedback and transition optimization:
   ```typescript
   // target
   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-transform duration-100 ease-out-premium active:scale-97 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
   ```
   *Note: ensure `active:scale-97` is configured or map it to a custom CSS class/utility.*

3. **Modify `SocialButtons.tsx`**:
   Change classes in `socials.map` to use transition classes with active state:
   ```typescript
   // target
   className="inline-flex items-center gap-2.5 border border-border-primary bg-bg-secondary px-5 py-3 text-sm font-medium text-white transition-transform duration-100 ease-out-premium active:scale-97 hover:border-accent-orange"
   ```

4. **Modify `ProjectCard.tsx`**:
   Optimize transitions and add active state:
   ```typescript
   // target
   className="group flex h-full flex-col justify-between border border-border-primary bg-bg-secondary p-6 transition-transform duration-100 ease-out-premium active:scale-98 hover:border-accent-orange hover:-translate-y-0.5"
   ```

5. **Modify `TopicCard.tsx`**:
   Adjust styles to replace hover styles and add active press feedback:
   ```typescript
   // target
   className="group block border-black bg-black p-6 text-white transition-transform duration-100 ease-out-premium active:scale-98"
   ```

6. **Modify `VideoCard.tsx`**:
   Add tactile press scale directly on the link container:
   ```typescript
   // target
   className="group block transition-transform duration-100 ease-out-premium active:scale-98"
   ```

7. **Modify `ServicesContentSection.tsx`**:
   Update both types of cards to scale down on active press and gate hovers.

## Boundaries

- Do NOT alter any link destinations or layout logic.
- Ensure that button outline variations or size classes are not broken by the base changes.

## Verification

- **Mechanical**: Verify build with `pnpm run build` and ensure TypeScript checks pass.
- **Feel check**:
  - Tap any card or button on mobile viewport/simulated screen to ensure no hover styles remain stuck on.
  - Hold click on any card/button and confirm it scales down to `0.97-0.98` instantly. On release, it must snap back immediately.
