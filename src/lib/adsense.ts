import { siteConfig } from "@/config/site";

export const ADS_CONSENT_STORAGE_KEY = "wtg-cookie-choice";
export const ADS_CONSENT_EVENT = "wtg-cookie-choice";
export const ADSENSE_READY_EVENT = "wtg-adsense-ready";

export function consentAllowsAds(): boolean {
  if (siteConfig.googleCmpEnabled) return true;
  return typeof window !== "undefined" && localStorage.getItem(ADS_CONSENT_STORAGE_KEY) === "accepted";
}
