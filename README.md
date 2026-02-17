# Prompt Genius Dashboard

A Vite + React dashboard for managing prompt experiments, Supabase-backed data, and UI workflows for the Prompt Genius experience.

**Live URL:** https://yurickg.lovable.app/

## Features
- Prompt experiment dashboard with React Query data fetching
- Supabase integration for storage and auth-ready workflows
- Component-driven UI built with shadcn/ui and Tailwind CSS
- Vite-powered development and optimized builds

## Tech Stack
- Vite
- React + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase
- TanStack React Query

## Getting Started

### Prerequisites
- Node.js 18+
- npm (or a compatible package manager)

### Install
```sh
npm install
```

### Configure Environment
Copy the example file and update values:
```sh
cp .env.example .env
```

Required variables:
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

### Run Locally
```sh
npm run dev
```

## Scripts
- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — lint the codebase
- `npm run test` — run tests

## Project Structure
- `src/pages` — route-level pages
- `src/components` — shared UI components
- `src/hooks` — reusable hooks
- `src/integrations` — external service integrations
- `src/lib` — shared utilities

## Deployment
```sh
npm run build
```

## Notes
- Do not commit real secrets. Keep `.env` local and use `.env.example` for placeholders.