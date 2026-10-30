import type { ExperienceEntry } from "@/types/content";

/**
 * Newest first. Wording is based on the original portfolio text. Internal
 * company details are intentionally left out and no figures are claimed.
 */
export const experience: ExperienceEntry[] = [
  {
    id: "dti-unand",
    role: { en: "Junior Software Engineer", id: "Junior Software Engineer" },
    organization: "Direktorat Teknologi Informasi Universitas Andalas (DTI UNAND)",
    type: "internship",
    start: "2026-04",
    period: { en: "Apr 2026 - Present", id: "Apr 2026 - Sekarang" },
    location: {
      en: "Padang, West Sumatra · Hybrid",
      id: "Padang, Sumatera Barat · Hibrida",
    },
    summary: {
      en: "Contributing to the development and maintenance of internal digital systems at Universitas Andalas: building web applications, improving existing features, and working with the development team.",
      id: "Berkontribusi pada pengembangan dan pemeliharaan sistem digital internal Universitas Andalas: membangun aplikasi web, meningkatkan fitur yang sudah ada, dan bekerja bersama tim pengembang.",
    },
  },
  {
    id: "pemprov-sumbar",
    role: { en: "Full Stack Developer", id: "Full Stack Developer" },
    organization: "Pemerintah Provinsi Sumatera Barat",
    type: "internship",
    start: "2026-01",
    end: "2026-02",
    period: { en: "Jan 2026 - Feb 2026", id: "Jan 2026 - Feb 2026" },
    location: {
      en: "Padang, West Sumatra · On-site",
      id: "Padang, Sumatera Barat · Di lokasi",
    },
    summary: {
      en: "Led the development of PRADATA, a web-based platform for organizational data management and administrative workflows.",
      id: "Memimpin pengembangan PRADATA, platform berbasis web untuk pengelolaan data organisasi dan alur kerja administrasi.",
    },
    certificate: {
      file: "/certificate/Sertifikat Magang Gubernur Zakky.pdf",
      preview: "/certificate/preview.webp",
      issuedLabel: "Pemerintah Provinsi Sumatera Barat",
    },
  },
  {
    id: "infranexia",
    role: {
      en: "Data Management & Automation Intern",
      id: "Magang Pengelolaan Data & Otomasi",
    },
    organization: "Infranexia",
    type: "internship",
    start: "2025-08",
    end: "2025-10",
    period: { en: "Aug 2025 - Oct 2025", id: "Agu 2025 - Okt 2025" },
    location: {
      en: "Padang, West Sumatra · On-site",
      id: "Padang, Sumatera Barat · Di lokasi",
    },
    summary: {
      en: "Supported operational data management and customer issue tracking, and helped identify workflow improvements, using Google Apps Script to automate reporting and day-to-day processes.",
      id: "Mendukung pengelolaan data operasional dan pelacakan keluhan pelanggan, serta membantu mengidentifikasi perbaikan alur kerja, dengan memanfaatkan Google Apps Script untuk mengotomasi pelaporan dan proses harian.",
    },
    certificate: {
      file: "/certificate/Sertifikat Magang Gubernur Zakky.pdf",
      preview: "/certificate/preview.webp",
      issuedLabel: "Infranexia",
    },
  },
];
