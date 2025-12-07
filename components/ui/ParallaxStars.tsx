'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: string;
}

export default function ParallaxStars() {
  const { scrollY } = useScroll();
  
  // Different layers move at different speeds
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);   // Slow layer
  const y2 = useTransform(scrollY, [0, 1000], [0, 400]);   // Medium layer
  const y3 = useTransform(scrollY, [0, 1000], [0, 600]);   // Fast layer

  // ✅ FIX: Generate stars only on client side
  const [stars, setStars] = useState<{
    slow: Star[];
    medium: Star[];
    fast: Star[];
  }>({ slow: [], medium: [], fast: [] });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Generate stars after component mounts (client-side only)
    const generateStars = (count: number, size: string): Star[] => {
      return Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: size,
      }));
    };

    setStars({
      slow: generateStars(25, '1.5px'),
      medium: generateStars(40, '1px'),
      fast: generateStars(60, '0.5px'),
    });

    setIsMounted(true);
  }, []);

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Slow layer - Large stars */}
      <motion.div className="absolute inset-0" style={{ y: y1 }}>
        {stars.slow.map((star) => (
          <div
            key={`slow-${star.id}`}
            className="absolute rounded-full bg-electric-blue opacity-40"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              boxShadow: '0 0 2px rgba(102, 126, 234, 0.5)',
            }}
          />
        ))}
      </motion.div>

      {/* Medium layer */}
      <motion.div className="absolute inset-0" style={{ y: y2 }}>
        {stars.medium.map((star) => (
          <div
            key={`medium-${star.id}`}
            className="absolute rounded-full bg-neon-purple opacity-35"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              boxShadow: '0 0 2px rgba(139, 92, 246, 0.4)',
            }}
          />
        ))}
      </motion.div>

      {/* Fast layer - Small stars */}
      <motion.div className="absolute inset-0" style={{ y: y3 }}>
        {stars.fast.map((star) => (
          <div
            key={`fast-${star.id}`}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
