import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { SocialLinks } from '@/components/ui/SocialLinks';
import personalData from '@/data/personal.json';

const navItems = personalData.navigation;
const socialLinks = personalData.social;

const leftNavItems = navItems.slice(0, 2);
const rightNavItems = navItems.slice(2, 4);

const glassShell = (scrolled: boolean) =>
  [
    'relative overflow-hidden rounded-2xl transition-all duration-500 ease-out',
    'border border-white/30 dark:border-white/10',
    'bg-white/55 dark:bg-background/40',
    'backdrop-blur-2xl backdrop-saturate-150',
    'shadow-[0_4px_24px_-4px_hsl(var(--accent)/0.12),0_8px_32px_-8px_rgba(0,0,0,0.08)]',
    scrolled
      ? 'shadow-[0_8px_40px_-8px_hsl(var(--accent)/0.18),0_12px_48px_-12px_rgba(0,0,0,0.12)] border-accent/25 bg-white/70 dark:bg-background/55'
      : '',
  ].join(' ');

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isNavActive = (href: string) => {
    if (href.startsWith('/projects')) {
      return location.pathname === '/projects' || location.pathname.startsWith('/projects/');
    }
    if (href.startsWith('/')) return location.pathname === href;
    if (href.startsWith('#')) {
      return location.pathname === '/' && location.hash === href;
    }
    return false;
  };

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate({ pathname: '/', hash: href.slice(1) });
        return;
      }
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    navigate(href);
  };

  const navLinkClass = (href: string) => {
    const active = isNavActive(href);
    return [
      'relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300',
      active
        ? 'text-accent bg-accent/10 shadow-sm'
        : 'text-foreground/80 hover:text-accent hover:bg-white/40 dark:hover:bg-white/5',
    ].join(' ');
  };

  const GlassLayers = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/20 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-transparent pointer-events-none" />
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none" />
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 sm:pt-4">
        {/* Desktop */}
        <div className={`hidden md:block pointer-events-auto ${glassShell(isScrolled)}`}>
          <GlassLayers />
          <div className="relative flex items-center justify-between h-[4.25rem] px-6 lg:px-8">
            <div className="flex items-center gap-1">
              {leftNavItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={navLinkClass(item.href)}
                >
                  {item.name}
                  {isNavActive(item.href) && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="group flex-shrink-0 rounded-xl p-1 transition-transform duration-300 hover:scale-105"
              aria-label="Go to home"
            >
              <Logo size="lg" />
            </button>

            <div className="flex items-center gap-1">
              {rightNavItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={navLinkClass(item.href)}
                >
                  {item.name}
                  {isNavActive(item.href) && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                </button>
              ))}
              <Button
                variant="cta"
                size="sm"
                className="ml-2 h-9 px-4 rounded-xl shadow-md shadow-accent/20"
                onClick={() => scrollToSection('#contact')}
              >
                Contact
                <ArrowUpRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className={`md:hidden pointer-events-auto ${glassShell(isScrolled)}`}>
          <GlassLayers />
          <div className="relative flex items-center justify-between h-14 px-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-lg transition-transform hover:scale-[1.02]"
              aria-label="Go to home"
            >
              <Logo size="md" showFullName />
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 w-10 h-10 rounded-xl bg-white/30 hover:bg-white/50 border border-white/30 backdrop-blur-sm"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pointer-events-auto">
          <button
            type="button"
            className="absolute inset-0 bg-primary/20 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />

          <div className="absolute top-[4.75rem] left-4 right-4 animate-slideDown">
            <div className={`${glassShell(true)} max-h-[calc(100vh-6rem)] overflow-y-auto`}>
              <GlassLayers />
              <div className="relative p-5">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full text-left px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        isNavActive(item.href)
                          ? 'text-accent bg-accent/10 border border-accent/20'
                          : 'text-foreground hover:text-accent hover:bg-white/40 border border-transparent'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isNavActive(item.href) ? 'bg-accent scale-125' : 'bg-accent/40'
                        }`}
                      />
                      {item.name}
                    </button>
                  ))}
                </div>

                <Button
                  variant="cta"
                  className="w-full mt-4 h-11 rounded-xl shadow-lg shadow-accent/20"
                  onClick={() => scrollToSection('#contact')}
                >
                  Get in Touch
                  <ArrowUpRight size={16} className="ml-2" />
                </Button>

                <div className="mt-6 pt-5 border-t border-white/30">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                    Connect
                  </p>
                  <SocialLinks links={socialLinks} size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
