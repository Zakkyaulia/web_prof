import type { L10n } from "./i18n";
import type { TechId } from "./skill";

export const PROJECT_CATEGORIES = [
  "web",
  "academic",
  "organization",
  "data-bi",
  "automation",
  "other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectState = "live" | "completed" | "in-progress" | "archived";

export interface ProjectImage {
  /** File name inside `public/projects/<project.id>/`, e.g. "thumbnail.png". */
  file: string;
  alt: L10n;
  width: number;
  height: number;
}

export interface ProjectLinks {
  demo?: string;
  repo?: string;
  docs?: string;
}

export interface ProjectChallenge {
  title: L10n;
  body: L10n;
}

/** A reserved slot. Renders as a clearly empty design placeholder. */
export interface ProjectPlaceholder {
  status: "placeholder";
  /** Folder name under `public/projects/`, e.g. "project-01". */
  id: string;
  /** Display number, e.g. "01". */
  number: string;
}

/**
 * A real, verified project. Only `id`, `slug`, `title`, `summary` and
 * `category` are required; every other field is optional and its section is
 * simply omitted from the UI when absent.
 */
export interface PublishedProject {
  status: "published";
  /** Folder name under `public/projects/`, e.g. "project-01". */
  id: string;
  /** URL segment: /projects/<slug>. */
  slug: string;
  title: L10n;
  summary: L10n;
  category: ProjectCategory;
  /** Free text, e.g. "2025" or "Jan 2026 - Feb 2026". */
  period?: string;
  state?: ProjectState;
  /** Featured projects are listed first. */
  featured?: boolean;
  thumbnail?: ProjectImage;
  gallery?: ProjectImage[];
  problem?: L10n;
  solution?: L10n;
  role?: L10n;
  contributions?: L10n[];
  features?: L10n[];
  stack?: TechId[];
  challenges?: ProjectChallenge[];
  outcome?: L10n[];
  links?: ProjectLinks;
}

export type Project = ProjectPlaceholder | PublishedProject;
