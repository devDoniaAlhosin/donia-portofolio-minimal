import { Button } from '@/components/ui/button';
import { Calendar, Users, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project, getCategoryLabel, getProjectSlug } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

export const ProjectCard = ({
  project,
  index,
  isVisible,
}: ProjectCardProps) => (
  <div
    className={`group relative bg-background/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-accent/40 transition-all duration-300 ease-out overflow-hidden hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}
    style={{ transitionDelay: `${Math.min(index * 0.03, 0.2)}s` }}
  >
    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="relative h-52 sm:h-56 overflow-hidden">
      <img
        src={project.images[0]}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        {project.featured && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg shadow-lg shadow-accent/25">
            <Sparkles size={11} />
            Featured
          </span>
        )}
        <span className="px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg shadow-lg shadow-accent/25">
          {getCategoryLabel(project.category)}
        </span>
        {project.company && (
          <span className="px-3 py-1.5 bg-black/60 text-white text-xs font-medium rounded-lg border border-white/10 backdrop-blur-sm">
            While at {project.company}
          </span>
        )}
      </div>
    </div>

    <div className="p-5 space-y-4">
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-primary leading-tight">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 2).map((tech, techIndex) => (
          <span
            key={techIndex}
            className="px-2.5 py-1 bg-accent/8 text-accent text-xs font-medium rounded-md border border-accent/20"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 2 && (
          <span className="px-2.5 py-1 bg-muted/20 text-muted-foreground text-xs font-medium rounded-md border border-border/30">
            +{project.technologies.length - 2}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-accent/60" />
          <span>{project.duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-accent/60" />
          <span>{project.teamSize}</span>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        asChild
        className="w-full h-10 bg-background border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary font-medium"
      >
        <Link to={`/projects/${getProjectSlug(project)}`}>
          <span className="text-sm">View Details</span>
          <ExternalLink size={14} className="ml-1.5" />
        </Link>
      </Button>
    </div>
  </div>
);
