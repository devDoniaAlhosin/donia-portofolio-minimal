import { Sparkles } from 'lucide-react';

const awards = [
  {
    title: 'ISTQB® Certified Tester Foundation Level v4 (CTFL4)',
    date: '2026',
  },
  {
    title: 'Research Paper — Superpower Glass for Autistic Kids',
    date: '2023',
  },
  {
    title: 'IUGRC Conference Paper — Autism GUI Solution',
    date: '2023',
  },
  {
    title: 'BSc with Honor — Communications & Electronics',
    date: '2023',
  },
  {
    title: 'eCommerce Project Excellence — 100%',
    date: '2024',
  },
];

export const AboutAwardsSection = () => (
  <section className="relative overflow-hidden py-14 sm:py-16 bg-background">
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 lg:gap-14 items-start">
        <div>
          <div className="inline-flex items-center gap-2 mb-2.5">
            <Sparkles size={14} className="text-accent" strokeWidth={2.25} />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
              Awards
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-[-0.02em] leading-[1.15]">
            Awards &amp;
            <br />
            Recognition
          </h2>
        </div>

        <ul className="border-t border-border/70">
          {awards.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 border-b border-border/70 py-3 sm:py-3.5"
            >
              <span className="text-[14px] sm:text-[15px] font-medium text-primary leading-snug min-w-0">
                {item.title}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground tabular-nums shrink-0">
                {item.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
