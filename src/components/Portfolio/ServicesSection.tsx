import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import data from '@/data/skills_services.json';
import * as Icons from 'lucide-react';

export const ServicesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const services = data.services.map((item) => ({
    ...item,
    Icon: (Icons as any)[item.icon] as React.ComponentType<any>,
  }));

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggleExpanded = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section id="services" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-10 right-1/4 w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={headerRef}
          className={`text-left sm:text-center mb-12 sm:mb-20 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r  from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <Icons.Briefcase size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">Services & Solutions</span>
          </div>
          <h2 className="text-3xl  mb-4 sm:text-4xl md:text-5xl font-bold text-primary">{data.servicesMeta?.title || 'What I Offer'}</h2>
          {data.servicesMeta?.subtitle && (
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              {data.servicesMeta.subtitle}
            </p>
          )}
        </div>

        <div
          ref={contentRef}
          className={`transition-all duration-700 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="[--gap:1rem] sm:[--gap:1.5rem] grid grid-cols-1 md:grid-cols-2 gap-[var(--gap)]">
            {services.map((service, index) => {
              const Icon = service.Icon;
              return (
                <article
                  key={service.title}
                  className="group relative rounded-lg sm:rounded-xl border border-border/50 bg-background/70 backdrop-blur-sm p-5 sm:p-6 md:p-6 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden cursor-pointer"
                  style={{ transitionDelay: `${index * 60}ms` }}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpanded(service.title)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpanded(service.title);
                    }
                  }}
                >
                  {/* Watermark icon */}
                  <Icon className="pointer-events-none absolute -right-4 -top-2 w-24 h-24 sm:w-28 sm:h-28 opacity-[0.04]" />

                  {/* Hover gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent/0 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Inline chevron indicator aligned with header */}

                  <div className="flex items-start gap-4 relative">
                    <div className="relative">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center ring-1 ring-accent/20 group-hover:ring-accent/30 transition-all">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                      </div>
                    </div>
                    <div className="flex-1 pr-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-semibold text-primary tracking-tight">
                          {service.title}
                        </h3>
                        {service.category && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20">
                            {service.category}
                          </span>
                        )}
                        </div>
                        <div className={`w-7 h-7 rounded-lg sm:rounded-xl bg-accent/10 border border-accent/20 grid place-items-center flex-shrink-0 transition-colors ${expanded[service.title] ? 'bg-accent/15 border-accent/30' : ''}`}>
                          <Icons.ChevronDown className={`w-4 h-4 text-accent transition-transform duration-300 ${expanded[service.title] ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      {service.subtitle && (
                        <div className="mt-1">
                          <span className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground px-2 py-0.5 rounded-md bg-muted/40 border border-border/40">
                            {service.subtitle}
                          </span>
                        </div>
                      )}
                      <div className="mt-2 h-px w-12 bg-accent/30" />
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      {Array.isArray(service.features) && service.features.length > 0 && (
                        <ul
                          className={`mt-2 space-y-1.5 overflow-hidden transition-all duration-300 ${
                            expanded[service.title] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          {service.features.slice(0, 3).map((feat: string) => (
                            <li key={feat} className="text-xs text-muted-foreground flex items-center gap-2">
                              <Icons.CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

