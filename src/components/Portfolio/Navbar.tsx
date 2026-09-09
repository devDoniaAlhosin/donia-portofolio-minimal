import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Download } from 'lucide-react';
import { SocialLinks } from '@/components/ui/SocialLinks';
import personalData from '@/data/personal.json';

const navItems = personalData.navigation;
const socialLinks = personalData.social;
const resumeUrl = personalData.resumeUrl;
const { name, title, logo } = personalData;

const SECTION_IDS = ['about', 'experience', 'projects', 'contact'] as const;

type PillRect = { left: number; width: number; opacity: number };

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [pill, setPill] = useState<PillRect>({ left: 0, width: 0, opacity: 0 });

  const linkRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const trackRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.startsWith('/projects') ? 'projects' : '');
      return;
    }

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.2, 0.45, 0.7],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const isNavActive = useCallback(
    (href: string) => {
      if (href.startsWith('/projects')) {
        if (location.pathname === '/projects' || location.pathname.startsWith('/projects/')) {
          return true;
        }
        return location.pathname === '/' && activeSection === 'projects';
      }
      if (href.startsWith('/')) return location.pathname === href;
      if (href.startsWith('#')) {
        if (location.pathname !== '/') return false;
        const id = href.slice(1);
        // Prefer scroll-spy only — avoids dual active with stale hash
        if (activeSection) return activeSection === id;
        return location.hash === href;
      }
      return false;
    },
    [location.pathname, location.hash, activeSection]
  );

  const measurePill = useCallback(() => {
    const track = trackRef.current;
    const targetHref =
      hoveredHref ?? navItems.find((item) => isNavActive(item.href))?.href ?? null;

    if (!track || !targetHref) {
      setPill((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const btn = linkRefs.current[targetHref];
    if (!btn) {
      setPill((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const trackBox = track.getBoundingClientRect();
    const btnBox = btn.getBoundingClientRect();
    setPill({
      left: btnBox.left - trackBox.left,
      width: btnBox.width,
      opacity: 1,
    });
  }, [hoveredHref, isNavActive]);

  useLayoutEffect(() => {
    measurePill();
  }, [measurePill, activeSection, location.pathname]);

  useEffect(() => {
    window.addEventListener('resize', measurePill);
    return () => window.removeEventListener('resize', measurePill);
  }, [measurePill]);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      const id = href.slice(1);
      setActiveSection(id);
    }

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

  const downloadCv = () => {
    setIsMobileMenuOpen(false);
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'DoniaAlhosin_resume.pdf';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const overHero = !isScrolled;

  const desktopShellClass = [
    'relative overflow-hidden pointer-events-auto w-full rounded-lg',
    'transition-[max-width,box-shadow,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
    overHero
      ? 'max-w-6xl border-0 bg-transparent shadow-none backdrop-blur-none'
      : [
          'max-w-5xl border border-accent/15',
          'bg-white/85 backdrop-blur-xl backdrop-saturate-150',
          'shadow-[0_8px_28px_-10px_rgba(15,23,42,0.16),0_0_0_1px_hsl(var(--accent)/0.06)]',
        ].join(' '),
  ].join(' ');

  const mobileShellClass = [
    'relative overflow-hidden pointer-events-auto w-full max-w-md rounded-lg',
    'border backdrop-blur-xl backdrop-saturate-150',
    'transition-[max-width,box-shadow,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
    overHero
      ? 'bg-white/[0.06] border-white/15 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)]'
      : 'bg-white/85 border-accent/15 shadow-[0_8px_28px_-10px_rgba(15,23,42,0.16)]',
  ].join(' ');

  const IdentityBlock = ({ compact = false }: { compact?: boolean }) => (
    <button
      type="button"
      onClick={() => {
        setIsMobileMenuOpen(false);
        setActiveSection('');
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="group flex items-center gap-2 min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${name} — ${title}. Go to home`}
    >
      <div
        className={[
          'shrink-0 flex items-center justify-center rounded-lg',
          overHero
            ? 'border-white/20 bg-accent/25'
            : 'border-accent/20 bg-gradient-to-br from-accent/20 to-accent/5',
          'border transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95',
          'w-7 h-7 text-[10px]',
        ].join(' ')}
      >
        <span className="font-bold text-accent">{logo.initials}</span>
      </div>
      <div className="min-w-0 leading-[1.15]">
        <p
          className={[
            'font-semibold truncate text-[13px] transition-colors duration-300',
            overHero ? 'text-white' : 'text-primary',
          ].join(' ')}
        >
          {name}
        </p>
        <p
          className={[
            'truncate text-[10px] font-medium tracking-wide transition-colors duration-300',
            overHero ? 'text-white/55' : 'text-muted-foreground',
          ].join(' ')}
        >
          {title}
        </p>
      </div>
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto w-full flex justify-center px-4 sm:px-6 pt-5 sm:pt-6 md:pt-8">
        {/* Desktop — initial: naked links, no shell */}
        <div className={`hidden md:block ${desktopShellClass}`}>
          {!overHero && (
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/80 to-white/20" />
          )}
          <div className="relative flex items-center justify-between gap-3 px-2.5 py-1.5">
            <IdentityBlock />

            <div
              ref={trackRef}
              className={[
                'relative flex items-center p-0.5 rounded-lg transition-colors duration-300',
                overHero ? 'bg-transparent' : 'bg-primary/[0.035]',
              ].join(' ')}
              onMouseLeave={() => setHoveredHref(null)}
            >
              <span
                aria-hidden
                className={[
                  'absolute top-0.5 bottom-0.5 rounded-lg pointer-events-none',
                  overHero
                    ? 'bg-accent/30'
                    : 'bg-accent/14 ring-1 ring-inset ring-accent/30 shadow-[0_1px_6px_-2px_hsl(var(--accent)/0.3)]',
                ].join(' ')}
                style={{
                  left: pill.left,
                  width: pill.width,
                  opacity: pill.opacity,
                  transition:
                    'left 380ms cubic-bezier(0.22, 1, 0.36, 1), width 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease',
                }}
              />

              {navItems.map((item) => {
                const active = isNavActive(item.href);
                const hovered = hoveredHref === item.href;
                return (
                  <button
                    key={item.name}
                    ref={(el) => {
                      linkRefs.current[item.href] = el;
                    }}
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => setHoveredHref(item.href)}
                    className={[
                      'relative z-[1] px-3 py-1.5 rounded-lg text-[12.5px] font-medium tracking-tight',
                      'transition-colors duration-250 ease-out',
                      active || hovered
                        ? 'text-accent'
                        : overHero
                          ? 'text-white/70 hover:text-white'
                          : 'text-foreground/65 hover:text-foreground/90',
                    ].join(' ')}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <Button
              variant="cta"
              size="sm"
              className="h-8 px-3.5 text-[12px] shadow-md shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 shrink-0"
              onClick={downloadCv}
            >
              <Download size={12} className="opacity-95" />
              Download CV
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className={`md:hidden ${mobileShellClass}`}>
          <div
            className={[
              'absolute inset-0 pointer-events-none',
              overHero ? 'bg-gradient-to-b from-white/10 to-transparent' : 'bg-gradient-to-b from-white/80 to-white/20',
            ].join(' ')}
          />
          <div className="relative flex items-center justify-between gap-2 px-2 py-1.5">
            <IdentityBlock compact />

            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="cta"
                size="sm"
                className="h-8 px-2.5 shadow-md shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-transform duration-200"
                onClick={downloadCv}
                aria-label="Download CV"
              >
                <Download size={13} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={[
                  'w-8 h-8 transition-colors duration-200',
                  overHero
                    ? 'text-white hover:bg-white/10 hover:text-white'
                    : 'hover:bg-accent/10',
                ].join(' ')}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <Menu
                    size={16}
                    className={`absolute transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  />
                  <X
                    size={16}
                    className={`absolute transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                    }`}
                  />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pointer-events-auto">
          <button
            type="button"
            className="absolute inset-0 bg-primary/15 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />

          <div className="absolute top-[3.75rem] left-4 right-4 flex justify-center animate-slideDown">
            <div
              className={[
                'w-full max-w-md relative overflow-hidden rounded-2xl max-h-[calc(100vh-5.5rem)] overflow-y-auto',
                'border border-black/[0.06] bg-white/90 dark:bg-background/80',
                'backdrop-blur-xl',
                'shadow-[0_16px_48px_-12px_rgba(15,23,42,0.2)]',
              ].join(' ')}
            >
              <div className="relative p-3.5">
                <div className="mb-2.5 px-1.5 pb-2.5 border-b border-primary/5">
                  <p className="text-sm font-semibold text-primary">{name}</p>
                  <p className="text-[11px] text-muted-foreground">{title}</p>
                </div>

                <div className="space-y-0.5">
                  {navItems.map((item, index) => {
                    const active = isNavActive(item.href);
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => scrollToSection(item.href)}
                        style={{ animationDelay: `${index * 40}ms` }}
                        className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-250 flex items-center justify-between gap-3 ${
                          active
                            ? 'text-accent bg-accent/12 ring-1 ring-inset ring-accent/25'
                            : 'text-foreground/80 hover:text-accent hover:bg-accent/[0.06]'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 ${
                              active ? 'bg-accent scale-125 ring-4 ring-accent/15' : 'bg-accent/30'
                            }`}
                          />
                          {item.name}
                        </span>
                        {active && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-accent/70">
                            Now
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="cta"
                  className="w-full mt-3 h-10 shadow-lg shadow-accent/20 hover:scale-[1.01] active:scale-[0.99] transition-transform"
                  onClick={downloadCv}
                >
                  <Download size={15} />
                  Download CV
                </Button>

                <div className="mt-4 pt-3 border-t border-primary/5">
                  <p className="text-[10px] font-semibold text-muted-foreground mb-2.5 uppercase tracking-wider px-1">
                    Connect
                  </p>
                  <SocialLinks
                    links={socialLinks.filter((l) => l.platform === 'LinkedIn' || l.platform === 'Email')}
                    size="md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
