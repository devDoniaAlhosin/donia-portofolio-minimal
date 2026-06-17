import { CustomCursor } from '@/components/Portfolio/CustomCursor';
import { Navbar } from '@/components/Portfolio/Navbar';
import { ProjectsContent } from '@/components/Portfolio/ProjectsContent';
import { Footer } from '@/components/Portfolio/Footer';
import { BackToTop } from '@/components/Portfolio/BackToTop';
import { WhatsAppButton } from '@/components/Portfolio/WhatsAppButton';

const Projects = () => (
  <>
    <CustomCursor />
    <Navbar />
    <main>
      <ProjectsContent isPage />
    </main>
    <Footer />
    <BackToTop />
    <WhatsAppButton />
  </>
);

export default Projects;
