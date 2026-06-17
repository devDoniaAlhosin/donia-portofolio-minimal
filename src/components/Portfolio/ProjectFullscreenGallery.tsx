import { X } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectFullscreenGalleryProps {
  src: string;
  alt: string;
  project: Project | null;
  currentImageIndex: number;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onUpdateImage: (src: string, alt: string) => void;
}

export const ProjectFullscreenGallery = ({
  src,
  alt,
  project,
  currentImageIndex,
  onClose,
  onPrevImage,
  onNextImage,
  onUpdateImage,
}: ProjectFullscreenGalleryProps) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4" onClick={onClose}>
    <div
      className="relative max-w-[90vw] max-h-[90vh] group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={src} alt={alt} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all hover:scale-110 z-10"
      >
        <X size={24} />
      </button>

      {project && project.images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevImage();
              const newIndex = currentImageIndex === 0 ? project.images.length - 1 : currentImageIndex - 1;
              onUpdateImage(
                project.images[newIndex],
                `${project.title} - Image ${newIndex + 1}`
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNextImage();
              const newIndex = currentImageIndex === project.images.length - 1 ? 0 : currentImageIndex + 1;
              onUpdateImage(
                project.images[newIndex],
                `${project.title} - Image ${newIndex + 1}`
              );
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
            {currentImageIndex + 1} / {project.images.length}
          </div>
        </>
      )}

      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
        <p className="text-white text-sm font-medium mb-1">{alt}</p>
        {project && (
          <p className="text-white/70 text-xs">Click outside or press ESC to close • Use arrow keys to navigate</p>
        )}
      </div>
    </div>
  </div>
);
