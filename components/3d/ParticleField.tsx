// ============================================
// 3D PARTICLE FIELD COMPONENT
// ============================================
// Creates an interactive 3D particle system
// Features:
// - Floating particles in 3D space
// - Mouse-reactive movement
// - Smooth animations
// - Performance optimized with instancing

'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ========== PARTICLES COMPONENT ==========
// This component renders the actual 3D particles
function Particles({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // --- GENERATE PARTICLE POSITIONS ---
  // useMemo ensures positions are only calculated once (performance optimization)
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3); // x, y, z for each particle
    
    // Generate random positions in a sphere
    for (let i = 0; i < count; i++) {
      // Random spherical distribution
      const radius = Math.random() * 25; // Sphere radius
      const theta = Math.random() * Math.PI * 2; // Horizontal angle
      const phi = Math.random() * Math.PI; // Vertical angle
      
      // Convert spherical to Cartesian coordinates
      // Why? Creates natural-looking particle distribution in 3D space
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);     // x
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      positions[i * 3 + 2] = radius * Math.cos(phi);                   // z
    }
    
    return positions;
  }, [count]);
  
  // --- ANIMATION LOOP ---
  // useFrame runs on every frame (60 FPS)
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Get mouse position from state
    const mouseX = state.mouse.x; // -1 to 1
    const mouseY = state.mouse.y; // -1 to 1
    
    // ROTATION: Slowly rotate entire particle field
    pointsRef.current.rotation.x += 0.0003; // Gentle X rotation
    pointsRef.current.rotation.y += 0.0005; // Gentle Y rotation
    
    // MOUSE INTERACTION: Tilt based on mouse position
    // Why multiply by 0.2? Subtle effect, not overwhelming
    pointsRef.current.rotation.x += mouseY * 0.0002;
    pointsRef.current.rotation.y += mouseX * 0.0002;
  });
  
  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3} // xyz = 3 values per vertex
      frustumCulled={false} // Don't cull particles outside view (better for our use case)
    >
      {/* PARTICLE MATERIAL */}
      {/* Defines how particles look */}
      <PointMaterial
        transparent // Allow transparency
        color="#00D9FF" // Electric blue
        size={0.15} // Particle size
        sizeAttenuation={true} // Particles get smaller with distance
        depthWrite={false} // Don't write to depth buffer (better blending)
        opacity={0.6} // Semi-transparent
      />
    </Points>
  );
}

// ========== MAIN PARTICLE FIELD COMPONENT ==========
// This wraps the Canvas and provides configuration
export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* 
        Why fixed + inset-0? Covers entire viewport
        Why -z-10? Places behind all content
        Why pointer-events-none? Allows clicking through to content below
      */}
      
      <Canvas
        camera={{
          position: [0, 0, 15], // Camera position (x, y, z)
          fov: 75, // Field of view (degrees)
          near: 0.1, // Near clipping plane
          far: 1000, // Far clipping plane
        }}
        // Performance settings
        dpr={[1, 2]} // Device pixel ratio: [min, max]
        // Why [1, 2]? Renders at 1x on low-end, 2x on high-end devices
      >
        {/* AMBIENT LIGHT: Provides base illumination */}
        <ambientLight intensity={0.5} />
        
        {/* PARTICLES: The actual 3D particle system */}
        <Particles count={2000} />
        {/* count: Number of particles
            Lower = better performance
            Higher = denser effect
            2000 is a good balance */}
      </Canvas>
    </div>
  );
}

// ============================================
// HOW IT WORKS:
// ============================================
// 1. CANVAS: Three.js rendering context
// 2. PARTICLES: Generates random 3D positions
// 3. ANIMATION: Rotates slowly + reacts to mouse
// 4. INSTANCING: Uses Points for efficient rendering of many particles
// 5. MATERIAL: Defines particle appearance (color, size, transparency)

// ============================================
// PERFORMANCE NOTES:
// ============================================
// - useMemo: Prevents recalculating positions every frame
// - PointMaterial: GPU-accelerated particle rendering
// - frustumCulled=false: Simpler culling for better performance
// - depthWrite=false: Better blending without depth conflicts

// ============================================
// CUSTOMIZATION:
// ============================================
// - Change color: Modify color="#00D9FF"
// - More/less particles: Adjust count={2000}
// - Particle size: Modify size={0.15}
// - Speed: Change rotation increments (0.0003, 0.0005)
// - Mouse sensitivity: Adjust mouseX/Y multipliers (0.0002)
