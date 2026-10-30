"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  organization: string;
  period: string;
  previewUrl: string;
  pdfUrl: string;
  labels: {
    close: string;
    download: string;
    previewAlt: string;
  };
}

export function CertificateModal({
  isOpen,
  onClose,
  title,
  organization,
  period,
  previewUrl,
  pdfUrl,
  labels,
}: CertificateModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="cert-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} - ${organization}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="cert-lightbox-dialog">
        <header className="cert-lightbox-header">
          <div className="cert-lightbox-title-group">
            <h3 className="cert-lightbox-title">{title}</h3>
            <p className="cert-lightbox-sub">
              <span>{organization}</span>
              <span className="exp-dot-sep" aria-hidden="true">·</span>
              <span>{period}</span>
            </p>
          </div>

          <div className="cert-lightbox-actions">
            <a
              href={pdfUrl}
              download
              className="cert-lightbox-btn cert-lightbox-download"
              title={labels.download}
            >
              <Icon name="download" className="cert-modal-icon" aria-hidden="true" />
              <span>{labels.download}</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="cert-lightbox-btn cert-lightbox-close"
              aria-label={labels.close}
            >
              <Icon name="close" className="cert-modal-icon" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="cert-lightbox-body">
          <div className="cert-lightbox-image-wrap">
            <Image
              src={previewUrl}
              alt={`${labels.previewAlt} - ${organization}`}
              width={1200}
              height={848}
              priority
              className="cert-lightbox-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
