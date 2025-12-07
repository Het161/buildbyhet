// // ============================================
// // CONTACT SECTION COMPONENT
// // ============================================

// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import GlassCard from './ui/GlassCard';
// import { Github, Linkedin, Instagram, Mail, Phone, MessageCircle } from 'lucide-react';

// // ========== API CONFIGURATION ==========
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://buildbyhet-api.onrender.com';

// // ========== SOCIAL LINKS DATA ==========
// const socialLinks = [
//   {
//     name: 'GitHub',
//     url: 'https://github.com/Het161',
//     icon: Github,
//     color: 'hover:text-white',
//   },
//   {
//     name: 'LinkedIn',
//     url: 'https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b',
//     icon: Linkedin,
//     color: 'hover:text-[#0077b5]',
//   },
//   {
//     name: 'Instagram',
//     url: 'https://www.instagram.com/hetpatel0812?igsh=aXYxZGQxeGx3bzZt',
//     icon: Instagram,
//     color: 'hover:text-[#E1306C]',
//   },
//   {
//     name: 'WhatsApp',
//     url: 'https://wa.me/919825247312?text=Hi%20Het!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you.%20Looking%20forward%20to%20discussing%20potential%20opportunities!',
//     icon: MessageCircle,
//     color: 'hover:text-[#25D366]',
//   },
//   {
//     name: 'Email',
//     url: 'mailto:hetpatelsk@gmail.com',
//     icon: Mail,
//     color: 'hover:text-electric-blue',
//   },
// ];

// // ========== MAIN COMPONENT ==========
// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('sending');

//     try {
//       // ✅ UPDATED: Use your own backend API
//       const response = await fetch(`${API_URL}/api/contact`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setStatus('success');
//         setFormData({ name: '', email: '', message: '' });
        
//         setTimeout(() => setStatus('idle'), 5000);
//       } else {
//         setStatus('error');
//         setTimeout(() => setStatus('idle'), 5000);
//       }
//     } catch (error) {
//       console.error('Form submission error:', error);
//       setStatus('error');
//       setTimeout(() => setStatus('idle'), 5000);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <section id="contact" className="min-h-screen py-20 px-4">
//       <div className="max-w-4xl mx-auto">
        
//         {/* ========== SECTION TITLE ========== */}
//         <motion.h2
//           className="text-5xl font-bold text-center mb-4 glow-text"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//         >
//           CONTACT
//         </motion.h2>

//         <motion.p
//           className="text-center text-gray-400 mb-12"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//         >
//           Let's work together on your next project
//         </motion.p>

//         {/* ========== CONTACT FORM ========== */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <GlassCard>
//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               {/* NAME INPUT */}
//               <div>
//                 <label htmlFor="name" className="block text-gray-300 mb-2 text-sm font-medium">
//                   Name <span className="text-electric-blue">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Your full name"
//                   disabled={status === 'sending'}
//                   className="w-full px-4 py-3 
//                              bg-white/5 border border-white/10 
//                              rounded-xl 
//                              focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/50
//                              transition-all duration-300
//                              text-white placeholder-gray-500
//                              disabled:opacity-50 disabled:cursor-not-allowed"
//                 />
//               </div>

//               {/* EMAIL INPUT */}
//               <div>
//                 <label htmlFor="email" className="block text-gray-300 mb-2 text-sm font-medium">
//                   Email <span className="text-electric-blue">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="your.email@example.com"
//                   disabled={status === 'sending'}
//                   className="w-full px-4 py-3 
//                              bg-white/5 border border-white/10 
//                              rounded-xl 
//                              focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/50
//                              transition-all duration-300
//                              text-white placeholder-gray-500
//                              disabled:opacity-50 disabled:cursor-not-allowed"
//                 />
//               </div>

//               {/* MESSAGE TEXTAREA */}
//               <div>
//                 <label htmlFor="message" className="block text-gray-300 mb-2 text-sm font-medium">
//                   Message <span className="text-electric-blue">*</span>
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   required
//                   rows={6}
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Tell me about your project..."
//                   disabled={status === 'sending'}
//                   className="w-full px-4 py-3 
//                              bg-white/5 border border-white/10 
//                              rounded-xl 
//                              focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/50
//                              transition-all duration-300 
//                              resize-none
//                              text-white placeholder-gray-500
//                              disabled:opacity-50 disabled:cursor-not-allowed"
//                 />
//               </div>

//               {/* SUBMIT BUTTON */}
//               <motion.button
//                 type="submit"
//                 disabled={status === 'sending' || status === 'success'}
//                 className={`
//                   w-full px-8 py-4 
//                   border-2 rounded-full 
//                   font-semibold text-lg
//                   transition-all duration-300
//                   ${status === 'sending' 
//                     ? 'bg-gray-500/20 border-gray-500 cursor-not-allowed'
//                     : status === 'success'
//                     ? 'bg-green-500/20 border-green-500'
//                     : status === 'error'
//                     ? 'bg-red-500/20 border-red-500 hover:bg-red-500/30'
//                     : 'bg-electric-blue/20 border-electric-blue hover:bg-electric-blue/30 neon-border'
//                   }
//                 `}
//                 whileHover={status === 'idle' ? { scale: 1.02 } : {}}
//                 whileTap={status === 'idle' ? { scale: 0.98 } : {}}
//               >
//                 {status === 'idle' && 'Send Message'}
//                 {status === 'sending' && (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                     </svg>
//                     Sending...
//                   </span>
//                 )}
//                 {status === 'success' && '✓ Message Sent!'}
//                 {status === 'error' && 'Try Again'}
//               </motion.button>

//               {/* SUCCESS MESSAGE */}
//               {status === 'success' && (
//                 <motion.p
//                   className="text-center text-cyber-green text-sm"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   ✓ Thank you! I'll get back to you soon.
//                 </motion.p>
//               )}

//               {/* ERROR MESSAGE */}
//               {status === 'error' && (
//                 <motion.p
//                   className="text-center text-red-400 text-sm"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   ✗ Something went wrong. Please try again or contact me directly.
//                 </motion.p>
//               )}
//             </form>

//             {/* ========== DIRECT CONTACT INFO ========== */}
//             <div className="mt-12 pt-8 border-t border-white/10">
//               <p className="text-center text-gray-400 mb-6">Or reach me directly:</p>
              
//               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
//                 {/* Email */}
//                 <a
//                   href="mailto:hetpatelsk@gmail.com"
//                   className="flex items-center gap-2 text-electric-blue hover:underline transition-colors"
//                 >
//                   <Mail className="w-5 h-5" />
//                   hetpatelsk@gmail.com
//                 </a>

//                 {/* Phone */}
//                 <a
//                   href="tel:+919825247312"
//                   className="flex items-center gap-2 text-electric-blue hover:underline transition-colors"
//                 >
//                   <Phone className="w-5 h-5" />
//                   +91 98252 47312
//                 </a>

//                 {/* WhatsApp */}
//                 <a
//                   href="https://wa.me/919825247312?text=Hi%20Het!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you."
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-[#25D366] hover:underline transition-colors"
//                 >
//                   <MessageCircle className="w-5 h-5" />
//                   WhatsApp
//                 </a>
//               </div>

//               {/* ========== SOCIAL LINKS ========== */}
//               <div className="mt-8">
//                 <p className="text-center text-gray-400 mb-6">Connect with me:</p>
                
//                 <div className="flex justify-center gap-6">
//                   {socialLinks.map((social) => {
//                     const IconComponent = social.icon;
                    
//                     return (
//                       <motion.a
//                         key={social.name}
//                         href={social.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={`
//                           p-3 rounded-full 
//                           bg-white/5 border border-white/10 
//                           text-gray-400 
//                           ${social.color}
//                           transition-all duration-300
//                           hover:bg-white/10 hover:border-white/20
//                         `}
//                         whileHover={{ scale: 1.1, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                         aria-label={social.name}
//                       >
//                         <IconComponent className="w-6 h-6" />
//                       </motion.a>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </GlassCard>
//         </motion.div>
//       </div>
//     </section>
//   );
// }















'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, FormEvent } from 'react';
import GlassCard from './ui/GlassCard';
import MagneticButton from '@/components/ui/MagneticButton';
import ShimmerCard from '@/components/ui/ShimmerCard';

// ========== API CONFIGURATION ==========
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://buildbyhet-api.onrender.com';

// ============================================
// CONTACT SECTION - PREMIUM VERSION WITH YOUR BACKEND
// ============================================
export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isOnline] = useState(true); // Set to true for "Available" status

  // ✅ FORM STATE MANAGEMENT
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // ✅ FORM SUBMIT HANDLER (USING YOUR BACKEND API)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus('sending');

  // ✅ LOG REQUEST
  console.log('📤 Sending contact form...');
  console.log('📍 API URL:', API_URL);
  console.log('📋 Form Data:', formData);

  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // ✅ LOG RESPONSE
    console.log('📥 Response Status:', response.status);
    console.log('📥 Response OK:', response.ok);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success Response:', data);
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } else {
      const errorText = await response.text();
      console.error('❌ Error Response:', errorText);
      
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  } catch (error) {
    console.error('❌ Fetch Error:', error);
    console.error('❌ Error Type:', error instanceof TypeError ? 'TypeError' : 'Other');
    console.error('❌ Error Message:', (error as Error).message);
    
    setStatus('error');
    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  }
};


  // ✅ INPUT CHANGE HANDLER
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      id="contact" 
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
            Get In <span className="text-electric-blue">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's build something amazing together.
          </p>
        </motion.div>

        {/* 🔥 FLOATING GLASS PANEL WITH SHIMMER */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ShimmerCard>
            <GlassCard className="p-8 md:p-12 backdrop-blur-xl bg-white/5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* ========== LEFT: CONTACT INFO ========== */}
                <div className="space-y-8">
                  
                  {/* Live Status Indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div className="relative">
                      <motion.div
                        className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}
                        animate={{
                          boxShadow: isOnline 
                            ? [
                                '0 0 0 0 rgba(34, 197, 94, 0.7)',
                                '0 0 0 10px rgba(34, 197, 94, 0)',
                              ]
                            : 'none',
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {isOnline ? 'Available for Work' : 'Currently Unavailable'}
                      </p>
                      <p className="text-xs text-gray-400">
                        Typically responds within 24 hours
                      </p>
                    </div>
                  </motion.div>

                  {/* Contact Details */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Contact Information
                    </h3>

                    {/* Email */}
                    <motion.a
                      href="mailto:hetpatelsk@gmail.com"
                      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-electric-blue/30 transition-all group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-electric-blue/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        📧
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white font-medium">hetpatelsk@gmail.com</p>
                      </div>
                    </motion.a>

                    {/* Phone */}
                    <motion.a
                      href="tel:+919825247312"
                      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-neon-purple/30 transition-all group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        📱
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white font-medium">+91 98252 47312</p>
                      </div>
                    </motion.a>

                    {/* Location */}
                    <motion.div
                      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-electric-blue/20 flex items-center justify-center text-2xl">
                        📍
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-white font-medium">Ahmedabad, Gujarat, India</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Download Resume */}
                  <motion.a
                    href="/resume.pdf"
                    download
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-electric-blue/20 to-neon-purple/20 border border-electric-blue/40 rounded-xl hover:from-electric-blue/30 hover:to-neon-purple/30 transition-all group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
                    <span className="font-semibold text-white">Download Resume</span>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="text-white"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path
                        d="M10 3V15M10 15L15 10M10 15L5 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.a>
                </div>

                {/* ========== RIGHT: CONTACT FORM (ENHANCED) ========== */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Send a Message
                    </h3>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === 'sending'}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-electric-blue/50 focus:outline-none focus:ring-2 focus:ring-electric-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status === 'sending'}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-electric-blue/50 focus:outline-none focus:ring-2 focus:ring-electric-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={status === 'sending'}
                        rows={5}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-electric-blue/50 focus:outline-none focus:ring-2 focus:ring-electric-blue/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {/* Submit Button with Magnetic Effect */}
                    <MagneticButton
                      className="w-full px-6 py-4 bg-gradient-to-r from-electric-blue to-neon-purple rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-electric-blue/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      magneticStrength={0.3}
                    >
                      {status === 'idle' && 'Send Message'}
                      {status === 'sending' && (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle 
                              className="opacity-25" 
                              cx="12" 
                              cy="12" 
                              r="10" 
                              stroke="currentColor" 
                              strokeWidth="4"
                              fill="none"
                            />
                            <path 
                              className="opacity-75" 
                              fill="currentColor" 
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      )}
                      {status === 'success' && (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Message Sent!
                        </span>
                      )}
                      {status === 'error' && 'Failed to Send. Try Again'}
                    </MagneticButton>

                    {/* Status Messages */}
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center"
                      >
                        <p className="text-green-400">✅ Message sent successfully! I'll get back to you soon.</p>
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center"
                      >
                        <p className="text-red-400">❌ Failed to send message. Please try again or contact me directly.</p>
                      </motion.div>
                    )}
                  </form>
                </motion.div>
              </div>
            </GlassCard>
          </ShimmerCard>
        </motion.div>

        {/* ========== SOCIAL LINKS WITH PREMIUM HOVER EFFECTS ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16"
        >
          <p className="text-center text-gray-400 mb-8">
            Connect with me on social media
          </p>
          
          <div className="flex justify-center gap-6">
            {/* GitHub */}
            <motion.a
              href="https://github.com/Het161"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-electric-blue/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-electric-blue/0 group-hover:bg-electric-blue/10 transition-all"
                whileHover={{
                  boxShadow: '0 0 30px rgba(102, 126, 234, 0.6)',
                }}
              />
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-neon-purple/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-neon-purple/0 group-hover:bg-neon-purple/10 transition-all"
                whileHover={{
                  boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
                }}
              />
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/hetpatel0812"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-pink-500/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-pink-500/0 group-hover:bg-pink-500/10 transition-all"
                whileHover={{
                  boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)',
                }}
              />
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/919825247312?text=Hi%20Het!%20I%20came%20across%20your%20portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-green-500/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-green-500/0 group-hover:bg-green-500/10 transition-all"
                whileHover={{
                  boxShadow: '0 0 30px rgba(37, 211, 102, 0.6)',
                }}
              />
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:hetpatelsk@gmail.com"
              className="group relative w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-electric-blue/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-electric-blue/0 group-hover:bg-electric-blue/10 transition-all"
                whileHover={{
                  boxShadow: '0 0 30px rgba(102, 126, 234, 0.6)',
                }}
              />
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// PREMIUM FEATURES IMPLEMENTED:
// ============================================
// ✅ Uses YOUR backend API at buildbyhet-api.onrender.com
// ✅ Form state management with useState
// ✅ handleSubmit with e.preventDefault() - FIXES PAGE JUMP
// ✅ Loading states (idle, sending, success, error)
// ✅ MagneticButton for submit
// ✅ ShimmerCard wrapper with hover effect
// ✅ Live status indicator with pulse animation
// ✅ Contact info cards with hover effects
// ✅ Download resume button
// ✅ Social links (GitHub, LinkedIn, Instagram, WhatsApp, Email)
// ✅ Success/error message displays
// ✅ Form auto-clear after success
// ✅ Disabled state during submission
