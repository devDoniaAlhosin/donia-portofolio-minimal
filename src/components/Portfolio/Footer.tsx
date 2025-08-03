import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Logo } from '@/components/ui/Logo';
import { SocialLinks } from '@/components/ui/SocialLinks';
import personalData from '@/data/personal.json';

export const Footer = () => {
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { elementRef: bottomRef, isVisible: bottomVisible } = useScrollAnimation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <div 
          ref={contentRef}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 transition-all duration-1000 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`lg:col-span-1 transition-all duration-700 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`} style={{transitionDelay: '0.2s'}}>
            <div className="flex items-center mb-6">
              <Logo size="lg" className="mr-4" />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                  {personalData.name}
                </h3>
                <p className="text-primary-foreground/60 text-sm font-medium">{personalData.title}</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed text-md">
              {personalData.description}
            </p>
            <div className="mt-6 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-primary-foreground/60">Available for new projects</span>
            </div>
          </div>

          <div className={`lg:col-span-1 transition-all duration-700 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`} style={{transitionDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['Home', 'About', 'Skills', 'Experience', 'Courses', 'Projects'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group text-left text-primary-foreground/70 hover:text-accent transition-all duration-300 hover:translate-x-1 flex items-center"
                >
                  <span className="w-2 h-2 bg-accent/50 rounded-full mr-3 group-hover:bg-accent transition-colors group-hover:scale-125"></span>
                  <span className="font-medium">{item}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-1 transition-all duration-700 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`} style={{transitionDelay: '0.6s'}}>
            <h3 className="text-xl font-semibold mb-6 relative">
              Connect With Me
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-accent to-transparent"></div>
            </h3>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Let's work together to bring your ideas to life. 
              I'm always excited to collaborate on new projects.
            </p>
            <SocialLinks links={personalData.social} size="md" />
          </div>
        </div>

        <div 
          ref={bottomRef}
          className={`border-t border-primary-foreground/10 pt-8 transition-all duration-1000 ease-out ${
            bottomVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '0.8s'}}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center text-primary-foreground/60">
              <span className="font-medium">© {new Date().getFullYear()} {personalData.name} Mohamed. All rights reserved.</span>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 bg-accent/20 hover:bg-accent/30 text-accent px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 border border-accent/30 hover:shadow-lg hover:shadow-accent/20"
            >
              <span className="text-sm font-semibold">Back to Top</span>
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};