import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { BackgroundCanvas } from "@/components/ui/BackgroundCanvas";
import { MotionEffects } from "@/components/ui/MotionEffects";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { site } from "@/data/site";
import { getI18n } from "@/lib/locale";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d0b14",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getI18n();
  return {
    metadataBase: new URL(site.siteUrl),
    title: {
      default: dict.meta.title,
      template: `%s | ${site.name}`,
    },
    description: dict.meta.description,
    authors: [{ name: site.name }],
    keywords: [
      "Zakky Aulia Aldrin",
      "portfolio",
      "web developer",
      "full-stack",
      "enterprise systems",
      "automation",
      "Andalas University",
      "Indonesia",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "id" ? "id_ID" : "en_US",
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, dict } = await getI18n();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#content">
          {dict.a11y.skipToContent}
        </a>
        <BackgroundCanvas />
        <ScrollProgress />
        <MotionEffects />
        <Header />
        <main id="content">{children}</main>
      </body>
    </html>
  );
}
