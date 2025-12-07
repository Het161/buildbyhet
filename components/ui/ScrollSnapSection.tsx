'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollSnapSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function ScrollSnapSection({ 
  children, 
  id,
  className = '' 
}: ScrollSnapSectionProps) {
  return (
    <motion.section
      id={id}
      className={`scroll-snap-section ${className}`}
      style={{ scrollMarginTop: '80px' }} // ✅ CRITICAL FIX - Accounts for navbar
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}
