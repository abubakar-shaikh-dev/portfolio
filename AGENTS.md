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
| Templates | `src/components/templates/*` — page-level layout compositions |
| Pages | `src/app/**/page.tsx` — route segments (thin, compose templates) |

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
