import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Star, TrendingUp, Users } from 'lucide-react';

export const ExperienceSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeStat, setActiveStat] = useState(0);
  
  const experiences = [
    {
      title: "Software Developer",
      company: "BohemianGeeks Marketing Agency",
      period: "January 2025 - Present",
      location: "New Cairo, Egypt",
      type: "Full-time",
             achievements: [
         "Built custom WordPress and React-based websites aligned with client business goals",
         "Delivered scalable e-commerce solutions with WooCommerce and tailored checkout flows",
         "Improved plugin behavior and site performance through targeted optimizations",
         "Implemented responsive, modern interfaces with accessibility and UX best practices"
       ],
      skills: ["PHP", "JavaScript", "WordPress", "HTML5", "CSS3", "WooCommerce", "RankMath", "Performance"],
      icon: Briefcase
    },
    {
      title: "Software Developer",
      company: "Upwork Freelancer",
      period: "January 2025 - Present",
      location: "Remote",
      type: "Freelance",
      achievements: [
        "Delivered production-ready web solutions for international clients across multiple industries",
        "Developed custom WordPress implementations and reusable React UI components",
        "Maintained a 100% project completion record with clear communication and ownership",
        "Managed end-to-end delivery from scoping and implementation to post-launch support"
      ],
      skills: ["WordPress", "WooCommerce", "PHP", "JavaScript", "CSS3", "Client Management", "React"],
      icon: TrendingUp
    },
    {
      title: "WordPress Instructor",
      company: "ITI (Information Technology Institute)",
      period: "July 2025 - Present",
      location: "New Capital, Egypt",
      type: "Part-time",
      achievements: [
        "Taught WordPress development fundamentals through practical, project-based sessions",
        "Designed structured learning materials and hands-on technical labs",
        "Mentored students on coding standards, debugging, and real-world workflows",
        "Guided learners to ship complete portfolio-ready WordPress projects"
      ],
      skills: ["WordPress", "Teaching", "Mentoring", "Education"],
      icon: Users
    }
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const stats = [
    {
      label: 'Projects Delivered',
      value: '50+',
      description: 'Web builds delivered from concept to launch.',
      progress: 88,
      icon: Briefcase
    },
    {
      label: 'Client Satisfaction',
      value: '98%',
      description: 'Consistently positive client feedback and outcomes.',
      progress: 98,
      icon: TrendingUp
    },
    {
      label: 'Delivery Reliability',
      value: '100%',
      description: 'Projects completed with strong ownership and consistency.',
      progress: 100,
      icon: Star
    }
  ];

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
          className={`text-left sm:text-center mb-12 sm:mb-20 transition-all duration-1000 ease-out ${
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
            Experience That Drives Results
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            A focused timeline of software development work across product delivery, freelance execution, and technical mentoring.
          </p>
        </div>

        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              const isActive = activeStat === index;

              return (
                <button
                  key={stat.label}
                  type="button"
                  onClick={() => setActiveStat(index)}
                  onMouseEnter={() => setActiveStat(index)}
                  className={`relative text-left rounded-xl border p-4 transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'border-accent/50 bg-accent/10 shadow-lg shadow-accent/10 -translate-y-0.5'
                      : 'border-border/60 bg-background/60 backdrop-blur-sm hover:border-accent/30 hover:bg-background/80'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-accent/20' : 'bg-accent/10'}`}>
                      <StatIcon size={16} className="text-accent" />
                    </div>
                  </div>

                  <div className="relative z-10 mt-4">
                    <div className="h-1.5 rounded-full bg-accent/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-700 ease-out"
                        style={{ width: `${isActive ? stat.progress : Math.max(20, stat.progress - 25)}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-muted-foreground">
            {stats[activeStat].description}
          </div>
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
                          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-accent mb-1.5">
                            {exp.type}
                          </span>
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
        <div className="mt-12 sm:mt-16 text-left sm:text-center">
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