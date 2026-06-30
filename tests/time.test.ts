import { describe, expect, it } from "vitest";
import { DateTime } from "luxon";
import { createIcs, detectDstTransition, findRecommendations, isWithinClockRange, localDateToUtc, scanDstTransitions } from "@/lib/time";

const work={start:"09:00",end:"18:00",lunchStart:"12:00",lunchEnd:"13:00",preferredStart:"10:00",preferredEnd:"16:00",avoidStart:"00:00",avoidEnd:"07:00",weekdays:[1,2,3,4,5],weekendWork:false};

describe("time-zone calculations",()=>{
  it("converts Seoul local time to the expected New York instant",()=>{const utc=localDateToUtc("2026-06-29","09:00","Asia/Seoul");expect(utc.toFormat("yyyy-LL-dd HH:mm")).toBe("2026-06-29 00:00");expect(utc.setZone("America/New_York").toFormat("yyyy-LL-dd HH:mm")).toBe("2026-06-28 20:00");});
  it("detects London offset transitions",()=>{const transitions=scanDstTransitions(2026,"Europe/London");expect(transitions.length).toBe(2);expect(detectDstTransition(transitions[0].date,"Europe/London")).toBe(true);});
  it("supports overnight work ranges",()=>{expect(isWithinClockRange(23*60,"22:00","06:00")).toBe(true);expect(isWithinClockRange(5*60,"22:00","06:00")).toBe(true);expect(isWithinClockRange(12*60,"22:00","06:00")).toBe(false);});
  it("finds recommendations for three cities",()=>{const result=findRecommendations({zones:[{cityId:"seoul",work},{cityId:"london",work},{cityId:"new-york",work}],date:"2026-06-29",durationMinutes:60,stepMinutes:30,days:1});expect(result.length).toBeGreaterThan(0);expect(DateTime.fromISO(result[0].utcIso).isValid).toBe(true);});
  it("creates escaped RFC-style ICS text",()=>{const ics=createIcs({title:"A, B; C",startUtcIso:"2026-06-29T00:00:00Z",endUtcIso:"2026-06-29T01:00:00Z",description:"Line 1\nLine 2"});expect(ics).toContain("BEGIN:VCALENDAR");expect(ics).toContain("SUMMARY:A\\, B\\; C");expect(ics).toContain("DESCRIPTION:Line 1\\nLine 2");expect(ics).toContain("DTSTART:20260629T000000Z");});
});
