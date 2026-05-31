# FlorAtlas 🌿

Interactive **botanical atlas** built with **Next.js**, **TypeScript** and **Tailwind CSS**.  
Explore plants by theme, region, guided paths and scientific taxonomy — powered by [Trefle.io](https://trefle.io/) open data.

**FlorAtlas** · atlas botanique interactif · EN / FR

---

## Features

- **Discover hub** — plant of the day, seasonal highlights, trending species, random discovery
- **Explore** — 10 curated collections (desert, tropical, indoor, edible…)
- **Regions** — flora by geography (France, Europe, Mediterranean, Corsica…)
- **Paths** — guided narrative botanical journeys
- **Plant detail pages** — taxonomy, growing conditions, seasonality, toxicity, related species
- **Families & traits** — navigation hubs (`/families`, `/traits`)
- **Glossary & guide** — botanical vocabulary and onboarding
- **i18n** — English / French
- **SEO** — metadata, JSON-LD WebSite + SearchAction, sitemap, robots.txt, Open Graph

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | Trefle.io API (server-side only) |
| Deploy | Vercel-ready |

---

## Prerequisites

- Node.js 18+
- [Trefle.io](https://trefle.io/) API token

---

## Setup

```bash
git clone https://github.com/Orixawasu/floratlas.git
cd floratlas
npm install
cp .env.example .env.local
```

Edit `.env.local`:

```env
TREFLE_API_TOKEN=your_token_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> The API token is **only** used in server routes (`app/api/*`, Server Components). It is never exposed to the browser.

---

## Scripts

```bash
npm run dev      # development server → http://localhost:3000
npm run build    # production build
npm run start    # run production build locally
npm run lint     # ESLint
```

---

## Deploy on Vercel

1. Import the project on [vercel.com](https://vercel.com) from this repository
2. Add environment variables:
   - `TREFLE_API_TOKEN`
   - `NEXT_PUBLIC_SITE_URL` → your production URL (e.g. `https://floratlas.vercel.app`)
3. Deploy

---

## CI (GitHub Actions)

Every push to `main` runs ESLint and a production build.

Add this secret in **Settings → Secrets and variables → Actions**:

| Secret | Description |
|--------|-------------|
| `TREFLE_API_TOKEN` | Your [Trefle.io](https://trefle.io/) API token (required for build) |

---

## Project structure

```
app/
  api/          # Server routes (Trefle proxy)
  collections/  # Collection landing pages
  explore/      # Themed collections browser
  families/     # Botanical family hubs
  glossary/     # Botanical glossary
  guide/        # How to use FlorAtlas
  paths/        # Guided botanical journeys
  plants/       # Plant detail pages
  regions/      # Regional flora explorer
  search/       # Search results
  traits/       # Trait-filtered discovery
components/     # UI components
lib/            # API client, i18n, SEO, collections, regions, utils
types/          # TypeScript types
public/         # Static assets
```

---

## License

Portfolio project — all rights reserved unless otherwise specified.
