import type { L10n } from "./i18n";

export type SocialId = "linkedin" | "github" | "instagram" | "whatsapp";

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}

export interface ExperienceCertificate {
  file: string;
  preview: string;
  issuedLabel?: string;
}

export interface ExperienceEntry {
  id: string;
  role: L10n;
  organization: string;
  type: "internship" | "full-time" | "freelance" | "volunteer";
  /** ISO year-month, used for the machine-readable <time> value. */
  start: string;
  /** Omit for the current position. */
  end?: string;
  /** Human readable period per language. */
  period: L10n;
  location: L10n;
  summary: L10n;
  certificate?: ExperienceCertificate;
}

export interface EducationEntry {
  id: string;
  institution: string;
  program: L10n;
  /** Current semester, shown as a supporting detail. */
  semester?: number;
  gpa?: number;
}
