import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Video } from '../data/videos';
import { play as playSound } from '../lib/sound';

export function VideoCard({ video, index }: { video: Video; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const tilt = index % 2 === 0 ? 0.3 : -0.3;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className="paper-card overflow-hidden"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="relative aspect-video w-full bg-ink/10">
        {loaded ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              playSound('open');
              setLoaded(true);
            }}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`Play: ${video.title}`}
          >
            {!thumbFailed ? (
              <img
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                onError={() => setThumbFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-paper-warm via-paper-deep to-sage-soft"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-paper text-ink shadow-card transition-transform group-active:scale-95">
              <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="relative px-5 py-5 sm:px-6">
        <span className="pill-tag mb-2">{video.topic}</span>
        <h3 className="font-display text-xl font-medium leading-tight text-ink">
          {video.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          {video.desc}
        </p>
      </figcaption>
    </motion.figure>
  );
}
