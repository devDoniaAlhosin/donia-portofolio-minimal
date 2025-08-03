import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { User, Code, Heart, Globe, Sparkles, ArrowRight } from 'lucide-react';

export const AboutSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  
  const aboutItems = [
    {
      icon: User,
      title: "Who I Am",
      content: "Passionate WordPress and web developer creating modern, responsive websites that deliver exceptional user experiences.",
      stats: ["50+ Projects", "98% Satisfaction"]
    },
    {
      icon: Code,
      title: "What I Do",
      content: "WordPress development, custom themes, React applications, and responsive design with focus on performance.",
      stats: ["WordPress", "React", "PHP"]
    },
    {
      icon: Heart,
      title: "My Approach",
      content: "Problem-solving mindset with attention to detail. I collaborate closely with clients to deliver solutions that exceed expectations.",
      stats: ["Problem Solving", "Collaboration"]
    },
    {
      icon: Globe,
      title: "Languages",
      content: "Arabic (Native), English (Fluent), German (Basic). Strong communication for effective project delivery.",
      stats: ["Arabic", "English", "German"]
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-accent/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-tl from-accent/2 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <Sparkles size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            The Story Behind the Code
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            A passionate developer focused on creating exceptional web experiences.
          </p>
        </div>

        {/* Minimal grid layout */}
        <div 
          ref={contentRef}
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 transition-all duration-1000 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {aboutItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group relative bg-background/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-border/30 hover:border-accent/20 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/5 ${
                  contentVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{transitionDelay: `${index * 0.1}s`}}
              >
                {/* Icon and title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {item.content}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-2">
                  {item.stats.map((stat, statIndex) => (
                    <span 
                      key={statIndex}
                      className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20"
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/1 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom call-to-action */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl border border-accent/20 hover:border-accent/30 transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-accent">Ready to work together?</span>
            <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
};