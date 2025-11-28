'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GlassCard from '../ui/GlassCard';

export default function StatusWidgets() {
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [status, setStatus] = useState('ACTIVE');

  // Simulate CPU/RAM usage
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 30) + 20); // 20-50%
      setRam(Math.floor(Math.random() * 40) + 40); // 40-80%
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-24 right-6 z-40 space-y-4 hidden lg:block">
      {/* CPU Widget */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="w-48 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">CPU</span>
            <span className="text-xs text-electric-blue">{cpu}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-electric-blue to-cyber-green"
              initial={{ width: 0 }}
              animate={{ width: `${cpu}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* RAM Widget */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <GlassCard className="w-48 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">RAM</span>
            <span className="text-xs text-neon-purple">{ram}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-purple to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${ram}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* AI Core Status */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <GlassCard className="w-48 p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-xs text-gray-400">AI CORE</span>
          </div>
          <div className="text-sm font-semibold text-cyber-green mt-1">
            {status}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
