"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 5;
const ORBIT_RADIUS = 1.6;

function SystemNodes({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions = useMemo(() => {
    return Array.from({ length: NODE_COUNT }, (_, index) => {
      const angle = (index / NODE_COUNT) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * ORBIT_RADIUS,
        Math.sin(angle) * ORBIT_RADIUS * 0.5,
        Math.sin(angle) * 0.3,
      );
    });
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    // Slow rotation + gentle upward drift, looping back down so it never scrolls away.
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.position.y = (groupRef.current.position.y + delta * 0.04) % 0.3;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#6f7a5a"
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>

      {nodePositions.map((position, index) => (
        <group key={index}>
          <mesh position={position}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial color="#5a6349" />
          </mesh>
          <Line start={new THREE.Vector3(0, 0, 0)} end={position} />
        </group>
      ))}
    </group>
  );
}

function Line({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const points = useMemo(() => [start, end], [start, end]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#8f9a7a", transparent: true, opacity: 0.5 }))} />
  );
}

export function SystemScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <pointLight position={[3, 3, 3]} intensity={0.6} />
      <SystemNodes reducedMotion={reducedMotion} />
    </Canvas>
  );
}
