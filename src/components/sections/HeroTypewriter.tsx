"use client";

import { useEffect, useState } from "react";

const GREETINGS = ["Hi", "Hola", "Konnichiwa", "Bonjour", "Annyeong", "Marhaban", "Ciao"];

/** Cycles through greetings in several languages. Static "Hi" for reduced motion. */
export function HeroTypewriter() {
  const [text, setText] = useState(GREETINGS[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let greeting = 0;
    let letters = 0;
    let deleting = false;
    let timer = 0;

    const step = () => {
      const current = GREETINGS[greeting];
      letters += deleting ? -1 : 1;
      setText(current.slice(0, Math.max(letters, 0)));

      let delay = deleting ? 44 : 82;
      if (!deleting && letters === current.length) {
        delay = 1250;
        deleting = true;
      } else if (deleting && letters === 0) {
        deleting = false;
        greeting = (greeting + 1) % GREETINGS.length;
        delay = 320;
      }
      timer = window.setTimeout(step, delay);
    };

    // Start by erasing the server-rendered greeting, like the original did.
    letters = GREETINGS[0].length;
    deleting = true;
    timer = window.setTimeout(step, 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <span id="typewriter">{text || "\u00a0"}</span>
      <span className="cursor" aria-hidden="true" />
    </>
  );
}
