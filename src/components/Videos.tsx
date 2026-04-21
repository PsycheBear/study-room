import { motion } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';
import { videos, videoSearches } from '../data/videos';
import { Section } from './Section';
import { VideoCard } from './VideoCard';
import { play } from '../lib/sound';

export function Videos() {
  return (
    <Section
      id="videos"
      eyebrow="Watch this"
      title={
        <>
          Short videos,{' '}
          <span className="marker-hi">picked on purpose</span>.
        </>
      }
      subtitle="A hand-picked set up top, and a shelf of search queries below when you want to go deeper on infection control, clinical / legal, or physics."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {videos.map((v, i) => (
          <VideoCard key={v.id} video={v} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.55 }}
        className="paper-card mt-8 px-5 py-6 sm:px-7"
      >
        <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-muted">
          <Search className="h-3.5 w-3.5" strokeWidth={2.4} />
          More rabbit holes
        </div>
        <p className="mb-4 text-[15px] leading-relaxed text-ink-soft">
          Each link opens a fresh YouTube search in a new tab — handy when you
          want one more take on a concept that didn&apos;t quite land yet.
        </p>
        <ul className="flex flex-col divide-y divide-ink/10">
          {videoSearches.map((s) => (
            <li key={s.query}>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(s.query)}`}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => play('tap')}
                className="flex items-center gap-3 py-3 transition-colors active:bg-paper-warm"
              >
                <span className="pill-tag">{s.topic}</span>
                <span className="flex-1 font-display text-[17px] font-medium leading-tight text-ink">
                  {s.label}
                </span>
                <ExternalLink
                  className="h-4 w-4 flex-none text-ink-muted"
                  strokeWidth={2.2}
                />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
