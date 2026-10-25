import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { site, socials, whatsappHref, whatsappMessage } from "@/data/site";
import { getI18n } from "@/lib/locale";
import { CopyEmail } from "./CopyEmail";

export async function Contact() {
  const { locale, dict } = await getI18n();

  return (
    <section className="section section-contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-view">
        <Reveal className="contact-copy">
          <p className="section-kicker dark">
            <span>05</span> {dict.contact.kicker}
          </p>
          <h2 id="contact-title">
            {dict.contact.titleA}
            <br />
            {dict.contact.titleB}
          </h2>
          <p>{dict.contact.copy}</p>
          <div className="contact-actions">
            <a className="button button-contact" href={`mailto:${site.email}`} data-magnetic>
              <span className="visually-hidden">{dict.contact.emailLabel}: </span>
              <span>{site.email}</span>
              <Icon name="arrow-up-right" />
            </a>
            <CopyEmail
              email={site.email}
              labels={{
                copy: dict.contact.copyEmail,
                copied: dict.contact.copied,
                failed: dict.contact.copyFailed,
              }}
            />
          </div>
        </Reveal>

        <Reveal className="social-dock" delay={120}>
          {socials.map((social) => {
            const href = social.id === "whatsapp" ? whatsappHref(whatsappMessage[locale]) : social.href;
            return (
              <a
                key={social.id}
                className="social-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-social={social.id}
                data-magnetic
              >
                <span className="social-icon">
                  <Icon name={social.id} />
                </span>
                <span className="social-name">{social.label}</span>
                <span className="visually-hidden"> {dict.a11y.externalLink}</span>
              </a>
            );
          })}
        </Reveal>
      </div>

      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
        </span>
        <span>{dict.footer.tagline}</span>
      </footer>
    </section>
  );
}
