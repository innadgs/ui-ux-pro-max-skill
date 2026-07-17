"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The light-palette chaos-to-clarity act, composed after the approved
 * video reference: scattered debris drifts on the left while an ordered
 * three-dimensional lattice with glowing nodes stands on the right.
 * Scroll progress builds the lattice line by line and pulls the debris
 * across into its nodes — disorder is absorbed into structure.
 *
 * Palette is the premium light inversion of the reference: porcelain
 * air, graphite/olive lines, champagne-bronze nodes. No additive
 * blending — glow is simulated with warm colors and soft size falloff
 * so it reads on a light background.
 */

const GRAPHITE = new THREE.Color("#2a302c");
const OLIVE = new THREE.Color("#6f7a5a");
const LINE_COLOR = new THREE.Color("#565f50");
const CHAMPAGNE = new THREE.Color("#a8823f");

const SHARD_COUNT = 240;

// Lattice extents (right half of the frame)
const CELL = 0.95;
const X_STEPS = 6;
const Y_STEPS = 5;
const Z_STEPS = 3;
const X0 = 0.4;
const Y0 = -((Y_STEPS - 1) * CELL) / 2;
const Z0 = -1.3;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

type Segment = { a: THREE.Vector3; b: THREE.Vector3; stagger: number };

function buildLattice() {
  const nodes: THREE.Vector3[] = [];
  const segments: Segment[] = [];

  const at = (i: number, j: number, k: number) =>
    new THREE.Vector3(X0 + i * CELL, Y0 + j * CELL, Z0 + k * CELL);

  for (let i = 0; i < X_STEPS; i += 1) {
    for (let j = 0; j < Y_STEPS; j += 1) {
      for (let k = 0; k < Z_STEPS; k += 1) {
        nodes.push(at(i, j, k));
        const stagger = (i / X_STEPS + j / Y_STEPS + k / Z_STEPS) / 3;
        if (i + 1 < X_STEPS) segments.push({ a: at(i, j, k), b: at(i + 1, j, k), stagger });
        if (j + 1 < Y_STEPS) segments.push({ a: at(i, j, k), b: at(i, j + 1, k), stagger });
        if (k + 1 < Z_STEPS) segments.push({ a: at(i, j, k), b: at(i, j, k + 1), stagger });
      }
    }
  }

  return { nodes, segments };
}

function ClarityField({
  progress,
  reducedMotion,
}: {
  progress: { current: number };
  reducedMotion: boolean;
}) {
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);
  const shardGeometryRef = useRef<THREE.BufferGeometry>(null);
  const nodeMaterialRef = useRef<THREE.PointsMaterial>(null);

  const { nodes, segments } = useMemo(() => buildLattice(), []);

  const shards = useMemo(() => {
    const rand = mulberry32(20260717);
    return Array.from({ length: SHARD_COUNT }, () => {
      const origin = new THREE.Vector3(
        -5.2 + rand() * 4.6,
        -2.4 + rand() * 4.8,
        -1.6 + rand() * 2.0,
      );
      const target = nodes[Math.floor(rand() * nodes.length)];
      return {
        origin,
        target,
        phase: rand() * Math.PI * 2,
        speed: 0.25 + rand() * 0.5,
        stagger: rand() * 0.35,
        gold: rand() < 0.3,
      };
    });
  }, [nodes]);

  const linePositions = useMemo(
    () => new Float32Array(segments.length * 2 * 3),
    [segments],
  );

  const nodePositions = useMemo(() => {
    const array = new Float32Array(nodes.length * 3);
    nodes.forEach((node, index) => {
      array[index * 3] = node.x;
      array[index * 3 + 1] = node.y;
      array[index * 3 + 2] = node.z;
    });
    return array;
  }, [nodes]);

  const { shardPositions, shardColors } = useMemo(() => {
    const positions = new Float32Array(SHARD_COUNT * 3);
    const colors = new Float32Array(SHARD_COUNT * 3);
    shards.forEach((shard, index) => {
      positions[index * 3] = shard.origin.x;
      positions[index * 3 + 1] = shard.origin.y;
      positions[index * 3 + 2] = shard.origin.z;
      const color = shard.gold ? OLIVE : GRAPHITE;
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    });
    return { shardPositions: positions, shardColors: colors };
  }, [shards]);

  const scratchColor = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock, camera }) => {
    const p = reducedMotion ? 1 : progress.current;
    const time = reducedMotion ? 0 : clock.elapsedTime;

    // Lattice lines grow out of their centers, staggered across the grid.
    const lineGeometry = lineGeometryRef.current;
    if (lineGeometry) {
      const attr = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
      const array = attr.array as Float32Array;
      segments.forEach((segment, index) => {
        // A third of the lattice already stands at rest; scroll completes it.
        const local = smoothstep((0.3 + p * 1.15 - segment.stagger) / 0.55);
        const half = local / 2;
        const cx = (segment.a.x + segment.b.x) / 2;
        const cy = (segment.a.y + segment.b.y) / 2;
        const cz = (segment.a.z + segment.b.z) / 2;
        const v = index * 6;
        array[v] = cx + (segment.a.x - cx) * 2 * half;
        array[v + 1] = cy + (segment.a.y - cy) * 2 * half;
        array[v + 2] = cz + (segment.a.z - cz) * 2 * half;
        array[v + 3] = cx + (segment.b.x - cx) * 2 * half;
        array[v + 4] = cy + (segment.b.y - cy) * 2 * half;
        array[v + 5] = cz + (segment.b.z - cz) * 2 * half;
      });
      attr.needsUpdate = true;
    }

    // Debris drifts in the left air, then is drawn into the lattice nodes.
    const shardGeometry = shardGeometryRef.current;
    if (shardGeometry) {
      const posAttr = shardGeometry.getAttribute("position") as THREE.BufferAttribute;
      const colAttr = shardGeometry.getAttribute("color") as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      const colors = colAttr.array as Float32Array;
      shards.forEach((shard, index) => {
        const local = smoothstep((p * 1.25 - 0.12 - shard.stagger) / 0.7);
        const drift = (1 - local) * 0.3;
        const wobbleX = Math.sin(time * shard.speed + shard.phase) * drift;
        const wobbleY = Math.cos(time * shard.speed * 0.8 + shard.phase) * drift;
        const v = index * 3;
        positions[v] = shard.origin.x + wobbleX + (shard.target.x - shard.origin.x) * local;
        positions[v + 1] = shard.origin.y + wobbleY + (shard.target.y - shard.origin.y) * local;
        positions[v + 2] = shard.origin.z + (shard.target.z - shard.origin.z) * local;
        scratchColor.copy(shard.gold ? OLIVE : GRAPHITE).lerp(CHAMPAGNE, local);
        colors[v] = scratchColor.r;
        colors[v + 1] = scratchColor.g;
        colors[v + 2] = scratchColor.b;
      });
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    // Nodes brighten as the structure completes.
    const nodeMaterial = nodeMaterialRef.current;
    if (nodeMaterial) {
      nodeMaterial.opacity = 0.45 + p * 0.5;
    }

    // A slow, calm rise — the same upward movement as the reference.
    camera.position.y = -0.35 + p * 0.9;
    camera.position.x = p * 0.35;
    camera.lookAt(0.2, p * 0.15, -0.4);
  });

  return (
    <group>
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={LINE_COLOR} transparent opacity={0.42} />
      </lineSegments>

      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={nodeMaterialRef}
          color={CHAMPAGNE}
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.45}
        />
      </points>

      <points frustumCulled={false}>
        <bufferGeometry ref={shardGeometryRef}>
          <bufferAttribute attach="attributes-position" args={[shardPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[shardColors, 3]} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.055} sizeAttenuation transparent opacity={0.8} />
      </points>
    </group>
  );
}

export function ClarityScene({
  progress,
  reducedMotion,
}: {
  progress: { current: number };
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, -0.35, 7.4], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog(new THREE.Color("#f5f1e8"), 6.5, 13.5);
      }}
    >
      <ClarityField progress={progress} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
