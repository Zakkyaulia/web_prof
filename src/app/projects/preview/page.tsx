import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetailSkeleton } from "@/components/projects/ProjectDetailSkeleton";
import { getI18n } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Project layout preview",
  robots: { index: false, follow: false },
};

/** Development-only: shows an empty project page so the layout can be reviewed. */
export default async function ProjectPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  const { dict } = await getI18n();
  return (
    <>
      <ProjectDetailSkeleton dict={dict} />
      <Footer />
    </>
  );
}
