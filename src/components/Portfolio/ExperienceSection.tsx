import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Star, Award, TrendingUp, Users } from 'lucide-react';

export const ExperienceSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const experiences = [
    {
      title: "Senior WordPress Developer",
      company: "Freelance",
      period: "2022 - Present",
      location: "Remote",
      type: "Full-time",
      achievements: [
        "Delivered 30+ custom WordPress websites for diverse clients",
        "Specialized in e-commerce solutions using WooCommerce",
        "Achieved 98% client satisfaction rate with on-time delivery"
      ],
      skills: ["WordPress", "WooCommerce", "PHP", "JavaScript", "CSS3"],
      icon: Briefcase,
      stats: { projects: 30, satisfaction: 98, clients: 25 }
    },
    {
      title: "Web Developer",
      company: "Digital Agency",
      period: "2021 - 2022",
      location: "Cairo, Egypt",
      type: "Full-time",
      achievements: [
        "Developed responsive websites using modern web technologies",
        "Collaborated with design team to implement pixel-perfect UIs",
        "Optimized website performance improving load times by 40%"
      ],
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Performance"],
      icon: TrendingUp,
      stats: { projects: 15, performance: 40, team: 8 }
    },
    {
      title: "Junior Web Developer",
      company: "Tech Startup",
      period: "2020 - 2021",
      location: "Remote",
      type: "Full-time",
      achievements: [
        "Built interactive web applications using React and JavaScript",
        "Maintained and updated existing WordPress installations",
        "Learned best practices in version control and team collaboration"
      ],
      skills: ["React", "JavaScript", "WordPress", "Git", "Teamwork"],
      icon: Users,
      stats: { projects: 12, learning: 100, collaboration: 5 }
    }
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="experience" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-tl from-accent/3 to-transparent rounded-full blur-3xl"></div>
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
              <Briefcase size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            My Professional Journey
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            A timeline of my growth in web development and WordPress expertise, showcasing key achievements and milestones.
          </p>
        </div>

        <div 
          ref={contentRef}
          className={`space-y-6 sm:space-y-8 transition-all duration-1000 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
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
                {/* Timeline connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-3 sm:left-6 top-12 sm:top-16 w-0.5 h-6 sm:h-8 bg-accent/20"></div>
                )}

                <div 
                  className={`relative bg-background/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-lg sm:hover:shadow-xl hover:shadow-accent/10 cursor-pointer ${
                    isExpanded ? 'ring-2 ring-accent/20 shadow-lg' : ''
                  }`}
                  onClick={() => toggleCard(index)}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 sm:left-4 top-4 sm:top-6 w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full border-2 border-background shadow-sm"></div>

                  {/* Header */}
                  <div className="ml-6 sm:ml-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center shadow-sm">
                          <Icon size={16} className="sm:w-5 sm:h-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300 truncate">
                            {exp.title}
                          </h3>
                          <p className="text-accent font-medium text-sm sm:text-base truncate">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <div className="text-left sm:text-right">
                          <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
                            <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
                            <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        <button className="p-1 sm:p-1.5 rounded-md bg-accent/10 hover:bg-accent/20 transition-colors">
                          {isExpanded ? <ChevronUp size={12} className="sm:w-3.5 sm:h-3.5 text-accent" /> : <ChevronDown size={12} className="sm:w-3.5 sm:h-3.5 text-accent" />}
                        </button>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                      {Object.entries(exp.stats).map(([key, value]) => (
                        <div key={key} className="text-center p-2 sm:p-3 bg-background/50 rounded-lg border border-border/30">
                          <div className="text-lg sm:text-2xl font-bold text-accent">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Expandable content */}
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="space-y-3 pt-4 border-t border-border/30">
                        <h4 className="font-semibold text-primary flex items-center gap-2 text-sm sm:text-base">
                          <Star size={14} className="sm:w-3.5 sm:h-3.5 text-accent" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-muted-foreground flex items-start gap-3 text-xs sm:text-sm">
                              <div className="w-1 h-1 bg-accent rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
            <span className="text-sm font-semibold text-accent">Ready to work together?</span>
            <ChevronDown size={14} className="sm:w-3.5 sm:h-3.5 text-accent animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};