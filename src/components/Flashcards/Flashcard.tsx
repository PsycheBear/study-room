import { motion, type PanInfo } from 'framer-motion';
import { Check, RefreshCw } from 'lucide-react';
import type { Flashcard as FlashcardT } from '../../data/flashcards';
import { cn } from '../../lib/utils';

type Props = {
  card: FlashcardT;
  flipped: boolean;
  known: boolean;
  onFlip: () => void;
  onSwipe: (dir: 1 | -1) => void;
  onToggleKnown: () => void;
};

export function Flashcard({
  card,
  flipped,
  known,
  onFlip,
  onSwipe,
  onToggleKnown,
}: Props) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold || info.velocity.x < -500) onSwipe(1);
    else if (info.offset.x > threshold || info.velocity.x > 500) onSwipe(-1);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      className="touch-pan-y select-none"
      style={{ perspective: 1400 }}
    >
      <motion.button
        type="button"
        onClick={onFlip}
        aria-label={flipped ? 'Flip to front' : 'Flip to reveal answer'}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative block h-[360px] w-full sm:h-[420px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Face side="front" card={card} known={known} onToggleKnown={onToggleKnown} />
        <Face side="back" card={card} known={known} onToggleKnown={onToggleKnown} />
      </motion.button>
    </motion.div>
  );
}

function Face({
  side,
  card,
  known,
  onToggleKnown,
}: {
  side: 'front' | 'back';
  card: FlashcardT;
  known: boolean;
  onToggleKnown: () => void;
}) {
  const isBack = side === 'back';
  return (
    <div
      className={cn(
        'paper-card absolute inset-0 flex flex-col justify-between px-6 py-7 text-left sm:px-8 sm:py-9',
        isBack && 'bg-paper-warm',
      )}
      style={{
        backfaceVisibility: 'hidden',
        transform: isBack ? 'rotateY(180deg)' : undefined,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="pill-tag">{card.topic}</span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          {isBack ? 'Back' : 'Front'}
        </span>
      </div>

      <div className="flex flex-1 items-center">
        {isBack ? (
          <p className="font-sans text-[18px] leading-relaxed text-ink">
            {card.back}
          </p>
        ) : (
          <h3 className="font-display text-[38px] font-medium leading-[1.05] text-ink sm:text-[44px]">
            {card.front}
          </h3>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          <RefreshCw className="h-3 w-3" strokeWidth={2.4} />
          Tap to flip
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleKnown();
          }}
          aria-pressed={known}
          className={cn(
            'inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors',
            known
              ? 'border-sage-deep bg-sage-deep text-paper'
              : 'border-ink/20 bg-paper-soft text-ink-soft active:bg-paper-warm',
          )}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
          {known ? 'Mastered' : 'Mark known'}
        </button>
      </div>
    </div>
  );
}
