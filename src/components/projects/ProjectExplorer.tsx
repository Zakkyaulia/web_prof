"use client";

import { useState } from "react";
import type { ProjectCategory } from "@/types/project";
import { PlaceholderCard } from "./PlaceholderCard";
import { ProjectCard } from "./ProjectCard";
import type { PlaceholderCardData, ProjectCardData, ProjectExplorerLabels } from "./types";

interface ProjectExplorerProps {
  projects: ProjectCardData[];
  placeholders: PlaceholderCardData[];
  /** Only categories that have at least one published project. */
  categories: ProjectCategory[];
  labels: ProjectExplorerLabels;
}

type Filter = ProjectCategory | "all";

/** Filterable project grid. The filter bar only exists when it is useful. */
export function ProjectExplorer({ projects, placeholders, categories, labels }: ProjectExplorerProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const showFilter = categories.length >= 2;
  const visible = filter === "all" ? projects : projects.filter((project) => project.category === filter);
  const showPlaceholders = filter === "all" && placeholders.length > 0;
  const isEmpty = visible.length === 0 && !showPlaceholders;

  return (
    <div>
      {showFilter ? (
        <div className="filter-row" role="group" aria-label={labels.filterLabel}>
          {(["all", ...categories] as Filter[]).map((value) => (
            <button
              key={value}
              type="button"
              className="filter-chip"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {value === "all" ? labels.filterAll : labels.categories[value]}
            </button>
          ))}
        </div>
      ) : null}

      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            moreLabel={labels.more}
            viewLabel={labels.viewProject}
            stackLabel={labels.stackLabel}
          />
        ))}
        {showPlaceholders
          ? placeholders.map((slot, index) => (
              <PlaceholderCard key={slot.id} slot={slot} index={visible.length + index} labels={labels.placeholder} />
            ))
          : null}
      </div>

      <p className="project-empty" role="status" hidden={!isEmpty}>
        {filter === "all" ? labels.emptyAll : labels.emptyFilter}
      </p>
    </div>
  );
}
