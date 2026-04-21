import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import type { FlashFilter } from '../../hooks/useFlashcards';
import { cn } from '../../lib/utils';

type Props = {
  filter: FlashFilter;
  onFilter: (f: FlashFilter) => void;
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  index: number;
  total: number;
  totalKnown: number;
  totalAll: number;
  disabled: boolean;
};

const TABS: { key: FlashFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unknown', label: 'Unknown' },
  { key: 'known', label: 'Known' },
];

export function FlashcardControls({
  filter,
  onFilter,
  onPrev,
  onNext,
  onShuffle,
  index,
  total,
  totalKnown,
  totalAll,
  disabled,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-full border border-ink/10 bg-paper p-1">
          {TABS.map((t) => {
            const active = t.key === filter;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onFilter(t.key)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors min-h-[44px]',
                  active ? 'bg-ink text-paper' : 'text-ink-soft',
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onShuffle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink active:bg-paper-warm"
          aria-label="Shuffle deck"
        >
          <Shuffle className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 safe-bottom">
        <button
          type="button"
          onClick={onPrev}
          disabled={disabled}
          aria-label="Previous card"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 bg-paper-soft text-ink shadow-card active:translate-y-px disabled:opacity-40"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.2} />
        </button>

        <div className="flex flex-col items-center text-center">
          <span className="font-display text-[22px] font-medium leading-none text-ink">
            {total === 0 ? '—' : `${index + 1} / ${total}`}
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            {totalKnown}/{totalAll} mastered
          </span>
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          aria-label="Next card"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-tangerine text-paper shadow-card active:translate-y-px disabled:opacity-40"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
