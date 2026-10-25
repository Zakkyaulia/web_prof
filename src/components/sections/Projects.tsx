import Link from "next/link";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { getI18n } from "@/lib/locale";
import { getPublishedProjects } from "@/lib/projects";

const HOME_LIMIT = 4;

export async function Projects() {
  const { dict } = await getI18n();
  const publishedCount = getPublishedProjects().length;
  const lead = publishedCount > 0 ? undefined : dict.projects.leadEmpty;

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container content-view">
        <SectionHeading
          id="projects-title"
          index="02"
          kicker={dict.projects.kicker}
          title={dict.projects.title}
          lead={lead}
        />

        <ProjectsList limit={HOME_LIMIT} />

        <div className="contact-actions">
          {publishedCount > HOME_LIMIT ? (
            <Link href="/projects" className="button button-secondary">
              <span>{dict.projects.viewAll}</span>
              <Icon name="arrow-right" />
            </Link>
          ) : null}
          {process.env.NODE_ENV !== "production" ? (
            <Link href="/projects/preview" className="exp-type" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
              {dict.projects.placeholder.previewLink}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
