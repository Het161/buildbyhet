// ============================================
// ROOT LAYOUT - Wraps all pages
// ============================================
// This layout persists across all routes
// Contains: HTML structure, fonts, metadata

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// --- FONT CONFIGURATION ---
// Inter: Modern, readable sans-serif font
// subsets: ['latin'] - Only load Latin characters (smaller file size)
const inter = Inter({ subsets: ['latin'] })

// --- METADATA (SEO) ---
// Appears in browser tab and search results
export const metadata: Metadata = {
  title: 'Het - Full-Stack Developer',
  description: 'Portfolio of Het, a Full-Stack Developer from Ahmedabad specializing in React, Next.js, Python, and FastAPI',
  keywords: ['Het', 'Full-Stack Developer', 'Portfolio', 'React', 'Next.js', 'Python'],
}

// --- ROOT LAYOUT COMPONENT ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode  // All page content renders here
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* scroll-smooth: Smooth scrolling for anchor links */}
      
      <body className={inter.className}>
        {/* inter.className: Applies Inter font */}
        {children}
        {/* children: Your page.tsx content renders here */}
      </body>
    </html>
  )
}
