import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Topic } from '../data/topics';

export function TopicCard({ topic, index }: { topic: Topic; index: number }) {
  const [open, setOpen] = useState(false);
  const tilt = index % 2 === 0 ? -0.4 : 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="paper-card relative overflow-hidden"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
      >
        <span
          aria-hidden
          className="mt-1 font-display text-[28px] font-semibold leading-none text-tangerine-deep sm:text-[34px]"
        >
          {topic.id}
        </span>
        <span className="flex-1">
          <span className="pill-tag mb-2">{topic.tag}</span>
          <span className="block font-display text-[22px] font-medium leading-tight text-ink sm:text-2xl">
            {topic.title}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-full border border-ink/15 bg-paper-soft text-ink"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2.2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="relative space-y-3 border-t border-ink/10 px-6 py-5 sm:px-8">
              {topic.points.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex gap-3 text-[15.5px] leading-relaxed text-ink-soft"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-tangerine"
                  />
                  <span>{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
