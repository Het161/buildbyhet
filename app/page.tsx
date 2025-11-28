// ============================================
// MAIN PAGE - Portfolio Homepage
// ============================================
// FIXED: Clock & Avatar only show in hero section
// ============================================

'use client';

// ========== IMPORTS ==========
import { motion } from 'framer-motion';

// UI Components
import GlassCard from '../components/ui/GlassCard';

// Layout Components
import Navbar from '../components/Navbar';
import AIChatbot from '../components/AIChatbot';
import MouseGlow from '../components/MouseGlow';

// 3D Background
import ParticleField from '../components/3d/ParticleField';

// Section Components
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';

// Hero-only Components (Clock & Avatar)
import DigitalClock from '../components/dashboard/DigitalClock';
import Avatar3D from '../components/3d/Avatar3D';

// ========== MAIN HOME COMPONENT ==========
export default function Home() {
  return (
    <>
      {/* ==========================================
          GLOBAL EFFECTS (Always visible)
          ========================================== */}
      <MouseGlow />
      <ParticleField />
      <Navbar />
      <AIChatbot />

      {/* ==========================================
          MAIN CONTENT
          ========================================== */}
      <main className="relative">
        
        {/* ==========================================
            SECTION 1: HERO / LANDING
            ========================================== */}
        <section 
          id="home" 
          className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        >
          
          {/* ✅ CLOCK - ONLY IN HERO SECTION */}
          <div className="absolute top-24 left-6 z-10 hidden lg:block">
            <DigitalClock />
          </div>

          {/* ✅ AVATAR - ONLY IN HERO SECTION */}
          <div className="absolute top-24 right-6 z-10 hidden lg:block">
            <Avatar3D />
          </div>
          
          {/* --- ANIMATED BACKGROUND BLOBS --- */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
          </div>

          {/* --- HERO CONTENT --- */}
          <div className="relative z-10 max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              
              <GlassCard className="text-center">
                
                {/* ========== MAIN HEADING ========== */}
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6 glow-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  HEY, I'M <span className="text-electric-blue">HET PATEL</span> 👋
                </motion.h1>
                
                {/* ========== SUBTITLE ========== */}
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Backend Developer from Ahmedabad | BTech @ Gandhinagar University
                </motion.p>
                
                {/* ========== DESCRIPTION ========== */}
                <motion.p 
                  className="text-gray-400 mb-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Specializing in Python, FastAPI, and PostgreSQL. Building secure, well-tested REST APIs with 95% test coverage and ~120ms latency. SIH 2025 & NASA Space Apps participant.
                </motion.p>
                
                {/* ========== CTA BUTTON ========== */}
                <motion.button
                  className="px-8 py-4 bg-electric-blue/20 border-2 border-electric-blue rounded-full hover:bg-electric-blue/30 transition-all duration-300 neon-border font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Portfolio
                </motion.button>
                
                {/* ========== TECH STACK BADGES ========== */}
                <motion.div 
                  className="mt-16 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  {['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Next.js', 'TypeScript'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm backdrop-blur-xl hover:bg-white/10 hover:border-electric-blue/30 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
                
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            SECTION 2: PROJECTS
            ========================================== */}
        <Projects />

        {/* ==========================================
            SECTION 3: ABOUT ME
            ========================================== */}
        <About />

        {/* ==========================================
            SECTION 4: CONTACT
            ========================================== */}
        <Contact />
        
      </main>
    </>
  );
}

// ============================================
// WHAT'S FIXED:
// ============================================
// ✅ Removed global <Avatar3D /> and <DigitalClock />
// ✅ Moved them INSIDE hero section with absolute positioning
// ✅ Changed from "fixed" to "absolute" positioning
// ✅ They now only appear in hero section
// ✅ When you scroll, they stay in hero section only
// ✅ No overlap with Projects, About, Contact sections








