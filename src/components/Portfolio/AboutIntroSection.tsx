import { ArrowUpRight, MapPin, Briefcase, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import personalData from '@/data/personal.json';

const RESUME_URL = personalData.resumeUrl;

const HOVER_FACTS = [
  { label: '100+ projects', sub: 'Delivered' },
  { label: 'O₂Nations', sub: 'Full stack' },
  { label: 'Flutter · DEPI', sub: 'In progress' },
];

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
    <section className="relative overflow-hidden bg-background pt-28 sm:pt-32 pb-14 sm:pb-20">
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-accent/[0.06] via-transparent to-accent/[0.03]"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 xl:gap-10 items-center">
          {/* Left copy */}
          <div className="order-2 lg:order-1 text-center lg:text-right max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent mb-3">
              About me
            </p>
            <h1 className="font-display text-[2rem] sm:text-3xl md:text-4xl xl:text-[2.75rem] font-bold tracking-[-0.03em] leading-[1.15] text-primary">
              A <span className="text-accent">creative</span>
              <br />
              developer
            </h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed lg:max-w-xs lg:ml-auto">
              Building products, SaaS, and software platforms with React, Angular, Laravel &amp;
              Flutter.
            </p>
            <div className="mt-5 flex flex-wrap justify-center lg:justify-end gap-2">
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

          {/* Center portrait — public/assets/avatar.png */}
          <div className="order-1 lg:order-2 relative mx-auto w-full max-w-[260px] sm:max-w-[300px] xl:max-w-[320px]">
            <div className="group relative aspect-[3/4] outline-none">
              <div className="absolute inset-0 overflow-hidden rounded-t-[2.75rem] rounded-br-[2.75rem] ring-1 ring-border/40 bg-transparent transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_60px_-28px_rgba(15,23,42,0.35)]">
                <img
                  src="/assets/avatar.png"
                  alt="Donia Alhosin"
                  width={640}
                  height={640}
                  decoding="async"
                  className="h-full w-full object-cover object-[center_8%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Hover reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-5 sm:p-6">
                  <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 mb-2">
                      <Sparkles size={11} className="text-accent" />
                      Quick facts
                    </p>
                    <div className="space-y-2">
                      {HOVER_FACTS.map((fact) => (
                        <div
                          key={fact.label}
                          className="flex items-baseline justify-between gap-3 border-b border-white/15 pb-1.5 last:border-0"
                        >
                          <span className="text-[13px] font-semibold text-white">{fact.label}</span>
                          <span className="text-[10px] uppercase tracking-wider text-white/55">
                            {fact.sub}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={goToContact}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-primary hover:bg-accent hover:text-white transition-colors"
                    >
                      Start a project
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 w-[7rem] h-[7rem] sm:w-[7.75rem] sm:h-[7.75rem] rounded-full bg-background pointer-events-none"
                aria-hidden
              />

              <button
                type="button"
                onClick={goToContact}
                aria-label="Let's talk — go to contact"
                className="absolute bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 w-[6.25rem] h-[6.25rem] sm:w-[7rem] sm:h-[7rem] rounded-full flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 z-10"
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
                <span className="relative z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-background border border-border/80 shadow-sm transition-transform duration-300 hover:scale-105 hover:border-accent/40">
                  <ArrowUpRight className="w-4 h-4 text-primary" strokeWidth={1.75} />
                </span>
              </button>
            </div>
          </div>

          {/* Right copy */}
          <div className="order-3 text-center lg:text-left max-w-md mx-auto lg:mx-0">
            <h2 className="font-display text-[2rem] sm:text-3xl md:text-4xl xl:text-[2.75rem] font-bold tracking-[-0.03em] leading-[1.15] text-primary">
              &amp; <span className="text-accent">digital</span>
              <br />
              designer
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] text-muted-foreground leading-relaxed lg:max-w-xs">
              I collaborate with brands globally to design and build impactful products that drive
              results and achieve business goals.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
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
