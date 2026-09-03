import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Hero3DProps {
  scrollY: number;
}

// Animated 3D Box component
const RotatingBox = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color="#10b981" wireframe={false} />
    </mesh>
  );
};

// Animated Sphere component
const FloatingSphere = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
};

// Scene lighting setup
const SceneLights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#3b82f6" />
      <directionalLight position={[5, 10, 7]} intensity={1} />
    </>
  );
};

// Main 3D content
const Hero3DContent = () => {
  return (
    <>
      <SceneLights />
      
      {/* Central rotating tractor-like shape */}
      <RotatingBox position={[0, 0, 0]} />
      
      {/* Floating accent spheres */}
      <FloatingSphere position={[3, 2, -3]} color="#10b981" />
      <FloatingSphere position={[-3, -1, -3]} color="#3b82f6" />
      <FloatingSphere position={[2, -2, 2]} color="#f59e0b" />
      
      {/* Background torus for depth */}
      <mesh position={[0, 0, -5]} scale={3}>
        <torusGeometry args={[2, 0.5, 16, 100]} />
        <meshPhongMaterial color="#1f2937" wireframe />
      </mesh>
    </>
  );
};

export default function Hero3D({ scrollY }: Hero3DProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Hero3DContent />
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
    </div>
  );
}