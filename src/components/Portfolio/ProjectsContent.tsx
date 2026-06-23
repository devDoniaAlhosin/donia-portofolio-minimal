import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, X, SlidersHorizontal } from 'lucide-react';
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

const serviceFilters: ServicePortfolioCategory[] = [
  'all-services',
  'portfolio',
  'blogging',
  'booking',
  'ecommerce',
];

const FilterButton = ({
  label,
  count,
  isActive,
  disabled,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
      isActive
        ? 'bg-accent text-white font-medium shadow-sm shadow-accent/20'
        : 'text-muted-foreground hover:text-primary hover:bg-accent/5'
    }`}
  >
    <span className="truncate">{label}</span>
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded-md shrink-0 ${
        isActive ? 'bg-white/20' : 'bg-muted/60 text-muted-foreground'
      }`}
    >
      {count}
    </span>
  </button>
);

export const ProjectsContent = ({
  limit,
  showExploreMore = false,
  isPage = false,
}: ProjectsContentProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [activeServiceFilter, setActiveServiceFilter] =
    useState<ServicePortfolioCategory>('all-services');
  const [filterKey, setFilterKey] = useState('all-all-services');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const projects: Project[] = (projectsData?.projects as Project[]) || [];
  const filters: Array<{ key: string; label: string }> = projectsData?.filters || [];

  const showImmediately = isPage;
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();

  useEffect(() => {
    projects.forEach((project) => {
      if (project.images?.length > 0) {
        const img = new Image();
        img.src = project.images[0];
      }
    });
  }, [projects]);

  const projectsByType = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [projects, activeFilter]
  );

  const filteredProjects = useMemo(
    () =>
      projectsByType
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
        .slice(0, limit ?? undefined),
    [projectsByType, activeServiceFilter, limit]
  );

  const getTypeCount = (filterKey: ProjectFilter) =>
    filterKey === 'all'
      ? projects.length
      : projects.filter((p) => p.category === filterKey).length;

  const getServiceCount = (serviceFilter: ServicePortfolioCategory) => {
    if (serviceFilter === 'all-services') return projectsByType.length;
    return projectsByType.filter(
      (project) => inferServiceCategory(project) === serviceFilter
    ).length;
  };

  const hasActiveFilters =
    activeFilter !== 'all' || activeServiceFilter !== 'all-services';

  const activeFilterLabels = [
    activeFilter !== 'all'
      ? filters.find((f) => f.key === activeFilter)?.label
      : null,
    activeServiceFilter !== 'all-services'
      ? getServiceCategoryLabel(activeServiceFilter)
      : null,
  ].filter(Boolean);

  const clearFilters = () => {
    setActiveFilter('all');
    setActiveServiceFilter('all-services');
    setFilterKey('all-all-services');
    setMobileFiltersOpen(false);
  };

  const applyTypeFilter = (key: ProjectFilter) => {
    setActiveFilter(key);
    setFilterKey(`${key}-${activeServiceFilter}`);
  };

  const applyServiceFilter = (key: ServicePortfolioCategory) => {
    setActiveServiceFilter(key);
    setFilterKey(`${activeFilter}-${key}`);
  };

  const headerShown = showImmediately || headerVisible;
  const cardsVisible = showImmediately || contentVisible || (!isPage && headerShown);

  const filterPanel = (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
          Stack
        </p>
        <div className="space-y-1">
          {filters.map((filter) => (
            <FilterButton
              key={filter.key}
              label={filter.label}
              count={getTypeCount(filter.key as ProjectFilter)}
              isActive={activeFilter === filter.key}
              disabled={getTypeCount(filter.key as ProjectFilter) === 0}
              onClick={() => applyTypeFilter(filter.key as ProjectFilter)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-border/40 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
          Business type
        </p>
        <div className="space-y-1">
          {serviceFilters.map((serviceFilter) => (
            <FilterButton
              key={serviceFilter}
              label={getServiceCategoryLabel(serviceFilter)}
              count={getServiceCount(serviceFilter)}
              isActive={activeServiceFilter === serviceFilter}
              disabled={getServiceCount(serviceFilter) === 0}
              onClick={() => applyServiceFilter(serviceFilter)}
            />
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
        >
          <X size={12} />
          Reset filters
        </button>
      )}
    </div>
  );

  const projectGrid = (
    <div
      ref={contentRef}
      key={filterKey}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 animate-page-enter"
    >
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isVisible={cardsVisible}
          />
        ))
      ) : (
        <div className="col-span-full rounded-2xl border border-dashed border-border/60 bg-background/40 py-14 px-6 text-center">
          <p className="text-base font-semibold text-primary mb-1">No matches</p>
          <p className="text-sm text-muted-foreground mb-4">
            Try a different filter combination.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );

  const Wrapper = isPage ? 'div' : 'section';
  const wrapperProps = isPage ? {} : { id: 'projects' };

  return (
    <Wrapper
      {...wrapperProps}
      className={`${isPage ? 'pt-24 sm:pt-28 pb-16' : 'py-16 sm:py-20'} relative overflow-hidden`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-accent/6 via-accent/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tl from-accent/4 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={headerRef}
          className={`mb-8 sm:mb-10 transition-all duration-700 ease-out ${
            headerShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {isPage ? (
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <Globe size={14} className="text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Portfolio
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">All Projects</h1>
              <p className="text-sm text-muted-foreground">
                {projects.length} projects across Laravel, React, Angular, and WordPress.
              </p>
            </div>
          ) : (
            <div className="text-left sm:text-center">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
                  <Globe size={14} className="sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">
                  Projects
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
                Selected Work & Case Studies
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Modern WordPress platforms, software house portfolios, and product-focused web
                experiences built for real business impact.
              </p>
            </div>
          )}
        </div>

        {isPage ? (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* Mobile filter toggle */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen((open) => !open)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border/50 bg-background/70 backdrop-blur-sm text-sm font-medium text-primary"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-accent" />
                  Filters
                  {hasActiveFilters && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent text-white">
                      {activeFilterLabels.length}
                    </span>
                  )}
                </span>
                <span className="text-muted-foreground text-xs">
                  {filteredProjects.length} results
                </span>
              </button>

              {mobileFiltersOpen && (
                <div className="mt-3 p-4 rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm">
                  {filterPanel}
                </div>
              )}
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-52 shrink-0">
              <div className="sticky top-28 p-4 rounded-2xl border border-border/40 bg-background/60 backdrop-blur-sm">
                <p className="text-xs font-semibold text-primary mb-4 flex items-center gap-2">
                  <SlidersHorizontal size={14} className="text-accent" />
                  Filters
                </p>
                {filterPanel}
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{filteredProjects.length}</span>
                  {filteredProjects.length === 1 ? ' project' : ' projects'}
                </p>

                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2">
                    {activeFilterLabels.map((label) => (
                      <span
                        key={label}
                        className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {label}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs text-muted-foreground hover:text-accent transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {projectGrid}
            </div>
          </div>
        ) : (
          <>
            <div
              className={`mb-10 sm:mb-12 transition-all duration-500 ease-out ${
                headerShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
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
                  <div
                    className="grid relative z-10"
                    style={{ gridTemplateColumns: `repeat(${filters.length}, 1fr)` }}
                  >
                    {filters.map((filter) => (
                      <button
                        key={filter.key}
                        type="button"
                        onClick={() => applyTypeFilter(filter.key as ProjectFilter)}
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

              <div className="sm:hidden">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {filters.map((filter) => (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => applyTypeFilter(filter.key as ProjectFilter)}
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

            <div
              ref={contentRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isVisible={cardsVisible}
                />
              ))}
            </div>
          </>
        )}

        {showExploreMore && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <Button
              variant="cta"
              size="lg"
              asChild
              className="shadow-lg shadow-accent/25 hover:scale-105 transition-all"
            >
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
