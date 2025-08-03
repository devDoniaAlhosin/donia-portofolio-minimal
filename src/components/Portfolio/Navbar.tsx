import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { SocialLinks } from '@/components/ui/SocialLinks';
import personalData from '@/data/personal.json';

const navItems = personalData.navigation;
const socialLinks = personalData.social;

const leftNavItems = navItems.slice(0, 2);
const rightNavItems = navItems.slice(2, 4);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="hidden md:block mt-4">
          <div className={`max-w-4xl mx-auto rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? 'bg-background/95 backdrop-blur-md border-accent/20 shadow-lg'
              : 'bg-background/80 backdrop-blur-sm border-accent/10'
          }`}>
            <div className="flex items-center justify-between h-16 px-8">
              <div className="flex items-center space-x-8">
                {leftNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="nav-link text-foreground hover:text-accent font-medium"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <Logo size="lg" />

              <div className="flex items-center space-x-8">
                {rightNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="nav-link text-foreground hover:text-accent font-medium"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className={`flex items-center justify-between h-16 mx-3 mt-4 rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md border-accent/20 shadow-lg'
              : 'bg-white/90 backdrop-blur-sm border-accent/10'
          }`}>
            <div className="flex items-center justify-between w-full px-2">
              <Logo size="md" showFullName={true} />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40">
              <div className="absolute top-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-accent/20 animate-slideDown">
                <div className="flex justify-end p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-12 h-12 bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-xl transition-all duration-300 hover:scale-110"
                  >
                    <X size={20} className="text-accent" />
                  </Button>
                </div>

                <div className="px-6 pb-8">
                  <div className="space-y-2">
                    {navItems.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="w-full text-left px-4 py-4 text-lg font-medium text-foreground hover:text-accent hover:bg-accent/10 rounded-xl transition-all duration-300 flex items-center group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-2 h-2 bg-accent/50 rounded-full mr-4 group-hover:bg-accent group-hover:scale-125 transition-all duration-300"></div>
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-8 border-t border-accent/20 pt-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Connect With Me
                  </h3>
                  <SocialLinks links={socialLinks} size="md" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};