import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { scrollToId } from '../lib/utils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { KEYS, type QuizSession } from '../lib/storageKeys';
import { play } from '../lib/sound';
import { CountUp } from './CountUp';

export function Hero() {
  const [history] = useLocalStorage<QuizSession[]>(KEYS.quizHistory, []);
  const best = history.length
    ? history.reduce((m, s) => Math.max(m, s.score), 0)
    : null;
  const total = history[0]?.total ?? 7;

  return (
    <header
      id="hero"
      className="relative mx-auto w-full max-w-xl px-5 pt-10 pb-12 sm:max-w-2xl sm:px-6 sm:pt-14 md:max-w-3xl md:pt-20"
    >
      {/* leaf ornament */}
      <motion.svg
        aria-hidden
        initial={{ opacity: 0, rotate: -8, y: 10 }}
        animate={{
          opacity: 0.75,
          rotate: [-4, -2.2, -5, -4],
          y: [0, -3, 1, 0],
        }}
        transition={{
          opacity: { duration: 1.2, ease: 'easeOut' },
          rotate: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
        viewBox="0 0 120 80"
        className="pointer-events-none absolute -top-4 right-4 h-20 w-24 sm:h-24 sm:w-28"
      >
        <path
          d="M10 70 C 28 28, 70 18, 112 24 C 100 60, 60 80, 14 72 Z"
          fill="#C5D3B2"
          opacity="0.7"
        />
        <path
          d="M10 70 C 28 28, 70 18, 112 24"
          stroke="#5E7A50"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M30 60 L 60 38 M50 66 L80 40 M70 70 L96 44"
          stroke="#5E7A50"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-tangerine-deep"
      >
        <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
        <span>A little study room · for one person</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 font-display text-[52px] font-medium leading-[0.98] tracking-[-0.02em] text-ink sm:text-[64px] md:text-[76px]"
      >
        Hi,{' '}
        <span className="signature text-[1.05em] italic">RJ</span>.
        <br />
        <span className="marker-hi">Round&nbsp;two</span>{' '}
        <span className="text-ink-soft">starts here.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18 }}
        className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ink-soft sm:text-lg"
      >
        A pocket-sized study companion for the Florida Electrology, Laser &amp;
        IPL exam — quizzes, flashcards, and a five-day plan. Sip it like
        coffee, not shotgun.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28 }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <button
          type="button"
          onClick={() => {
            play('tap');
            scrollToId('quiz');
          }}
          className="btn-accent"
        >
          Start a quiz round
          <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          onClick={() => {
            play('tap');
            scrollToId('flashcards');
          }}
          className="btn-ghost"
        >
          Flip some flashcards
        </button>
      </motion.div>

      {best !== null && history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-2 text-sm text-ink-muted"
        >
          <span className="pill-tag">
            <CountUp value={history.length} /> {history.length === 1 ? 'round' : 'rounds'}{' '}
            logged
          </span>
          <span className="pill-tag">
            Best <CountUp value={best} />/{total}
          </span>
          <span className="font-hand text-lg text-tangerine-deep">
            you're already underway —
          </span>
        </motion.div>
      )}
    </header>
  );
}
