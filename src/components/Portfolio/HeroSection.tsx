import { useRef, useState, useCallback, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Code2 } from 'lucide-react';
import personalData from '@/data/personal.json';

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/donia-alhosin-756a3b1ab/' },
  { name: 'GitHub', href: 'https://github.com/devDoniaAlhosin' },
  { name: 'Email', href: `mailto:${personalData.email}` },
  { name: 'CV', href: personalData.resumeUrl, download: true },
];

export const HeroSection = () => {
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const animateHeat = useCallback(() => {
    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) * 0.07;
    current.y += (target.y - current.y) * 0.07;

    if (heatRef.current) {
      heatRef.current.style.setProperty('--heat-x', `${current.x}%`);
      heatRef.current.style.setProperty('--heat-y', `${current.y}%`);
    }

    if (codeRef.current) {
      const dx = (current.x - 50) / 50;
      const dy = (current.y - 50) / 50;
      codeRef.current.style.transform = `translate3d(${dx * 10}px, ${dy * 6}px, 0) scale(${hovered ? 1.03 : 1})`;
    }

    const settled =
      Math.abs(target.x - current.x) < 0.04 && Math.abs(target.y - current.y) < 0.04;

    if (!settled) {
      rafRef.current = requestAnimationFrame(animateHeat);
    } else {
      rafRef.current = null;
    }
  }, [hovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };

    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(animateHeat);
    }
  };

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCv = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = personalData.resumeUrl;
    link.download = 'DoniaAlhosin-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const enter = (delay: string) =>
    [
      'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
      entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
      delay,
    ].join(' ');

  return (
    <section id="home" className="relative w-full bg-background px-2 pt-2 sm:px-2.5 sm:pt-2.5 md:px-3 md:pt-3 pb-2 sm:pb-2.5 md:pb-3">
      <div
        ref={panelRef}
        className="group/hero relative min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-1.25rem)] md:min-h-[calc(100vh-1.5rem)] w-full overflow-hidden flex items-center rounded-lg bg-[#0b0c10] border border-white/15 shadow-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
          if (codeRef.current) {
            codeRef.current.style.transform = 'translate3d(0,0,0) scale(1)';
          }
        }}
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, #0b0c10 0%, #12141c 45%, #0d0f16 100%)',
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.055] transition-opacity duration-700"
            style={{
              opacity: hovered ? 0.08 : 0.055,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
            }}
          />

          <div
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: hovered ? 0.35 : 0,
              background: `
                radial-gradient(ellipse 80% 60% at 20% 30%, hsl(var(--accent) / 0.2) 0%, transparent 55%),
                radial-gradient(ellipse 70% 55% at 85% 70%, hsl(280 85% 50% / 0.14) 0%, transparent 50%)
              `,
            }}
          />

          {/* Heat point + core spark */}
          <div
            ref={heatRef}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: hovered ? 1 : 0,
              ['--heat-x' as string]: '50%',
              ['--heat-y' as string]: '50%',
              background: `
                radial-gradient(
                  520px circle at var(--heat-x) var(--heat-y),
                  hsl(var(--accent) / 0.22) 0%,
                  hsl(280 80% 55% / 0.1) 35%,
                  transparent 65%
                )
              `,
            }}
          />

          <div
            className="absolute top-[15%] left-[15%] h-80 w-80 bg-accent/10 blur-[120px] transition-opacity duration-700 ease-out"
            style={{ opacity: hovered ? 0.55 : 0.28 }}
          />
          <div
            className="absolute bottom-[10%] right-[12%] h-96 w-96 bg-violet-600/10 blur-[130px] transition-opacity duration-700 ease-out"
            style={{ opacity: hovered ? 0.5 : 0.2 }}
          />

          <div
            ref={codeRef}
            className={[
              'absolute top-[18%] right-[6%] sm:right-[10%] md:right-[12%]',
              'select-none font-display font-extrabold leading-none will-change-transform',
              'text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[13rem]',
              'transition-[color,text-shadow] duration-500 ease-out',
            ].join(' ')}
            style={{
              color: hovered ? 'hsl(var(--accent) / 0.28)' : 'hsl(var(--accent) / 0.16)',
              textShadow: hovered
                ? '0 0 50px hsl(var(--accent) / 0.25)'
                : 'none',
            }}
            aria-hidden
          >
            {'<>'}
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-14">
          <div className={enter('delay-0')}>
            <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-accent/60 animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              <p className="flex items-center gap-2 text-sm sm:text-[15px] font-medium text-white/80">
                <Code2 size={15} className="text-accent" aria-hidden />
                Hey! It&apos;s me {personalData.name.split(' ')[0]}.
              </p>
              <span className="hidden sm:inline text-white/25">·</span>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-accent/90">
                Full Stack Developer
              </span>
            </div>
          </div>

          <h1
            className={`mt-6 sm:mt-8 max-w-4xl font-display text-[1.7rem] sm:text-5xl md:text-6xl lg:text-[4.35rem] font-extrabold tracking-[-0.035em] leading-[1.1] sm:leading-[1.05] text-white ${enter('delay-100')}`}
          >
            <span className="block text-white/90">
              Experiences that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-fuchsia-300 to-accent">
                convert
              </span>
              .
            </span>
            <span className="block mt-1 sm:mt-1.5 text-white/90">
              Products that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-accent to-fuchsia-200">
                stick
              </span>
              .
            </span>
            <span className="block mt-1 sm:mt-1.5 text-white/90">
              Full stack that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-fuchsia-200 to-accent">
                delivers
              </span>
              .
            </span>
          </h1>

          <div className={`mt-5 sm:mt-6 flex flex-wrap items-center gap-2 ${enter('delay-[150ms]')}`}>
            {['Full Stack', 'React', 'Angular', 'Laravel', 'PHP'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase text-white/75 border border-white/15 bg-white/[0.04] rounded-lg backdrop-blur-sm transition-colors duration-300 group-hover/hero:border-accent/30 group-hover/hero:text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className={`mt-8 sm:mt-10 md:mt-12 ${enter('delay-200')}`}>
            <p className="text-sm sm:text-[15px] leading-relaxed text-white/55 max-w-md md:ml-auto md:text-right">
              From first impression to final conversion — React &amp; Angular fronts, Laravel &amp; PHP backends,
              built to grow brands.
            </p>
          </div>

          <div
            className={`mt-10 sm:mt-12 md:mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 ${enter('delay-300')}`}
          >
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-7">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  {link.download ? (
                    <button
                      type="button"
                      onClick={handleCv}
                      className="group/link relative inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors duration-300 hover:text-accent"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={13}
                        className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover/link:w-full" />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group/link relative inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors duration-300 hover:text-accent"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={13}
                        className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover/link:w-full" />
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={scrollToAbout}
              className="group/cta self-start sm:self-auto inline-flex items-center justify-center gap-2 h-11 px-7 rounded-lg border border-white/80 text-sm font-medium text-white bg-transparent transition-all duration-300 hover:bg-white hover:text-[#0b0c10] hover:border-white active:scale-[0.98]"
            >
              Know me better
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
