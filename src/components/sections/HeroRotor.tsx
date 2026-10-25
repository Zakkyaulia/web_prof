"use client";

import { useEffect, useState } from "react";

interface HeroRotorProps {
  words: string[];
}

/** The violet pill that rotates through focus areas. */
export function HeroRotor({ words }: HeroRotorProps) {
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let swapTimer = 0;
    const interval = window.setInterval(() => {
      setSwapping(true);
      swapTimer = window.setTimeout(() => {
        setIndex((value) => (value + 1) % words.length);
        setSwapping(false);
      }, 360);
    }, 2600);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(swapTimer);
    };
  }, [words]);

  return <span className={`rotor${swapping ? " is-swapping" : ""}`}>{words[index % words.length]}</span>;
}
