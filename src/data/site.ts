import type { L10n } from "@/types/i18n";
import type { SocialLink } from "@/types/content";

/**
 * Central site configuration. Most things you might want to flip live here.
 */
export const site = {
  name: "Zakky Aulia Aldrin",

  /**
   * Public origin used for canonical URLs, Open Graph, sitemap and JSON-LD.
   * TODO: switch to "https://zakky.vercel.app" once that domain is attached to
   * this Vercel project (it returned DEPLOYMENT_NOT_FOUND when last checked).
   */
  siteUrl: "https://zakkyauliaprofile.vercel.app",

  email: "zakkyaulialdrin@gmail.com",
  resumeFile: "/resume-zakkyAA.pdf",
  resumeDownloadName: "Zakky_Aulia_Aldrin_Resume.pdf",

  /**
   * Set `open` to false to hide the rotating "available for work" badge.
   * `badgeText` is printed around the badge circle, `label` is its accessible name.
   */
  availability: {
    open: true,
    badgeText: {
      en: "AVAILABLE FOR WORK · OPEN TO COLLAB · ",
      id: "TERBUKA UNTUK KERJA · KOLABORASI · ",
    } satisfies L10n,
    label: {
      en: "Available for work and collaboration, get in touch",
      id: "Terbuka untuk pekerjaan dan kolaborasi, hubungi saya",
    } satisfies L10n,
  },

  features: {
    /**
     * Show the reserved "Project 0X" design slots in the Projects section.
     * Set to false once real projects are published and you no longer want
     * to show empty slots.
     */
    showProjectPlaceholders: true,
  },
} as const;

const whatsappNumber = "6287869030753";

export const whatsappMessage: L10n = {
  en: "Hi Zakky, I visited your portfolio and would like to connect.",
  id: "Halo Zakky, saya mengunjungi portofolio Anda dan ingin terhubung.",
};

export function whatsappHref(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp is built per-language in the Contact section (see whatsappHref). */
export const socials: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/zakkyaulia" },
  { id: "github", label: "GitHub", href: "https://github.com/Zakkyaulia" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/zakkyaulia__/" },
  { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/${whatsappNumber}` },
];
