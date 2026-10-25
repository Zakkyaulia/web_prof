import type { L10n } from "@/types/i18n";

export const profile = {
  name: "Zakky Aulia Aldrin",
  location: { en: "Padang, Indonesia", id: "Padang, Indonesia" } satisfies L10n,
  institution: "Universitas Andalas",
  headline: {
    en: "Information Systems student",
    id: "Mahasiswa Sistem Informasi",
  } satisfies L10n,
  portrait: {
    src: "/zakky-portrait.png",
    width: 2229,
    height: 3591,
    alt: {
      en: "Portrait of Zakky Aulia Aldrin with folded arms",
      id: "Potret Zakky Aulia Aldrin dengan tangan terlipat",
    } satisfies L10n,
  },
  /** Areas of interest shown in About. Taken from the owner's own profile. */
  focusAreas: [
    { en: "Full-stack web development", id: "Pengembangan web full-stack" },
    { en: "Enterprise systems", id: "Sistem enterprise" },
    { en: "Data management", id: "Pengelolaan data" },
    { en: "Business process automation", id: "Otomasi proses bisnis" },
    { en: "UI/UX", id: "UI/UX" },
  ] satisfies L10n[],
} as const;
