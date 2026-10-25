"use client";

import { useEffect } from "react";

/**
 * Pointer effects from the original site: magnetic buttons and the tilt +
 * spotlight on cards. One delegated listener, no per-element wiring, so it
 * also works for cards that appear later (e.g. after filtering).
 * Disabled for touch devices and when reduced motion is requested.
 */
export function MotionEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverless = window.matchMedia("(hover: none)");
    if (reduced.matches || hoverless.matches) return;

    let magnet: HTMLElement | null = null;
    let tilted: HTMLElement | null = null;

    const resetMagnet = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };
    const resetTilt = () => {
      if (tilted) tilted.style.transform = "";
      tilted = null;
    };

    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target || !("closest" in target)) return;

      const magnetic = target.closest<HTMLElement>("[data-magnetic]");
      if (magnetic !== magnet) resetMagnet();
      if (magnetic) {
        magnet = magnetic;
        const r = magnetic.getBoundingClientRect();
        const x = (event.clientX - (r.left + r.width / 2)) * 0.3;
        const y = (event.clientY - (r.top + r.height / 2)) * 0.3;
        magnetic.style.transform = `translate(${x}px, ${y}px)`;
      }

      const card = target.closest<HTMLElement>("[data-tilt]");
      if (card !== tilted) resetTilt();
      if (card) {
        tilted = card;
        const r = card.getBoundingClientRect();
        const px = (event.clientX - r.left) / r.width;
        const py = (event.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        card.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 5}deg) rotateX(${(0.5 - py) * 5}deg)`;
      }
    };

    const onLeaveWindow = () => {
      resetMagnet();
      resetTilt();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);

  return null;
}
