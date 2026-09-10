import { useEffect, useMemo, useState } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import data from '@/data/skills_services.json';
import {
  Briefcase,
  CheckCircle2,
  Code2,
  Globe,
  Rocket,
  ShieldCheck,
  Terminal,
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
  SiFigma,
} from 'react-icons/si';

const TECH_STACK: { name: string; Icon: IconType }[] = [
  { name: 'Figma', Icon: SiFigma },
  { name: 'React', Icon: SiReact },
  { name: 'Angular', Icon: SiAngular },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Tailwind', Icon: SiTailwindcss },
  { name: 'Laravel', Icon: SiLaravel },
  { name: 'PHP', Icon: SiPhp },
  { name: 'WordPress', Icon: SiWordpress },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'Selenium', Icon: SiSelenium },
  { name: 'Git', Icon: SiGit },
  { name: 'JavaScript', Icon: SiJavascript },
];

const iconMap = {
  Code: Code2,
  Globe,
  Shield: ShieldCheck,
  Rocket,
} as const;

const cmdSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const ServicesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const services = useMemo(
    () =>
      data.services.map((item) => ({
        ...item,
        Icon: iconMap[item.icon as keyof typeof iconMap] ?? Code2,
        cmd: cmdSlug(item.title),
      })),
    []
  );

  const [activeCmd, setActiveCmd] = useState(services[0]?.cmd ?? '');
  const [typed, setTyped] = useState('');
  const [showOutput, setShowOutput] = useState(true);

  const active = services.find((s) => s.cmd === activeCmd) ?? services[0];
  const fullCommand = active ? `donia offer --service ${active.cmd}` : '';

  useEffect(() => {
    if (!fullCommand) return;
    setShowOutput(false);
    setTyped('');
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(fullCommand.slice(0, i));
      if (i >= fullCommand.length) {
        window.clearInterval(timer);
        window.setTimeout(() => setShowOutput(true), 180);
      }
    }, 18);
    return () => window.clearInterval(timer);
  }, [fullCommand]);

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
          className={`mb-8 sm:mb-10 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Briefcase size={14} className="text-accent" />
            <span className="text-[11px] sm:text-xs font-semibold text-accent tracking-[0.18em] uppercase">
              Services & Solutions
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-[-0.02em]">
            {data.servicesMeta?.title || 'What I Offer'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            {data.servicesMeta?.subtitle ||
              'Designer · Frontend · Full stack — products, SaaS, and software platforms.'}
          </p>
        </div>

        <div
          ref={contentRef}
          className={`transition-all duration-700 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="rounded-lg border border-border/70 overflow-hidden shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)] bg-[#0c0e12]">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 px-3 sm:px-4 py-2.5 bg-white/[0.03]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-2 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-white/40">
                <Terminal size={12} />
                donia@portfolio — zsh
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              {/* Command picker */}
              <div className="border-b lg:border-b-0 lg:border-r border-white/10 p-4 sm:p-5">
                <p className="font-mono text-[11px] text-white/35 mb-3">
                  <span className="text-emerald-400/90">$</span> ls ./services
                </p>
                <div className="space-y-1.5">
                  {services.map((service, index) => {
                    const selected = service.cmd === activeCmd;
                    const Icon = service.Icon;
                    return (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => setActiveCmd(service.cmd)}
                        className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                          selected
                            ? 'border-accent/40 bg-accent/15 text-white'
                            : 'border-white/10 bg-white/[0.02] text-white/65 hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <span className="font-mono text-[10px] text-white/30 w-4 tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <Icon
                          size={14}
                          className={selected ? 'text-accent' : 'text-white/40'}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[12px] sm:text-[13px] font-semibold truncate">
                            {service.title}
                          </span>
                          <span className="block text-[10px] font-mono text-white/35 truncate">
                            ./{service.cmd}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Terminal output */}
              <div className="p-4 sm:p-5 font-mono min-h-[320px]">
                <p className="text-[11px] text-white/35 mb-3">
                  # designer · frontend · fullstack
                </p>

                <p className="text-[12px] sm:text-[13px] text-white/80 mb-4 leading-relaxed">
                  <span className="text-emerald-400/90">$</span>{' '}
                  <span className="text-white/90">{typed}</span>
                  <span className="inline-block w-2 h-4 ml-0.5 align-middle bg-accent/80 animate-pulse" />
                </p>

                {active && showOutput && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-1 duration-300">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-accent text-[11px] font-semibold uppercase tracking-wider">
                          {active.category}
                        </span>
                        <span className="text-white/25">·</span>
                        <span className="text-[11px] text-white/45">{active.subtitle}</span>
                      </div>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-white leading-snug mb-2">
                        {active.title}
                      </p>
                      <p className="text-[12px] text-white/55 leading-relaxed">
                        {active.description}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-white/35 mb-2">
                        <span className="text-sky-300/80">→</span> features
                      </p>
                      <ul className="space-y-1.5">
                        {(active.features || []).map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2 text-[12px] text-white/75"
                          >
                            <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-[11px] text-emerald-400/80 pt-1">
                      ✓ service ready · status: available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-muted-foreground font-mono">
            Select a service to run it in the terminal.
          </p>
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
