import { Mail, Linkedin, Github, Heart, ArrowUp, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export const Footer = () => {
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { elementRef: bottomRef, isVisible: bottomVisible } = useScrollAnimation();
  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/donia-alhosin",
      color: "hover:text-blue-400"
    },
    {
      icon: Github,
      label: "GitHub", 
      href: "https://github.com/donia-alhosin",
      color: "hover:text-gray-300"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:donia.alhosin@email.com",
      color: "hover:text-red-400"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Top Border with Gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Main Content */}
        <div 
          ref={contentRef}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 transition-all duration-1000 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* About Me */}
          <div className={`lg:col-span-1 transition-all duration-700 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`} style={{transitionDelay: '0.2s'}}>
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mr-4 border border-accent/20">
                  <span className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">DA</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                  <Sparkles size={8} className="text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                  Donia Alhosin
                </h3>
                <p className="text-primary-foreground/60 text-sm font-medium">WordPress Developer</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed text-lg">
              Passionate WordPress developer creating modern, responsive websites 
              that deliver exceptional user experiences and drive business success.
            </p>
            <div className="mt-6 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-primary-foreground/60">Available for new projects</span>
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Social Links */}
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
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`group relative w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center hover:bg-accent/20 hover:scale-110 transition-all duration-300 border border-primary-foreground/10 hover:border-accent/30 ${link.color}`}
                    aria-label={link.label}
                  >
                    <Icon size={22} className="transition-colors" />
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background text-foreground text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg border border-accent/20">
                      {link.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background"></div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
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
            {/* Copyright */}
            <div className="flex items-center text-primary-foreground/60">
              <span className="font-medium">© {new Date().getFullYear()} Donia Alhosin Mohamed. All rights reserved.</span>
            </div>

            {/* Back to Top Button */}
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