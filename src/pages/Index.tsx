import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    if (hash === '#contact') {
      navigate('/contact', { replace: true });
      return;
    }

    const timeout = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <ProjectsSection />
        <CoursesSection />
        <HonorsAwardsSection />
        <Footer />
      </main>
      <BackToTop />
      <WhatsAppButton />
    </>
  );
};

export default Index;
