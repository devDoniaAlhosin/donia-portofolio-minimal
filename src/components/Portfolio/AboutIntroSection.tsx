import { ArrowUpRight, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import personalData from '@/data/personal.json';

const RESUME_URL = personalData.resumeUrl;

/** Small keys that fly out from behind the head on portrait hover */
const HOVER_FACTS = [
  {
    label: 'SaaS projects',
    sub: 'Shipped',
    pos: 'left-[-6%] top-[8%] -rotate-6',
    hide: 'translate-x-[70%] translate-y-[55%] scale-50 opacity-0',
    show: 'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100',
    delay: 'delay-0',
    tone: 'bg-accent text-white',
    subTone: 'text-white/75',
  },
  {
    label: 'CMS platforms',
    sub: 'Laravel',
    pos: 'right-[-8%] top-[4%] rotate-3',
    hide: '-translate-x-[65%] translate-y-[60%] scale-50 opacity-0',
    show: 'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100',
    delay: 'delay-75',
    tone: 'bg-sky-500 text-white',
    subTone: 'text-white/75',
  },
  {
    label: 'LMS systems',
    sub: 'Full build',
    pos: 'right-[-10%] top-[24%] rotate-6',
    hide: '-translate-x-[55%] -translate-y-[10%] scale-50 opacity-0',
    show: 'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100',
    delay: 'delay-150',
    tone: 'bg-emerald-500 text-white',
    subTone: 'text-white/80',
  },
] as const;

export const AboutIntroSection = () => {
  const navigate = useNavigate();

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = RESUME_URL;
    link.download = 'DoniaAlhosin_resume.pdf';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goToContact = () => navigate('/contact');

  return (
    <section className="relative overflow-x-clip overflow-y-visible bg-background pt-28 sm:pt-32 pb-10 sm:pb-12 lg:pb-0">
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-accent/[0.06] via-transparent to-accent/[0.03]"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Mobile */}
        <div className="lg:hidden">
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent mb-3 text-center">
            About me
          </p>
          <h1 className="font-display text-[1.85rem] sm:text-3xl font-bold tracking-[-0.03em] leading-[1.15] text-primary text-center text-balance">
            A <span className="text-accent">full stack</span> developer
            <br />
            with <span className="text-accent">UI</span> vision
          </h1>

          <div className="relative mx-auto mt-6 w-full max-w-[220px] sm:max-w-[260px]">
            <img
              src="/assets/avatar.png"
              alt="Donia Alhosin"
              width={640}
              height={853}
              decoding="async"
              className="relative z-0 w-full h-auto object-contain"
            />
            <button
              type="button"
              onClick={goToContact}
              aria-label="Let's talk — go to contact"
              className="absolute bottom-2 left-1 w-[4.75rem] h-[4.75rem] rounded-full flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 z-10"
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full animate-spin-slow text-primary"
                aria-hidden
              >
                <defs>
                  <path
                    id="about-talk-circle-mobile"
                    d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  style={{ fontSize: '8.8px', letterSpacing: '2.2px', fontWeight: 600 }}
                >
                  <textPath href="#about-talk-circle-mobile">
                    LETS TALK • LETS TALK • LETS TALK • LETS TALK •
                  </textPath>
                </text>
              </svg>
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border/80 shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
              </span>
            </button>
          </div>

          <p className="mt-5 text-sm text-muted-foreground leading-relaxed text-center max-w-md mx-auto">
            Frontend and backend for products, SaaS, and platforms — with a clear eye for UI/UX so
            what ships looks right and works well.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <MapPin size={12} className="text-accent" />
              Cairo, Egypt
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <Briefcase size={12} className="text-accent" />
              Available for work
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 max-w-sm mx-auto">
            {HOVER_FACTS.map((fact) => (
              <div
                key={fact.label}
                className={`rounded-lg px-2 py-2.5 text-center ${fact.tone}`}
              >
                <p className="text-[11px] sm:text-xs font-semibold leading-tight">
                  {fact.label}
                </p>
                <p className={`mt-0.5 text-[9px] uppercase tracking-wider ${fact.subTone}`}>
                  {fact.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={downloadResume}
              className="inline-flex items-center justify-center rounded-full border border-primary/80 bg-background px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              My Resume
            </button>
            <button
              type="button"
              onClick={goToContact}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-accent hover:underline underline-offset-4"
            >
              Let&apos;s talk
            </button>
          </div>
        </div>

        {/* Desktop: portrait sits middle, bottom flush with section → marquee line */}
        <div className="hidden lg:grid grid-cols-[1fr_minmax(300px,360px)_1fr] gap-6 xl:gap-10 items-end overflow-visible">
          <div className="text-right max-w-md ml-auto self-center pb-16">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent mb-3">
              About me
            </p>
            <h1 className="font-display text-4xl xl:text-[2.75rem] font-bold tracking-[-0.03em] leading-[1.15] text-primary">
              A <span className="text-accent">full stack</span>
              <br />
              developer
            </h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs ml-auto">
              Frontend and backend for products, SaaS, and software platforms — React, Angular,
              Laravel &amp; Flutter.
            </p>
            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <MapPin size={12} className="text-accent" />
                Cairo, Egypt
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                <Briefcase size={12} className="text-accent" />
                Available for work
              </span>
            </div>
          </div>

          <div className="group relative w-full max-w-[360px] justify-self-center -mb-px overflow-visible">
            {/* Small keys — start behind the head, fly out on hover */}
            {HOVER_FACTS.map((fact) => (
              <div
                key={fact.label}
                aria-hidden
                className={[
                  'pointer-events-none absolute z-[5] whitespace-nowrap rounded-md px-2.5 py-1.5',
                  'shadow-[0_10px_28px_-10px_rgba(15,23,42,0.35)]',
                  'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'group-hover:z-20',
                  fact.tone,
                  fact.pos,
                  fact.hide,
                  fact.show,
                  fact.delay,
                ].join(' ')}
              >
                <p className="text-[11px] font-semibold leading-none">{fact.label}</p>
                <p className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${fact.subTone}`}>
                  {fact.sub}
                </p>
              </div>
            ))}

            <img
              src="/assets/avatar.png"
              alt="Donia Alhosin"
              width={640}
              height={853}
              decoding="async"
              className="relative z-10 block w-full h-auto object-contain object-bottom select-none"
            />

            <button
              type="button"
              onClick={goToContact}
              aria-label="Let's talk — go to contact"
              className="absolute bottom-3 left-2 w-[6.5rem] h-[6.5rem] rounded-full flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 z-20"
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full animate-spin-slow text-primary"
                aria-hidden
              >
                <defs>
                  <path
                    id="about-talk-circle"
                    d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  style={{ fontSize: '8.8px', letterSpacing: '2.2px', fontWeight: 600 }}
                >
                  <textPath href="#about-talk-circle">
                    LETS TALK • LETS TALK • LETS TALK • LETS TALK •
                  </textPath>
                </text>
              </svg>
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border/80 shadow-sm transition-transform duration-300 hover:scale-105 hover:border-accent/40">
                <ArrowUpRight className="w-4 h-4 text-primary" strokeWidth={1.75} />
              </span>
            </button>
          </div>

          <div className="text-left max-w-md self-center pb-16">
            <h2 className="font-display text-4xl xl:text-[2.75rem] font-bold tracking-[-0.03em] leading-[1.15] text-primary">
              with <span className="text-accent">UI</span>
              <br />
              vision
            </h2>
            <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-xs">
              I shape the experience end to end — clear interfaces, solid UX decisions, and code that
              backs them up.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={downloadResume}
                className="inline-flex items-center justify-center rounded-full border border-primary/80 bg-background px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                My Resume
              </button>
              <button
                type="button"
                onClick={goToContact}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-accent hover:underline underline-offset-4"
              >
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
