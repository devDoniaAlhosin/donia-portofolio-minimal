import { useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

const HEADLINE = "I'm Donia Alhosin, a full stack developer with 100+ projects delivered";

const BODY =
  'Strong focus on building high quality & impactful digital experiences. I work with React & Angular frontends and Laravel & PHP backends to help teams ship top-notch products.';

const KEYWORDS = ['React', 'Angular', 'Laravel', 'PHP', '100+ Projects'];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  const bodyWords = useMemo(() => BODY.split(' '), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const narrow = window.innerWidth < 640;
      setIsNarrow(narrow);
      // Mobile viewports are short — start reveal earlier so copy isn't washed out
      const start = viewH * (narrow ? 0.96 : 0.88);
      const end = viewH * (narrow ? 0.42 : 0.28);
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
      setInView(rect.top < viewH * 0.95 && rect.bottom > viewH * 0.06);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-16 sm:py-28 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,36rem)] h-[min(50vh,22rem)] rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <div
          className={`inline-flex items-center justify-center gap-2 mb-6 sm:mb-9 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Sparkles size={14} className="text-accent" strokeWidth={2.25} />
          <span className="text-[11px] sm:text-xs font-semibold text-accent tracking-[0.18em] uppercase">
            About Me
          </span>
        </div>

        <h2
          className={`font-display text-[1.35rem] sm:text-2xl md:text-[1.85rem] lg:text-[2.1rem] font-medium leading-[1.4] tracking-[-0.02em] text-primary text-balance transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '80ms' }}
        >
          {HEADLINE}
        </h2>

        <p className="mt-6 sm:mt-8 font-display text-[0.95rem] sm:text-lg md:text-xl font-normal leading-[1.7] tracking-[-0.01em] text-balance max-w-2xl mx-auto">
          {bodyWords.map((word, index) => {
            const start = index / bodyWords.length;
            const end = (index + 1) / bodyWords.length;
            const local = Math.min(1, Math.max(0, (progress - start) / (end - start || 1)));
            const base = isNarrow ? 0.38 : 0.18;
            const opacity = base + local * (1 - base);

            return (
              <span
                key={`${word}-${index}`}
                className="inline transition-[opacity,color] duration-300 ease-out"
                style={{
                  opacity,
                  color:
                    local > 0.8
                      ? 'hsl(var(--primary) / 0.88)'
                      : local > 0.35
                        ? 'hsl(var(--primary) / 0.55)'
                        : 'hsl(var(--muted-foreground) / 0.45)',
                }}
              >
                {word}
                {index < bodyWords.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </p>

        <div
          className={`mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 transition-all duration-700 ease-out ${
            progress > (isNarrow ? 0.35 : 0.55)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {KEYWORDS.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase text-primary/70 border border-border/70 bg-background rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
