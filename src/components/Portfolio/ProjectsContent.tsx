import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import projectsData from '@/data/projects.json';
import {
  Project,
  ProjectFilter,
  ServicePortfolioCategory,
  inferServiceCategory,
  getServiceCategoryLabel,
} from '@/types/project';
import { ProjectCard } from '@/components/Portfolio/ProjectCard';

interface ProjectsContentProps {
  limit?: number;
  showExploreMore?: boolean;
  isPage?: boolean;
}

export const ProjectsContent = ({
  limit,
  showExploreMore = false,
  isPage = false,
}: ProjectsContentProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [activeServiceFilter, setActiveServiceFilter] =
    useState<ServicePortfolioCategory>('all-services');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const projects: Project[] = (projectsData?.projects as Project[]) || [];
  const filters: Array<{ key: string; label: string }> = projectsData?.filters || [];
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();

  useEffect(() => {
    setIsInitialLoad(false);
    projects.forEach((project) => {
      if (project.images?.length > 0) {
        const img = new Image();
        img.src = project.images[0];
      }
    });
  }, [projects]);

  const serviceFilters: ServicePortfolioCategory[] = [
    'all-services',
    'portfolio',
    'blogging',
    'booking',
    'ecommerce',
  ];

  const filteredProjects = (activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter))
    .filter((project) =>
      activeServiceFilter === 'all-services'
        ? true
        : inferServiceCategory(project) === activeServiceFilter
    )
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    })
    .slice(0, limit ?? undefined);

  const getServiceCount = (serviceFilter: ServicePortfolioCategory) => {
    if (serviceFilter === 'all-services') {
      return (activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter)
      ).length;
    }

    return (activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)
    ).filter((project) => inferServiceCategory(project) === serviceFilter).length;
  };

  const Wrapper = isPage ? 'div' : 'section';
  const wrapperProps = isPage ? {} : { id: 'projects' };

  return (
    <Wrapper
      {...wrapperProps}
      className={`${isPage ? 'pt-28 pb-16' : 'py-16 sm:py-20'} relative overflow-hidden`}
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-accent/8 via-accent/4 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tl from-accent/6 via-accent/3 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={headerRef}
          className={`text-left sm:text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <Globe size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            {isPage ? 'All Projects' : 'Selected Work & Case Studies'}
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 mb-8 sm:mb-12">
            {isPage
              ? 'Browse the full portfolio — WordPress platforms, web apps, UI design, and testing projects.'
              : 'Modern WordPress platforms, software house portfolios, and product-focused web experiences built for real business impact.'}
          </p>

          <div
            className={`relative transition-all duration-500 ease-out ${
              headerVisible || isInitialLoad ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="hidden sm:flex items-center justify-center">
              <div className="bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 p-2 shadow-lg relative overflow-hidden">
                <div
                  className="absolute top-2 bottom-2 bg-gradient-to-r from-accent to-accent/80 rounded-xl shadow-lg shadow-accent/25 transition-all duration-500 ease-out"
                  style={{
                    left: `${filters.findIndex((f) => f.key === activeFilter) * (100 / filters.length)}%`,
                    width: `${100 / filters.length}%`,
                  }}
                />
                <div className="grid relative z-10" style={{ gridTemplateColumns: `repeat(${filters.length}, 1fr)` }}>
                  {filters.map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key as ProjectFilter)}
                      className={`relative px-3 py-3 rounded-xl text-sm font-medium transition-all duration-500 whitespace-nowrap ${
                        activeFilter === filter.key
                          ? 'text-white'
                          : 'text-muted-foreground hover:text-primary hover:bg-accent/10'
                      }`}
                    >
                      <span className="relative z-10">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="sm:hidden mb-6">
              <div className="flex justify-center px-4">
                <div className="flex gap-2 overflow-x-auto w-full max-w-md">
                  {filters.map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key as ProjectFilter)}
                      className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                        activeFilter === filter.key
                          ? 'bg-accent text-white shadow-sm'
                          : 'bg-background/60 text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isPage && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {serviceFilters.map((serviceFilter) => {
                const count = getServiceCount(serviceFilter);
                const isActive = activeServiceFilter === serviceFilter;

                return (
                  <button
                    key={serviceFilter}
                    onClick={() => setActiveServiceFilter(serviceFilter)}
                    className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border transition-all inline-flex items-center gap-2 ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-md'
                        : 'bg-background/60 text-muted-foreground border-border/50 hover:border-accent/30 hover:text-primary'
                    }`}
                  >
                    <span>{getServiceCategoryLabel(serviceFilter)}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div
          ref={contentRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700 ease-out ${
            contentVisible || isInitialLoad ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={contentVisible || isInitialLoad}
            />
          ))}
        </div>

        {showExploreMore && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <Button variant="cta" size="lg" asChild className="shadow-lg shadow-accent/25 hover:scale-105 transition-all">
              <Link to="/projects">
                Explore More
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
