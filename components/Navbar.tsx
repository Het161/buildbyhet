// ============================================
// NAVIGATION BAR COMPONENT
// ============================================
// Features:
// - Sticky positioning (follows scroll)
// - Glassmorphism design
// - Active section highlighting
// - Smooth scroll to sections
// - Mobile responsive with hamburger menu
// - Animated entrance

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// --- NAVIGATION LINKS ---
// Add/remove sections as needed
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  // --- STATE MANAGEMENT ---
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- SCROLL DETECTION ---
  // Changes navbar style when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled more than 50px, add background blur
      setIsScrolled(window.scrollY > 50);

      // Detect which section is currently in view
      const sections = ['home', 'projects', 'about', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (top half)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup: Remove listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- SMOOTH SCROLL FUNCTION ---
  // Scrolls to section when nav link is clicked
  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Smooth scroll with offset for navbar height
      const yOffset = -80; // Navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ========== DESKTOP & MOBILE NAVBAR ========== */}
      <motion.nav
        // ANIMATION: Slide down from top on page load
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        
        // STYLING
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          
          ${isScrolled 
            ? 'backdrop-blur-xl bg-deep-navy/80 border-b border-white/10 shadow-lg' 
            : 'backdrop-blur-md bg-transparent'
          }
        `}
        // Why conditional styling?
        // - Scrolled: More opaque background for readability
        // - Top: Transparent to blend with hero section
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* ========== LOGO / BRAND ========== */}
            <motion.div
              className="flex-shrink-0 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#home')}
            >
              <span className="text-2xl font-bold text-electric-blue glow-text">
                HET
              </span>
            </motion.div>

            {/* ========== DESKTOP NAVIGATION LINKS ========== */}
            {/* Hidden on mobile (md:flex means show on medium+ screens) */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    
                    // CONDITIONAL STYLING: Highlight active section
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-all duration-300
                      ${isActive 
                        ? 'text-electric-blue' 
                        : 'text-gray-300 hover:text-white'
                      }
                    `}
                    
                    // HOVER ANIMATION: Slight lift effect
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                    
                    {/* ACTIVE INDICATOR: Underline for active section */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-blue"
                        layoutId="activeSection"
                        // layoutId creates smooth animation when indicator moves
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* ========== CTA BUTTON (Desktop) ========== */}
            <div className="hidden md:block">
              <motion.button
                className="px-6 py-2 
                           bg-electric-blue/20 border border-electric-blue 
                           rounded-full 
                           hover:bg-electric-blue/30 
                           transition-all duration-300
                           text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact')}
              >
                Let's Talk
              </motion.button>
            </div>

            {/* ========== MOBILE MENU BUTTON ========== */}
            {/* Only visible on mobile (md:hidden means hide on medium+ screens) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {/* HAMBURGER ICON */}
                {/* Changes to X when menu is open */}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    // X icon (close)
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    // Hamburger icon (menu)
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ========== MOBILE MENU (DROPDOWN) ========== */}
        {/* Only shows when isMobileMenuOpen is true */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden backdrop-blur-xl bg-deep-navy/95 border-t border-white/10"
            
            // ANIMATION: Slide down when opening
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`
                      block w-full text-left px-3 py-2 rounded-lg text-base font-medium
                      transition-all duration-300
                      ${isActive
                        ? 'bg-electric-blue/20 text-electric-blue border border-electric-blue/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    {link.name}
                  </button>
                );
              })}
              
              {/* Mobile CTA Button */}
              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full mt-4 px-6 py-3 
                           bg-electric-blue/20 border border-electric-blue 
                           rounded-full 
                           hover:bg-electric-blue/30 
                           transition-all duration-300
                           text-sm font-semibold text-center"
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* ========== SPACER ========== */}
      {/* Prevents content from hiding under fixed navbar */}
      {/* Only needed if your first section doesn't have min-h-screen */}
      <div className="h-16" />
    </>
  );
}

// ============================================
// HOW IT WORKS:
// ============================================
// 1. STICKY POSITIONING: fixed top-0 keeps navbar at top while scrolling
// 2. SCROLL DETECTION: useEffect tracks scroll position
// 3. ACTIVE SECTION: Checks which section is in viewport
// 4. SMOOTH SCROLL: scrollToSection function with offset
// 5. GLASSMORPHISM: backdrop-blur + semi-transparent background
// 6. RESPONSIVE: Desktop nav on large screens, hamburger menu on mobile
// 7. ANIMATIONS: Framer Motion for smooth transitions

// ============================================
// CUSTOMIZATION TIPS:
// ============================================
// - Add more links: Update navLinks array
// - Change colors: Modify text-electric-blue, bg-deep-navy
// - Adjust transparency: Change bg-deep-navy/80 value
// - Modify scroll offset: Change yOffset in scrollToSection
// - Add logo: Replace "HET" text with <Image /> component
