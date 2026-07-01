import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
  vi.resetModules();
});

describe("environment configuration", () => {
  it("normalizes the production origin and reads every public setting", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://meettimegrid.com/";
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = "hello@meettimegrid.com";
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION = "verification-token";
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-9328837907414732";
    process.env.NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED = " TRUE ";
    process.env.NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED = "1";
    process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS = "off";
    process.env.NEXT_PUBLIC_GOOGLE_CMP_ENABLED = "yes";
    process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT = "1111111111";
    process.env.NEXT_PUBLIC_ADSENSE_GUIDE_SLOT = "2222222222";
    process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT = "3333333333";
    process.env.NEXT_PUBLIC_ADSENSE_PLANNER_BOTTOM_SLOT = "4444444444";

    const { siteConfig } = await import("@/config/site");
    expect(siteConfig.siteUrl).toBe("https://meettimegrid.com");
    expect(siteConfig.contactEmail).toBe("hello@meettimegrid.com");
    expect(siteConfig.googleSiteVerification).toBe("verification-token");
    expect(siteConfig.adsenseScriptEnabled).toBe(true);
    expect(siteConfig.adsenseManualAdsEnabled).toBe(true);
    expect(siteConfig.googleCmpEnabled).toBe(true);
    expect(siteConfig.showAdPlaceholders).toBe(false);
    expect(siteConfig.adSlots).toEqual({
      home: "1111111111",
      guide: "2222222222",
      content: "3333333333",
      plannerBottom: "4444444444",
    });
  });

  it("renders a configured manual AdSense unit with the publisher and slot IDs", async () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-9328837907414732";
    process.env.NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED = "true";
    process.env.NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED = "true";
    process.env.NEXT_PUBLIC_GOOGLE_CMP_ENABLED = "true";
    vi.resetModules();

    const { AdSlot } = await import("@/components/AdSlot");
    const html = renderToString(React.createElement(AdSlot, { slot: "1234567890", label: "Advertisement" }));
    expect(html).toContain('class="adsbygoogle"');
    expect(html).toContain('data-ad-client="ca-pub-9328837907414732"');
    expect(html).toContain('data-ad-slot="1234567890"');
  });

  it("does not render an invalid or disabled manual ad unit", async () => {
    process.env.NEXT_PUBLIC_ADSENSE_SCRIPT_ENABLED = "false";
    process.env.NEXT_PUBLIC_ADSENSE_MANUAL_ADS_ENABLED = "true";
    process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS = "false";
    vi.resetModules();

    const { AdSlot } = await import("@/components/AdSlot");
    const html = renderToString(React.createElement(AdSlot, { slot: "not-a-slot" }));
    expect(html).toBe("");
  });
});
