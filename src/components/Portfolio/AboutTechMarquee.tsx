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
  { name: 'Figma', Icon: SiFigma },
];

export const AboutTechMarquee = () => {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="relative overflow-hidden py-8 sm:py-10 border-y border-border/50 bg-secondary/20">
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-tech-marquee hover:[animation-play-state:paused]">
        {items.map((tech, i) => {
          const Icon = tech.Icon;
          return (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-5 sm:px-7 text-primary/70"
            >
              <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-accent/80" aria-hidden />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
