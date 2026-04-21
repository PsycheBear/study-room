import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import type { Question } from '../../data/questions';
import type { AnswerRecord } from '../../hooks/useQuiz';
import { cn } from '../../lib/utils';
import { play } from '../../lib/sound';

type Props = {
  question: Question;
  answer: AnswerRecord | undefined;
  onAnswer: (i: number) => void;
  onNext: () => void;
  index: number;
  total: number;
};

export function QuizQuestion({
  question,
  answer,
  onAnswer,
  onNext,
  index,
  total,
}: Props) {
  const locked = !!answer;
  const isLast = index === total - 1;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="paper-card relative px-5 py-6 sm:px-8 sm:py-9"
    >
      <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-ink-muted">
        <span className="pill-tag">{question.topic}</span>
        <span>
          {String(index + 1).padStart(2, '0')}
          <span className="text-ink-faded"> / {String(total).padStart(2, '0')}</span>
        </span>
      </div>

      <h3 className="font-display text-[22px] font-medium leading-snug text-ink sm:text-[26px]">
        {question.q}
      </h3>

      <ul className="mt-6 flex flex-col gap-3">
        {question.options.map((opt, i) => {
          const isPicked = answer?.picked === i;
          const isCorrect = i === question.correct;
          const showCorrect = locked && isCorrect;
          const showWrong = locked && isPicked && !isCorrect;

          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => {
                  if (locked) return;
                  play(i === question.correct ? 'correct' : 'wrong');
                  onAnswer(i);
                }}
                disabled={locked}
                className={cn(
                  'group relative flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left min-h-[52px] transition-all',
                  !locked &&
                    'border-ink/15 bg-paper-soft hover:border-tangerine/40 active:translate-y-px active:bg-paper-warm',
                  locked && !isPicked && !isCorrect && 'border-ink/10 bg-paper opacity-70',
                  showCorrect && 'border-sage-deep/70 bg-marker-mint/40',
                  showWrong && 'border-ribbon/50 bg-tangerine-light/40',
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border font-display text-sm font-semibold',
                    !locked && 'border-ink/25 text-ink-soft group-active:border-tangerine',
                    showCorrect && 'border-sage-deep bg-sage-deep text-paper',
                    showWrong && 'border-ribbon bg-ribbon text-paper',
                    locked && !showCorrect && !showWrong && 'border-ink/15 text-ink-muted',
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-[15.5px] leading-snug text-ink">
                  {opt}
                </span>
                {showCorrect && (
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-sage-deep" />
                )}
                {showWrong && (
                  <XCircle className="mt-1 h-5 w-5 flex-none text-ribbon" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {locked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-5 rounded-2xl border border-ink/10 bg-paper px-4 py-4"
          >
            <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-tangerine-deep">
              {answer.correct ? 'Nailed it' : 'Close — here\'s the why'}
            </p>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              {question.explain}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {locked && (
        <div className="safe-bottom mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => {
              play(isLast ? 'complete' : 'tap');
              onNext();
            }}
            className="btn-accent"
          >
            {isLast ? 'See results' : 'Next question'}
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
