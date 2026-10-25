import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { getI18n } from "@/lib/locale";
import { getPublishedProjects } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n();
  return {
    title: dict.meta.projectsTitle,
    description: dict.meta.projectsDescription,
    alternates: { canonical: "/projects" },
  };
}

export default async function ProjectsPage() {
  const { dict } = await getI18n();
  const hasPublished = getPublishedProjects().length > 0;

  return (
    <>
      <div className="container page-pad">
        <h1 className="page-title">{dict.projects.title2}</h1>
        <p className="page-lead">{hasPublished ? dict.projects.lead : dict.projects.leadEmpty}</p>
        <ProjectsList />
      </div>
      <Footer />
    </>
  );
}
