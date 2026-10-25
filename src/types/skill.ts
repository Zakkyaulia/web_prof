import type { IconType } from "react-icons";
import type { skills } from "@/data/skills";

/** Area a technology belongs to. Kept as data, not shown as cards. */
export type SkillArea = "frontend" | "backend" | "python-data-apps" | "database" | "bi" | "tools";

/**
 * One entry in `src/data/skills.ts`, the single source for the Skills section
 * (tech sphere + marquee) and for project `stack` names.
 */
export interface Skill {
  id: string;
  name: string;
  /** Brand icon (react-icons). `null` falls back to a text monogram. */
  icon: IconType | null;
  area: SkillArea;
  /** Core skills are highlighted with the lime accent. */
  core: boolean;
}

/**
 * Every technology that can be shown in Skills or referenced from a project's
 * `stack`. Derived from `src/data/skills.ts`, so adding an entry there is enough.
 */
export type TechId = (typeof skills)[number]["id"];

export interface Technology {
  id: TechId;
  name: string;
}
