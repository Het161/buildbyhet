// ============================================
// ABOUT SECTION COMPONENT
// ============================================
// Features:
// - Bio and education information
// - Animated skill bars
// - Interests and specializations
// - Two-column layout (responsive)
// - Glassmorphism cards

'use client';

import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';

// ========== SKILLS DATA ==========
// Array of skills with proficiency levels (0-100)
const skills = [
  { name: 'React & Next.js', level: 75, color: 'from-electric-blue to-cyan-400' },
  { name: 'Python & FastAPI', level: 90, color: 'from-neon-purple to-purple-400' },
  { name: 'PostgreSQL & MongoDB', level: 80, color: 'from-electric-blue to-blue-400' },
  { name: 'Flutter & Mobile Dev', level: 70, color: 'from-neon-pink to-pink-400' },
  { name: 'Docker & CI/CD', level: 70, color: 'from-cyan-400 to-electric-blue' },
];

// ========== EDUCATION DATA ==========
const education = {
  university: 'Gandhinagar University',
  degree: 'B.Tech',
  major: 'Computer Science & Engineering',
  year: '2nd Year (2024-2028)',
  location: 'Ahmedabad, Gujarat',
};

// ========== INTERESTS DATA ==========
const interests = [
  'Web3 & Blockchain Technology',
  'Futuristic UI/UX Design',
  'AI-Powered Systems',
  'Hackathon Competitions',
  'Open Source Contribution',
  'Building SaaS Products',
];

// ========== MAIN COMPONENT ==========
export default function About() {
  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* ========== SECTION TITLE ========== */}
        <motion.h2 
          className="text-5xl font-bold text-center mb-4 glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ABOUT ME
        </motion.h2>
        
        <motion.p
          className="text-center text-gray-400 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Get to know me better - my background, skills, and interests
        </motion.p>

        {/* ========== TWO-COLUMN LAYOUT ========== */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* 
            Mobile: 1 column (stacked)
            Desktop: 2 columns side-by-side
          */}
          
          {/* ========== LEFT COLUMN: BIO & EDUCATION ========== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}    // Start: invisible, slide from left
            whileInView={{ opacity: 1, x: 0 }}   // End: visible, normal position
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard>
              {/* --- EDUCATION SECTION --- */}
              <h3 className="text-3xl font-bold mb-6 text-electric-blue flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Education
              </h3>
              
              <div className="space-y-3 mb-8">
                {/* University name */}
                <p className="text-2xl font-semibold text-white">
                  {education.university}
                </p>
                
                {/* Degree and major */}
                <p className="text-lg text-gray-300">
                  {education.degree} - {education.major}
                </p>
                
                {/* Year and location */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {education.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {education.location}
                  </span>
                </div>
              </div>
              
              {/* --- BIO SECTION --- */}
              <h3 className="text-3xl font-bold mb-6 text-electric-blue flex items-center gap-2 mt-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                About
              </h3>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm a passionate full-stack developer currently pursuing my B.Tech in Computer Engineering. 
                I specialize in building modern web and mobile applications using cutting-edge technologies.
              </p>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                My journey in tech started with a curiosity for how things work, which evolved into 
                a passion for creating solutions that solve real-world problems. I actively participate 
                in hackathons and have worked on projects ranging from productivity tools to AI-powered systems.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                or planning my next project. I believe in continuous learning and love sharing knowledge 
                with the developer community.
              </p>
            </GlassCard>
          </motion.div>

          {/* ========== RIGHT COLUMN: SKILLS ========== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}      // Start: invisible, slide from right
            whileInView={{ opacity: 1, x: 0 }}    // End: visible, normal position
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard>
              <h3 className="text-3xl font-bold mb-8 text-electric-blue flex items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Skills & Expertise
              </h3>
              
              <div className="space-y-6">
                {/* SKILL BARS */}
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    {/* Skill name and percentage */}
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-electric-blue font-semibold">{skill.level}%</span>
                    </div>
                    
                    {/* Progress bar container */}
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                      {/* Animated progress bar fill */}
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        // ANIMATION: Bar fills from 0 to skill level
                        initial={{ width: 0 }}                    // Start: empty
                        whileInView={{ width: `${skill.level}%` }} // End: fills to percentage
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1,                            // 1 second animation
                          delay: index * 0.1,                     // Stagger: each bar delays 0.1s more
                          ease: 'easeOut'                         // Smooth deceleration
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* ========== INTERESTS SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard>
            <h3 className="text-3xl font-bold mb-6 text-electric-blue flex items-center gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Interests & Passion
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Grid of interest cards */}
              {interests.map((interest, index) => (
                <motion.div
                  key={interest}
                  className="px-4 py-3 
                             bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 
                             border border-white/10 
                             rounded-xl
                             hover:border-electric-blue/30 hover:bg-white/5
                             transition-all duration-300
                             flex items-center gap-2"
                  
                  // HOVER ANIMATION
                  whileHover={{ scale: 1.05, y: -2 }}
                  
                  // STAGGERED ENTRANCE
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-electric-blue text-lg">▸</span>
                  <span className="text-gray-300 text-sm">{interest}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// CUSTOMIZATION GUIDE:
// ============================================
// 1. UPDATE SKILLS: Modify the `skills` array with your proficiency levels
// 2. UPDATE EDUCATION: Change the `education` object with your details
// 3. UPDATE INTERESTS: Modify the `interests` array
// 4. ADD CERTIFICATIONS: Create new section similar to Education
// 5. ADD PHOTO: Add your image in the bio section

// ============================================
// ANIMATION BREAKDOWN:
// ============================================
// - Left card: Slides in from left
// - Right card: Slides in from right
// - Skill bars: Fill animation with stagger
// - Interest badges: Scale up with stagger
// - All animations trigger once when scrolled into view
