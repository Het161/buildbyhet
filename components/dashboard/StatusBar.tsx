'use client';

import { motion } from 'framer-motion';

const statusIndicators = [
  { label: 'API', status: 'ONLINE', color: 'bg-cyber-green' },
  { label: 'DB', status: 'ONLINE', color: 'bg-cyber-green' },
  { label: 'AUTH', status: 'ACTIVE', color: 'bg-electric-blue' },
  { label: 'CACHE', status: 'HOT', color: 'bg-yellow-400' },
];

export default function StatusBar() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-xl border-t border-white/10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        
        {/* Left: Status Indicators */}
        <div className="flex items-center gap-6">
          {statusIndicators.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse`} />
              <span className="text-xs text-gray-400">
                {item.label}: <span className="text-white">{item.status}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Right: Build Info */}
        <div className="text-xs text-gray-400">
          Build: v3.0.1 | Uptime: 99.9%
        </div>
      </div>
    </motion.div>
  );
}
