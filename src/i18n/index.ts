import type { Locale } from "@/types/i18n";
import { en, type Dictionary } from "./en";
import { id } from "./id";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, id };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
