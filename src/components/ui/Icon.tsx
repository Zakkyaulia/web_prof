import type { SVGProps } from "react";

export type IconName =
  | "arrow-up-right"
  | "arrow-left"
  | "arrow-right"
  | "arrow-down"
  | "download"
  | "copy"
  | "check"
  | "menu"
  | "close"
  | "linkedin"
  | "github"
  | "instagram"
  | "whatsapp";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
}

const SOLID: Partial<Record<IconName, string>> = {
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5Zm-2.1 6.73h4.2V21h-4.2V10.23Zm6.24 0h4.02v1.47h.06c.56-1.06 1.93-1.73 3.98-1.73 4.25 0 5.04 2.8 5.04 6.44V21h-4.19v-4.08c0-.97-.02-2.23-1.36-2.23-1.37 0-1.58 1.07-1.58 2.16V21H9.12V10.23Z",
  github:
    "M12 .8C5.78.8.75 5.86.75 12.1c0 4.98 3.22 9.21 7.69 10.7.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.35-3.79-1.35-.51-1.31-1.25-1.66-1.25-1.66-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.17 1.72 1.17 1 .1 2.63.82 3.24.63.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.58 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.1 1.16.9-.25 1.86-.38 2.82-.38.96 0 1.92.13 2.82.38 2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.99.72.79 1.16 1.8 1.16 3.03 0 4.34-2.64 5.29-5.15 5.57.4.35.76 1.04.76 2.1v3.12c0 .3.2.65.78.54A11.29 11.29 0 0 0 23.25 12.1C23.25 5.86 18.22.8 12 .8Z",
  whatsapp:
    "M12.05 2.3a9.58 9.58 0 0 0-8.2 14.5L2.7 21.7l5.02-1.12A9.57 9.57 0 1 0 12.05 2.3Zm.01 2.06a7.5 7.5 0 0 1 6.43 11.34 7.48 7.48 0 0 1-9.85 2.63l-.35-.18-2.5.56.57-2.41-.2-.37a7.51 7.51 0 0 1 5.9-11.57Zm-2.44 3.7c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.74 2.78 4.3 3.78 2.13.84 2.57.67 3.03.63.46-.04 1.49-.61 1.7-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.17-.48-.3-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8.99-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.52.12-.12.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.38-.78-1.89-.2-.49-.41-.42-.57-.43h-.49Z",
};

export function Icon({ name, className = "", ...props }: IconProps) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false, ...props } as const;

  const solid = SOLID[name];
  if (solid) {
    return (
      <svg {...common} className={`icon icon-solid ${className}`.trim()}>
        <path d={solid} />
      </svg>
    );
  }

  const cls = `icon ${className}`.trim();
  switch (name) {
    case "arrow-up-right":
      return (
        <svg {...common} className={cls}>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...common} className={cls}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common} className={cls}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "arrow-down":
      return (
        <svg {...common} className={cls}>
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      );
    case "download":
      return (
        <svg {...common} className={cls}>
          <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
        </svg>
      );
    case "copy":
      return (
        <svg {...common} className={cls}>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} className={cls}>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common} className={cls}>
          <path d="M4 8h16M4 16h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common} className={cls}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} className={cls}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}
