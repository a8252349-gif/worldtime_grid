"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { uiCopy } from "@/data/uiCopy";
import { ADS_CONSENT_EVENT, ADS_CONSENT_STORAGE_KEY } from "@/lib/adsense";

export function CookieBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setVisible(!localStorage.getItem(ADS_CONSENT_STORAGE_KEY)));
  }, []);

  if (!visible || siteConfig.googleCmpEnabled || !siteConfig.adsenseScriptEnabled) return null;

  const copy = uiCopy[locale];
  const choose = (value: "accepted" | "rejected") => {
    localStorage.setItem(ADS_CONSENT_STORAGE_KEY, value);
    window.dispatchEvent(new Event(ADS_CONSENT_EVENT));
    setVisible(false);
  };

  return (
    <aside className="cookie-banner" aria-live="polite">
      <p>{copy.cookieMessage}</p>
      <div className="button-row">
        <button className="button" type="button" onClick={() => choose("accepted")}>
          {copy.accept}
        </button>
        <button className="button-secondary" type="button" onClick={() => choose("rejected")}>
          {copy.reject}
        </button>
      </div>
    </aside>
  );
}
