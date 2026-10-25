import { site } from "@/data/site";
import { getI18n } from "@/lib/locale";

/** Used on pages that do not end with the Contact section. */
export async function Footer() {
  const { dict } = await getI18n();
  return (
    <footer className="site-footer footer-dark">
      <span>
        © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
      </span>
      <span>{dict.footer.tagline}</span>
    </footer>
  );
}
