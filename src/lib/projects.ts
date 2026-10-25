import { projects } from "@/data/projects";
import {
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type ProjectImage,
  type ProjectPlaceholder,
  type PublishedProject,
} from "@/types/project";

export function getPublishedProjects(): PublishedProject[] {
  const published = projects.filter(
    (project): project is PublishedProject => project.status === "published",
  );
  // Featured first; otherwise keep the order written in data/projects.ts.
  return [...published].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}

export function getPlaceholders(): ProjectPlaceholder[] {
  return projects.filter(
    (project): project is ProjectPlaceholder => project.status === "placeholder",
  );
}

export function getProjectBySlug(slug: string): PublishedProject | undefined {
  return getPublishedProjects().find((project) => project.slug === slug);
}

/** Only categories that have at least one published project. */
export function getActiveCategories(): ProjectCategory[] {
  const used = new Set(getPublishedProjects().map((project) => project.category));
  return PROJECT_CATEGORIES.filter((category) => used.has(category));
}

export function projectAsset(projectId: string, image: ProjectImage): string {
  return `/projects/${projectId}/${image.file}`;
}

/** Neighbours for previous / next navigation on the detail page. */
export function getAdjacentProjects(slug: string): {
  previous?: PublishedProject;
  next?: PublishedProject;
} {
  const list = getPublishedProjects();
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1 || list.length < 2) return {};
  return {
    previous: list[(index - 1 + list.length) % list.length],
    next: list[(index + 1) % list.length],
  };
}
