import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import {
  Trophy,
  Award,
  GraduationCap,
  FileText,
  ExternalLink,
  Medal,
} from 'lucide-react';

type HonorKind = 'certification' | 'research' | 'academic';

type HonorItem = {
  id: string;
  title: string;
  kind: HonorKind;
  org: string;
  period: string;
  description: string;
  link?: string | null;
  badge: string;
  meta?: string;
  /** Detail panel surface */
  panel: string;
  accentDot: string;
  label: string;
};

const honors: HonorItem[] = [
  {
    id: 'istqb',
    title: 'ISTQB® Certified Tester Foundation Level v4',
    kind: 'certification',
    org: 'International Software Testing Qualifications Board',
    period: '2026',
    description:
      'Passed CTFL4 — structured test design, execution, and defect reporting for professional QA practice.',
    badge: 'CTFL4',
    meta: 'Professional certification',
    panel: 'bg-[#1a3a4a]',
    accentDot: 'bg-[#5ec4d8]',
    label: 'Certification',
  },
  {
    id: 'paper-1',
    title: 'Towards A Novel Prototype for Superpower Glass for Autistic Kids',
    kind: 'research',
    org: 'International Journal of Industry and Sustainable Development',
    period: '2023',
    description:
      'Wearable assistive technology research for autistic children — accepted for journal publication.',
    link: 'https://ijisd.journals.ekb.eg/article_308232.html',
    badge: 'Journal',
    meta: 'IJISD-2306-1032 (R1)',
    panel: 'bg-[#2f4a38]',
    accentDot: 'bg-[#8fbf7a]',
    label: 'Research',
  },
  {
    id: 'paper-2',
    title: 'Enhancing Autism Knowledge with GUI Solution',
    kind: 'research',
    org: 'Seventh International Undergraduate Research Conference',
    period: '2023',
    description:
      'Presented at Military Technical College — accepted for publication under ID_1041-IUGRC.',
    badge: 'Conference',
    meta: 'ID_1041-IUGRC (R2)',
    panel: 'bg-[#3a3f5c]',
    accentDot: 'bg-[#a8b4ff]',
    label: 'Research',
  },
  {
    id: 'bsc',
    title: 'BSc — Communications & Electronics Engineering',
    kind: 'academic',
    org: 'Egyptian Academy for Engineering and Advanced Technology',
    period: '2018 – 2023',
    description:
      'Very Good with Honor · GPA 3.41 · Graduation project Excellent A+ (Smart Wearable Glasses for Autistic Kids).',
    badge: 'Honors',
    meta: 'GPA 3.41',
    panel: 'bg-[#4a3728]',
    accentDot: 'bg-[#e0b37a]',
    label: 'Academic',
  },
  {
    id: 'ecommerce',
    title: 'eCommerce Project Excellence',
    kind: 'academic',
    org: 'AMIT Learning',
    period: '2023 – 2024',
    description: 'Perfect score in Front-End Web Development Diploma eCommerce project.',
    badge: '100%',
    meta: 'Diploma project',
    panel: 'bg-[#3d2a3a]',
    accentDot: 'bg-[#e09aba]',
    label: 'Academic',
  },
];

const kindIcon = {
  certification: Award,
  research: FileText,
  academic: GraduationCap,
} as const;

export const HonorsAwardsSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [focusedId, setFocusedId] = useState(honors[0].id);

  const selected = honors.find((h) => h.id === focusedId) ?? honors[0];
  const SelectedIcon = kindIcon[selected.kind];

  return (
    <section id="honors-awards" className="py-14 sm:py-16 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-1/4 w-56 h-56 bg-accent/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={headerRef}
          className={`mb-8 sm:mb-10 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-2.5">
            <Medal size={13} className="text-accent" />
            <span className="text-[11px] font-semibold text-accent tracking-[0.16em] uppercase">
              Recognition
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-[-0.02em]">
            Honors, Certifications & Research
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-relaxed">
            Select an item to preview details — each honor has its own color story.
          </p>
        </div>

        <div
          ref={contentRef}
          className={`grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] gap-5 lg:gap-6 items-stretch transition-all duration-700 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Left — honors list */}
          <div className="rounded-lg border border-border/70 bg-background overflow-hidden flex flex-col min-h-[320px]">
            <div className="px-4 py-3 border-b border-border/60 bg-secondary/40 flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                All honors
              </p>
              <span className="text-[11px] tabular-nums text-muted-foreground">
                {honors.length} items
              </span>
            </div>

            <ul className="divide-y divide-border/50 flex-1">
              {honors.map((item) => {
                const isActive = focusedId === item.id;
                const Icon = kindIcon[item.kind];

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setFocusedId(item.id)}
                      onMouseEnter={() => setFocusedId(item.id)}
                      className={`w-full text-left px-4 py-3.5 flex gap-3 transition-colors ${
                        isActive ? 'bg-secondary/50' : 'hover:bg-secondary/30'
                      }`}
                    >
                      <span
                        className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${item.accentDot}`}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                            <Icon size={11} />
                            {item.label}
                          </span>
                          <span className="text-[10px] tabular-nums text-muted-foreground">
                            {item.period}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-primary/70'
                            }`}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <p
                          className={`text-[13px] sm:text-[14px] font-semibold leading-snug ${
                            isActive ? 'text-primary' : 'text-primary/85'
                          }`}
                        >
                          {item.title}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">
                          {item.org}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right — colored details panel */}
          <aside
            key={selected.id}
            className={`relative overflow-hidden rounded-lg text-white min-h-[320px] lg:min-h-full flex flex-col ${selected.panel} shadow-[0_24px_60px_-28px_rgba(0,0,0,0.4)] animate-page-enter`}
          >
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 45%), linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
              }}
              aria-hidden
            />

            <div className="relative flex flex-col flex-1 p-5 sm:p-6 lg:p-7">
              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
                    <SelectedIcon size={12} />
                    {selected.label}
                  </span>
                  <span className="rounded-md bg-white/20 px-2 py-1 text-[10px] font-bold">
                    {selected.badge}
                  </span>
                </div>
                <span className="text-[12px] tabular-nums text-white/65 shrink-0">
                  {selected.period}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug tracking-tight">
                {selected.title}
              </h3>

              <p className="mt-4 text-sm text-white/75 leading-relaxed flex-1">
                {selected.description}
              </p>

              <div className="mt-6 pt-5 border-t border-white/15 space-y-3">
                <p className="text-[12px] text-white/55 leading-snug">{selected.org}</p>
                {selected.meta && (
                  <p className="font-mono text-[11px] text-white/50">{selected.meta}</p>
                )}

                <div className="flex items-center justify-between gap-3 pt-1">
                  {selected.link ? (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white text-primary px-3.5 py-2 text-[12px] font-semibold hover:bg-white/90 transition-colors"
                    >
                      <ExternalLink size={13} />
                      View publication
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-white/55">
                      <Trophy size={14} />
                      Recognition highlight
                    </span>
                  )}
                  <span className={`w-3 h-3 rounded-full ${selected.accentDot}`} aria-hidden />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
