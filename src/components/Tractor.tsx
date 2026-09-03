import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  PerspectiveCamera,
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import * as THREE from 'three';

interface TractorProps {
  scrollY: number;
}

/* =========================================================
   MATERIALS
========================================================= */

const tractorGreen = '#1f8f45';
const tractorDarkGreen = '#126b32';
const tireBlack = '#111111';
const rimColor = '#c9c9c9';
const metalDark = '#252525';
const glassBlue = '#173d45';

/* =========================================================
   WHEEL
========================================================= */

interface WheelProps {
  position: [number, number, number];
  radius: number;
  width: number;
  isFront?: boolean;
}

const Wheel = ({
  position,
  radius,
  width,
  isFront = false,
}: WheelProps) => {
  const wheelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x -= delta * 0.8;
    }
  });

  return (
    <group ref={wheelRef} position={position} rotation={[0, 0, Math.PI / 2]}>
      {/* Main tire */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, width, 48]} />
        <meshStandardMaterial
          color={tireBlack}
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>

      {/* Outer tire ring */}
      <mesh position={[0, width / 2 + 0.012, 0]} castShadow>
        <torusGeometry
          args={[radius * 0.82, radius * 0.13, 12, 40]}
        />
        <meshStandardMaterial
          color="#181818"
          roughness={0.95}
        />
      </mesh>

      {/* Rim */}
      <mesh position={[0, width / 2 + 0.025, 0]}>
        <cylinderGeometry
          args={[radius * 0.52, radius * 0.52, 0.07, 32]}
        />
        <meshStandardMaterial
          color={rimColor}
          metalness={0.8}
          roughness={0.22}
        />
      </mesh>

      {/* Rim center */}
      <mesh position={[0, width / 2 + 0.07, 0]}>
        <cylinderGeometry
          args={[radius * 0.16, radius * 0.16, 0.09, 24]}
        />
        <meshStandardMaterial
          color="#777777"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Rim spokes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius * 0.32,
              width / 2 + 0.065,
              Math.sin(angle) * radius * 0.32,
            ]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry
              args={[radius * 0.08, 0.08, radius * 0.48]}
            />
            <meshStandardMaterial
              color="#9a9a9a"
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>
        );
      })}

      {/* Tire tread blocks */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;

        return (
          <mesh
            key={`tread-${i}`}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius,
            ]}
            rotation={[0, -angle, 0]}
            castShadow
          >
            <boxGeometry
              args={[
                radius * 0.16,
                width * 1.12,
                radius * 0.28,
              ]}
            />
            <meshStandardMaterial
              color="#080808"
              roughness={1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

/* =========================================================
   HEADLIGHT
========================================================= */

const Headlight = ({
  position,
}: {
  position: [number, number, number];
}) => {
  return (
    <mesh position={position} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.11, 0.13, 0.08, 32]} />
      <meshStandardMaterial
        color="#fff7c2"
        emissive="#fff2a6"
        emissiveIntensity={2}
        metalness={0.1}
        roughness={0.15}
      />
    </mesh>
  );
};

/* =========================================================
   EXHAUST
========================================================= */

const Exhaust = () => {
  return (
    <group position={[0.63, 1.75, 1.05]}>
      {/* Pipe */}
      <mesh castShadow>
        <cylinderGeometry args={[0.055, 0.065, 1.15, 20]} />
        <meshStandardMaterial
          color="#303030"
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>

      {/* Exhaust cap */}
      <mesh position={[0, 0.59, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.065, 0.12, 20]} />
        <meshStandardMaterial
          color="#151515"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

/* =========================================================
   CABIN
========================================================= */

const Cabin = () => {
  return (
    <group position={[0, 1.3, -0.2]}>
      {/* Cabin pillars */}
      <mesh position={[-0.65, 0.25, 0.42]} castShadow>
        <boxGeometry args={[0.09, 1.35, 0.09]} />
        <meshStandardMaterial color={metalDark} />
      </mesh>

      <mesh position={[0.65, 0.25, 0.42]} castShadow>
        <boxGeometry args={[0.09, 1.35, 0.09]} />
        <meshStandardMaterial color={metalDark} />
      </mesh>

      <mesh position={[-0.65, 0.25, -0.68]} castShadow>
        <boxGeometry args={[0.09, 1.35, 0.09]} />
        <meshStandardMaterial color={metalDark} />
      </mesh>

      <mesh position={[0.65, 0.25, -0.68]} castShadow>
        <boxGeometry args={[0.09, 1.35, 0.09]} />
        <meshStandardMaterial color={metalDark} />
      </mesh>

      {/* Front windshield */}
      <mesh position={[0, 0.3, 0.42]}>
        <boxGeometry args={[1.22, 1.05, 0.035]} />
        <meshPhysicalMaterial
          color={glassBlue}
          transparent
          opacity={0.48}
          roughness={0.08}
          metalness={0.15}
          transmission={0.15}
        />
      </mesh>

      {/* Rear windshield */}
      <mesh position={[0, 0.3, -0.68]}>
        <boxGeometry args={[1.22, 1.05, 0.035]} />
        <meshPhysicalMaterial
          color={glassBlue}
          transparent
          opacity={0.42}
          roughness={0.08}
          metalness={0.15}
        />
      </mesh>

      {/* Left window */}
      <mesh position={[-0.65, 0.3, -0.12]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.05, 1.05, 0.035]} />
        <meshPhysicalMaterial
          color={glassBlue}
          transparent
          opacity={0.38}
          roughness={0.1}
          metalness={0.15}
        />
      </mesh>

      {/* Right window */}
      <mesh position={[0.65, 0.3, -0.12]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1.05, 1.05, 0.035]} />
        <meshPhysicalMaterial
          color={glassBlue}
          transparent
          opacity={0.38}
          roughness={0.1}
          metalness={0.15}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0.95, -0.12]} castShadow>
        <boxGeometry args={[1.48, 0.16, 1.45]} />
        <meshStandardMaterial
          color={tractorGreen}
          roughness={0.45}
          metalness={0.15}
        />
      </mesh>

      {/* Roof underside */}
      <mesh position={[0, 0.84, -0.12]}>
        <boxGeometry args={[1.35, 0.08, 1.32]} />
        <meshStandardMaterial color={tractorDarkGreen} />
      </mesh>

      {/* Rear-view mirrors */}
      <mesh position={[-0.78, 0.5, 0.12]} rotation={[0, 0, Math.PI / 8]}>
        <boxGeometry args={[0.08, 0.42, 0.05]} />
        <meshStandardMaterial color="#181818" />
      </mesh>

      <mesh position={[0.78, 0.5, 0.12]} rotation={[0, 0, -Math.PI / 8]}>
        <boxGeometry args={[0.08, 0.42, 0.05]} />
        <meshStandardMaterial color="#181818" />
      </mesh>

      {/* Driver seat */}
      <mesh position={[0, -0.05, -0.3]} castShadow>
        <boxGeometry args={[0.42, 0.15, 0.42]} />
        <meshStandardMaterial
          color="#222222"
          roughness={0.85}
        />
      </mesh>

      <mesh position={[0, 0.28, -0.48]} castShadow>
        <boxGeometry args={[0.42, 0.55, 0.12]} />
        <meshStandardMaterial
          color="#242424"
          roughness={0.85}
        />
      </mesh>
    </group>
  );
};

/* =========================================================
   ENGINE / HOOD
========================================================= */

const Engine = () => {
  return (
    <group>
      {/* Main engine hood */}
      <mesh position={[0, 0.67, 0.83]} castShadow receiveShadow>
        <boxGeometry args={[1.02, 0.62, 1.05]} />
        <meshStandardMaterial
          color={tractorGreen}
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>

      {/* Hood top */}
      <mesh position={[0, 0.99, 0.85]} castShadow>
        <boxGeometry args={[0.92, 0.12, 1.08]} />
        <meshStandardMaterial
          color={tractorGreen}
          roughness={0.38}
          metalness={0.15}
        />
      </mesh>

      {/* Front grille */}
      <mesh position={[0, 0.68, 1.39]} castShadow>
        <boxGeometry args={[0.78, 0.48, 0.06]} />
        <meshStandardMaterial
          color="#202020"
          roughness={0.7}
          metalness={0.25}
        />
      </mesh>

      {/* Grille bars */}
      {[-0.27, -0.135, 0, 0.135, 0.27].map((x) => (
        <mesh key={x} position={[x, 0.68, 1.43]}>
          <boxGeometry args={[0.035, 0.4, 0.025]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
      ))}

      {/* Side engine vents */}
      {[-1, 1].map((side) => (
        <group key={side}>
          {[-0.05, 0.08, 0.21].map((y) => (
            <mesh
              key={y}
              position={[
                side * 0.515,
                0.66 + y,
                0.87,
              ]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <boxGeometry args={[0.02, 0.42, 0.025]} />
              <meshStandardMaterial color="#153d24" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Front bumper */}
      <mesh position={[0, 0.36, 1.48]} castShadow>
        <boxGeometry args={[1.12, 0.18, 0.16]} />
        <meshStandardMaterial
          color="#292929"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      {/* Front headlights */}
      <Headlight position={[-0.34, 0.78, 1.47]} />
      <Headlight position={[0.34, 0.78, 1.47]} />
    </group>
  );
};

/* =========================================================
   FENDERS
========================================================= */

const Fender = ({
  side,
  front = false,
}: {
  side: number;
  front?: boolean;
}) => {
  return (
    <group
      position={[
        side * (front ? 0.63 : 0.7),
        front ? 0.52 : 0.57,
        front ? 0.7 : -0.55,
      ]}
    >
      <mesh castShadow>
        <boxGeometry
          args={[
            front ? 0.18 : 0.22,
            0.12,
            front ? 1.2 : 1.45,
          ]}
        />
        <meshStandardMaterial
          color={tractorGreen}
          roughness={0.42}
          metalness={0.12}
        />
      </mesh>

      {/* Fender support */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.09, 0.35, 0.1]} />
        <meshStandardMaterial color={metalDark} />
      </mesh>
    </group>
  );
};

/* =========================================================
   REAR LINKAGE
========================================================= */

const RearAttachment = () => {
  return (
    <group position={[0, 0.18, -1.32]}>
      {/* Main linkage */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.075, 1.15, 16]} />
        <meshStandardMaterial
          color="#343434"
          metalness={0.75}
          roughness={0.3}
        />
      </mesh>

      {/* Arms */}
      {[-0.42, 0.42].map((x) => (
        <mesh
          key={x}
          position={[x, -0.05, -0.08]}
          rotation={[0.2, 0, x > 0 ? -0.2 : 0.2]}
          castShadow
        >
          <boxGeometry args={[0.1, 0.55, 0.1]} />
          <meshStandardMaterial
            color="#303030"
            metalness={0.75}
            roughness={0.32}
          />
        </mesh>
      ))}

      {/* PTO */}
      <mesh position={[0, 0.04, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.16, 24]} />
        <meshStandardMaterial
          color="#777777"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
};

/* =========================================================
   MAIN TRACTOR MODEL
========================================================= */

const TractorModel = ({ scrollY }: { scrollY: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth scroll-controlled rotation
    const targetRotation = scrollY * 0.002;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      1 - Math.pow(0.001, delta)
    );
  });

  return (
    <group ref={groupRef} scale={1.15}>
      {/* Main chassis */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.3, 2.15]} />
        <meshStandardMaterial
          color="#273229"
          roughness={0.7}
          metalness={0.25}
        />
      </mesh>

      {/* Lower body */}
      <mesh position={[0, 0.63, -0.2]} castShadow>
        <boxGeometry args={[1.35, 0.4, 1.7]} />
        <meshStandardMaterial
          color={tractorDarkGreen}
          roughness={0.5}
          metalness={0.12}
        />
      </mesh>

      {/* Engine */}
      <Engine />

      {/* Cabin */}
      <Cabin />

      {/* Exhaust */}
      <Exhaust />

      {/* Front fenders */}
      <Fender side={-1} front />
      <Fender side={1} front />

      {/* Rear fenders */}
      <Fender side={-1} />
      <Fender side={1} />

      {/* Front wheels */}
      <Wheel
        position={[-0.72, 0.42, 0.75]}
        radius={0.55}
        width={0.28}
        isFront
      />

      <Wheel
        position={[0.72, 0.42, 0.75]}
        radius={0.55}
        width={0.28}
        isFront
      />

      {/* Rear wheels */}
      <Wheel
        position={[-0.78, 0.55, -0.62]}
        radius={0.78}
        width={0.38}
      />

      <Wheel
        position={[0.78, 0.55, -0.62]}
        radius={0.78}
        width={0.38}
      />

      {/* Steering wheel */}
      <group position={[0.25, 1.12, 0.1]} rotation={[Math.PI / 2.8, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.2, 0.035, 12, 32]} />
          <meshStandardMaterial
            color="#171717"
            roughness={0.45}
            metalness={0.45}
          />
        </mesh>

        <mesh>
          <cylinderGeometry args={[0.035, 0.035, 0.28, 12]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>

      {/* Steering column */}
      <mesh
        position={[0.25, 0.92, 0.1]}
        rotation={[0.15, 0, 0]}
      >
        <cylinderGeometry args={[0.035, 0.035, 0.42, 12]} />
        <meshStandardMaterial color="#292929" />
      </mesh>

      {/* Rear attachment */}
      <RearAttachment />

      {/* Small rear lights */}
      <mesh position={[-0.52, 0.9, -1.04]}>
        <boxGeometry args={[0.18, 0.15, 0.06]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef2222"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh position={[0.52, 0.9, -1.04]}>
        <boxGeometry args={[0.18, 0.15, 0.06]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#ef2222"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
};

/* =========================================================
   LIGHTING
========================================================= */

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[5, 8, 6]}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      <directionalLight
        position={[-6, 4, -5]}
        intensity={1.4}
      />

      <pointLight
        position={[0, 3, 4]}
        intensity={1.5}
        distance={10}
      />
    </>
  );
};

/* =========================================================
   TRACTOR CANVAS
========================================================= */

export default function Tractor({ scrollY }: TractorProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      camera={{
        position: [4.5, 2.8, 5.5],
        fov: 42,
      }}
    >
      <PerspectiveCamera
        makeDefault
        position={[4.5, 2.8, 5.5]}
        fov={42}
      />

      <Lights />

      {/* Realistic environment reflections */}
      <Environment preset="city" />

      <TractorModel scrollY={scrollY} />

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -0.5, 0]}
        opacity={0.55}
        scale={7}
        blur={2.5}
        far={4}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}