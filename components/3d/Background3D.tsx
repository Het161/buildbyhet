// ============================================
// COMBINED 3D BACKGROUND
// ============================================
// Combines particles + shapes in one optimized component

'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import FloatingShapes from './FloatingShapes';

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Suspense fallback={null}>
        {/* Suspense prevents layout shift while loading */}
        <Canvas
          camera={{ position: [0, 0, 15], fov: 75 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.4} />
          
          {/* Both effects in one canvas (better performance) */}
          <ParticleField />
          <FloatingShapes />
        </Canvas>
      </Suspense>
    </div>
  );
}
