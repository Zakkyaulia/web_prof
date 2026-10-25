import {
  SiCss,
  SiFigma,
  SiGit,
  SiGoogleappsscript,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiStreamlit,
} from "react-icons/si";
import type { Skill, TechId, Technology } from "@/types/skill";

/**
 * Single source of truth for technologies. A technology listed here has been
 * used or touched by the owner; it is not a proficiency claim.
 *
 * The Skills section (tech sphere + marquee) and project `stack` names are all
 * derived from this list. To add a skill, append one entry; use `icon: null`
 * when no brand icon exists and a monogram is rendered instead.
 */
export const skills = [
  // Frontend
  { id: "html", name: "HTML", icon: SiHtml5, area: "frontend", core: false },
  { id: "css", name: "CSS", icon: SiCss, area: "frontend", core: false },
  { id: "javascript", name: "JavaScript", icon: SiJavascript, area: "frontend", core: false },
  { id: "react", name: "React", icon: SiReact, area: "frontend", core: false },
  { id: "nextjs", name: "Next.js", icon: SiNextdotjs, area: "frontend", core: true },
  // Backend
  { id: "php", name: "PHP Native", icon: SiPhp, area: "backend", core: false },
  { id: "laravel", name: "Laravel", icon: SiLaravel, area: "backend", core: true },
  // Python & data apps
  { id: "python", name: "Python", icon: SiPython, area: "python-data-apps", core: false },
  { id: "streamlit", name: "Streamlit", icon: SiStreamlit, area: "python-data-apps", core: false },
  // Database
  { id: "mysql", name: "MySQL", icon: SiMysql, area: "database", core: true },
  // Business Intelligence (no Simple Icons glyph available -> monogram)
  { id: "powerbi", name: "Power BI", icon: null, area: "bi", core: false },
  // Tools & automation
  { id: "git", name: "Git", icon: SiGit, area: "tools", core: false },
  { id: "figma", name: "Figma", icon: SiFigma, area: "tools", core: false },
  {
    id: "google-apps-script",
    name: "Google Apps Script",
    icon: SiGoogleappsscript,
    area: "tools",
    core: false,
  },
] as const satisfies readonly Skill[];

/** Lookup by id, used for project `stack` labels. */
export const technologies = Object.fromEntries(
  skills.map((skill) => [skill.id, { id: skill.id, name: skill.name }]),
) as Record<TechId, Technology>;

