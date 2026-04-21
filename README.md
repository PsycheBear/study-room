# RJ's study room

A warm, mobile-first study companion for the Florida Electrology, Laser & IPL
(IBEC) retake. Quizzes, flashcards, a five-day plan, and a pep-talk on demand —
pocket-sized and entirely offline after the first visit.

## Live

→ https://psychebear.github.io/study-room/

Deploys automatically on every push to `main` via GitHub Actions.

## Run locally

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173/study-room/`.

```bash
npm run build     # type-check + production build
npm run preview   # serve the build
```

## Customise the content

All study content lives under `src/data/`. Edit the file, save, push —
the site redeploys on its own.

| Change this…                          | Edit this file                |
| ------------------------------------- | ----------------------------- |
| The quick note                        | `src/data/letter.ts`          |
| The four topic cards                  | `src/data/topics.ts`          |
| The four YouTube embeds               | `src/data/videos.ts`          |
| The 12-question quiz pool             | `src/data/questions.ts`       |
| The 35-card flashcard deck            | `src/data/flashcards.ts`      |
| The five-day study plan               | `src/data/plan.ts`            |
| The pep-talk quote bank               | `src/data/pep.ts`             |

## Persistence

Everything lives in `localStorage` under the `studyroom:` namespace — no
backend, no tracking, no accounts. Clearing the browser data resets it.

- `studyroom:quiz-history` — every completed round
- `studyroom:flashcards-known` — cards marked mastered
- `studyroom:last-visit` — timestamp of the last load

## Stack

Vite · React 18 · TypeScript · Tailwind v3 · Framer Motion · lucide-react.
Hand-built components, no UI library.
