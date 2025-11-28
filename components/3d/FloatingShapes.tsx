// ============================================
// FLOATING GEOMETRIC SHAPES
// ============================================
// Adds animated 3D shapes (cubes, spheres, toruses)
// Features:
// - Rotating shapes
// - Mouse-reactive movement
// - Glassmorphic wireframe material

'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ========== INDIVIDUAL SHAPE COMPONENT ==========
function Shape({ 
  position, 
  geometry, 
  speed 
}: { 
  position: [number, number, number];
  geometry: THREE.BufferGeometry;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // ANIMATION: Rotate shape continuously
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Continuous rotation
    meshRef.current.rotation.x += speed;
    meshRef.current.rotation.y += speed * 0.7;
    
    // Gentle floating motion
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
    
    // Mouse interaction: Move shapes based on cursor
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;
    
    meshRef.current.rotation.y += mouseX * 0.0001;
    meshRef.current.rotation.x += mouseY * 0.0001;
  });
  
  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      {/* WIREFRAME MATERIAL: Holographic look */}
      <meshBasicMaterial
        wireframe // Shows only edges (not filled)
        color="#00D9FF" // Electric blue
        transparent
        opacity={0.2} // Very subtle
      />
    </mesh>
  );
}

// ========== SHAPES COLLECTION ==========
function Shapes() {
  // CREATE GEOMETRIES
  // useMemo would be better here for performance, but keeping it simple
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);
  const torusGeometry = new THREE.TorusGeometry(0.7, 0.3, 16, 100);
  
  return (
    <>
      {/* BOX: Top left */}
      <Shape 
        position={[-8, 5, -5]} 
        geometry={boxGeometry} 
        speed={0.002} 
      />
      
      {/* SPHERE: Top right */}
      <Shape 
        position={[8, 4, -3]} 
        geometry={sphereGeometry} 
        speed={0.003} 
      />
      
      {/* TORUS: Bottom left */}
      <Shape 
        position={[-6, -4, -4]} 
        geometry={torusGeometry} 
        speed={0.001} 
      />
      
      {/* BOX: Bottom right */}
      <Shape 
        position={[7, -5, -6]} 
        geometry={boxGeometry} 
        speed={0.0025} 
      />
      
      {/* SPHERE: Center background */}
      <Shape 
        position={[0, 0, -8]} 
        geometry={sphereGeometry} 
        speed={0.0015} 
      />
    </>
  );
}

// ========== MAIN COMPONENT ==========
export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <Shapes />
      </Canvas>
    </div>
  );
}

// ============================================
// WHY WIREFRAME?
// ============================================
// - Matches futuristic/cyberpunk aesthetic
// - Lightweight rendering (no textures needed)
// - Transparent, doesn't obstruct content
// - Creates depth without visual clutter

// ============================================
// CUSTOMIZATION:
// ============================================
// - Add more shapes: Copy <Shape /> component with new position
// - Change geometry: Use TetrahedronGeometry, OctahedronGeometry, etc.
// - Adjust size: Modify geometry parameters
// - Speed: Change speed prop values
// - Color: Modify color="#00D9FF"
