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
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

const ThreadScene = dynamic(
  () => import("./ThreadScene").then((mod) => mod.ThreadScene),
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
      className="absolute inset-0 opacity-25"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(245,241,232,0.35) 0 1px, transparent 1px 72px), repeating-linear-gradient(0deg, rgba(194,161,95,0.22) 0 1px, transparent 1px 128px)",
        maskImage:
          "radial-gradient(ellipse 80% 65% at 50% 45%, black 30%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 65% at 50% 45%, black 30%, transparent 78%)",
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
          className="font-serif text-xl text-champagne tracking-[0.08em]"
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <h2 className="mt-3 font-serif text-4xl md:text-6xl leading-tight text-background">
          {chapter.title}
        </h2>
        <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-background/70">
          {chapter.text}
        </p>
      </motion.div>
    </li>
  );
}

/**
 * The chaos-to-clarity opening act: a tall pinned canvas where luminous
 * threads weave from disorder into architecture while five numbered
 * chapters pass by. The screen itself performs the brand promise — it
 * opens in deep ink and resolves into the site's light ivory.
 *
 * Reduced motion: the pinned choreography is skipped entirely; the same
 * content renders as a static dark hero followed by a plain chapter list.
 */
function fadeOut(v: number, from: number, to: number) {
  if (v <= from) return 1;
  if (v >= to) return 0;
  return 1 - (v - from) / (to - from);
}

export function ChaosHeroClient({ content }: { content: ChaosHeroContent }) {
  const outerRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const ivoryRef = useRef<HTMLDivElement>(null);
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
      const rise = value < 0.04 ? 0.65 + (value / 0.04) * 0.35 : 1;
      sceneRef.current.style.opacity = String(
        value > 0.9 ? 1 - ((value - 0.9) / 0.1) * 0.65 : rise,
      );
    }
    if (hintRef.current) {
      hintRef.current.style.opacity = String(fadeOut(value, 0.02, 0.09));
    }
    if (ivoryRef.current) {
      ivoryRef.current.style.opacity = String(1 - fadeOut(value, 0.92, 1));
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
      <section
        aria-labelledby="hero-heading"
        data-header-dark
        className="bg-ink text-background"
      >
        <Container className="flex min-h-[80vh] flex-col justify-center py-24">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-champagne">
            {content.tagline}
          </p>
          <h1
            id="hero-heading"
            className="mt-6 max-w-3xl font-serif text-5xl md:text-7xl leading-[1.03]"
          >
            {content.headline}
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-background/70">
            {content.supporting}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <HeroButtons content={content} />
          </div>
          <p className="mt-10 text-sm text-background/50">{content.microText}</p>
        </Container>
        <Container className="pb-24">
          <ol className="space-y-14">
            {content.chapters.map((chapter, index) => (
              <li key={chapter.title}>
                <p aria-hidden="true" className="font-serif text-lg text-champagne">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-serif text-3xl md:text-4xl">{chapter.title}</h2>
                <p className="mt-3 max-w-xl leading-relaxed text-background/70">
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
      data-header-dark
      className="relative bg-ink"
      style={{ height: "520vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Ambient depth: a faint warm glow low in the frame */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 78%, rgba(194,161,95,0.10), transparent 65%), radial-gradient(ellipse 70% 50% at 50% 20%, rgba(245,241,232,0.05), transparent 70%)",
          }}
        />

        {canRender3d ? (
          <div ref={sceneRef} className="absolute inset-0" style={{ opacity: 0.65 }}>
            <Suspense fallback={null}>
              <ThreadScene progress={progressRef} reducedMotion={false} />
            </Suspense>
          </div>
        ) : (
          <LatticeFallback />
        )}

        <Container className="relative z-10 h-full">
          {/* Act 0 — the entrance statement */}
          <motion.div
            style={{ opacity: introOpacity, y: introY, visibility: introVisibility }}
            className="flex h-full flex-col justify-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-champagne"
            >
              {content.tagline}
            </motion.p>
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-3xl font-serif text-5xl md:text-7xl leading-[1.03] text-background"
            >
              {content.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-background/70"
            >
              {content.supporting}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <HeroButtons content={content} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="mt-10 text-sm text-background/50"
            >
              {content.microText}
            </motion.p>
          </motion.div>

          {/* Chapters 01–05 — pinned narrative */}
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
            <p className="text-xs tracking-[0.25em] uppercase text-background/50">
              {content.scrollHint}
            </p>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="mt-3 block text-champagne"
            >
              ↓
            </motion.span>
          </div>
        </Container>

        {/* The resolution: ink dissolves into the site's ivory */}
        <div
          ref={ivoryRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 bg-background"
        />
      </div>
    </section>
  );
}

function HeroButtons({ content }: { content: ChaosHeroContent }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm md:text-base font-medium font-sans transition-colors duration-200 min-h-11";
  return (
    <>
      <Link
        href="/contact"
        className={`${base} bg-background text-ink hover:bg-champagne hover:text-ink`}
      >
        {content.primaryCta}
      </Link>
      <Link
        href="/services"
        className={`${base} border border-background/30 text-background hover:border-champagne hover:text-champagne`}
      >
        {content.secondaryCta}
      </Link>
    </>
  );
}
