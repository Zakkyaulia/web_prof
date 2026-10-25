import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lead?: string;
}

/** Original heading style: numbered kicker + uppercase display title. */
export function SectionHeading({ id, index, kicker, title, lead }: SectionHeadingProps) {
  return (
    <Reveal className="section-heading">
      <p className="section-kicker">
        <span>{index}</span> {kicker}
      </p>
      <h2 id={id}>{title}</h2>
      {lead ? <p className="exp-lead">{lead}</p> : null}
    </Reveal>
  );
}
