"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { ADS_CONSENT_EVENT, ADSENSE_READY_EVENT, consentAllowsAds } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdSlot({ slot, label = "Advertisement" }: { slot?: string; label?: string }) {
  const pushed = useRef(false);
  const normalizedSlot = slot?.trim() ?? "";
  const enabled =
    siteConfig.adsenseScriptEnabled &&
    siteConfig.adsenseManualAdsEnabled &&
    siteConfig.adsenseClientIsValid &&
    /^\d+$/.test(normalizedSlot);

  useEffect(() => {
    if (!enabled) return;

    const requestAd = () => {
      if (pushed.current || !consentAllowsAds()) return;
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushed.current = true;
      } catch {
        // AdSense may reject duplicate or unavailable requests; the page remains usable.
      }
    };

    requestAd();
    window.addEventListener(ADS_CONSENT_EVENT, requestAd);
    window.addEventListener(ADSENSE_READY_EVENT, requestAd);
    return () => {
      window.removeEventListener(ADS_CONSENT_EVENT, requestAd);
      window.removeEventListener(ADSENSE_READY_EVENT, requestAd);
    };
  }, [enabled]);

  if (!enabled) {
    return siteConfig.showAdPlaceholders ? (
      <div className="ad-placeholder" role="status" aria-label={label}>
        {label}
      </div>
    ) : null;
  }

  return (
    <div className="ad-container" aria-label={label}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={siteConfig.adsenseClient}
        data-ad-slot={normalizedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
