import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div 
      className={`
        relative backdrop-blur-xl bg-white/5 border border-white/10 
        rounded-3xl p-8 shadow-2xl 
        ${hover ? 'hover:bg-white/10 hover:border-electric-blue/30' : ''}
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
