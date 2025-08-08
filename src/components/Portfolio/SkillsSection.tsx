import * as Icons from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import data from '@/data/skills_services.json';

export const SkillsSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  
  const skills = data.skills.map((item) => ({
    ...item,
    Icon: (Icons as any)[item.icon],
  }));

  return (
    <section id="skills" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-tl from-accent/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={headerRef}
          className={`text-left sm:text-center mb-12 sm:mb-20 transition-all duration-1000 ease-out ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <Icons.Zap size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">Skills & Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            My Technical Arsenal
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            A comprehensive toolkit for creating exceptional web experiences with modern technologies and best practices.
          </p>
        </div>

        <div 
          ref={contentRef}
          className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6 transition-all duration-1000 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {skills.map((skill, index) => {
            const Icon = (skill as any).Icon;
            return (
              <div
                key={index}
                className={`group relative bg-background/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg sm:hover:shadow-xl hover:shadow-accent/10 break-inside-avoid ${
                  contentVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{transitionDelay: `${index * 0.1}s`}}
              >
                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20">
                    {skill.category}
                  </span>
                </div>

                {/* Icon container */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    <Icon size={20} className="sm:w-6 sm:h-6 text-accent" />
                  </div>
                  {/* Icon glow effect */}
                  <div className="absolute inset-0 bg-accent/20 rounded-lg sm:rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-tight">
                    {skill.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Skill level indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground font-medium">Proficiency</span>
                      <span className="text-accent font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-1.5 sm:h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                    {skill.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 text-xs bg-background/50 text-muted-foreground rounded-md border border-border/30 group-hover:border-accent/20 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/2 to-transparent rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 sm:mt-16 text-left sm:text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg sm:rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold text-accent">Continuously learning and evolving</span>
            <Icons.Rocket size={12} className="sm:w-3.5 sm:h-3.5 text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
};