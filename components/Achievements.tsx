'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import GlassCard from './ui/GlassCard';
import ShimmerCard from './ui/ShimmerCard';
import MagneticButton from './ui/MagneticButton';
import Image from 'next/image';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: 'technical' | 'hackathon' | 'course' | 'award';
  image: string;
  description: string;
  link?: string;
  skills?: string[];
}

// ========== YOUR ACTUAL CERTIFICATES ==========
const certificates: Certificate[] = [
  {
    id: 1,
    title: 'NASA Space Apps Challenge 2025',
    issuer: 'NASA',
    date: 'October 2025',
    category: 'hackathon',
    image: '/certificates/nasa-space-apps.jpg',
    description: 'A weather probability forecasting platform that transforms NASA Earth observation data into actionable insights for event planning and decision-making.',
    skills: ['Problem Solving', 'Space Technology', 'Innovation'],
  },
  {
    id: 2,
    title: 'Adobe India Hackathon',
    issuer: 'Adobe',
    date: '2025',
    category: 'hackathon',
    image: '/certificates/adobe-hackathon.jpg',
    description: 'Participated in Round 1 - Online MCQ Assessment + Coding of Adobe India Hackathon',
    skills: ['Coding', 'Problem Solving', 'Adobe Technologies'],
  },
  {
    id: 3,
    title: 'Techstars Startup Weekend Gandhinagar',
    issuer: 'Techstars & PDEU IIC',
    date: 'August 2025',
    category: 'hackathon',
    image: '/certificates/techstars.jpg',
    description: 'Certificate of Appreciation for participation in Techstars Startup Weekend Gandhinagar',
    skills: ['Entrepreneurship', 'Startup', 'Innovation'],
  },
  {
    id: 4,
    title: 'Royal Technosoft Bootcamp',
    issuer: 'Royal Technosoft P Limited',
    date: 'June 2025',
    category: 'course',
    image: '/certificates/royal-technosoft.jpg',
    description: 'Successfully headed the Bootcamps held at Royal Technosoft P Limited',
    skills: ['Leadership', 'Technical Training', 'Bootcamp'],
  },
  {
    id: 5,
    title: "Murf's 30 Days Of AI Agents",
    issuer: 'Murf AI',
    date: 'August 2025',
    category: 'course',
    image: '/certificates/murf-ai.jpg',
    description: 'Completed 30 Days of AI Agents program by Murf AI',
    skills: ['AI Agents', 'Artificial Intelligence', 'Machine Learning'],
  },
  {
    id: 6,
    title: 'Ethical Hacking Seminar',
    issuer: 'H2 Infosec',
    date: 'September 2025',
    category: 'technical',
    image: '/certificates/ethical-hacking.jpg',
    description: 'Certificate of Completion for Ethical Hacking Seminar',
    skills: ['Cybersecurity', 'Ethical Hacking', 'Security'],
  },
  {
    id: 7,
    title: 'Python Basic Assessment',
    issuer: 'LearnTube.ai',
    date: 'June 2025',
    category: 'course',
    image: '/certificates/python-learntube.jpg',
    description: 'Successfully completed Python Basic Assessment',
    link: 'https://learntube.ai',
    skills: ['Python', 'Programming', 'Assessment'],
  },
  {
    id: 8,
    title: 'Business Analyst Assessment',
    issuer: 'LearnTube.ai',
    date: 'June 2025',
    category: 'course',
    image: '/certificates/business-analyst.jpg',
    description: 'Successfully completed Business Analyst Assessment',
    link: 'https://learntube.ai',
    skills: ['Business Analysis', 'Analytics', 'Data'],
  },
  {
    id: 9,
    title: 'PowerBI Workshop',
    issuer: 'OfficeMaster',
    date: 'July 2025',
    category: 'technical',
    image: '/certificates/powerbi.jpg',
    description: 'Successfully completed PowerBI Workshop - Create AI-Powered interactive dashboards in under 30 mins',
    skills: ['PowerBI', 'Data Visualization', 'Dashboard'],
  },
  {
    id: 10,
    title: 'Python Using AI Workshop',
    issuer: 'AI For Techies',
    date: 'June 2025',
    category: 'technical',
    image: '/certificates/ai-techies.jpg',
    description: '3 Hours Python Using AI Workshop - Create interactive visualizations, debug code, and write Python using AI',
    skills: ['Python', 'AI', 'Workshop'],
  },
];

const categories = [
  { id: 'all', label: 'All', count: certificates.length },
  { id: 'hackathon', label: 'Hackathons', count: certificates.filter(c => c.category === 'hackathon').length },
  { id: 'course', label: 'Courses', count: certificates.filter(c => c.category === 'course').length },
  { id: 'technical', label: 'Technical', count: certificates.filter(c => c.category === 'technical').length },
  { id: 'award', label: 'Awards', count: certificates.filter(c => c.category === 'award').length },
];

export default function Achievements() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filteredCertificates = selectedCategory === 'all'
    ? certificates
    : certificates.filter(cert => cert.category === selectedCategory);

  return (
    <section 
      id="achievements" 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* ========== SECTION TITLE ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Achievements & <span className="text-electric-blue">Certificates</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {certificates.length}+ recognitions, certifications, and achievements throughout my journey
          </p>
        </motion.div>

        {/* ========== CATEGORY FILTER ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <MagneticButton
              key={category.id}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-electric-blue text-white border-2 border-electric-blue shadow-lg shadow-electric-blue/50'
                  : 'bg-white/5 border-2 border-white/10 hover:border-electric-blue/50'
              }`}
              magneticStrength={0.2}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label} <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </MagneticButton>
          ))}
        </motion.div>

        {/* ========== CERTIFICATES GRID ========== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <ShimmerCard>
                <GlassCard className="p-0 overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300">
                  
                  {/* Certificate Image */}
                  <div 
                    className="relative h-48 bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 overflow-hidden"
                    onClick={() => setSelectedCert(cert)}
                  >
                    {/* Real Certificate Image */}
                    <Image 
                      src={cert.image} 
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-white font-semibold">View Certificate</span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-xs font-semibold text-white ${
                        cert.category === 'hackathon' ? 'bg-electric-blue/80' :
                        cert.category === 'course' ? 'bg-neon-purple/80' :
                        cert.category === 'technical' ? 'bg-green-500/80' :
                        'bg-yellow-500/80'
                      }`}>
                        {cert.category.charAt(0).toUpperCase() + cert.category.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-electric-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p className="text-sm text-gray-400 truncate">{cert.issuer}</p>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-neon-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-400">{cert.date}</p>
                    </div>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {cert.description}
                    </p>

                    {/* Skills Tags */}
                    {cert.skills && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-electric-blue/10 border border-electric-blue/30 rounded text-xs text-electric-blue">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <MagneticButton
                        className="flex-1 px-4 py-2 bg-electric-blue/20 border border-electric-blue/50 rounded-lg text-sm font-semibold hover:bg-electric-blue/30 transition-all"
                        magneticStrength={0.2}
                        onClick={() => setSelectedCert(cert)}
                      >
                        View Full
                      </MagneticButton>
                      
                      {cert.link && (
                        <MagneticButton
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all"
                          magneticStrength={0.2}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(cert.link, '_blank');
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </MagneticButton>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </ShimmerCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== MODAL FOR FULL VIEW ========== */}
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <GlassCard className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Certificate Preview */}
                <div className="mb-6">
                  <div className="relative aspect-video bg-gradient-to-br from-electric-blue/20 to-neon-purple/20 rounded-xl overflow-hidden">
                    <Image 
                      src={selectedCert.image} 
                      alt={selectedCert.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xl text-electric-blue font-semibold">{selectedCert.issuer}</p>
                  </div>

                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{selectedCert.date}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedCert.category === 'hackathon' ? 'bg-electric-blue/20 text-electric-blue' :
                      selectedCert.category === 'course' ? 'bg-neon-purple/20 text-neon-purple' :
                      selectedCert.category === 'technical' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {selectedCert.category.charAt(0).toUpperCase() + selectedCert.category.slice(1)}
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {selectedCert.description}
                  </p>

                  {/* Skills */}
                  {selectedCert.skills && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Skills Acquired:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCert.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-electric-blue/20 border border-electric-blue/50 rounded-full text-sm text-electric-blue">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <MagneticButton
                      className="px-6 py-3 bg-electric-blue rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-blue/50 transition-all flex items-center gap-2"
                      magneticStrength={0.3}
                      onClick={() => window.open(selectedCert.image, '_blank')}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Certificate
                    </MagneticButton>

                    {selectedCert.link && (
                      <MagneticButton
                        className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                        magneticStrength={0.3}
                        onClick={() => window.open(selectedCert.link, '_blank')}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Verify Certificate
                      </MagneticButton>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
