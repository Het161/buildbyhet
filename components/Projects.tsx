'use client';

import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { useState } from 'react';
import Image from 'next/image';

// ========== PROJECT DATA ==========
const projects = [
  {
    id: 1,
    title: 'SmartWork 360',
    description: 'Enterprise-grade backend for productivity platform. Designed modular REST APIs with role-based auth (JWT), Alembic migrations, and typed Pydantic models. 95% test coverage, ~120ms median latency. Modern productivity platform frontend for SIH 2024. Built with Next.js and TypeScript, featuring responsive design and seamless backend integration.',
    tech: ['FastAPI', 'PostgreSQL', 'Docker', 'Pytest', 'GitHub Actions', 'JWT Auth'],
    category: 'Web Apps',
    github: 'https://github.com/Het161/SIH-Backend',
    demo: 'https://smartwork-frontend-n8nr.vercel.app',
    image: '/projects/smartwork.png',
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
    image: '/projects/nasa.png',
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
    image: '/projects/campus.png',
    highlights: [
      'Real-time messaging',
      'Anonymous posting',
      'Community boards',
      'Modern UI with shadcn'
    ],
  },

  {
  id: 5,
  title: 'OM Marketing',
  description: 'ISO 9001:2008 certified weighing scale and note counting machine business. Built digital catalog and inventory management system reducing reconciliation time by 60%.',
  tech: ['WhatsApp Business', 'Python', 'CRM', 'Inventory Management'],
  category: 'AI / Design',
  github: null,
  demo: 'https://wa.me/c/919825247312',  // ✅ WhatsApp Catalog Link
  image: '/projects/om-marketing.png',
  highlights: [
    'ISO 9001:2008 certified',
    '60% faster reconciliation',
    '90% fewer errors',
    'WhatsApp catalog integration'
  ],
},

];

// ========== FILTER CATEGORIES ==========
const categories = ['All', 'Web Apps', 'Mobile', 'AI / Design'];

// ========== MAIN COMPONENT ==========
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* ========== SECTION TITLE ========== */}
        <motion.h2 
          className="text-5xl font-bold text-center mb-4 glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          PROJECTS
        </motion.h2>
        
        <motion.p
          className="text-center text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Real-world projects from hackathons and personal work
        </motion.p>
        
        {/* ========== FILTER BUTTONS ========== */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`
                px-6 py-2 rounded-full 
                transition-all duration-300
                ${activeFilter === category
                  ? 'bg-electric-blue/30 border-2 border-electric-blue text-white'
                  : 'border border-electric-blue/50 text-gray-300 hover:bg-electric-blue/20'
                }
              `}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* ========== PROJECTS GRID ========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5 
              }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative"
            >
              <GlassCard 
                className={`
                  group cursor-pointer h-full glass-card
                  transition-all duration-500
                  ${hoveredCard === project.id ? 'glow-card' : ''}
                `}
                style={{
                  boxShadow: hoveredCard === project.id
                    ? '0 0 40px rgba(0, 217, 255, 0.5)'
                    : '0 0 0 rgba(0, 217, 255, 0)',
                }}
              >
                {/* ✅ DARK OVERLAY FOR BETTER READABILITY */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 
                                transition-all duration-300 rounded-xl pointer-events-none -z-10" />
                
                {/* ✅ ALL CONTENT IN RELATIVE Z-10 CONTAINER */}
                <div className="relative z-10">
                  
                  {/* --- PROJECT IMAGE --- */}
                  <div className="aspect-video bg-gradient-to-br from-electric-blue/10 to-neon-purple/10 
                                  rounded-2xl mb-4 overflow-hidden relative
                                  group-hover:scale-105 transition-transform duration-300">
                    
                    {project.image ? (
                      <>
                        <Image 
                          src={project.image} 
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 to-transparent 
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <span className="text-sm">{project.title}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* ✅ PROJECT TITLE - WITH TEXT SHADOW */}
                  <h3 className="text-2xl font-bold mb-2 
                                 group-hover:text-electric-blue transition-colors
                                 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]
                                 group-hover:drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                    {project.title}
                  </h3>
                  
                  {/* ✅ DESCRIPTION - WITH TEXT SHADOW */}
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed
                                drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {project.description}
                  </p>
                  
                  {/* ✅ KEY HIGHLIGHTS - WITH TEXT SHADOW */}
                  {project.highlights && (
                    <ul className="mb-4 space-y-1">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-xs text-gray-500 flex items-center
                                               drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                          <span className="text-electric-blue mr-2">▸</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* --- TECH STACK BADGES --- */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs 
                                   bg-electric-blue/10 border border-electric-blue/30 
                                   rounded-full
                                   hover:bg-electric-blue/20 transition-colors
                                   drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* --- ACTION LINKS --- */}
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-electric-blue hover:underline text-sm font-medium
                                   flex items-center gap-1
                                   drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-neon-purple hover:underline text-sm font-medium
                                   flex items-center gap-1
                                   drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                  
                </div>
                
                {/* --- ANIMATED GLOW BORDER --- */}
                <div
                  className={`
                    absolute inset-0 rounded-xl opacity-0
                    transition-opacity duration-500
                    ${hoveredCard === project.id ? 'opacity-100' : ''}
                  `}
                  style={{
                    background: 'linear-gradient(45deg, transparent, #00D9FF, transparent)',
                    filter: 'blur(10px)',
                    zIndex: -1,
                  }}
                />
              </GlassCard>
            </motion.div>
          ))}
        </div>
        
        {/* --- NO RESULTS MESSAGE --- */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No projects found in this category
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
