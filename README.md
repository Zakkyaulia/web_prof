# Zakky Aulia Aldrin | Portfolio

Personal portfolio built with Next.js (App Router), React and TypeScript.
Visual direction: **Ocean Graphite** (blue-tinted graphite neutrals, one sea-teal accent).
Bilingual (ID | EN), no backend, no database, no external services.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

Requires Node 20.9 or newer. Fonts (Syne, Space Grotesk, JetBrains Mono) are
self-hosted by `next/font/google`; the first build downloads them from Google Fonts.

## Folder structure

```text
src/
├── app/
│   ├── layout.tsx            Root layout, fonts, metadata, skip link
│   ├── page.tsx              Home (all sections + JSON-LD)
│   ├── globals.css           Design tokens and shared utilities
│   ├── projects/
│   │   ├── page.tsx          /projects (list + filter)
│   │   ├── [slug]/page.tsx   /projects/<slug> (case study, from data)
│   │   └── preview/page.tsx  Dev-only empty layout preview
│   ├── opengraph-image.tsx   Social share image
│   ├── sitemap.ts, robots.ts
│   └── not-found.tsx
├── components/
│   ├── layout/               Header, Navbar, LanguageToggle, Footer
│   ├── sections/             Hero (includes About), Experience, Projects, Skills, Education, Contact
│   ├── projects/             ProjectCard, PlaceholderCard, ProjectExplorer, ProjectDetail
│   └── ui/                   BackgroundCanvas, MotionEffects, Reveal, ScrollProgress, Icon, JsonLd
├── data/                     All content (single source of truth)
│   ├── site.ts               URL, email, socials, availability, feature flags
│   ├── profile.ts, experience.ts, education.ts, skills.ts
│   └── projects.ts           Project slots and real projects
├── i18n/                     en.ts (defines the shape), id.ts, index.ts
├── lib/                      locale helpers, project queries
└── types/                    project.ts, skill.ts, content.ts, i18n.ts
public/
├── projects/project-01/ ...  Images for each project (folder name = project id)
├── zakky-portrait.png
└── resume-zakkyAA.pdf
```

## Adding a project

Everything for a project lives in two places: one object in `src/data/projects.ts`
and its images in `public/projects/<id>/`.

1. Put images in the folder that matches the project `id`, for example
   `public/projects/project-01/thumbnail.png` and `screenshot-1.png`.
2. In `src/data/projects.ts`, replace the placeholder (or add an entry) with a
   `status: "published"` object. Only `id`, `slug`, `title`, `summary` and
   `category` are required. Every other field is optional and its block is
   hidden when you leave it out.

```ts
{
  status: "published",
  id: "project-01",                       // folder under public/projects/
  slug: "your-project-slug",              // becomes /projects/your-project-slug
  title: { en: "Title (EN)", id: "Judul (ID)" },
  summary: { en: "One or two sentences.", id: "Satu atau dua kalimat." },
  category: "web",                        // web | academic | organization | data-bi | automation | other
  period: "2025",                         // optional
  state: "completed",                     // optional: live | completed | in-progress | archived
  featured: true,                         // optional: listed first
  thumbnail: { file: "thumbnail.png", width: 1600, height: 1000, alt: { en: "...", id: "..." } },
  gallery: [{ file: "screenshot-1.png", width: 1600, height: 1000, alt: { en: "...", id: "..." } }],
  problem: { en: "...", id: "..." },
  solution: { en: "...", id: "..." },
  role: { en: "...", id: "..." },
  contributions: [{ en: "...", id: "..." }],
  features: [{ en: "...", id: "..." }],
  stack: ["nextjs", "mysql"],             // ids from src/data/skills.ts
  challenges: [{ title: { en: "...", id: "..." }, body: { en: "...", id: "..." } }],
  outcome: [{ en: "...", id: "..." }],    // only verifiable results
  links: { demo: "https://...", repo: "https://...", docs: "https://..." },
}
```

What updates automatically:

- The card appears in Projects and `/projects`, and links to `/projects/<slug>`.
- The category filter shows only categories that have a published project, and
  is hidden until at least two categories exist.
- `sitemap.xml` includes the new page.
- Skills tags show a small count of published projects that use each technology.

To use a technology that is not in the registry, add its id to `TechId` in
`src/types/skill.ts` and an entry to `technologies` in `src/data/skills.ts`.

Placeholders: the three `status: "placeholder"` slots only exist for design
review. Hide all of them with `features.showProjectPlaceholders: false` in
`src/data/site.ts`, or delete them from `projects.ts`.
While running `npm run dev`, `/projects/preview` shows the empty project page
layout (it returns 404 in production).

## Languages

- Toggle `ID | EN` in the navigation. No `/id` or `/en` routes.
- UI text: `src/i18n/en.ts` and `src/i18n/id.ts` (TypeScript rejects an
  incomplete `id.ts`). Content text: `{ en, id }` objects inside `src/data/*`.
- The choice is stored in a `locale` cookie (1 year). The server reads it, so the
  first HTML is already in the right language (no hydration mismatch). First-time
  visitors get Indonesian if their browser prefers it, otherwise English.
- `<html lang>`, page titles, descriptions and Open Graph follow the language.
- Trade-off: pages are rendered per request (not prerendered) because they read a
  cookie. This works normally on Vercel.

## Common edits

| Want to change | Edit |
| --- | --- |
| Available for work indicator | `site.availability.open` / `label` in `src/data/site.ts` |
| Email, social links, CV file | `src/data/site.ts`, `public/resume-zakkyAA.pdf` |
| Public domain (canonical, OG, sitemap) | `site.siteUrl` in `src/data/site.ts` |
| Experience / Education / Skills | `src/data/experience.ts`, `education.ts`, `skills.ts` |
| Colors, type scale | tokens at the top of `src/app/globals.css` |

### Switching to `zakky.vercel.app`

That domain returned `DEPLOYMENT_NOT_FOUND` when checked, so the site still
uses `https://zakkyauliaprofile.vercel.app`. To switch: in Vercel open the
project, Settings, Domains, add `zakky.vercel.app`, wait for "Valid
Configuration", confirm it loads this site, then change `siteUrl` in
`src/data/site.ts`.

## Deployment

Vercel detects Next.js automatically. If the project's Framework Preset in
Vercel is still "Other" (it was a static site), change it to **Next.js** in
Settings, Build & Development. No environment variables are required.
