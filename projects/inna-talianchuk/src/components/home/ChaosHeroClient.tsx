"use client";

import { Suspense, useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

const ClarityScene = dynamic(
  () => import("./ClarityScene").then((mod) => mod.ClarityScene),
  { ssr: false },
);

export type ChaosChapter = { title: string; text: string };

export type ChaosHeroContent = {
  tagline: string;
  headline: string;
  supporting: string;
  primaryCta: string;
  secondaryCta: string;
  microText: string;
  scrollHint: string;
  chapters: ChaosChapter[];
};

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
  return false;
}

/** CSS-only stand-in for the 3D lattice on small screens. */
function LatticeFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(42,48,44,0.22) 0 1px, transparent 1px 72px), repeating-linear-gradient(0deg, rgba(168,130,63,0.20) 0 1px, transparent 1px 128px)",
        maskImage:
          "radial-gradient(ellipse 75% 65% at 62% 45%, black 25%, transparent 76%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 65% at 62% 45%, black 25%, transparent 76%)",
      }}
    />
  );
}

function Chapter({
  index,
  chapter,
  progress,
  center,
}: {
  index: number;
  chapter: ChaosChapter;
  progress: MotionValue<number>;
  center: number;
}) {
  const opacity = useTransform(
    progress,
    [center - 0.075, center - 0.035, center + 0.035, center + 0.075],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [center - 0.075, center, center + 0.075],
    [32, 0, -32],
  );

  return (
    <li className="absolute inset-x-0 top-1/2 -translate-y-1/2">
      <motion.div style={{ opacity, y }}>
        <p
          aria-hidden="true"
          className="font-serif text-xl text-champagne-deep tracking-[0.08em]"
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <h2 className="mt-3 font-serif text-4xl md:text-6xl leading-tight text-text">
          {chapter.title}
        </h2>
        <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-text-secondary">
          {chapter.text}
        </p>
      </motion.div>
    </li>
  );
}

function fadeOut(v: number, from: number, to: number) {
  if (v <= from) return 1;
  if (v >= to) return 0;
  return 1 - (v - from) / (to - from);
}

/**
 * The chaos-to-clarity opening act in its premium light form, composed
 * after the approved video reference: debris drifting on the left, an
 * ordered lattice with warm glowing nodes on the right, and dominant
 * typography in front. Scroll builds the structure and pulls the
 * disorder into it while five numbered chapters pass by.
 *
 * Reduced motion: the pinned choreography is skipped entirely; the same
 * content renders as a static hero followed by a plain chapter list.
 */
export function ChaosHeroClient({ content }: { content: ChaosHeroContent }) {
  const outerRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const canRender3d = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  // Simple one-property fades are written imperatively: Motion promotes
  // single-opacity scroll bindings to native ScrollTimeline animations,
  // whose measured range disagrees with this pinned section's offsets.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progressRef.current = value;
    if (sceneRef.current) {
      sceneRef.current.style.opacity = String(
        value < 0.04 ? 0.7 + (value / 0.04) * 0.3 : 1,
      );
    }
    if (hintRef.current) {
      hintRef.current.style.opacity = String(fadeOut(value, 0.02, 0.09));
    }
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.17], [1, 1, 0]);
  const introVisibility = useTransform(introOpacity, (v) =>
    v === 0 ? ("hidden" as const) : ("visible" as const),
  );
  const introY = useTransform(scrollYProgress, [0, 0.17], [0, -48]);

  const chapterCenters = [0.27, 0.42, 0.57, 0.72, 0.87];

  if (reducedMotion) {
    return (
      <section aria-labelledby="hero-heading" className="bg-background text-text">
        <Container className="flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-champagne-deep">
            {content.tagline}
          </p>
          <h1
            id="hero-heading"
            className="mt-6 max-w-4xl font-serif text-5xl md:text-8xl leading-[1.02]"
          >
            {content.headline}
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-text-secondary">
            {content.supporting}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <PrimaryButton href="/contact">{content.primaryCta}</PrimaryButton>
            <SecondaryButton href="/services">{content.secondaryCta}</SecondaryButton>
          </div>
          <p className="mt-10 text-sm text-text-secondary/80">{content.microText}</p>
        </Container>
        <Container className="pb-24">
          <ol className="space-y-14">
            {content.chapters.map((chapter, index) => (
              <li key={chapter.title}>
                <p aria-hidden="true" className="font-serif text-lg text-champagne-deep">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-serif text-3xl md:text-4xl">{chapter.title}</h2>
                <p className="mt-3 max-w-xl leading-relaxed text-text-secondary">
                  {chapter.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={outerRef}
      aria-labelledby="hero-heading"
      className="relative bg-background"
      style={{ height: "520vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Porcelain air: soft warm light from above, faint gold from the right */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 60% at 30% 15%, rgba(255,255,255,0.75), transparent 60%), radial-gradient(ellipse 70% 65% at 78% 55%, rgba(194,161,95,0.14), transparent 68%), linear-gradient(180deg, #f7f4ec 0%, #f5f1e8 55%, #efe9dc 100%)",
          }}
        />

        {canRender3d ? (
          <div ref={sceneRef} className="absolute inset-0" style={{ opacity: 0.7 }}>
            <Suspense fallback={null}>
              <ClarityScene progress={progressRef} reducedMotion={false} />
            </Suspense>
          </div>
        ) : (
          <LatticeFallback />
        )}

        <Container className="relative z-10 h-full">
          {/* Act 0 — the entrance statement, dominant like the reference */}
          <motion.div
            style={{ opacity: introOpacity, y: introY, visibility: introVisibility }}
            className="flex h-full flex-col items-center justify-center text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-champagne-deep"
            >
              {content.tagline}
            </motion.p>
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-4xl font-serif text-5xl md:text-8xl leading-[1.02] text-text"
            >
              {content.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-text-secondary"
            >
              {content.supporting}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <PrimaryButton href="/contact">{content.primaryCta}</PrimaryButton>
              <SecondaryButton href="/services">{content.secondaryCta}</SecondaryButton>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="mt-10 text-sm text-text-secondary/80"
            >
              {content.microText}
            </motion.p>
          </motion.div>

          {/* Chapters 01–05 — pinned narrative, set left of the lattice */}
          <ol aria-label={content.tagline} className="pointer-events-none">
            {content.chapters.map((chapter, index) => (
              <Chapter
                key={chapter.title}
                index={index}
                chapter={chapter}
                progress={scrollYProgress}
                center={chapterCenters[index]}
              />
            ))}
          </ol>

          {/* Scroll hint */}
          <div
            ref={hintRef}
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-text-secondary/70">
              {content.scrollHint}
            </p>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-3 block text-champagne-deep"
            >
              ↓
            </motion.span>
          </div>
        </Container>
      </div>
    </section>
  );
}
