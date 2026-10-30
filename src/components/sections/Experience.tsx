import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { getI18n } from "@/lib/locale";
import { ExperienceItem } from "./ExperienceItem";

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

          {experience.map((entry, index) => (
            <ExperienceItem
              key={entry.id}
              entry={entry}
              index={index}
              locale={locale}
              dict={dict.experience}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
