import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, X, Calendar, Users, Star, Eye, Code2, Palette, Globe, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import projectsData from '@/data/projects.json';

type ProjectFilter = 'all' | 'native' | 'wordpress' | 'ui';

interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectFilter;
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
}

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const projects: Project[] = (projectsData?.projects as Project[]) || [];
  const filters: Array<{key: string, label: string}> = projectsData?.filters || [];
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();
  useEffect(() => {
    setIsInitialLoad(false);
    projects.forEach(project => {
      if (project.images && project.images.length > 0) {
        const img = new Image();
        img.src = project.images[0];
      }
    });
  }, [projects]);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };



  return (
    <section id="projects" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-accent/8 via-accent/4 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tl from-accent/6 via-accent/3 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent/3 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={headerRef}
          className={`text-left sm:text-center mb-12 sm:mb-20 transition-all duration-1000 ease-out ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <Globe size={14} className="sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Featured Projects
          </h2>
                     <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 mb-8 sm:mb-12">
            A showcase of my recent work in WordPress development, web applications, and UI design.
          </p>

 
          <div className={`relative transition-all duration-500 ease-out ${
            (headerVisible || isInitialLoad)
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`} style={{transitionDelay: '0.1s'}}>

             <div className="hidden sm:flex items-center justify-center">
               <div className="bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 p-2 shadow-lg relative overflow-hidden">

                 <div 
                   className="absolute top-2 bottom-2 bg-gradient-to-r from-accent to-accent/80 rounded-xl shadow-lg shadow-accent/25 transition-all duration-500 ease-out"
                   style={{
                     left: `${filters.findIndex(f => f.key === activeFilter) * (100 / filters.length)}%`,
                     width: `${100 / filters.length}%`
                   }}
                 />
                 <div className="flex gap-1 relative z-10">
                   {filters.map((filter) => (
                     <button
                       key={filter.key}
                       onClick={() => setActiveFilter(filter.key as ProjectFilter)}
                       className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-500 ease-out ${
                         activeFilter === filter.key
                           ? 'text-white'
                           : 'text-muted-foreground hover:text-primary hover:bg-accent/10'
                       }`}
                     >
                       <span className="relative z-10">{filter.label}</span>
                       {activeFilter === filter.key && (
                         <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 animate-pulse"></div>
                       )}
                     </button>
                   ))}
                 </div>
               </div>
             </div>
                                                                                 
               <div className="sm:hidden mb-6">
                 <div className="flex justify-center px-4">
                   <div className="flex gap-2 overflow-x-auto w-full max-w-md">
                     {filters.map((filter) => (
                       <button
                         key={filter.key}
                         onClick={() => setActiveFilter(filter.key as ProjectFilter)}
                         className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                           activeFilter === filter.key
                             ? 'bg-accent text-white shadow-sm'
                             : 'bg-background/60 text-muted-foreground hover:text-primary hover:bg-background/80'
                         }`}
                       >
                         {filter.label}
                       </button>
                     ))}
                   </div>
                 </div>
               </div>
          </div>
        </div>


                 <div 
           ref={contentRef}
           className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700 ease-out relative z-2 ${
             (contentVisible || isInitialLoad)
               ? 'opacity-100 translate-y-0' 
               : 'opacity-0 translate-y-4'
           }`}
         >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-background/80 backdrop-blur-sm rounded-2xl border-2 border-border/40 hover:border-accent/50 transition-all duration-300 ease-out overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-accent/10 ${
                (contentVisible || isInitialLoad)
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{transitionDelay: `${Math.min(index * 0.03, 0.2)}s`}}
              onClick={() => openModal(project)}
            >

              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.images[0]} 
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-accent/90 text-white text-xs font-medium rounded-lg">
                    {project.category === 'wordpress' ? 'WordPress' : 
                     project.category === 'native' ? 'Web App' : 'UI Design'}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded-lg">
                    <Eye size={12} className="text-white/70" />
                    <span className="text-white/80 text-xs">{project.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded-lg">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-white/80 text-xs">{project.rating}</span>
                  </div>
                </div>
              </div>


              <div className="p-5 space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-primary leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 2).map((tech, index) => (
                    <span
                      key={index}
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
                  className="w-full h-10 bg-accent/5 border-accent/20 hover:bg-accent/15 hover:border-accent/40 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 font-medium text-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(project);
                  }}
                >
                  <span className="text-sm">View Details</span>
                  <ExternalLink size={14} className="ml-2 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                </Button>
              </div>
                          </div>
            ))}
          </div>
      </div>


      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
             className="absolute inset-0 bg-black/70 backdrop-blur-xl backdrop-entrance"
            onClick={closeModal}
          />
          
           
          <div 
             className="relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-border/30 modal-entrance"
          >
             
             <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/30 via-accent/10 to-accent/20 opacity-0 animate-pulse"></div>
            
             
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
                     onClick={closeModal}
                     className="text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-full transition-all duration-300 hover:scale-110"
                   >
                     <X size={20} />
                   </Button>
                 </div>
               </div>
                <div className="p-4 sm:p-6 md:p-8">
                  {/* Enhanced Image Gallery */}
                  <div className="relative mb-10">
                    <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 shadow-2xl border border-border/20">
                     <img 
                       src={selectedProject.images[currentImageIndex]} 
                       alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-105"
                     />
                     
                      {/* Enhanced gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                      

                      
                      {/* Image counter */}
                      {selectedProject.images.length > 1 && (
                        <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-primary border border-border/30">
                          {currentImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      )}
                   </div>

                    {/* Enhanced image indicators */}
                   {selectedProject.images.length > 1 && (
                      <div className="flex justify-center gap-4 mt-8">
                       {selectedProject.images.map((_, index) => (
                         <button
                           key={index}
                           onClick={() => setCurrentImageIndex(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                             index === currentImageIndex 
                                ? 'bg-accent shadow-lg shadow-accent/40 scale-125' 
                                : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                           }`}
                         />
                       ))}
                     </div>
                   )}
                 </div>

  
                  <div className="mb-10">
                    <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-3xl p-4 sm:p-6 md:p-8 border border-accent/20 backdrop-blur-sm">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                        {selectedProject.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 px-4 py-2 bg-accent/15 text-accent rounded-full border border-accent/30 backdrop-blur-sm">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span className="font-semibold">
                            {selectedProject.category === 'wordpress' ? 'WordPress' : 
                             selectedProject.category === 'native' ? 'Web App' : 'UI Design'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/30">
                          <Calendar size={16} className="text-accent" />
                          <span className="font-medium">{selectedProject.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/30">
                          <Users size={16} className="text-accent" />
                          <span className="font-medium">{selectedProject.teamSize}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-border/30">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{selectedProject.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                      
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                   <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                      <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-border/30 modal-element shadow-lg">
                        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                          <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-accent to-accent/60 rounded-full"></div>
                          Project Overview
                       </h3>
                        <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                         {selectedProject.longDescription}
                       </p>
                     </div>

                                            <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-border/30 modal-element shadow-lg">
                         <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                           <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-500 to-green-400 rounded-full"></div>
                         Key Features
                         </h3>
                         <div className="space-y-2">
                           {selectedProject.features.map((feature, index) => (
                             <div key={index} className="flex items-center gap-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20 hover:bg-background/50 transition-all duration-300 group">
                               <div className="w-2 h-2 bg-green-500 rounded-sm flex-shrink-0 group-hover:scale-125 group-hover:rotate-45 transition-all duration-300"></div>
                               <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">{feature}</span>
                             </div>
                           ))}
                         </div>
                       </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-6 border border-border/30 modal-element shadow-lg">
                           <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                             <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-orange-500 to-orange-400 rounded-full"></div>
                             Challenges Faced
                           </h3>
                           <div className="space-y-2">
                             {selectedProject.challenges.map((challenge, index) => (
                               <div key={index} className="flex items-center gap-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20 hover:bg-background/50 transition-all duration-300 group">
                                 <div className="w-2 h-2 bg-orange-500 transform rotate-45 flex-shrink-0 group-hover:scale-125 group-hover:rotate-90 transition-all duration-300"></div>
                                 <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">{challenge}</span>
                               </div>
                             ))}
                           </div>
                         </div>

                         <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-6 border border-border/30 modal-element shadow-lg">
                           <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                             <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-500 to-green-400 rounded-full"></div>
                             Solutions Implemented
                         </h3>
                           <div className="space-y-2">
                           {selectedProject.solutions.map((solution, index) => (
                               <div key={index} className="flex items-center gap-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20 hover:bg-background/50 transition-all duration-300 group">
                                 <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 group-hover:scale-125 group-hover:bg-green-400 transition-all duration-300"></div>
                                 <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">{solution}</span>
                               </div>
                             ))}
                           </div>
                         </div>
                     </div>
                   </div>

       
                   <div className="space-y-4 sm:space-y-6">
                     {/* Technologies */}
                      <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-border/30 modal-element shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                          <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-accent to-accent/60 rounded-full"></div>
                          Technologies Used
                       </h3>
                       <div className="flex flex-wrap gap-2">
                         {selectedProject.technologies.map((tech, index) => (
                           <span
                             key={index}
                              className="px-3 py-1.5 bg-accent/15 text-accent text-xs rounded-full border border-accent/30 hover:bg-accent/25 hover:scale-105 transition-all duration-300 font-medium backdrop-blur-sm"
                           >
                             {tech}
                           </span>
                         ))}
                       </div>
                     </div>

                                           {/* Enhanced Project Stats */}
                      <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-border/30 modal-element shadow-lg">
                        <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 flex items-center gap-2">
                          <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-accent to-accent/60 rounded-full"></div>
                          Project Statistics
                       </h3>
                       <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20 hover:bg-background/50 transition-all duration-300">
                            <span className="text-xs text-muted-foreground font-medium">Rating</span>
                            <div className="flex items-center gap-2">
                             <Star size={16} className="fill-yellow-400 text-yellow-400" />
                              <span className="font-bold text-base">{selectedProject.rating}</span>
                           </div>
                         </div>
                          <div className="flex items-center justify-between p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20 hover:bg-background/50 transition-all duration-300">
                            <span className="text-xs text-muted-foreground font-medium">Views</span>
                            <div className="flex items-center gap-2">
                              <Eye size={16} className="text-accent" />
                              <span className="font-bold text-base">{selectedProject.views.toLocaleString()}</span>
                           </div>
                         </div>
                          <div className="flex items-center justify-between p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20 hover:bg-background/50 transition-all duration-300">
                            <span className="text-xs text-muted-foreground font-medium">Duration</span>
                            <span className="font-bold text-base">{selectedProject.duration}</span>
                         </div>
                          <div className="flex items-center justify-between p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20 hover:bg-background/50 transition-all duration-300">
                            <span className="text-xs text-muted-foreground font-medium">Team Size</span>
                            <span className="font-bold text-base">{selectedProject.teamSize}</span>
                         </div>
                       </div>
                     </div>

                                           {/* Enhanced Project Links */}
                      <div className="bg-gradient-to-br from-background/60 via-background/50 to-background/60 backdrop-blur-xl rounded-3xl p-6 border border-border/30 modal-element shadow-lg">
                        <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent/60 rounded-full"></div>
                          Project Links
                       </h3>
                       <div className="space-y-3">
                         {selectedProject.liveUrl && (
                           <Button
                             variant="cta"
                             size="sm"
                             asChild
                              className="w-full interactive hover:scale-105 transition-all duration-300 shadow-lg shadow-accent/25"
                           >
                             <a
                               href={selectedProject.liveUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                                className="flex items-center gap-2"
                             >
                               <Globe size={16} />
                                <span className="font-semibold">Live Demo</span>
                                <ExternalLink size={14} />
                             </a>
                           </Button>
                         )}
                         {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                           <Button
                             variant="outline"
                             size="sm"
                             asChild
                              className="w-full interactive hover:scale-105 transition-all duration-300 border-accent/30 hover:bg-accent/10"
                           >
                             <a
                               href={selectedProject.githubUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                                className="flex items-center gap-2"
                             >
                               <Github size={16} />
                                <span className="font-semibold">GitHub Repository</span>
                                <ExternalLink size={14} />
                             </a>
                           </Button>
                         )}
                         {selectedProject.githubUrl2 && selectedProject.githubUrl2 !== "#" && (
                           <Button
                             variant="outline"
                             size="sm"
                             asChild
                              className="w-full interactive hover:scale-105 transition-all duration-300 border-accent/30 hover:bg-accent/10"
                           >
                             <a
                               href={selectedProject.githubUrl2}
                               target="_blank"
                               rel="noopener noreferrer"
                                className="flex items-center gap-2"
                             >
                               <Github size={16} />
                                <span className="font-semibold">GitHub Repository 2</span>
                                <ExternalLink size={14} />
                             </a>
                           </Button>
                         )}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
    </section>
  );
};