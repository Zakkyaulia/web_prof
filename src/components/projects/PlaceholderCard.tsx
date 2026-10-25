import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { accentFor } from "./accent";
import type { PlaceholderCardData, ProjectExplorerLabels } from "./types";

interface PlaceholderCardProps {
  slot: PlaceholderCardData;
  index: number;
  labels: ProjectExplorerLabels["placeholder"];
}

/**
 * Clearly empty design slot: dashed frame, labelled zones. It shows where the
 * thumbnail, title, description and tech stack of a real project will sit.
 * It is not a link and contains no invented content.
 */
export function PlaceholderCard({ slot, index, labels }: PlaceholderCardProps) {
  return (
    <Reveal
      as="article"
      className="project-card is-placeholder"
      delay={index * 100}
      style={{ "--accent": accentFor(index) } as CSSProperties}
    >
      <span className="project-index" aria-hidden="true">
        {slot.number}
      </span>

      <div className="ph-zone" aria-hidden="true">
        <span className="ph-tag">
          {labels.thumbnail} · 16:10
        </span>
      </div>

      <div className="project-body">
        <p className="project-type">{labels.label}</p>
        <h3>Project {slot.number}</h3>
        <p>{labels.reserved}</p>

        <div className="ph-bars" aria-hidden="true">
          <span className="ph-bar">{labels.title}</span>
          <span className="ph-bar">{labels.description}</span>
          <span className="ph-pills">
            <span className="ph-bar">{labels.stack}</span>
            <span className="ph-bar" />
            <span className="ph-bar" />
          </span>
        </div>
      </div>
    </Reveal>
  );
}
