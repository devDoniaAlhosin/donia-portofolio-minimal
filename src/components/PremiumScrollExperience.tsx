import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Only direct main children — never nested project/detail sections or content wrappers */
const SELECTOR = 'main > section:not([data-no-reveal]), footer';

/**
 * Adds a premium fade/slide reveal to top-level sections sitewide.
 * Re-runs on route changes so every page gets the same experience.
 * Skipped on project detail pages — nested sections were stuck at opacity:0 on mobile.
 */
export const PremiumScrollExperience = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const isProjectDetail = /^\/projects\/[^/]+\/?$/.test(location.pathname);
    if (isProjectDetail) return;

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
        threshold: 0.08,
        rootMargin: '0px 0px -4% 0px',
      }
    );

    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 20;
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
