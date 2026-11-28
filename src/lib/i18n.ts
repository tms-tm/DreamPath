import { en } from "@/content/i18n/en";
import { ms } from "@/content/i18n/ms";
import type { UiDictionary } from "@/content/i18n/types";
import type { Locale } from "@/content/schemas";

export type { Locale, UiDictionary };

export const DEFAULT_LOCALE: Locale = "en";

const DICTIONARIES: Record<Locale, UiDictionary> = {
  en,
  ms,
};

export function getDictionary(locale: Locale = DEFAULT_LOCALE): UiDictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES.en;
}

export function pickLocalized<T>(i18n: { en: T; ms: T }, locale: Locale = DEFAULT_LOCALE): T {
  return locale === "ms" ? i18n.ms : i18n.en;
}
