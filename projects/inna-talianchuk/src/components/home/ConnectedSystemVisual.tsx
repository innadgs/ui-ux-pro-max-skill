"use client";

import { Suspense, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { SystemVisualFallback } from "./SystemVisualFallback";

const SystemScene = dynamic(
  () => import("./SystemScene").then((mod) => mod.SystemScene),
  { ssr: false, loading: () => <SystemVisualFallback /> },
);

const MEDIA_QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(MEDIA_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(MEDIA_QUERY).matches;
}

function getServerSnapshot() {
  // Keep the 3D scene off during SSR; the static SVG fallback renders
  // first and is replaced once the client confirms viewport width.
  return false;
}

export function ConnectedSystemVisual() {
  const reducedMotion = useReducedMotion();
  const canRender3d = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="aspect-square w-full max-w-sm mx-auto">
      {canRender3d ? (
        <Suspense fallback={<SystemVisualFallback />}>
          <SystemScene reducedMotion={Boolean(reducedMotion)} />
        </Suspense>
      ) : (
        <SystemVisualFallback />
      )}
    </div>
  );
}
