import type { QuizFocus, FlashFilter } from '../lib/actions';

export type PlanAction =
  | { kind: 'none' }
  | { kind: 'quiz'; focus: QuizFocus }
  | { kind: 'flashcards'; filter?: FlashFilter }
  | { kind: 'section'; id: 'topics' | 'videos' | 'book' }
  | { kind: 'pep' }
  | { kind: 'search'; query: string };

export type PlanTask = {
  id: string;
  label: string;
  note?: string;
  action: PlanAction;
};

export type PlanDay = {
  day: string;
  title: string;
  detail: string;
  duration: string;
  tasks: PlanTask[];
};

export const plan: PlanDay[] = [
  {
    day: 'Mon',
    title: 'Sterilization deep-dive',
    detail: 'Autoclave protocols, spore tests, FL biohazard rules. Lean in on the infection-control chapter.',
    duration: '≈ 90 min',
    tasks: [
      {
        id: 'mon-1',
        label: 'Re-read Topic 02 (Infection Control) brief',
        action: { kind: 'section', id: 'topics' },
      },
      {
        id: 'mon-2',
        label: 'Watch the autoclave + four-steps videos',
        action: { kind: 'section', id: 'videos' },
      },
      {
        id: 'mon-3',
        label: 'Flip the Infection Control flashcards (unknown only)',
        action: { kind: 'flashcards', filter: 'unknown' },
      },
      {
        id: 'mon-4',
        label: 'Run a quiz round focused on Infection Control',
        action: { kind: 'quiz', focus: 'Infection Control' },
      },
    ],
  },
  {
    day: 'Tue',
    title: 'FL scope + supervising physician',
    detail: 'Work through Chapter 478, scope of practice, and what you must refer out.',
    duration: '≈ 60 min + flashcards',
    tasks: [
      {
        id: 'tue-1',
        label: 'Re-read Topic 03 (Clinical / Legal) brief',
        action: { kind: 'section', id: 'topics' },
      },
      {
        id: 'tue-2',
        label: 'Run a Clinical / Legal quiz round',
        action: { kind: 'quiz', focus: 'Clinical / Legal' },
      },
      {
        id: 'tue-3',
        label: 'Flashcards — Clinical / Legal unknowns',
        action: { kind: 'flashcards', filter: 'unknown' },
      },
      {
        id: 'tue-4',
        label: 'Search: "HIPAA for small practices"',
        action: { kind: 'search', query: 'HIPAA privacy rule minimum necessary' },
      },
    ],
  },
  {
    day: 'Wed',
    title: 'Case studies — mixed day',
    detail: 'Switch between topics to force retrieval. Two full rounds, then triage the misses.',
    duration: '≈ 90 min',
    tasks: [
      {
        id: 'wed-1',
        label: 'Quiz round #1 (all topics)',
        action: { kind: 'quiz', focus: null },
      },
      {
        id: 'wed-2',
        label: 'Quiz round #2 (all topics)',
        action: { kind: 'quiz', focus: null },
      },
      {
        id: 'wed-3',
        label: 'Flashcards — unknown filter',
        action: { kind: 'flashcards', filter: 'unknown' },
      },
      {
        id: 'wed-4',
        label: 'Note any concept that tripped you twice',
        action: { kind: 'none' },
      },
    ],
  },
  {
    day: 'Thu',
    title: 'Consent, HIPAA, documentation',
    detail: 'The paper side of the job. Record-keeping, consent forms, privacy posture.',
    duration: '≈ 60 min',
    tasks: [
      {
        id: 'thu-1',
        label: 'Re-read Clinical / Legal brief',
        action: { kind: 'section', id: 'topics' },
      },
      {
        id: 'thu-2',
        label: 'Clinical / Legal quiz round',
        action: { kind: 'quiz', focus: 'Clinical / Legal' },
      },
      {
        id: 'thu-3',
        label: 'Search: "Informed consent four pillars"',
        action: { kind: 'search', query: 'informed consent four pillars medical' },
      },
      {
        id: 'thu-4',
        label: 'Flashcards — Clinical / Legal',
        action: { kind: 'flashcards', filter: 'unknown' },
      },
    ],
  },
  {
    day: 'Fri',
    title: 'Full mock + triage',
    detail: 'Three rounds back-to-back, no lookups between. Then a soft landing.',
    duration: '≈ 2 hr',
    tasks: [
      {
        id: 'fri-1',
        label: 'Mock round #1',
        action: { kind: 'quiz', focus: null },
      },
      {
        id: 'fri-2',
        label: 'Mock round #2',
        action: { kind: 'quiz', focus: null },
      },
      {
        id: 'fri-3',
        label: 'Mock round #3',
        action: { kind: 'quiz', focus: null },
      },
      {
        id: 'fri-4',
        label: 'Take a pep talk',
        action: { kind: 'pep' },
      },
    ],
  },
];

export const allTaskIds = plan.flatMap((d) => d.tasks.map((t) => t.id));
