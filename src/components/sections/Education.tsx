import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";
import { getI18n } from "@/lib/locale";

export async function Education() {
  const { locale, dict } = await getI18n();
  const numberLocale = locale === "id" ? "id-ID" : "en-US";

  return (
    <section className="section" id="education" aria-labelledby="education-title">
      <div className="container content-view">
        <SectionHeading id="education-title" index="04" kicker={dict.education.kicker} title={dict.education.title} />

        {education.map((entry) => (
          <Reveal key={entry.id} className="education-panel">
            <div>
              <p className="education-label">{dict.education.label}</p>
              <h3>{entry.program[locale]}</h3>
              {entry.gpa ? (
                <p className="education-meta">
                  {dict.education.gpa} {entry.gpa.toLocaleString(numberLocale, { minimumFractionDigits: 2 })}
                </p>
              ) : null}
            </div>
            {entry.semester ? (
              <span className="education-year" aria-label={`${dict.education.semesterShort} ${entry.semester}`}>
                {dict.education.semesterShort}
                <br />
                {String(entry.semester).padStart(2, "0")}
              </span>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
