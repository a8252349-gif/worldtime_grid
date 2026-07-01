/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import type { Locale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { ambiguousAbbreviations, cities, cityById, searchCities } from "@/data/cities";
import { getDictionary } from "@/data/i18n";
import { uiCopy } from "@/data/uiCopy";
import { RelativeSlider } from "@/components/RelativeSlider";
import { createIcs, DEFAULT_WORK, detectDstTransition, findRecommendations, isWithinClockRange, localDateTime, utcOffsetLabel } from "@/lib/time";
import type { PlannerZone, Recommendation, WorkSettings } from "@/types/time";

const STORAGE_KEY = "worldtime-grid-planner-v1";
const PRESETS_KEY = "worldtime-grid-presets-v1";

type TimeFormat = "12" | "24";
type WindowHours = 24 | 48;
type StepMinutes = 15 | 30 | 60;
type SavedPreset = { id: string; name: string; zones: PlannerZone[] };

const durationPresets = [15, 30, 45, 60, 90, 120] as const;

function cloneWork(): WorkSettings {
  return { ...DEFAULT_WORK, weekdays: [...DEFAULT_WORK.weekdays] };
}

function initialZones(): PlannerZone[] {
  return siteConfig.defaultCityIds.map((cityId) => ({ cityId, work: cloneWork() }));
}

function relationLabel(value: number, d: ReturnType<typeof getDictionary>): string {
  if (value < 0) return d.previousDay as string;
  if (value > 0) return d.nextDay as string;
  return d.sameDay as string;
}

function statusLabel(status: string, d: ReturnType<typeof getDictionary>): string {
  const map: Record<string, string> = {
    preferred: d.preferred as string,
    working: d.working as string,
    lunch: d.lunch as string,
    outside: d.outside as string,
    night: d.night as string,
    weekend: d.weekend as string,
  };
  return map[status] || status;
}

function formatLocal(iso: string, zone: string, localeCode: string, format: TimeFormat, full = true): string {
  const dt = localDateTime(iso, zone).setLocale(localeCode);
  return dt.toLocaleString(full ? {
    weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: format === "24" ? "h23" : "h12",
  } : { hour: "2-digit", minute: "2-digit", hourCycle: format === "24" ? "h23" : "h12" });
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function Planner({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const d = getDictionary(locale);
  const copy = uiCopy[locale];
  const localeCode = d.locale as string;
  const [zones, setZones] = useState<PlannerZone[]>(initialZones);
  const [date, setDate] = useState(() => DateTime.local().toISODate() || "2026-06-29");
  const [duration, setDuration] = useState(60);
  const [format, setFormat] = useState<TimeFormat>("24");
  const [windowHours, setWindowHours] = useState<WindowHours>(24);
  const [step, setStep] = useState<StepMinutes>(30);
  const [rangeDays, setRangeDays] = useState(1);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUtc, setSelectedUtc] = useState("");
  const [meetingTitle, setMeetingTitle] = useState(d.meetingTitle as string);
  const [meetingLocation, setMeetingLocation] = useState("");
  const [presetName, setPresetName] = useState("");
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const zonesParam = params.get("zones");
    let loaded = false;
    if (zonesParam) {
      const parsed = zonesParam.split(",").map((zone) => cities.find((city) => city.zone === zone || city.id === zone)).filter(Boolean);
      if (parsed.length) {
        setZones(parsed.slice(0, 10).map((city) => ({ cityId: city!.id, work: cloneWork() })));
        loaded = true;
      }
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedPresets = localStorage.getItem(PRESETS_KEY);
    if (storedPresets) {
      try {
        const parsed = JSON.parse(storedPresets) as SavedPreset[];
        setSavedPresets(parsed.filter((preset) => preset.name && preset.zones?.length).slice(0, 12));
      } catch { localStorage.removeItem(PRESETS_KEY); }
    }
    if (!loaded && stored) {
      try {
        const value = JSON.parse(stored) as { zones?: PlannerZone[]; date?: string; duration?: number; format?: TimeFormat; windowHours?: WindowHours; step?: StepMinutes };
        if (value.zones?.length) setZones(value.zones.filter((item) => cityById[item.cityId]).slice(0, 10));
        if (value.date) setDate(value.date);
        if (value.duration) setDuration(value.duration);
        if (value.format) setFormat(value.format);
        if (value.windowHours) setWindowHours(value.windowHours);
        if (value.step) setStep(value.step);
      } catch { localStorage.removeItem(STORAGE_KEY); }
    }
    const dateParam = params.get("date");
    const timeParam = params.get("time");
    const durationParam = Number(params.get("duration"));
    const formatParam = params.get("format");
    if (dateParam) setDate(dateParam);
    if (timeParam && DateTime.fromISO(timeParam).isValid) setSelectedUtc(DateTime.fromISO(timeParam).toUTC().toISO() || "");
    if ([15,30,45,60,90,120].includes(durationParam)) setDuration(durationParam);
    if (formatParam === "12" || formatParam === "24") setFormat(formatParam);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ zones, date, duration, format, windowHours, step }));
  }, [zones, date, duration, format, windowHours, step, hydrated]);

  const firstZone = cityById[zones[0]?.cityId]?.zone || "UTC";
  const timelineStart = useMemo(() => DateTime.fromISO(date, { zone: firstZone }).startOf("day").toUTC(), [date, firstZone]);
  const slots = useMemo(() => {
    const count = (windowHours * 60) / step;
    return Array.from({ length: count }, (_, index) => timelineStart.plus({ minutes: index * step }));
  }, [timelineStart, windowHours, step]);

  useEffect(() => {
    if (!slots.length) return;
    const current = selectedUtc ? DateTime.fromISO(selectedUtc, { zone: "utc" }) : null;
    if (!current?.isValid || current < slots[0] || current >= slots[slots.length - 1].plus({ minutes: step })) {
      const defaultInstant = DateTime.fromISO(`${date}T10:00`, { zone: firstZone }).toUTC();
      setSelectedUtc(defaultInstant.toISO() || slots[0].toISO() || "");
    }
  }, [date, firstZone, slots, step, selectedUtc]);

  const selectedIndex = useMemo(() => {
    if (!selectedUtc || !slots.length) return 0;
    const selected = DateTime.fromISO(selectedUtc, { zone: "utc" });
    return Math.max(0, Math.min(slots.length - 1, Math.round(selected.diff(slots[0], "minutes").minutes / step)));
  }, [selectedUtc, slots, step]);

  const recommendations = useMemo(() => findRecommendations({ zones, date, durationMinutes: duration, stepMinutes: step, days: rangeDays, limit: compact ? 3 : 12 }), [zones, date, duration, step, rangeDays, compact]);
  const dstWarning = useMemo(() => zones.some((item) => detectDstTransition(date, cityById[item.cityId].zone)), [zones, date]);

  const searchResults = useMemo(() => searchCities(query, locale), [query, locale]);
  const selectedCityIds = useMemo(() => new Set(zones.map((item) => item.cityId)), [zones]);

  const ambiguous = ambiguousAbbreviations.has(query.trim().toUpperCase());

  function addCity(cityId: string) {
    if (zones.length >= 10) { setMessage(d.maxCities as string); return; }
    setZones((current) => [...current, { cityId, work: cloneWork() }]);
    setQuery("");
    setMessage("");
  }

  function saveCombination() {
    const name = presetName.trim() || zones.map((item) => cityById[item.cityId].englishName).join(" · ");
    const preset: SavedPreset = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.slice(0, 80),
      zones: zones.map((item) => ({ ...item, work: { ...item.work, weekdays: [...item.work.weekdays] } })),
    };
    const next = [preset, ...savedPresets].slice(0, 12);
    setSavedPresets(next);
    localStorage.setItem(PRESETS_KEY, JSON.stringify(next));
    setPresetName("");
    setMessage(d.combinationSaved as string);
  }

  function loadCombination(preset: SavedPreset) {
    setZones(preset.zones.filter((item) => cityById[item.cityId]).slice(0, 10).map((item) => ({ ...item, work: { ...item.work, weekdays: [...item.work.weekdays] } })));
    setMessage(`${d.selectedMeeting}: ${preset.name}`);
  }

  function deleteCombination(id: string) {
    const next = savedPresets.filter((preset) => preset.id !== id);
    setSavedPresets(next);
    localStorage.setItem(PRESETS_KEY, JSON.stringify(next));
    setMessage(d.combinationDeleted as string);
  }

  function updateWork(cityId: string, patch: Partial<WorkSettings>) {
    setZones((current) => current.map((item) => item.cityId === cityId ? { ...item, work: { ...item.work, ...patch } } : item));
  }

  function move(index: number, direction: -1 | 1) {
    setZones((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function setFromRecommendation(item: Recommendation) {
    setSelectedUtc(item.utcIso);
    setMessage(`${d.selectedMeeting}: ${formatLocal(item.utcIso, firstZone, localeCode, format)}`);
  }

  function copyShareLink() {
    const params = new URLSearchParams();
    params.set("zones", zones.map((item) => cityById[item.cityId].zone).join(","));
    params.set("date", date);
    params.set("time", selectedUtc);
    params.set("duration", String(duration));
    params.set("format", format);
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => setMessage(d.copied as string)).catch(() => setMessage(d.copyError as string));
  }

  function meetingText(mode: "plain" | "markdown" | "email" | "slack" | "calendar") {
    const title = d.shareTitle as string;
    const lines = zones.map((item) => {
      const city = cityById[item.cityId];
      const value = formatLocal(selectedUtc, city.zone, localeCode, format);
      return mode === "markdown" ? `- **${city.name[locale]}** — ${value}` : `${city.name[locale]} – ${value}`;
    });
    const durationLine = `${d.duration}: ${duration} ${d.minutes}`;
    if (mode === "email") return `${title}:\n\n${lines.join("\n")}\n${durationLine}\n\n${copy.confirmCalendar}`;
    if (mode === "slack") return `*${title}*\n${lines.join("\n")}\n${durationLine}`;
    if (mode === "calendar") return `${title} | ${lines.join(" | ")} | ${durationLine}`;
    return `${title}:\n${lines.join("\n")}\n${durationLine}`;
  }

  function copyText(mode: "plain" | "markdown" | "email" | "slack" | "calendar") {
    navigator.clipboard.writeText(meetingText(mode)).then(() => setMessage(d.copied as string)).catch(() => setMessage(d.copyError as string));
  }

  function downloadIcs() {
    const start = DateTime.fromISO(selectedUtc, { zone: "utc" });
    const content = createIcs({
      title: meetingTitle.trim() || (d.meetingTitle as string),
      startUtcIso: start.toISO() || "",
      endUtcIso: start.plus({ minutes: duration }).toISO() || "",
      description: meetingText("plain"),
      location: meetingLocation.trim(),
    });
    downloadFile(content, "worldtime-grid-meeting.ics", "text/calendar;charset=utf-8");
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    setZones(initialZones()); setDuration(60); setFormat("24"); setWindowHours(24); setStep(30); setRangeDays(1);
    setDate(DateTime.local().toISODate() || "2026-06-29");
    setMessage(d.resetDone as string);
  }

  const selected = selectedUtc ? DateTime.fromISO(selectedUtc, { zone: "utc" }) : timelineStart;

  return (
    <section className={compact ? "tool-panel" : "planner-shell"} aria-labelledby="planner-heading">
      <div className="planner-toolbar">
        <div className="field"><label htmlFor={`planner-date-${compact}`}>{d.date}</label><input id={`planner-date-${compact}`} type="date" value={date} onChange={(event) => setDate(event.target.value)} /></div>
        <div className="field"><label htmlFor={`duration-${compact}`}>{d.duration}</label><select id={`duration-${compact}`} value={durationPresets.includes(duration as typeof durationPresets[number]) ? duration : "custom"} onChange={(event) => { if (event.target.value !== "custom") setDuration(Number(event.target.value)); }}>{durationPresets.map((value) => <option key={value} value={value}>{value} {d.minutes}</option>)}<option value="custom">{d.customDuration}</option></select></div>
        <div className="field"><label htmlFor={`custom-duration-${compact}`}>{d.durationMinutes}</label><input id={`custom-duration-${compact}`} type="number" min="5" max="1440" step="5" value={duration} onChange={(event) => setDuration(Math.max(5, Math.min(1440, Number(event.target.value) || 5)))} /></div>
        <div className="field"><label htmlFor={`format-${compact}`}>{d.timeFormat}</label><select id={`format-${compact}`} value={format} onChange={(event) => setFormat(event.target.value as TimeFormat)}><option value="24">{copy.timeFormat24}</option><option value="12">{copy.timeFormat12}</option></select></div>
        {!compact && <div className="field"><label htmlFor="window-hours">{d.timeline}</label><select id="window-hours" value={windowHours} onChange={(event) => setWindowHours(Number(event.target.value) as WindowHours)}><option value="24">24 {d.hours}</option><option value="48">48 {d.hours}</option></select></div>}
        {!compact && <div className="field"><label htmlFor="step-minutes">{d.step}</label><select id="step-minutes" value={step} onChange={(event) => setStep(Number(event.target.value) as StepMinutes)}><option value="15">15 {d.minutes}</option><option value="30">30 {d.minutes}</option><option value="60">60 {d.minutes}</option></select></div>}
        <div className="field"><label htmlFor={`range-${compact}`}>{d.recommendations}</label><select id={`range-${compact}`} value={rangeDays} onChange={(event) => setRangeDays(Number(event.target.value))}><option value="1">{d.today}</option><option value="7">{d.next7}</option><option value="30">{d.next30}</option></select></div>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <label className="live-region" htmlFor={`city-search-${compact}`}>{d.addCity}</label>
          <input id={`city-search-${compact}`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={d.searchPlaceholder as string} autoComplete="off" />
        </div>
        <p className="small city-search-help">{d.citySearchHelp}</p>
        {query && <div className="search-results" role="listbox" aria-label={d.addCity as string}>
          {ambiguous && <div className="warning">{d.ambiguous}</div>}
          {searchResults.length > 0 && <p className="search-count" aria-live="polite">{locale === "ko" || locale === "ja" ? `${searchResults.length}${d.searchResultCount}` : `${searchResults.length} ${d.searchResultCount}`}</p>}
          {searchResults.map((city) => { const now = DateTime.utc(); const localNow = now.setZone(city.zone); const isAdded = selectedCityIds.has(city.id); return <button type="button" role="option" aria-selected={isAdded} disabled={isAdded} className="search-result" key={city.id} onClick={() => addCity(city.id)}><span><strong>{city.name[locale]}</strong>{city.englishName !== city.name[locale] && <span className="city-english-name"> · {city.englishName}</span>}<br/><span className="small">{city.country[locale]} · {city.zone}</span></span><span className="search-time"><strong>{isAdded ? d.alreadyAdded : formatLocal(now.toISO() || "", city.zone, localeCode, format)}</strong><br/><span className="small">{utcOffsetLabel(now.toISO() || "", city.zone)} · {localNow.isInDST ? d.dstOn : d.dstOff}</span></span></button> })}
          {!ambiguous && searchResults.length === 0 && <div className="card">{d.noResults}</div>}
        </div>}
      </div>

      {dstWarning && <p className="warning" role="alert">{d.dstWarning}</p>}
      <p className="small">{d.savedLocally}</p>

      {!compact && <fieldset className="preset-settings"><legend>{d.savedCombinations}</legend><div className="preset-save"><div className="field"><label htmlFor="preset-name">{d.presetName}</label><input id="preset-name" value={presetName} maxLength={80} onChange={(event) => setPresetName(event.target.value)} placeholder={zones.map((item) => cityById[item.cityId].name[locale]).join(" · ")} /></div><button className="button-secondary" type="button" onClick={saveCombination}>{d.saveCombination}</button></div>{savedPresets.length === 0 ? <p className="small">{d.noSavedCombinations}</p> : <div className="preset-list">{savedPresets.map((preset) => <div className="preset-item" key={preset.id}><span><strong>{preset.name}</strong><br/><span className="small">{preset.zones.map((item) => cityById[item.cityId]?.name[locale]).filter(Boolean).join(" · ")}</span></span><span className="icon-actions"><button className="button-secondary" type="button" onClick={() => loadCombination(preset)}>{d.loadCombination}</button><button className="icon-button" type="button" aria-label={`${d.deleteCombination} ${preset.name}`} onClick={() => deleteCombination(preset.id)}>×</button></span></div>)}</div>}</fieldset>}

      {!compact && <>
        <div className="range-row card">
          <RelativeSlider id="meeting-slider" label={d.adjustMeeting as string} min={0} max={Math.max(0, slots.length - 1)} step={1} value={selectedIndex} valueText={formatLocal(selected.toISO() || "", firstZone, localeCode, format)} onChange={(index) => setSelectedUtc(slots[index]?.toISO() || "")} />
          <strong>{formatLocal(selected.toISO() || "", firstZone, localeCode, format)}</strong>
        </div>
        <div className="planner-table-wrap">
          <table className="planner-table">
            <thead><tr><th scope="col">{d.city}</th><th scope="col">{d.localTime}</th><th scope="col">{d.timeline}</th></tr></thead>
            <tbody>{zones.map((item, index) => {
              const city = cityById[item.cityId];
              const nowIso = DateTime.utc().toISO() || "";
              return <tr key={item.cityId} draggable onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const from = Number(event.dataTransfer.getData("text/plain")); if (Number.isFinite(from) && from !== index) setZones((current) => { const next=[...current]; const [moved]=next.splice(from,1); next.splice(index,0,moved); return next; }); }}>
                <th scope="row"><div className="city-title"><span><strong>{city.name[locale]}</strong><br/><span className="city-meta">{city.country[locale]}<br/>{city.zone}<br/>{utcOffsetLabel(selected.toISO() || nowIso, city.zone)} · {localDateTime(selected.toISO() || nowIso, city.zone).isInDST ? d.dstOn : d.dstOff}</span></span><span className="icon-actions"><button type="button" className="icon-button" aria-label={`${d.moveUp} ${city.name[locale]}`} onClick={() => move(index,-1)}>↑</button><button type="button" className="icon-button" aria-label={`${d.moveDown} ${city.name[locale]}`} onClick={() => move(index,1)}>↓</button><button type="button" className="icon-button" aria-label={`${d.remove} ${city.name[locale]}`} onClick={() => setZones((current) => current.filter((zone) => zone.cityId !== item.cityId))}>×</button></span></div></th>
                <td><strong>{formatLocal(selected.toISO() || "", city.zone, localeCode, format)}</strong><br/><span className="badge">{relationLabel(Math.round(localDateTime(selected.toISO() || "", city.zone).startOf("day").diff(localDateTime(selected.toISO() || "", firstZone).startOf("day"),"days").days),d)}</span></td>
                <td><div className="time-cells">{slots.map((slot, slotIndex) => { const local=slot.setZone(city.zone); const minute=local.hour*60+local.minute; const weekend=local.weekday>5 && !item.work.weekendWork; const status=weekend?"outside":isWithinClockRange(minute,item.work.lunchStart,item.work.lunchEnd)?"lunch":isWithinClockRange(minute,item.work.preferredStart,item.work.preferredEnd)&&isWithinClockRange(minute,item.work.start,item.work.end)?"preferred":isWithinClockRange(minute,item.work.start,item.work.end)?"working":isWithinClockRange(minute,item.work.avoidStart,item.work.avoidEnd)?"night":"outside"; return <button type="button" key={slot.toMillis()} className={`time-cell ${status} ${slotIndex===selectedIndex?"selected":""}`} aria-label={`${city.name[locale]} ${formatLocal(slot.toISO() || "",city.zone,localeCode,format)} ${statusLabel(status,d)}`} onClick={() => setSelectedUtc(slot.toISO() || "")}><span>{formatLocal(slot.toISO() || "",city.zone,localeCode,format,false)}</span><br/><small>{local.setLocale(localeCode).toFormat("ccc d")}</small></button>})}</div></td>
              </tr>})}</tbody>
          </table>
        </div>

        {zones.map((item) => { const city=cityById[item.cityId]; return <fieldset className="work-settings" key={`settings-${item.cityId}`}><legend>{city.name[locale]} – {d.working}</legend>{([['start',d.workStart],['end',d.workEnd],['lunchStart',d.lunchStart],['lunchEnd',d.lunchEnd],['preferredStart',d.preferredStart],['preferredEnd',d.preferredEnd],['avoidStart',d.avoidStart],['avoidEnd',d.avoidEnd]] as const).map(([key,label]) => <div className="field" key={key}><label htmlFor={`${item.cityId}-${key}`}>{label}</label><input id={`${item.cityId}-${key}`} type="time" value={item.work[key]} onChange={(event) => updateWork(item.cityId,{[key]:event.target.value})}/></div>)}<div className="field" style={{gridColumn:'1/-1'}}><span>{d.weekdays}</span><div className="days">{(d.days as readonly string[]).map((label,dayIndex) => { const weekday=dayIndex+1; return <label className="day-chip" key={weekday}><input type="checkbox" checked={item.work.weekdays.includes(weekday)} onChange={(event) => updateWork(item.cityId,{weekdays:event.target.checked?[...item.work.weekdays,weekday].sort():item.work.weekdays.filter((day)=>day!==weekday)})}/>{label}</label>})}<label className="day-chip"><input type="checkbox" checked={item.work.weekendWork} onChange={(event)=>updateWork(item.cityId,{weekendWork:event.target.checked})}/>{d.weekendWork}</label></div></div></fieldset>})}
      </>}

      <h2 id="planner-heading">{d.recommendations}</h2>
      {zones.length < 2 ? <p>{d.noRecommendation}</p> : <div className="recommendation-grid">{recommendations.map((item) => <article className={`recommendation ${item.level}`} key={item.utcIso}><div className="city-title"><span className="badge">{({Best:d.best,Good:d.good,Possible:d.possible,Poor:d.poor} as Record<string,string>)[item.level]}</span><strong>{item.totalScore}/100</strong></div><h3>{DateTime.fromISO(item.utcIso,{zone:'utc'}).toFormat("yyyy-LL-dd HH:mm 'UTC'")}</h3><p><strong>{d.fairness}:</strong> {item.fairness.kind === "balanced" ? copy.fairnessBalanced : copy.fairnessDifficult(cityById[item.fairness.cityId].name[locale])}</p><ul className="participant-list">{item.participants.map((participant) => { const city=cityById[participant.cityId]; return <li key={participant.cityId}><strong>{city.name[locale]}</strong><br/>{formatLocal(item.utcIso,city.zone,localeCode,format)} · {statusLabel(participant.status,d)} · {relationLabel(participant.dayRelation,d)}</li>})}</ul><button className="button-secondary" type="button" onClick={() => setFromRecommendation(item)}>{d.select}</button></article>)}</div>}

      {!compact && <fieldset className="event-details"><legend>{d.meetingDetails}</legend><div className="field"><label htmlFor="meeting-title">{d.meetingTitleLabel}</label><input id="meeting-title" value={meetingTitle} maxLength={120} onChange={(event) => setMeetingTitle(event.target.value)} /></div><div className="field"><label htmlFor="meeting-location">{d.meetingLocation}</label><input id="meeting-location" value={meetingLocation} maxLength={500} onChange={(event) => setMeetingLocation(event.target.value)} placeholder="https://meet.example.com/…" /></div></fieldset>}

      <div className="button-row">
        <button className="button" type="button" onClick={downloadIcs}>{d.downloadIcs}</button>
        <button className="button-secondary" type="button" onClick={copyShareLink}>{d.copyLink}</button>
        <button className="button-secondary" type="button" onClick={() => copyText("plain")}>{d.plainCopy}</button>
        <button className="button-secondary" type="button" onClick={() => copyText("markdown")}>{d.markdownCopy}</button>
        <button className="button-secondary" type="button" onClick={() => copyText("email")}>{d.emailCopy}</button>
        <button className="button-secondary" type="button" onClick={() => copyText("slack")}>{d.slackCopy}</button>
        {!compact && <button className="button-secondary" type="button" onClick={reset}>{d.reset}</button>}
      </div>
      <p className="live-region" aria-live="polite">{message}</p>
      <p className="note">{d.limits}</p>
    </section>
  );
}
