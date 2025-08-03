import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Calendar, Users, Star, Eye, Code2, Palette, Globe } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

type ProjectFilter = 'all' | 'native' | 'wordpress' | 'ui';

interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectFilter;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
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
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce WordPress Site",
      description: "Custom WooCommerce solution with advanced product filtering and payment integration.",
      longDescription: "A comprehensive e-commerce platform built with WordPress and WooCommerce, featuring advanced product filtering, secure payment processing, and a modern responsive design. The project includes custom plugin development for enhanced functionality and seamless user experience.",
      category: "wordpress",
      technologies: ["WordPress", "WooCommerce", "PHP", "CSS3", "JavaScript", "MySQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
      ],
      features: ["Advanced product filtering", "Secure payment processing", "Mobile responsive design", "Custom admin dashboard"],
      challenges: ["Complex product variations", "Payment gateway integration", "Performance optimization"],
      solutions: ["Custom WooCommerce hooks", "Stripe API integration", "Caching and CDN implementation"],
      duration: "3 months",
      teamSize: "Solo",
      rating: 4.8,
      views: 1250
    },
    {
      id: 2,
      title: "React Portfolio Website",
      description: "Modern, responsive portfolio built with React and TypeScript featuring smooth animations.",
      longDescription: "A cutting-edge portfolio website showcasing modern web development techniques with React, TypeScript, and Framer Motion. Features include smooth page transitions, interactive animations, and a fully responsive design that adapts to all devices.",
      category: "native",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ],
      features: ["Smooth animations", "Dark/Light mode", "Contact form", "Project showcase"],
      challenges: ["Performance optimization", "Cross-browser compatibility", "SEO implementation"],
      solutions: ["Code splitting", "Progressive enhancement", "Meta tags optimization"],
      duration: "2 months",
      teamSize: "Solo",
      rating: 4.9,
      views: 2100
    },
    {
      id: 3,
      title: "Business Website Redesign",
      description: "Complete UI/UX redesign and development for a professional services company.",
      longDescription: "A complete transformation of a professional services company website, focusing on modern design principles, improved user experience, and enhanced conversion rates. The project involved extensive user research and iterative design improvements.",
      category: "ui",
      technologies: ["Figma", "WordPress", "Custom CSS", "JavaScript", "Adobe Creative Suite"],
      liveUrl: "https://example.com",
      images: [
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop"
      ],
      features: ["Modern UI design", "Improved navigation", "Contact forms", "Service showcase"],
      challenges: ["Brand consistency", "User flow optimization", "Content organization"],
      solutions: ["Design system creation", "User journey mapping", "Information architecture"],
      duration: "4 months",
      teamSize: "3 people",
      rating: 4.7,
      views: 890
    },
    {
      id: 4,
      title: "Custom WordPress Theme",
      description: "Bespoke WordPress theme with custom post types and advanced customizer options.",
      longDescription: "A fully custom WordPress theme developed from scratch, featuring advanced customizer options, custom post types, and a modular design system. The theme includes comprehensive documentation and is optimized for performance and SEO.",
      category: "wordpress",
      technologies: ["WordPress", "PHP", "ACF", "SCSS", "Gulp", "Git"],
      githubUrl: "https://github.com",
      images: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
      ],
      features: ["Custom post types", "Advanced customizer", "Modular design", "Performance optimized"],
      challenges: ["Theme architecture", "Customizer API", "Backward compatibility"],
      solutions: ["Object-oriented PHP", "WordPress standards", "Version control"],
      duration: "6 weeks",
      teamSize: "Solo",
      rating: 4.6,
      views: 750
    },
    {
      id: 5,
      title: "Task Management App",
      description: "Full-stack web application for project and task management with team collaboration features.",
      longDescription: "A comprehensive task management application built with modern web technologies, featuring real-time collaboration, project tracking, and team management capabilities. The app includes advanced features like time tracking, reporting, and integrations.",
      category: "native",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "JWT"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      images: [
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
      ],
      features: ["Real-time collaboration", "Project tracking", "Team management", "Time tracking"],
      challenges: ["Real-time updates", "Data synchronization", "User permissions"],
      solutions: ["WebSocket implementation", "Optimistic updates", "Role-based access"],
      duration: "5 months",
      teamSize: "4 people",
      rating: 4.8,
      views: 1650
    },
    {
      id: 6,
      title: "Restaurant Website UI",
      description: "Elegant restaurant website design with online menu and reservation system interface.",
      longDescription: "An elegant and user-friendly restaurant website design featuring an online menu system, reservation booking interface, and beautiful food photography. The design focuses on creating an appetizing and professional online presence.",
      category: "ui",
      technologies: ["Figma", "Adobe XD", "Prototyping", "User Research", "Adobe Photoshop"],
      liveUrl: "https://example.com",
      images: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
      ],
      features: ["Online menu system", "Reservation booking", "Food gallery", "Contact information"],
      challenges: ["Menu management", "Booking system UX", "Mobile optimization"],
      solutions: ["Dynamic menu updates", "Simplified booking flow", "Touch-friendly design"],
      duration: "3 weeks",
      teamSize: "2 people",
      rating: 4.5,
      views: 620
    }
  ];

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'native', label: 'Native Web' },
    { key: 'wordpress', label: 'WordPress' },
    { key: 'ui', label: 'UI Design' }
  ] as const;

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
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-tl from-accent/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Featured Projects
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
            A showcase of my recent work in WordPress development, web applications, and UI design.
          </p>

          {/* Filter buttons */}
          <div className={`flex flex-wrap justify-center gap-3 transition-all duration-700 ease-out ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`} style={{transitionDelay: '0.2s'}}>
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? "cta" : "outline"}
                onClick={() => setActiveFilter(filter.key)}
                className="interactive"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div 
          ref={contentRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-background/60 backdrop-blur-sm rounded-xl border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-lg sm:hover:shadow-xl hover:shadow-accent/10 overflow-hidden cursor-pointer ${
                contentVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: `${index * 0.1}s`}}
              onClick={() => openModal(project)}
            >
              {/* Project image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img 
                  src={project.images[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20"></div>
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm text-accent rounded-full border border-accent/20">
                    {project.category === 'wordpress' ? 'WordPress' : 
                     project.category === 'native' ? 'Web App' : 'UI Design'}
                  </span>
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-4 right-4 flex items-center gap-3 text-white/80 text-xs">
                  <div className="flex items-center gap-1">
                    <Eye size={12} />
                    <span>{project.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span>{project.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Project stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{project.teamSize}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full interactive"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(project);
                  }}
                >
                  View Details
                </Button>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with smooth animation */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md backdrop-entrance"
            onClick={closeModal}
          />
          
          {/* Modal container with smooth entrance animation */}
          <div 
            className="relative bg-background/95 backdrop-blur-xl rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-border/20 modal-entrance"
          >
            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/20 via-transparent to-accent/10 opacity-0 animate-pulse"></div>
            
                         {/* Modal content with scroll */}
             <div className="relative max-h-[95vh] overflow-y-auto">
               {/* Modal Header */}
               <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/50 p-6 rounded-t-3xl">
                 <div className="flex items-center justify-between">
                   <div>
                     <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                       {selectedProject.title}
                     </h2>
                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
                       <span className="px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/20">
                         {selectedProject.category === 'wordpress' ? 'WordPress' : 
                          selectedProject.category === 'native' ? 'Web App' : 'UI Design'}
                       </span>
                       <div className="flex items-center gap-1">
                         <Calendar size={14} />
                         <span>{selectedProject.duration}</span>
                       </div>
                       <div className="flex items-center gap-1">
                         <Users size={14} />
                         <span>{selectedProject.teamSize}</span>
                       </div>
                     </div>
                   </div>
                   <Button
                     variant="ghost"
                     size="sm"
                     onClick={closeModal}
                     className="text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-full transition-all duration-300"
                   >
                     <X size={20} />
                   </Button>
                 </div>
               </div>

               {/* Modal Content */}
               <div className="p-6">
                 {/* Image Gallery */}
                 <div className="relative mb-8">
                   <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-muted shadow-lg">
                     <img 
                       src={selectedProject.images[currentImageIndex]} 
                       alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                       className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                     />
                     
                     {/* Navigation arrows */}
                     {selectedProject.images.length > 1 && (
                       <>
                         <button
                           onClick={prevImage}
                           className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-accent/10 hover:scale-110 transition-all duration-300 shadow-lg"
                         >
                           <ChevronLeft size={24} />
                         </button>
                         <button
                           onClick={nextImage}
                           className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-accent/10 hover:scale-110 transition-all duration-300 shadow-lg"
                         >
                           <ChevronRight size={24} />
                         </button>
                       </>
                     )}
                   </div>

                   {/* Image indicators */}
                   {selectedProject.images.length > 1 && (
                     <div className="flex justify-center gap-3 mt-6">
                       {selectedProject.images.map((_, index) => (
                         <button
                           key={index}
                           onClick={() => setCurrentImageIndex(index)}
                           className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                             index === currentImageIndex 
                               ? 'bg-accent shadow-lg shadow-accent/30' 
                               : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                           }`}
                         />
                       ))}
                     </div>
                   )}
                 </div>

                 {/* Project Details */}
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {/* Main Content */}
                   <div className="lg:col-span-2 space-y-8">
                     <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30 modal-element">
                       <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                         <div className="w-2 h-2 bg-accent rounded-full"></div>
                         Description
                       </h3>
                       <p className="text-muted-foreground leading-relaxed">
                         {selectedProject.longDescription}
                       </p>
                     </div>

                     <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30 modal-element">
                       <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                         <div className="w-2 h-2 bg-accent rounded-full"></div>
                         Key Features
                       </h3>
                       <ul className="space-y-3">
                         {selectedProject.features.map((feature, index) => (
                           <li key={index} className="flex items-start gap-3 text-muted-foreground group">
                             <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                             <span className="group-hover:text-primary transition-colors duration-300">{feature}</span>
                           </li>
                         ))}
                       </ul>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30 modal-element">
                         <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                           <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                           Challenges
                         </h3>
                         <ul className="space-y-3">
                           {selectedProject.challenges.map((challenge, index) => (
                             <li key={index} className="flex items-start gap-3 text-muted-foreground group">
                               <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                               <span className="group-hover:text-primary transition-colors duration-300">{challenge}</span>
                             </li>
                           ))}
                         </ul>
                       </div>

                       <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30 modal-element">
                         <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                           Solutions
                         </h3>
                         <ul className="space-y-3">
                           {selectedProject.solutions.map((solution, index) => (
                             <li key={index} className="flex items-start gap-3 text-muted-foreground group">
                               <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                               <span className="group-hover:text-primary transition-colors duration-300">{solution}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                     </div>
                   </div>

                   {/* Sidebar */}
                   <div className="space-y-6">
                     {/* Technologies */}
                     <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30 modal-element">
                       <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                         <div className="w-2 h-2 bg-accent rounded-full"></div>
                         Technologies
                       </h3>
                       <div className="flex flex-wrap gap-2">
                         {selectedProject.technologies.map((tech, index) => (
                           <span
                             key={index}
                             className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20 hover:bg-accent/20 hover:scale-105 transition-all duration-300"
                           >
                             {tech}
                           </span>
                         ))}
                       </div>
                     </div>

                     {/* Project Stats */}
                     <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30 modal-element">
                       <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                         <div className="w-2 h-2 bg-accent rounded-full"></div>
                         Project Stats
                       </h3>
                       <div className="space-y-3">
                         <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-300">
                           <span className="text-sm text-muted-foreground">Rating</span>
                           <div className="flex items-center gap-1">
                             <Star size={16} className="fill-yellow-400 text-yellow-400" />
                             <span className="font-semibold">{selectedProject.rating}</span>
                           </div>
                         </div>
                         <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-300">
                           <span className="text-sm text-muted-foreground">Views</span>
                           <div className="flex items-center gap-1">
                             <Eye size={16} />
                             <span className="font-semibold">{selectedProject.views}</span>
                           </div>
                         </div>
                         <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-300">
                           <span className="text-sm text-muted-foreground">Duration</span>
                           <span className="font-semibold">{selectedProject.duration}</span>
                         </div>
                         <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors duration-300">
                           <span className="text-sm text-muted-foreground">Team Size</span>
                           <span className="font-semibold">{selectedProject.teamSize}</span>
                         </div>
                       </div>
                     </div>

                     {/* Project Links */}
                     <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/30 modal-element">
                       <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                         <div className="w-2 h-2 bg-accent rounded-full"></div>
                         Links
                       </h3>
                       <div className="space-y-3">
                         {selectedProject.liveUrl && (
                           <Button
                             variant="cta"
                             size="sm"
                             asChild
                             className="w-full interactive hover:scale-105 transition-transform duration-300"
                           >
                             <a
                               href={selectedProject.liveUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                             >
                               <Globe size={16} />
                               Live Demo
                             </a>
                           </Button>
                         )}
                         {selectedProject.githubUrl && (
                           <Button
                             variant="outline"
                             size="sm"
                             asChild
                             className="w-full interactive hover:scale-105 transition-transform duration-300"
                           >
                             <a
                               href={selectedProject.githubUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                             >
                               <Github size={16} />
                               View Code
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