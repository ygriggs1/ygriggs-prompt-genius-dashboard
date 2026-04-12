# Prompt Genius Dashboard

> React-based visual workspace for prompt engineering research, iteration, and performance analysis.

## Overview

An interactive dashboard for designing, testing, and comparing LLM prompt configurations at scale. Built on Supabase for persistent prompt storage and versioning, it enables systematic prompt engineering workflows — from hypothesis formation through A/B comparison to regression tracking across model versions.

## Architecture

- **Frontend**: React + TypeScript (Vite), shadcn/ui component library, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + realtime subscriptions) for prompt storage and result persistence
- **Integrations**: LLM provider APIs via environment-scoped credentials

## Key Technical Highlights

- Real-time prompt result comparison across model versions
- Structured prompt versioning with diff-aware history
- Component-level test suite with Vitest

## Stack

React 18, TypeScript, Vite, Tailwind CSS, Supabase, shadcn/ui

## Getting Started

```bash
git clone https://github.com/ygriggs1/ygriggs-prompt-genius-dashboard.git
cd ygriggs-prompt-genius-dashboard

npm install
cp .env.example .env
# Add your Supabase credentials to .env

npm run dev
```

## Author

**Yurick "Yg" Griggs** — AI Systems Researcher & Agentic Infrastructure Architect

- [GitHub](https://github.com/ygriggs1)
- [LinkedIn](https://linkedin.com/in/yurick-griggs)
- [Speaker Portfolio](https://sites.google.com/view/yurick-griggs-speaker)
