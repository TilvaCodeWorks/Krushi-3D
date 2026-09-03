import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HarvesterProps {
  scrollY: number;
}

// Rotating cutting mechanism
const CuttingMechanism = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 1.5]}>
      {/* Rotating blades */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI / 2) * i]}>
          <boxGeometry args={[0.8, 0.1, 0.2]} />
          <meshPhongMaterial color="#ea580c" metalness={0.8} />
        </mesh>
      ))}
      
      {/* Center hub */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshPhongMaterial color="#1f2937" metalness={0.7} />
      </mesh>
    </group>
  );
};

// Main harvester model
const HarvesterModel = ({ scrollY }: { scrollY: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = (scrollY * 0.0007) % (Math.PI * 2);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main cabin */}
      <mesh position={[0, 1.2, -0.5]}>
        <boxGeometry args={[1.2, 1.2, 1.5]} />
        <meshPhongMaterial color="#f59e0b" />
      </mesh>

      {/* Cabin roof */}
      <mesh position={[0, 2, -0.5]}>
        <coneGeometry args={[0.8, 0.7, 4]} />
        <meshPhongMaterial color="#d97706" />
      </mesh>

      {/* Engine/Motor block */}
      <mesh position={[0, 0.8, -1]}>
        <boxGeometry args={[0.8, 0.8, 0.6]} />
        <meshPhongMaterial color="#fed7aa" metalness={0.5} />
      </mesh>

      {/* Main hopper (grain storage) */}
      <mesh position={[0, 1, 0.3]}>
        <boxGeometry args={[1.5, 1.2, 1.2]} />
        <meshPhongMaterial color="#dc2626" />
      </mesh>

      {/* Hopper top cone */}
      <mesh position={[0, 1.9, 0.3]}>
        <coneGeometry args={[1, 0.5, 6]} />
        <meshPhongMaterial color="#7f1d1d" />
      </mesh>

      {/* Grain discharge chute */}
      <mesh position={[1.2, 0.5, 0.3]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.3, 1, 0.8]} />
        <meshPhongMaterial color="#b91c1c" metalness={0.6} />
      </mesh>

      {/* Cutting mechanism */}
      <CuttingMechanism />

      {/* Conveyor belt to hopper */}
      <mesh position={[0.2, 0.5, 1]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.3, 2, 0.2]} />
        <meshPhongMaterial color="#111111" />
      </mesh>

      {/* Support frame - left */}
      <mesh position={[-1, 0.3, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshPhongMaterial color="#4b5563" metalness={0.6} />
      </mesh>

      {/* Support frame - right */}
      <mesh position={[1, 0.3, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshPhongMaterial color="#4b5563" metalness={0.6} />
      </mesh>

      {/* Heavy duty wheels - front */}
      {[-0.6, 0.6].map((x, i) => (
        <group key={`front-${i}`} position={[x, 0, 1]}>
          <mesh>
            <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshPhongMaterial color="#111111" />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.55, 0.55, 0.45, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshPhongMaterial color="#1f1f1f" />
          </mesh>
        </group>
      ))}

      {/* Heavy duty wheels - rear */}
      {[-0.7, 0.7].map((x, i) => (
        <group key={`rear-${i}`} position={[x, 0, -1.2]}>
          <mesh>
            <cylinderGeometry args={[0.75, 0.75, 0.5, 32]} rotation={[Math.PI / 2, 0, 0]} />
            <meshPhongMaterial color="#000000" />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.55, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshPhongMaterial color="#0a0a0a" />
          </mesh>
        </group>
      ))}

      {/* Cabin lights */}
      <mesh position={[-0.45, 1.5, 0.2]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshPhongMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0.45, 1.5, 0.2]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshPhongMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.9} />
      </mesh>

      {/* Ground plane */}
      <mesh position={[0, -0.7, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[5, 5]} />
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
      <directionalLight position={[8, 14, 6]} intensity={1.1} />
      <directionalLight position={[-6, 8, -6]} intensity={0.6} color="#f97316" />
      <pointLight position={[0, 3, 2]} intensity={0.8} />
    </>
  );
};

export default function Harvester({ scrollY }: HarvesterProps) {
  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={50} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.2}
      />
      
      <Lights />
      <HarvesterModel scrollY={scrollY} />
      
      {/* Background */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20]} />
        <meshPhongMaterial color="#1a1a1a" />
      </mesh>
    </Canvas>
  );
}