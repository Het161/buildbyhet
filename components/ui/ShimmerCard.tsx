'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ShimmerCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ShimmerCard({ children, className = '' }: ShimmerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content */}
      {children}

      {/* Shimmer effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '100%', opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            width: '50%',
          }}
        />
      )}
    </motion.div>
  );
}
