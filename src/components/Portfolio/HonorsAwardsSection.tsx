import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useState } from 'react';
import { Trophy, Award, Star, GraduationCap, FileText, ExternalLink, Sparkles, Medal } from 'lucide-react';

export const HonorsAwardsSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const honors = [
    {
      title: "Towards A Novel Prototype for Superpower Glass for Autistic Kids",
      type: "Research Paper",
      journal: "International Journal of Industry and Sustainable Development",
      period: "2023",
      id: "IJISD-2306-1032 (R1)",
      status: "Accepted for Publication",
      description: "Research paper on innovative wearable technology for autistic children",
      link: "https://ijisd.journals.ekb.eg/article_308232.html",
      icon: FileText,
      category: "Research Publication"
    },
    {
      title: "Enhancing Autism Knowledge with GUI Solution",
      type: "Research Paper",
      journal: "Seventh International Undergraduate Research Conference",
      period: "2023",
      id: "ID_1041-IUGRC (R2)",
      status: "Accepted for Publication",
      description: "Research presented at Military Technical College conference",
      link: "#",
      icon: FileText,
      category: "Conference Paper"
    },
    {
      title: "Bachelor of Engineering (BSc) - Communications and Electronics",
      type: "Academic Achievement",
      institution: "Egyptian Academy for Engineering and Advanced Technology",
      period: "Oct 2018 - Jun 2023",
      gpa: "3.4146",
      grade: "Very Good with Honor",
      description: "Graduation Project: Smart Wearable Glasses for Autistic Kids (Excellent A+)",
      link: null,
      icon: GraduationCap,
      category: "Academic Excellence"
    },
    {
      title: "eCommerce Project Excellence",
      type: "Academic Achievement",
      institution: "AMIT Learning",
      period: "Oct 2023 - April 2024",
      grade: "100%",
      description: "Perfect score in Front-End Web Development Diploma project",
      link: null,
      icon: Trophy,
      category: "Project Excellence"
    }
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="honors-awards" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-tl from-accent/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ease-out ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <Trophy size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">Honors & Awards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Academic Excellence & Research
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Recognition of academic achievements, research contributions, and excellence in engineering and technology.
          </p>
        </div>

        <div 
          ref={contentRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 transition-all duration-1000 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {honors.map((honor, index) => {
            const Icon = honor.icon;
            const isExpanded = expandedCard === index;
            
            return (
              <div 
                key={index} 
                className={`group relative transition-all duration-700 ease-out ${
                  contentVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{transitionDelay: `${index * 0.15}s`}}
              >
                <div 
                  className={`relative bg-background/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg sm:hover:shadow-xl hover:shadow-accent/10 cursor-pointer ${
                    isExpanded ? 'ring-2 ring-accent/20 shadow-lg' : ''
                  }`}
                  onClick={() => toggleCard(index)}
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/15 to-accent/10 rounded-xl flex items-center justify-center shadow-sm border border-accent/20">
                      <Icon size={18} className="sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {honor.title}
                      </h3>
                      <p className="text-accent font-medium text-sm sm:text-base">
                        {honor.type}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {honor.journal && (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <FileText size={12} className="text-accent/60" />
                        <span className="font-medium">{honor.journal}</span>
                      </div>
                    )}
                    {honor.institution && (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <GraduationCap size={12} className="text-accent/60" />
                        <span className="font-medium">{honor.institution}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Star size={12} className="text-accent/60" />
                      <span className="font-medium">{honor.period}</span>
                    </div>
                    {honor.id && (
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <span className="bg-accent/10 text-accent px-2 py-1 rounded-full font-mono">
                          {honor.id}
                        </span>
                      </div>
                    )}
                    {(honor.gpa || honor.grade) && (
                      <div className="flex items-center gap-2">
                        <span className="bg-gradient-to-r from-accent/20 to-accent/10 text-accent px-3 py-1 rounded-full text-sm font-bold">
                          {honor.gpa ? `GPA: ${honor.gpa}` : honor.grade}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Expandable content */}
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="space-y-3 pt-4 border-t border-border/30">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {honor.description}
                      </p>
                      {honor.link && (
                        <a 
                          href={honor.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={14} />
                          View Publication
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Expand button */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-muted-foreground font-medium">
                      {honor.category}
                    </span>
                    <button className="p-1.5 rounded-md bg-accent/10 hover:bg-accent/20 transition-colors">
                      {isExpanded ? 
                        <Sparkles size={12} className="text-accent" /> : 
                        <Medal size={12} className="text-accent" />
                      }
                    </button>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/2 to-transparent rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom call-to-action */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-accent">Committed to excellence in research and development</span>
            <Trophy size={14} className="text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}; 