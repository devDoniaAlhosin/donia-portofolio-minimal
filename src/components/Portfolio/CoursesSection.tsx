import { useMemo, useState } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import coursesData from '@/data/courses.json';
import {
  BookOpen,
  Award,
  Star,
  GraduationCap,
  Zap,
  ExternalLink,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';

type CourseCategory = 'All' | 'Diploma' | 'Certification' | 'Degree';

const TABS: CourseCategory[] = ['All', 'Diploma', 'Certification', 'Degree'];

const iconMap = {
  book: BookOpen,
  zap: Zap,
  award: Award,
  graduation: GraduationCap,
  star: Star,
} as const;

const PATH = ['Front-end', 'Full stack', 'QA', 'Flutter'] as const;

export const CoursesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const [tab, setTab] = useState<CourseCategory>('All');
  const [activeId, setActiveId] = useState<string | null>(null);

  const courses = useMemo(
    () =>
      coursesData.courses.map((course) => ({
        ...course,
        Icon: iconMap[course.icon as keyof typeof iconMap] ?? BookOpen,
        id: `${course.name}-${course.period}`,
      })),
    []
  );

  const filtered = useMemo(() => {
    const list = tab === 'All' ? courses : courses.filter((c) => c.category === tab);
    return [...list].sort((a, b) => Number(b.year) - Number(a.year));
  }, [courses, tab]);

  const tabCounts = useMemo(() => {
    const counts: Record<CourseCategory, number> = {
      All: courses.length,
      Diploma: 0,
      Certification: 0,
      Degree: 0,
    };
    courses.forEach((c) => {
      counts[c.category as CourseCategory] += 1;
    });
    return counts;
  }, [courses]);

  const active = filtered.find((c) => c.id === activeId) ?? filtered[0] ?? null;
  const certifiedCount = courses.filter((c) => Boolean(c.certificateLink)).length;

  return (
    <section id="courses" className="py-14 sm:py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(165deg, hsl(var(--accent) / 0.10) 0%, hsl(var(--background)) 42%, hsl(var(--accent) / 0.06) 72%, hsl(var(--background)) 100%)',
        }}
        aria-hidden
      />
      <div
        className="absolute -top-24 right-[-10%] w-[28rem] h-[28rem] rounded-full bg-accent/[0.08] blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-[-8%] w-[22rem] h-[22rem] rounded-full bg-accent/[0.05] blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={headerRef}
          className={`mb-8 sm:mb-10 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-2.5">
                <GraduationCap size={13} className="text-accent" />
                <span className="text-[11px] font-semibold text-accent tracking-[0.16em] uppercase">
                  Courses & Training
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-[-0.02em]">
                Credentials & Learning
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-lg leading-relaxed">
                A clear learning path from engineering foundations to full stack and QA — built for
                hiring review.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {PATH.map((step, i) => (
                <div key={step} className="flex items-center gap-2 sm:gap-3">
                  <span className="rounded-lg border border-accent/25 bg-accent/10 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-accent">
                    {step}
                  </span>
                  {i < PATH.length - 1 && (
                    <ArrowRight size={14} className="text-muted-foreground/50 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-muted-foreground">
            <span>
              <span className="font-bold text-primary tabular-nums">{courses.length}</span> credentials
            </span>
            <span>
              <span className="font-bold text-primary tabular-nums">{certifiedCount}</span> verifiable
              certificates
            </span>
            <span>
              Path ends in <span className="font-semibold text-primary">ISTQB CTFL4</span>
            </span>
          </div>
        </div>

        <div
          ref={contentRef}
          className={`transition-all duration-700 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div
            role="tablist"
            aria-label="Credential type"
            className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          >
            {TABS.map((item) => {
              const selected = tab === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setTab(item);
                    setActiveId(null);
                  }}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background/80 text-muted-foreground border-border/70 hover:text-primary hover:border-border'
                  }`}
                >
                  {item}
                  <span className={`ml-1.5 tabular-nums ${selected ? 'opacity-80' : 'opacity-60'}`}>
                    {tabCounts[item]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] gap-8 lg:gap-10 items-start">
            {/* Journey timeline */}
            <ol className="relative space-y-0">
              <div
                className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/50 via-border to-transparent"
                aria-hidden
              />

              {filtered.map((course, index) => {
                const Icon = course.Icon;
                const isActive = (active?.id ?? filtered[0]?.id) === course.id;
                const isLast = index === filtered.length - 1;

                return (
                  <li key={course.id} className={`relative pl-12 sm:pl-14 ${isLast ? '' : 'pb-6'}`}>
                    <span
                      className={`absolute left-1.5 sm:left-2.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-background transition-colors ${
                        isActive
                          ? 'border-accent text-accent'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      <Icon size={13} />
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveId(course.id)}
                      className={`w-full text-left rounded-lg border px-4 py-3.5 transition-all duration-300 ${
                        isActive
                          ? 'border-accent/35 bg-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)]'
                          : 'border-border/60 bg-background/70 hover:border-border hover:bg-white/80'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold tabular-nums text-accent">
                          {course.year}
                        </span>
                        <span className="rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {course.category}
                        </span>
                        {course.certificateLink && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-accent">
                            <BadgeCheck size={11} />
                            Verifiable
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-3">
                        {'logo' in course && course.logo ? (
                          <div className="w-9 h-9 rounded-lg border border-border/60 bg-secondary/40 flex items-center justify-center shrink-0 overflow-hidden p-1">
                            <img
                              src={course.logo as string}
                              alt=""
                              className="max-h-full max-w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        ) : null}
                        <div className="min-w-0">
                          <h3 className="text-[14px] sm:text-[15px] font-bold text-primary tracking-tight leading-snug">
                            {course.name}
                          </h3>
                          <p className="mt-0.5 text-[12px] font-semibold text-accent">
                            {course.provider}
                          </p>
                          {course.focus && (
                            <p className="mt-1.5 text-[11px] text-muted-foreground leading-snug">
                              {course.focus}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}

              {filtered.length === 0 && (
                <p className="pl-12 text-sm text-muted-foreground py-8">No items in this filter.</p>
              )}
            </ol>

            {/* Detail panel — not a “glance” sidebar clone */}
            {active && (
              <aside className="lg:sticky lg:top-24 rounded-lg border border-border/70 bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]">
                <div className="px-5 py-4 border-b border-border/60 bg-gradient-to-r from-accent/[0.08] to-transparent">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-1">
                    Selected credential
                  </p>
                  <h3 className="font-display text-lg font-bold text-primary leading-snug tracking-tight">
                    {active.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-semibold text-accent">{active.provider}</p>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-lg border border-border/70 px-2 py-1 text-muted-foreground">
                      {active.period}
                    </span>
                    <span className="rounded-lg border border-border/70 px-2 py-1 text-muted-foreground">
                      {active.duration}
                    </span>
                    <span className="rounded-lg border border-border/70 px-2 py-1 text-muted-foreground">
                      {active.level}
                    </span>
                  </div>

                  {active.outcome && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{active.outcome}</p>
                  )}

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Skills gained
                    </p>
                    <ul className="space-y-1.5">
                      {active.skillsGained.slice(0, 4).map((skill) => (
                        <li
                          key={skill}
                          className="text-[12px] text-primary/80 leading-snug flex gap-2"
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {active.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {active.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-lg bg-accent/10 text-accent border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {active.certificateLink && (
                    <a
                      href={active.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/80 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Award size={13} />
                      View certificate
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
