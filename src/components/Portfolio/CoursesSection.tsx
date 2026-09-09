import { useMemo, useState } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import coursesData from '@/data/courses.json';
import {
  BookOpen,
  Calendar,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
  GraduationCap,
  Zap,
  ExternalLink,
  CheckCircle2,
  BadgeCheck,
  Code,
} from 'lucide-react';

type CourseCategory = 'All' | 'Diploma' | 'Certification' | 'Degree';

const TABS: CourseCategory[] = ['All', 'Diploma', 'Certification', 'Degree'];
const PREVIEW_SKILLS = 2;

const iconMap = {
  book: BookOpen,
  zap: Zap,
  award: Award,
  graduation: GraduationCap,
  star: Star,
} as const;

const highlights = [
  {
    label: 'ISTQB CTFL4',
    value: 'Certified',
    headline: 'Certified Tester Foundation Level v4',
    description: 'Formal QA foundation — test design, execution, and defect reporting.',
    tags: ['Manual QA', 'Selenium', 'ISTQB'],
    icon: Award,
  },
  {
    label: 'Diplomas',
    value: '3',
    headline: 'Full stack & front-end diplomas',
    description: 'ITI PHP full stack, AMIT front-end, and DEPI software testing.',
    tags: ['Laravel', 'Angular', 'React'],
    icon: GraduationCap,
  },
  {
    label: 'Degree',
    value: 'BSc',
    headline: 'Engineering foundation',
    description: 'Communications & Electronics — GPA 3.41 with honors.',
    tags: ['Engineering', 'Honors'],
    icon: BookOpen,
  },
];

export const CoursesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const [tab, setTab] = useState<CourseCategory>('All');
  const [activeStat, setActiveStat] = useState(0);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const courses = useMemo(
    () =>
      coursesData.courses.map((course) => ({
        ...course,
        Icon: iconMap[course.icon as keyof typeof iconMap] ?? BookOpen,
        id: `${course.name}-${course.period}`,
      })),
    []
  );

  const filtered = useMemo(
    () => (tab === 'All' ? courses : courses.filter((c) => c.category === tab)),
    [courses, tab]
  );

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

  const certifiedCount = courses.filter((c) => Boolean(c.certificateLink)).length;
  const ActiveIcon = highlights[activeStat].icon;

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <section id="courses" className="py-12 sm:py-16 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-1/4 w-56 h-56 bg-accent/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={headerRef}
          className={`mb-7 sm:mb-8 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-2.5">
            <GraduationCap size={13} className="text-accent" />
            <span className="text-[11px] font-semibold text-accent tracking-[0.16em] uppercase">
              Courses & Training
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary tracking-[-0.02em]">
            Credentials & Learning
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-snug">
            Diplomas, certifications, and degree — organized for quick hiring review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px] gap-5 lg:gap-6 items-start">
          {/* Main list */}
          <div
            ref={contentRef}
            className={`min-w-0 transition-all duration-700 ease-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Tabs */}
            <div
              role="tablist"
              aria-label="Credential type"
              className="mb-4 flex flex-wrap gap-1 p-1 rounded-lg border border-border/70 bg-secondary/40"
            >
              {TABS.map((item) => {
                const active = tab === item;
                return (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(item)}
                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors inline-flex items-center gap-1.5 ${
                      active
                        ? 'bg-background text-accent border border-accent/30 shadow-sm'
                        : 'text-muted-foreground hover:text-primary border border-transparent'
                    }`}
                  >
                    {item}
                    <span className={`tabular-nums text-[10px] ${active ? 'text-accent/80' : 'text-muted-foreground/70'}`}>
                      {tabCounts[item]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2.5">
              {filtered.map((course) => {
                const Icon = course.Icon;
                const isSelected = selectedId === course.id;
                const isExpanded = expandedIds.includes(course.id);
                const hasMore = course.skillsGained.length > PREVIEW_SKILLS;
                const visibleSkills = isExpanded
                  ? course.skillsGained
                  : course.skillsGained.slice(0, PREVIEW_SKILLS);

                return (
                  <article
                    key={course.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedId(course.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedId(course.id);
                      }
                    }}
                    className={`rounded-lg border bg-background p-3 sm:p-3.5 text-left transition-colors ${
                      isSelected
                        ? 'border-accent/40 bg-accent/[0.03]'
                        : 'border-border/70 hover:border-accent/30'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className="inline-flex items-center rounded-lg border border-accent/25 bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                        {course.category}
                      </span>
                      <span className="inline-flex items-center rounded-lg border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-primary/70">
                        {course.level}
                      </span>
                      {course.certificateLink && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <BadgeCheck size={11} />
                          Verifiable
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-2.5 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-secondary/60 border border-border/60 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden p-1">
                        {'logo' in course && course.logo ? (
                          <img
                            src={course.logo as string}
                            alt={`${course.provider} logo`}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <Icon className="w-4 h-4 text-accent" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[15px] font-bold text-primary tracking-tight leading-tight">
                          {course.name}
                        </h3>
                        <p className="text-[13px] font-semibold text-accent leading-snug mt-0.5">
                          {course.provider}
                        </p>
                        {course.focus && (
                          <p className="mt-1 text-[11px] font-medium text-primary/65 leading-snug">
                            {course.focus}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground mb-2">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={11} className="text-accent/80" />
                        {course.period}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {course.duration}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Award size={11} />
                        {course.certificate}
                      </span>
                    </div>

                    {course.certificateLink && (
                      <a
                        href={course.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 mb-2.5 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-[11px] font-semibold text-accent hover:bg-accent/15 transition-colors"
                      >
                        <Award size={12} />
                        View certificate
                        <ExternalLink size={11} />
                      </a>
                    )}

                    <div className="border-t border-border/50 pt-2">
                      <h4 className="font-semibold text-primary flex items-center gap-1.5 text-[12px] mb-1.5">
                        <Star size={12} className="text-accent" />
                        Skills gained
                      </h4>
                      <ul className="space-y-1">
                        {visibleSkills.map((skill) => (
                          <li
                            key={skill}
                            className="text-muted-foreground flex items-start gap-2 text-[12px] sm:text-[13px]"
                          >
                            <CheckCircle2 className="mt-0.5 h-3 w-3 text-accent shrink-0" />
                            <span className="leading-snug">{skill}</span>
                          </li>
                        ))}
                      </ul>
                      {hasMore && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(course.id);
                          }}
                          className="mt-2 inline-flex items-center gap-0.5 text-[11px] font-semibold text-accent hover:underline underline-offset-2"
                        >
                          {isExpanded ? (
                            <>
                              Show less <ChevronUp size={12} />
                            </>
                          ) : (
                            <>
                              Show more ({course.skillsGained.length - PREVIEW_SKILLS}){' '}
                              <ChevronDown size={12} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}

              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground py-8 text-center">No items in this tab.</p>
              )}
            </div>
          </div>

          {/* News-style sidebar */}
          <aside className="lg:sticky lg:top-24 order-first lg:order-last space-y-3">
            <div className="rounded-lg border border-border/70 bg-background overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-border/60 bg-secondary/40">
                <Code size={12} className="text-accent" />
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Learning at a glance
                </h3>
              </div>

              <div className="p-2 space-y-1.5">
                {highlights.map((item, index) => {
                  const ItemIcon = item.icon;
                  const isActive = activeStat === index;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActiveStat(index)}
                      className={`w-full text-left rounded-lg border px-2.5 py-2 transition-colors ${
                        isActive
                          ? 'border-accent/40 bg-accent/[0.08]'
                          : 'border-transparent hover:border-border/70 hover:bg-secondary/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                            {item.label}
                          </p>
                          <p className="text-base font-bold text-primary leading-tight mt-0.5">
                            {item.value}
                          </p>
                        </div>
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive ? 'bg-accent/20' : 'bg-accent/10'
                          }`}
                        >
                          <ItemIcon size={14} className="text-accent" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mx-2 mb-2 rounded-lg border border-border/60 bg-secondary/30 px-2.5 py-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <ActiveIcon size={12} className="text-accent" />
                  <p className="text-[12px] font-semibold text-primary leading-snug">
                    {highlights[activeStat].headline}
                  </p>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug mb-2">
                  {highlights[activeStat].description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {highlights[activeStat].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 text-[10px] font-medium rounded-lg bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border/70 bg-background p-3 space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                For recruiters
              </p>
              <ul className="space-y-1.5 text-[12px] text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-primary">{certifiedCount} certificates</span> ready to verify
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>
                    Path: <span className="font-semibold text-primary">Front-end → Full stack → QA</span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>
                    BSc with <span className="font-semibold text-primary">honors</span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
