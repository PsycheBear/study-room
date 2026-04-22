import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeartHandshake, Shuffle, X } from 'lucide-react';
import { Section } from './Section';
import { pep } from '../data/pep';
import { play } from '../lib/sound';

export function Pep() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * pep.length));
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setIndex((i) => {
      let n = i;
      while (n === i && pep.length > 1) n = Math.floor(Math.random() * pep.length);
      return n;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handler);
    };
  }, [open]);

  useEffect(() => {
    const onOpen = () => {
      play('open');
      next();
      setOpen(true);
    };
    window.addEventListener('studyroom:open-pep', onOpen);
    return () => window.removeEventListener('studyroom:open-pep', onOpen);
  }, [next]);

  const current = pep[index]!;

  return (
    <Section
      id="pep"
      eyebrow="Need a minute"
      title={
        <>
          A soft{' '}
          <span className="hand-underline">pep talk</span>, on demand.
        </>
      }
      subtitle="For the 2pm wobble or the 10pm spiral. Tap it as often as you need; no judgement."
    >
      <div className="flex">
        <button
          type="button"
          onClick={() => {
            play('open');
            next();
            setOpen(true);
          }}
          className="btn-primary safe-bottom"
        >
          <HeartHandshake className="h-5 w-5" strokeWidth={2.2} />
          Give me a pep talk
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="pep-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="paper-card relative z-10 mx-3 mb-3 w-[calc(100%-1.5rem)] max-w-lg px-6 py-8 sm:mx-0 sm:mb-0 sm:px-10 sm:py-12"
            >
              <span className="washi-tape" aria-hidden />
              <button
                ref={closeBtn}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close pep talk"
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink-muted active:bg-paper-warm"
              >
                <X className="h-4 w-4" strokeWidth={2.4} />
              </button>

              <div
                id="pep-title"
                className="text-[11px] uppercase tracking-[0.22em] text-tangerine-deep"
              >
                {current.attr}
              </div>
              <blockquote className="mt-4 font-display text-[26px] font-medium leading-[1.2] text-ink sm:text-[32px]">
                <span className="text-tangerine">&ldquo;</span>
                {current.quote}
                <span className="text-tangerine">&rdquo;</span>
              </blockquote>

              <div className="safe-bottom mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    play('tap');
                    next();
                  }}
                  className="btn-accent"
                >
                  <Shuffle className="h-4 w-4" strokeWidth={2.4} />
                  Another, please
                </button>
                <button
                  type="button"
                  onClick={() => {
                    play('tap');
                    setOpen(false);
                  }}
                  className="btn-ghost"
                >
                  Back to it
                </button>
                <span className="ml-auto hidden text-xs text-ink-faded sm:inline">
                  Esc to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
