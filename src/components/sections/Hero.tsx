import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/data/profile";
import { site } from "@/data/site";
import { getI18n } from "@/lib/locale";
import { HeroRotor } from "./HeroRotor";
import { HeroTypewriter } from "./HeroTypewriter";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

export async function Hero() {
  const { locale, dict } = await getI18n();
  const [first, second, ...rest] = profile.name.split(" ");

  return (
    <section className="section section-hero" id="about" aria-labelledby="about-title">
      <div className="container hero-layout">
        <div className="hero-content">
          <p className="eyebrow" data-hero style={order(0)}>
            <span className="dot" aria-hidden="true" />
            <HeroTypewriter />
            <span className="eyebrow-sep">/</span> {dict.hero.eyebrow}
          </p>

          <h1 id="about-title">
            <span className="line">
              <span className="line-in" style={order(0)}>
                {dict.hero.im} {first}
              </span>
            </span>
            <span className="line">
              <span className="line-in" style={order(1)}>
                {second} <span className="outline">{rest.join(" ")}</span>
              </span>
            </span>
          </h1>

          <p className="hero-rotor" data-hero style={order(3)}>
            <span className="rotor-static">{dict.hero.build}</span>
            <HeroRotor key={locale} words={dict.hero.rotor} />
          </p>

          <p className="hero-copy" data-hero style={order(4)}>
            {dict.hero.copy}
          </p>

          <div className="hero-actions" data-hero style={order(5)} role="group" aria-label={dict.hero.actions}>
            <Link className="button button-primary" href="/#projects" data-magnetic>
              <span>{dict.hero.ctaProjects}</span>
              <Icon name="arrow-up-right" />
            </Link>
            <a
              className="button button-secondary"
              href={site.resumeFile}
              download={site.resumeDownloadName}
              type="application/pdf"
              data-magnetic
            >
              <span>{dict.hero.ctaCv}</span>
              <Icon name="download" />
            </a>
          </div>

          <ul className="hero-stats" data-hero style={order(6)}>
            {dict.hero.stats.map((stat) => (
              <li key={stat.value}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="portrait-area" data-hero style={order(2)}>
          <div className="portrait-blob" aria-hidden="true" />
          <div className="portrait-frame">
            <Image
              className="portrait"
              src={profile.portrait.src}
              alt={profile.portrait.alt[locale]}
              width={profile.portrait.width}
              height={profile.portrait.height}
              sizes="(min-width: 980px) 40vw, 0px"
              priority
            />
          </div>

          <span className="sticker sticker-1" aria-hidden="true">
            {dict.hero.stickerA}
          </span>
          <span className="sticker sticker-2" aria-hidden="true">
            {dict.hero.stickerB}
          </span>

          {site.availability.open ? (
            <Link className="spin-badge" href="/#contact" aria-label={site.availability.label[locale]}>
              <svg className="badge-text" viewBox="0 0 120 120" aria-hidden="true">
                <defs>
                  <path id="badgePath" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
                </defs>
                <text>
                  <textPath href="#badgePath">{site.availability.badgeText[locale]}</textPath>
                </text>
              </svg>
              <Icon name="arrow-up-right" className="badge-arrow" />
            </Link>
          ) : null}
        </div>
      </div>

      <Link className="scroll-hint" href="/#experience" data-hero style={order(7)} aria-label={dict.a11y.scrollToExplore}>
        <Icon name="arrow-down" />
        <span>{dict.hero.scroll}</span>
      </Link>
    </section>
  );
}
