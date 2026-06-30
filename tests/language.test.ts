import { describe, expect, it } from "vitest";
import { detectPreferredLocale, switchLocalePath } from "@/lib/language";

describe("language routing", () => {
  it("uses a direct choice before stored and browser languages", () => expect(detectPreferredLocale({directChoice:"ko",storedChoice:"ja",languages:["es-ES"],language:"en-US"})).toBe("ko"));
  it("uses a stored choice before navigator languages", () => expect(detectPreferredLocale({storedChoice:"ja",languages:["ko-KR"],language:"es-ES"})).toBe("ja"));
  it.each([["ko-KR","ko"],["ja-JP","ja"],["es-MX","es"],["fr-FR","en"]])("maps %s to %s", (language,expected) => expect(detectPreferredLocale({languages:[language],language})).toBe(expected));
  it("preserves the current route when switching language", () => {
    expect(switchLocalePath("/ko/planner/","en")).toBe("/en/planner/");
    expect(switchLocalePath("/en/guides/time-zone-converter-guide/","es")).toBe("/es/guides/time-zone-converter-guide/");
  });
});
