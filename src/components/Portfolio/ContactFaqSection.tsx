import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';

const faqs = [
  {
    q: 'What is your current role?',
    a: 'I am a Full Stack Developer at O₂Nations, building products, SaaS, and software platforms. I also take on selective freelance and contract work.',
  },
  {
    q: 'How much does it cost for a high performing website?',
    a: 'Pricing depends on scope, pages, integrations, and timeline. Share your goals and I will send a clear estimate — no obligation. Most projects start with a short discovery call.',
  },
  {
    q: 'How long will the work take from start to finish?',
    a: 'A focused marketing site often lands in 2–4 weeks. Larger platforms, booking systems, or custom features usually take 4–8+ weeks. I will give you a realistic schedule before we kick off.',
  },
  {
    q: 'Are you available to join as full time?',
    a: 'I am open to strong full-time opportunities that match my stack (React, Angular, Laravel, WordPress) and growth goals. Reach out with the role details and we can talk.',
  },
];

export const ContactFaqSection = () => (
  <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 text-primary-foreground">
    <div
      className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/85"
      aria-hidden
    />
    <div
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{
        background:
          'radial-gradient(ellipse at 20% 0%, hsl(var(--accent) / 0.28), transparent 45%), radial-gradient(ellipse at 90% 100%, hsl(var(--accent) / 0.18), transparent 40%)',
      }}
      aria-hidden
    />

    <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-start">
        <div>
          <div className="inline-flex items-center gap-2 mb-2.5">
            <Sparkles size={14} className="text-accent" strokeWidth={2.25} />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
              FAQs
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.15]">
            Have
            <br />
            Questions?
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/65 leading-relaxed max-w-xs">
            Quick answers for recruiters and clients — or message me and we can talk it through.
          </p>

          <a
            href="#contact"
            className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline underline-offset-4"
          >
            <MessageCircle size={14} />
            Ask via WhatsApp form
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div>
          <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`faq-${index}`}
                className="border-0 border-b border-white/10 last:border-b-0 px-0"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-left text-[13px] sm:text-[15px] font-semibold text-primary-foreground gap-3 group">
                  <span className="flex gap-2.5 min-w-0 items-start">
                    <span className="mt-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-accent/20 text-accent text-[10px] font-bold tabular-nums shrink-0 group-data-[state=open]:bg-accent group-data-[state=open]:text-white transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 leading-snug">{item.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[13px] sm:text-sm text-primary-foreground/65 leading-relaxed pb-4 pl-8">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </section>
);
