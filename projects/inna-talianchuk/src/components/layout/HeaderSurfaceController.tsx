"use client";

import { useEffect, useRef } from "react";

/**
 * Flips the sticky header between its light and dark surface depending on
 * what it currently overlaps: while any `[data-header-dark]` region sits
 * under the header, `data-surface="dark"` is set on the <header>, which
 * re-scopes the semantic color variables (see globals.css).
 */
export function HeaderSurfaceController() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = anchorRef.current?.closest("header");
    if (!header) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const headerHeight = header.getBoundingClientRect().height;
      const darkRegions = document.querySelectorAll("[data-header-dark]");
      let dark = false;
      darkRegions.forEach((region) => {
        const rect = region.getBoundingClientRect();
        if (rect.top < headerHeight && rect.bottom > 0) dark = true;
      });
      if (dark) {
        header.setAttribute("data-surface", "dark");
      } else {
        header.removeAttribute("data-surface");
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={anchorRef} hidden />;
}
