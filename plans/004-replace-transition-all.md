# 004 — Replace Non-GPU `transition-all` With Explicit Specific Transitions

- **Status**: TODO
- **Commit**: 1ea4a49
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 6 files (button.tsx, SocialButtons.tsx, ProjectCard.tsx, TopicCard.tsx, ServicesContentSection.tsx, ContactContentSection.tsx)
- **Flag**: Tweak (optimizes transition properties without visual layout changes)

## Problem

Multiple interactive elements use `transition-all` (mapping to CSS `transition: all`). This instructs the browser to watch and animate every CSS property change, including layout-affecting dimensions, padding, and font styles off-GPU. This triggers expensive layout recalculation loops and style evaluations.

Locations:
- `src/components/ui/button.tsx:7` (`transition-all`)
- `src/components/molecules/SocialButtons/SocialButtons.tsx:19` (`transition-all duration-200`)
- `src/components/molecules/ProjectCard/ProjectCard.tsx:12` (`transition-all duration-300`)
- `src/components/molecules/TopicCard/TopicCard.tsx:13` (`transition-all duration-150`)
- `src/app/services/sections/ServicesContentSection.tsx:19, 73` (`transition-all duration-300`) and line 94 (`transition-all duration-200`)
- `src/app/contact/sections/ContactContentSection.tsx:101, 119, 207` (`transition-all duration-200`)

## Target

Replace all `transition-all` instances with optimized, explicit property transitions using Tailwind's standard `transition` class (which targets only colors, opacity, shadows, transforms, and filters) or specific individual property transitions (like `transition-colors`, `transition-transform`).

For example, replace `transition-all` with `transition` or `transition-[border-color,background-color,transform]`.

## Repo conventions to follow

- Hover card and button animations use standard Tailwind transition utilities.
- Transitions should use the new custom curves defined in Plan 001.

## Steps

1. **Modify `src/components/ui/button.tsx`**:
   Replace `transition-all` in button variants with `transition-colors` or `transition-[color,background-color,border-color,transform]`.

2. **Modify `SocialButtons.tsx`**:
   Replace `transition-all duration-200` with `transition-[border-color,transform] duration-150`.

3. **Modify `ProjectCard.tsx`**:
   Replace `transition-all duration-300` with `transition-[border-color,transform] duration-200`.

4. **Modify `TopicCard.tsx`**:
   Replace `transition-all duration-150` with `transition-[border-color,transform] duration-150`.

5. **Modify `ServicesContentSection.tsx`**:
   Replace `transition-all duration-300` on lines 19, 73 and `transition-all duration-200` on line 94 with explicit property transitions.

6. **Modify `ContactContentSection.tsx`**:
   Replace `transition-all duration-200` on email links (line 101), social networks (line 119), and submit button (line 207) with explicit transitions.

## Boundaries

- Do NOT change any button/card sizes, shapes, or active hover layout coordinates.
- Ensure that disabled states still function correctly.

## Verification

- **Mechanical**: Run `pnpm run build` to verify no broken syntax.
- **Feel check**:
  - Hover and click cards and buttons. Confirm they transition color and border outline smoothly without dropping frames.
  - In DevTools Performance panel, record an interaction trace while hovering rapidly over cards and buttons. Confirm there are no layout recalculation spikes.
