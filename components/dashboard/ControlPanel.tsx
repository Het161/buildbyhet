'use client';

import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { Activity, Cpu, Database, Zap } from 'lucide-react';

const metrics = [
  { icon: Cpu, label: 'FastAPI', value: '120ms', color: 'text-electric-blue' },
  { icon: Database, label: 'PostgreSQL', value: '99.9%', color: 'text-cyber-green' },
  { icon: Activity, label: 'Tests', value: '95%', color: 'text-neon-purple' },
  { icon: Zap, label: 'Latency', value: 'p95<220ms', color: 'text-yellow-400' },
];

export default function ControlPanel() {
  return (
    <motion.div
      className="fixed bottom-24 right-6 z-40 hidden lg:block"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.4 }}
    >
      <GlassCard className="w-64 p-4">
        <div className="text-xs text-gray-400 mb-3 font-mono">PERFORMANCE</div>
        <div className="space-y-3">
          {metrics.map((metric, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-xs text-gray-300">{metric.label}</span>
              </div>
              <span className={`text-xs font-mono ${metric.color}`}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
