# AGENTS.md — PsychoGraph-Project-Cuet

## Project identity

Psychological Mental Health Early Detection platform with interactive activities, emotion analysis, and recommendations. Not reflected in `package.json` (`"java-project-cuet"`) — trust `checklist.md` for the feature roadmap.

## Stack

- **Next.js 16** App Router, **React 19**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` (not `@tailwind` directives). Custom theme via `@theme inline {}` in `globals.css`.
- **PostCSS** with `@tailwindcss/postcss` plugin
- **ESLint 9** flat config (`eslint.config.mjs`), profile `eslint-config-next/core-web-vitals`

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint (flat config) |

**No test framework, no typecheck, no pre-commit hooks.** If needed, add them.

## Project conventions

- Source lives in `src/` — path alias `@/*` → `./src/*` (configured in `jsconfig.json`)
- App Router pages in `src/app/`
- No TypeScript
- No env files committed (`.env*` in `.gitignore`); no env template provided

## Current state

Bare `create-next-app` scaffold (`src/app/page.js`, `layout.js`, `globals.css`). All feature work is ahead — `checklist.md` has the complete roadmap.
