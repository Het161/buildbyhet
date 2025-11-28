'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

export default function DigitalClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !time) {
    return (
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="p-4">
          <div className="text-3xl font-mono font-bold glow-text">
            --:--:--
          </div>
          <div className="text-xs text-gray-400 mt-2">Loading...</div>
        </GlassCard>
      </motion.div>
    );
  }

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const date = time.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <GlassCard className="p-4">
        <div className="text-3xl font-mono font-bold glow-text">
          {hours}:{minutes}
          <span className="text-electric-blue animate-pulse">:</span>
          {seconds}
        </div>
        <div className="text-xs text-gray-400 mt-2">{date}</div>
      </GlassCard>
    </motion.div>
  );
}
