import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { getI18n } from "@/lib/locale";

export async function Experience() {
  const { locale, dict } = await getI18n();

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container content-view">
        <SectionHeading
          id="experience-title"
          index="01"
          kicker={dict.experience.kicker}
          title={dict.experience.title}
          lead={dict.experience.lead}
        />

        <Reveal variant="plain" className="timeline">
          <span className="timeline-axis" aria-hidden="true" />

          {experience.map((entry, index) => {
            const isCurrent = !entry.end;
            return (
              <article key={entry.id} className="timeline-item" style={{ "--i": index } as CSSProperties}>
                <span className="timeline-node" style={{ "--i": index } as CSSProperties} aria-hidden="true" />
                <div className="exp-when">
                  <span className="timeline-date">{entry.start.slice(0, 4)}{isCurrent ? ` - ${dict.experience.present}` : ""}</span>
                  {isCurrent ? (
                    <span className="exp-current">
                      <span className="exp-dot" aria-hidden="true" /> {dict.experience.current}
                    </span>
                  ) : null}
                </div>
                <div className="timeline-body">
                  <h3 className="exp-title">{entry.role[locale]}</h3>
                  <p className="exp-company">{entry.organization}</p>
                  <p className="exp-meta">
                    <span className="exp-type">{dict.experience.types[entry.type]}</span>
                    <span className="exp-dot-sep" aria-hidden="true">·</span>
                    <time dateTime={entry.end ? `${entry.start}/${entry.end}` : `${entry.start}/`}>
                      {entry.period[locale]}
                    </time>
                    <span className="exp-dot-sep" aria-hidden="true">·</span>
                    {entry.location[locale]}
                  </p>
                  <p className="exp-desc">{entry.summary[locale]}</p>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
