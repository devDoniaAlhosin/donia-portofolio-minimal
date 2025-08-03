import { useEffect, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners for mouse movement
    window.addEventListener('mousemove', updateMousePosition);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .interactive'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div
        className="cursor-dot"
        style={{
          left: `${mousePosition.x - 4}px`,
          top: `${mousePosition.y - 4}px`,
        }}
      />
      
      {/* Cursor outline */}
      <div
        className={`cursor-outline ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${mousePosition.x - 16}px`,
          top: `${mousePosition.y - 16}px`,
        }}
      />
    </>
  );
};