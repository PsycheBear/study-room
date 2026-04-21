import { motion } from 'framer-motion';
import { letter } from '../data/letter';

export function Letter() {
  const paragraphs = letter.body.split('\n\n');

  return (
    <section
      id="letter"
      className="relative mx-auto w-full max-w-xl px-5 py-10 sm:max-w-2xl sm:px-6 md:max-w-3xl"
    >
      <motion.article
        initial={{ opacity: 0, y: 18, rotate: -0.6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.5 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="paper-card relative px-6 py-9 sm:px-10 sm:py-11"
        style={{ transform: 'rotate(-0.5deg)' }}
      >
        <span className="washi-tape" aria-hidden />

        <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-muted">
          <span className="inline-block h-px w-6 bg-ink-muted/50" />
          A quick note
        </div>

        <p className="font-display text-2xl font-medium italic leading-snug text-ink sm:text-3xl">
          {letter.greeting}
        </p>

        <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink-soft">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-8 flex items-end justify-between gap-4">
          <p className="font-hand text-xl text-ink-muted">{letter.signoff}</p>
          <svg
            viewBox="0 0 120 12"
            preserveAspectRatio="none"
            className="h-2 w-28 flex-none"
            aria-hidden
          >
            <path
              d="M2 6 C 30 2, 60 10, 92 4 S 116 8, 118 5"
              fill="none"
              stroke="#E85D23"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.article>
    </section>
  );
}
