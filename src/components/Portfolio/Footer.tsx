import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import personalData from '@/data/personal.json';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
] as const;

const iconMap = {
  Linkedin,
  Github,
  Mail,
  ExternalLink,
} as const;

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative border-t border-border/60 bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left group"
          >
            <p className="font-display text-base font-bold text-primary tracking-tight group-hover:text-accent transition-colors">
              {personalData.name}
            </p>
            <p className="text-[12px] text-muted-foreground mt-0.5">{personalData.title}</p>
          </button>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.to)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href={`mailto:${personalData.email}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Email
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {personalData.social.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap] ?? ExternalLink;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/5 transition-colors"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} {personalData.name}
          </p>
          <p className="text-[11px] text-muted-foreground/80">Full stack · Products · Platforms</p>
        </div>
      </div>
    </footer>
  );
};
