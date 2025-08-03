import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      variant="cta"
      size="icon"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-lg hover:shadow-xl interactive"
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </Button>
  );
};