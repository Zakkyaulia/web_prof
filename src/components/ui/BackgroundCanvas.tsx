"use client";

import { useEffect, useRef } from "react";

const PALETTE: [number, number, number][] = [
  [139, 108, 255],
  [198, 242, 78],
  [255, 106, 61],
  [52, 227, 207],
  [139, 108, 255],
];

interface Blob {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  depth: number;
  c: [number, number, number];
}

/** Interactive colour-blob background (ported from the original site). */
export function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let frame = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const blobs: Blob[] = [];

    function resize() {
      if (!canvas) return;
      // The blobs are soft gradients, so half resolution looks identical
      // and costs about a quarter of the fill work per frame.
      dpr = 0.5;
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
    resize();

    for (const colour of PALETTE) {
      blobs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.min(w, h) * (0.24 + Math.random() * 0.16),
        vx: (Math.random() - 0.5) * 0.16 * dpr,
        vy: (Math.random() - 0.5) * 0.16 * dpr,
        depth: 0.4 + Math.random() * 0.8,
        c: colour,
      });
    }

    function paint() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const ox = (mouse.x - 0.5) * 60 * dpr;
      const oy = (mouse.y - 0.5) * 60 * dpr;
      for (const b of blobs) {
        const cx = b.x + ox * b.depth;
        const cy = b.y + oy * b.depth;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.34)`);
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function tick() {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        if (b.y > h + b.r) b.y = -b.r;
      }
      paint();
      frame = requestAnimationFrame(tick);
    }

    const onMove = (event: MouseEvent) => {
      mouse.tx = event.clientX / window.innerWidth;
      mouse.ty = event.clientY / window.innerHeight;
    };
    const onResize = () => {
      resize();
      if (reduced) paint();
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduced) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) paint();
    else frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />;
}
