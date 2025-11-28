// ============================================
// CONTACT SECTION COMPONENT
// ============================================

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { Github, Linkedin, Instagram, Mail, Phone, MessageCircle } from 'lucide-react';

// ========== API CONFIGURATION ==========
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ========== SOCIAL LINKS DATA ==========
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Het161',
    icon: Github,
    color: 'hover:text-white',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b',
    icon: Linkedin,
    color: 'hover:text-[#0077b5]',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/hetpatel0812?igsh=aXYxZGQxeGx3bzZt',
    icon: Instagram,
    color: 'hover:text-[#E1306C]',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/919825247312?text=Hi%20Het!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you.%20Looking%20forward%20to%20discussing%20potential%20opportunities!',
    icon: MessageCircle,
    color: 'hover:text-[#25D366]',
  },
  {
    name: 'Email',
    url: 'mailto:hetpatelsk@gmail.com',
    icon: Mail,
    color: 'hover:text-electric-blue',
  },
];

// ========== MAIN COMPONENT ==========
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // ✅ UPDATED: Use your own backend API
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* ========== SECTION TITLE ========== */}
        <motion.h2
          className="text-5xl font-bold text-center mb-4 glow-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          CONTACT
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Let's work together on your next project
        </motion.p>

        {/* ========== CONTACT FORM ========== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* NAME INPUT */}
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 text-sm font-medium">
                  Name <span className="text-electric-blue">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 
                             bg-white/5 border border-white/10 
                             rounded-xl 
                             focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/50
                             transition-all duration-300
                             text-white placeholder-gray-500
                             disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* EMAIL INPUT */}
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 text-sm font-medium">
                  Email <span className="text-electric-blue">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 
                             bg-white/5 border border-white/10 
                             rounded-xl 
                             focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/50
                             transition-all duration-300
                             text-white placeholder-gray-500
                             disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* MESSAGE TEXTAREA */}
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 text-sm font-medium">
                  Message <span className="text-electric-blue">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 
                             bg-white/5 border border-white/10 
                             rounded-xl 
                             focus:border-electric-blue focus:outline-none focus:ring-2 focus:ring-electric-blue/50
                             transition-all duration-300 
                             resize-none
                             text-white placeholder-gray-500
                             disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`
                  w-full px-8 py-4 
                  border-2 rounded-full 
                  font-semibold text-lg
                  transition-all duration-300
                  ${status === 'sending' 
                    ? 'bg-gray-500/20 border-gray-500 cursor-not-allowed'
                    : status === 'success'
                    ? 'bg-green-500/20 border-green-500'
                    : status === 'error'
                    ? 'bg-red-500/20 border-red-500 hover:bg-red-500/30'
                    : 'bg-electric-blue/20 border-electric-blue hover:bg-electric-blue/30 neon-border'
                  }
                `}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                {status === 'idle' && 'Send Message'}
                {status === 'sending' && (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                )}
                {status === 'success' && '✓ Message Sent!'}
                {status === 'error' && 'Try Again'}
              </motion.button>

              {/* SUCCESS MESSAGE */}
              {status === 'success' && (
                <motion.p
                  className="text-center text-cyber-green text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✓ Thank you! I'll get back to you soon.
                </motion.p>
              )}

              {/* ERROR MESSAGE */}
              {status === 'error' && (
                <motion.p
                  className="text-center text-red-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✗ Something went wrong. Please try again or contact me directly.
                </motion.p>
              )}
            </form>

            {/* ========== DIRECT CONTACT INFO ========== */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-center text-gray-400 mb-6">Or reach me directly:</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {/* Email */}
                <a
                  href="mailto:hetpatelsk@gmail.com"
                  className="flex items-center gap-2 text-electric-blue hover:underline transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  hetpatelsk@gmail.com
                </a>

                {/* Phone */}
                <a
                  href="tel:+919825247312"
                  className="flex items-center gap-2 text-electric-blue hover:underline transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +91 98252 47312
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919825247312?text=Hi%20Het!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:underline transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>

              {/* ========== SOCIAL LINKS ========== */}
              <div className="mt-8">
                <p className="text-center text-gray-400 mb-6">Connect with me:</p>
                
                <div className="flex justify-center gap-6">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          p-3 rounded-full 
                          bg-white/5 border border-white/10 
                          text-gray-400 
                          ${social.color}
                          transition-all duration-300
                          hover:bg-white/10 hover:border-white/20
                        `}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.name}
                      >
                        <IconComponent className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
