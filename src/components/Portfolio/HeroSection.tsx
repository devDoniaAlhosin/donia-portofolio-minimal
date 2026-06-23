import { Button } from '@/components/ui/button';
import { Phone, Linkedin, Github, ArrowDown, Code, Palette } from 'lucide-react';

const ScrollIndicator = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative flex h-11 w-3 items-start justify-center"
    aria-label="Scroll to about section"
  >
    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 rounded-full bg-accent/15 group-hover:bg-accent/30 transition-colors duration-500" />
    <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-accent/60 group-hover:bg-accent animate-scroll-dot-flow" />
  </button>
);

export const HeroSection = () => {
  const contactInfo = [
    { icon: Phone, text: '+20 106 164 2356', href: 'tel:+201061642356' },
    { icon: Linkedin, text: 'LinkedIn', href: 'https://www.linkedin.com/in/donia-alhosin-756a3b1ab/' },
    { icon: Github, text: 'GitHub', href: 'https://github.com/devDoniaAlhosin' },
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
    <section id="home" className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background pt-12 sm:pt-16 md:pt-14">
      {/* Modern background design */}
      <div className="absolute inset-0">
        <div className="absolute top-[12%] left-[8%] w-56 h-56 rounded-full bg-accent/[0.07] blur-3xl animate-hero-orb pointer-events-none" />
        <div className="absolute bottom-[18%] right-[6%] w-72 h-72 rounded-full bg-accent/[0.05] blur-3xl animate-hero-orb-delayed pointer-events-none" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,640px)] h-[min(70vh,480px)] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(var(--accent) / 0.04) 0%, transparent 70%)' }}
        />

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

         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                    Full Stack Developer
                  </p>
                  <div className="w-1 h-1 bg-accent/60 rounded-full"></div>
                </div>
                
                <p className="text-sm text-foreground/90 max-w-sm mx-auto leading-relaxed px-4">
                  React & Angular frontends, Laravel & PHP backends.
                </p>

                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  {['React', 'Laravel', 'PHP'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-accent/8 text-accent border border-accent/15 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

                                            {/* Mobile Contact info - modern layout */}
               <div className="grid grid-cols-2 gap-3 w-full max-w-md fade-in-up" style={{animationDelay: '0.5s'}}>
                 {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                                     const content = (
                     <div className="group flex items-center gap-2.5 px-3 py-3 rounded-xl bg-background/80 backdrop-blur-sm border border-border/60 hover:border-accent/50 hover:bg-background/90 transition-all duration-300 shadow-sm hover:shadow-md">
                       <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center group-hover:bg-accent/25 transition-colors flex-shrink-0">
                         <Icon size={14} className="text-accent/80 group-hover:text-accent transition-colors" />
                       </div>
                       <span className="text-xs text-foreground/90 group-hover:text-foreground transition-colors font-medium truncate">{item.text}</span>
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
                   className="min-w-[140px] sm:min-w-[160px] md:min-w-[180px] border-border hover:border-accent/50 hover:bg-accent/5 text-sm sm:text-base relative overflow-hidden group"
                   onClick={() => {
                     const link = document.createElement('a');
                      link.href = '/assets/DoniaAlhosin_resume.pdf';
                     link.download = 'DoniaAlhosin-Resume.pdf';
                     document.body.appendChild(link);
                     link.click();
                     document.body.removeChild(link);
                   }}
                 >
                   <span className="relative z-10 text-foreground group-hover:text-foreground transition-colors duration-300">
                     Download CV
                   </span>
                   <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                 </Button>
              </div>

              <div className="fade-in-up pt-6 pb-1" style={{ animationDelay: '0.9s' }}>
                <ScrollIndicator onClick={scrollToAbout} />
              </div>
            </div>
          </div>

         {/* Desktop Hero Section */}
         <div className="hidden md:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center w-full min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-6rem)]">
           {/* Left side - Main content */}
           <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-accent">Available for new projects</span>
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
                      <span className="font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                        DONIA
                      </span>
                      <span className="text-muted-foreground/80 ml-1 sm:ml-2 font-medium">ALHOSIN</span>
                    </h1>
                    <div className="absolute -bottom-1 left-0 w-16 h-0.5 bg-gradient-to-r from-accent/60 to-transparent rounded-full" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 lg:gap-3">
                <Code size={12} className="text-accent/60 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
                  Full Stack Developer
                </p>
                <Palette size={12} className="text-accent/60 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </div>
              
              <p className="text-xs sm:text-sm md:text-base text-foreground/85 max-w-lg mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                React & Angular frontends, Laravel & PHP backends.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {['React', 'Angular', 'Laravel', 'PHP'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-accent/8 text-accent border border-accent/15 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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
                className="min-w-[140px] sm:min-w-[160px] md:min-w-[180px] border-border hover:border-accent/50 hover:bg-accent/5 text-sm sm:text-base relative overflow-hidden group"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/assets/DoniaAlhosin_resume.pdf';
                  link.download = 'DoniaAlhosin-Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <span className="relative z-10 text-foreground group-hover:text-foreground transition-colors duration-300">
                  Download CV
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </Button>
            </div>
          </div>

                     {/* Right side - Visual element */}
           <div className="hidden lg:flex items-center justify-end w-full fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="relative animate-hero-card-float">
              <div className="absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl -z-10 pointer-events-none" />

              <div className="relative w-[18.5rem] xl:w-[21rem] h-[26rem] xl:h-[30rem] rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/14 via-background/50 to-accent/6 shadow-xl shadow-accent/10 backdrop-blur-sm overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-accent/5 pointer-events-none" />

                <div className="flex items-center gap-2 px-6 py-4 border-b border-accent/10 bg-white/25">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-auto text-[10px] font-medium text-muted-foreground/50 tracking-wide">portfolio.tsx</span>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-6 px-8 py-8">
                  <div className="w-16 h-16 bg-accent/15 rounded-2xl flex items-center justify-center border border-accent/20 shadow-sm">
                    <Code size={30} className="text-accent" />
                  </div>

                  <div className="space-y-3">
                    <div className="w-full h-2.5 bg-accent/20 rounded-full" />
                    <div className="w-[92%] h-2.5 bg-accent/16 rounded-full" />
                    <div className="w-[78%] h-2.5 bg-accent/12 rounded-full" />
                    <div className="w-[65%] h-2.5 bg-accent/10 rounded-full" />
                  </div>

                  <div className="rounded-xl border border-accent/15 bg-accent/[0.06] p-4 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                      <span className="text-[11px] font-medium text-accent/80">Full Stack Developer</span>
                    </div>
                    <div className="w-full h-1.5 bg-accent/15 rounded-full" />
                    <div className="w-4/5 h-1.5 bg-accent/10 rounded-full" />
                  </div>
                </div>

                <div className="px-8 py-5 border-t border-accent/10 bg-white/10 flex flex-wrap gap-2">
                  {['React', 'Angular', 'Laravel', 'PHP'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] rounded-md bg-accent/12 text-accent font-medium border border-accent/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-11 h-11 bg-accent/15 rounded-xl rotate-12 border border-accent/10 backdrop-blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-9 h-9 bg-accent/10 rounded-lg -rotate-6 border border-accent/10" />
              <div className="absolute top-1/3 -right-7 w-7 h-7 bg-accent/8 rounded-lg rotate-45 border border-accent/10" />
            </div>
                     </div>
         </div>
      </div>

      <div className="hidden md:block absolute bottom-2 lg:bottom-4 left-1/2 -translate-x-1/2 fade-in-up z-10" style={{ animationDelay: '1s' }}>
        <ScrollIndicator onClick={scrollToAbout} />
      </div>
    </section>
  );
};