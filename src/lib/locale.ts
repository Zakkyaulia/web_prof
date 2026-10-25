import { cookies, headers } from "next/headers";
import type { Locale } from "@/types/i18n";
import { getDictionary, type Dictionary } from "@/i18n";
import { LOCALE_COOKIE, isLocale, localeFromAcceptLanguage } from "./locale-config";

/**
 * Active language for the current request. The cookie written by the
 * language toggle wins; first-time visitors fall back to Accept-Language.
 * Because the server reads the same value the client wrote, the first HTML
 * is already in the right language and there is no hydration mismatch.
 */
export async function getLocale(): Promise<Locale> {
  const stored = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(stored)) return stored;
  return localeFromAcceptLanguage((await headers()).get("accept-language"));
}

export async function getI18n(): Promise<{ locale: Locale; dict: Dictionary }> {
  const locale = await getLocale();
  return { locale, dict: getDictionary(locale) };
}
