"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface CopyEmailProps {
  email: string;
  labels: { copy: string; copied: string; failed: string };
}

type Status = "idle" | "copied" | "failed";

/** Copy button plus a live-region notification. Rendered inside .contact-actions. */
export function CopyEmail({ email, labels }: CopyEmailProps) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2600);
  }

  return (
    <>
      <button type="button" className="copy-btn" onClick={copy} aria-label={labels.copy} data-magnetic>
        <Icon name={status === "copied" ? "check" : "copy"} />
      </button>
      <p className="copy-status" role="status">
        {status === "copied" ? labels.copied : status === "failed" ? labels.failed : ""}
      </p>
    </>
  );
}
