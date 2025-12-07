// // ============================================
// // HERO SECTION COMPONENT
// // ============================================
// // First thing users see - introduces you with animations
// // Uses: Framer Motion for animations, GlassCard for design

// 'use client';  // Required for client-side interactivity (animations, events)

// import { motion } from 'framer-motion';  // Animation library
// import GlassCard from './ui/GlassCard';  // Our glass card component

// export default function Hero() {
//   return (
//     <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
//       {/* ========== ANIMATED BACKGROUND BLOBS ========== */}
//       {/* These create the glowing orbs in the background */}
//       <div className="absolute inset-0 opacity-30">
//         {/* Blue blob - top left */}
//         <div className="absolute top-20 left-10 w-72 h-72 
//                         bg-electric-blue/20 rounded-full blur-3xl 
//                         animate-pulse-glow">
//           {/* Why blur-3xl? Creates soft glow effect */}
//           {/* Why animate-pulse-glow? Makes it breathe/pulse */}
//         </div>
        
//         {/* Purple blob - bottom right */}
//         <div className="absolute bottom-20 right-10 w-96 h-96 
//                         bg-neon-purple/20 rounded-full blur-3xl 
//                         animate-pulse-glow delay-1000">
//           {/* delay-1000: Pulse out of sync with blue blob for dynamic feel */}
//         </div>
//       </div>

//       {/* ========== MAIN CONTENT ========== */}
//       <div className="relative z-10 max-w-6xl mx-auto">
//         {/* z-10: Ensures content appears above background blobs */}
        
//         {/* MOTION WRAPPER: Animates entire card on page load */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}    // Start: invisible, 50px down
//           animate={{ opacity: 1, y: 0 }}     // End: visible, normal position
//           transition={{ duration: 0.8 }}      // Animation takes 0.8 seconds
//         >
//           {/* GLASS CARD: Contains all hero content */}
//           <GlassCard className="text-center">
            
//             {/* --- MAIN HEADING --- */}
//             <motion.h1 
//               className="text-5xl md:text-7xl font-bold mb-6 glow-text"
//               // Responsive: 5xl on mobile, 7xl on desktop (md: prefix)
//               // glow-text: Custom CSS class (defined in globals.css)
              
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}  // Appears after card (staggered effect)
//             >
//               HEY, I'M <span className="text-electric-blue">HET PATEL</span> 👋
//               {/* Why span? To color only "HET" differently */}
//             </motion.h1>
            
//             {/* --- SUBTITLE --- */}
//             <motion.p 
//               className="text-xl md:text-2xl text-gray-300 mb-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}  // Appears after heading
//             >
//               Full-Stack Developer from Ahmedabad
//             </motion.p>
            
//             {/* --- CALL-TO-ACTION BUTTON --- */}
//             <motion.button
//               className="px-8 py-4 
//                          bg-electric-blue/20          // 20% blue background
//                          border border-electric-blue  // Solid blue border
//                          rounded-full                 // Pill shape
//                          hover:bg-electric-blue/30    // Brighter on hover
//                          transition-all duration-300  // Smooth transition
//                          neon-border"                 // Custom glow effect
              
//               // FRAMER MOTION GESTURES
//               whileHover={{ scale: 1.05 }}  // Grow 5% on hover
//               whileTap={{ scale: 0.95 }}    // Shrink 5% when clicked
              
//               onClick={() => {
//                 // Smooth scroll to projects section
//                 document.getElementById('projects')?.scrollIntoView({ 
//                   behavior: 'smooth' 
//                 });
//               }}
//             >
//               Explore Portfolio
//             </motion.button>
//           </GlassCard>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // --- WHY USE MOTION.DIV INSTEAD OF REGULAR DIV? ---
// // Regular div: Static, no animations
// // motion.div: Can animate opacity, position, scale, etc. automatically
// // Framer Motion handles all the complex animation math for you

// // --- WHY STAGGER ANIMATIONS (0.3s, 0.5s delays)? ---
// // Creates a cascading effect - elements appear one after another
// // More engaging than everything appearing at once






// ============================================
// ENHANCED HERO SECTION COMPONENT
// ============================================
// Improvements:
// ✅ Reduced card padding for tighter layout
// ✅ Subtle motion: fade-up + scale + gentle oscillation
// ✅ Parallax mouse-tracking stars background
// ✅ Dual CTA buttons (Explore + Download Resume)

'use client';

import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import StarfieldParallax from './StarfieldParallax';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* ========== PARALLAX STARS BACKGROUND ========== */}
      <StarfieldParallax />
      
      {/* ========== ANIMATED BACKGROUND BLOBS ========== */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 
                        bg-electric-blue/20 rounded-full blur-3xl 
                        animate-pulse-glow" />
        
        <div className="absolute bottom-20 right-10 w-96 h-96 
                        bg-neon-purple/20 rounded-full blur-3xl 
                        animate-pulse-glow delay-1000" />
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        
        {/* ENHANCED MOTION WRAPPER */}
        {/* Fade-up + scale on load, then gentle oscillation */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1
          }}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },
            y: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Gentle continuous oscillation */}
          <motion.div
            animate={{ 
              y: [0, -3, 0, 3, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            {/* GLASS CARD - REDUCED PADDING */}
            <GlassCard className="text-center py-8 px-6 md:py-10 md:px-8">
              
              {/* --- MAIN HEADING --- */}
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 glow-text leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                HEY, I'M <span className="text-electric-blue">HET PATEL</span> 👋
              </motion.h1>
              
              {/* --- SUBTITLE --- */}
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Full-Stack Developer from Ahmedabad
              </motion.p>
              
              {/* ========== DUAL CTA BUTTONS (UPDATED) ========== */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {/* PRIMARY CTA: Explore Portfolio */}
                <motion.button
                  className="px-8 py-4 w-full sm:w-auto
                             bg-electric-blue/20 
                             border border-electric-blue 
                             rounded-full 
                             hover:bg-electric-blue/30 
                             transition-all duration-300 
                             neon-border
                             font-semibold
                             flex items-center justify-center gap-2"
                  
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  <span>Explore Portfolio</span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path 
                      d="M7 3L14 10L7 17" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.button>

                {/* SECONDARY CTA: Download Resume */}
                <motion.a
                  href="/resume.pdf"
                  download="Het_Patel_Resume.pdf"
                  className="px-8 py-4 w-full sm:w-auto
                             bg-transparent
                             border-2 border-neon-purple 
                             rounded-full 
                             hover:bg-neon-purple/10
                             transition-all duration-300
                             font-semibold
                             flex items-center justify-center gap-2
                             group"
                  
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                    className="transition-transform group-hover:translate-y-1"
                  >
                    <path 
                      d="M10 3V13M10 13L6 9M10 13L14 9M4 17H16" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Download Resume</span>
                </motion.a>
              </motion.div>
              
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// IMPROVEMENTS IMPLEMENTED
// ============================================

// 1. REDUCED PADDING:
//    - py-8 px-6 on mobile
//    - md:py-10 md:px-8 on desktop
//    - mb-4 for heading, mb-8 for subtitle and buttons
//    Result: Tighter layout, more content above fold

// 2. ENHANCED MOTION:
//    - initial: opacity 0, y: 30, scale: 0.95 (fade from below + small)
//    - animate: smooth fade-up + scale to 1
//    - continuous: gentle oscillation (y: [0, -3, 0, 3, 0])
//    Result: Premium feel with subtle movement

// 3. PARALLAX STARS:
//    - StarfieldParallax component with 3 layers
//    - Layer 1: slow (0.5x mouse movement)
//    - Layer 2: medium (1x mouse movement)
//    - Layer 3: fast (1.5x mouse movement)
//    Result: 3D depth effect

// 4. DUAL CTA BUTTONS:
//    - Primary: "Explore Portfolio" (electric blue border/glow)
//    - Secondary: "Download Resume" (neon purple outline)
//    - Both have hover animations (scale + vertical movement)
//    - Both have icons that animate on hover
//    - Responsive: stack on mobile, side-by-side on desktop
//    - mb-8 spacing below buttons
//    Result: Clear user actions, professional layout
