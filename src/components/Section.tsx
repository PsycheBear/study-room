import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

type Props = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, subtitle, children, className }: Props) {
  return (
    <section
      id={id}
      className={cn(
        'relative mx-auto w-full max-w-xl px-5 pt-10 pb-16 sm:max-w-2xl sm:px-6 md:max-w-3xl',
        className,
      )}
    >
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <span className="inline-block h-px w-8 bg-ink-muted/50" />
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-[34px] font-semibold leading-[1.04] tracking-tight text-ink sm:text-[40px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-ink-soft">
            {subtitle}
          </p>
        )}
      </motion.header>
      {children}
    </section>
  );
}
