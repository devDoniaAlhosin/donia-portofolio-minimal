import { AboutIntroSection } from '@/components/Portfolio/AboutIntroSection';
import { AboutTechMarquee } from '@/components/Portfolio/AboutTechMarquee';
import { AboutDesignProcess } from '@/components/Portfolio/AboutDesignProcess';
import { AboutAwardsSection } from '@/components/Portfolio/AboutAwardsSection';
import { Footer } from '@/components/Portfolio/Footer';
import { BackToTop } from '@/components/Portfolio/BackToTop';
import { WhatsAppButton } from '@/components/Portfolio/WhatsAppButton';

const About = () => (
  <>
    <main>
      <AboutIntroSection />
      <AboutTechMarquee />
      <AboutDesignProcess />
      <AboutAwardsSection />
    </main>
    <Footer />
    <BackToTop />
    <WhatsAppButton />
  </>
);

export default About;
