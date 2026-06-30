import { supportedLocales, type Locale } from "@/config/site";

export const LANGUAGE_CHOICE_KEY = "worldtime-grid-language-choice";
export const LANGUAGE_STORAGE_KEY = "worldtime-grid-language";

export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  const code = value.trim().toLowerCase().split("-")[0];
  return supportedLocales.includes(code as Locale) ? code as Locale : null;
}

export function detectPreferredLocale(params: {
  directChoice?: string | null;
  storedChoice?: string | null;
  languages?: readonly string[];
  language?: string | null;
}): Locale {
  return normalizeLocale(params.directChoice)
    || normalizeLocale(params.storedChoice)
    || params.languages?.map(normalizeLocale).find((value): value is Locale => Boolean(value))
    || normalizeLocale(params.language)
    || "en";
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const parts = path.split("/");
  if (supportedLocales.includes(parts[1] as Locale)) parts[1] = locale;
  else parts.splice(1, 0, locale);
  const result = parts.join("/").replace(/\/+/g, "/");
  return result.endsWith("/") ? result : `${result}/`;
}
