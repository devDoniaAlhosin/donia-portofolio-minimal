import { Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSparkles?: boolean;
  showFullName?: boolean;
  className?: string;
}

export const Logo = ({ size = 'md', showSparkles = true, showFullName = false, className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl'
  };

  const sparkleSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3'
  };

  const sparkleIconSizes = {
    sm: 4,
    md: 5,
    lg: 6
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center border border-accent/20 ${showFullName ? 'mr-3' : ''}`}>
          <span className="font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">DA</span>
        </div>
        {showSparkles && (
          <div className={`absolute -top-1 -right-1 ${sparkleSizes[size]} bg-accent rounded-full flex items-center justify-center`}>
            <Sparkles size={sparkleIconSizes[size]} className="text-primary" />
          </div>
        )}
      </div>
      {showFullName && (
        <span className="font-bold text-lg text-primary">DONIA ALHOSIN</span>
      )}
    </div>
  );
}; 