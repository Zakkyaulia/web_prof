import { LOCALES, type L10n, type Locale } from "@/types/i18n";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Picks the first supported language from an Accept-Language header. */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return DEFAULT_LOCALE;
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("id") || first.startsWith("in")) return "id";
  return DEFAULT_LOCALE;
}

/** Resolve a localized value for the active language. */
export function tr(value: L10n, locale: Locale): string {
  return value[locale];
}
