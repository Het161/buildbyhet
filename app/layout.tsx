// // ============================================
// // ROOT LAYOUT - Wraps all pages
// // ============================================
// // This layout persists across all routes
// // Contains: HTML structure, fonts, metadata

// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import './globals.css'

// // --- FONT CONFIGURATION ---
// // Inter: Modern, readable sans-serif font
// // subsets: ['latin'] - Only load Latin characters (smaller file size)
// const inter = Inter({ subsets: ['latin'] })

// // --- METADATA (SEO) ---
// // Appears in browser tab and search results
// export const metadata: Metadata = {
//   title: 'Het - Full-Stack Developer',
//   description: 'Portfolio of Het, a Full-Stack Developer from Ahmedabad specializing in React, Next.js, Python, and FastAPI',
//   keywords: ['Het', 'Full-Stack Developer', 'Portfolio', 'React', 'Next.js', 'Python'],
// }

// // --- ROOT LAYOUT COMPONENT ---
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode  // All page content renders here
// }) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       {/* scroll-smooth: Smooth scrolling for anchor links */}
      
//       <body className={inter.className}>
//         {/* inter.className: Applies Inter font */}
//         {children}
//         {/* children: Your page.tsx content renders here */}
//       </body>
//     </html>
//   )
// }








// ============================================
// ROOT LAYOUT - Wraps all pages
// ============================================
// This layout persists across all routes
// Contains: HTML structure, fonts, metadata, global components

// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';

// // --- LUXURY UI COMPONENTS ---
// import ParticleBackground from '@/components/ui/ParticleBackground';
// import CursorSpotlight from '@/components/ui/CursorSpotlight';
// import PageTransition from '@/components/ui/PageTransition';
// import AIChatbot from '@/components/AIChatbot';

// // --- FONT CONFIGURATION ---
// // Inter: Modern, readable sans-serif font
// // subsets: ['latin'] - Only load Latin characters (smaller file size)
// const inter = Inter({ subsets: ['latin'] });

// // --- METADATA (SEO) ---
// // Appears in browser tab, search results, and social media previews
// export const metadata: Metadata = {
//   title: 'Het Patel - Backend Developer',
//   description: 'Portfolio of Het Patel - Backend Developer specializing in scalable REST APIs, microservices, Python, FastAPI, and PostgreSQL',
//   keywords: [
//     'Het Patel',
//     'Backend Developer',
//     'Full-Stack Developer',
//     'Portfolio',
//     'React',
//     'Next.js',
//     'Python',
//     'FastAPI',
//     'PostgreSQL',
//     'REST APIs',
//     'Microservices',
//     'Ahmedabad',
//     'India',
//   ],
//   authors: [{ name: 'Het Patel' }],
//   openGraph: {
//     title: 'Het Patel - Backend Developer',
//     description: 'Portfolio showcasing scalable REST APIs and microservices projects',
//     type: 'website',
//     locale: 'en_US',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Het Patel - Backend Developer',
//     description: 'Portfolio showcasing scalable REST APIs and microservices projects',
//   },
// };

// // --- ROOT LAYOUT COMPONENT ---
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode; // All page content renders here
// }) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       {/* scroll-smooth: Smooth scrolling for anchor links */}
      
//       <body className={inter.className}>
//         {/* inter.className: Applies Inter font to entire app */}
        
//         {/* ========== PARTICLE BACKGROUND ========== */}
//         {/* Luxury ambient particle effect with depth blur */}
//         {/* - 45 large particles (2-5px) */}
//         {/* - 125 tiny particles (0.5-1.5px) */}
//         {/* - Depth-based opacity and movement */}
//         <ParticleBackground />
        
//         {/* ========== CURSOR SPOTLIGHT ========== */}
//         {/* Soft radial gradient that follows cursor */}
//         {/* - 500px diameter */}
//         {/* - Smooth spring animation */}
//         {/* - Mix-blend-screen for premium effect */}
//         <CursorSpotlight />
        
//         {/* ========== PAGE CONTENT WITH TRANSITIONS ========== */}
//         {/* Wraps all page content with fade transitions */}
//         {/* - Fades in on mount */}
//         {/* - Fades out on route change */}
//         {/* - Luxury easing curve */}
//         <PageTransition>
//           {children}
//         </PageTransition>
        
//         {/* ========== AI ASSISTANT ========== */}
//         {/* Fixed bottom-right chatbot */}
//         {/* Features: */}
//         {/* - Breathing animation */}
//         {/* - Welcome popup (3s delay) */}
//         {/* - Idle typing indicator */}
//         {/* - Voice control */}
//         {/* - Quick questions */}
//         <AIChatbot />
//       </body>
//     </html>
//   );
// }

// // ============================================
// // LUXURY FEATURES INCLUDED:
// // ============================================
// // ✅ Optimized particle background (170 particles with depth)
// // ✅ Cursor spotlight effect (follows mouse)
// // ✅ Page transitions (smooth fades)
// // ✅ AI assistant (premium chat interface)
// // ✅ Consistent 8pt spacing grid (via globals.css)
// // ✅ Smooth scroll behavior
// // ✅ SEO optimized metadata



































// ============================================
// ROOT LAYOUT - Wraps all pages
// ============================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// --- LUXURY UI COMPONENTS ---
import ParticleBackground from '@/components/ui/ParticleBackground';
import CursorSpotlight from '@/components/ui/CursorSpotlight';
import PageTransition from '@/components/ui/PageTransition';

// ✅ REMOVED: AIChatbot from global layout

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Het Patel - Backend Developer',
  description: 'Portfolio of Het Patel - Backend Developer specializing in scalable REST APIs, microservices, Python, FastAPI, and PostgreSQL',
  keywords: [
    'Het Patel',
    'Backend Developer',
    'Full-Stack Developer',
    'Portfolio',
    'React',
    'Next.js',
    'Python',
    'FastAPI',
    'PostgreSQL',
    'REST APIs',
    'Microservices',
    'Ahmedabad',
    'India',
  ],
  authors: [{ name: 'Het Patel' }],
  openGraph: {
    title: 'Het Patel - Backend Developer',
    description: 'Portfolio showcasing scalable REST APIs and microservices projects',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Het Patel - Backend Developer',
    description: 'Portfolio showcasing scalable REST APIs and microservices projects',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        
        {/* ========== PARTICLE BACKGROUND ========== */}
        <ParticleBackground />
        
        {/* ========== CURSOR SPOTLIGHT ========== */}
        <CursorSpotlight />
        
        {/* ========== PAGE CONTENT WITH TRANSITIONS ========== */}
        <PageTransition>
          {children}
        </PageTransition>
        
        {/* ✅ REMOVED: AI Chatbot (now only in home page) */}
        
      </body>
    </html>
  );
}
