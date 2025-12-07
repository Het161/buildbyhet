// // ============================================
// // ABOUT SECTION COMPONENT
// // ============================================
// // Features:
// // - Bio and education information
// // - Animated skill bars
// // - Interests and specializations
// // - Two-column layout (responsive)
// // - Glassmorphism cards

// 'use client';

// import { motion } from 'framer-motion';
// import GlassCard from './ui/GlassCard';

// // ========== SKILLS DATA ==========
// // Array of skills with proficiency levels (0-100)
// const skills = [
//   { name: 'React & Next.js', level: 75, color: 'from-electric-blue to-cyan-400' },
//   { name: 'Python & FastAPI', level: 90, color: 'from-neon-purple to-purple-400' },
//   { name: 'PostgreSQL & MongoDB', level: 80, color: 'from-electric-blue to-blue-400' },
//   { name: 'Flutter & Mobile Dev', level: 70, color: 'from-neon-pink to-pink-400' },
//   { name: 'Docker & CI/CD', level: 70, color: 'from-cyan-400 to-electric-blue' },
// ];

// // ========== EDUCATION DATA ==========
// const education = {
//   university: 'Gandhinagar University',
//   degree: 'B.Tech',
//   major: 'Computer Science & Engineering',
//   year: '2nd Year (2024-2028)',
//   location: 'Ahmedabad, Gujarat',
// };

// // ========== INTERESTS DATA ==========
// const interests = [
//   'Building Websites and Applications',
//   'Futuristic UI/UX Design',
//   'AI-Powered Systems',
//   'Hackathon Competitions',
//   'Open Source Contribution',
//   'Building SaaS Products',
// ];

// // ========== MAIN COMPONENT ==========
// export default function About() {
//   return (
//     <section id="about" className="min-h-screen py-20 px-4">
//       <div className="max-w-7xl mx-auto">
        
//         {/* ========== SECTION TITLE ========== */}
//         <motion.h2 
//           className="text-5xl font-bold text-center mb-4 glow-text"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//         >
//           ABOUT ME
//         </motion.h2>
        
//         <motion.p
//           className="text-center text-gray-400 mb-16"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//         >
//           Get to know me better - my background, skills, and interests
//         </motion.p>

//         {/* ========== TWO-COLUMN LAYOUT ========== */}
//         <div className="grid md:grid-cols-2 gap-8 mb-16">
//           {/* 
//             Mobile: 1 column (stacked)
//             Desktop: 2 columns side-by-side
//           */}
          
//           {/* ========== LEFT COLUMN: BIO & EDUCATION ========== */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}    // Start: invisible, slide from left
//             whileInView={{ opacity: 1, x: 0 }}   // End: visible, normal position
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <GlassCard>
//               {/* --- EDUCATION SECTION --- */}
//               <h3 className="text-3xl font-bold mb-6 text-electric-blue flex items-center gap-2">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//                 </svg>
//                 Education
//               </h3>
              
//               <div className="space-y-3 mb-8">
//                 {/* University name */}
//                 <p className="text-2xl font-semibold text-white">
//                   {education.university}
//                 </p>
                
//                 {/* Degree and major */}
//                 <p className="text-lg text-gray-300">
//                   {education.degree} - {education.major}
//                 </p>
                
//                 {/* Year and location */}
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-400">
//                   <span className="flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     {education.year}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {education.location}
//                   </span>
//                 </div>
//               </div>
              
//               {/* --- BIO SECTION --- */}
//               <h3 className="text-3xl font-bold mb-6 text-electric-blue flex items-center gap-2 mt-8">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 About
//               </h3>
              
//               <p className="text-gray-300 leading-relaxed mb-4">
//                 I'm a passionate full-stack developer currently pursuing my B.Tech in Computer Engineering. 
//                 I specialize in building modern web and mobile applications using cutting-edge technologies.
//               </p>
              
//               <p className="text-gray-300 leading-relaxed mb-4">
//                 My journey in tech started with a curiosity for how things work, which evolved into 
//                 a passion for creating solutions that solve real-world problems. I actively participate 
//                 in hackathons and have worked on projects ranging from productivity tools to AI-powered systems.
//               </p>
              
//               <p className="text-gray-300 leading-relaxed">
//                 When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
//                 or planning my next project. I believe in continuous learning and love sharing knowledge 
//                 with the developer community.
//               </p>
//             </GlassCard>
//           </motion.div>

//           {/* ========== RIGHT COLUMN: SKILLS ========== */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}      // Start: invisible, slide from right
//             whileInView={{ opacity: 1, x: 0 }}    // End: visible, normal position
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <GlassCard>
//               <h3 className="text-3xl font-bold mb-8 text-electric-blue flex items-center gap-2">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                 </svg>
//                 Skills & Expertise
//               </h3>
              
//               <div className="space-y-6">
//                 {/* SKILL BARS */}
//                 {skills.map((skill, index) => (
//                   <div key={skill.name}>
//                     {/* Skill name and percentage */}
//                     <div className="flex justify-between mb-2">
//                       <span className="text-gray-200 font-medium">{skill.name}</span>
//                       <span className="text-electric-blue font-semibold">{skill.level}%</span>
//                     </div>
                    
//                     {/* Progress bar container */}
//                     <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
//                       {/* Animated progress bar fill */}
//                       <motion.div
//                         className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
//                         // ANIMATION: Bar fills from 0 to skill level
//                         initial={{ width: 0 }}                    // Start: empty
//                         whileInView={{ width: `${skill.level}%` }} // End: fills to percentage
//                         viewport={{ once: true }}
//                         transition={{ 
//                           duration: 1,                            // 1 second animation
//                           delay: index * 0.1,                     // Stagger: each bar delays 0.1s more
//                           ease: 'easeOut'                         // Smooth deceleration
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </GlassCard>
//           </motion.div>
//         </div>

//         {/* ========== INTERESTS SECTION ========== */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <GlassCard>
//             <h3 className="text-3xl font-bold mb-6 text-electric-blue flex items-center gap-2">
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//               </svg>
//               Interests & Passion
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {/* Grid of interest cards */}
//               {interests.map((interest, index) => (
//                 <motion.div
//                   key={interest}
//                   className="px-4 py-3 
//                              bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 
//                              border border-white/10 
//                              rounded-xl
//                              hover:border-electric-blue/30 hover:bg-white/5
//                              transition-all duration-300
//                              flex items-center gap-2"
                  
//                   // HOVER ANIMATION
//                   whileHover={{ scale: 1.05, y: -2 }}
                  
//                   // STAGGERED ENTRANCE
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <span className="text-electric-blue text-lg">▸</span>
//                   <span className="text-gray-300 text-sm">{interest}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </GlassCard>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ============================================
// // CUSTOMIZATION GUIDE:
// // ============================================
// // 1. UPDATE SKILLS: Modify the `skills` array with your proficiency levels
// // 2. UPDATE EDUCATION: Change the `education` object with your details
// // 3. UPDATE INTERESTS: Modify the `interests` array
// // 4. ADD CERTIFICATIONS: Create new section similar to Education
// // 5. ADD PHOTO: Add your image in the bio section

// // ============================================
// // ANIMATION BREAKDOWN:
// // ============================================
// // - Left card: Slides in from left
// // - Right card: Slides in from right
// // - Skill bars: Fill animation with stagger
// // - Interest badges: Scale up with stagger
// // - All animations trigger once when scrolled into view



































'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from './ui/GlassCard';

// ============================================
// ABOUT ME SECTION - FULLY POLISHED
// ============================================
export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* ========== SECTION TITLE ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            About <span className="text-electric-blue">Me</span>
          </h2>
        </motion.div>

        {/* ========== INFO CARD ========== */}
        <GlassCard className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* ========== LEFT: PHOTO + DECORATIVE BACKGROUND ========== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center items-center lg:justify-start relative min-h-[500px]"
            >
              {/* 🎨 BACKGROUND DECORATIVE PATTERN */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                {/* Glowing Tech Lines */}
                <svg width="300" height="400" viewBox="0 0 300 400" className="absolute">
                  <motion.line
                    x1="50" y1="0" x2="50" y2="400"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.line
                    x1="150" y1="0" x2="150" y2="400"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                  <motion.line
                    x1="250" y1="0" x2="250" y2="400"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#667eea" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating Code Symbols (Background) */}
                <motion.div
                  className="absolute top-10 left-10 text-6xl text-electric-blue/20"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {'{ }'}
                </motion.div>

                <motion.div
                  className="absolute bottom-20 right-10 text-5xl text-neon-purple/20"
                  animate={{
                    y: [0, 20, 0],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  {'</>'}
                </motion.div>

                <motion.div
                  className="absolute top-1/2 left-5 text-4xl text-electric-blue/20"
                  animate={{
                    rotate: [0, 360],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {'⚡'}
                </motion.div>
              </div>

              {/* MAIN PHOTO CONTAINER */}
              <div className="relative z-10">
                {/* Animated Outer Ring with Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={isInView ? {
                    boxShadow: [
                      '0 0 30px rgba(102, 126, 234, 0.4)',
                      '0 0 60px rgba(102, 126, 234, 0.8)',
                      '0 0 30px rgba(102, 126, 234, 0.4)',
                    ]
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Photo Container */}
                <motion.div
                  className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-electric-blue/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Your Actual Photo */}
                  <img
                    src="/avatar.jpg"
                    alt="Het Patel - Backend Developer"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Subtle Gradient Overlay on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>

                {/* Floating Decorative Orbs */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-electric-blue/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-neon-purple/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />

                {/* Small Floating Code Symbols */}
                <motion.div
                  className="absolute top-4 -left-8 text-xl text-electric-blue/40"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {'</>'}
                </motion.div>

                <motion.div
                  className="absolute bottom-4 -right-8 text-xl text-neon-purple/40"
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  {'{}'}
                </motion.div>
              </div>
            </motion.div>

            {/* ========== RIGHT: CONTENT ========== */}
            <div className="space-y-8">
              
              {/* Headline Above Intro */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">👋</span>
                <h3 className="text-2xl font-bold">
                  <span className="text-white">Who I Am — </span>
                  <span className="text-electric-blue">Backend Developer</span>
                </h3>
              </motion.div>

              {/* Short Intro */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-gray-300 text-lg leading-loose">
                  I'm a <span className="text-electric-blue font-semibold">Backend Developer</span> from Ahmedabad, 
                  currently pursuing BTech in Computer Engineering at Gandhinagar University. 
                  I specialize in building <span className="text-neon-purple font-semibold">scalable REST APIs</span> and 
                  microservices with a focus on performance, security, and clean architecture.
                </p>
              </motion.div>

              {/* ========== HIGHLIGHT ROWS ========== */}
              <div className="space-y-4">
                
                {/* Backend Highlight */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-electric-blue/30 transition-all group"
                  whileHover={{ x: 2 }}
                >
                  <motion.div 
                    className="text-3xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    💻
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-electric-blue mb-2">
                      Backend Development
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs', 'JWT Auth'].map((skill, i) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-electric-blue/10 border border-electric-blue/30 rounded-full text-sm cursor-pointer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 0 20px rgba(102, 126, 234, 0.6)',
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* DevOps/Testing Highlight */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-neon-purple/30 transition-all group"
                  whileHover={{ x: 2 }}
                >
                  <motion.div 
                    className="text-3xl"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                  >
                    🚀
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neon-purple mb-2">
                      DevOps & Testing
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['GitHub Actions', 'Pytest', 'CI/CD', 'Alembic', 'Git', 'Linux'].map((skill, i) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded-full text-sm cursor-pointer"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 1.0 + (i * 0.1) }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ========== TIMELINE / BADGES ========== */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="pt-6 border-t border-white/10"
              >
                <h3 className="text-lg font-semibold text-gray-300 mb-4">
                  Experience & Achievements
                </h3>
                
                <div className="space-y-3">
                  {/* Timeline Item 1 */}
                  <motion.div
                    className="flex items-center gap-3 group cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-electric-blue group-hover:scale-150 transition-transform" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white">SIH 2024 Finalist</span>
                        <span className="px-2 py-0.5 bg-electric-blue/20 border border-electric-blue/40 rounded text-xs">
                          Hackathon
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Built SmartWork 360 - Productivity platform with 95% test coverage
                      </p>
                    </div>
                  </motion.div>

                  {/* Timeline Item 2 */}
                  <motion.div
                    className="flex items-center gap-3 group cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-neon-purple group-hover:scale-150 transition-transform" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white">NASA Space Apps Challenge</span>
                        <span className="px-2 py-0.5 bg-neon-purple/20 border border-neon-purple/40 rounded text-xs">
                          Competition
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Weather forecasting with 20+ years of NASA satellite data
                      </p>
                    </div>
                  </motion.div>

                  {/* Timeline Item 3 */}
                  <motion.div
                    className="flex items-center gap-3 group cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-electric-blue group-hover:scale-150 transition-transform" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white">Open Source Contributor</span>
                        <span className="px-2 py-0.5 bg-electric-blue/20 border border-electric-blue/40 rounded text-xs">
                          GitHub
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Active on GitHub with multiple full-stack projects
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Light Divider */}
              <div className="h-px bg-white/10 my-8"></div>

              {/* ========== STATS ROW (WITH TILT EFFECT) ========== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="grid grid-cols-3 gap-4 pt-6"
              >
                <motion.div 
                  className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  whileHover={{ 
                    rotateZ: 3,
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)',
                  }}
                >
                  <div className="text-3xl font-bold text-electric-blue">95%</div>
                  <div className="text-sm text-gray-400 mt-1">Test Coverage</div>
                </motion.div>

                <motion.div 
                  className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  whileHover={{ 
                    rotateZ: -3,
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                  }}
                >
                  <div className="text-3xl font-bold text-neon-purple">~120ms</div>
                  <div className="text-sm text-gray-400 mt-1">API Latency</div>
                </motion.div>

                <motion.div 
                  className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  whileHover={{ 
                    rotateZ: 3,
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)',
                  }}
                >
                  <div className="text-3xl font-bold text-electric-blue">10+</div>
                  <div className="text-sm text-gray-400 mt-1">Projects</div>
                </motion.div>
              </motion.div>

              {/* ========== INTERESTS & PASSIONS ========== */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="pt-6"
              >
                <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <span className="text-2xl">❤️</span>
                  Interests & Passions
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: '🤖', text: 'AI & Machine Learning', color: 'electric-blue' },
                    { icon: '☁️', text: 'Cloud Architecture', color: 'neon-purple' },
                    { icon: '🔒', text: 'Cybersecurity', color: 'electric-blue' },
                    { icon: '📊', text: 'Data Engineering', color: 'neon-purple' },
                    { icon: '🎮', text: 'Open Source', color: 'electric-blue' },
                    { icon: '📚', text: 'Tech Blogging', color: 'neon-purple' },
                  ].map((interest, i) => (
                    <motion.div
                      key={interest.text}
                      className={`
                        group relative px-4 py-2 bg-white/5 border rounded-full cursor-pointer
                        ${interest.color === 'electric-blue' ? 'border-electric-blue/30' : 'border-neon-purple/30'}
                        hover:bg-white/10 transition-all
                      `}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.8 + (i * 0.1) }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: interest.color === 'electric-blue' 
                          ? '0 0 25px rgba(102, 126, 234, 0.6)' 
                          : '0 0 25px rgba(168, 85, 247, 0.6)',
                      }}
                    >
                      {/* Hover Glow Effect */}
                      <motion.div
                        className={`
                          absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          ${interest.color === 'electric-blue' ? 'bg-electric-blue/10' : 'bg-neon-purple/10'}
                        `}
                      />
                      
                      {/* Content */}
                      <div className="relative flex items-center gap-2">
                        <motion.span 
                          className="text-lg"
                          animate={{
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {interest.icon}
                        </motion.span>
                        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                          {interest.text}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

// ============================================
// ALL IMPROVEMENTS IMPLEMENTED:
// ============================================
// ✅ 1. Left side filled with decorative tech lines + floating code symbols
// ✅ 2. Headline added: "👋 Who I Am — Backend Developer"
// ✅ 3. Line height increased: leading-loose
// ✅ 4. Hover animations added:
//    - Skill pills: glow + scale (1.05)
//    - Achievement items: slide 2px
//    - Stats cards: tilt effect (3°)
// ✅ 5. Light divider added between sections
// ✅ 6. Interests & Passions section with:
//    - Hover glow effect
//    - Icons before each tag (with wiggle animation)
//    - Fade-in animation from bottom (staggered)
//    - Alternating colors (blue/purple)


