import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SELECTOR = 'main section, main > .relative, footer';

/**
 * Adds a premium fade/slide reveal to top-level sections sitewide.
 * Re-runs on route changes so every page gets the same experience.
 */
export const PremiumScrollExperience = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    if (nodes.length === 0) return;

    if (reduceMotion) {
      nodes.forEach((el) => {
        el.classList.add('premium-reveal', 'is-inview');
      });
      return;
    }

    nodes.forEach((el, index) => {
      el.classList.add('premium-reveal');
      el.style.setProperty('--reveal-delay', `${Math.min(index * 40, 160)}ms`);
      if (index === 0) {
        el.classList.add('premium-reveal--hero');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.88 && rect.bottom > 40;
      if (inView) {
        el.classList.add('is-inview');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
      nodes.forEach((el) => {
        el.classList.remove('premium-reveal', 'premium-reveal--hero', 'is-inview');
        el.style.removeProperty('--reveal-delay');
      });
    };
  }, [location.pathname]);

  return null;
};
