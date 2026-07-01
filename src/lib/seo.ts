import type { Metadata } from "next";
import { localeNames, siteConfig, supportedLocales, type Locale } from "@/config/site";

export function localizedPath(locale: Locale, path = ""): string {
  const normalized = path ? `/${path.replace(/^\//, "").replace(/\/$/, "")}` : "";
  return `/${locale}${normalized}/`;
}

export function absoluteUrl(locale: Locale, path = ""): string {
  return `${siteConfig.siteUrl}${localizedPath(locale, path)}`;
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
  const other: Record<string, string> = {
    "content-language": localeNames[locale],
  };

  if (siteConfig.adsenseClientIsValid) {
    other["google-adsense-account"] = siteConfig.adsenseClient;
  }
  if (params.updated) {
    other["article:modified_time"] = params.updated;
  }

  return {
    title,
    description,
    alternates: { canonical: url, languages: { ...languages, "x-default": absoluteUrl("en", path) } },
    openGraph: { title, description, url, siteName: siteConfig.name, locale, type },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
    verification: siteConfig.googleSiteVerification
      ? { google: siteConfig.googleSiteVerification }
      : undefined,
    other,
  };
}
