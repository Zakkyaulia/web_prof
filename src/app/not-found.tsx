import type { CSSProperties } from "react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/ui/Icon";
import { getI18n } from "@/lib/locale";

export default async function NotFound() {
  const { dict } = await getI18n();

  return (
    <>
      <section className="container page-pad" style={{ minHeight: "70dvh" }}>
        <p className="project-type" style={{ "--accent": "var(--coral)" } as CSSProperties}>
          404
        </p>
        <h1 className="page-title">{dict.notFound.title}</h1>
        <p className="page-lead">{dict.notFound.copy}</p>
        <Link href="/" className="button button-primary">
          <Icon name="arrow-left" />
          <span>{dict.notFound.home}</span>
        </Link>
      </section>
      <Footer />
    </>
  );
}
