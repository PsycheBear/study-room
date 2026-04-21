import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Section } from '../Section';
import { useFlashcards } from '../../hooks/useFlashcards';
import { Flashcard } from './Flashcard';
import { FlashcardControls } from './FlashcardControls';

export function Flashcards() {
  const {
    current,
    visible,
    index,
    flipped,
    filter,
    knownSet,
    totalKnown,
    totalAll,
    next,
    prev,
    flip,
    toggleKnown,
    shuffleDeck,
    changeFilter,
  } = useFlashcards();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flip();
      }
    };
    const section = document.getElementById('flashcards');
    section?.addEventListener('keydown', handler);

    const onGo = (e: Event) => {
      const detail = (e as CustomEvent<{ filter: 'all' | 'unknown' | 'known' | null }>).detail;
      if (detail?.filter) changeFilter(detail.filter);
    };
    window.addEventListener('studyroom:go-flashcards', onGo);

    return () => {
      section?.removeEventListener('keydown', handler);
      window.removeEventListener('studyroom:go-flashcards', onGo);
    };
  }, [next, prev, flip, changeFilter]);

  return (
    <Section
      id="flashcards"
      eyebrow="Flashcards"
      title={
        <>
          {totalAll} cards.{' '}
          <span className="hand-underline">Swipe through.</span>
        </>
      }
      subtitle="Swipe left to advance, right to go back, tap to flip. Mastery syncs to this device — come back tomorrow and it's waiting."
    >
      <div tabIndex={-1} className="flex flex-col gap-5 outline-none">
        {current ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.id}-${flipped}`}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <Flashcard
                card={current}
                flipped={flipped}
                known={knownSet.has(current.id)}
                onFlip={flip}
                onSwipe={(dir) => (dir === 1 ? next() : prev())}
                onToggleKnown={() => toggleKnown(current.id)}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="paper-card flex min-h-[280px] flex-col items-center justify-center gap-2 text-center px-6 py-10">
            <p className="font-display text-2xl text-ink">
              No cards match this filter.
            </p>
            <p className="text-ink-soft text-sm">
              Try switching tabs — the stack is just hiding.
            </p>
          </div>
        )}

        <FlashcardControls
          filter={filter}
          onFilter={changeFilter}
          onPrev={prev}
          onNext={next}
          onShuffle={shuffleDeck}
          index={index}
          total={visible.length}
          totalKnown={totalKnown}
          totalAll={totalAll}
          disabled={visible.length === 0}
        />
      </div>
    </Section>
  );
}
