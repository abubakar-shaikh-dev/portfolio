# ARCHITECTURE.md

> Human-facing architecture documentation for the Abubakar Shaikh portfolio.

## Overview

This is a **Next.js 16.2** portfolio site built with the App Router. All content is rendered at build time — there is no external database, and content is served from static JSON files.

## Atomic Design Layering

The component tree follows Atomic Design methodology, adapted for Next.js App Router conventions:

### Atoms (`src/components/atoms/`)

The smallest UI primitives: `SectionLabel`, and shadcn/ui components (`Button`, `Input`, `Badge`, etc.).

### Molecules (`src/components/molecules/`)

Small combinations of atoms: `ArticleCard`, `ProjectCard`, `RepoCard`, `CareerItem`, `TopicCard`, `VideoCard`, `SocialButtons`, `SectionHeader`, `CTABanner`.

### Organisms (`src/components/organisms/`)

Complex, feature-level components: `Navbar`, `Footer`.

### Templates (`src/components/templates/`)

Page-level layout compositions: `PageLayout`.

### Pages (`src/app/**/page.tsx`)

Route segments in the App Router. Each page is **thin** — it composes templates and sections, and fetches data via the query layer.

## Server Components vs Client Components

**Server Components are the default.** Use `'use client'` only for:
- React hooks
- Browser-only APIs
- Client-side event handlers
- Framer Motion animations

## Data Layer

Designed to **look and behave like a real API client**:

```
src/data/
├── json/          # Raw static data
├── types/         # TypeScript interfaces
└── queries/       # Async getter functions
```

## Styling

- **Tailwind CSS 3.4** with custom configuration in `tailwind.config.js`
- Custom CSS variables and animations in `src/app/globals.css`
- Dark theme only

## SEO

- Per-page metadata via `export const metadata`
- `sitemap.ts` generates sitemap.xml at build time
- `robots.ts` generates robots.txt
- JSON-LD structured data in root layout

## Email Integration (Resend)

```
ContactContentSection (client)
  → POST /api/send (Route Handler)
    → Resend SDK → email delivery
```
