import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Portfolio/Footer';
import { BackToTop } from '@/components/Portfolio/BackToTop';
import { WhatsAppButton } from '@/components/Portfolio/WhatsAppButton';
import projectsData from '@/data/projects.json';
import {
  Project,
  getCategoryLabel,
  getProjectLinks,
  getProjectSlug,
  inferServiceCategory,
  getServiceCategoryLabel,
} from '@/types/project';
import {
  Calendar,
  Users,
  Globe,
  Github,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Target,
  TriangleAlert,
  BrainCircuit,
  Workflow,
  BadgeCheck,
  ArrowRight,
  Link2,
  Plus,
  LayoutList,
  X as CloseIcon,
  Home,
} from 'lucide-react';

type ProcessSection = {
  title: string;
  desc: string;
  points?: string[];
};

const LMS_PROCESS: ProcessSection[] = [
  {
    title: 'Public Site & Course Catalog',
    desc: 'Marketing homepage, mastery programs, and course discovery that convert visitors into learners.',
    points: [
      'Built conversion-focused public pages for programs, courses, and brand positioning.',
      'Structured catalog browsing so learners can find and enroll in the right track.',
      'Connected public CTAs to enrollment and payment flows.',
    ],
  },
  {
    title: 'Course & Lesson Engine',
    desc: 'Full LMS content model for courses, lessons, and learning paths with controlled delivery.',
    points: [
      'Modeled courses, modules, and lessons for flexible curriculum updates.',
      'Delivered sequential learning with clear progress through each lesson.',
      'Kept content editable through CMS without code changes.',
    ],
  },
  {
    title: 'Student Management',
    desc: 'Enrollment, profiles, and role-based access for learners across the platform.',
    points: [
      'Managed student accounts, enrollments, and access rules by role.',
      'Separated learner experience from admin operations cleanly.',
      'Tracked who is enrolled in which program or course at any time.',
    ],
  },
  {
    title: 'Tasks, Quizzes & Progress',
    desc: 'Assignments, assessments, and progress tracking that keep learning measurable.',
    points: [
      'Built task and assignment workflows for practical coursework.',
      'Added quizzes and assessment tracking with clear completion states.',
      'Exposed progress on the learner dashboard so students know what’s next.',
    ],
  },
  {
    title: 'Payments & Checkout',
    desc: 'Fawaterak-powered payments with reliable status handling for course purchases.',
    points: [
      'Integrated Fawaterak for course and program checkout.',
      'Handled success, failure, and pending payment states safely.',
      'Unlocked course access only after confirmed payment.',
    ],
  },
  {
    title: 'Admin CMS & Dashboards',
    desc: 'Admin control panel for content, students, assessments, and platform operations.',
    points: [
      'Delivered admin dashboard for courses, lessons, users, and enrollments.',
      'Enabled CMS-driven updates for pages and learning content.',
      'Gave operators full visibility into learning activity and payment status.',
    ],
  },
];

const inferWebsiteStructure = (project: Project): ProcessSection[] => {
  if (project.brandTheme === 'abdelrahman' || project.brandTheme === 'fouad') {
    return LMS_PROCESS;
  }

  if (project.brandTheme === 'o2nations') {
    return [
      {
        title: 'Home Page',
        desc: 'Lead with AI value proposition, brand voice, and primary conversion CTA.',
      },
      {
        title: 'Services',
        desc: 'Present service pillars with clear outcomes and scannable blocks.',
      },
      {
        title: 'Case Studies',
        desc: 'Show proof of delivery across industries with focused business impact.',
      },
      {
        title: 'Solutions',
        desc: 'Map tailored solutions to business needs and reinforce trust before contact.',
      },
    ];
  }

  const featureText = project.features.map((f) => f.toLowerCase()).join(' | ');
  const sections = [
    { title: 'Hero Section', match: ['hero', 'home', 'landing'], desc: 'Clear value proposition and main CTA.' },
    { title: 'Service / Expertise', match: ['service', 'expertise', 'solution'], desc: 'Explains core offerings with strong hierarchy.' },
    { title: 'Case Studies', match: ['case', 'portfolio', 'project'], desc: 'Builds trust through real implementation examples.' },
    { title: 'Content / Insights', match: ['blog', 'insight', 'news'], desc: 'Supports SEO and topical authority.' },
    { title: 'Contact / Conversion', match: ['contact', 'form', 'booking', 'enrollment'], desc: 'Guides users to conversion touchpoints.' },
    { title: 'Team / Social Proof', match: ['team', 'testimonial', 'instructor', 'partner'], desc: 'Adds credibility with people and proof.' },
  ].filter((item) => item.match.some((token) => featureText.includes(token)));

  if (sections.length >= 3) {
    return sections.map(({ title, desc }) => ({ title, desc }));
  }

  return [
    { title: 'Hero Section', desc: 'Communicate the offer and product positioning quickly.' },
    { title: 'Core Services', desc: 'Show key capabilities in a scannable visual layout.' },
    { title: 'Case Studies', desc: 'Demonstrate proven outcomes and implementation quality.' },
    { title: 'Conversion Area', desc: 'Provide clear next action via contact or booking flow.' },
  ];
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = useMemo(
    () => (projectsData.projects as Project[]).find((item) => getProjectSlug(item) === slug),
    [slug]
  );
  const [zoomedAssetIndex, setZoomedAssetIndex] = useState<number | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeSection, setActiveSection] = useState('objective');
  const touchStartX = useRef<number | null>(null);

  const pageGallery = useMemo(() => {
    if (!project) return [];
    const heroImage = project.images[0];
    return (project.assets ?? []).filter(
      (asset) => asset.type === 'image' && asset.url !== heroImage
    );
  }, [project]);
  const hasPageGallery = pageGallery.length > 0;

  const goGallery = (dir: 1 | -1) => {
    setZoomedAssetIndex((prev) => {
      if (prev === null || pageGallery.length === 0) return prev;
      return (prev + dir + pageGallery.length) % pageGallery.length;
    });
  };

  useEffect(() => {
    if (zoomedAssetIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedAssetIndex(null);
      if (e.key === 'ArrowRight') {
        setZoomedAssetIndex((prev) =>
          prev === null || pageGallery.length === 0
            ? prev
            : (prev + 1) % pageGallery.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setZoomedAssetIndex((prev) =>
          prev === null || pageGallery.length === 0
            ? prev
            : (prev - 1 + pageGallery.length) % pageGallery.length
        );
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedAssetIndex, pageGallery.length]);

  useEffect(() => {
    if (!project) return;

    const isWebsite =
      project.category === 'wordpress' ||
      Boolean(project.liveUrl && project.liveUrl !== '#' && project.liveUrl.trim() !== '');
    const ids = [
      'objective',
      'features',
      'challenge',
      'solutions',
      ...(isWebsite ? ['process'] : []),
      ...(hasPageGallery ? ['gallery'] : []),
      'results',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.2, 0.4, 0.6] }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [slug, project, hasPageGallery]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  if (!project) {
    return (
      <>
        <main className="pt-28 pb-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Project Not Found</h1>
            <Button asChild variant="cta">
              <Link to="/projects">Back to Projects</Link>
            </Button>
          </div>
        </main>
        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </>
    );
  }

  const { hasValidLiveUrl, hasValidGithubUrl, hasValidGithubUrl2 } = getProjectLinks(project);
  const isWebsiteProject =
    project.category === 'wordpress' ||
    Boolean(project.liveUrl && project.liveUrl !== '#' && project.liveUrl.trim() !== '');
  const websiteStructure = inferWebsiteStructure(project);
  const isLmsProcess =
    project.brandTheme === 'abdelrahman' || project.brandTheme === 'fouad';
  const processSteps = websiteStructure.map((section, idx) => ({
    id: idx,
    indexLabel: `1.${idx + 1}`,
    title: section.title,
    summary: section.desc,
    points: section.points ?? [
      `Defined clear scope and section priorities for ${section.title.toLowerCase()}.`,
      'Aligned UX decisions with business goals and conversion intent.',
      'Implemented reusable components to keep delivery scalable and maintainable.',
    ],
  }));
  const sectionAnchors = [
    { id: 'objective', label: 'Overview', icon: Target },
    { id: 'features', label: 'Deliverables', icon: BadgeCheck },
    { id: 'challenge', label: 'Challenge', icon: TriangleAlert },
    { id: 'solutions', label: 'Solutions', icon: BrainCircuit },
    ...(isWebsiteProject ? [{ id: 'process', label: 'Process', icon: Workflow }] : []),
    ...(hasPageGallery ? [{ id: 'gallery', label: 'Screenshots', icon: ZoomIn }] : []),
    { id: 'results', label: 'Results', icon: Sparkles },
  ];
  const activeSectionIndex = Math.max(
    0,
    sectionAnchors.findIndex((section) => section.id === activeSection)
  );
  const sectionProgress = ((activeSectionIndex + 1) / sectionAnchors.length) * 100;
  const serviceCategory = inferServiceCategory(project);
  const relatedProjects = (projectsData.projects as Project[])
    .filter((item) => item.id !== project.id)
    .filter((item) => inferServiceCategory(item) === serviceCategory || item.category === project.category)
    .slice(0, 3);
  const resultHighlights = project.solutions.slice(0, 4).map((text, idx) => ({
    title: ['Primary Outcome', 'Technical Approach', 'User Experience', 'Business Impact'][idx] || 'Outcome',
    text,
  }));

  return (
    <>
      <main className="pb-16 relative overflow-x-clip">
        {/* Hero — shorter on mobile, full viewport height on desktop */}
        <section
          data-no-reveal
          className="relative w-full h-[52dvh] min-h-[240px] max-h-[380px] sm:h-[60dvh] sm:max-h-[480px] lg:h-[100dvh] lg:min-h-0 lg:max-h-none overflow-hidden"
        >
          {/* Image plane: full bleed (mobile) / right half (desktop), edge-to-edge from top */}
          <div className="absolute inset-0 lg:left-1/2 lg:right-0 bg-[#e8e4d8]">
            <img
              src={project.images[0]}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/10 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-background/30 pointer-events-none"
              aria-hidden
            />
          </div>

          {/* Desktop left copy panel */}
          <div className="hidden lg:flex absolute inset-y-0 left-0 w-1/2 flex-col justify-center bg-background z-[1] pl-[max(2rem,calc((100vw-72rem)/2+1.5rem))] pr-10 xl:pr-14 pt-28 pb-10">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground">
                <li>
                  <Link to="/" className="inline-flex items-center gap-1 hover:text-accent transition-colors" aria-label="Home">
                    <Home size={14} />
                  </Link>
                </li>
                <li aria-hidden className="text-muted-foreground/50">
                  <ChevronRight size={13} />
                </li>
                <li>
                  <Link to="/projects" className="hover:text-accent transition-colors font-medium">
                    Projects
                  </Link>
                </li>
                <li aria-hidden className="text-muted-foreground/50">
                  <ChevronRight size={13} />
                </li>
                <li className="text-primary font-semibold truncate max-w-md">{project.title}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-accent text-white text-[11px] font-semibold rounded-lg">
                {getCategoryLabel(project.category)}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary text-primary-foreground text-[11px] font-semibold rounded-lg">
                  <Sparkles size={11} />
                  Featured
                </span>
              )}
              {project.company && (
                <span className="px-2.5 py-1 bg-background text-primary text-[11px] font-medium rounded-lg border border-border/50">
                  {project.company}
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl xl:text-[2.75rem] font-bold text-primary tracking-[-0.03em] leading-[1.12] mb-4 max-w-xl">
              {project.title}
            </h1>

            <p className="text-muted-foreground text-base leading-relaxed max-w-lg mb-5">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-accent/10 text-accent border border-accent/20"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 6 && (
                <span className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-muted/40 text-muted-foreground border border-border/50">
                  +{project.technologies.length - 6}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted-foreground mb-7">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="text-accent" />
                {project.duration}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} className="text-accent" />
                {project.teamSize}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{getServiceCategoryLabel(serviceCategory)}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {hasValidLiveUrl && (
                <Button asChild variant="cta" size="lg" className="rounded-lg h-11 px-5">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit Live Site
                    <ExternalLink size={15} className="ml-2" />
                  </a>
                </Button>
              )}
              {hasValidGithubUrl && (
                <Button asChild variant="outline" size="lg" className="rounded-lg h-11 px-5">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={15} className="mr-2" />
                    Source Code
                  </a>
                </Button>
              )}
              <Button asChild variant="ghost" size="lg" className="rounded-lg h-11 px-3 text-muted-foreground">
                <Link to="/projects">
                  <ArrowLeft size={15} className="mr-1.5" />
                  All projects
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile breadcrumb over image */}
          <div className="lg:hidden absolute top-[5.5rem] sm:top-28 inset-x-0 z-20 px-4 sm:px-6">
            <nav
              aria-label="Breadcrumb"
              className="inline-flex max-w-full rounded-full bg-white/80 backdrop-blur-md border border-white/50 px-3 py-1.5 shadow-sm"
            >
              <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-muted-foreground">
                <li>
                  <Link to="/" className="inline-flex items-center gap-1 hover:text-accent transition-colors" aria-label="Home">
                    <Home size={14} />
                  </Link>
                </li>
                <li aria-hidden className="text-muted-foreground/50">
                  <ChevronRight size={13} />
                </li>
                <li>
                  <Link to="/projects" className="hover:text-accent transition-colors font-medium">
                    Projects
                  </Link>
                </li>
                <li aria-hidden className="text-muted-foreground/50">
                  <ChevronRight size={13} />
                </li>
                <li className="text-primary font-semibold truncate max-w-[10rem] sm:max-w-[14rem]">
                  {project.title}
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Mobile project info — below hero */}
        <div className="lg:hidden px-5 sm:px-8 py-7 sm:py-10 bg-background relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 bg-accent text-white text-[11px] font-semibold rounded-lg">
              {getCategoryLabel(project.category)}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary text-primary-foreground text-[11px] font-semibold rounded-lg">
                <Sparkles size={11} />
                Featured
              </span>
            )}
            {project.company && (
              <span className="px-2.5 py-1 bg-background text-primary text-[11px] font-medium rounded-lg border border-border/50">
                {project.company}
              </span>
            )}
          </div>

          <h1 className="font-display text-[1.85rem] sm:text-4xl font-bold text-primary tracking-[-0.03em] leading-[1.12] mb-3 sm:mb-4 max-w-xl">
            {project.title}
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-accent/10 text-accent border border-accent/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-muted/40 text-muted-foreground border border-border/50">
                +{project.technologies.length - 6}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-muted-foreground mb-7">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} className="text-accent" />
              {project.duration}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} className="text-accent" />
              {project.teamSize}
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{getServiceCategoryLabel(serviceCategory)}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {hasValidLiveUrl && (
              <Button asChild variant="cta" size="lg" className="rounded-lg h-11 px-5">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit Live Site
                  <ExternalLink size={15} className="ml-2" />
                </a>
              </Button>
            )}
            {hasValidGithubUrl && (
              <Button asChild variant="outline" size="lg" className="rounded-lg h-11 px-5">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={15} className="mr-2" />
                  Source Code
                </a>
              </Button>
            )}
            <Button asChild variant="ghost" size="lg" className="rounded-lg h-11 px-3 text-muted-foreground">
              <Link to="/projects">
                <ArrowLeft size={15} className="mr-1.5" />
                All projects
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute inset-x-0 top-[70%] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-accent/8 via-accent/4 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 mt-6 sm:mt-10 lg:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section id="objective" className="relative overflow-hidden bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Target size={18} className="text-accent" />
                  Overview
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </section>

              <section id="features" className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <BadgeCheck size={18} className="text-accent" />
                  Key Deliverables
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground rounded-lg border border-border/40 bg-background/90 px-3 py-2.5"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section id="challenge" className="relative overflow-hidden bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <TriangleAlert size={18} className="text-accent" />
                  The Challenge
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.challenges.map((item) => (
                    <div key={item} className="rounded-lg border border-border/50 bg-background/90 px-3 py-2.5 text-sm text-muted-foreground hover:border-accent/30 hover:shadow-sm transition-all">
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section id="solutions" className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <BrainCircuit size={18} className="text-accent" />
                  How It Was Solved
                </h2>
                <div className="space-y-3">
                  {project.solutions.map((solution, idx) => (
                    <div
                      key={solution}
                      className="flex gap-3 rounded-xl border border-border/50 bg-background/90 p-4 hover:border-accent/30 transition-colors"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-accent/15 text-accent text-xs font-bold flex items-center justify-center border border-accent/20">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{solution}</p>
                    </div>
                  ))}
                </div>
              </section>

              {isWebsiteProject && (
                <section id="process" className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                  <h2 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
                    <Workflow size={18} className="text-accent" />
                    {isLmsProcess ? 'LMS Build Process' : 'Process'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {isLmsProcess
                      ? 'End-to-end Laravel LMS delivery — from public catalog and lessons to students, quizzes, payments, and admin CMS.'
                      : 'Structured implementation flow from analysis to delivery, tailored for client-facing outcomes.'}
                  </p>

                  <div className="space-y-3">
                    {processSteps.map((step) => {
                      const isActive = activeProcessStep === step.id;
                      return (
                        <div
                          key={step.id}
                          className={`rounded-2xl border transition-all ${
                            isActive
                              ? 'border-accent/40 bg-accent/5 shadow-md shadow-accent/10'
                              : 'border-border/50 bg-background/85'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveProcessStep(isActive ? -1 : step.id)}
                            className="w-full flex items-center justify-between gap-4 p-4 text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className="inline-flex items-center justify-center min-w-10 h-10 px-2 rounded-xl bg-accent/15 text-accent text-xs font-bold border border-accent/20">
                                {step.indexLabel}
                              </div>
                              <div>
                                <p className="text-base font-semibold text-primary">{step.title}</p>
                                <p className="text-sm text-muted-foreground mt-0.5">{step.summary}</p>
                              </div>
                            </div>
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-background border border-border/60 text-accent">
                              {isActive ? <CloseIcon size={14} /> : <Plus size={14} />}
                            </span>
                          </button>

                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="px-4 pb-4 pt-1 border-t border-border/40">
                                <ul className="space-y-2.5">
                                  {step.points.map((point, idx) => (
                                    <li key={`${step.id}-${idx}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/80 shrink-0" />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {hasPageGallery && (
                <section id="gallery" className="bg-background/85 border border-border/40 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-md">
                  <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                    <ZoomIn size={18} className="text-accent" />
                    Page Screenshots
                  </h2>
                  <p className="text-xs text-muted-foreground mb-4 sm:mb-5">
                    Tap any screenshot to view fullscreen. Swipe to browse.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {pageGallery.map((asset, idx) => (
                      <button
                        key={`${asset.name}-${idx}`}
                        type="button"
                        onClick={() => setZoomedAssetIndex(idx)}
                        className="group rounded-xl overflow-hidden border border-border/40 bg-background/60 hover:border-accent/40 active:scale-[0.99] transition-all text-left"
                      >
                        <div className="aspect-[16/10] bg-muted/20 relative overflow-hidden">
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/55 text-white flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <ZoomIn size={15} />
                          </div>
                        </div>
                        <div className="p-3 border-t border-border/30">
                          <p className="text-sm font-medium text-primary">{asset.name}</p>
                          {asset.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{asset.description}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section id="results" className="relative overflow-hidden bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <BadgeCheck size={18} className="text-accent" />
                  Outcomes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resultHighlights.map((result) => (
                    <div key={result.title} className="rounded-xl border border-border/50 bg-background/90 p-4 hover:border-accent/30 transition-colors">
                      <p className="text-sm font-semibold text-primary mb-1">{result.title}</p>
                      <p className="text-sm text-muted-foreground">{result.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {relatedProjects.length > 0 && (
                <section className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                  <h2 className="text-xl font-bold text-primary mb-4">Related Case Studies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedProjects.map((item) => (
                      <Link
                        key={item.id}
                        to={`/projects/${getProjectSlug(item)}`}
                        className="group rounded-xl border border-border/50 bg-background/90 overflow-hidden hover:border-accent/40 transition-all"
                      >
                        <div className="h-28 overflow-hidden">
                          <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-accent font-medium mb-1">{getServiceCategoryLabel(inferServiceCategory(item))}</p>
                          <p className="text-sm font-semibold text-primary line-clamp-2">{item.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
              <section className="relative overflow-hidden rounded-2xl border border-white/30 dark:border-white/10 bg-white/55 dark:bg-background/40 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_-8px_hsl(var(--accent)/0.15)]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/15 to-transparent dark:from-white/8 dark:via-white/3 dark:to-transparent pointer-events-none" />
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

                <div className="relative p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <LayoutList size={14} className="text-accent" />
                      On this page
                    </h2>
                    <span className="text-[10px] font-semibold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                      {String(activeSectionIndex + 1).padStart(2, '0')} / {String(sectionAnchors.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="h-1 rounded-full bg-accent/10 mb-5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent/70 via-accent to-accent/80 transition-all duration-500 ease-out"
                      style={{ width: `${sectionProgress}%` }}
                    />
                  </div>

                  <nav className="relative space-y-1">
                    <div className="absolute left-[1.125rem] top-3 bottom-3 w-px bg-gradient-to-b from-accent/30 via-border/60 to-transparent pointer-events-none" />

                    {sectionAnchors.map((section, idx) => {
                      const Icon = section.icon;
                      const isActive = activeSection === section.id;
                      const isPast = idx < activeSectionIndex;

                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={`group relative w-full flex items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-all duration-300 ${
                            isActive
                              ? 'bg-accent/12 border border-accent/30 shadow-sm shadow-accent/10'
                              : 'border border-transparent hover:bg-white/50 dark:hover:bg-white/5 hover:border-white/40'
                          }`}
                        >
                          <span
                            className={`relative z-10 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                              isActive
                                ? 'bg-accent text-white border-accent shadow-md shadow-accent/25 scale-105'
                                : isPast
                                  ? 'bg-accent/10 text-accent border-accent/25'
                                  : 'bg-background/80 text-muted-foreground border-border/40 group-hover:border-accent/30 group-hover:text-accent'
                            }`}
                          >
                            <Icon size={15} />
                          </span>

                          <span className="flex-1 min-w-0">
                            <span
                              className={`block text-[10px] uppercase tracking-wider mb-0.5 ${
                                isActive ? 'text-accent' : 'text-muted-foreground/70'
                              }`}
                            >
                              Step {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`block text-sm font-semibold truncate ${
                                isActive ? 'text-primary' : 'text-foreground/80 group-hover:text-primary'
                              }`}
                            >
                              {section.label}
                            </span>
                          </span>

                          <ChevronRight
                            size={14}
                            className={`flex-shrink-0 transition-all duration-300 ${
                              isActive
                                ? 'text-accent opacity-100 translate-x-0'
                                : 'text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </section>

              <section className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <h2 className="text-lg font-bold text-primary mb-4">Project Info</h2>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground"><Calendar size={14} className="text-accent" /> {project.duration}</p>
                  <p className="flex items-center gap-2 text-muted-foreground"><Users size={14} className="text-accent" /> {project.teamSize}</p>
                  <p className="flex items-center gap-2 text-muted-foreground"><Globe size={14} className="text-accent" /> {getServiceCategoryLabel(serviceCategory)}</p>
                </div>
              </section>

              <section className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <h2 className="text-lg font-bold text-primary mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={`${tech}-${idx}`} className="px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-md border border-accent/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {(hasValidLiveUrl || hasValidGithubUrl || hasValidGithubUrl2) && (
                <section className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                  <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <Link2 size={17} className="text-accent" />
                    Project Links
                  </h2>
                  <div className="space-y-2">
                    {hasValidLiveUrl && (
                      <Button asChild variant="cta" className="w-full">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Globe size={14} className="mr-2" /> Live Demo <ExternalLink size={12} className="ml-2" />
                        </a>
                      </Button>
                    )}
                    {hasValidGithubUrl && (
                      <Button asChild variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github size={14} className="mr-2" /> GitHub
                        </a>
                      </Button>
                    )}
                    {hasValidGithubUrl2 && (
                      <Button asChild variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground">
                        <a href={project.githubUrl2} target="_blank" rel="noopener noreferrer">
                          <Github size={14} className="mr-2" /> GitHub 2
                        </a>
                      </Button>
                    )}
                  </div>
                </section>
              )}

              <section className="bg-primary text-primary-foreground rounded-2xl p-5 shadow-lg">
                <p className="text-xs uppercase tracking-wide opacity-80 mb-2">Start a Similar Project</p>
                <p className="text-sm leading-relaxed mb-4">
                  Need a similar delivery for your business? I can design and build a tailored solution.
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <a
                    href="https://wa.me/201061642356?text=Hi%20Donia%2C%20I%20want%20to%20discuss%20a%20similar%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Let's Talk
                    <ArrowRight size={14} className="ml-2" />
                  </a>
                </Button>
              </section>

            </aside>
          </div>
        </div>
      </main>
      {zoomedAssetIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot gallery"
            onClick={() => setZoomedAssetIndex(null)}
          >
            <div
              className="flex items-center justify-between gap-3 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs tabular-nums">
                {zoomedAssetIndex + 1} / {pageGallery.length}
              </div>
              <p className="min-w-0 flex-1 text-center text-xs text-white/70 truncate px-2 hidden sm:block">
                {pageGallery[zoomedAssetIndex]?.name}
              </p>
              <button
                type="button"
                onClick={() => setZoomedAssetIndex(null)}
                className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close gallery"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-12 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                touchStartX.current = e.changedTouches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null || pageGallery.length < 2) return;
                const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(delta) < 48) return;
                goGallery(delta < 0 ? 1 : -1);
              }}
            >
              {pageGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goGallery(-1)}
                    className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goGallery(1)}
                    className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="w-full h-full max-h-[calc(100dvh-5.5rem)] overflow-auto overscroll-contain flex items-start justify-center">
                <img
                  src={pageGallery[zoomedAssetIndex].url}
                  alt={pageGallery[zoomedAssetIndex].name}
                  className="w-full max-w-5xl h-auto object-contain select-none"
                  draggable={false}
                />
              </div>
            </div>

            {pageGallery.length > 1 && (
              <div
                className="sm:hidden flex items-center justify-center gap-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => goGallery(-1)}
                  className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => goGallery(1)}
                  className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>,
          document.body
        )}
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
};

export default ProjectDetails;
