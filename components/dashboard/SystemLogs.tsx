'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

const logs = [
  '> Initializing HetOS v3.0...',
  '> Loading neural networks...',
  '> Connecting to API servers...',
  '> Quantum core activated...',
  '> Portfolio system ready.',
  '> Welcome, visitor.',
];

export default function SystemLogs() {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < logs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, logs[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 hidden lg:block"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <GlassCard className="w-80 p-4">
        <div className="text-xs text-gray-400 mb-2 font-mono">SYSTEM LOGS</div>
        <div className="space-y-1 font-mono text-xs">
          {displayedLogs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-cyber-green"
            >
              {log}
            </motion.div>
          ))}
          {currentIndex < logs.length && (
            <span className="text-cyber-green animate-pulse">_</span>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
