'use client';

// ========== IMPORTS ==========
import { motion } from 'framer-motion';

// NEW: Enhanced UI Components
import ParticleBackground from '@/components/ui/ParticleBackground';
import CursorSpotlight from '@/components/ui/CursorSpotlight';
import ParallaxStars from '@/components/ui/ParallaxStars';
import ScrollSnapSection from '@/components/ui/ScrollSnapSection';
import MagneticButton from '@/components/ui/MagneticButton';
import ShimmerCard from '@/components/ui/ShimmerCard';
import ParallaxSection from '@/components/ui/ParallaxSection';

// Existing UI Components
import GlassCard from '@/components/ui/GlassCard';

// Layout Components
import Navbar from '@/components/Navbar';
import AIChatbot from '@/components/AIChatbot'; // ✅ NOW IMPORTED HERE ONLY

// 3D Background
import ParticleField from '@/components/3d/ParticleField';
import StarfieldParallax from '@/components/StarfieldParallax';

// Section Components
import Projects from '@/components/Projects';
import About from '@/components/About';
import Achievements from '@/components/Achievements'; 
import Contact from '@/components/Contact';

// Hero-only Components
import DigitalClock from '@/components/dashboard/DigitalClock';
import Avatar3D from '@/components/3d/Avatar3D';

// ========== MAIN HOME COMPONENT ==========
export default function Home() {
  return (
    <div className="scroll-snap-container">
      {/* ========== GLOBAL EFFECTS ========== */}
      <ParticleBackground />
      <CursorSpotlight />
      <ParallaxStars />
      <ParticleField />
      
      <Navbar />
      
      {/* ✅ CHATBOT NOW ONLY ON HOME PAGE */}
      <AIChatbot />

      {/* ========== MAIN CONTENT ========== */}
      <main className="relative">
        
        {/* ==========================================
            SECTION 1: HERO / LANDING (FIXED ALIGNMENT)
            ========================================== */}
        <ScrollSnapSection 
          id="home"
          className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        >
          
          {/* ✅ PARALLAX STARS BACKGROUND */}
          <StarfieldParallax />
          
          {/* ✅ CLOCK - ONLY IN HERO SECTION */}
          <ParallaxSection speed={0.1} className="absolute top-24 left-6 z-10 hidden lg:block">
            <DigitalClock />
          </ParallaxSection>

          {/* ✅ AVATAR - ONLY IN HERO SECTION */}
          <ParallaxSection speed={0.15} className="absolute top-24 right-6 z-10 hidden lg:block">
            <Avatar3D />
          </ParallaxSection>
          
          {/* --- ANIMATED BACKGROUND BLOBS (SMALLER SIZE) --- */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-electric-blue/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
          </div>

          {/* --- HERO CONTENT (BETTER ALIGNMENT) --- */}
          <ParallaxSection speed={0.3} className="relative z-10 w-full max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              
              <ShimmerCard className="w-full">
                <GlassCard className="text-center py-12 px-8">
                  
                  {/* ========== MAIN HEADING ========== */}
                  <motion.h1 
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 glow-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    HEY, I'M <span className="text-electric-blue">HET PATEL</span> 👋
                  </motion.h1>
                  
                  {/* ========== SUBTITLE ========== */}
                  <motion.p 
                    className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Backend Developer from Ahmedabad | BTech @ Gandhinagar University
                  </motion.p>
                  
                  {/* ========== DESCRIPTION ========== */}
                  <motion.p 
                    className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Building secure, high-performance REST APIs with Python & FastAPI
                  </motion.p>
                  
                  {/* ========== DUAL CTA BUTTONS (CENTERED + MAGNETIC) ========== */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    {/* PRIMARY: Explore Portfolio */}
                    <MagneticButton
                      className="px-8 py-4 w-full sm:w-auto
                                 bg-electric-blue/20 
                                 border-2 border-electric-blue 
                                 rounded-full 
                                 hover:bg-electric-blue/30 
                                 transition-all duration-300 
                                 neon-border
                                 font-semibold
                                 flex items-center justify-center gap-2"
                      magneticStrength={0.4}
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
                      >
                        <path 
                          d="M7 3L14 10L7 17" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round"
                        />
                      </svg>
                    </MagneticButton>

                    {/* SECONDARY: Download Resume */}
                    <MagneticButton
                      className="px-8 py-4 w-full sm:w-auto
                                 bg-transparent
                                 border-2 border-neon-purple 
                                 rounded-full 
                                 hover:bg-neon-purple/10
                                 transition-all duration-300
                                 font-semibold
                                 flex items-center justify-center gap-2
                                 group"
                      magneticStrength={0.4}
                      onClick={() => {
                        window.open('/resume.pdf', '_blank');
                      }}
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
                    </MagneticButton>
                  </motion.div>
                  
                  {/* ========== TECH STACK BADGES (CENTERED) ========== */}
                  <motion.div 
                    className="flex flex-wrap justify-center items-center gap-3 max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    {['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript'].map((tech) => (
                      <motion.span 
                        key={tech}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm backdrop-blur-xl hover:bg-white/10 hover:border-electric-blue/30 transition-all duration-300 cursor-default"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                </GlassCard>
              </ShimmerCard>
            </motion.div>
          </ParallaxSection>
        </ScrollSnapSection>

        {/* ==========================================
            SECTION 2: PROJECTS
            ========================================== */}
        <ScrollSnapSection id="projects">
          <Projects />
        </ScrollSnapSection>

        {/* ==========================================
            SECTION 2.5: ACHIEVEMENTS
            ========================================== */}
        <ScrollSnapSection id="achievements">
          <Achievements />
        </ScrollSnapSection>

        {/* ==========================================
            SECTION 3: ABOUT ME
            ========================================== */}
        <ScrollSnapSection id="about">
          <About />
        </ScrollSnapSection>

        {/* ==========================================
            SECTION 4: CONTACT
            ========================================== */}
        <ScrollSnapSection id="contact">
          <Contact />
        </ScrollSnapSection>
        
      </main>
    </div>
  );
}
