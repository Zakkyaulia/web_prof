import type { ProjectCategory } from "@/types/project";

/** Fully localized, serializable data for one published project card. */
export interface ProjectCardData {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  categoryLabel: string;
  period?: string;
  stateLabel?: string;
  thumbnail?: { src: string; alt: string; width: number; height: number };
  stack: { id: string; name: string }[];
  /** Zero-based position, used to vary the fallback tile. */
  index: number;
}

export interface PlaceholderCardData {
  id: string;
  number: string;
}

export interface ProjectExplorerLabels {
  filterLabel: string;
  filterAll: string;
  emptyFilter: string;
  emptyAll: string;
  more: string;
  viewProject: string;
  stackLabel: string;
  placeholder: {
    label: string;
    reserved: string;
    thumbnail: string;
    title: string;
    description: string;
    stack: string;
  };
  categories: Record<ProjectCategory, string>;
}
