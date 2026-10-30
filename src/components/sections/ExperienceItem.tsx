"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { CertificateModal } from "./CertificateModal";
import type { ExperienceEntry } from "@/types/content";
import type { Locale } from "@/types/i18n";
import type { Dictionary } from "@/i18n";

interface ExperienceItemProps {
  entry: ExperienceEntry;
  index: number;
  locale: Locale;
  dict: Dictionary["experience"];
}

export function ExperienceItem({ entry, index, locale, dict }: ExperienceItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isCurrent = !entry.end;
  const hasCertificate = Boolean(entry.end && entry.certificate);
  const panelId = `cert-panel-${entry.id}`;

  return (
    <>
      <article className="timeline-item" style={{ "--i": index } as CSSProperties}>
        <span className="timeline-node" style={{ "--i": index } as CSSProperties} aria-hidden="true" />
        <div className="exp-when">
          <span className="timeline-date">
            {entry.start.slice(0, 4)}
            {isCurrent ? ` - ${dict.present}` : ""}
          </span>
          {isCurrent ? (
            <span className="exp-current">
              <span className="exp-dot" aria-hidden="true" /> {dict.current}
            </span>
          ) : null}
        </div>
        <div className="timeline-body">
          <h3 className="exp-title">{entry.role[locale]}</h3>
          <p className="exp-company">{entry.organization}</p>
          <p className="exp-meta">
            <span className="exp-type">{dict.types[entry.type]}</span>
            <span className="exp-dot-sep" aria-hidden="true">·</span>
            <time dateTime={entry.end ? `${entry.start}/${entry.end}` : `${entry.start}/`}>
              {entry.period[locale]}
            </time>
            <span className="exp-dot-sep" aria-hidden="true">·</span>
            {entry.location[locale]}
          </p>

          <div className="exp-bottom-row">
            <p className="exp-desc">{entry.summary[locale]}</p>
            {hasCertificate && (
              <button
                type="button"
                className="exp-cert-btn"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{dict.viewCertificate}</span>
                <Icon name="arrow-up-right" className="exp-cert-btn-arrow" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {hasCertificate && entry.certificate && (
          <div
            id={panelId}
            className="exp-cert-panel"
            data-open={isOpen}
            aria-hidden={!isOpen}
          >
            <div className="exp-cert-inner">
              <div className="exp-cert-content">
                <button
                  type="button"
                  className="exp-cert-thumb-wrap"
                  onClick={() => setIsModalOpen(true)}
                  aria-label={`${dict.openPdf} - ${entry.organization}`}
                >
                  <Image
                    src={entry.certificate.preview}
                    alt={`${dict.certificatePreviewAlt} - ${entry.organization}`}
                    width={283}
                    height={200}
                    className="exp-cert-thumb"
                  />
                  <span className="exp-cert-thumb-badge" aria-hidden="true">
                    <Icon name="arrow-up-right" />
                  </span>
                </button>
                <div className="exp-cert-info">
                  <h4 className="exp-cert-title">{dict.certificateCompletion}</h4>
                  <p className="exp-cert-period">{entry.period[locale]}</p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="exp-cert-pdf-btn"
                  >
                    <span>{dict.openPdf}</span>
                    <Icon name="arrow-up-right" className="exp-cert-pdf-icon" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </article>

      {hasCertificate && entry.certificate && (
        <CertificateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={dict.certificateCompletion}
          organization={entry.organization}
          period={entry.period[locale]}
          previewUrl={entry.certificate.preview}
          pdfUrl={entry.certificate.file}
          labels={{
            close: dict.closeModal,
            download: dict.downloadPdf,
            previewAlt: dict.certificatePreviewAlt,
          }}
        />
      )}
    </>
  );
}
