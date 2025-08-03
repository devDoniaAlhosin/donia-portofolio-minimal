import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, Award, ChevronDown, ChevronUp, Star, GraduationCap, Sparkles, Zap } from 'lucide-react';

export const CoursesSection = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const courses = [
    {
      name: "Advanced WordPress Development",
      provider: "WordPress Academy",
      period: "Jan 2023 - Mar 2023",
      duration: "3 months",
      certificate: "Advanced Certification",
      progress: 100,
      skillsGained: [
        "Custom plugin development and WordPress hooks",
        "Advanced theme customization and child themes",
        "WordPress REST API integration and custom endpoints",
        "Performance optimization and caching strategies"
      ],
      icon: BookOpen,
      level: "Advanced",
      rating: 4.9
    },
    {
      name: "React & Modern JavaScript",
      provider: "Frontend Masters",
      period: "Sep 2022 - Dec 2022",
      duration: "4 months",
      certificate: "Professional Certification",
      progress: 100,
      skillsGained: [
        "React Hooks and Context API for state management",
        "Modern ES6+ JavaScript features and async programming",
        "Component-based architecture and reusable design patterns",
        "Testing with Jest and React Testing Library"
      ],
      icon: Zap,
      level: "Intermediate",
      rating: 4.8
    },
    {
      name: "UI/UX Design Fundamentals",
      provider: "Design Institute",
      period: "May 2022 - Aug 2022",
      duration: "4 months",
      certificate: "Design Certification",
      progress: 100,
      skillsGained: [
        "User research methods and persona development",
        "Wireframing and prototyping with Figma",
        "Color theory, typography, and visual hierarchy",
        "Usability testing and accessibility best practices"
      ],
      icon: Award,
      level: "Intermediate",
      rating: 4.7
    },
    {
      name: "Full-Stack Web Development",
      provider: "Code Academy",
      period: "Jan 2021 - Jun 2021",
      duration: "6 months",
      certificate: "Full-Stack Certification",
      progress: 100,
      skillsGained: [
        "Frontend development with HTML5, CSS3, and JavaScript",
        "Backend development with Node.js and Express",
        "Database design and management with MySQL",
        "Version control with Git and collaborative development"
      ],
      icon: GraduationCap,
      level: "Beginner to Intermediate",
      rating: 4.6
    },
    {
      name: "Responsive Web Design Certification",
      provider: "freeCodeCamp",
      period: "Aug 2020 - Dec 2020",
      duration: "5 months",
      certificate: "Responsive Design Certification",
      progress: 100,
      skillsGained: [
        "Mobile-first responsive design principles",
        "CSS Grid and Flexbox for modern layouts",
        "CSS animations and transitions",
        "Cross-browser compatibility and web standards"
      ],
      icon: Star,
      level: "Beginner",
      rating: 4.5
    }
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Scroll-based active timeline
  useEffect(() => {
    const handleScroll = () => {
      const courseElements = document.querySelectorAll('[data-course-index]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      courseElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="courses" className="py-16 sm:py-20 relative overflow-hidden">
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
              <BookOpen size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">Courses & Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            My Learning Journey
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Continuous learning and skill development through professional courses and certifications that shape my expertise.
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
          {courses.map((course, index) => {
            const Icon = course.icon;
            const isExpanded = expandedCard === index;
            const isActive = activeIndex === index;
            const isPast = index < activeIndex;
            
            return (
              <div 
                key={index} 
                data-course-index={index}
                className={`group relative transition-all duration-700 ease-out ${
                  contentVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{transitionDelay: `${index * 0.15}s`}}
              >
                {/* Active timeline line */}
                {index < courses.length - 1 && (
                  <div className="absolute left-3 sm:left-6 top-12 sm:top-16 w-0.5 h-6 sm:h-8 transition-all duration-500 ease-out"
                       style={{
                         background: isActive 
                           ? 'linear-gradient(to bottom, hsl(var(--accent)), hsl(var(--accent) / 0.3))'
                           : isPast
                           ? 'linear-gradient(to bottom, hsl(var(--accent)), hsl(var(--accent) / 0.1))'
                           : 'hsl(var(--accent) / 0.1)'
                       }}>
                  </div>
                )}

                <div 
                  className={`relative bg-background/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg sm:rounded-xl border transition-all duration-500 ease-out hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-lg sm:hover:shadow-xl hover:shadow-accent/10 cursor-pointer ${
                    isActive 
                      ? 'border-accent/50 shadow-lg shadow-accent/20 ring-2 ring-accent/30' 
                      : isPast
                      ? 'border-accent/20 shadow-md'
                      : 'border-border/50 hover:border-accent/30'
                  } ${isExpanded ? 'ring-2 ring-accent/20 shadow-lg' : ''}`}
                  onClick={() => toggleCard(index)}
                >
                  {/* Active timeline dot */}
                  <div className={`absolute left-2 sm:left-4 top-4 sm:top-6 w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-background transition-all duration-500 ease-out ${
                    isActive 
                      ? 'bg-accent scale-125 shadow-lg shadow-accent/50' 
                      : isPast
                      ? 'bg-accent/60 scale-110'
                      : 'bg-accent/30'
                  }`}>
                    {isActive && (
                      <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="ml-6 sm:ml-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-3 sm:gap-0">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center shadow-sm transition-all duration-500 ease-out ${
                          isActive ? 'scale-110 shadow-md' : ''
                        }`}>
                          <Icon size={16} className="sm:w-5 sm:h-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-base sm:text-lg font-bold transition-all duration-300 truncate ${
                            isActive ? 'text-accent' : 'text-primary group-hover:text-accent'
                          }`}>
                            {course.name}
                          </h3>
                          <p className="text-accent font-medium text-sm sm:text-base truncate">
                            {course.provider}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <div className="text-left sm:text-right">
                          <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
                            <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span>{course.period}</span>
                          </div>
                        </div>
                        <button className={`p-1 sm:p-1.5 rounded-md transition-all duration-300 ${
                          isActive ? 'bg-accent/20 hover:bg-accent/30' : 'bg-accent/10 hover:bg-accent/20'
                        }`}>
                          {isExpanded ? <ChevronUp size={12} className="sm:w-3.5 sm:h-3.5 text-accent" /> : <ChevronDown size={12} className="sm:w-3.5 sm:h-3.5 text-accent" />}
                        </button>
                      </div>
                    </div>

                    {/* Responsive stats */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                        isActive ? 'bg-accent/20 text-accent' : 'bg-accent/10 text-accent'
                      }`}>
                        {course.level}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="sm:w-3 sm:h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground">{course.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{course.duration}</span>
                    </div>

                    {/* Expandable content */}
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="space-y-3 pt-3 sm:pt-4 border-t border-border/30">
                        <h4 className="font-semibold text-primary flex items-center gap-2 text-sm sm:text-base">
                          <Sparkles size={12} className="sm:w-3.5 sm:h-3.5 text-accent" />
                          Skills Gained
                        </h4>
                        <ul className="space-y-2">
                          {course.skillsGained.map((skill, skillIndex) => (
                            <li key={skillIndex} className="text-muted-foreground flex items-start gap-2 text-xs sm:text-sm">
                              <div className="w-1 h-1 bg-accent rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Active hover overlay */}
                  <div className={`absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-accent/5 to-transparent' 
                      : 'bg-gradient-to-br from-accent/2 to-transparent'
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom call-to-action */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg sm:rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold text-accent">Always learning, always growing</span>
            <BookOpen size={12} className="sm:w-3.5 sm:h-3.5 text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
};