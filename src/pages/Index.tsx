import { useEffect } from 'react';
import { HeroSection } from '@/components/Portfolio/HeroSection';
import { AboutSection } from '@/components/Portfolio/AboutSection';
import { ExperienceSection } from '@/components/Portfolio/ExperienceSection';
import { CoursesSection } from '@/components/Portfolio/CoursesSection';
import { HonorsAwardsSection } from '@/components/Portfolio/HonorsAwardsSection';
import { ProjectsSection } from '@/components/Portfolio/ProjectsSection';
import { ServicesSection } from '@/components/Portfolio/ServicesSection';
import { Footer } from '@/components/Portfolio/Footer';
import { BackToTop } from '@/components/Portfolio/BackToTop';
import { WhatsAppButton } from '@/components/Portfolio/WhatsAppButton';

const Index = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const timeout = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <CoursesSection />
        <HonorsAwardsSection />
        <ProjectsSection />
        <Footer />
      </main>
      <BackToTop />
      <WhatsAppButton />
    </>
  );
};

export default Index;
