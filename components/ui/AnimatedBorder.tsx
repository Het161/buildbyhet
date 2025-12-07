'use client';

import { motion } from 'framer-motion';

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  hoverOnly?: boolean;
}

export default function AnimatedBorder({ 
  children, 
  className = '',
  hoverOnly = true 
}: AnimatedBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <motion.div
        className={`absolute inset-0 rounded-xl bg-gradient-to-r from-electric-blue via-neon-purple to-electric-blue ${
          hoverOnly ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
          padding: '2px',
        }}
      />
      
      {/* Content */}
      <div className="relative bg-deep-navy rounded-xl">
        {children}
      </div>
    </div>
  );
}
