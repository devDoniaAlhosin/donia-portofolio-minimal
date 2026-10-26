export type ProjectFilter =
  | 'all'
  | 'laravel'
  | 'angular'
  | 'react'
  | 'php'
  | 'native'
  | 'wordpress'
  | 'ui'
  | 'testing';
export type ServicePortfolioCategory =
  | 'all-services'
  | 'portfolio'
  | 'landing'
  | 'blogging'
  | 'booking'
  | 'ecommerce';

export interface ProjectAsset {
  type: 'image' | 'pdf' | 'document';
  name: string;
  url: string;
  thumbnail?: string;
  description?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectFilter;
  company?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  githubUrl2?: string;
  images: string[];
  longDescription: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  duration: string;
  teamSize: string;
  rating: number;
  views: number;
  assets?: ProjectAsset[];
  featured?: boolean;
  brandTheme?: string;
}

export const getCategoryLabel = (category: ProjectFilter) => {
  switch (category) {
    case 'laravel':
      return 'Laravel (PHP)';
    case 'angular':
      return 'Angular';
    case 'react':
      return 'React';
    case 'php':
      return 'Native PHP';
    case 'wordpress':
      return 'WordPress';
    case 'native':
      return 'Other Web';
    case 'testing':
      return 'Testing';
    case 'ui':
      return 'UI Design';
    default:
      return 'All Projects';
  }
};

export const getProjectLinks = (project: Project) => {
  const hasValidLiveUrl = Boolean(
    project.liveUrl && project.liveUrl !== '#' && project.liveUrl.trim() !== ''
  );
  const hasValidGithubUrl = Boolean(
    project.githubUrl &&
      project.githubUrl !== '#' &&
      project.githubUrl.trim() !== '' &&
      project.category !== 'wordpress'
  );
  const hasValidGithubUrl2 = Boolean(
    project.githubUrl2 &&
      project.githubUrl2 !== '#' &&
      project.githubUrl2.trim() !== '' &&
      project.category !== 'wordpress'
  );

  return { hasValidLiveUrl, hasValidGithubUrl, hasValidGithubUrl2 };
};

export const getProjectSlug = (project: Pick<Project, 'id' | 'title'>) => {
  return project.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const getServiceCategoryLabel = (category: ServicePortfolioCategory) => {
  switch (category) {
    case 'portfolio':
      return 'Portfolio';
    case 'landing':
      return 'Landing Page';
    case 'blogging':
      return 'Blogging';
    case 'booking':
      return 'Booking';
    case 'ecommerce':
      return 'Ecommerce';
    default:
      return 'All Services';
  }
};

export const inferServiceCategory = (project: Project): ServicePortfolioCategory => {
  const primaryText = `${project.title} ${project.description}`.toLowerCase();
  const fullText = `${primaryText} ${project.features.join(' ')}`.toLowerCase();

  if (
    primaryText.includes('landing page') ||
    primaryText.includes('landing-page') ||
    (primaryText.includes('landing') && !primaryText.includes('portfolio'))
  ) {
    return 'landing';
  }

  if (
    fullText.includes('booking') ||
    fullText.includes('reservation') ||
    fullText.includes('appointment')
  ) {
    return 'booking';
  }

  if (
    primaryText.includes('portfolio') ||
    primaryText.includes('showcase') ||
    primaryText.includes('corporate') ||
    primaryText.includes('consulting')
  ) {
    return 'portfolio';
  }

  if (
    primaryText.includes('blog') ||
    primaryText.includes('news') ||
    primaryText.includes('article') ||
    primaryText.includes('insight')
  ) {
    return 'blogging';
  }

  if (
    fullText.includes('ecommerce') ||
    fullText.includes('e-commerce') ||
    fullText.includes('woocommerce') ||
    fullText.includes('shop') ||
    fullText.includes('product')
  ) {
    return 'ecommerce';
  }

  return 'portfolio';
};
