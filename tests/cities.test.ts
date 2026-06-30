import { describe, expect, it } from "vitest";
import { cities, searchCities } from "@/data/cities";

describe("localized city search", () => {
  it("contains a broad IANA city and region index", () => {
    expect(cities.length).toBeGreaterThanOrEqual(400);
  });

  it.each([
    ["서울", "ko", "Asia/Seoul"],
    ["ソウル", "ja", "Asia/Seoul"],
    ["Seúl", "es", "Asia/Seoul"],
    ["도쿄", "ko", "Asia/Tokyo"],
    ["東京", "ja", "Asia/Tokyo"],
    ["Nueva York", "es", "America/New_York"],
    ["상하이", "ko", "Asia/Shanghai"],
  ] as const)("finds %s in %s", (query, locale, zone) => {
    expect(searchCities(query, locale)[0]?.zone).toBe(zone);
  });

  it("matches accents and IANA path formatting", () => {
    expect(searchCities("Sao Paulo", "es")[0]?.zone).toBe("America/Sao_Paulo");
    expect(searchCities("europe london", "en")[0]?.zone).toBe("Europe/London");
  });
});
