# AGENTS.md — AI Coding Agent Conventions

> Next.js 16.2 AI agent conventions for this project.
> Last updated: 2026-07-15

## Stack

- **Next.js 16.2.10** (App Router, server-rendered)
- **React 19.2**, TypeScript 5.9, Tailwind CSS 3.4
- Static data lives in local JSON; email delivery via **Resend** API

## Server Component by Default

- All components in `app/` are **Server Components** by default.
- Use `'use client'` **only** when a component needs:
  - React hooks (useState, useEffect, useMemo, etc.)
  - Browser APIs (window, document, navigator)
  - Client-side event handlers (onClick, onSubmit, etc.)
  - Framer Motion animations that require client-side rendering
- Data fetching happens in Server Components via `await` on query functions in `src/data/queries/*`.
- Never fetch data in useEffect — always use Server Components for data access.

## Data Layer

- All data lives in `src/data/json/*.json` (static mock database).
- TypeScript interfaces are in `src/data/types/*.types.ts`.
- Query functions in `src/data/queries/*.ts` provide async getters — these are the **only** way components should read data.
- To swap in a real backend: replace the body of query functions to call fetch/axios instead of importing JSON.

## Naming Conventions

| Pattern | Convention |
|---|---|
| Component folders & files | `PascalCase` (`ArticleCard/ArticleCard.tsx`) |
| Functions, hooks, variables | `camelCase` (`useScrollPosition`) |
| Route segment folders | `kebab-case` (`open-source/`) |
| Constants | `SCREAMING_SNAKE_CASE` (in `src/lib/constants.ts`) |
| Exports | One default export per component file; named exports for types/utilities |
| Barrel files | Every component folder has an `index.ts` — no deep imports |

## Atomic Design Structure

| Layer | Path |
|---|---|
| Atoms | `src/components/atoms/*` — smallest UI primitives |
| Molecules | `src/components/molecules/*` — small combinations |
| Organisms | `src/components/organisms/*` — complex feature-level |
| Pages | `src/app/**/page.tsx` — route segments (thin, compose sections) |

## Reserved Files

- `page.tsx` — route page (required)
- `layout.tsx` — route layout (root at `app/layout.tsx`)
- `sitemap.ts` — sitemap generator
- `robots.ts` — robots.txt generator
- Do NOT use `page.tsx` or `layout.tsx` as component names in the component tree.

## Rendering Model

- No `output: 'export'` — the app uses **hybrid rendering** (static pages + API routes).
- Most pages are pre-rendered at build time from static JSON data.
- Dynamic routes export `generateStaticParams()` for build-time pre-rendering.
- **API Route Handlers** (e.g., `src/app/api/send/route.ts`) run on the server at request time.
- Images use `next/image` with `unoptimized: true`.
- Deployment requires a **Node.js hosting platform** (Vercel, Railway, etc.).

## Responsive Conventions

- Mobile-first Tailwind breakpoints: base = phone, `sm:` 640, `md:` 768, `lg:` 1024.
- The navbar shows desktop links at `lg` and up only (`hidden lg:flex`); below that it uses the hamburger menu — `md` crams six links and wraps at 768.
- Vertical rhythm comes from the `Section` atom (`py-16 md:py-24`); page content bounds from `.section-container` (1200px, 24px gutters).
- Stacked page forms (contact) cap at `max-w-2xl` below `lg` so inputs stay readable on tablets.
- Touch targets: 40px+ on mobile (menu toggle `p-2.5`, filter pills `py-2.5`); primary CTAs stretch full width on phones (`w-full sm:w-auto`).
- Detail pages hide the breadcrumb below `sm` and keep the back link.
- Cursor effects are `pointer: fine` only and honor reduced motion (`CustomCursor`); overlay menus lock body scroll via `useBodyScrollLock`.

## Motion System

- Entrances use the liquid keyframes in `globals.css`: `.animate-fade-in-up` (blur-to-sharp rise with water settle — stagger via inline `animationDelay`), `.animate-jelly-in` (squishy scale for photos/cards), `.animate-breathe` (ambient float; uses the `scale` property so it composes with transforms).
- Scroll reveals come from the `Reveal` atom (client, IntersectionObserver, fires once). Wrap section blocks with it; stagger children with `delay={index * 70}` and `className="h-full"` inside card grids. Content is hidden only when `html.js` is set (inline script in the root layout), so no-JS visitors always see it.
- Framer Motion (menu, cursor) uses blur-dissolve overlays and springy y/scale; keep `filter` animations on tween transitions and transforms on springs. Reduced motion: CSS forces final states; framer uses `useReducedMotion` branches.

## Email Integration (Resend)

- Contact form submissions are sent via the [Resend](https://resend.com/) SDK.
- API key is stored in `.env.local` as `RESEND_API_KEY` (never hardcoded).
- Route Handler: `src/app/api/send/route.ts` (POST only).
- Sender: `onboarding@resend.dev` (test domain — swap to verified domain for production).

## Build Commands

```bash
pnpm run build      # next build
pnpm run typecheck  # tsc --noEmit
pnpm run lint       # eslint .
```

All three must pass before a task is considered complete.
