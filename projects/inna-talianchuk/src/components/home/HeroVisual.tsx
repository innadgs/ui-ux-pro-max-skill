"use client";

import { useEffect, useRef } from "react";
import { useMotionValue } from "motion/react";
import {
  Sparkles,
  BarChart3,
  Users,
  Workflow,
  ListChecks,
  Megaphone,
  Compass,
} from "lucide-react";
import { AccessibleImage } from "@/components/ui/AccessibleImage";
import { GlassPanel } from "./GlassPanel";

type PanelLabels = {
  ai: string;
  analytics: string;
  crm: string;
  automation: string;
  projectManagement: string;
  marketing: string;
  businessStrategy: string;
};

export function HeroVisual({
  panels,
  portraitAlt,
}: {
  panels: PanelLabels;
  portraitAlt: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    if (!canHover) return;

    const container = containerRef.current;
    if (!container) return;

    function handlePointerMove(event: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(relativeX * 12);
      pointerY.set(relativeY * 12);
    }

    function handlePointerLeave() {
      pointerX.set(0);
      pointerY.set(0);
    }

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [pointerX, pointerY]);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-md">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2rem] border border-card-border shadow-soft">
        <AccessibleImage
          src="/images/portrait-placeholder.svg"
          alt={portraitAlt}
          fill
          priority
          sizes="(min-width: 1024px) 420px, 320px"
          className="object-cover"
        />
      </div>

      {/* Desktop orbit of glass panels — hidden below lg to avoid crowding/overlap on small screens */}
      <div className="hidden lg:block">
        <GlassPanel
          label={panels.ai}
          icon={Sparkles}
          seed={0}
          pointerX={pointerX}
          pointerY={pointerY}
          parallaxStrength={0.6}
          className="-left-16 top-6"
        />
        <GlassPanel
          label={panels.analytics}
          icon={BarChart3}
          seed={1}
          pointerX={pointerX}
          pointerY={pointerY}
          parallaxStrength={0.8}
          className="-left-24 top-1/3"
        />
        <GlassPanel
          label={panels.crm}
          icon={Users}
          seed={2}
          pointerX={pointerX}
          pointerY={pointerY}
          parallaxStrength={0.5}
          className="-left-12 bottom-24"
        />
        <GlassPanel
          label={panels.automation}
          icon={Workflow}
          seed={3}
          pointerX={pointerX}
          pointerY={pointerY}
          parallaxStrength={0.7}
          className="-left-6 -bottom-6"
        />
        <GlassPanel
          label={panels.projectManagement}
          icon={ListChecks}
          seed={4}
          pointerX={pointerX}
          pointerY={pointerY}
          parallaxStrength={0.6}
          className="-right-20 top-10"
        />
        <GlassPanel
          label={panels.marketing}
          icon={Megaphone}
          seed={5}
          pointerX={pointerX}
          pointerY={pointerY}
          parallaxStrength={0.8}
          className="-right-16 top-1/2"
        />
        <GlassPanel
          label={panels.businessStrategy}
          icon={Compass}
          seed={6}
          pointerX={pointerX}
          pointerY={pointerY}
          parallaxStrength={0.5}
          className="-right-10 -bottom-4"
        />
      </div>

      {/* Simplified mobile/tablet treatment: compact static row, no absolute overlap risk */}
      <div className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden">
        {[
          { label: panels.ai, icon: Sparkles },
          { label: panels.automation, icon: Workflow },
          { label: panels.marketing, icon: Megaphone },
          { label: panels.analytics, icon: BarChart3 },
        ].map(({ label, icon: Icon }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-glass-light px-3 py-1.5 text-xs font-medium text-text backdrop-blur-md"
          >
            <Icon aria-hidden="true" focusable="false" size={14} className="text-accent-text" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
