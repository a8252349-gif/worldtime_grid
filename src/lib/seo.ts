import type { Metadata } from "next";
import { localeNames, siteConfig, supportedLocales, type Locale } from "@/config/site";

export function localizedPath(locale: Locale, path = ""): string {
  const normalized = path ? `/${path.replace(/^\//, "").replace(/\/$/, "")}` : "";
  return `/${locale}${normalized}/`;
}

export function absoluteUrl(locale: Locale, path = ""): string {
  return `${siteConfig.siteUrl.replace(/\/$/, "")}${localizedPath(locale, path)}`;
}

export function metadataFor(params: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  updated?: string;
}): Metadata {
  const { locale, title, description, path = "", type = "website" } = params;
  const url = absoluteUrl(locale, path);
  const languages = Object.fromEntries(supportedLocales.map((code) => [code, absoluteUrl(code, path)]));
  return {
    title,
    description,
    alternates: { canonical: url, languages: { ...languages, "x-default": absoluteUrl("en", path) } },
    openGraph: { title, description, url, siteName: siteConfig.name, locale, type },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
    other: {
      "google-adsense-account": siteConfig.adsenseClient,
      "content-language": localeNames[locale],
      ...(params.updated ? { "article:modified_time": params.updated } : {}),
    },
  };
}
