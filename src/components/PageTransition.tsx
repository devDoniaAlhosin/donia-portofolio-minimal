import { useEffect, useRef, useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { NavigationLoader } from '@/components/NavigationLoader';
import { Navbar } from '@/components/Portfolio/Navbar';
import { PremiumScrollExperience } from '@/components/PremiumScrollExperience';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Projects from '@/pages/Projects';
import ProjectDetails from '@/pages/ProjectDetails';
import NotFound from '@/pages/NotFound';

const TRANSITION_MS = 420;
const ENTER_MS = 560;

export const PageTransition = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [enterAnim, setEnterAnim] = useState(false);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setEnterAnim(true);
    setIsLoading(true);
    const loadTimer = window.setTimeout(() => setIsLoading(false), TRANSITION_MS);
    // Drop the enter class after the animation so no transform remains on mobile
    const enterTimer = window.setTimeout(() => setEnterAnim(false), ENTER_MS);
    return () => {
      window.clearTimeout(loadTimer);
      window.clearTimeout(enterTimer);
    };
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <NavigationLoader isLoading={isLoading} />
      <div key={location.pathname} className={enterAnim ? 'animate-page-enter' : undefined}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <PremiumScrollExperience />
      </div>
    </>
  );
};
