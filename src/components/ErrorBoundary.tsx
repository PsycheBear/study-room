import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[study-room] render error:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="mx-auto w-full max-w-xl px-5 pt-14 pb-12 sm:px-6">
        <div className="paper-card px-6 py-8 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-tangerine-deep">
            Something snapped
          </p>
          <h2 className="mt-2 font-display text-[26px] font-medium leading-tight text-ink">
            The page hit a bump.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            A reload usually fixes it. Your saved progress is safe — it lives on this
            device, not in this tab.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-ink/10 bg-paper-soft px-3 py-2 text-[12px] text-ink-muted">
            {this.state.error.message}
          </pre>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-accent"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
