// Cross-section actions: scroll + pre-apply state so one tap can
// "do the next thing" without bouncing the user around.

export type QuizFocus =
  | 'Anatomy'
  | 'Infection Control'
  | 'Clinical / Legal'
  | 'Energy'
  | null;

export type FlashFilter = 'all' | 'unknown' | 'known';

export function goToQuiz(focus: QuizFocus = null, autostart = false) {
  window.dispatchEvent(
    new CustomEvent('studyroom:go-quiz', { detail: { focus, autostart } }),
  );
}

export function goToFlashcards(filter: FlashFilter | null = null) {
  window.dispatchEvent(
    new CustomEvent('studyroom:go-flashcards', { detail: { filter } }),
  );
}

export function goToSection(id: string) {
  window.dispatchEvent(new CustomEvent('studyroom:go-section', { detail: { id } }));
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function openPep() {
  window.dispatchEvent(new CustomEvent('studyroom:open-pep'));
}

export function openVideoSearch(query: string) {
  window.open(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
    '_blank',
    'noopener,noreferrer',
  );
}
