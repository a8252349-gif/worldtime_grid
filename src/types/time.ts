import type { Locale } from "@/config/site";

export type City = {
  id: string;
  name: Record<Locale, string>;
  englishName: string;
  country: Record<Locale, string>;
  zone: string;
  aliases: string[];
};

export type WorkSettings = {
  start: string;
  end: string;
  lunchStart: string;
  lunchEnd: string;
  preferredStart: string;
  preferredEnd: string;
  avoidStart: string;
  avoidEnd: string;
  weekdays: number[];
  weekendWork: boolean;
};

export type PlannerZone = {
  cityId: string;
  work: WorkSettings;
};

export type RecommendationLevel = "Best" | "Good" | "Possible" | "Poor";

export type ParticipantScore = {
  cityId: string;
  localIso: string;
  score: number;
  status: "preferred" | "working" | "outside" | "night" | "weekend" | "lunch";
  dayRelation: -1 | 0 | 1 | number;
};

export type Recommendation = {
  utcIso: string;
  endUtcIso: string;
  level: RecommendationLevel;
  totalScore: number;
  fairness: { kind: "balanced" } | { kind: "difficult"; cityId: string };
  participants: ParticipantScore[];
};
