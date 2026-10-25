"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Tag = "div" | "li" | "article" | "section" | "header";

interface RevealProps {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: Tag;
  style?: CSSProperties;
  /** Marks the element for the tilt + spotlight effect (see MotionEffects). */
  tilt?: boolean;
  /**
   * "plain" only flips `data-visible` (CSS decides what to animate); the
   * default also applies the standard fade-up entrance.
   */
  variant?: "fade" | "plain";
}

/**
 * Scroll reveal driven by IntersectionObserver. The hidden state lives in CSS
 * and only applies when scripting is on and motion is allowed, so the markup
 * is fully visible without JS. No React state is involved, so there is no
 * hydration mismatch.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Component = "div",
  style,
  tilt = false,
  variant = "fade",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = [variant === "fade" ? "reveal" : "", className].filter(Boolean).join(" ");

  return (
    <Component
      ref={ref as never}
      className={classes || undefined}
      data-tilt={tilt ? "" : undefined}
      style={{ "--reveal-delay": delay, ...style } as CSSProperties}
    >
      {children}
    </Component>
  );
}
