import type { Locale } from "@/types/i18n";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "./locale-config";

/**
 * Persists the chosen language in the browser. The server reads this cookie on
 * every request, so the first HTML of later visits is already localized.
 */
export function persistLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}
