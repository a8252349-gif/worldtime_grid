export const supportedLocales = ["en", "ko", "ja", "es"] as const;
export type Locale = (typeof supportedLocales)[number];

export const siteConfig = {
  name: "WorldTime Grid",
  description:
    "Compare time zones, find overlapping working hours, and schedule international meetings without confusion.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  locales: supportedLocales,
  defaultLocale: "en" as Locale,
  defaultCityIds: ["seoul", "new-york", "london"],
  defaultWorkHours: { start: "09:00", end: "18:00", lunchStart: "12:00", lunchEnd: "13:00" },
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9328837907414732",
  adsenseScriptEnabled: process.env.NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED === "true",
  adsenseManualAdsEnabled: process.env.NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED === "true",
  showAdPlaceholders: process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === "true",
  googleCmpEnabled: process.env.NEXT_PUBLIC_GOOGLE_CMP_ENABLED === "true",
} as const;

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  es: "Español",
};
