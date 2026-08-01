# Animation & Motion Design Improvement Plans

This directory contains the prioritized plans to upgrade the animation standards across the portfolio codebase, conforming to Emil Kowalski's design engineering philosophies and Apple WWDC design principles.

## Plans Index

| Plan ID | Title | Severity | Status | Flag |
|---|---|---|---|---|
| [001](001-global-tokens-and-easings.md) | Custom Easing Tokens & Tailwind Integration | **HIGH** | DONE | Tweak |
| [002](002-tactile-press-feedback-and-hover-gating.md) | Tactile Press Feedback & Mobile Hover Gating | **HIGH** | DONE | Tweak |
| [003](003-navbar-scroll-and-mobile-dropdown.md) | Optimized Navbar Scroll & Mobile Dropdown | **HIGH** | DONE | Tweak |
| [004](004-replace-transition-all.md) | Replace Non-GPU `transition-all` with Explicit Props | **HIGH** | DONE | Tweak |
| [005](005-animation-audit-and-micro-interactions.md) | Animation Audit & Micro-Interactions Optimization | **MEDIUM** | DONE | Tweak |

## Recommended Execution Order

1. **Plan 001** (Foundation): Establish global tokens first so they can be referenced inside subsequent files.
2. **Plan 004**: Clean up the generic `transition-all` references across the components.
3. **Plan 002**: Apply tactile active press scale-downs and gate hovers inside the components modified in Plan 004.
4. **Plan 003**: Optimize the scroll transitions and client-side mobile menu animations in the Navbar.
5. **Plan 005**: Apply micro-interaction speedups, input focus timing, and stagger optimizations across remaining components.
