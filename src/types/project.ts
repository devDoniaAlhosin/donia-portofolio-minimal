export type ProjectFilter = 'all' | 'native' | 'wordpress' | 'ui' | 'testing';
export type ServicePortfolioCategory =
  | 'all-services'
  | 'portfolio'
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
    case 'wordpress':
      return 'WordPress';
    case 'native':
      return 'Web App';
    case 'testing':
      return 'Testing';
    default:
      return 'UI Design';
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
  const text = `${project.title} ${project.description} ${project.features.join(' ')}`.toLowerCase();

  if (text.includes('booking') || text.includes('reservation') || text.includes('appointment')) {
    return 'booking';
  }

  if (text.includes('blog') || text.includes('news') || text.includes('article') || text.includes('insight')) {
    return 'blogging';
  }

  if (
    text.includes('ecommerce') ||
    text.includes('e-commerce') ||
    text.includes('woocommerce') ||
    text.includes('shop') ||
    text.includes('product')
  ) {
    return 'ecommerce';
  }

  if (
    text.includes('portfolio') ||
    text.includes('showcase') ||
    text.includes('corporate') ||
    text.includes('consulting')
  ) {
    return 'portfolio';
  }

  return 'portfolio';
};
