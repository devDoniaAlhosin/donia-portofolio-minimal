import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Github,
  X,
  Calendar,
  Users,
  Star,
  Eye,
  Globe,
  Briefcase,
  FileText,
  Image as ImageIcon,
  File,
  Download,
} from 'lucide-react';
import { Project, getCategoryLabel, getProjectLinks } from '@/types/project';

interface ProjectDetailsModalProps {
  project: Project;
  currentImageIndex: number;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
  onFullscreenImage: (src: string, alt: string, e: React.MouseEvent) => void;
}

export const ProjectDetailsModal = ({
  project,
  currentImageIndex,
  onClose,
  onPrevImage,
  onNextImage,
  onSelectImage,
  onFullscreenImage,
}: ProjectDetailsModalProps) => {
  const { hasValidLiveUrl, hasValidGithubUrl, hasValidGithubUrl2 } = getProjectLinks(project);
  const hasValidLinks = hasValidLiveUrl || hasValidGithubUrl || hasValidGithubUrl2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl backdrop-entrance" onClick={onClose} />

      <div className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-border/30 modal-entrance">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/30 via-accent/10 to-accent/20 opacity-0 animate-pulse" />

        <div className="relative max-h-[95vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur-xl border-b border-border/40 p-6 rounded-t-3xl z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
                  <Globe size={16} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-accent tracking-wide uppercase">Project Details</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-full transition-all duration-300 hover:scale-110"
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-3xl p-4 sm:p-6 md:p-8 border border-accent/20 backdrop-blur-sm">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black sm:bg-accent/15 text-white sm:text-accent rounded-full border border-accent/30 backdrop-blur-sm">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="font-semibold text-xs sm:text-sm">{getCategoryLabel(project.category)}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/30">
                      <Calendar size={16} className="text-accent" />
                      <span className="font-medium">{project.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/30">
                      <Users size={16} className="text-accent" />
                      <span className="font-medium">{project.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/30">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{project.rating}</span>
                    </div>
                    {project.company && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/30">
                        <Briefcase size={16} className="text-accent" />
                        <span className="font-medium">While at {project.company}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 shadow-2xl border border-border/20 group">
                  <img
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain bg-black/5 transition-all duration-700 ease-out hover:scale-[1.02] cursor-zoom-in"
                    onClick={(e) =>
                      onFullscreenImage(
                        project.images[currentImageIndex],
                        `${project.title} - Image ${currentImageIndex + 1}`,
                        e
                      )
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPrevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-primary border border-border/30">
                        {currentImageIndex + 1} / {project.images.length}
                      </div>
                    </>
                  )}
                </div>

                {project.images.length > 1 && (
                  <div className="flex justify-center gap-4 mt-4">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => onSelectImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                          index === currentImageIndex
                            ? 'bg-accent shadow-lg shadow-accent/40 scale-125'
                            : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-border/30 shadow-lg">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                    <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-accent to-accent/60 rounded-full" />
                    Project Overview
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{project.longDescription}</p>
                </div>

                <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-border/30 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-500 to-green-400 rounded-full" />
                    Key Features
                  </h3>
                  <div className="space-y-2">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-sm flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-6 border border-border/30 shadow-lg">
                    <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-orange-500 to-orange-400 rounded-full" />
                      Challenges Faced
                    </h3>
                    <div className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20"
                        >
                          <div className="w-2 h-2 bg-orange-500 rotate-45 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-6 border border-border/30 shadow-lg">
                    <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-500 to-green-400 rounded-full" />
                      Solutions Implemented
                    </h3>
                    <div className="space-y-2">
                      {project.solutions.map((solution, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{solution}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-border/30 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-accent to-accent/60 rounded-full" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 bg-accent/15 text-accent text-xs rounded-full border border-accent/30 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-border/30 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-accent to-accent/60 rounded-full" />
                    Project Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-background/30 rounded-xl border border-border/20">
                      <span className="text-xs text-muted-foreground font-medium">Rating</span>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-base">{project.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/30 rounded-xl border border-border/20">
                      <span className="text-xs text-muted-foreground font-medium">Views</span>
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-accent" />
                        <span className="font-bold text-base">{project.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/30 rounded-xl border border-border/20">
                      <span className="text-xs text-muted-foreground font-medium">Duration</span>
                      <span className="font-bold text-base">{project.duration}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/30 rounded-xl border border-border/20">
                      <span className="text-xs text-muted-foreground font-medium">Team Size</span>
                      <span className="font-bold text-base">{project.teamSize}</span>
                    </div>
                  </div>
                </div>

                {hasValidLinks && (
                  <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-6 border border-border/30 shadow-lg">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent/60 rounded-full" />
                      Project Links
                    </h3>
                    <div className="space-y-3">
                      {hasValidLiveUrl && (
                        <Button variant="cta" size="sm" asChild className="w-full shadow-lg shadow-accent/25">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Globe size={16} />
                            <span className="font-semibold">Live Demo</span>
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      )}
                      {hasValidGithubUrl && (
                        <Button variant="outline" size="sm" asChild className="w-full border-accent/30 hover:bg-accent/10">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Github size={16} />
                            <span className="font-semibold">GitHub Repository</span>
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      )}
                      {hasValidGithubUrl2 && (
                        <Button variant="outline" size="sm" asChild className="w-full border-accent/30 hover:bg-accent/10">
                          <a href={project.githubUrl2} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Github size={16} />
                            <span className="font-semibold">GitHub Repository 2</span>
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {project.assets && project.assets.length > 0 && (
                  <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-6 border border-border/30 shadow-lg">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent/60 rounded-full" />
                      Project Assets
                    </h3>
                    <div className="space-y-3">
                      {project.assets.map((asset, index) => {
                        const icon =
                          asset.type === 'image' ? (
                            <ImageIcon size={18} className="text-accent" />
                          ) : asset.type === 'pdf' ? (
                            <FileText size={18} className="text-red-500" />
                          ) : (
                            <File size={18} className="text-blue-500" />
                          );

                        return (
                          <a
                            key={index}
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 p-4 bg-background/30 rounded-xl border border-border/20 hover:bg-background/50 hover:border-accent/40 transition-all"
                          >
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-background/50 border border-border/30">
                              {icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors block truncate">
                                {asset.name}
                              </span>
                              {asset.description && (
                                <span className="text-xs text-muted-foreground truncate block">{asset.description}</span>
                              )}
                            </div>
                            <Download size={16} className="text-muted-foreground group-hover:text-accent flex-shrink-0" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
