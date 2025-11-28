// ============================================
// HERO SECTION COMPONENT
// ============================================
// First thing users see - introduces you with animations
// Uses: Framer Motion for animations, GlassCard for design

'use client';  // Required for client-side interactivity (animations, events)

import { motion } from 'framer-motion';  // Animation library
import GlassCard from './ui/GlassCard';  // Our glass card component

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* ========== ANIMATED BACKGROUND BLOBS ========== */}
      {/* These create the glowing orbs in the background */}
      <div className="absolute inset-0 opacity-30">
        {/* Blue blob - top left */}
        <div className="absolute top-20 left-10 w-72 h-72 
                        bg-electric-blue/20 rounded-full blur-3xl 
                        animate-pulse-glow">
          {/* Why blur-3xl? Creates soft glow effect */}
          {/* Why animate-pulse-glow? Makes it breathe/pulse */}
        </div>
        
        {/* Purple blob - bottom right */}
        <div className="absolute bottom-20 right-10 w-96 h-96 
                        bg-neon-purple/20 rounded-full blur-3xl 
                        animate-pulse-glow delay-1000">
          {/* delay-1000: Pulse out of sync with blue blob for dynamic feel */}
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* z-10: Ensures content appears above background blobs */}
        
        {/* MOTION WRAPPER: Animates entire card on page load */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}    // Start: invisible, 50px down
          animate={{ opacity: 1, y: 0 }}     // End: visible, normal position
          transition={{ duration: 0.8 }}      // Animation takes 0.8 seconds
        >
          {/* GLASS CARD: Contains all hero content */}
          <GlassCard className="text-center">
            
            {/* --- MAIN HEADING --- */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 glow-text"
              // Responsive: 5xl on mobile, 7xl on desktop (md: prefix)
              // glow-text: Custom CSS class (defined in globals.css)
              
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}  // Appears after card (staggered effect)
            >
              HEY, I'M <span className="text-electric-blue">HET PATEL</span> 👋
              {/* Why span? To color only "HET" differently */}
            </motion.h1>
            
            {/* --- SUBTITLE --- */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}  // Appears after heading
            >
              Full-Stack Developer from Ahmedabad
            </motion.p>
            
            {/* --- CALL-TO-ACTION BUTTON --- */}
            <motion.button
              className="px-8 py-4 
                         bg-electric-blue/20          // 20% blue background
                         border border-electric-blue  // Solid blue border
                         rounded-full                 // Pill shape
                         hover:bg-electric-blue/30    // Brighter on hover
                         transition-all duration-300  // Smooth transition
                         neon-border"                 // Custom glow effect
              
              // FRAMER MOTION GESTURES
              whileHover={{ scale: 1.05 }}  // Grow 5% on hover
              whileTap={{ scale: 0.95 }}    // Shrink 5% when clicked
              
              onClick={() => {
                // Smooth scroll to projects section
                document.getElementById('projects')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Explore Portfolio
            </motion.button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// --- WHY USE MOTION.DIV INSTEAD OF REGULAR DIV? ---
// Regular div: Static, no animations
// motion.div: Can animate opacity, position, scale, etc. automatically
// Framer Motion handles all the complex animation math for you

// --- WHY STAGGER ANIMATIONS (0.3s, 0.5s delays)? ---
// Creates a cascading effect - elements appear one after another
// More engaging than everything appearing at once
