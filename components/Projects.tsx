// 'use client';

// import { motion } from 'framer-motion';
// import GlassCard from './ui/GlassCard';
// import { useState } from 'react';
// import Image from 'next/image';

// // ========== PROJECT DATA ==========
// const projects = [
//   {
//     id: 1,
//     title: 'SmartWork 360',
//     description: 'Enterprise-grade backend for productivity platform. Designed modular REST APIs with role-based auth (JWT), Alembic migrations, and typed Pydantic models. 95% test coverage, ~120ms median latency. Modern productivity platform frontend for SIH 2024. Built with Next.js and TypeScript, featuring responsive design and seamless backend integration.',
//     tech: ['FastAPI', 'PostgreSQL', 'Docker', 'Pytest', 'GitHub Actions', 'JWT Auth'],
//     category: 'Web Apps',
//     github: 'https://github.com/Het161/SIH-Backend',
//     demo: 'https://smartwork-frontend-n8nr.vercel.app',
//     image: '/projects/smartwork.png',
//     highlights: [
//       'Role-based authentication',
//       '~120ms median API latency',
//       '95% test coverage with Pytest',
//       'Dockerized dev environment'
//     ],
//   },
  
//   {
//     id: 2,
//     title: 'NASA Space Apps Challenge',
//     description: 'Weather probability forecasting using NASA POWER satellite data. FastAPI microservices with 20+ years of historical data for event planning and extreme weather risk assessment.',
//     tech: ['FastAPI', 'NASA POWER API', 'Python', 'xarray', 'pandas', 'NumPy'],
//     category: 'AI / Design',
//     github: 'https://github.com/Het161/Space-APP',
//     demo: null,
//     image: '/projects/nasa.png',
//     highlights: [
//       'NASA POWER & MERRA-2 integration',
//       'Multi-decadal weather analysis',
//       'JSON summaries + CSV exports',
//       'Real-time risk assessment'
//     ],
//   },

//   {
//     id: 3,
//     title: 'Campus Life',
//     description: 'Anonymous social platform for campus communication built with Lovable. Features real-time messaging, community boards, and secure anonymous posting for students.',
//     tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn-ui'],
//     category: 'Web Apps',
//     github: 'https://github.com/Het161/campus-whisper-connect',
//     demo: 'https://lovable.dev/projects/62ea0abc-4005-4a58-bc1f-b59fa8cbdc54',
//     image: '/projects/campus.png',
//     highlights: [
//       'Real-time messaging',
//       'Anonymous posting',
//       'Community boards',
//       'Modern UI with shadcn'
//     ],
//   },

//   {
//   id: 5,
//   title: 'OM Marketing',
//   description: 'ISO 9001:2008 certified weighing scale and note counting machine business. Built digital catalog and inventory management system reducing reconciliation time by 60%.',
//   tech: ['WhatsApp Business', 'Python', 'CRM', 'Inventory Management'],
//   category: 'AI / Design',
//   github: null,
//   demo: 'https://wa.me/c/919825247312',  // ✅ WhatsApp Catalog Link
//   image: '/projects/om-marketing.png',
//   highlights: [
//     'ISO 9001:2008 certified',
//     '60% faster reconciliation',
//     '90% fewer errors',
//     'WhatsApp catalog integration'
//   ],
// },

// ];

// // ========== FILTER CATEGORIES ==========
// const categories = ['All', 'Web Apps', 'Mobile', 'AI / Design'];

// // ========== MAIN COMPONENT ==========
// export default function Projects() {
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
//   const filteredProjects = activeFilter === 'All' 
//     ? projects 
//     : projects.filter(project => project.category === activeFilter);

//   return (
//     <section id="projects" className="min-h-screen py-20 px-4">
//       <div className="max-w-7xl mx-auto">
        
//         {/* ========== SECTION TITLE ========== */}
//         <motion.h2 
//           className="text-5xl font-bold text-center mb-4 glow-text"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//         >
//           PROJECTS
//         </motion.h2>
        
//         <motion.p
//           className="text-center text-gray-400 mb-12"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//         >
//           Real-world projects from hackathons and personal work
//         </motion.p>
        
//         {/* ========== FILTER BUTTONS ========== */}
//         <div className="flex justify-center gap-4 mb-16 flex-wrap">
//           {categories.map((category) => (
//             <motion.button
//               key={category}
//               className={`
//                 px-6 py-2 rounded-full 
//                 transition-all duration-300
//                 ${activeFilter === category
//                   ? 'bg-electric-blue/30 border-2 border-electric-blue text-white'
//                   : 'border border-electric-blue/50 text-gray-300 hover:bg-electric-blue/20'
//                 }
//               `}
//               onClick={() => setActiveFilter(category)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {category}
//             </motion.button>
//           ))}
//         </div>

//         {/* ========== PROJECTS GRID ========== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {filteredProjects.map((project, index) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ 
//                 delay: index * 0.1,
//                 duration: 0.5 
//               }}
//               onMouseEnter={() => setHoveredCard(project.id)}
//               onMouseLeave={() => setHoveredCard(null)}
//               className="relative"
//             >
//               <GlassCard 
//                 className={`
//                   group cursor-pointer h-full glass-card
//                   transition-all duration-500
//                   ${hoveredCard === project.id ? 'glow-card' : ''}
//                 `}
//                 style={{
//                   boxShadow: hoveredCard === project.id
//                     ? '0 0 40px rgba(0, 217, 255, 0.5)'
//                     : '0 0 0 rgba(0, 217, 255, 0)',
//                 }}
//               >
//                 {/* ✅ DARK OVERLAY FOR BETTER READABILITY */}
//                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 
//                                 transition-all duration-300 rounded-xl pointer-events-none -z-10" />
                
//                 {/* ✅ ALL CONTENT IN RELATIVE Z-10 CONTAINER */}
//                 <div className="relative z-10">
                  
//                   {/* --- PROJECT IMAGE --- */}
//                   <div className="aspect-video bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 
//                                   rounded-2xl mb-4 overflow-hidden relative
//                                   group-hover:scale-105 transition-transform duration-300">
                    
//                     {project.image ? (
//                       <>
//                         <Image 
//                           src={project.image} 
//                           alt={project.title}
//                           fill
//                           className="object-cover"
//                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                         />
                        
//                         <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 to-transparent 
//                                         opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       </>
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-500">
//                         <span className="text-sm">{project.title}</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* ✅ PROJECT TITLE - WITH TEXT SHADOW */}
//                   <h3 className="text-2xl font-bold mb-2 
//                                  group-hover:text-electric-blue transition-colors
//                                  drop-shadow-[0_2px_8px_rgba(0,0,0,1)]
//                                  group-hover:drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
//                     {project.title}
//                   </h3>
                  
//                   {/* ✅ DESCRIPTION - WITH TEXT SHADOW */}
//                   <p className="text-gray-400 mb-4 text-sm leading-relaxed
//                                 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
//                     {project.description}
//                   </p>
                  
//                   {/* ✅ KEY HIGHLIGHTS - WITH TEXT SHADOW */}
//                   {project.highlights && (
//                     <ul className="mb-4 space-y-1">
//                       {project.highlights.map((highlight, i) => (
//                         <li key={i} className="text-xs text-gray-500 flex items-center
//                                                drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
//                           <span className="text-electric-blue mr-2">▸</span>
//                           {highlight}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
                  
//                   {/* --- TECH STACK BADGES --- */}
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {project.tech.map((tech) => (
//                       <span 
//                         key={tech}
//                         className="px-3 py-1 text-xs 
//                                    bg-electric-blue/10 border border-electric-blue/30 
//                                    rounded-full
//                                    hover:bg-electric-blue/20 transition-colors
//                                    drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
                  
//                   {/* --- ACTION LINKS --- */}
//                   <div className="flex gap-4 pt-4 border-t border-white/10">
//                     {project.github && (
//                       <a 
//                         href={project.github} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-electric-blue hover:underline text-sm font-medium
//                                    flex items-center gap-1
//                                    drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
//                       >
//                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                         </svg>
//                         GitHub
//                       </a>
//                     )}
                    
//                     {project.demo && (
//                       <a 
//                         href={project.demo} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-neon-purple hover:underline text-sm font-medium
//                                    flex items-center gap-1
//                                    drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                         </svg>
//                         Live Demo
//                       </a>
//                     )}
//                   </div>
                  
//                 </div>
                
//                 {/* --- ANIMATED GLOW BORDER --- */}
//                 <div
//                   className={`
//                     absolute inset-0 rounded-xl opacity-0
//                     transition-opacity duration-500
//                     ${hoveredCard === project.id ? 'opacity-100' : ''}
//                   `}
//                   style={{
//                     background: 'linear-gradient(45deg, transparent, #00D9FF, transparent)',
//                     filter: 'blur(10px)',
//                     zIndex: -1,
//                   }}
//                 />
//               </GlassCard>
//             </motion.div>
//           ))}
//         </div>
        
//         {/* --- NO RESULTS MESSAGE --- */}
//         {filteredProjects.length === 0 && (
//           <div className="text-center py-20">
//             <p className="text-gray-400 text-lg">
//               No projects found in this category
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }






























'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import GlassCard from './ui/GlassCard';
import { catalogue } from '@react-three/fiber/dist/declarations/src/core/renderer';

// ============================================
// PROJECT DATA
// ============================================
const projectsData = [
  {
    id: 1,
    title: 'SmartWork 360',
    description: 'Enterprise-grade backend for productivity platform. Designed modular REST APIs with role-based auth (JWT), Alembic migrations, and typed Pydantic models. 95% test coverage, ~120ms median latency.',
    tech: ['FastAPI', 'PostgreSQL', 'Docker', 'Pytest', 'GitHub Actions', 'JWT Auth'],
    category: 'Web Apps',
    github: 'https://github.com/Het161/SIH-Backend',
    demo: 'https://smartwork-frontend-n8nr.vercel.app',
    image: '/projects/smartwork.jpg',
    highlights: [
      'Role-based authentication',
      '~120ms median API latency',
      '95% test coverage with Pytest',
      'Dockerized dev environment'
    ],
  },
  
  {
    id: 2,
    title: 'NASA Space Apps Challenge',
    description: 'Weather probability forecasting using NASA POWER satellite data. FastAPI microservices with 20+ years of historical data for event planning and extreme weather risk assessment.',
    tech: ['FastAPI', 'NASA POWER API', 'Python', 'xarray', 'pandas', 'NumPy'],
    category: 'AI / Design',
    github: 'https://github.com/Het161/Space-APP',
    demo: null,
    image: '/projects/nasa.jpg',
    highlights: [
      'NASA POWER & MERRA-2 integration',
      'Multi-decadal weather analysis',
      'JSON summaries + CSV exports',
      'Real-time risk assessment'
    ],
  },

  {
    id: 3,
    title: 'Campus Life',
    description: 'Anonymous social platform for campus communication built with Lovable. Features real-time messaging, community boards, and secure anonymous posting for students.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn-ui'],
    category: 'Web Apps',
    github: 'https://github.com/Het161/campus-whisper-connect',
    demo: 'https://lovable.dev/projects/62ea0abc-4005-4a58-bc1f-b59fa8cbdc54',
    image: '/projects/campus.jpg',
    highlights: [
      'Real-time messaging',
      'Anonymous posting',
      'Community boards',
      'Modern UI with shadcn'
    ],
  },

  {
    id: 4,
    title: 'OM Marketing',
    description: 'ISO 9001:2008 certified weighing scale and note counting machine business. Built digital catalog and inventory management system reducing reconciliation time by 60%.',
    tech: ['WhatsApp Business', 'Python', 'CRM', 'Inventory Management'],
    category: 'AI / Design',
    github: null,
    demo:'https://www.ommarketing.co.in',
    catalogue: 'https://wa.me/c/919825247312',
    image: '/projects/om-marketing.jpg',
    highlights: [
      'ISO 9001:2008 certified',
      '60% faster reconciliation',
      '90% fewer errors',
      'WhatsApp catalog integration'
    ],
  },
];

// ============================================
// FILTER CATEGORIES
// ============================================
const categories = ['All', 'Web Apps', 'AI / Design', 'Mobile', 'API'];

// ============================================
// PROJECTS COMPONENT
// ============================================
export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Filter projects with animation
  useEffect(() => {
    const filtered = selectedCategory === 'All' 
      ? projectsData 
      : projectsData.filter(p => p.category === selectedCategory);
    
    setFilteredProjects(filtered);
  }, [selectedCategory]);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ========== SECTION HEADER ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Featured <span className="text-electric-blue">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building innovative solutions with modern technologies
          </p>
        </motion.div>

        {/* ========== CATEGORY FILTERS ========== */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2.5 rounded-full font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-electric-blue/20 border-2 border-electric-blue text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* ========== PROJECTS GRID ========== */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// PROJECT CARD COMPONENT (WITH GITHUB BUTTON)
// ============================================
interface ProjectCardProps {
  project: typeof projectsData[0];
  index: number;
  isInView: boolean;
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  // Calculate tilt angles (max 6 degrees)
  const getRotation = () => {
    if (!cardRef.current || !isHovered) return { rotateX: 0, rotateY: 0 };
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((mousePosition.x - centerX) / centerX) * 6;
    const rotateX = ((mousePosition.y - centerY) / centerY) * -6;
    
    return { rotateX, rotateY };
  };

  const rotation = getRotation();

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : {}}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }}
      
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      
      className="relative group cursor-pointer"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={{
          rotateX: rotation.rotateX,
          rotateY: rotation.rotateY,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full"
      >
        <GlassCard className="p-0 overflow-hidden h-full relative">
          
          {/* Softer Glow */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(102, 126, 234, 0.15), 
                transparent 50%)`,
            }}
          />
          
          {/* Subtle Border Glow */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, 
                rgba(102, 126, 234, 0.2) 0%, 
                transparent 50%)`,
              mixBlendMode: 'screen',
            }}
          />

          {/* PROJECT IMAGE WITH FALLBACK */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-electric-blue/10 to-neon-purple/10">
            {!imageError ? (
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                animate={{
                  filter: isHovered ? 'blur(0px) brightness(1.1)' : 'blur(2px) brightness(0.9)',
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              // Fallback gradient with icon
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-electric-blue/20 to-neon-purple/20">
                <div className="text-6xl opacity-30">
                  {project.category === 'Web Apps' && '🌐'}
                  {project.category === 'AI / Design' && '🤖'}
                  {project.category === 'Mobile' && '📱'}
                  {project.category === 'API' && '⚡'}
                </div>
              </div>
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />
          </div>

          {/* PROJECT CONTENT */}
          <div className="p-6 relative">
            
            {/* Title */}
            <motion.h3 
              className="text-2xl font-bold mb-2 glow-text"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            
            {/* Description */}
            <p className="text-gray-400 mb-4 text-sm line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.slice(0, 4).map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>

            {/* ========== GITHUB + DEMO BUTTONS ========== */}
            <div className="flex gap-3 items-center">
              
              {/* GitHub Button */}
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 hover:border-electric-blue/50 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* GitHub Icon */}
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                </motion.a>
              )}
              
              {/* Live Demo Button */}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-electric-blue/20 border border-electric-blue rounded-full text-sm hover:bg-electric-blue/30 transition-all font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Live Demo</span>
                  <motion.svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 20 20" 
                    fill="none"
                    animate={{
                      x: isHovered ? 3 : 0,
                    }}
                  >
                    <path 
                      d="M7 3L14 10L7 17" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </motion.a>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// WHAT'S IMPLEMENTED:
// ============================================
// ✅ GitHub button with icon
// ✅ Live Demo button
// ✅ Image loading with error handling
// ✅ Fallback gradient for missing images
// ✅ Softer glow (0.15 opacity)
// ✅ 6° tilt effect on hover
// ✅ Image blur → sharpen transition
// ✅ Tech badge animations
// ✅ Subtle border glow
// ✅ Staggered scroll reveal
// ✅ Smooth filter animations
// ✅ Line-clamp for descriptions
// ✅ Tech badge limit (show +N if more than 4)
