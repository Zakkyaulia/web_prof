export const LOCALES = ["id", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/** A piece of content that exists in every supported language. */
export type L10n = Record<Locale, string>;
