import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { JsonLd } from "@/components/ui/JsonLd";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { site, socials } from "@/data/site";
import { getI18n } from "@/lib/locale";

export default async function HomePage() {
  const { locale, dict } = await getI18n();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.name,
          jobTitle: profile.headline[locale],
          description: dict.meta.description,
          url: site.siteUrl,
          email: `mailto:${site.email}`,
          image: `${site.siteUrl}${profile.portrait.src}`,
          alumniOf: education[0]?.institution,
          sameAs: socials.filter((social) => social.id !== "whatsapp").map((social) => social.href),
        }}
      />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
