import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { technologies } from "@/data/skills";
import type { Dictionary } from "@/i18n";
import { getAdjacentProjects, projectAsset } from "@/lib/projects";
import type { L10n, Locale } from "@/types/i18n";
import type { PublishedProject } from "@/types/project";

interface ProjectDetailProps {
  project: PublishedProject;
  locale: Locale;
  dict: Dictionary;
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pd-block">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items, locale }: { items: L10n[]; locale: Locale }) {
  return (
    <ul className="pd-bullets">
      {items.map((item) => (
        <li key={item.en}>{item[locale]}</li>
      ))}
    </ul>
  );
}

/**
 * Case-study page for a published project. Every block renders only when its
 * data exists, so a project with just a title and summary still looks complete.
 */
export function ProjectDetail({ project, locale, dict }: ProjectDetailProps) {
  const d = dict.projects.detail;
  const { previous, next } = getAdjacentProjects(project.slug);
  const links = project.links;
  const hasLinks = Boolean(links?.demo || links?.repo || links?.docs);
  const hasSidebar = Boolean(project.role || project.stack?.length || project.period || project.state);
  const metaParts = [
    dict.projects.categories[project.category],
    project.state ? dict.projects.states[project.state] : null,
    project.period,
  ].filter(Boolean);

  return (
    <article className="container page-pad">
      <Link href="/projects" className="pd-back">
        <Icon name="arrow-left" />
        {dict.projects.back}
      </Link>

      <header className="pd-header">
        <p className="project-type">{metaParts.join(" · ")}</p>
        <h1 className="page-title">{project.title[locale]}</h1>
        <p className="page-lead">{project.summary[locale]}</p>

        {hasLinks ? (
          <div className="pd-links">
            {links?.demo ? (
              <a href={links.demo} className="button button-primary" target="_blank" rel="noopener noreferrer">
                <span>{d.demo}</span>
                <Icon name="arrow-up-right" />
              </a>
            ) : null}
            {links?.repo ? (
              <a href={links.repo} className="button button-secondary" target="_blank" rel="noopener noreferrer">
                <span>{d.repo}</span>
                <Icon name="github" />
              </a>
            ) : null}
            {links?.docs ? (
              <a href={links.docs} className="button button-secondary" target="_blank" rel="noopener noreferrer">
                <span>{d.docs}</span>
                <Icon name="arrow-up-right" />
              </a>
            ) : null}
          </div>
        ) : null}
      </header>

      {project.thumbnail ? (
        <figure className="pd-hero">
          <Image
            src={projectAsset(project.id, project.thumbnail)}
            alt={project.thumbnail.alt[locale]}
            width={project.thumbnail.width}
            height={project.thumbnail.height}
            sizes="(min-width: 1200px) 1200px, 92vw"
            priority
          />
        </figure>
      ) : null}

      <div className={`pd-layout${hasSidebar ? " has-sidebar" : ""}`}>
        {hasSidebar ? (
          <aside>
            <dl className="pd-facts">
              {project.role ? (
                <div>
                  <dt>{d.role}</dt>
                  <dd>{project.role[locale]}</dd>
                </div>
              ) : null}
              {project.period ? (
                <div>
                  <dt>{d.period}</dt>
                  <dd>{project.period}</dd>
                </div>
              ) : null}
              {project.state ? (
                <div>
                  <dt>{d.status}</dt>
                  <dd>{dict.projects.states[project.state]}</dd>
                </div>
              ) : null}
              {project.stack?.length ? (
                <div>
                  <dt>{d.stack}</dt>
                  <dd>
                    <ul className="badge-row">
                      {project.stack.map((id) => (
                        <li key={id}>{technologies[id]?.name ?? id}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
            </dl>
          </aside>
        ) : null}

        <div className="pd-main">
          {project.problem ? (
            <Block title={d.problem}>
              <p>{project.problem[locale]}</p>
            </Block>
          ) : null}
          {project.solution ? (
            <Block title={d.solution}>
              <p>{project.solution[locale]}</p>
            </Block>
          ) : null}
          {project.contributions?.length ? (
            <Block title={d.contributions}>
              <BulletList items={project.contributions} locale={locale} />
            </Block>
          ) : null}
          {project.features?.length ? (
            <Block title={d.features}>
              <BulletList items={project.features} locale={locale} />
            </Block>
          ) : null}
          {project.challenges?.length ? (
            <Block title={d.challenges}>
              <dl className="pd-challenges">
                {project.challenges.map((challenge) => (
                  <div key={challenge.title.en}>
                    <dt>{challenge.title[locale]}</dt>
                    <dd>{challenge.body[locale]}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          ) : null}
          {project.outcome?.length ? (
            <Block title={d.outcome}>
              <BulletList items={project.outcome} locale={locale} />
            </Block>
          ) : null}
        </div>
      </div>

      {project.gallery?.length ? (
        <section className="pd-block" style={{ marginTop: 48 }}>
          <h2>{d.gallery}</h2>
          <ul className="pd-gallery">
            {project.gallery.map((image) => (
              <li key={image.file}>
                <Image
                  src={projectAsset(project.id, image)}
                  alt={image.alt[locale]}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 680px) 50vw, 92vw"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {previous && next ? (
        <nav className="pd-adjacent" aria-label={dict.projects.title2}>
          <Link href={`/projects/${previous.slug}`}>
            <span>{d.previous}</span>
            {previous.title[locale]}
          </Link>
          <Link href={`/projects/${next.slug}`} data-align="end">
            <span>{d.next}</span>
            {next.title[locale]}
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
