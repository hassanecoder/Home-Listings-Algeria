# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains **Darkom** — a full-featured home & furniture marketplace for Algeria.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, TanStack Query, Framer Motion, react-hook-form, Tailwind CSS, shadcn/ui

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── darkom/             # React+Vite frontend (marketplace)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
│   └── src/seed.ts         # Database seed script
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Darkom Marketplace — Features

- **Homepage**: Hero search, featured listings, categories, stats (25 listings, 48 wilayas, 10 categories)
- **Listings page**: Grid view with sidebar filters (wilaya, category, type, price range), search
- **Listing detail**: Image carousel (embla), full details, seller contact form, security tips
- **Post listing**: Multi-step form for new listings
- **About page**: Team & mission
- **Bilingual**: French + Arabic labels throughout

## Algeria-specific data

- 48 wilayas seeded with names in French and Arabic
- 10 categories: Appartements, Villas, Maisons, Terrains, Locaux, Salon, Chambre, Cuisine, Bureau, Jardin
- 25 rich listings with real Algerian cities, DZD pricing, and local context
- Prices displayed in DZD (Algerian Dinar)

## API Endpoints

All under `/api`:
- `GET /api/listings` — filter by categoryId, wilayaId, type, minPrice, maxPrice, search, featured
- `GET /api/listings/:id` — single listing (auto-increments views)
- `POST /api/listings` — create listing
- `POST /api/listings/:id/contact` — send message to seller
- `GET /api/categories` — all categories with listing counts
- `GET /api/wilayas` — all 48 wilayas with listing counts
- `GET /api/stats` — marketplace statistics
- `GET /api/healthz` — health check

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Seed Data

Run: `pnpm --filter @workspace/scripts run seed`

## Packages

### `artifacts/darkom` (`@workspace/darkom`)

React + Vite marketplace frontend.

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes in `src/routes/`.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

Schema:
- `wilayasTable` — 48 Algerian provinces
- `categoriesTable` — 10 property/furniture categories
- `listingsTable` — real estate and furniture listings
- `messagesTable` — contact messages from buyers

Push schema: `pnpm --filter @workspace/db run push`
