import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { scrollToId } from '../lib/utils';
import { isMuted, toggleMuted, play } from '../lib/sound';

const LINKS: { id: string; label: string }[] = [
  { id: 'hero', label: 'Start' },
  { id: 'topics', label: 'Topics' },
  { id: 'videos', label: 'Videos' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'flashcards', label: 'Cards' },
  { id: 'plan', label: 'Plan' },
  { id: 'pep', label: 'Pep' },
  { id: 'book', label: 'Book' },
];

export function Nav() {
  const [progress, setProgress] = useState(0);
  const [muted, setMutedState] = useState(() => isMuted());

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const onMute = (e: Event) => {
      const detail = (e as CustomEvent<boolean>).detail;
      setMutedState(detail);
    };
    window.addEventListener('studyroom:mute', onMute);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('studyroom:mute', onMute);
    };
  }, []);

  const onNavTap = (id: string) => {
    play('tap');
    scrollToId(id);
  };

  const onToggleMute = () => {
    const next = toggleMuted();
    if (!next) play('tap');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="sticky top-0 z-40 w-full border-b border-ink/5 bg-paper/70 backdrop-blur-md"
      aria-label="Primary"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <button
          type="button"
          onClick={() => onNavTap('hero')}
          className="flex items-center gap-2 text-ink"
          aria-label="Study room"
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
            <rect width="32" height="32" rx="8" fill="#EFDFBF" />
            <path
              d="M6 23 C 12 10, 24 10, 28 14 C 24 22, 14 26, 6 23 Z"
              fill="#8AA579"
              opacity=".45"
            />
            <path
              d="M10 22 L10 11 Q10 10 11 10 L17 10 Q20 10 20 13 Q20 16 17 16 L11 16 M16 16 L20 22"
              stroke="#2B2014"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M9 25 Q 16 23, 24 25"
              stroke="#E85D23"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="font-display text-[15px] font-medium tracking-tight text-ink">
            study room
          </span>
          <span className="signature text-lg leading-none">· RJ</span>
        </button>

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? 'Unmute sound' : 'Mute sound'}
          aria-pressed={muted}
          className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-ink/10 bg-paper-soft text-ink-soft active:bg-paper-warm"
        >
          {muted ? (
            <VolumeX className="h-4 w-4" strokeWidth={2.2} />
          ) : (
            <Volume2 className="h-4 w-4" strokeWidth={2.2} />
          )}
        </button>
      </div>

      {/* Section jump strip — scrollable row on mobile, inline on desktop */}
      <ul className="no-scrollbar mx-auto flex max-w-3xl items-center gap-1 overflow-x-auto px-4 pb-2 sm:px-6">
        {LINKS.slice(1).map((l) => (
          <li key={l.id} className="flex-none">
            <button
              type="button"
              onClick={() => onNavTap(l.id)}
              className="rounded-full px-3 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink active:bg-paper-warm min-h-[36px]"
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="relative h-[3px] w-full bg-transparent">
        <div
          className="absolute left-0 top-0 h-full bg-tangerine"
          style={{
            transform: `scaleX(${progress})`,
            transformOrigin: 'left',
            transition: 'transform 80ms linear',
          }}
        />
      </div>
    </motion.nav>
  );
}
