import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CustomCursor } from '@/components/Portfolio/CustomCursor';
import { Navbar } from '@/components/Portfolio/Navbar';
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
  Star,
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomedAssetIndex, setZoomedAssetIndex] = useState<number | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeSection, setActiveSection] = useState('objective');

  if (!project) {
    return (
      <>
        <CustomCursor />
        <Navbar />
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
  const highlightedPages = (project.assets || []).filter((asset) => asset.type === 'image').slice(0, 6);
  const galleryImages = highlightedPages.length > 0 ? highlightedPages : project.images.map((url, idx) => ({ name: `Preview ${idx + 1}`, url }));
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
    { id: 'objective', label: 'Objective' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'thinking', label: 'Thinking' },
    { id: 'process', label: 'Process' },
    { id: 'results', label: 'Results' },
  ];
  const serviceCategory = inferServiceCategory(project);
  const relatedProjects = (projectsData.projects as Project[])
    .filter((item) => item.id !== project.id)
    .filter((item) => inferServiceCategory(item) === serviceCategory || item.category === project.category)
    .slice(0, 3);
  const resultHighlights = [
    { title: 'Platform Outcome', text: project.solutions[0] || 'Delivered a scalable, conversion-focused digital experience.' },
    { title: 'Improved Product Discovery', text: project.features[0] || 'Users find relevant options faster with clearer information architecture.' },
    { title: 'Faster Decision Making', text: project.features[1] || 'Structured flow reduces friction and simplifies user journeys.' },
    { title: 'Optimized Frontend Performance', text: project.solutions[1] || 'Performance-aware implementation keeps experience smooth.' },
    { title: 'Analytics-Driven Optimization', text: project.solutions[2] || 'Insights support ongoing UX and conversion improvements.' },
  ];

  useEffect(() => {
    if (zoomedAssetIndex === null) {
      document.body.style.overflow = 'unset';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedAssetIndex(null);
      if (e.key === 'ArrowRight') setZoomedAssetIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
      if (e.key === 'ArrowLeft') setZoomedAssetIndex((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length));
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedAssetIndex, galleryImages.length]);

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
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor />
      <Navbar />
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

          <div className="relative overflow-hidden bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-3xl p-6 md:p-8 border border-accent/25 mb-8 backdrop-blur-sm shadow-xl shadow-accent/10">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg">
                    {getCategoryLabel(project.category)}
                  </span>
                  {project.company && (
                    <span className="px-3 py-1.5 bg-black/60 text-white text-xs font-medium rounded-lg">
                      While at {project.company}
                    </span>
                  )}
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg">
                      <Sparkles size={12} />
                      Featured Case Study
                    </span>
                  )}
                  <span className="px-3 py-1.5 bg-background/80 text-primary text-xs font-medium rounded-lg border border-border/40">
                    {getServiceCategoryLabel(serviceCategory)}
                  </span>
                </div>
                <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-primary mb-4 leading-tight">{project.title}</h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-4xl">{project.longDescription}</p>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-border/50 bg-background/85 backdrop-blur-sm p-4 shadow-lg">
                  <div className="rounded-xl overflow-hidden border border-border/40 bg-background/70">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-primary line-clamp-2">{project.title}</p>
                    <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                      <p className="flex items-center justify-between"><span>Live URL</span><span className="font-medium text-primary/90">{hasValidLiveUrl ? 'Available' : 'Private'}</span></p>
                      <p className="flex items-center justify-between"><span>Industry</span><span className="font-medium text-primary/90">{getServiceCategoryLabel(serviceCategory)}</span></p>
                      <p className="flex items-center justify-between"><span>Scope</span><span className="font-medium text-primary/90">{project.teamSize} Team</span></p>
                    </div>
                    {hasValidLiveUrl && (
                      <Button asChild variant="cta" size="sm" className="w-full mt-3">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Visit Live Site
                          <ExternalLink size={13} className="ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-border/40 bg-background/70 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Duration</p>
                <p className="text-sm font-semibold text-primary mt-1">{project.duration}</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-background/70 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Team Size</p>
                <p className="text-sm font-semibold text-primary mt-1">{project.teamSize}</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-background/70 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Project Rating</p>
                <p className="text-sm font-semibold text-primary mt-1">{project.rating}</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-background/70 px-4 py-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Views</p>
                <p className="text-sm font-semibold text-primary mt-1">{project.views.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section id="objective" className="relative overflow-hidden bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Target size={18} className="text-accent" />
                  Objective
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              </section>

              <div className="rounded-2xl overflow-hidden border border-border/30 bg-background/80 backdrop-blur-sm shadow-lg">
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain bg-black/5"
                />
              </div>
              {project.images.length > 1 && (
                <div className="flex gap-3 flex-wrap">
                  {project.images.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-20 h-14 rounded-md overflow-hidden border ${
                        idx === currentImageIndex ? 'border-accent' : 'border-border/40'
                      }`}
                    >
                      <img src={img} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </button>
                  ))}
                </div>
              )}

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

              <section id="thinking" className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
                  <BrainCircuit size={18} className="text-accent" />
                  Thinking
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  We approach this case with structured UX thinking: clarity first, hierarchy second, conversion always visible.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border/50 bg-background/85 p-3 hover:border-accent/30 transition-all">
                    <p className="text-xs font-semibold text-primary mb-1">Business Goal</p>
                    <p className="text-xs text-muted-foreground">Position the brand as a trusted technical partner.</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-background/85 p-3 hover:border-accent/30 transition-all">
                    <p className="text-xs font-semibold text-primary mb-1">User Need</p>
                    <p className="text-xs text-muted-foreground">Understand services quickly and find relevant proof.</p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-background/85 p-3 hover:border-accent/30 transition-all">
                    <p className="text-xs font-semibold text-primary mb-1">Conversion</p>
                    <p className="text-xs text-muted-foreground">Drive consultation/contact with clear next steps.</p>
                  </div>
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

              <section id="results" className="relative overflow-hidden bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none" />
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <BadgeCheck size={18} className="text-accent" />
                  Results & Delivery
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 leading-tight">
                  A Scalable Project Experience That Supports Real Growth
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Outcomes focus on usability, speed, and measurable business impact for client-facing goals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 rounded-xl border border-border/50 bg-background/90 p-4">
                    <p className="text-sm font-semibold text-primary mb-1">{resultHighlights[0].title}</p>
                    <p className="text-sm text-muted-foreground">{resultHighlights[0].text}</p>
                  </div>
                  {resultHighlights.slice(1).map((result) => (
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
              <section className="bg-background/85 border border-border/40 rounded-2xl p-4 backdrop-blur-sm shadow-md">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Case Sections</h2>
                <nav className="space-y-1.5">
                  {sectionAnchors.map((section, idx) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center justify-between text-sm rounded-lg px-2.5 py-2 border transition-colors ${
                        activeSection === section.id
                          ? 'border-accent/40 bg-accent/10'
                          : 'border-transparent hover:border-accent/30 hover:bg-accent/5'
                      }`}
                    >
                      <span className="text-muted-foreground">0{idx + 1}</span>
                      <span className="text-primary font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>
              </section>

              <section className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                <h2 className="text-lg font-bold text-primary mb-4">Project Stats</h2>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground"><Calendar size={14} className="text-accent" /> {project.duration}</p>
                  <p className="flex items-center gap-2 text-muted-foreground"><Users size={14} className="text-accent" /> {project.teamSize}</p>
                  <p className="flex items-center gap-2 text-muted-foreground"><Star size={14} className="text-yellow-500 fill-yellow-500" /> {project.rating}</p>
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

              {isWebsiteProject && galleryImages.length > 0 && (
                <section className="bg-background/85 border border-border/40 rounded-2xl p-6 backdrop-blur-sm shadow-md">
                  <h2 className="text-lg font-bold text-primary mb-4">Created Pages Gallery</h2>
                  <p className="text-xs text-muted-foreground mb-4">Click any image to open fullscreen gallery and zoom long page screenshots.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {galleryImages.map((asset, idx) => (
                      <button
                        key={`${asset.name}-${idx}`}
                        onClick={() => setZoomedAssetIndex(idx)}
                        className="group rounded-xl overflow-hidden border border-border/40 bg-background/60 hover:border-accent/40 transition-all text-left"
                      >
                        <div className="h-24 bg-muted/20 relative">
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn size={13} />
                          </div>
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs font-medium text-primary truncate">{asset.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </main>
      {zoomedAssetIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setZoomedAssetIndex(null)}>
          <div className="relative w-full max-w-6xl h-[85vh] bg-background/10 border border-white/10 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs">
              {zoomedAssetIndex + 1} / {galleryImages.length}
            </div>
            <button
              onClick={() => setZoomedAssetIndex(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X size={16} />
            </button>
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() => setZoomedAssetIndex((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setZoomedAssetIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            <div className="w-full h-full overflow-auto">
              <img
                src={galleryImages[zoomedAssetIndex].url}
                alt={galleryImages[zoomedAssetIndex].name}
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
