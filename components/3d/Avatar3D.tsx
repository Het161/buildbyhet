// // ============================================
// // 3D ANIMATED AVATAR COMPONENT
// // ============================================
// // Simplified geometric avatar (no GLB needed)
// // Features all animations: breathing, hovering, talking, blinking

// 'use client';

// import { useRef, useState, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Torus } from '@react-three/drei';
// import * as THREE from 'three';
// import { motion } from 'framer-motion';

// // ========== AVATAR MODEL COMPONENT ==========
// function AvatarModel({ 
//   isTalking = false,
//   isHovered = false,
//   mousePosition = { x: 0, y: 0 }
// }: { 
//   isTalking?: boolean;
//   isHovered?: boolean;
//   mousePosition?: { x: number; y: number };
// }) {
//   const groupRef = useRef<THREE.Group>(null);
//   const headRef = useRef<THREE.Mesh>(null);
//   const leftEyeRef = useRef<THREE.Mesh>(null);
//   const rightEyeRef = useRef<THREE.Mesh>(null);
  
//   // Animation state
//   const [waveProgress, setWaveProgress] = useState(0);
//   const [blinkProgress, setBlinkProgress] = useState(0);
  
//   // --- ANIMATION LOOP ---
//   useFrame((state) => {
//     if (!groupRef.current || !headRef.current) return;
    
//     const time = state.clock.elapsedTime;
    
//     // === IDLE ANIMATION ===
//     // Gentle breathing motion (up and down)
//     groupRef.current.position.y = Math.sin(time * 0.8) * 0.08;
    
//     // Slight rotation/sway (left and right)
//     groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
//     groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
    
//     // === HOVER EFFECT ===
//     if (isHovered) {
//       const targetRotationY = mousePosition.x * 0.5;
//       const targetRotationX = -mousePosition.y * 0.3;
      
//       headRef.current.rotation.y = THREE.MathUtils.lerp(
//         headRef.current.rotation.y,
//         targetRotationY,
//         0.1
//       );
//       headRef.current.rotation.x = THREE.MathUtils.lerp(
//         headRef.current.rotation.x,
//         targetRotationX,
//         0.1
//       );
//     } else {
//       headRef.current.rotation.y = THREE.MathUtils.lerp(
//         headRef.current.rotation.y,
//         0,
//         0.05
//       );
//       headRef.current.rotation.x = THREE.MathUtils.lerp(
//         headRef.current.rotation.x,
//         0,
//         0.05
//       );
//     }
    
//     // === TALKING ANIMATION ===
//     if (isTalking) {
//       headRef.current.position.y = Math.sin(time * 10) * 0.03;
//       headRef.current.rotation.z = Math.sin(time * 8) * 0.08;
//     } else {
//       headRef.current.position.y = THREE.MathUtils.lerp(
//         headRef.current.position.y,
//         0,
//         0.1
//       );
//     }
    
//     // === WAVE ANIMATION ===
//     if (waveProgress > 0) {
//       const waveAngle = Math.sin(waveProgress * Math.PI * 4) * 0.6;
//       groupRef.current.rotation.z = waveAngle;
//       setWaveProgress(Math.max(0, waveProgress - 0.03));
//     }
    
//     // === BLINK ANIMATION ===
//     if (leftEyeRef.current && rightEyeRef.current) {
//       if (Math.random() < 0.005 && blinkProgress === 0) {
//         setBlinkProgress(1);
//       }
      
//       if (blinkProgress > 0) {
//         const blinkScale = Math.abs(Math.sin(blinkProgress * Math.PI));
//         leftEyeRef.current.scale.y = blinkScale * 0.5 + 0.5;
//         rightEyeRef.current.scale.y = blinkScale * 0.5 + 0.5;
        
//         setBlinkProgress(Math.max(0, blinkProgress - 0.1));
//       } else {
//         leftEyeRef.current.scale.y = 1;
//         rightEyeRef.current.scale.y = 1;
//       }
//     }
//   });
  
//   useEffect(() => {
//     if (isHovered && waveProgress === 0) {
//       setWaveProgress(1);
//     }
//   }, [isHovered, waveProgress]);
  
//   return (
//     <group ref={groupRef} position={[0, 0, 0]}>
//       {/* === HEAD === */}
//       <mesh ref={headRef} position={[0, 0.5, 0]} castShadow>
//         <sphereGeometry args={[0.35, 32, 32]} />
//         <meshStandardMaterial 
//           color="#00D9FF" 
//           metalness={0.8}
//           roughness={0.2}
//           emissive="#00D9FF"
//           emissiveIntensity={0.3}
//         />
//       </mesh>
      
//       {/* === BODY === */}
//       <mesh position={[0, -0.2, 0]} castShadow>
//         <cylinderGeometry args={[0.28, 0.35, 0.9, 32]} />
//         <meshStandardMaterial 
//           color="#1a0b2e" 
//           metalness={0.6}
//           roughness={0.3}
//         />
//       </mesh>
      
//       {/* === LEFT EYE === */}
//       <mesh ref={leftEyeRef} position={[-0.12, 0.55, 0.28]}>
//         <sphereGeometry args={[0.05, 16, 16]} />
//         <meshStandardMaterial 
//           color="#ffffff" 
//           emissive="#00D9FF" 
//           emissiveIntensity={0.8}
//         />
//       </mesh>
      
//       {/* === RIGHT EYE === */}
//       <mesh ref={rightEyeRef} position={[0.12, 0.55, 0.28]}>
//         <sphereGeometry args={[0.05, 16, 16]} />
//         <meshStandardMaterial 
//           color="#ffffff" 
//           emissive="#00D9FF" 
//           emissiveIntensity={0.8}
//         />
//       </mesh>
      
//       {/* === GLOW RING === */}
//       <Torus 
//         args={[0.45, 0.02, 16, 100]} 
//         position={[0, 0.5, 0]}
//         rotation={[Math.PI / 2, 0, 0]}
//       >
//         <meshStandardMaterial 
//           color="#00D9FF" 
//           emissive="#00D9FF"
//           emissiveIntensity={1}
//           transparent
//           opacity={0.6}
//         />
//       </Torus>
      
//       {/* === POINT LIGHT === */}
//       <pointLight 
//         position={[0, 0.5, 0.5]} 
//         intensity={1.5} 
//         color="#00D9FF" 
//         distance={2} 
//       />
//     </group>
//   );
// }

// // ========== MAIN AVATAR COMPONENT ==========
// export default function Avatar3D() {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isTalking, setIsTalking] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   useEffect(() => {
//     const handleTalking = (e: CustomEvent) => {
//       setIsTalking(e.detail.isTalking);
//     };
    
//     window.addEventListener('avatar-talking' as any, handleTalking);
//     return () => window.removeEventListener('avatar-talking' as any, handleTalking);
//   }, []);
  
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!containerRef.current) return;
    
//     const rect = containerRef.current.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
//     const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
//     setMousePosition({ x, y });
//   };
  
//   return (
//   <motion.div
//     ref={containerRef}
//     className="w-64 h-80"  // ← REMOVED "fixed top-24 right-6 z-40"
//     initial={{ opacity: 0, x: 100, scale: 0.8 }}
//     animate={{ opacity: 1, x: 0, scale: 1 }}
//     transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
//     onMouseEnter={() => setIsHovered(true)}
//     onMouseLeave={() => {
//       setIsHovered(false);
//       setMousePosition({ x: 0, y: 0 });
//     }}
//     onMouseMove={handleMouseMove}
//   >
//       <div className="relative w-full h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-4 shadow-2xl overflow-hidden">
        
//         {/* NAME TAG */}
//         <div className="absolute top-4 left-4 right-4 text-center z-10 pointer-events-none">
//           <p className="text-sm font-semibold text-electric-blue glow-text">
//             Het's Digital Avatar
//           </p>
//           <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-1">
//             <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></span>
//             <span>{isTalking ? 'Speaking...' : 'Online'}</span>
//           </div>
//         </div>
        
//         {/* 3D CANVAS */}
//         <Canvas
//           camera={{ 
//             position: [0, 0.5, 2.5], 
//             fov: 50 
//           }}
//           dpr={[1, 2]}
//           shadows
//         >
//           {/* LIGHTING */}
//           <ambientLight intensity={0.4} />
//           <spotLight 
//             position={[3, 3, 3]} 
//             intensity={1}
//             angle={0.3}
//             penumbra={0.5}
//             castShadow
//           />
//           <pointLight 
//             position={[-3, 2, 3]} 
//             intensity={0.6} 
//             color="#8B5CF6" 
//           />
//           <pointLight 
//             position={[0, 0, -2]} 
//             intensity={0.4} 
//             color="#00D9FF" 
//           />
          
//           {/* AVATAR */}
//           <AvatarModel 
//             isTalking={isTalking}
//             isHovered={isHovered}
//             mousePosition={mousePosition}
//           />
//         </Canvas>
        
//         {/* STATUS TEXT */}
//         <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
//           <motion.p 
//             className="text-xs text-gray-500"
//             animate={{ 
//               opacity: isHovered ? 1 : 0.7 
//             }}
//           >
//             {isHovered 
//               ? '👋 Hey there!' 
//               : isTalking 
//               ? '💬 Speaking...' 
//               : '😊 Hover to interact'
//             }
//           </motion.p>
//         </div>
        
//         {/* BACKGROUND GLOW */}
//         <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-neon-purple/5 rounded-3xl -z-10 blur-xl" />
//       </div>
//     </motion.div>
//   );
// }




// ============================================
// 3D ANIMATED AVATAR COMPONENT
// ============================================
// Simplified geometric avatar (no GLB needed)
// Features all animations: breathing, hovering, talking, blinking

'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// ========== AVATAR MODEL COMPONENT ==========
function AvatarModel({ 
  isTalking = false,
  isHovered = false,
  mousePosition = { x: 0, y: 0 }
}: { 
  isTalking?: boolean;
  isHovered?: boolean;
  mousePosition?: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  
  // Animation state
  const [waveProgress, setWaveProgress] = useState(0);
  const [blinkProgress, setBlinkProgress] = useState(0);
  
  // --- ANIMATION LOOP ---
  useFrame((state) => {
    if (!groupRef.current || !headRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // === IDLE ANIMATION ===
    // Gentle breathing motion (up and down)
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.08;
    
    // Slight rotation/sway (left and right)
    groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
    groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
    
    // === HOVER EFFECT ===
    if (isHovered) {
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = -mousePosition.y * 0.3;
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    } else {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        0,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        0,
        0.05
      );
    }
    
    // === TALKING ANIMATION ===
    if (isTalking) {
      headRef.current.position.y = Math.sin(time * 10) * 0.03;
      headRef.current.rotation.z = Math.sin(time * 8) * 0.08;
    } else {
      headRef.current.position.y = THREE.MathUtils.lerp(
        headRef.current.position.y,
        0,
        0.1
      );
    }
    
    // === WAVE ANIMATION ===
    if (waveProgress > 0) {
      const waveAngle = Math.sin(waveProgress * Math.PI * 4) * 0.6;
      groupRef.current.rotation.z = waveAngle;
      setWaveProgress(Math.max(0, waveProgress - 0.03));
    }
    
    // === BLINK ANIMATION ===
    if (leftEyeRef.current && rightEyeRef.current) {
      if (Math.random() < 0.005 && blinkProgress === 0) {
        setBlinkProgress(1);
      }
      
      if (blinkProgress > 0) {
        const blinkScale = Math.abs(Math.sin(blinkProgress * Math.PI));
        leftEyeRef.current.scale.y = blinkScale * 0.5 + 0.5;
        rightEyeRef.current.scale.y = blinkScale * 0.5 + 0.5;
        
        setBlinkProgress(Math.max(0, blinkProgress - 0.1));
      } else {
        leftEyeRef.current.scale.y = 1;
        rightEyeRef.current.scale.y = 1;
      }
    }
  });
  
  useEffect(() => {
    if (isHovered && waveProgress === 0) {
      setWaveProgress(1);
    }
  }, [isHovered, waveProgress]);
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* === HEAD === */}
      <mesh ref={headRef} position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial 
          color="#00D9FF" 
          metalness={0.8}
          roughness={0.2}
          emissive="#00D9FF"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* === BODY === */}
      <mesh position={[0, -0.2, 0]} castShadow>
        cylinderGeometry args={[0.28, 0.35, 0.9, 32]} 
        <meshStandardMaterial 
          color="#1a0b2e" 
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      
      {/* === LEFT EYE === */}
      <mesh ref={leftEyeRef} position={[-0.12, 0.55, 0.28]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#00D9FF" 
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* === RIGHT EYE === */}
      <mesh ref={rightEyeRef} position={[0.12, 0.55, 0.28]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#00D9FF" 
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* === GLOW RING === */}
      <Torus 
        args={[0.45, 0.02, 16, 100]} 
        position={[0, 0.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial 
          color="#00D9FF" 
          emissive="#00D9FF"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </Torus>
      
      {/* === POINT LIGHT === */}
      <pointLight 
        position={[0, 0.5, 0.5]} 
        intensity={1.5} 
        color="#00D9FF" 
        distance={2} 
      />
    </group>
  );
}

// ========== MAIN AVATAR COMPONENT ==========
export default function Avatar3D() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleTalking = (e: CustomEvent) => {
      setIsTalking(e.detail.isTalking);
    };
    
    window.addEventListener('avatar-talking' as any, handleTalking);
    return () => window.removeEventListener('avatar-talking' as any, handleTalking);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    setMousePosition({ x, y });
  };
  
  return (
    <motion.div
      ref={containerRef}
      className="w-48 h-60"  // ✅ SMALLER: was w-64 h-80, now w-48 h-60 (25% smaller)
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-3 shadow-2xl overflow-hidden">
        
        {/* NAME TAG */}
        <div className="absolute top-3 left-3 right-3 text-center z-10 pointer-events-none">
          <p className="text-xs font-semibold text-electric-blue glow-text">
            Het's Digital Avatar
          </p>
          <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400 mt-0.5">
            <span className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-pulse"></span>
            <span>{isTalking ? 'Speaking...' : 'Online'}</span>
          </div>
        </div>
        
        {/* 3D CANVAS */}
        <Canvas
          camera={{ 
            position: [0, 0.5, 2.5], 
            fov: 50 
          }}
          dpr={[1, 2]}
          shadows
        >
          {/* LIGHTING */}
          <ambientLight intensity={0.4} />
          <spotLight 
            position={[3, 3, 3]} 
            intensity={1}
            angle={0.3}
            penumbra={0.5}
            castShadow
          />
          <pointLight 
            position={[-3, 2, 3]} 
            intensity={0.6} 
            color="#8B5CF6" 
          />
          <pointLight 
            position={[0, 0, -2]} 
            intensity={0.4} 
            color="#00D9FF" 
          />
          
          {/* AVATAR */}
          <AvatarModel 
            isTalking={isTalking}
            isHovered={isHovered}
            mousePosition={mousePosition}
          />
        </Canvas>
        
        {/* STATUS TEXT */}
        <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
          <motion.p 
            className="text-[10px] text-gray-500"
            animate={{ 
              opacity: isHovered ? 1 : 0.7 
            }}
          >
            {isHovered 
              ? '👋 Hey there!' 
              : isTalking 
              ? '💬 Speaking...' 
              : '😊 Hover to interact'
            }
          </motion.p>
        </div>
        
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-neon-purple/5 rounded-2xl -z-10 blur-xl" />
      </div>
    </motion.div>
  );
}
