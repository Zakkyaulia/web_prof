import { site } from "@/data/site";
import { getI18n } from "@/lib/locale";
import { toCardData, toExplorerLabels } from "@/lib/project-view";
import { getPlaceholders, getPublishedProjects } from "@/lib/projects";
import { PROJECT_CATEGORIES } from "@/types/project";
import { ProjectExplorer } from "./ProjectExplorer";

interface ProjectsListProps {
  /** Limit the number of published projects (used on the home page). */
  limit?: number;
}

/** Server component: localizes project data and hands it to the client filter. */
export async function ProjectsList({ limit }: ProjectsListProps) {
  const { locale, dict } = await getI18n();

  const published = getPublishedProjects();
  const shown = limit ? published.slice(0, limit) : published;

  const cards = shown.map((project, index) => toCardData(project, index, locale, dict));
  const categories = PROJECT_CATEGORIES.filter((category) =>
    shown.some((project) => project.category === category),
  );
  const placeholders = site.features.showProjectPlaceholders
    ? getPlaceholders().map(({ id, number }) => ({ id, number }))
    : [];

  return (
    <ProjectExplorer
      projects={cards}
      placeholders={placeholders}
      categories={categories}
      labels={toExplorerLabels(dict)}
    />
  );
}
