import { motion } from 'framer-motion';
import { RotateCcw, Trophy } from 'lucide-react';

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

function verdict(ratio: number): { title: string; body: string } {
  if (ratio >= 0.85) {
    return {
      title: 'Nerves of ice',
      body:
        "That's a strong, confident round. File this one under 'evidence you're ready' and treat the misses like a tuning fork.",
    };
  }
  if (ratio >= 0.7) {
    return {
      title: "You're in the zone",
      body:
        'Solid territory. Another lap or two through the topics you missed and this becomes a comfortable win.',
    };
  }
  if (ratio >= 0.5) {
    return {
      title: 'Honest middle',
      body:
        "This is what 'actively learning' looks like. The misses are exactly where your next study block should sit.",
    };
  }
  return {
    title: "Day one of the next round",
    body:
      'Every wrong answer just told you something useful. Reopen the topic briefs and let this one inform the replay.',
  };
}

export function QuizResults({ score, total, onRestart }: Props) {
  const ratio = total === 0 ? 0 : score / total;
  const v = verdict(ratio);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="paper-card relative px-6 py-9 sm:px-10"
    >
      <span className="washi-tape" aria-hidden />
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-tangerine-deep">
        <Trophy className="h-4 w-4" strokeWidth={2.4} />
        Round complete
      </div>

      <p className="mt-5 font-display text-[56px] font-semibold leading-none text-ink sm:text-[72px]">
        {score}
        <span className="text-ink-faded">/{total}</span>
      </p>

      <h3 className="mt-3 font-display text-[26px] font-medium text-ink sm:text-[30px]">
        <span className="hand-underline">{v.title}</span>.
      </h3>
      <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-ink-soft">
        {v.body}
      </p>

      <div className="safe-bottom mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={onRestart} className="btn-accent">
          <RotateCcw className="h-4 w-4" strokeWidth={2.4} />
          Run another round
        </button>
        <a href="#flashcards" className="btn-ghost">
          Flip some flashcards
        </a>
      </div>
    </motion.div>
  );
}
