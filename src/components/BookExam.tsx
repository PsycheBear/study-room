import { motion } from 'framer-motion';
import { CalendarCheck, ExternalLink, Info } from 'lucide-react';
import { Section } from './Section';

export function BookExam() {
  return (
    <Section
      id="book"
      eyebrow="When you're ready"
      title={
        <>
          Book the{' '}
          <span className="marker-hi">exam</span>.
        </>
      }
      subtitle="Florida IBEC delivers through Prometric. Schedule when the prep feels honest — not earlier, not later."
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="paper-card relative px-6 py-7 sm:px-9 sm:py-9"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-ink/10 bg-paper-warm text-tangerine-deep">
            <CalendarCheck className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-[22px] font-medium leading-tight text-ink sm:text-2xl">
              Florida IBEC · Prometric
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              Retake scheduling opens after the required waiting window between
              attempts. Confirm the exact interval with the Florida Electrolysis
              Council before booking; Prometric will hold any seat you pick.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink-muted">
          <Info className="mt-0.5 h-4 w-4 flex-none text-tangerine-deep" />
          <span>
            Double-check the wait-period rule with the Council directly — it
            has drifted before. Thirty seconds on the phone beats thirty days
            of rescheduling.
          </span>
        </div>

        <div className="safe-bottom mt-6 flex flex-wrap gap-3">
          <a
            href="https://www.prometric.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-accent"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={2.4} />
            Schedule at Prometric
          </a>
          <a
            href="https://floridaselectrologycouncil.gov/"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost"
          >
            Electrolysis Council
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
