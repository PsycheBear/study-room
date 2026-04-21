import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Section } from '../Section';
import { useQuiz, allTopics } from '../../hooks/useQuiz';
import { QuizQuestion } from './QuizQuestion';
import { QuizResults } from './QuizResults';
import { cn } from '../../lib/utils';
import { play } from '../../lib/sound';
import { questions as pool } from '../../data/questions';
import { CountUp } from '../CountUp';

export function Quiz() {
  const { state, stats, score, currentAnswer, start, answer, next, reset } =
    useQuiz();
  const [focus, setFocus] = useState<string | null>(null);

  useEffect(() => {
    const onGo = (e: Event) => {
      const detail = (e as CustomEvent<{ focus: string | null; autostart?: boolean }>).detail;
      if (detail?.focus !== undefined) setFocus(detail.focus);
      if (detail?.autostart) {
        reset();
        requestAnimationFrame(() => start(detail.focus ?? null));
      }
    };
    window.addEventListener('studyroom:go-quiz', onGo);
    return () => window.removeEventListener('studyroom:go-quiz', onGo);
  }, [reset, start]);

  const counts = useMemo(() => {
    const out: Record<string, number> = { All: pool.length };
    for (const q of pool) out[q.topic] = (out[q.topic] ?? 0) + 1;
    return out;
  }, []);

  return (
    <Section
      id="quiz"
      eyebrow="The quiz"
      title={
        <>
          One round,{' '}
          <span className="marker-hi">one deep breath</span>.
        </>
      }
      subtitle={`Seven questions per round, drawn from a pool of ${pool.length}. Pick a focus if you want to drill a single area, or leave it on All — your rounds stay on this device.`}
    >
      {!state.active && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="paper-card relative px-5 py-7 sm:px-8 sm:py-9"
        >
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-3 text-center">
              <Stat label="Rounds" numeric value={stats.sessions} />
              <Stat
                label="Best"
                value={stats.sessions ? `${stats.best}/${stats.total}` : '—'}
              />
              <Stat
                label="Average"
                value={stats.sessions ? stats.average : '—'}
                decimals={1}
              />
            </div>

            <div>
              <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Focus
              </div>
              <div className="flex flex-wrap gap-2">
                <FocusPill
                  label="All topics"
                  count={counts.All}
                  active={focus == null}
                  onClick={() => {
                    play('tap');
                    setFocus(null);
                  }}
                />
                {allTopics.map((t) => (
                  <FocusPill
                    key={t}
                    label={t}
                    count={counts[t] ?? 0}
                    active={focus === t}
                    onClick={() => {
                      play('tap');
                      setFocus(t);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="safe-bottom flex justify-center">
              <button
                type="button"
                onClick={() => {
                  play('open');
                  start(focus);
                }}
                className="btn-accent w-full sm:w-auto"
              >
                <Play className="h-4 w-4" fill="currentColor" />
                Begin round
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {state.active && !state.finished && (
          <motion.div key="running" className="flex flex-col gap-5">
            <ProgressRow
              answers={state.answers.map((a) => a.correct)}
              total={state.questions.length}
              index={state.index}
            />
            <AnimatePresence mode="wait">
              <QuizQuestion
                key={state.index}
                question={state.questions[state.index]!}
                answer={currentAnswer}
                onAnswer={answer}
                onNext={next}
                index={state.index}
                total={state.questions.length}
              />
            </AnimatePresence>
            <button
              type="button"
              onClick={() => {
                play('tap');
                reset();
              }}
              className="self-center text-xs uppercase tracking-[0.2em] text-ink-muted underline-offset-4 hover:underline"
            >
              End round early
            </button>
          </motion.div>
        )}

        {state.active && state.finished && (
          <motion.div key="done">
            <QuizResults
              score={score}
              total={state.questions.length}
              onRestart={() => {
                play('open');
                reset();
                requestAnimationFrame(() => start(focus));
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function Stat({
  label,
  value,
  numeric,
  decimals,
}: {
  label: string;
  value: string | number;
  numeric?: boolean;
  decimals?: number;
}) {
  const rendered =
    typeof value === 'number' ? (
      <CountUp value={value} decimals={decimals} />
    ) : numeric ? (
      <CountUp value={Number(value) || 0} decimals={decimals} />
    ) : (
      value
    );
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-ink/10 bg-paper px-3 py-3">
      <span className="font-display text-[26px] font-semibold leading-none text-ink">
        {rendered}
      </span>
      <span className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">
        {label}
      </span>
    </div>
  );
}

function FocusPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors',
        active
          ? 'border-ink bg-ink text-paper'
          : 'border-ink/15 bg-paper text-ink-soft active:bg-paper-warm',
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          'rounded-full px-1.5 text-[10px] tabular-nums',
          active ? 'bg-paper/20 text-paper' : 'bg-paper-warm text-ink-muted',
        )}
      >
        {count}
      </span>
    </motion.button>
  );
}

function ProgressRow({
  answers,
  total,
  index,
}: {
  answers: boolean[];
  total: number;
  index: number;
}) {
  return (
    <div className="sticky top-2 z-10 mx-auto flex w-full max-w-xs items-center justify-center gap-1.5 rounded-full border border-ink/10 bg-paper-soft/85 px-3 py-2 backdrop-blur">
      {Array.from({ length: total }).map((_, i) => {
        const answered = answers[i];
        const isCurrent = i === index;
        return (
          <span
            key={i}
            className={cn(
              'h-2.5 rounded-full transition-all',
              isCurrent ? 'w-6 bg-tangerine' : 'w-2.5',
              !isCurrent && answered === true && 'bg-sage-deep',
              !isCurrent && answered === false && 'bg-ribbon',
              !isCurrent && answered === undefined && 'bg-ink/15',
            )}
          />
        );
      })}
    </div>
  );
}
