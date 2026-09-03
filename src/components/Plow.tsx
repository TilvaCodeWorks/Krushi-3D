import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlowProps {
  scrollY: number;
}

// Main plow model
const PlowModel = ({ scrollY }: { scrollY: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = (scrollY * 0.0008) % (Math.PI * 2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.5, 3]} />
        <meshPhongMaterial color="#1f2937" />
      </mesh>

      {/* Front attachment */}
      <mesh position={[0, 0.4, 1.8]}>
        <boxGeometry args={[0.6, 0.3, 0.4]} />
        <meshPhongMaterial color="#374151" metalness={0.5} />
      </mesh>

      {/* Left plow blade */}
      <mesh position={[-0.6, -0.2, 0]}>
        <boxGeometry args={[0.2, 1.2, 2.5]} />
        <meshPhongMaterial color="#0369a1" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Right plow blade */}
      <mesh position={[0.6, -0.2, 0]}>
        <boxGeometry args={[0.2, 1.2, 2.5]} />
        <meshPhongMaterial color="#0369a1" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Center blade */}
      <mesh position={[0, -0.3, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.15, 1, 2.8]} />
        <meshPhongMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Support beam - left */}
      <mesh position={[-0.8, 0.1, -1]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 16]} />
        <meshPhongMaterial color="#4b5563" metalness={0.6} />
      </mesh>

      {/* Support beam - right */}
      <mesh position={[0.8, 0.1, -1]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 16]} />
        <meshPhongMaterial color="#4b5563" metalness={0.6} />
      </mesh>

      {/* Rear stabilizer */}
      <mesh position={[0, -0.1, -2]}>
        <boxGeometry args={[1.2, 0.2, 0.3]} />
        <meshPhongMaterial color="#1f2937" />
      </mesh>

      {/* Hydraulic cylinder - left */}
      <mesh position={[-0.5, 0.8, 1]} rotation={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
        <meshPhongMaterial color="#6b7280" metalness={0.7} />
      </mesh>

      {/* Hydraulic cylinder - right */}
      <mesh position={[0.5, 0.8, 1]} rotation={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
        <meshPhongMaterial color="#6b7280" metalness={0.7} />
      </mesh>

      {/* Depth wheels */}
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={i} position={[x, -0.5, 1.5]}>
          <cylinderGeometry args={[0.25, 0.25, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshPhongMaterial color="#111111" />
        </mesh>
      ))}

      {/* Ground plane */}
      <mesh position={[0, -1.5, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshPhongMaterial color="#111111" />
      </mesh>
    </group>
  );
};

// Lighting
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[8, 12, 5]} intensity={1} />
      <directionalLight position={[-5, 6, -5]} intensity={0.5} color="#1e40af" />
      <pointLight position={[0, 3, 2]} intensity={0.7} />
    </>
  );
};

export default function Plow({ scrollY }: PlowProps) {
  return (
    <Canvas camera={{ position: [2, 1.5, 2.5], fov: 50 }}>
      <PerspectiveCamera makeDefault position={[2, 1.5, 2.5]} fov={50} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
      />
      
      <Lights />
      <PlowModel scrollY={scrollY} />
      
      {/* Background */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20]} />
        <meshPhongMaterial color="#0f172a" />
      </mesh>
    </Canvas>
  );
}