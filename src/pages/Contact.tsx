import { ContactFormSection } from '@/components/Portfolio/ContactFormSection';
import { ContactFaqSection } from '@/components/Portfolio/ContactFaqSection';
import { Footer } from '@/components/Portfolio/Footer';
import { BackToTop } from '@/components/Portfolio/BackToTop';
import { WhatsAppButton } from '@/components/Portfolio/WhatsAppButton';

const Contact = () => (
  <>
    <main>
      <ContactFormSection />
      <ContactFaqSection />
    </main>
    <Footer />
    <BackToTop />
    <WhatsAppButton />
  </>
);

export default Contact;
