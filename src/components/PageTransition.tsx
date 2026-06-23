import { useEffect, useRef, useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { NavigationLoader } from '@/components/NavigationLoader';
import { Navbar } from '@/components/Portfolio/Navbar';
import Index from '@/pages/Index';
import Projects from '@/pages/Projects';
import ProjectDetails from '@/pages/ProjectDetails';
import NotFound from '@/pages/NotFound';

const TRANSITION_MS = 420;

export const PageTransition = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setHasNavigated(true);
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <NavigationLoader isLoading={isLoading} />
      <div
        key={location.pathname}
        className={hasNavigated ? 'animate-page-enter' : undefined}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};
