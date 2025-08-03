import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

// Split navigation items for left and right sides
const leftNavItems = navItems.slice(0, 2); // About, Experience
const rightNavItems = navItems.slice(2, 4); // Projects, Contact

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
        {/* Desktop: Boxed navbar with border and border radius */}
        <div className="hidden md:block mt-4">
          <div className={`max-w-4xl mx-auto rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? 'bg-background/95 backdrop-blur-md border-accent/20 shadow-lg'
              : 'bg-background/80 backdrop-blur-sm border-accent/10'
          }`}>
            <div className="flex items-center justify-between h-16 px-8">
              {/* Left Navigation */}
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

              {/* Logo - Centered */}
              <div className="font-bold text-xl text-primary">
                DA
              </div>

              {/* Right Navigation */}
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

        {/* Mobile: Full width navbar */}
        <div className="md:hidden">
          <div className={`flex items-center justify-between h-16 transition-all duration-300 ${
            isScrolled
              ? 'bg-background/95 backdrop-blur-md border-b border-accent/20'
              : 'bg-transparent'
          }`}>
            {/* Logo */}
            <div className="font-bold text-xl text-primary">
              DONIA ALHOSIN
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu-enter bg-background/95 backdrop-blur-md border-t border-accent/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-accent transition-colors w-full text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};