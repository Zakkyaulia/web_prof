import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsMarquee } from "@/components/sections/SkillsMarquee";
import { TechSphere } from "@/components/sections/TechSphere";
import { skills } from "@/data/skills";
import { getI18n } from "@/lib/locale";

export async function Skills() {
  const { dict } = await getI18n();
  // Only serialisable fields cross into the client component.
  const sphereItems = skills.map(({ id, name, core }) => ({ id, name, core }));

  return (
    <section className="section section-skills" id="skills" aria-labelledby="skills-title">
      <div className="container content-view">
        <div className="skills-head">
          <SectionHeading id="skills-title" index="03" kicker={dict.skills.kicker} title={dict.skills.title} />
          <Reveal className="skills-sphere-wrap" delay={120}>
            <TechSphere items={sphereItems} />
          </Reveal>
        </div>

        {/* Text version of the decorative sphere for screen readers. */}
        <ul className="sr-only">
          {skills.map((skill) => (
            <li key={skill.id}>{skill.name}</li>
          ))}
        </ul>

        <Reveal className="skills-marquee-reveal">
          <SkillsMarquee items={skills} />
        </Reveal>

        <Reveal>
          <p className="skills-note">{dict.skills.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
