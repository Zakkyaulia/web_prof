import type { Skill } from "@/types/skill";

interface SkillsMarqueeProps {
  items: readonly Skill[];
}

/** Two-letter fallback when a skill has no brand icon. */
function monogram(name: string): string {
  const words = name.split(/[\s.]+/).filter(Boolean);
  const letters = words.length > 1 ? words.map((word) => word[0]).join("") : name;
  return letters.slice(0, 2).toUpperCase();
}

function Pill({ skill }: { skill: Skill }) {
  const SkillIcon = skill.icon;
  return (
    <li className="skills-pill">
      {SkillIcon ? (
        <SkillIcon className="skills-pill-icon" aria-hidden="true" focusable="false" />
      ) : (
        <span className="skills-pill-mono" aria-hidden="true">
          {monogram(skill.name)}
        </span>
      )}
      {skill.name}
    </li>
  );
}

function MarqueeRow({ items, reverse = false }: { items: readonly Skill[]; reverse?: boolean }) {
  return (
    <div
      className="skills-marquee-row"
      data-direction={reverse ? "right" : "left"}
      aria-hidden={reverse ? "true" : undefined}
    >
      <div className="skills-marquee-track">
        <ul className="skills-marquee-group">
          {items.map((skill) => (
            <Pill key={skill.id} skill={skill} />
          ))}
        </ul>
        {/* Identical copy for a seamless loop (translateX 0 -> -50%). */}
        <ul className="skills-marquee-group" aria-hidden="true">
          {items.map((skill) => (
            <Pill key={skill.id} skill={skill} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Two marquee rows moving in opposite directions. Pure CSS animation; the
 * second row is the same list shifted by half so the rows never line up.
 */
export function SkillsMarquee({ items }: SkillsMarqueeProps) {
  const offset = Math.floor(items.length / 2);
  const shifted = [...items.slice(offset), ...items.slice(0, offset)];

  return (
    <div className="skills-marquee">
      <MarqueeRow items={items} />
      <MarqueeRow items={shifted} reverse />
    </div>
  );
}
