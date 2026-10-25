import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { getI18n } from "@/lib/locale";
import { getProjectBySlug, projectAsset } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Rendered on demand: the active language comes from a cookie (see lib/locale.ts),
// so these pages cannot be prerendered. New projects need no extra wiring.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const { locale } = await getI18n();
  const title = project.title[locale];
  const description = project.summary[locale];
  const image = project.thumbnail ? projectAsset(project.id, project.thumbnail) : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/projects/${project.slug}`,
      ...(image ? { images: [{ url: image, width: project.thumbnail?.width, height: project.thumbnail?.height }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { locale, dict } = await getI18n();
  return (
    <>
      <ProjectDetail project={project} locale={locale} dict={dict} />
      <Footer />
    </>
  );
}
