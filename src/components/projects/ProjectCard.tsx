import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { accentFor } from "./accent";
import type { ProjectCardData } from "./types";

const MAX_TAGS = 5;

interface ProjectCardProps {
  project: ProjectCardData;
  moreLabel: string;
  viewLabel: string;
  stackLabel: string;
}

/** Card for a published project. The whole card is one link (via the title). */
export function ProjectCard({ project, moreLabel, viewLabel, stackLabel }: ProjectCardProps) {
  const visibleTags = project.stack.slice(0, MAX_TAGS);
  const hiddenCount = project.stack.length - visibleTags.length;
  const meta = [project.period, project.stateLabel].filter(Boolean).join(" · ");

  return (
    <Reveal
      as="article"
      tilt
      className="project-card"
      delay={project.index * 100}
      style={{ "--accent": accentFor(project.index) } as CSSProperties}
    >
      <span className="project-index" aria-hidden="true">
        {String(project.index + 1).padStart(2, "0")}
      </span>

      {project.thumbnail ? (
        <div className="project-thumb">
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            width={project.thumbnail.width}
            height={project.thumbnail.height}
            sizes="(min-width: 980px) 40rem, 100vw"
          />
        </div>
      ) : null}

      <div className="project-body">
        <p className="project-type">{project.categoryLabel}</p>
        <h3>
          <Link href={`/projects/${project.slug}`} className="project-link">
            {project.title}
            <span className="visually-hidden"> ({viewLabel})</span>
          </Link>
        </h3>
        {meta ? <p className="project-meta">{meta}</p> : null}
        <p>{project.summary}</p>

        {visibleTags.length > 0 ? (
          <ul className="badge-row" aria-label={stackLabel}>
            {visibleTags.map((tech) => (
              <li key={tech.id}>{tech.name}</li>
            ))}
            {hiddenCount > 0 ? (
              <li>
                +{hiddenCount} {moreLabel}
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>

      <span className="project-cue" aria-hidden="true">
        <Icon name="arrow-up-right" />
      </span>
    </Reveal>
  );
}
