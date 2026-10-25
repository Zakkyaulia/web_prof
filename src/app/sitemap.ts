import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getPublishedProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = getPublishedProjects().map((project) => ({
    url: `${site.siteUrl}/projects/${project.slug}`,
  }));

  return [{ url: site.siteUrl }, { url: `${site.siteUrl}/projects` }, ...projectEntries];
}
