"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * "The Thread of Order" — the homepage's chaos-to-clarity act.
 *
 * A field of thin luminous threads drifts in slow disorder; driven by the
 * page's scroll progress (0 → 1) the threads weave themselves into an
 * ordered architectural lattice while the camera rises. Deliberately built
 * from LINES, not scattered particles: the same "order out of chaos"
 * narrative, but reading as weaving/architecture rather than dust.
 */

const THREAD_COUNT = 110;
const POINTS_PER_THREAD = 10;
const SEGMENTS_PER_THREAD = POINTS_PER_THREAD - 1;

const INK = new THREE.Color("#0f1311");
const IVORY = new THREE.Color("#f5f1e8");
const CHAMPAGNE = new THREE.Color("#c2a15f");

type ThreadData = {
  chaos: Float32Array; // xyz per point
  order: Float32Array; // xyz per point
  phase: number; // per-thread drift phase
  stagger: number; // per-thread progress offset (0..1)
};

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

function buildThreads(): ThreadData[] {
  const rand = mulberry32(20260716);
  const threads: ThreadData[] = [];

  const verticalCount = Math.round(THREAD_COUNT * 0.72);
  const columns = verticalCount;
  const depthRows = [-1.3, -0.5, 0.3];
  const beamLevels = [-2.2, -1.1, 0, 1.1, 2.2];

  for (let i = 0; i < THREAD_COUNT; i += 1) {
    const chaos = new Float32Array(POINTS_PER_THREAD * 3);
    const order = new Float32Array(POINTS_PER_THREAD * 3);

    // Chaos: a smooth random walk starting from a scattered anchor.
    let x = (rand() - 0.5) * 10;
    let y = (rand() - 0.5) * 5.5;
    let z = (rand() - 0.5) * 4 - 0.5;
    let dx = (rand() - 0.5) * 0.9;
    let dy = (rand() - 0.5) * 0.9;
    let dz = (rand() - 0.5) * 0.5;
    for (let p = 0; p < POINTS_PER_THREAD; p += 1) {
      chaos[p * 3] = x;
      chaos[p * 3 + 1] = y;
      chaos[p * 3 + 2] = z;
      dx += (rand() - 0.5) * 0.5;
      dy += (rand() - 0.5) * 0.5;
      dz += (rand() - 0.5) * 0.3;
      x += dx * 0.35;
      y += dy * 0.35;
      z += dz * 0.35;
    }

    // Order: verticals form a colonnade grid, the rest become beams.
    if (i < verticalCount) {
      const col = i;
      const ox = -4.2 + (8.4 * col) / Math.max(1, columns - 1);
      const oz = depthRows[i % depthRows.length];
      for (let p = 0; p < POINTS_PER_THREAD; p += 1) {
        order[p * 3] = ox;
        order[p * 3 + 1] = -2.4 + (4.8 * p) / SEGMENTS_PER_THREAD;
        order[p * 3 + 2] = oz;
      }
    } else {
      const beamIndex = i - verticalCount;
      const oy = beamLevels[beamIndex % beamLevels.length];
      const oz = depthRows[beamIndex % depthRows.length];
      for (let p = 0; p < POINTS_PER_THREAD; p += 1) {
        order[p * 3] = -4.2 + (8.4 * p) / SEGMENTS_PER_THREAD;
        order[p * 3 + 1] = oy;
        order[p * 3 + 2] = oz;
      }
    }

    threads.push({
      chaos,
      order,
      phase: rand() * Math.PI * 2,
      stagger: rand() * 0.22,
    });
  }

  return threads;
}

function smoothstep(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped * clamped * (3 - 2 * clamped);
}

function ThreadField({
  progress,
  reducedMotion,
}: {
  progress: { current: number };
  reducedMotion: boolean;
}) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const threads = useMemo(() => buildThreads(), []);

  const { positions, colors } = useMemo(() => {
    const vertexCount = THREAD_COUNT * SEGMENTS_PER_THREAD * 2;
    const positionArray = new Float32Array(vertexCount * 3);
    const colorArray = new Float32Array(vertexCount * 3);

    let v = 0;
    for (let i = 0; i < THREAD_COUNT; i += 1) {
      const color = i % 6 === 0 ? CHAMPAGNE : IVORY;
      for (let s = 0; s < SEGMENTS_PER_THREAD; s += 1) {
        for (let k = 0; k < 2; k += 1) {
          colorArray[v * 3] = color.r;
          colorArray[v * 3 + 1] = color.g;
          colorArray[v * 3 + 2] = color.b;
          v += 1;
        }
      }
    }

    return { positions: positionArray, colors: colorArray };
  }, []);

  useFrame(({ clock, camera }) => {
    const geometry = geometryRef.current;
    if (!geometry) return;

    const p = reducedMotion ? 1 : progress.current;
    const time = reducedMotion ? 0 : clock.elapsedTime;
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = attr.array as Float32Array;

    let v = 0;
    for (let i = 0; i < THREAD_COUNT; i += 1) {
      const thread = threads[i];
      // Each thread starts its weave slightly later than the previous ones.
      const local = smoothstep((p * 1.3 - thread.stagger) / 0.9);
      const drift = (1 - local) * 0.35;

      for (let s = 0; s < SEGMENTS_PER_THREAD; s += 1) {
        for (let k = 0; k < 2; k += 1) {
          const pointIndex = s + k;
          const cx = thread.chaos[pointIndex * 3];
          const cy = thread.chaos[pointIndex * 3 + 1];
          const cz = thread.chaos[pointIndex * 3 + 2];
          const wobble =
            Math.sin(time * 0.4 + thread.phase + pointIndex * 0.7) * drift;

          array[v * 3] =
            cx + wobble + (thread.order[pointIndex * 3] - cx) * local;
          array[v * 3 + 1] =
            cy +
            wobble * 0.6 +
            (thread.order[pointIndex * 3 + 1] - cy) * local;
          array[v * 3 + 2] =
            cz + (thread.order[pointIndex * 3 + 2] - cz) * local;
          v += 1;
        }
      }
    }

    attr.needsUpdate = true;

    // The camera rises as order forms — upward movement, calm and slow.
    camera.position.y = -0.7 + p * 1.5;
    camera.lookAt(0, p * 0.25, 0);
  });

  return (
    <lineSegments frustumCulled={false}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

export function ThreadScene({
  progress,
  reducedMotion,
}: {
  progress: { current: number };
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, -0.7, 7.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog(INK, 5, 13);
      }}
    >
      <ThreadField progress={progress} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
