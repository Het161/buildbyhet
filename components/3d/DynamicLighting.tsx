'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

export default function DynamicLighting() {
  const lightRef = useRef<THREE.PointLight>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate light following mouse
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(
        lightRef.current.position.x,
        mousePos.x * 5,
        0.05
      );
      lightRef.current.position.y = THREE.MathUtils.lerp(
        lightRef.current.position.y,
        mousePos.y * 5,
        0.05
      );
    }
  });

  return (
    <>
      {/* Ambient base lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Dynamic point light following mouse */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 5]}
        intensity={2}
        distance={10}
        color="#00D9FF"
        castShadow
      />
      
      {/* Directional light for depth */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.5}
        castShadow
      />
      
      {/* Post-processing effects */}
      <EffectComposer>
        {/* Bloom for neon glow */}
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        
        {/* Chromatic aberration for cyberpunk effect */}
        <ChromaticAberration
          offset={new THREE.Vector2(0.001, 0.001)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </>
  );
}
