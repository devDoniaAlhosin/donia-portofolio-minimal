import { Link } from 'react-router-dom';
import { Project, getCategoryLabel, getProjectSlug } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

const PASTELS = [
  'bg-[#f6e8ea]',
  'bg-[#e8eef4]',
  'bg-[#f3edd8]',
  'bg-[#e4f0ee]',
  'bg-[#f0ebe3]',
  'bg-[#e8f1e6]',
];

/** Varying frame heights for masonry rhythm */
const ASPECTS = [
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[5/4]',
  'aspect-[4/5]',
  'aspect-[3/2]',
  'aspect-square',
];

const getTagLabel = (category: Project['category']) => {
  switch (category) {
    case 'wordpress':
      return 'WordPress';
    case 'native':
      return 'Development';
    case 'testing':
      return 'Testing';
    case 'ui':
      return 'Design';
    default:
      return getCategoryLabel(category);
  }
};

export const ProjectCard = ({ project, index, isVisible }: ProjectCardProps) => {
  const pastel = PASTELS[index % PASTELS.length];
  const aspect = ASPECTS[index % ASPECTS.length];
  const secondaryTag =
    project.category === 'native'
      ? 'Full Stack'
      : project.category === 'wordpress'
        ? 'CMS'
        : project.category === 'ui'
          ? 'UI/UX'
          : null;

  return (
    <Link
      to={`/projects/${getProjectSlug(project)}`}
      className={`group mb-6 md:mb-8 break-inside-avoid block transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${Math.min(index * 50, 200)}ms` }}
    >
      <div
        className={`relative ${aspect} rounded-lg ${pastel} overflow-hidden mb-3 transition-transform duration-500 group-hover:-translate-y-0.5`}
      >
        <div className="absolute inset-0 p-3 sm:p-4 md:p-5 flex items-center justify-center">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] bg-background/40 ring-1 ring-black/5">
            <img
              src={project.images[0]}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </div>

      <h3 className="text-[15px] sm:text-base font-bold text-primary tracking-tight leading-snug group-hover:text-accent transition-colors">
        {project.title}
      </h3>

      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-muted-foreground rounded-lg border border-border/70 bg-background">
            {getTagLabel(project.category)}
          </span>
          {secondaryTag && (
            <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-muted-foreground rounded-lg border border-border/70 bg-background">
              {secondaryTag}
            </span>
          )}
          {project.featured && (
            <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-accent rounded-lg border border-accent/25 bg-accent/10">
              Featured
            </span>
          )}
        </div>
        <span className="text-[11px] sm:text-xs font-medium text-muted-foreground tabular-nums shrink-0">
          {project.duration}
        </span>
      </div>
    </Link>
  );
};
