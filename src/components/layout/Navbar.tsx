"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/types/i18n";
import { Icon } from "@/components/ui/Icon";
import { LanguageToggle } from "./LanguageToggle";

export interface NavItem {
  id: string;
  label: string;
}

interface NavbarProps {
  items: NavItem[];
  cta: string;
  locale: Locale;
  labels: {
    primaryNav: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    backToTop: string;
  };
}

export function Navbar({ items, cta, locale, labels }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [spy, setSpy] = useState<string>("about");
  const [open, setOpen] = useState(false);

  // Scroll-spy (home page only): highlights the section under the viewport middle.
  useEffect(() => {
    if (!isHome) return;
    const targets = [...items.map((item) => item.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSpy(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [isHome, items]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = isHome ? spy : pathname.startsWith("/projects") ? "projects" : null;
  const href = (id: string) => `/#${id}`;

  return (
    <header className="nav-wrap">
      <nav className="site-nav" aria-label={labels.primaryNav}>
        <Link className="nav-brand" href="/#about" aria-label={labels.backToTop}>
          ZAA<span>.</span>
        </Link>

        <span className="nav-links">
          {items.map((item) => (
            <Link
              key={item.id}
              className={`nav-link${active === item.id ? " is-active" : ""}`}
              href={href(item.id)}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </span>

        <LanguageToggle locale={locale} label={labels.language} />

        <Link className="nav-cta" href={href("contact")} data-magnetic>
          {cta}
          <Icon name="arrow-up-right" />
        </Link>

        <button
          type="button"
          className="nav-menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? labels.closeMenu : labels.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      <div id="mobile-menu" className="nav-panel" hidden={!open}>
        {[...items, { id: "contact", label: cta }].map((item) => (
          <Link
            key={item.id}
            href={href(item.id)}
            className={active === item.id ? "is-active" : undefined}
            aria-current={active === item.id ? "true" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
