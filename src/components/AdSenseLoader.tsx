"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { siteConfig } from "@/config/site";
import { ADS_CONSENT_EVENT, ADS_CONSENT_STORAGE_KEY, ADSENSE_READY_EVENT } from "@/lib/adsense";

function hasCustomConsent(): boolean {
  return typeof window !== "undefined" && localStorage.getItem(ADS_CONSENT_STORAGE_KEY) === "accepted";
}

export function AdSenseLoader() {
  const [allowed, setAllowed] = useState(siteConfig.googleCmpEnabled);

  useEffect(() => {
    if (!siteConfig.adsenseScriptEnabled || siteConfig.googleCmpEnabled) return;
    const readChoice = () => setAllowed(hasCustomConsent());
    readChoice();
    window.addEventListener(ADS_CONSENT_EVENT, readChoice);
    return () => window.removeEventListener(ADS_CONSENT_EVENT, readChoice);
  }, []);

  if (!siteConfig.adsenseScriptEnabled || !siteConfig.adsenseClientIsValid || !allowed) return null;

  return (
    <Script
      id="worldtime-grid-adsense"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(siteConfig.adsenseClient)}`}
      onLoad={() => window.dispatchEvent(new Event(ADSENSE_READY_EVENT))}
    />
  );
}
