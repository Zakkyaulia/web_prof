import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n";

/**
 * Structure of a project page with every block empty. Used only by the
 * development preview route so the layout can be reviewed before any real
 * project content exists. It contains labels, never invented content.
 */
export function ProjectDetailSkeleton({ dict }: { dict: Dictionary }) {
  const d = dict.projects.detail;
  const p = dict.projects.preview;

  return (
    <article className="container page-pad">
      <Link href="/projects" className="pd-back">
        <Icon name="arrow-left" />
        {dict.projects.back}
      </Link>

      <header className="pd-header">
        <p className="project-type">{p.title}</p>
        <h1 className="page-title">Project 00</h1>
        <p className="page-lead">{p.note}</p>
        <div className="pd-links">
          <span className="pd-ph">{d.demo}</span>
          <span className="pd-ph">{d.repo}</span>
        </div>
      </header>

      <div className="pd-ph hero" style={{ marginBottom: 44 }}>
        {p.screenshot} · 16:9
      </div>

      <div className="pd-layout has-sidebar">
        <aside>
          <dl className="pd-facts">
            {[d.role, d.period, d.status, d.stack].map((label) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd className="pd-ph">{p.block}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="pd-main">
          {[d.problem, d.solution, d.contributions, d.features, d.challenges, d.outcome].map((label) => (
            <section key={label} className="pd-block">
              <h2>{label}</h2>
              <div className="pd-ph tall">{p.block}</div>
            </section>
          ))}
        </div>
      </div>

      <section className="pd-block" style={{ marginTop: 48 }}>
        <h2>{d.gallery}</h2>
        <ul className="pd-gallery">
          {[1, 2].map((n) => (
            <li key={n} className="pd-ph hero">
              {p.screenshot} {n}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
