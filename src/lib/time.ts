import { DateTime, IANAZone } from "luxon";
import { cityById } from "@/data/cities";
import type { ParticipantScore, PlannerZone, Recommendation, RecommendationLevel, WorkSettings } from "@/types/time";

export const DEFAULT_WORK: WorkSettings = {
  start: "09:00",
  end: "18:00",
  lunchStart: "12:00",
  lunchEnd: "13:00",
  preferredStart: "10:00",
  preferredEnd: "16:00",
  avoidStart: "00:00",
  avoidEnd: "07:00",
  weekdays: [1, 2, 3, 4, 5],
  weekendWork: false,
};

export function isValidZone(zone: string): boolean {
  return IANAZone.isValidZone(zone);
}

export function minutesFromClock(value: string): number {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

export function isWithinClockRange(minute: number, start: string, end: string): boolean {
  const s = minutesFromClock(start);
  const e = minutesFromClock(end);
  if (s === e) return true;
  if (s < e) return minute >= s && minute < e;
  return minute >= s || minute < e;
}

export function utcOffsetLabel(iso: string, zone: string): string {
  const dt = DateTime.fromISO(iso, { zone: "utc" }).setZone(zone);
  return `UTC${dt.toFormat("ZZ")}`;
}

export function localDateTime(iso: string, zone: string): DateTime {
  return DateTime.fromISO(iso, { zone: "utc" }).setZone(zone);
}

export function isDstAt(iso: string, zone: string): boolean {
  return localDateTime(iso, zone).isInDST;
}

export function dayRelation(iso: string, zone: string, referenceZone: string): number {
  const local = localDateTime(iso, zone).startOf("day");
  const reference = localDateTime(iso, referenceZone).startOf("day");
  return Math.round(local.diff(reference, "days").days);
}

export function localDateToUtc(date: string, time: string, zone: string): DateTime {
  return DateTime.fromISO(`${date}T${time}`, { zone }).toUTC();
}

export function detectDstTransition(date: string, zone: string): boolean {
  const start = DateTime.fromISO(date, { zone }).startOf("day");
  const end = start.endOf("day");
  return start.offset !== end.offset;
}

export function scanDstTransitions(year: number, zone: string): Array<{ date: string; from: string; to: string }> {
  const result: Array<{ date: string; from: string; to: string }> = [];
  let cursor = DateTime.fromObject({ year, month: 1, day: 1 }, { zone }).startOf("day");
  const end = cursor.endOf("year");
  while (cursor <= end) {
    const dayStart = cursor.startOf("day");
    const dayEnd = cursor.endOf("day");
    if (dayStart.offset !== dayEnd.offset) {
      result.push({
        date: cursor.toISODate() || "",
        from: `UTC${dayStart.toFormat("ZZ")}`,
        to: `UTC${dayEnd.toFormat("ZZ")}`,
      });
    }
    cursor = cursor.plus({ days: 1 });
  }
  return result;
}

function participantScore(utc: DateTime, item: PlannerZone, referenceZone: string): ParticipantScore {
  const city = cityById[item.cityId];
  const local = utc.setZone(city.zone);
  const minute = local.hour * 60 + local.minute;
  const weekdayAllowed = item.work.weekdays.includes(local.weekday) || item.work.weekendWork;
  const working = weekdayAllowed && isWithinClockRange(minute, item.work.start, item.work.end);
  const preferred = working && isWithinClockRange(minute, item.work.preferredStart, item.work.preferredEnd);
  const lunch = working && isWithinClockRange(minute, item.work.lunchStart, item.work.lunchEnd);
  const night = isWithinClockRange(minute, item.work.avoidStart, item.work.avoidEnd);

  let score = 0;
  let status: ParticipantScore["status"] = "outside";
  if (!weekdayAllowed) {
    score = 5;
    status = "weekend";
  } else if (night) {
    score = 0;
    status = "night";
  } else if (lunch) {
    score = 45;
    status = "lunch";
  } else if (preferred) {
    const center = (minutesFromClock(item.work.preferredStart) + minutesFromClock(item.work.preferredEnd)) / 2;
    const distance = Math.min(Math.abs(minute - center), 1440 - Math.abs(minute - center));
    score = Math.max(80, Math.round(100 - distance / 12));
    status = "preferred";
  } else if (working) {
    score = 65;
    status = "working";
  } else {
    score = 25;
    status = "outside";
  }

  return {
    cityId: item.cityId,
    localIso: local.toISO() || "",
    score,
    status,
    dayRelation: dayRelation(utc.toISO() || "", city.zone, referenceZone),
  };
}

function classify(participants: ParticipantScore[]): RecommendationLevel {
  if (participants.every((p) => p.status === "preferred")) return "Best";
  if (participants.every((p) => ["preferred", "working", "lunch"].includes(p.status))) return "Good";
  if (participants.some((p) => p.status === "night" || p.status === "weekend")) return "Poor";
  return "Possible";
}

function fairnessLabel(participants: ParticipantScore[]): Recommendation["fairness"] {
  const scores = participants.map((p) => p.score);
  const spread = Math.max(...scores) - Math.min(...scores);
  if (spread <= 15) return { kind: "balanced" };
  const lowest = participants.reduce((a, b) => (a.score < b.score ? a : b));
  return { kind: "difficult", cityId: lowest.cityId };
}

export function findRecommendations(params: {
  zones: PlannerZone[];
  date: string;
  durationMinutes: number;
  stepMinutes: number;
  days?: number;
  limit?: number;
}): Recommendation[] {
  const { zones, date, durationMinutes, stepMinutes, days = 1, limit = 12 } = params;
  if (!zones.length) return [];
  const firstZone = cityById[zones[0].cityId].zone;
  const start = DateTime.fromISO(date, { zone: firstZone }).startOf("day").toUTC();
  const end = start.plus({ days });
  const results: Recommendation[] = [];
  let cursor = start;
  while (cursor < end) {
    const endCursor = cursor.plus({ minutes: durationMinutes });
    const participants = zones.map((item) => participantScore(cursor, item, firstZone));
    const endParticipants = zones.map((item) => participantScore(endCursor.minus({ minutes: 1 }), item, firstZone));
    const combined = participants.map((p, index) => ({ ...p, score: Math.min(p.score, endParticipants[index].score) }));
    const totalScore = Math.round(combined.reduce((sum, p) => sum + p.score, 0) / combined.length);
    results.push({
      utcIso: cursor.toISO() || "",
      endUtcIso: endCursor.toISO() || "",
      level: classify(combined),
      totalScore,
      fairness: fairnessLabel(combined),
      participants: combined,
    });
    cursor = cursor.plus({ minutes: stepMinutes });
  }
  const rank: Record<RecommendationLevel, number> = { Best: 4, Good: 3, Possible: 2, Poor: 1 };
  return results
    .sort((a, b) => rank[b.level] - rank[a.level] || b.totalScore - a.totalScore || a.utcIso.localeCompare(b.utcIso))
    .slice(0, limit);
}

function escapeIcs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function foldIcsLine(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 73) return line;
  const pieces: string[] = [];
  let current = "";
  for (const char of line) {
    const next = current + char;
    if (new TextEncoder().encode(next).length > 73) {
      pieces.push(current);
      current = char;
    } else current = next;
  }
  if (current) pieces.push(current);
  return pieces.join("\r\n ");
}

export function createIcs(params: {
  title: string;
  startUtcIso: string;
  endUtcIso: string;
  description?: string;
  location?: string;
}): string {
  const format = (iso: string) => DateTime.fromISO(iso, { zone: "utc" }).toFormat("yyyyLLdd'T'HHmmss'Z'");
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@worldtime-grid.local`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WorldTime Grid//Meeting Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${format(DateTime.utc().toISO() || "")}`,
    `DTSTART:${format(params.startUtcIso)}`,
    `DTEND:${format(params.endUtcIso)}`,
    `SUMMARY:${escapeIcs(params.title || "International meeting")}`,
    `DESCRIPTION:${escapeIcs(params.description || "Created with WorldTime Grid")}`,
    `LOCATION:${escapeIcs(params.location || "")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(foldIcsLine).join("\r\n") + "\r\n";
}
