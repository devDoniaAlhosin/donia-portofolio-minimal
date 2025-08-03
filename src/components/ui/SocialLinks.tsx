import { Mail, Linkedin, ExternalLink } from 'lucide-react';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  size?: 'sm' | 'md' | 'lg';
  showTooltips?: boolean;
  className?: string;
}

const iconMap = {
  Mail,
  Linkedin,
  ExternalLink
};

export const SocialLinks = ({ links, size = 'md', showTooltips = true, className = '' }: SocialLinksProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 24
  };

  return (
    <div className={`flex space-x-4 ${className}`}>
      {links.map((link, index) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap];
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative ${sizeClasses[size]} bg-accent/10 rounded-2xl flex items-center justify-center hover:bg-accent/20 hover:scale-110 transition-all duration-300 border border-accent/20 hover:border-accent/40 ${link.color}`}
            aria-label={link.platform}
          >
            <Icon size={iconSizes[size]} className="transition-colors" />
            {showTooltips && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background text-foreground text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg border border-accent/20">
                {link.platform}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background"></div>
              </div>
            )}
          </a>
        );
      })}
    </div>
  );
}; 