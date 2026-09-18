import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import experienceData from '@/data/experience.json';
import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  Users,
  Cpu,
  Code,
  CheckCircle2,
  ChevronRight,
  X,
  Star,
} from 'lucide-react';

const iconMap = {
  Briefcase,
  TrendingUp,
  Users,
  Code,
  Cpu,
} as const;

type ExpType = 'All' | 'Full-time' | 'Part-time' | 'Freelance';

const FILTERS: ExpType[] = ['All', 'Full-time', 'Part-time', 'Freelance'];

function formatDuration(start?: string, end?: string) {
  if (!start) return null;
  const [sy, sm] = start.split('-').map(Number);
  if (!sy || !sm) return null;

  let ey: number;
  let em: number;
  if (end) {
    const parts = end.split('-').map(Number);
    ey = parts[0];
    em = parts[1];
    if (!ey || !em) return null;
  } else {
    const now = new Date();
    ey = now.getFullYear();
    em = now.getMonth() + 1;
  }

  let months = (ey - sy) * 12 + (em - sm);
  if (months < 1) months = 1;

  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${rem} mo${rem === 1 ? '' : 's'}`;
  if (rem === 0) return `${years} yr${years === 1 ? '' : 's'}`;
  return `${years} yr${years === 1 ? '' : 's'} ${rem} mo${rem === 1 ? '' : 's'}`;
}

function isCurrentRole(period: string) {
  return period.toLowerCase().includes('present');
}

export const ExperienceSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const [filter, setFilter] = useState<ExpType>('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const experiences = useMemo(
    () =>
      experienceData.experiences.map((exp) => ({
        ...exp,
        Icon: iconMap[exp.icon as keyof typeof iconMap] ?? Briefcase,
        current: isCurrentRole(exp.period),
        duration: formatDuration(exp.start, (exp as { end?: string }).end),
        logo: 'logo' in exp ? (exp.logo as string | undefined) : undefined,
      })),
    []
  );

  const filtered = useMemo(
    () => (filter === 'All' ? experiences : experiences.filter((e) => e.type === filter)),
    [experiences, filter]
  );

  const selected = useMemo(
    () => filtered.find((e) => e.id === selectedId) ?? experiences.find((e) => e.id === selectedId) ?? null,
    [filtered, experiences, selectedId]
  );

  const openRole = (id: number) => {
    setSelectedId(id);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panelOpen]);

  useEffect(() => {
    if (!(panelOpen && selectedId != null)) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [panelOpen, selectedId]);

  useEffect(() => {
    if (selectedId != null && !filtered.some((e) => e.id === selectedId)) {
      setSelectedId(null);
      setPanelOpen(false);
    }
  }, [filtered, selectedId]);

  return (
    <section id="experience" className="py-12 sm:py-16 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/4 w-56 h-56 bg-accent/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={headerRef}
          className={`mb-7 sm:mb-8 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-2.5">
            <Briefcase size={13} className="text-accent" />
            <span className="text-[11px] font-semibold text-accent tracking-[0.16em] uppercase">
              Experience
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-[-0.02em]">
            Experience That Drives Results
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-snug">
            Scan roles like search results — click any step to open full details.
          </p>
        </div>

        <div
          ref={contentRef}
          className={`transition-all duration-700 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  filter === item
                    ? 'border-accent/40 bg-accent/10 text-accent'
                    : 'border-border/70 text-muted-foreground hover:border-accent/25 hover:text-primary'
                }`}
              >
                {item}
              </button>
            ))}
            <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
              {filtered.length} result{filtered.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] gap-4 items-start">
            {/* Compact search-step list */}
            <ol className="rounded-lg border border-border/70 bg-background overflow-hidden divide-y divide-border/60">
              {filtered.map((exp, index) => {
                const Icon = exp.Icon;
                const isActive = panelOpen && selectedId === exp.id;
                const step = String(index + 1).padStart(2, '0');

                return (
                  <li key={exp.id}>
                    <button
                      type="button"
                      onClick={() => openRole(exp.id)}
                      className={`w-full text-left px-3 sm:px-3.5 py-2.5 sm:py-3 flex items-start gap-3 transition-colors ${
                        isActive ? 'bg-accent/[0.07]' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <span
                        className={`mt-0.5 text-[11px] font-bold tabular-nums shrink-0 w-6 ${
                          isActive ? 'text-accent' : 'text-muted-foreground/70'
                        }`}
                      >
                        {step}
                      </span>

                      <div className="w-9 h-9 rounded-lg bg-secondary/70 border border-border/60 flex items-center justify-center shrink-0 overflow-hidden p-1">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt=""
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <Icon className="w-4 h-4 text-accent" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                          {exp.current && (
                            <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                              <span className="h-1 w-1 rounded-full bg-emerald-500" />
                              Current
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-accent">{exp.type}</span>
                        </div>
                        <p className="text-[13px] sm:text-sm font-bold text-primary leading-snug truncate">
                          {exp.title}
                        </p>
                        <p className="text-[12px] font-medium text-accent/90 truncate">{exp.company}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground leading-snug flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={10} />
                            {exp.period}
                          </span>
                          {exp.duration && <span className="tabular-nums">· {exp.duration}</span>}
                          <span className="inline-flex items-center gap-1">
                            · <MapPin size={10} />
                            {exp.location}
                          </span>
                        </p>
                        {exp.focus && (
                          <p className="mt-0.5 text-[11px] text-primary/55 truncate">{exp.focus}</p>
                        )}
                      </div>

                      <ChevronRight
                        size={16}
                        className={`mt-2 shrink-0 transition-transform duration-300 ${
                          isActive ? 'text-accent translate-x-0.5' : 'text-muted-foreground/50'
                        }`}
                      />
                    </button>
                  </li>
                );
              })}

              {filtered.length === 0 && (
                <li className="px-4 py-8 text-sm text-muted-foreground text-center">No roles in this filter.</li>
              )}
            </ol>

            {/* Desktop detail sidebar */}
            <aside className="hidden lg:block sticky top-24 min-h-[280px]">
              <div
                className={`rounded-lg border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  panelOpen && selected
                    ? 'border-border/70 bg-background shadow-lg shadow-accent/5 opacity-100 translate-x-0'
                    : 'border-dashed border-border/70 bg-secondary/20 opacity-100'
                }`}
              >
                {panelOpen && selected ? (
                  <div key={selected.id} className="animate-in fade-in slide-in-from-right-3 duration-300">
                    <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 border-b border-border/60 bg-secondary/40">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Role details
                      </p>
                      <button
                        type="button"
                        onClick={closePanel}
                        className="p-1 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                        aria-label="Close details"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="p-3.5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-secondary/70 border border-border/60 flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                          {selected.logo ? (
                            <img
                              src={selected.logo}
                              alt={`${selected.company} logo`}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <selected.Icon className="w-5 h-5 text-accent" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-primary leading-tight">{selected.title}</h3>
                          <p className="text-sm font-semibold text-accent mt-0.5">{selected.company}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {selected.current && (
                          <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                            Current
                          </span>
                        )}
                        <span className="rounded-lg border border-accent/25 bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                          {selected.type}
                        </span>
                        <span className="rounded-lg border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          {selected.period}
                        </span>
                        {selected.duration && (
                          <span className="rounded-lg border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground tabular-nums">
                            {selected.duration}
                          </span>
                        )}
                      </div>

                      {selected.summary && (
                        <p className="text-[13px] text-muted-foreground leading-snug mb-3">{selected.summary}</p>
                      )}

                      <div className="mb-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Stack
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selected.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-1.5 py-0.5 bg-secondary/70 text-primary/80 text-[10px] font-medium rounded-lg border border-border/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-primary flex items-center gap-1.5 text-[12px] mb-1.5">
                          <Star size={12} className="text-accent" />
                          Impact
                        </h4>
                        <ul className="space-y-1.5">
                          {selected.achievements.map((item) => (
                            <li
                              key={item}
                              className="text-muted-foreground flex items-start gap-2 text-[12px] sm:text-[13px]"
                            >
                              <CheckCircle2 className="mt-0.5 h-3 w-3 text-accent shrink-0" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-12 text-center">
                    <p className="text-[12px] text-muted-foreground">Select a role to view details</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1">Click any step on the left</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Mobile / tablet detail drawer — portaled so fixed isn't trapped by section transforms */}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`lg:hidden fixed inset-0 z-[110] transition-opacity duration-300 ${
              panelOpen && selected
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!panelOpen || !selected}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
              onClick={closePanel}
              aria-label="Close overlay"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Role details"
              className={`absolute inset-x-0 bottom-0 max-h-[min(88dvh,640px)] rounded-t-xl border border-border/70 bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pb-[env(safe-area-inset-bottom)] ${
                panelOpen && selected ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              {selected && (
                <>
                  <div className="relative flex items-center justify-between gap-2 px-4 pt-4 pb-3 border-b border-border/60">
                    <div
                      className="h-1 w-10 rounded-full bg-border absolute left-1/2 -translate-x-1/2 top-2"
                      aria-hidden
                    />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Role details
                    </p>
                    <button
                      type="button"
                      onClick={closePanel}
                      className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="p-4 overflow-y-auto overscroll-contain max-h-[calc(min(88dvh,640px)-3.5rem)]">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-secondary/70 border border-border/60 flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                        {selected.logo ? (
                          <img
                            src={selected.logo}
                            alt={`${selected.company} logo`}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <selected.Icon className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-primary leading-tight">
                          {selected.title}
                        </h3>
                        <p className="text-sm font-semibold text-accent mt-0.5">{selected.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="rounded-lg border border-accent/25 bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                        {selected.type}
                      </span>
                      <span className="rounded-lg border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {selected.period}
                      </span>
                    </div>

                    {selected.summary && (
                      <p className="text-[13px] text-muted-foreground leading-snug mb-3">
                        {selected.summary}
                      </p>
                    )}

                    <div className="mb-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Stack
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selected.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-1.5 py-0.5 bg-secondary/70 text-primary/80 text-[10px] font-medium rounded-lg border border-border/50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary flex items-center gap-1.5 text-[12px] mb-1.5">
                        <Star size={12} className="text-accent" />
                        Impact
                      </h4>
                      <ul className="space-y-1.5">
                        {selected.achievements.map((item) => (
                          <li
                            key={item}
                            className="text-muted-foreground flex items-start gap-2 text-[13px]"
                          >
                            <CheckCircle2 className="mt-0.5 h-3 w-3 text-accent shrink-0" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
