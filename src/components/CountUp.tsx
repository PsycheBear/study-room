import { useEffect, useState } from 'react';

type Props = {
  value: number;
  decimals?: number;
  durationMs?: number;
  className?: string;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function CountUp({ value, decimals = 0, durationMs = 700, className }: Props) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const from = display;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (to - from) * eased;
      setDisplay(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Intentionally only re-run when value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs]);

  const out = decimals
    ? display.toFixed(decimals)
    : Math.round(display).toString();

  return <span className={className}>{out}</span>;
}
