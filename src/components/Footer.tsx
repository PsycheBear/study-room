export function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-xl px-5 pb-16 pt-6 sm:max-w-2xl md:max-w-3xl">
      <div className="flex flex-col items-center gap-2 text-center">
        <svg viewBox="0 0 120 10" className="h-2 w-40 opacity-60" aria-hidden>
          <path
            d="M2 5 C 30 1, 60 9, 92 4 S 116 8, 118 5"
            fill="none"
            stroke="#E85D23"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className="font-hand text-lg text-ink-muted">
          made with care, for round two —
        </p>
        <p className="text-[12px] uppercase tracking-[0.22em] text-ink-faded">
          RJ's study room · <span className="text-tangerine-deep">round two</span>
        </p>
      </div>
    </footer>
  );
}
