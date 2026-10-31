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

- **MongoDB Atlas is the primary data source** (`MONGODB_URI` in `.env.local`); connection lives in `src/lib/db.ts` (cached singleton, 5s server selection timeout).
- Query functions in `src/data/queries/*.ts` provide async getters — these are the **only** way components should read data. Each one reads MongoDB and falls back to the JSON snapshot in `src/data/json/*.json` when the DB is unreachable, so the public site never breaks.
- Collections: `articles`, `projects`, `repos`, `career`, `services`, `skills` (single config doc, `key: "skills"`). List queries sort by `order`; the seed assigns it. TypeScript interfaces are in `src/data/types/*.types.ts`.
- Seed: `pnpm db:seed` (idempotent upserts by `id` from the JSON snapshot — works both as initial setup and restore path).
- Data-driven pages use ISR (`export const revalidate = 60`); admin mutations must call `revalidatePath` to publish instantly.
- Article bodies: DB documents may carry `content`; `src/data/articleContent.ts` remains the fallback until the admin editor migrates bodies.
- Images upload to Cloudinary via `src/lib/cloudinary.ts` (server-only; requires CLOUDINARY_* env vars).

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

## Admin Panel (`/admin`)

- Single-admin auth: credentials from `ADMIN_EMAIL` + `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`) in `.env.local`; session is an HS256 JWT (`jose`) in an http-only cookie (`admin_session`, 7 days).
- `src/middleware.ts` guards every `/admin` route (login excluded, `?next=` honored); `src/lib/auth.ts` holds the pure, edge-safe primitives — no `next/headers` imports there.
- Route structure: `src/app/admin/login/` (standalone) and `src/app/admin/(panel)/` (route group sharing the authenticated shell). Login submits via Server Action (`src/app/admin/actions.ts`) with IP rate limiting (5 attempts / 10 min).
- Admin pages must be `export const dynamic = 'force-dynamic'` and `robots: { index: false }`. Mutations belong in Server Actions that validate with Zod and call `revalidatePath` on the affected public pages.

## SEO & Discoverability

- **Never hardcode the domain.** Import `SITE_URL` / `SITE_NAME` / `SITE_DESCRIPTION` / `SITE_EMAIL` / `SITE_TWITTER` from `src/lib/constants.ts` — they feed metadata, JSON-LD, llms.txt, the feed, and the sitemap. `SITE_URL` comes from `NEXT_PUBLIC_SITE_URL` (required in `.env.local` **and** on the deploy platform — it is inlined at build time, so missing it there breaks canonical/sitemap URLs, not just runtime).
- Metadata pattern: listing pages use static `metadata`; detail pages use `generateMetadata`. OG images prefer the item's own cover (`article.image` / `project.image`) with the profile photo as fallback. Child pages must not re-declare `twitter` — the shallow merge inherits the root's `summary_large_image` card, `site`, and `creator`.
- JSON-LD: the root layout's `@graph` (Organization `#organization`, WebSite `#website`, Person `#person`) is the single source — other pages reference those nodes via `@id` and embed their own `BreadcrumbList`. Page schemas: ProfilePage (about), ContactPage, CollectionPage (open-source, projects, research, thoughts) + ScholarlyArticle ItemList on research, WebPage + Service ItemList (services), Article (thoughts/[slug]), WebApplication/SoftwareSourceCode (projects/[slug]), ItemList of featured projects (home).
- `robots.ts`: `/admin` + `/api` are disallowed in **every** rule group (a group with only `allow` overrides the `*` group). AI search crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot) are allowed for citations; training crawlers (CCBot, anthropic-ai, Bytespider) are blocked.
- `src/app/llms.txt/route.ts` is **generated from the data queries** (featured projects, latest articles, papers) — never hardcode content links there; admin mutations revalidate it via `publish()`.
- `sitemap.ts` entries carry `changeFrequency` + `priority` by route type (Google ignores them; Bing reads them). Articles use their real `dateISO` as `lastModified`. New public routes must be added to both sitemap and llms.txt Core Pages.
- RSS autodiscovery (`alternates.types`), `themeColor`, and the web manifest live in the root layout / `src/app/manifest.ts`. `/feed.xml` and `/llms.txt` are plain route handlers.
- Noindex surfaces: `/admin` (metadata), 404 (`src/app/not-found.tsx`). Accepted trade-offs: no CSP (inline scripts would require nonce middleware — fragile for the payoff), no IndexNow pings, GSC/Bing verification meta awaits real tokens.

## Motion System

- **Compositor-only rule: animate only `opacity` and `transform`.** Never animate `filter`/blur, `backdrop-filter`, or layout properties (`padding`, `max-width`, …) — they force per-frame repaints/reflows and are the main cause of jank on low-end phones. Static (non-animated) blur glows are fine — they rasterize once.
- Entrances use the keyframes in `globals.css`: `.animate-fade-in-up` (fade-rise with overshoot settle — stagger via inline `animationDelay`), `.animate-jelly-in` (squishy scale for photos/cards), `.animate-breathe` (ambient float; uses the `scale` property so it composes with transforms).
- Scroll reveals come from the `Reveal` atom (client, IntersectionObserver, fires once). Wrap section blocks with it; stagger children with `delay={index * 70}` and `className="h-full"` inside card grids. Content is hidden only when `html.js` is set (inline script in the root layout), so no-JS visitors always see it.
- Framer Motion (menu, modal, drawer) animates opacity/y/scale springs. Shared beziers and springs live in `src/lib/motion.ts` (`EASE_OUT_PREMIUM`, `EASE_LIQUID`, `SPRING_*`) — never hardcode bezier arrays in components. Scroll listeners flip booleans only (`useScrollPosition` sets state on threshold cross, not per frame). Reduced motion: CSS forces final states; framer uses `useReducedMotion` branches.

## Email Integration (Resend)

- Contact form submissions are stored in the `messages` collection (source of truth for the admin inbox) and forwarded by email via the [Resend](https://resend.com/) SDK on a best-effort basis — the inbox keeps the message even if Resend is down.
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
