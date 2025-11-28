import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className = '', style }: GlassCardProps) {
  return (
    <div 
      className={`
        glass-card
        backdrop-blur-xl 
        bg-white/5 
        border border-white/10 
        rounded-xl 
        p-6 
        shadow-2xl
        relative
        ${className}
      `}
      style={style}
    >
      {/* ✅ ADD DARKER BASE LAYER */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20 
                      rounded-xl -z-20" />
      
      {children}
    </div>
  );
}
