import { Button } from '@/components/ui/button';
import {
  X,
  Calendar,
  Users,
  Star,
  Globe,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { Project, getCategoryLabel, getProjectLinks } from '@/types/project';

interface ProjectQuickViewModalProps {
  project: Project;
  onClose: () => void;
  onViewDetails: (project: Project) => void;
}

export const ProjectQuickViewModal = ({
  project,
  onClose,
  onViewDetails,
}: ProjectQuickViewModalProps) => {
  const { hasValidLiveUrl } = getProjectLinks(project);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />

      <div className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-border/30 modal-entrance">
        <div className="relative max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border/40 p-4 z-10 flex items-center justify-between">
            <span className="text-xs font-semibold text-accent tracking-wide uppercase">Quick View</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-full"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-2.5 py-1 bg-accent text-white text-xs font-medium rounded-md mb-2">
                {getCategoryLabel(project.category)}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-primary leading-tight">{project.title}</h2>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{project.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((tech, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-accent/8 text-accent text-xs font-medium rounded-md border border-accent/20"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-2.5 py-1 bg-muted/20 text-muted-foreground text-xs font-medium rounded-md">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-accent" />
                {project.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-accent" />
                {project.teamSize}
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                {project.rating}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <Button
                variant="cta"
                size="sm"
                className="flex-1"
                onClick={() => {
                  onClose();
                  onViewDetails(project);
                }}
              >
                View Full Details
                <ArrowRight size={14} className="ml-2" />
              </Button>
              {hasValidLiveUrl && (
                <Button variant="outline" size="sm" asChild className="flex-1 border-accent/30 hover:bg-accent/10">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Globe size={14} className="mr-2" />
                    Live Demo
                    <ExternalLink size={12} className="ml-2" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
