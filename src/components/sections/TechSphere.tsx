"use client";

import { useEffect, useRef } from "react";

export interface SphereItem {
  id: string;
  name: string;
  core: boolean;
}

interface TechSphereProps {
  items: readonly SphereItem[];
  /** Texture dots drawn on the canvas behind the labels. */
  dotCount?: number;
}

type Point = readonly [x: number, y: number, z: number];

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const BASE_TILT = 0.35;
const MAX_TILT = 1.1;
const AUTO_SPEED = 0.3; // rad / s
const HOVER_FACTOR = 0.25;
const MAX_VELOCITY = 8; // rad / s

/** Evenly spread points on a unit sphere. */
function fibonacciSphere(count: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - ((i + 0.5) / count) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = i * GOLDEN_ANGLE;
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return points;
}

const clampTilt = (value: number) => Math.max(-MAX_TILT, Math.min(MAX_TILT, value));
const clampVelocity = (value: number) => Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, value));

/**
 * Decorative rotating dot sphere with skill labels on its surface.
 * One rAF loop, all per-frame updates go straight to the DOM through refs
 * (no React state), so it never re-renders while animating.
 */
export function TechSphere({ items, dotCount = 120 }: TechSphereProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const labels = labelRefs.current.slice(0, items.length);
    const labelPoints = fibonacciSphere(items.length);
    const dotPoints = fibonacciSphere(dotCount);

    // Colours come from the design tokens in globals.css.
    const styles = getComputedStyle(root);
    const dotColor = styles.getPropertyValue("--muted").trim() || styles.color;
    const ringColor = styles.getPropertyValue("--border").trim() || styles.color;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    let inView = true;
    let pageVisible = document.visibilityState === "visible";

    let size = 0;
    let radius = 0;
    let rotY = 0;
    let rotX = BASE_TILT;
    let velY = 0;
    let velX = 0;
    let speedFactor = 1;
    let speedTarget = 1;

    let dragging = false;
    let pointerId = -1;
    let lastPX = 0;
    let lastPY = 0;
    let lastPT = 0;

    let raf = 0;
    let lastT = 0;

    const render = () => {
      if (!size) return;
      const c = size / 2;
      const sinY = Math.sin(rotY);
      const cosY = Math.cos(rotY);
      const sinX = Math.sin(rotX);
      const cosX = Math.cos(rotX);

      const project = ([x, y, z]: Point) => {
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        return { sx: c + x1 * radius, sy: c + y2 * radius, depth: (z2 + 1) / 2 };
      };

      ctx.clearRect(0, 0, size, size);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(c, c, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = dotColor;
      for (const point of dotPoints) {
        const { sx, sy, depth } = project(point);
        ctx.globalAlpha = 0.12 + depth * 0.78;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.7 + depth * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        if (!label) continue;
        const { sx, sy, depth } = project(labelPoints[i]);
        const scale = 0.8 + depth * 0.35;
        label.style.transform = `translate3d(${sx.toFixed(2)}px, ${sy.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        label.style.opacity = (0.2 + depth * 0.8).toFixed(3);
        label.style.zIndex = String(Math.round(depth * 100));
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      speedFactor += (speedTarget - speedFactor) * (1 - Math.exp(-dt * 6));
      if (!dragging) {
        const damping = Math.exp(-dt * 2.2);
        velY *= damping;
        velX *= damping;
        rotY += (AUTO_SPEED * speedFactor + velY) * dt;
        rotX += velX * dt;
        // Drift back to the resting tilt.
        rotX += (BASE_TILT - rotX) * (1 - Math.exp(-dt * 0.6));
        const clamped = clampTilt(rotX);
        if (clamped !== rotX) velX = 0;
        rotX = clamped;
      }
      render();
    };

    const sync = () => {
      const shouldRun = !reduced && inView && pageVisible;
      if (shouldRun && !raf) {
        lastT = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const resize = () => {
      const next = root.clientWidth;
      if (!next) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = next;
      radius = size * (size < 300 ? 0.34 : 0.38);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    // ── Pointer: drag to rotate, slow down on hover ──
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      pointerId = event.pointerId;
      lastPX = event.clientX;
      lastPY = event.clientY;
      lastPT = event.timeStamp;
      velX = 0;
      velY = 0;
      root.setPointerCapture(event.pointerId);
      root.dataset.dragging = "true";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      const dx = event.clientX - lastPX;
      const dy = event.clientY - lastPY;
      const elapsed = Math.max((event.timeStamp - lastPT) / 1000, 1 / 240);
      lastPX = event.clientX;
      lastPY = event.clientY;
      lastPT = event.timeStamp;

      const perPixel = 1 / Math.max(radius, 1);
      const deltaY = dx * perPixel;
      const deltaX = -dy * perPixel;
      rotY += deltaY;
      rotX = clampTilt(rotX + deltaX);
      velY = clampVelocity(velY * 0.6 + (deltaY / elapsed) * 0.4);
      velX = clampVelocity(velX * 0.6 + (deltaX / elapsed) * 0.4);

      if (!raf) render();
    };

    const endDrag = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      dragging = false;
      pointerId = -1;
      delete root.dataset.dragging;
      // No fling if the pointer rested before release, or motion is reduced.
      if (reduced || event.timeStamp - lastPT > 80) {
        velX = 0;
        velY = 0;
      }
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") speedTarget = HOVER_FACTOR;
    };
    const onPointerLeave = () => {
      speedTarget = 1;
    };

    // ── Lifecycle ──
    const onVisibility = () => {
      pageVisible = document.visibilityState === "visible";
      sync();
    };
    const onMotionChange = () => {
      reduced = motionQuery.matches;
      sync();
      render();
    };

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    const resizeObserver = new ResizeObserver(resize);

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", endDrag);
    root.addEventListener("pointercancel", endDrag);
    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);
    intersection.observe(root);
    resizeObserver.observe(root);

    resize();
    root.dataset.ready = "true";
    sync();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      intersection.disconnect();
      resizeObserver.disconnect();
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", endDrag);
      root.removeEventListener("pointercancel", endDrag);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [items, dotCount]);

  return (
    <div ref={rootRef} className="tech-sphere" aria-hidden="true">
      <canvas ref={canvasRef} className="tech-sphere-canvas" />
      {items.map((item, index) => (
        <span
          key={item.id}
          ref={(node) => {
            labelRefs.current[index] = node;
          }}
          className={item.core ? "tech-sphere-label is-core" : "tech-sphere-label"}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}
