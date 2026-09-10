import { useEffect, useRef, useState } from 'react';
import { Search, PenTool, Code2, Rocket, Sparkles } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    desc: 'Clarify goals, users, and constraints so the build stays focused.',
    icon: Search,
  },
  {
    n: '02',
    title: 'Design',
    desc: 'Map flows and UI that feel clear, fast, and on-brand.',
    icon: PenTool,
  },
  {
    n: '03',
    title: 'Develop',
    desc: 'Ship solid frontends and backends with clean, maintainable code.',
    icon: Code2,
  },
  {
    n: '04',
    title: 'Deliver',
    desc: 'Launch, measure, and iterate — including QA when quality matters.',
    icon: Rocket,
  },
] as const;

const STEP_MS = 3200;

export const AboutDesignProcess = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const activeRef = useRef(0);
  const elapsedRef = useRef(0);
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      if (now >= pauseUntilRef.current) {
        elapsedRef.current += dt;
        const p = Math.min(1, elapsedRef.current / STEP_MS);
        setProgress(p);

        if (p >= 1) {
          elapsedRef.current = 0;
          setProgress(0);
          const next = (activeRef.current + 1) % STEPS.length;
          activeRef.current = next;
          setActive(next);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const selectStep = (index: number) => {
    activeRef.current = index;
    elapsedRef.current = 0;
    pauseUntilRef.current = performance.now() + 5000;
    setActive(index);
    setProgress(0);
  };

  const current = STEPS[active];
  const CurrentIcon = current.icon;
  const railPct = reduceMotion
    ? 100
    : Math.min(100, ((active + progress) / (STEPS.length - 1)) * 100);

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-8 sm:mb-10 max-w-lg">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <Sparkles size={14} className="text-accent" strokeWidth={2.25} />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
              Process
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-[-0.02em]">
            My Design Process
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            A simple path from idea to shipped product — without overcomplicating the work.
          </p>
        </div>

        <div className="relative mb-8 sm:mb-10">
          <div
            className="absolute left-0 right-0 top-5 h-px bg-border/70 hidden sm:block"
            aria-hidden
          />
          <div
            className="absolute left-0 top-5 h-px bg-accent hidden sm:block"
            style={{ width: `${railPct}%` }}
            aria-hidden
          />

          <ol className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 relative">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = active === index;
              const isDone = index < active || reduceMotion;

              return (
                <li key={step.n}>
                  <button
                    type="button"
                    onClick={() => selectStep(index)}
                    aria-current={isActive ? 'step' : undefined}
                    className="w-full text-left group"
                  >
                    <span
                      className={`relative z-[1] mb-3 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? 'border-accent bg-accent text-white shadow-[0_0_0_4px_hsl(var(--accent)/0.15)]'
                          : isDone
                            ? 'border-accent/40 bg-accent/10 text-accent'
                            : 'border-border bg-white text-muted-foreground group-hover:border-accent/40'
                      }`}
                    >
                      <Icon size={15} />
                    </span>
                    <span
                      className={`block text-[11px] font-bold tabular-nums mb-1 ${
                        isActive ? 'text-accent' : 'text-muted-foreground'
                      }`}
                    >
                      {step.n}
                    </span>
                    <span
                      className={`block font-display text-base sm:text-lg font-bold tracking-tight transition-colors ${
                        isActive ? 'text-primary' : 'text-primary/55'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          key={current.n}
          className="rounded-lg bg-secondary/60 px-5 py-5 sm:px-7 sm:py-6 flex gap-4 sm:gap-5 items-start animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <span className="shrink-0 w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
            <CurrentIcon size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold tabular-nums text-accent">{current.n}</span>
              <span className="text-[11px] text-muted-foreground">/</span>
              <span className="text-[11px] tabular-nums text-muted-foreground">
                {String(STEPS.length).padStart(2, '0')}
              </span>
              {!reduceMotion && (
                <span className="ml-auto h-1 w-16 sm:w-24 rounded-full bg-border/80 overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-accent"
                    style={{ width: `${progress * 100}%` }}
                  />
                </span>
              )}
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-primary tracking-tight">
              {current.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
              {current.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
