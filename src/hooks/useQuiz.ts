import { useCallback, useMemo, useState } from 'react';
import { questions as pool, type Question } from '../data/questions';
import { pickN, shuffle } from '../lib/utils';
import { useLocalStorage } from './useLocalStorage';
import { KEYS, type QuizSession } from '../lib/storageKeys';

const shuffleOptions = (q: Question): Question => {
  const order = shuffle(q.options.map((_, i) => i));
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    correct: order.indexOf(q.correct),
  };
};

export type AnswerRecord = { picked: number; correct: boolean };

export type QuizState = {
  active: boolean;
  questions: Question[];
  index: number;
  answers: AnswerRecord[];
  finished: boolean;
};

const QUIZ_LEN = 7;

const emptyState: QuizState = {
  active: false,
  questions: [],
  index: 0,
  answers: [],
  finished: false,
};

export const allTopics = Array.from(new Set(pool.map((q) => q.topic)));

export function useQuiz() {
  const [history, setHistory] = useLocalStorage<QuizSession[]>(
    KEYS.quizHistory,
    [],
  );
  const [state, setState] = useState<QuizState>(emptyState);

  const start = useCallback((topicFilter: string | null = null) => {
    const filtered =
      topicFilter == null
        ? pool
        : pool.filter((q) => q.topic === topicFilter);
    const source = filtered.length >= QUIZ_LEN ? filtered : pool;
    setState({
      active: true,
      questions: pickN(source, QUIZ_LEN).map(shuffleOptions),
      index: 0,
      answers: [],
      finished: false,
    });
  }, []);

  const answer = useCallback((picked: number) => {
    let picked_correct = false;
    setState((s) => {
      if (!s.active || s.finished) return s;
      const q = s.questions[s.index];
      if (!q) return s;
      const alreadyAnswered = s.answers.length > s.index;
      if (alreadyAnswered) return s;
      const record: AnswerRecord = { picked, correct: picked === q.correct };
      picked_correct = record.correct;
      return { ...s, answers: [...s.answers, record] };
    });
    return picked_correct;
  }, []);

  const next = useCallback(() => {
    setState((s) => {
      if (!s.active) return s;
      const atLast = s.index >= s.questions.length - 1;
      if (atLast) {
        const score = s.answers.filter((a) => a.correct).length;
        const session: QuizSession = {
          date: new Date().toISOString(),
          score,
          total: s.questions.length,
        };
        setHistory((h) => [...h, session]);
        return { ...s, finished: true };
      }
      return { ...s, index: s.index + 1 };
    });
  }, [setHistory]);

  const reset = useCallback(() => setState(emptyState), []);

  const currentAnswer = state.answers[state.index];
  const score = useMemo(
    () => state.answers.filter((a) => a.correct).length,
    [state.answers],
  );

  const stats = useMemo(() => {
    if (!history.length) {
      return { sessions: 0, best: 0, average: 0, total: QUIZ_LEN };
    }
    const best = history.reduce((m, s) => Math.max(m, s.score), 0);
    const average =
      Math.round(
        (history.reduce((sum, s) => sum + s.score, 0) / history.length) * 10,
      ) / 10;
    return {
      sessions: history.length,
      best,
      average,
      total: history[history.length - 1]?.total ?? QUIZ_LEN,
    };
  }, [history]);

  return {
    state,
    history,
    stats,
    score,
    currentAnswer,
    start,
    answer,
    next,
    reset,
  };
}
