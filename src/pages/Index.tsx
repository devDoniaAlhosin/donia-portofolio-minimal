import { useEffect } from 'react';
import { CustomCursor } from '@/components/Portfolio/CustomCursor';
import { Navbar } from '@/components/Portfolio/Navbar';
import { HeroSection } from '@/components/Portfolio/HeroSection';
import { AboutSection } from '@/components/Portfolio/AboutSection';
import { SkillsSection } from '@/components/Portfolio/SkillsSection';
import { ExperienceSection } from '@/components/Portfolio/ExperienceSection';
import { CoursesSection } from '@/components/Portfolio/CoursesSection';
import { ProjectsSection } from '@/components/Portfolio/ProjectsSection';
import { Footer } from '@/components/Portfolio/Footer';
import { BackToTop } from '@/components/Portfolio/BackToTop';
import { WhatsAppButton } from '@/components/Portfolio/WhatsAppButton';

const Index = () => {
  useEffect(() => {
    // Add fade-in animation to elements
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observe fade-in-up elements
      document.querySelectorAll('.fade-in-up').forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    };

    // Set a timeout to ensure DOM is ready
    const timeout = setTimeout(observeElements, 100);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <CoursesSection />
        <ProjectsSection />
        <Footer />
      </main>
      <BackToTop />
      <WhatsAppButton />
    </>
  );
};

export default Index;
