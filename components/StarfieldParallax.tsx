'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  size: number;
  layer: number;
  opacity: number;
}

export default function StarfieldParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Generate stars on mount
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 100;
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          layer: Math.floor(Math.random() * 3) + 1,
          opacity: Math.random() * 0.5 + 0.5
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const offsetX = (e.clientX - rect.left - centerX) / centerX;
      const offsetY = (e.clientY - rect.top - centerY) / centerY;
      
      mouseX.set(offsetX * 20);
      mouseY.set(offsetY * 20);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Layer 1: Slow parallax */}
      <motion.div
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >
        {stars
          .filter(star => star.layer === 1)
          .map((star, i) => (
            <motion.div
              key={`star-1-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity * 0.3,
                boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.5)`
              }}
              animate={{
                opacity: [star.opacity * 0.3, star.opacity * 0.6, star.opacity * 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
      </motion.div>

      {/* Layer 2: Medium parallax */}
      <motion.div
        style={{
          x: useSpring(smoothMouseX, { damping: 20, stiffness: 120 }),
          y: useSpring(smoothMouseY, { damping: 20, stiffness: 120 }),
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >
        {stars
          .filter(star => star.layer === 2)
          .map((star, i) => (
            <motion.div
              key={`star-2-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity * 0.5,
                boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.7)`
              }}
              animate={{
                opacity: [star.opacity * 0.5, star.opacity * 0.8, star.opacity * 0.5],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
      </motion.div>

      {/* Layer 3: Fast parallax */}
      <motion.div
        style={{
          x: useSpring(smoothMouseX, { damping: 15, stiffness: 150 }),
          y: useSpring(smoothMouseY, { damping: 15, stiffness: 150 }),
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
      >
        {stars
          .filter(star => star.layer === 3)
          .map((star, i) => (
            <motion.div
              key={`star-3-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity * 0.8,
                boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.9)`
              }}
              animate={{
                opacity: [star.opacity * 0.8, star.opacity, star.opacity * 0.8],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
      </motion.div>
    </div>
  );
}
