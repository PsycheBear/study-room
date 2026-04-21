<div align="center">
  <br/>
  <img src="./public/favicon.svg" width="72" height="72" alt="study room"/>
  <h1>RJ's study room</h1>
  <p>
    <strong>A warm, mobile-first study companion for the Florida Electrology, Laser &amp; IPL retake.</strong><br/>
    Flashcards, quizzes, a five-day plan, and a pep talk on demand — pocket-sized and entirely offline after the first visit.
  </p>
  <p>
    <a href="https://psychebear.github.io/study-room/"><img alt="live site" src="https://img.shields.io/badge/visit%20the%20live%20site%20%E2%86%92-E85D23?style=for-the-badge&labelColor=E85D23"/></a>
    &nbsp;
    <a href="https://github.com/PsycheBear/study-room/actions/workflows/deploy.yml"><img alt="pages deploy" src="https://img.shields.io/github/actions/workflow/status/PsycheBear/study-room/deploy.yml?branch=main&style=for-the-badge&label=pages&labelColor=2B2014&color=8AA579"/></a>
  </p>
  <p>
    <img alt="react 18" src="https://img.shields.io/badge/React-18-8AA579?style=flat-square&labelColor=2B2014&logo=react&logoColor=8AA579"/>
    <img alt="typescript" src="https://img.shields.io/badge/TypeScript-strict-E85D23?style=flat-square&labelColor=2B2014&logo=typescript&logoColor=E85D23"/>
    <img alt="tailwind v3" src="https://img.shields.io/badge/Tailwind-v3-8AA579?style=flat-square&labelColor=2B2014&logo=tailwindcss&logoColor=8AA579"/>
    <img alt="vite" src="https://img.shields.io/badge/Vite-bundler-E85D23?style=flat-square&labelColor=2B2014&logo=vite&logoColor=E85D23"/>
  </p>
  <br/>
  <sub><em>Warmth over polish. Personality over professionalism.</em></sub>
  <br/>
  <br/>
</div>

---

## What's inside

| Section | What it does |
| --- | --- |
| **Hero** | Personal greeting, running history of quiz rounds, jump-in CTAs |
| **Letter** | An anonymous welcome note — fully editable in one place |
| **Topics** | Four syllabus briefs that tap to expand |
| **Videos** | Four curated YouTube clips (facade-loaded, thumbnail first) plus a "rabbit holes" search shelf |
| **Quiz** | 52-question pool, seven per round, optional topic focus, tiered verdict, history persisted |
| **Flashcards** | 51 cards with drag-to-swipe, tap-to-flip, mastery toggle, filter tabs |
| **Plan** | A real five-day checklist — per-task **Start** buttons deep-link into the matching section |
| **Pep** | On-demand quote modal for the 2 p.m. wobble |
| **Book** | Prometric + Florida Electrolysis Council link-outs |

## Highlights

- **Mobile-first** — designed for 390 px, every tap target ≥ 44 px, safe-area insets on every primary-action row
- **Touch-native** — Framer Motion drag for flashcard swipe, zero hover-only interactions
- **Offline after first load** — no backend, no accounts, no trackers
- **Synthesised sound cues** — bell chimes, paper rustles, wood-block taps, all Web-Audio-generated with a mute toggle in the nav (zero audio assets on the wire)
- **Subtle motion** — count-up stats, check-bounce on plan tasks, perpetual leaf drift, sparkle burst on week-complete. `prefers-reduced-motion` short-circuits all of it
- **Persisted progress** — quiz history, flashcard mastery, plan progress, and mute state all survive a refresh

## · · ·

## Customise the content

All study content lives under [`src/data/`](./src/data). Edit a file, save, push — the site redeploys on its own.

| Change this… | Edit this file |
| --- | --- |
| The quick note at the top | [`src/data/letter.ts`](./src/data/letter.ts) |
| The four topic briefs | [`src/data/topics.ts`](./src/data/topics.ts) |
| Curated YouTube embeds + search shelf | [`src/data/videos.ts`](./src/data/videos.ts) |
| Quiz question pool | [`src/data/questions.ts`](./src/data/questions.ts) |
| Flashcard deck | [`src/data/flashcards.ts`](./src/data/flashcards.ts) |
| Five-day plan tasks | [`src/data/plan.ts`](./src/data/plan.ts) |
| Pep-talk quote bank | [`src/data/pep.ts`](./src/data/pep.ts) |

Titles, stat counts, and progress numbers are all pulled from the data arrays — numbers never drift out of date.

## Persistence

Everything under the `studyroom:` namespace in `localStorage`. Nothing leaves the device.

| Key | What it holds |
| --- | --- |
| `studyroom:quiz-history` | Every completed round — date, score, total |
| `studyroom:flashcards-known` | Ids of cards marked mastered |
| `studyroom:plan-done` | Plan tasks ticked off this week |
| `studyroom:plan-week-start` | ISO timestamp of the first check this week |
| `studyroom:muted` | Sound on or off |
| `studyroom:last-visit` | ISO timestamp of the last load |

Clearing site data resets all of it — useful before a fresh run.

## · · ·

## <a id="stack"></a>Stack

Hand-built. No component library.

- **Vite** + **React 18** + **TypeScript** (strict)
- **Tailwind CSS v3** with custom cozy-journal tokens — cream paper, tangerine marker, sage leaf
- **Framer Motion** for reveals, drag, and page transitions
- **lucide-react** for line icons
- **Web Audio API** for synthesised cues

Fonts are **Fraunces** (display), **Familjen Grotesk** (body), and **Caveat** (the handwritten accent on "RJ").

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173/study-room/
npm run build     # type-check + production build
npm run preview   # serve the build
```

## Deploy

Every push to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml): checkout → `npm ci` → `npm run build` → upload `dist/` as a Pages artifact → deploy. No manual step after first-time Pages enablement.

## · · ·

## Project layout

```
study-room/
├─ .github/workflows/deploy.yml   # Pages build + deploy
├─ public/favicon.svg             # pressed-leaf monogram
├─ src/
│  ├─ components/                 # hand-built, one file per section
│  ├─ data/                       # all user-facing content
│  ├─ hooks/                      # useLocalStorage, useQuiz, useFlashcards
│  ├─ lib/                        # utils, storage keys, action bus, sound
│  ├─ App.tsx
│  ├─ index.css                   # Tailwind layers + cozy-journal utilities
│  └─ main.tsx
├─ index.html
├─ tailwind.config.ts             # palette, fonts, shadows, keyframes
└─ vite.config.ts                 # base: '/study-room/'
```

---

<div align="center">
  <br/>
  <em>made with care · for round two</em>
  <br/>
  <br/>
</div>
