'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 1500 }: { count?: number }) { // ✅ REDUCED from 2000 to 1500
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, [count]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;
    
    pointsRef.current.rotation.x += 0.0003;
    pointsRef.current.rotation.y += 0.0005;
    
    pointsRef.current.rotation.x += mouseY * 0.0002;
    pointsRef.current.rotation.y += mouseX * 0.0002;
  });
  
  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#00D9FF"
        size={0.08} // ✅ REDUCED from 0.15 to 0.08 (47% smaller!)
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4} // ✅ REDUCED from 0.6 to 0.4
      />
    </Points>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <Particles count={1500} /> {/* ✅ REDUCED from 2000 to 1500 */}
      </Canvas>
    </div>
  );
}
