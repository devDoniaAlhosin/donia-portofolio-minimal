import { FormEvent, useState } from 'react';
import { Linkedin, Mail, ExternalLink, Github, Sparkles, MessageCircle } from 'lucide-react';
import personalData from '@/data/personal.json';

const WHATSAPP_NUMBER = '201061642356';

const iconMap = {
  Linkedin,
  Mail,
  ExternalLink,
  Github,
} as const;

export const ContactFormSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const text = [
      `Hello Donia! I found your portfolio and would like to connect.`,
      ``,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      ``,
      `Message:`,
      message.trim(),
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-background pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-accent/[0.06] via-transparent to-accent/[0.03]"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="mb-10 sm:mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-accent" strokeWidth={2.25} />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
              Connect with me
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-primary tracking-[-0.03em] leading-[1.15]">
            Let&apos;s start a project together
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
            Tell me about your idea — submit the form and I&apos;ll continue the conversation with
            you on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-6 lg:gap-8 items-start">
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border/60 bg-white p-5 sm:p-6 space-y-4 sm:space-y-5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.22)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-primary mb-1.5">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full rounded-lg border border-border/80 bg-background px-3.5 py-2.5 text-sm text-primary placeholder:text-muted-foreground/60 outline-none transition-shadow focus:ring-2 focus:ring-accent/25 focus:border-accent/50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-primary mb-1.5">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-lg border border-border/80 bg-background px-3.5 py-2.5 text-sm text-primary placeholder:text-muted-foreground/60 outline-none transition-shadow focus:ring-2 focus:ring-accent/25 focus:border-accent/50"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-primary mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-y min-h-[120px] rounded-lg border border-border/80 bg-background px-3.5 py-2.5 text-sm text-primary placeholder:text-muted-foreground/60 outline-none transition-shadow focus:ring-2 focus:ring-accent/25 focus:border-accent/50"
                placeholder="Tell me about your project..."
              />
            </div>

            <div className="pt-0.5 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe57]"
              >
                <MessageCircle size={16} />
                Send via WhatsApp
              </button>
              {sent && (
                <p className="text-xs text-muted-foreground">Opening WhatsApp with your message…</p>
              )}
            </div>
          </form>

          {/* Right profile card — compact spacing */}
          <aside className="rounded-lg border border-border/50 bg-white p-4 sm:p-5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.22)]">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Available for work
            </span>

            <div className="mt-3 flex justify-center">
              <div className="relative">
                <div
                  className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-accent/40 to-accent/5 blur-[1.5px]"
                  aria-hidden
                />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-white bg-transparent">
                  <img
                    src="/assets/avatar.png"
                    alt={personalData.name}
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2.5 text-center">
              <p className="font-display text-[15px] sm:text-base font-bold text-primary leading-tight">
                {personalData.name}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{personalData.title}</p>
            </div>

            <p className="mt-2 text-center text-[12px] text-muted-foreground leading-snug max-w-[16rem] mx-auto">
              My inbox is always open. Whether you have a product idea, SaaS build, or just want to
              say hi — I&apos;d love to hear from you.
            </p>

            <div className="mt-3 flex items-center justify-center gap-1.5">
              {personalData.social.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap] ?? ExternalLink;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="w-8 h-8 rounded-lg border border-border/60 bg-white flex items-center justify-center text-primary/70 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <Icon size={15} strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
