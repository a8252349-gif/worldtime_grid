import { siteConfig } from "@/config/site";
export function AdSlot({ slot, label="Advertisement" }: { slot?: string; label?: string }) {
  if(!siteConfig.adsenseManualAdsEnabled||!slot)return siteConfig.showAdPlaceholders?<div className="ad-placeholder">{label} placeholder</div>:null;
  return <ins className="adsbygoogle" style={{display:"block"}} data-ad-client={siteConfig.adsenseClient} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" aria-label={label}/>;
}
