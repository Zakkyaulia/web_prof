import type { Project } from "@/types/project";

/**
 * Single source of truth for the Projects section and /projects/[slug] pages.
 *
 * The three entries below are neutral design placeholders. They are NOT real
 * projects and carry no title, description, technology or link.
 *
 * To publish a project, replace a placeholder (or add a new entry) with a
 * `status: "published"` object, and put its images in
 * `public/projects/<id>/`. See README.md ("Adding a project") for a full
 * example. Nothing else needs to change.
 */
export const projects: Project[] = [
  { status: "placeholder", id: "project-01", number: "01" },
  { status: "placeholder", id: "project-02", number: "02" },
  { status: "placeholder", id: "project-03", number: "03" },
];
