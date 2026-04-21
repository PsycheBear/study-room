import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Section } from './Section';
import { plan, allTaskIds, type PlanAction, type PlanDay } from '../data/plan';
import { KEYS } from '../lib/storageKeys';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../lib/utils';
import { play } from '../lib/sound';
import {
  goToQuiz,
  goToFlashcards,
  goToSection,
  openPep,
  openVideoSearch,
} from '../lib/actions';

const TOTAL = allTaskIds.length;

export function Plan() {
  const [done, setDone] = useLocalStorage<Record<string, boolean>>(
    KEYS.planDone,
    {},
  );
  const [weekStart, setWeekStart] = useLocalStorage<string | null>(
    KEYS.planWeekStart,
    null,
  );
  const [openDay, setOpenDay] = useState<string | null>(() => {
    for (const d of plan) {
      if (d.tasks.some((t) => !done[t.id])) return d.day;
    }
    return plan[0]?.day ?? null;
  });

  const total = TOTAL;
  const doneCount = useMemo(
    () => allTaskIds.filter((id) => done[id]).length,
    [done],
  );
  const pct = total === 0 ? 0 : doneCount / total;

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
        play('tap');
      } else {
        next[id] = true;
        play('known');
      }
      return next;
    });
    if (!weekStart) setWeekStart(new Date().toISOString());
  };

  const reset = () => {
    play('swipe');
    setDone({});
    setWeekStart(null);
    setOpenDay(plan[0]?.day ?? null);
  };

  const runAction = (a: PlanAction) => {
    play('tap');
    switch (a.kind) {
      case 'quiz':
        goToSection('quiz');
        // Give the scroll a beat to settle before the round begins
        setTimeout(() => goToQuiz(a.focus, true), 350);
        break;
      case 'flashcards':
        goToSection('flashcards');
        setTimeout(() => goToFlashcards(a.filter ?? null), 350);
        break;
      case 'section':
        goToSection(a.id);
        break;
      case 'pep':
        openPep();
        break;
      case 'search':
        openVideoSearch(a.query);
        break;
      case 'none':
        break;
    }
  };

  return (
    <Section
      id="plan"
      eyebrow="Five-day plan"
      title={
        <>
          A gentle rhythm for the{' '}
          <span className="marker-hi">week before</span>.
        </>
      }
      subtitle="Each day is a small checklist. Tap a task to jump to it — the section opens with the right filter pre-set."
    >
      <WeekProgress doneCount={doneCount} total={total} pct={pct} onReset={reset} />

      <ol className="mt-5 flex flex-col gap-3">
        {plan.map((day, i) => {
          const dayDone = day.tasks.filter((t) => done[t.id]).length;
          const dayTotal = day.tasks.length;
          const dayComplete = dayDone === dayTotal;
          const isOpen = openDay === day.day;

          return (
            <motion.li
              key={day.day}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className={cn(
                'paper-card relative overflow-hidden',
                dayComplete && 'bg-marker-mint/30',
              )}
            >
              <button
                type="button"
                onClick={() => {
                  play('tap');
                  setOpenDay(isOpen ? null : day.day);
                }}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
              >
                <DayBadge day={day.day} complete={dayComplete} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[19px] font-medium leading-tight text-ink sm:text-[22px]">
                      {day.title}
                    </h3>
                    <span className="inline-flex flex-none items-center gap-1 rounded-full bg-paper-warm px-2 py-1 text-[11px] font-medium text-ink-muted">
                      <Clock className="h-3 w-3" strokeWidth={2.4} />
                      {day.duration}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <DayBar done={dayDone} total={dayTotal} />
                    <span className="text-[11px] uppercase tracking-[0.2em] text-ink-muted tabular-nums">
                      {dayDone}/{dayTotal}
                    </span>
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ink/15 bg-paper-soft text-ink-soft"
                >
                  <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden border-t border-ink/10"
                  >
                    <div className="px-4 py-4 sm:px-5">
                      <p className="mb-3 text-[14px] leading-relaxed text-ink-muted">
                        {day.detail}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {day.tasks.map((t) => (
                          <TaskRow
                            key={t.id}
                            task={t}
                            done={!!done[t.id]}
                            onToggle={() => toggle(t.id)}
                            onAction={() => runAction(t.action)}
                          />
                        ))}
                      </ul>
                      {dayComplete && <DayCompleteRibbon day={day} />}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ol>

      {doneCount === total && (
        <WeekCompleteCard onReset={reset} />
      )}
    </Section>
  );
}

function WeekProgress({
  doneCount,
  total,
  pct,
  onReset,
}: {
  doneCount: number;
  total: number;
  pct: number;
  onReset: () => void;
}) {
  return (
    <div className="paper-card flex items-center gap-4 px-4 py-4 sm:px-5">
      <div className="flex-1">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            Week progress
          </span>
          <span className="font-display text-[18px] font-semibold tabular-nums text-ink">
            {doneCount}
            <span className="text-ink-faded">/{total}</span>
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper-warm">
          <motion.div
            className="h-full rounded-full bg-tangerine"
            initial={{ width: 0 }}
            animate={{ width: `${Math.round(pct * 100)}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
      {doneCount > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3.5 py-2 text-[12px] font-medium text-ink-muted active:bg-paper-warm"
          aria-label="Reset the week"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.2} />
          Reset
        </button>
      )}
    </div>
  );
}

function DayBadge({ day, complete }: { day: string; complete: boolean }) {
  return (
    <span
      className={cn(
        'relative flex h-12 w-12 flex-none items-center justify-center rounded-full border font-display text-sm font-semibold sm:h-14 sm:w-14',
        complete
          ? 'border-sage-deep bg-sage-deep text-paper'
          : 'border-ink/15 bg-paper-soft text-tangerine-deep',
      )}
    >
      {complete ? <Check className="h-5 w-5" strokeWidth={2.8} /> : day}
    </span>
  );
}

function DayBar({ done, total }: { done: number; total: number }) {
  return (
    <div className="flex flex-1 gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 flex-1 rounded-full transition-colors',
            i < done ? 'bg-tangerine' : 'bg-ink/10',
          )}
        />
      ))}
    </div>
  );
}

function TaskRow({
  task,
  done,
  onToggle,
  onAction,
}: {
  task: { id: string; label: string; note?: string; action: PlanAction };
  done: boolean;
  onToggle: () => void;
  onAction: () => void;
}) {
  const actionable = task.action.kind !== 'none';
  const actionLabel = labelForAction(task.action);

  return (
    <li
      className={cn(
        'flex items-start gap-3 rounded-2xl border px-3 py-3 transition-colors',
        done
          ? 'border-sage-deep/30 bg-marker-mint/40'
          : 'border-ink/10 bg-paper',
      )}
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-pressed={done}
        aria-label={done ? 'Mark task undone' : 'Mark task done'}
        whileTap={{ scale: 0.88 }}
        animate={done ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 transition-colors',
          done
            ? 'border-sage-deep bg-sage-deep text-paper'
            : 'border-ink/25 bg-paper-soft text-transparent',
        )}
      >
        <Check className="h-4 w-4" strokeWidth={3} />
      </motion.button>

      <span
        className={cn(
          'flex-1 pt-1 text-[15px] leading-snug text-ink',
          done && 'line-through decoration-sage-deep/60 decoration-[1.5px] text-ink-muted',
        )}
      >
        {task.label}
      </span>

      {actionable && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex min-h-[44px] flex-none items-center gap-1 rounded-full bg-ink px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper active:translate-y-px"
        >
          {actionLabel}
          <ArrowRight className="h-3 w-3" strokeWidth={2.6} />
        </button>
      )}
    </li>
  );
}

function labelForAction(a: PlanAction): string {
  switch (a.kind) {
    case 'quiz':
      return 'Start';
    case 'flashcards':
      return 'Flip';
    case 'section':
      return 'Open';
    case 'pep':
      return 'Now';
    case 'search':
      return 'Search';
    case 'none':
      return '';
  }
}

function DayCompleteRibbon({ day }: { day: PlanDay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-3 flex items-center gap-2 rounded-full bg-sage-deep/10 px-3 py-2 text-[12px] font-medium text-sage-deep"
    >
      <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
      <span>
        <span className="font-display italic">{day.day}</span> is wrapped.
        Breathe. The next one will come.
      </span>
    </motion.div>
  );
}

function SparkleBurst() {
  const sparks = [
    { x: '12%', y: '20%', size: 9, delay: 0 },
    { x: '84%', y: '16%', size: 7, delay: 0.15 },
    { x: '70%', y: '72%', size: 10, delay: 0.3 },
    { x: '22%', y: '78%', size: 8, delay: 0.45 },
    { x: '50%', y: '10%', size: 6, delay: 0.6 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {sparks.map((s, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          width={s.size}
          height={s.size}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.1, 0.6] }}
          transition={{
            duration: 1.8,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            color: i % 2 === 0 ? '#E85D23' : '#8AA579',
          }}
        >
          <path
            d="M12 2 L13.2 9.3 L20 10 L13.6 12.6 L15 20 L12 14.5 L9 20 L10.4 12.6 L4 10 L10.8 9.3 Z"
            fill="currentColor"
            opacity="0.75"
          />
        </motion.svg>
      ))}
    </div>
  );
}

function WeekCompleteCard({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="paper-card relative mt-6 overflow-hidden px-6 py-8 sm:px-10"
    >
      <span className="washi-tape" aria-hidden />
      <SparkleBurst />
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-tangerine-deep">
        <Sparkles className="h-4 w-4" strokeWidth={2.4} />
        Whole week, done
      </div>
      <h3 className="mt-4 font-display text-[28px] font-medium leading-tight text-ink sm:text-[32px]">
        That was <span className="hand-underline">everything</span>.
      </h3>
      <p className="mt-3 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-soft">
        Five days, {TOTAL} tasks. Whatever the exam does next, it is meeting
        a more prepared version of you than the last time around.
      </p>
      <div className="safe-bottom mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={onReset} className="btn-accent">
          <RotateCcw className="h-4 w-4" strokeWidth={2.4} />
          Start a fresh week
        </button>
      </div>
    </motion.div>
  );
}
