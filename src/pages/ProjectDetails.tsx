import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CustomCursor } from '@/components/Portfolio/CustomCursor';
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
} from 'lucide-react';

const inferWebsiteStructure = (project: Project) => {
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

  if (sections.length >= 3) return sections;

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

  if (!project) {
    return (
      <>
        <CustomCursor />
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
  const heroImage = project.images[0];
  const pageGallery = (project.assets ?? []).filter(
    (asset) => asset.type === 'image' && asset.url !== heroImage
  );
  const hasPageGallery = pageGallery.length > 0;
  const websiteStructure = inferWebsiteStructure(project);
  const processSteps = websiteStructure.map((section, idx) => ({
    id: idx,
    indexLabel: `1.${idx + 1}`,
    title: section.title,
    summary: section.desc,
    points: [
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

  useEffect(() => {
    if (zoomedAssetIndex === null) {
      document.body.style.overflow = 'unset';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedAssetIndex(null);
      if (e.key === 'ArrowRight') setZoomedAssetIndex((prev) => (prev === null ? null : (prev + 1) % pageGallery.length));
      if (e.key === 'ArrowLeft') setZoomedAssetIndex((prev) => (prev === null ? null : (prev - 1 + pageGallery.length) % pageGallery.length));
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedAssetIndex, pageGallery.length]);

  useEffect(() => {
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

    sectionAnchors.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [slug, sectionAnchors.length, hasPageGallery, isWebsiteProject]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor />
      <main className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tl from-accent/8 via-accent/4 to-transparent rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <Button asChild variant="outline" className="mb-6 border-border/60 bg-background/70 hover:bg-primary hover:text-primary-foreground">
            <Link to="/projects">
              <ArrowLeft size={16} className="mr-2" />
              Back to Projects
            </Link>
          </Button>

          <div className="relative overflow-hidden bg-gradient-to-br from-accent/12 via-background/80 to-accent/5 rounded-3xl border border-accent/20 mb-8 backdrop-blur-sm shadow-xl shadow-accent/10">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-lg">
                    {getCategoryLabel(project.category)}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-lg">
                      <Sparkles size={12} />
                      Featured
                    </span>
                  )}
                  {project.company && (
                    <span className="px-3 py-1 bg-background/80 text-primary text-xs font-medium rounded-lg border border-border/40">
                      {project.company}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-primary mb-3 leading-tight">
                  {project.title}
                </h1>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-accent/10 text-accent border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-muted/30 text-muted-foreground border border-border/40">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
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
                    <Button asChild variant="cta" size="sm">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Visit Live Site
                        <ExternalLink size={14} className="ml-2" />
                      </a>
                    </Button>
                  )}
                  {hasValidGithubUrl && (
                    <Button asChild variant="outline" size="sm">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={14} className="mr-2" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative order-1 lg:order-2 min-h-[220px] sm:min-h-[280px] lg:min-h-full">
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-background/20 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] object-cover object-top"
                />
              </div>
            </div>
          </div>

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
                    Process
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Structured implementation flow from analysis to delivery, tailored for client-facing outcomes.
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
                <section id="gallery" className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                  <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                    <ZoomIn size={18} className="text-accent" />
                    Page Screenshots
                  </h2>
                  <p className="text-xs text-muted-foreground mb-5">Click any screenshot to view fullscreen.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pageGallery.map((asset, idx) => (
                      <button
                        key={`${asset.name}-${idx}`}
                        type="button"
                        onClick={() => setZoomedAssetIndex(idx)}
                        className="group rounded-xl overflow-hidden border border-border/40 bg-background/60 hover:border-accent/40 transition-all text-left"
                      >
                        <div className="aspect-[16/10] bg-muted/20 relative overflow-hidden">
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn size={14} />
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
      {zoomedAssetIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setZoomedAssetIndex(null)}>
          <div className="relative w-full max-w-6xl h-[85vh] bg-background/10 border border-white/10 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs">
              {zoomedAssetIndex + 1} / {pageGallery.length}
            </div>
            <button
              onClick={() => setZoomedAssetIndex(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X size={16} />
            </button>
            {pageGallery.length > 1 && (
              <>
                <button
                  onClick={() => setZoomedAssetIndex((prev) => (prev === null ? null : (prev - 1 + pageGallery.length) % pageGallery.length))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setZoomedAssetIndex((prev) => (prev === null ? null : (prev + 1) % pageGallery.length))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            <div className="w-full h-full overflow-auto">
              <img
                src={pageGallery[zoomedAssetIndex].url}
                alt={pageGallery[zoomedAssetIndex].name}
                className="mx-auto max-w-none min-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
};

export default ProjectDetails;
