import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import data from '@/data/skills_services.json';
import {
  Briefcase,
  Code2,
  Globe,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Layout,
  Puzzle,
  FileCode2,
  MousePointerClick,
  Gauge,
  Search,
  Play,
  RotateCcw,
  Layers,
} from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiAngular,
  SiLaravel,
  SiPhp,
  SiWordpress,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiNodedotjs,
  SiSelenium,
  SiGit,
} from 'react-icons/si';

const TECH_STACK: { name: string; Icon: IconType }[] = [
  { name: 'React', Icon: SiReact },
  { name: 'Angular', Icon: SiAngular },
  { name: 'Laravel', Icon: SiLaravel },
  { name: 'PHP', Icon: SiPhp },
  { name: 'WordPress', Icon: SiWordpress },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Tailwind', Icon: SiTailwindcss },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Selenium', Icon: SiSelenium },
  { name: 'Git', Icon: SiGit },
];

const WebDevVisual = () => {
  const [stack, setStack] = useState<'react' | 'angular'>('react');
  const [view, setView] = useState<'ui' | 'api'>('ui');

  return (
    <div className="relative rounded-lg border border-border/60 bg-[#0f1117] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.2),transparent_45%)] pointer-events-none" />
      <div className="relative flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[10px] text-white/40 font-mono">
          {stack === 'react' ? 'App.tsx' : 'app.component.ts'}
        </span>
      </div>

      <div className="relative p-3 space-y-3">
        <div className="flex gap-1.5 p-1 rounded-lg bg-white/5 border border-white/10">
          {([
            { id: 'react' as const, label: 'React' },
            { id: 'angular' as const, label: 'Angular' },
          ]).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStack(tab.id)}
              className={`flex-1 rounded-md px-2 py-1.5 text-[11px] font-semibold transition-all ${
                stack === tab.id
                  ? 'bg-accent/25 text-accent border border-accent/35'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setView('ui')}
            className={`rounded-lg border p-2.5 text-left transition-all ${
              view === 'ui'
                ? 'border-accent/40 bg-accent/15'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25'
            }`}
          >
            <Layout className={`h-3.5 w-3.5 mb-1.5 ${view === 'ui' ? 'text-accent' : 'text-white/40'}`} />
            <p className="text-[11px] font-medium text-white/80">UI layer</p>
            <p className="text-[10px] text-white/40 mt-0.5">
              {stack === 'react' ? 'Components' : 'Templates'}
            </p>
          </button>
          <button
            type="button"
            onClick={() => setView('api')}
            className={`rounded-lg border p-2.5 text-left transition-all ${
              view === 'api'
                ? 'border-accent/40 bg-accent/15'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25'
            }`}
          >
            <Layers className={`h-3.5 w-3.5 mb-1.5 ${view === 'api' ? 'text-accent' : 'text-white/40'}`} />
            <p className="text-[11px] font-medium text-white/80">API layer</p>
            <p className="text-[10px] text-white/40 mt-0.5">Laravel / PHP</p>
          </button>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-mono text-[10px] text-white/55 leading-relaxed">
          {view === 'ui' ? (
            stack === 'react' ? (
              <>
                <span className="text-accent">const</span> App = () =&gt; {'<'}Product /{'>'}
              </>
            ) : (
              <>
                <span className="text-accent">@Component</span>({'{'} selector: &apos;app&apos; {'}'})
              </>
            )
          ) : (
            <>
              <span className="text-accent">Route::</span>apiResource(&apos;products&apos;)
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const WordPressVisual = () => {
  const [focus, setFocus] = useState<'theme' | 'plugin'>('theme');
  const [stack, setStack] = useState<'react' | 'php'>('react');

  const panels = {
    theme: {
      title: 'Theme customization',
      points: ['Custom templates', 'Block / classic themes', 'Design tokens & layouts'],
    },
    plugin: {
      title: 'Plugin customization',
      points: ['Hooks & filters', 'Admin UX', 'Extend existing plugins'],
    },
  }[focus];

  return (
    <div className="relative rounded-lg border border-border/60 bg-gradient-to-br from-secondary via-background to-secondary overflow-hidden p-3.5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent/15 border border-accent/25 grid place-items-center">
            <Globe className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-primary">WP Custom Studio</p>
            <p className="text-[10px] text-muted-foreground">Themes · Plugins · Native</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 mb-2.5">
        {([
          { id: 'theme' as const, icon: Layout, label: 'Themes' },
          { id: 'plugin' as const, icon: Puzzle, label: 'Plugins' },
        ]).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFocus(tab.id)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[11px] font-semibold transition-all ${
              focus === tab.id
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-border/60 bg-background/70 text-muted-foreground hover:border-accent/25'
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-border/60 bg-background/80 p-3 mb-2.5">
        <p className="text-[11px] font-semibold text-primary mb-2">{panels.title}</p>
        <ul className="space-y-1.5">
          {panels.points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-1.5">
        {([
          { id: 'react' as const, icon: SiReact, label: 'React' },
          { id: 'php' as const, icon: SiPhp, label: 'PHP' },
        ]).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStack(tab.id)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[11px] font-medium transition-all ${
              stack === tab.id
                ? 'border-accent/40 bg-accent/10 text-accent'
                : 'border-border/60 bg-background/60 text-muted-foreground hover:border-accent/25'
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label} native
          </button>
        ))}
      </div>

      <p className="mt-2.5 text-[10px] text-muted-foreground leading-relaxed flex items-start gap-1.5">
        <FileCode2 className="h-3 w-3 text-accent mt-0.5 shrink-0" />
        {stack === 'react'
          ? 'Interactive WP admin & front blocks built in React.'
          : 'Server-side theme & plugin logic written in clean PHP.'}
      </p>
    </div>
  );
};

const TestingVisual = () => {
  const suites = [
    { id: 'unit', label: 'Unit', result: '12/12 passed' },
    { id: 'integration', label: 'Integration', result: '8/8 passed' },
    { id: 'e2e', label: 'E2E / Selenium', result: '6/6 passed' },
  ] as const;
  const [active, setActive] = useState<(typeof suites)[number]['id']>('unit');
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const run = () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    window.setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, 1100);
  };

  const current = suites.find((s) => s.id === active)!;

  return (
    <div className="relative rounded-lg border border-border/60 bg-[#0f1117] overflow-hidden p-3.5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-accent" />
          <span className="text-[11px] font-semibold text-white/80">Automated Suite</span>
        </div>
        <button
          type="button"
          onClick={run}
          className="inline-flex items-center gap-1 rounded-md border border-accent/30 bg-accent/15 px-2 py-1 text-[10px] font-semibold text-accent hover:bg-accent/25 transition-colors"
        >
          {running ? <RotateCcw className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
          {running ? 'Running' : 'Run'}
        </button>
      </div>

      <div className="space-y-1.5 mb-3">
        {suites.map((suite) => (
          <button
            key={suite.id}
            type="button"
            onClick={() => {
              setActive(suite.id);
              setDone(false);
            }}
            className={`w-full flex items-center justify-between rounded-lg border px-2.5 py-2 text-left transition-all ${
              active === suite.id
                ? 'border-accent/40 bg-accent/15'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25'
            }`}
          >
            <span className="text-[11px] text-white/75">{suite.label}</span>
            <span className="text-[10px] text-white/40 font-mono">
              {active === suite.id && done ? 'PASS' : 'idle'}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5">
        <p className="text-[10px] text-white/45 mb-1">Selected · {current.label}</p>
        <p className="text-[11px] font-medium text-white/80">
          {running ? 'Executing checks…' : done ? current.result : 'Click Run to simulate coverage'}
        </p>
        <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full bg-accent transition-all duration-1000 ${
              running ? 'w-2/3' : done ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

const PerformanceVisual = () => {
  const metrics = [
    { id: 'lcp', m: 'LCP', before: 62, after: 96 },
    { id: 'inp', m: 'INP', before: 58, after: 93 },
    { id: 'cls', m: 'CLS', before: 71, after: 99 },
  ] as const;
  const [optimized, setOptimized] = useState(true);
  const [seoOn, setSeoOn] = useState(true);

  return (
    <div className="relative rounded-lg border border-border/60 bg-gradient-to-br from-secondary via-background to-accent/5 overflow-hidden p-3.5">
      <div className="relative flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Rocket className="h-4 w-4 text-accent" />
          <span className="text-[11px] font-semibold text-primary">Speed & SEO</span>
        </div>
        <button
          type="button"
          onClick={() => setOptimized((v) => !v)}
          className={`text-[10px] px-2 py-1 rounded-lg border font-semibold transition-colors ${
            optimized
              ? 'border-accent/35 bg-accent/10 text-accent'
              : 'border-border/60 text-muted-foreground hover:border-accent/25'
          }`}
        >
          {optimized ? 'Optimized' : 'Before'}
        </button>
      </div>

      <div className="relative grid grid-cols-3 gap-2 mb-3">
        {metrics.map((item) => {
          const score = optimized ? item.after : item.before;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setOptimized((v) => !v)}
              className="rounded-lg border border-accent/25 bg-background/80 p-2 text-center hover:border-accent/50 transition-colors"
            >
              <div className="relative mx-auto mb-1 h-10 w-10">
                <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36" aria-hidden>
                  <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="3"
                    strokeDasharray={`${score} 100`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-[10px] font-bold text-accent">
                  {score}
                </span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{item.m}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setSeoOn((v) => !v)}
        className="relative w-full flex items-center gap-2 rounded-lg border border-border/60 bg-background/70 px-2.5 py-2 hover:border-accent/35 transition-colors"
      >
        <Search className="h-3.5 w-3.5 text-accent" />
        <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full bg-accent/70 transition-all duration-500 ${
              seoOn ? 'w-4/5' : 'w-1/3'
            }`}
          />
        </div>
        <span className="text-[10px] font-semibold text-accent flex items-center gap-1">
          <Gauge className="h-3 w-3" />
          RankMath {seoOn ? 'ON' : 'OFF'}
        </span>
      </button>
      <p className="mt-2 text-[10px] text-muted-foreground flex items-center gap-1">
        <MousePointerClick className="h-3 w-3 text-accent" />
        Toggle optimize / RankMath to compare
      </p>
    </div>
  );
};

const ServiceVisual = ({ type }: { type: string }) => {
  if (type === 'Web Development') return <WebDevVisual />;
  if (type === 'WordPress Solutions') return <WordPressVisual />;
  if (type === 'Testing & QA') return <TestingVisual />;
  return <PerformanceVisual />;
};

const iconMap = {
  Code: Code2,
  Globe,
  Shield: ShieldCheck,
  Rocket,
} as const;

const masonrySpan: Record<string, string> = {
  'Web Development': '',
  'WordPress Solutions': 'md:mt-8',
  'Testing & QA': 'md:-mt-4',
  'Performance & RankMath': 'md:mt-6',
};

export const ServicesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [expanded, setExpanded] = useState<string | null>(null);

  const services = data.services.map((item) => ({
    ...item,
    Icon: iconMap[item.icon as keyof typeof iconMap] ?? Code2,
  }));

  const marqueeItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-accent/[0.05] rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/5 w-64 h-64 bg-accent/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={headerRef}
          className={`text-center mb-10 sm:mb-12 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Briefcase size={14} className="text-accent" />
            <span className="text-[11px] sm:text-xs font-semibold text-accent tracking-[0.18em] uppercase">
              Services & Solutions
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-[-0.02em]">
            {data.servicesMeta?.title || 'What I Offer'}
          </h2>
          {data.servicesMeta?.subtitle && (
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {data.servicesMeta.subtitle}
            </p>
          )}
        </div>

        <div
          ref={contentRef}
          className={`columns-1 md:columns-2 gap-4 sm:gap-5 transition-all duration-700 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {services.map((service, index) => {
            const Icon = service.Icon;
            const isOpen = expanded === service.title;
            const features = Array.isArray(service.features) ? service.features : [];

            return (
              <article
                key={service.title}
                className={`mb-4 sm:mb-5 break-inside-avoid group relative rounded-lg border border-border/60 bg-background/80 p-4 sm:p-5 hover:border-accent/35 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500 overflow-hidden ${
                  masonrySpan[service.title] ?? ''
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-primary tracking-tight">
                        {service.title}
                      </h3>
                      {service.category && (
                        <span className="text-[10px] px-2 py-0.5 rounded-lg bg-accent/10 text-accent border border-accent/20">
                          {service.category}
                        </span>
                      )}
                    </div>
                    {service.subtitle && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{service.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="relative mb-4">
                  <ServiceVisual type={service.title} />
                </div>

                <p className="relative text-sm text-muted-foreground leading-relaxed mb-3">
                  {service.description}
                </p>

                {features.length > 0 && (
                  <div className="relative">
                    <ul className="flex flex-wrap gap-2">
                      {(isOpen ? features : features.slice(0, 3)).map((feat: string) => (
                        <li
                          key={feat}
                          className="inline-flex items-center gap-1.5 text-[11px] text-primary/75 px-2 py-1 rounded-lg bg-secondary/50 border border-border/50"
                        >
                          <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : service.title)}
                      className="mt-3 text-[11px] font-semibold text-accent hover:underline underline-offset-2"
                    >
                      {isOpen ? 'Show less' : 'Explore details'}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-14 sm:mt-16 relative">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-5">
          Technologies I Know
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-background to-transparent" />

          <div className="flex w-max animate-tech-marquee hover:[animation-play-state:paused]">
            {marqueeItems.map((tech, i) => {
              const Icon = tech.Icon;
              return (
                <div
                  key={`${tech.name}-${i}`}
                  className="mx-2 sm:mx-2.5 flex items-center gap-2.5 rounded-lg border border-border/70 bg-secondary/40 px-3.5 py-2.5 text-primary/80 transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
