import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const whatsappNumber = '01061642356';
  const message = encodeURIComponent('Hello Donia! I found your portfolio and would like to discuss a project.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <Button
      asChild
      variant="whatsapp"
      size="lg"
      className="fixed bottom-6 left-6 z-40 rounded-full shadow-lg hover:shadow-xl interactive"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle size={24} />
        WhatsApp
      </a>
    </Button>
  );
};