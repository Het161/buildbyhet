// 'use client';

// import { ReactNode, useEffect, useState, useRef } from 'react';
// import { motion } from 'framer-motion';

// interface ScrollSnapSectionProps {
//   children: ReactNode;
//   id?: string;
//   className?: string;
// }

// export default function ScrollSnapSection({ 
//   children, 
//   id,
//   className = '' 
// }: ScrollSnapSectionProps) {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLElement>(null);
//   const hasAnimated = useRef(false);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     // ✅ IMMEDIATE CHECK: If section is already in view on mount, show it
//     const checkIfInView = () => {
//       const rect = section.getBoundingClientRect();
//       const windowHeight = window.innerHeight;
      
//       // Check if section is visible (even partially)
//       const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      
//       if (isInViewport && !hasAnimated.current) {
//         setIsVisible(true);
//         hasAnimated.current = true;
//       }
//     };

//     // ✅ Check immediately on mount
//     checkIfInView();

//     // ✅ INTERSECTION OBSERVER: Detect when scrolling into view
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && !hasAnimated.current) {
//             setIsVisible(true);
//             hasAnimated.current = true;
//           }
//         });
//       },
//       {
//         threshold: 0.1, // Trigger when 10% visible
//         rootMargin: '-80px 0px 0px 0px', // Account for navbar
//       }
//     );

//     observer.observe(section);

//     // ✅ SCROLL LISTENER: For navigation clicks
//     const handleScroll = () => {
//       checkIfInView();
//     };

//     // Use scroll container if it exists, otherwise window
//     const scrollContainer = document.querySelector('.scroll-snap-container');
//     const scrollElement = scrollContainer || window;

//     scrollElement.addEventListener('scroll', handleScroll);

//     return () => {
//       observer.disconnect();
//       scrollElement.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <motion.section
//       ref={sectionRef}
//       id={id}
//       className={`scroll-snap-section ${className}`}
//       style={{ scrollMarginTop: '80px' }}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ 
//         opacity: isVisible ? 1 : 0,
//         y: isVisible ? 0 : 30
//       }}
//       transition={{ 
//         duration: 0.6,
//         ease: 'easeOut'
//       }}
//     >
//       {children}
//     </motion.section>
//   );
// }


'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScrollSnapSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function ScrollSnapSection({ 
  children, 
  id,
  className = '' 
}: ScrollSnapSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const checkAndAnimate = () => {
      if (hasAnimatedRef.current) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport (with navbar offset)
      const isInView = rect.top < windowHeight - 100 && rect.bottom > 100;
      
      if (isInView) {
        setIsVisible(true);
        hasAnimatedRef.current = true;
      }
    };

    // ✅ Check immediately on mount (for navigation clicks)
    setTimeout(checkAndAnimate, 50);

    // ✅ Check on scroll (for natural scrolling)
    const scrollContainer = document.querySelector('.scroll-snap-container');
    const scrollElement = scrollContainer || window;

    scrollElement.addEventListener('scroll', checkAndAnimate);

    // ✅ Fallback: Check every 100ms for first 2 seconds
    const interval = setInterval(checkAndAnimate, 100);
    setTimeout(() => clearInterval(interval), 2000);

    return () => {
      scrollElement.removeEventListener('scroll', checkAndAnimate);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`scroll-snap-section ${className}`}
      style={{ scrollMarginTop: '80px' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 30
      }}
      transition={{ 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] // Custom easing
      }}
    >
      {children}
    </motion.section>
  );
}

