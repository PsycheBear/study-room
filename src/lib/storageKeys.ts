export const KEYS = {
  quizHistory: 'studyroom:quiz-history',
  flashcardsKnown: 'studyroom:flashcards-known',
  lastVisit: 'studyroom:last-visit',
  planDone: 'studyroom:plan-done',
  planWeekStart: 'studyroom:plan-week-start',
} as const;

export type QuizSession = {
  date: string;
  score: number;
  total: number;
};
