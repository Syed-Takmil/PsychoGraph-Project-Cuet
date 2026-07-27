# AGENTS.md — PsychoGraph-Project-Cuet

## Project identity

Psychological Mental Health Early Detection platform with interactive activities, emotion analysis, and recommendations. Not reflected in `package.json` (`"java-project-cuet"`) — trust `checklist.md` for the feature roadmap.

## Stack

- **Next.js 16** App Router, **React 19**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` (not `@tailwind` directives). Custom theme via `@theme inline {}` in `globals.css`.
- **PostCSS** with `@tailwindcss/postcss` plugin
- **ESLint 9** flat config (`eslint.config.mjs`), profile `eslint-config-next/core-web-vitals`
- **chart.js** + **react-chartjs-2** — installed for radar charts (used in Visual Preference Test)

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint (flat config) |

**No test framework, no typecheck, no pre-commit hooks.** If needed, add them.

## ESLint quirks

The `react-hooks/purity` rule (React 19) flags `Math.random()` / `performance.now()` in component-scope functions, even in event handlers. Fixes:
- Extract impure logic to module-level helper functions (`pickRandom()`, `randomDelay()`, `shuffle()`)
- Or add `// eslint-disable-next-line react-hooks/purity` before the call
- `@next/next/no-img-element` — use `// eslint-disable-next-line @next/next/no-img-element` for external images (or `<Image />` from `next/image`)

## Design system

All pages share a **purple/pink glassmorphism theme**:
- Page bg: `bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900`
- Card: `bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50`
- Buttons: `bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg hover:scale-105`
- Progress bars: `bg-gradient-to-r from-purple-500 via-pink-400 to-rose-400`
- Stats/tally cards: `bg-purple-100/50 dark:bg-purple-900/30 rounded-xl p-5`

Dark mode uses class strategy (`.dark` on `<html>`) with inline `<script>` to prevent flash. Toggle button in `<Navbar>` persists to `localStorage`. All pages have `dark:` variants.

## Built pages

| Route | Status | File |
|---|---|---|
| `/` | Default Next.js landing (unmodified) | `src/app/page.js` |
| `/signup` | ✅ Expanded form, all fancy inputs, dummy auth (admin/admin) | `src/app/signup/page.js` |
| `/stroopTest` | ✅ Emotion Stroop Test, 10 rounds, avg response time | `src/app/stroopTest/page.js` |
| `/reactionTest` | ✅ Reaction time, 5 attempts, false start penalty, SD stats | `src/app/reactionTest/page.js` |
| `/visualPreference` | ✅ Pick 9 of 12 visible images from 50, flip animation, radar chart | `src/app/visualPreference/page.js` |

### Page-specific notes

- **Signup** — Animated conic-gradient border via `@property --border-angle` + `@keyframes spin-border` in `globals.css`. Dummy auth: username=`admin`, password=`admin`. All other fields optional.
- **Stroop test** — Uses `Math.random()` via module-level `pickRandom()`, `performance.now()` with eslint-disable comments.
- **Reaction test** — Uses `setTimeout` with random delay. `Math.random()` extracted to module-level `randomDelay()`. False start penalty on early clicks.
- **Visual preference** — Uses chart.js radar chart. 50 local images in `public/images/`. `shuffle()` at module level. Cards flip on selection.

## Conventions

- Source lives in `src/` — path alias `@/*` → `./src/*` (configured in `jsconfig.json`)
- App Router pages in `src/app/`
- Components in `src/components/` (currently: `Navbar.js`, `ThemeToggle.js`)
- Local images in `public/images/`
- No TypeScript
- No env files committed (`.env*` in `.gitignore`); no env template provided
