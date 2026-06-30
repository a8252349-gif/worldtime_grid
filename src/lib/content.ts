import guideData from "@/data/guides.generated.json";
import type { Locale } from "@/config/site";

export type Guide = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  intro: string[];
  sections: Array<{ heading: string; paragraphs: string[] }>;
  table: string[][];
  checklist: string[];
  mistakes: string[];
  faqs: string[][];
  related: string[];
  updated: string;
  svg: { variant: number; caption: string };
};

export const guides = guideData as Guide[];
export const guideSlugs = [...new Set(guides.map((guide) => guide.slug))];

export function getGuide(locale: Locale, slug: string): Guide | undefined {
  return guides.find((guide) => guide.locale === locale && guide.slug === slug);
}

export function getGuides(locale: Locale): Guide[] {
  return guides.filter((guide) => guide.locale === locale);
}
