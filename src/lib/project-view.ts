import type { ProjectCardData, ProjectExplorerLabels } from "@/components/projects/types";
import { technologies } from "@/data/skills";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types/i18n";
import type { PublishedProject } from "@/types/project";
import { projectAsset } from "./projects";

export function toCardData(
  project: PublishedProject,
  index: number,
  locale: Locale,
  dict: Dictionary,
): ProjectCardData {
  return {
    slug: project.slug,
    title: project.title[locale],
    summary: project.summary[locale],
    category: project.category,
    categoryLabel: dict.projects.categories[project.category],
    period: project.period,
    stateLabel: project.state ? dict.projects.states[project.state] : undefined,
    thumbnail: project.thumbnail
      ? {
          src: projectAsset(project.id, project.thumbnail),
          alt: project.thumbnail.alt[locale],
          width: project.thumbnail.width,
          height: project.thumbnail.height,
        }
      : undefined,
    stack: (project.stack ?? []).map((id) => ({ id, name: technologies[id]?.name ?? id })),
    index,
  };
}

export function toExplorerLabels(dict: Dictionary): ProjectExplorerLabels {
  return {
    filterLabel: dict.projects.filterLabel,
    filterAll: dict.projects.filterAll,
    emptyFilter: dict.projects.emptyFilter,
    emptyAll: dict.projects.emptyAll,
    more: dict.projects.more,
    viewProject: dict.projects.viewProject,
    stackLabel: dict.projects.detail.stack,
    placeholder: dict.projects.placeholder,
    categories: dict.projects.categories,
  };
}
