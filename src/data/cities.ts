import type { Locale } from "@/config/site";
import type { City } from "@/types/time";
import generatedCities from "@/data/cities.generated.json";

export const cities = generatedCities as City[];

export const cityById: Record<string, City> = Object.fromEntries(cities.map((city) => [city.id, city]));
export const cityByZone: Record<string, City> = Object.fromEntries(cities.map((city) => [city.zone, city]));

export const ambiguousAbbreviations = new Set(["CST", "IST", "AST", "BST", "PST", "EST", "MST"]);

function normalizeSearchText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[’'`´._/\\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function citySearchTerms(city: City): string[] {
  return [
    city.id,
    city.englishName,
    city.zone,
    city.zone.replaceAll("_", " "),
    ...Object.values(city.name),
    ...Object.values(city.country),
    ...city.aliases,
  ];
}

function matchScore(city: City, query: string, locale: Locale): number | null {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return null;
  const localName = normalizeSearchText(city.name[locale]);
  const englishName = normalizeSearchText(city.englishName);
  const zone = normalizeSearchText(city.zone);
  const terms = citySearchTerms(city).map(normalizeSearchText).filter(Boolean);

  if (localName === normalizedQuery) return 0;
  if (englishName === normalizedQuery) return 1;
  if (terms.some((term) => term === normalizedQuery)) return 2;
  if (localName.startsWith(normalizedQuery)) return 3;
  if (englishName.startsWith(normalizedQuery)) return 4;
  if (terms.some((term) => term.startsWith(normalizedQuery))) return 5;
  if (zone.includes(normalizedQuery)) return 6;
  if (terms.some((term) => term.includes(normalizedQuery))) return 7;
  return null;
}

export function searchCities(query: string, locale: Locale): City[] {
  return cities
    .map((city) => ({ city, score: matchScore(city, query, locale) }))
    .filter((item): item is { city: City; score: number } => item.score !== null)
    .sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score;
      return a.city.name[locale].localeCompare(b.city.name[locale], locale);
    })
    .map((item) => item.city);
}

export function localizedCities(locale: Locale): City[] {
  return [...cities].sort((a, b) => a.name[locale].localeCompare(b.name[locale], locale));
}
