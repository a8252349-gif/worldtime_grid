"use client";
import { useState } from "react";
import type { Locale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { uiCopy } from "@/data/uiCopy";

export function CookieBanner({ locale }: { locale: Locale }) {
  const [visible,setVisible]=useState(()=>typeof window!=="undefined"&&!localStorage.getItem("wtg-cookie-choice"));
  if(!visible||siteConfig.googleCmpEnabled||!siteConfig.adsenseScriptEnabled)return null;
  const copy=uiCopy[locale];
  const choose=(value:"accepted"|"rejected")=>{localStorage.setItem("wtg-cookie-choice",value);window.dispatchEvent(new Event("wtg-cookie-choice"));setVisible(false)};
  return <aside className="cookie-banner" aria-live="polite"><p>{copy.cookieMessage}</p><div className="button-row"><button className="button" type="button" onClick={()=>choose("accepted")}>{copy.accept}</button><button className="button-secondary" type="button" onClick={()=>choose("rejected")}>{copy.reject}</button></div></aside>;
}
