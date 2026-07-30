# AGENTS.md — PsychoGraph-Project-Cuet

## Project identity

Psychological Mental Health Early Detection platform with interactive activities, emotion analysis, and recommendations. Not reflected in `package.json` (`"java-project-cuet"`) — trust `checklist.md` for the feature roadmap.

## Stack

- **Next.js 16** App Router, **React 19**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` (not `@tailwind` directives). Custom theme via `@theme inline {}` in `globals.css`.
- **PostCSS** with `@tailwindcss/postcss` plugin
- **ESLint 9** flat config (`eslint.config.mjs`), profile `eslint-config-next/core-web-vitals`
- **chart.js** + **react-chartjs-2** — radar charts (Visual Preference Test)
- **recharts** — line/bar charts (dashboard)
- **framer-motion** — landing page animations
- **lucide-react** — icons throughout
- **better-auth** + **mongodb** — server-side auth with email/password and Google OAuth
- **@google/generative-ai** — Gemini AI insights

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

Additional React 19 hook rules:
- `react-hooks/refs` — Cannot access refs (`.current`) during render. Read refs only in event handlers or effects.
- `react-hooks/set-state-in-effect` — Calling `setState` synchronously within an effect body triggers cascading renders. Use lazy `useState` initializer or `useSyncExternalStore` instead.

## Design system

All pages share a **purple/pink glassmorphism theme**:
- Page bg: `bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900`
- Card: `bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50`
- Buttons: `bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg hover:scale-105`
- Progress bars: `bg-gradient-to-r from-purple-500 via-pink-400 to-rose-400`
- Stats/tally cards: `bg-purple-100/50 dark:bg-purple-900/30 rounded-xl p-5`

Dark mode uses class strategy (`.dark` on `<html>`). Default is dark if no `localStorage` preference is set. Theme initialized in a `Navbar` `useEffect` that reads `localStorage.getItem('theme')`. Toggle button in `<Navbar>` persists to `localStorage`. All pages have `dark:` variants.

## Auth

Two layers:

1. **Demo auth** (`src/context/AuthContext.js`) — localStorage-based. `login()` sets `localStorage.auth = 'true'`, `logout()` removes it. Used by `RequireAuth` wrapper to gate activity pages.
2. **Production auth** (`src/lib/auth.js`, `src/lib/auth-client.js`) — `better-auth` with MongoDB adapter. Supports email/password and Google OAuth. Login page at `/login`.

Activity pages are guarded by `<RequireAuth>` which redirects to `/signup` if not authenticated.

## Built pages

| Route | Status | File |
|---|---|---|
| `/` | Modular landing (Hero, Steps, Features, Dimensions, Evolution, CTA, Footer) | `src/app/page.js` |
| `/about` | Platform overview with feature cards | `src/app/about/page.js` |
| `/signup` | Expanded form — all fancy inputs, localStorage login (any username/password works) | `src/app/signup/page.js` |
| `/login` | better-auth login page | `src/app/login/` |
| `/contact` | Contact page | `src/app/contact/` |
| `/terms` | Terms page | `src/app/terms/` |
| `/dashboard` | Full dashboard shell with sub-routes | `src/app/dashboard/` |
| `/dashboard/psychograph` | Psychograph view | `src/app/dashboard/psychograph/` |
| `/dashboard/mood` | Mood tracking | `src/app/dashboard/mood/` |
| `/dashboard/profile` | User profile | `src/app/dashboard/profile/` |
| `/dashboard/reports` | Reports | `src/app/dashboard/reports/` |
| `/dashboard/daily-logs` | Daily logs | `src/app/dashboard/daily-logs/` |
| `/clickAccuracy` | Moving targets, 3 levels (Easy/Medium/Hard), 25s each, danger balls from start | `src/app/clickAccuracy/page.js` |
| `/memoryCard` | Flip-match emoji pairs, 4 levels, timer + accuracy | `src/app/memoryCard/page.js` |
| `/patternMemory` | Simon-says 3×3 tile sequence, growing pattern | `src/app/patternMemory/page.js` |
| `/moodQuestionnaire` | 15 Likert-scale questions (1–5), 4 tiers | `src/app/moodQuestionnaire/page.js` |
| `/stroopTest` | Emotion Stroop Test, 10 rounds, avg response time | `src/app/stroopTest/page.js` |
| `/reactionTest` | Reaction time, 5 attempts, false start penalty, SD stats | `src/app/reactionTest/page.js` |
| `/visualPreference` | Pick 9 of 12 visible images from 50, flip animation, radar chart | `src/app/visualPreference/page.js` |

### Page-specific notes

- **Signup** — Animated conic-gradient border via `@property --border-angle` + `@keyframes spin-border` in `globals.css`. Any valid form submission calls `login()` from AuthContext and redirects to `/clickAccuracy`.
- **Stroop test** — Uses `Math.random()` via module-level `pickRandom()`, `performance.now()` with eslint-disable comments.
- **Reaction test** — Uses `setTimeout` with random delay. `Math.random()` extracted to module-level `randomDelay()`. False start penalty on early clicks.
- **Visual preference** — Uses chart.js radar chart. 50 local images in `public/images/`. `shuffle()` at module level. Cards flip on selection.
- **Click Accuracy** — Three 25-second levels (Easy/Medium/Hard). Targets shrink over time. Red danger balls spawn from start. Penaltly on danger ball click.
- **Memory Card** — Four levels with increasing grid sizes. Emoji pool. Tracks time, mistakes, accuracy per level. Uses Noto Color Emoji font.
- **Pattern Memory** — Nine tiles in a 3×3 grid. Sequence appends one each round. Wrong click ends game. Best streak persisted across sessions.
- **Mood Questionnaire** — 15 questions (7 positive, 8 reverse-scored). One question at a time with progress bar. Score 15–75 → Very Positive / Good / Moderate / Low.

## Activity flow

All 7 activities form a sequential pipeline defined in `src/lib/activityOrder.js`:

1. Mood Questionnaire → 2. Stroop Test → 3. Memory Card → 4. Pattern Memory → 5. Click Accuracy → 6. Reaction Test → 7. Visual Preference

Each activity's completion screen shows a **"Next"** button (via `<NextActivity>` component) linking to the next activity. The last activity omits the button. Users can freely navigate via the Navbar dropdown.

Completed activities are tracked in `localStorage` via `src/lib/activityProgress.js`. The Navbar dropdown shows completed activities in red with a checkmark icon and disables the link.

## Dashboard

Full dashboard at `/dashboard` with sub-routes:
- **Psychograph** — aggregated activity results
- **Mood** — mood tracking over time
- **Profile** — user settings
- **Reports** — generated reports
- **Daily logs** — daily journal entries

Results are aggregated via `PsychographContext` (`src/context/PsychographContext.jsx`). Test data is also sent to a backend API/payload endpoint. Charts use `recharts`.

## Gemini integration

`src/lib/geminiAnalysis.js` sends activity test data to `/api/gemini` which calls `@google/generative-ai` to produce AI-generated insights per activity.

## Conventions

- Source lives in `src/` — path alias `@/*` → `./src/*` (configured in `jsconfig.json`)
- App Router pages in `src/app/`
- Components in `src/components/` — `Button.js`, `CognitiveTrendChart.js`, `Dialog.js`, `Navbar.js`, `NextActivity.js`, `RadarChart.js`, `RequireAuth.js`, `landing/*`
- Contexts in `src/context/` — `AuthContext.js`, `PsychographContext.jsx`
- Library/utils in `src/lib/` — `activityOrder.js`, `activityProgress.js`, `auth.js`, `auth-client.js`, `geminiAnalysis.js`
- Local images in `public/images/`
- No TypeScript
- No env files committed (`.env*` in `.gitignore`); expects `MONGODB_URI` and `GEMINI_API_KEY` in `.env`
