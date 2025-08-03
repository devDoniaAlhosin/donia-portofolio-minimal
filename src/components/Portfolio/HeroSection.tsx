import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Linkedin, Github, ArrowDown, Code, Palette } from 'lucide-react';

export const HeroSection = () => {
  const contactInfo = [
    { icon: MapPin, text: 'Egypt', href: null },
    { icon: Phone, text: '+20 106 164 2356', href: 'tel:+201061642356' },
    { icon: Mail, text: 'donia.alhosin@email.com', href: 'mailto:donia.alhosin@email.com' },
    { icon: Linkedin, text: 'LinkedIn', href: 'https://linkedin.com/in/donia-alhosin' },
    { icon: Github, text: 'GitHub', href: 'https://github.com/donia-alhosin' },
  ];

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-12 sm:pt-16 md:pt-14">
      {/* Modern background design */}
      <div className="absolute inset-0">
        {/* Geometric background elements - reduced for mobile */}
        <div className="absolute top-0 left-0 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-gradient-to-br from-accent/4 to-transparent rounded-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-gradient-to-bl from-accent/3 to-transparent rounded-2xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-gradient-to-tr from-accent/3 to-transparent rounded-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-28 sm:w-40 md:w-56 h-28 sm:h-40 md:h-56 bg-gradient-to-tl from-accent/2 to-transparent rounded-2xl transform translate-x-1/2 translate-y-1/2"></div>
        
        {/* Accent elements - smaller for mobile */}
        <div className="absolute top-1/3 left-1/4 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-accent/6 rounded-xl transform rotate-6"></div>
        <div className="absolute top-1/2 right-1/4 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-accent/4 rounded-lg transform -rotate-3"></div>
        <div className="absolute bottom-1/3 left-1/3 w-14 sm:w-20 md:w-28 h-14 sm:h-20 md:h-28 bg-accent/5 rounded-xl transform rotate-12"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)`,
               backgroundSize: '32px 32px'
             }}></div>
      </div>

         <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
                   {/* Mobile-only Hero Section */}
          <div className="block md:hidden">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] space-y-8 pt-16">
              {/* Mobile Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-accent">Available for new projects</span>
              </div>

              {/* Mobile Name and title */}
              <div className="text-center space-y-6 fade-in-up" style={{animationDelay: '0.3s'}}>
                                 <div className="space-y-3">
                   <h1 className="text-4xl font-light text-primary leading-tight">
                     <span className="text-sm font-medium text-muted-foreground/60 tracking-wide uppercase mr-2">I'm</span>
                     <span className="font-bold bg-gradient-to-r from-primary via-primary to-accent/80 bg-clip-text text-transparent">DONIA</span>
                     <span className="text-muted-foreground/70 ml-3 font-medium">ALHOSIN</span>
                   </h1>
                 </div>
                
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1 h-1 bg-accent/60 rounded-full"></div>
                  <p className="text-base text-muted-foreground font-medium">
                    Web Developer & UI Specialist
                  </p>
                  <div className="w-1 h-1 bg-accent/60 rounded-full"></div>
                </div>
                
                <p className="text-sm text-muted-foreground/70 max-w-sm mx-auto leading-relaxed px-4">
                  Creating modern, responsive websites with exceptional user experiences
                </p>
              </div>

                                            {/* Mobile Contact info - modern layout */}
               <div className="grid grid-cols-2 gap-3 w-full max-w-md fade-in-up" style={{animationDelay: '0.5s'}}>
                 {contactInfo.filter(item => item.text !== 'Egypt').map((item, index) => {
                  const Icon = item.icon;
                                     const content = (
                     <div className="group flex items-center gap-2.5 px-4 py-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border/60 hover:border-accent/50 hover:bg-background/90 transition-all duration-300 shadow-sm hover:shadow-md">
                       <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center group-hover:bg-accent/25 transition-colors">
                         <Icon size={14} className="text-accent/80 group-hover:text-accent transition-colors" />
                       </div>
                       <span className="text-xs text-foreground/90 group-hover:text-foreground transition-colors font-medium">{item.text}</span>
                     </div>
                   );

                  return item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="interactive"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

                             {/* Mobile CTA buttons - modern layout */}
               <div className="flex flex-row gap-3 justify-center w-full max-w-md fade-in-up" style={{animationDelay: '0.7s'}}>
                                 <Button 
                   variant="cta" 
                   size="default"
                   onClick={scrollToProjects}
                   className="flex-1 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground text-sm font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                 >
                   <span>View Projects</span>
                   <ArrowDown size={14} className="ml-2" />
                 </Button>
                 <Button 
                   variant="outline" 
                   size="default"
                   className="flex-1 border-2 border-border hover:border-accent hover:bg-accent/10 hover:text-accent text-sm font-semibold py-3 rounded-xl transition-all duration-300"
                   onClick={() => {
                     window.open('/cv-donia-alhosin.pdf', '_blank');
                   }}
                 >
                   Download CV
                 </Button>
              </div>

              {/* Mobile Scroll indicator */}
              <div className="fade-in-up" style={{animationDelay: '0.9s'}}>
                <button 
                  onClick={scrollToAbout}
                  className="group"
                  aria-label="Scroll to about section"
                >
                  <div className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-accent transition-colors">
                    <span className="text-xs font-semibold tracking-wider uppercase">Scroll</span>
                    <div className="w-4 h-6 border-2 border-current rounded-full flex justify-center group-hover:border-accent transition-colors">
                      <div className="w-0.5 h-1.5 bg-current rounded-full mt-1.5 animate-pulse group-hover:bg-accent transition-colors"></div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

         {/* Desktop Hero Section */}
         <div className="hidden md:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-6rem)]">
           {/* Left side - Main content */}
           <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">Available for new projects</span>
            </div>

            {/* Name and title */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground/60 font-medium">
                  I'm 
                </p>
                <div className="inline-block">
                  <div className="relative group">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary leading-tight">
                      <span className="font-semibold bg-gradient-to-r from-primary to-accent/80 bg-clip-text text-transparent animate-pulse" style={{animationDuration: '3s'}}>DONIA</span>
                      <span className="text-muted-foreground/80 ml-1 sm:ml-2 font-medium animate-pulse" style={{animationDuration: '3s', animationDelay: '0.5s'}}>ALHOSIN</span>
                    </h1>
                    {/* Animated underline accent */}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 sm:h-1 bg-gradient-to-r from-accent/60 via-accent/40 to-transparent rounded-full group-hover:w-full transition-all duration-1000 ease-out"></div>
                    {/* Floating accent dots */}
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-accent/60 rounded-full animate-bounce" style={{animationDuration: '2s'}}></div>
                    <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-accent/40 rounded-full animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 lg:gap-3">
                <Code size={12} className="text-accent/60 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                  Web Developer & UI Specialist
                </p>
                <Palette size={12} className="text-accent/60 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </div>
              
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground/70 max-w-lg mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                Creating modern, responsive websites with exceptional user experiences
              </p>
            </div>

            {/* Contact info - improved mobile layout */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 fade-in-up" style={{animationDelay: '0.6s'}}>
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div className="group flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-card/40 border border-border/30 hover:border-accent/40 hover:bg-card/60 transition-all duration-300">
                    <Icon size={10} className="text-accent/70 group-hover:text-accent transition-colors sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                    <span className="text-xs sm:text-sm text-foreground/80 group-hover:text-foreground transition-colors">{item.text}</span>
                  </div>
                );

                return item.href ? (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="interactive"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* CTA buttons - improved mobile layout */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 lg:gap-4 justify-center lg:justify-start fade-in-up" style={{animationDelay: '0.8s'}}>
              <Button 
                variant="cta" 
                size="default"
                onClick={scrollToProjects}
                className="min-w-[140px] sm:min-w-[160px] md:min-w-[180px] bg-accent hover:bg-accent/90 text-accent-foreground text-sm sm:text-base"
              >
                View Projects
                <ArrowDown size={12} className="ml-1.5 sm:ml-2 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="default"
                className="min-w-[140px] sm:min-w-[160px] md:min-w-[180px] border-border hover:border-accent/50 hover:bg-accent/5 text-sm sm:text-base"
                onClick={() => {
                  window.open('/cv-donia-alhosin.pdf', '_blank');
                }}
              >
                Download CV
              </Button>
            </div>
          </div>

                     {/* Right side - Visual element */}
           <div className="hidden lg:flex items-center justify-center fade-in-up" style={{animationDelay: '0.5s'}}>
            <div className="relative">
              {/* Main visual box */}
              <div className="w-72 lg:w-80 h-72 lg:h-80 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl border border-accent/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-14 lg:w-16 h-14 lg:h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto">
                    <Code size={28} className="text-accent lg:w-8 lg:h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-28 lg:w-32 h-1.5 lg:h-2 bg-accent/20 rounded-full"></div>
                    <div className="w-20 lg:w-24 h-1.5 lg:h-2 bg-accent/15 rounded-full"></div>
                    <div className="w-24 lg:w-28 h-1.5 lg:h-2 bg-accent/10 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-3 lg:-top-4 -right-3 lg:-right-4 w-8 lg:w-12 h-8 lg:h-12 bg-accent/15 rounded-xl transform rotate-12"></div>
              <div className="absolute -bottom-3 lg:-bottom-4 -left-3 lg:-left-4 w-6 lg:w-10 h-6 lg:h-10 bg-accent/10 rounded-lg transform -rotate-6"></div>
              <div className="absolute top-1/2 -right-6 lg:-right-8 w-6 lg:w-8 h-6 lg:h-8 bg-accent/8 rounded-lg transform rotate-45"></div>
            </div>
                     </div>
         </div>

         {/* Desktop Scroll indicator */}
         <div className="hidden md:block absolute bottom-3 sm:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 fade-in-up" style={{animationDelay: '1s'}}>
           <button 
             onClick={scrollToAbout}
             className="group"
             aria-label="Scroll to about section"
           >
             <div className="flex flex-col items-center gap-1 sm:gap-1.5 lg:gap-2 text-muted-foreground/60 hover:text-accent transition-colors">
               <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
               <div className="w-3.5 sm:w-4 lg:w-5 h-5 sm:h-6 lg:h-8 border border-current rounded-full flex justify-center">
                 <div className="w-0.5 h-1 sm:h-1.5 lg:h-2 bg-current rounded-full mt-1 sm:mt-1.5 lg:mt-2 animate-pulse"></div>
               </div>
             </div>
           </button>
         </div>
      </div>
    </section>
  );
};