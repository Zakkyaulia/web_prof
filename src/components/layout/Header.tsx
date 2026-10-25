import { getI18n } from "@/lib/locale";
import { Navbar, type NavItem } from "./Navbar";

export async function Header() {
  const { locale, dict } = await getI18n();

  const items: NavItem[] = [
    { id: "about", label: dict.nav.about },
    { id: "experience", label: dict.nav.experience },
    { id: "projects", label: dict.nav.projects },
    { id: "skills", label: dict.nav.skills },
    { id: "education", label: dict.nav.education },
  ];

  return (
    <Navbar
      items={items}
      cta={dict.nav.cta}
      locale={locale}
      labels={{
        primaryNav: dict.a11y.primaryNav,
        openMenu: dict.a11y.openMenu,
        closeMenu: dict.a11y.closeMenu,
        language: dict.a11y.language,
        backToTop: dict.a11y.backToTop,
      }}
    />
  );
}
