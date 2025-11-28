'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ReflectiveCardProps {
  position: [number, number, number];
  hovered?: boolean;
}

export default function ReflectiveCard({ position, hovered = false }: ReflectiveCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [intensity, setIntensity] = useState(0);

  // Animate glow intensity on hover
  useFrame(() => {
    if (meshRef.current) {
      const targetIntensity = hovered ? 1 : 0;
      setIntensity(THREE.MathUtils.lerp(intensity, targetIntensity, 0.1));
      
      // Update emissive intensity
      if (meshRef.current.material instanceof THREE.MeshPhysicalMaterial) {
        meshRef.current.material.emissiveIntensity = intensity;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[2, 3, 0.1]} />
      <meshPhysicalMaterial
        color="#1a1a2e"
        metalness={0.9}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        reflectivity={1}
        emissive="#00D9FF"
        emissiveIntensity={intensity}
      />
    </mesh>
  );
}
