'use client';

import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over any interactive content
      const target = e.target as HTMLElement;
      const isOverCard = target.closest('.glass-card') || 
                         target.closest('button') ||
                         target.closest('a') ||
                         target.closest('input') ||
                         target.closest('textarea');
      
      // Hide glow when over interactive elements
      setOpacity(isOverCard ? 0 : 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        opacity,
        background: `radial-gradient(circle 300px at ${position.x}px ${position.y}px, 
          rgba(0, 217, 255, 0.06), 
          transparent 70%
        )`,
      }}
    />
  );
}
