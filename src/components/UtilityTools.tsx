"use client";

import { useMemo, useState } from "react";
import { DateTime } from "luxon";
import type { Locale } from "@/config/site";
import { cities, cityById } from "@/data/cities";
import { getDictionary } from "@/data/i18n";
import { uiCopy } from "@/data/uiCopy";
import { localDateToUtc, scanDstTransitions, utcOffsetLabel } from "@/lib/time";

function CitySelect({ value, onChange, id, locale }: { value: string; onChange: (value: string) => void; id: string; locale: Locale }) {
  return <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>{cities.map((city) => <option value={city.id} key={city.id}>{city.name[locale]} – {city.country[locale]}</option>)}</select>;
}

export function SingleConverter({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const [from, setFrom] = useState("seoul");
  const [to, setTo] = useState("new-york");
  const [date, setDate] = useState(DateTime.local().toISODate() || "2026-06-29");
  const [time, setTime] = useState("09:00");
  const result = useMemo(() => {
    const utc = localDateToUtc(date,time,cityById[from].zone);
    return utc.setZone(cityById[to].zone);
  },[from,to,date,time]);
  return <div className="tool-panel"><div className="grid-2"><div className="field"><label htmlFor="converter-from">{d.city}</label><CitySelect id="converter-from" value={from} onChange={setFrom} locale={locale}/></div><div className="field"><label htmlFor="converter-to">{d.city}</label><CitySelect id="converter-to" value={to} onChange={setTo} locale={locale}/></div><div className="field"><label htmlFor="converter-date">{d.date}</label><input id="converter-date" type="date" value={date} onChange={(e)=>setDate(e.target.value)}/></div><div className="field"><label htmlFor="converter-time">{d.localTime}</label><input id="converter-time" type="time" value={time} onChange={(e)=>setTime(e.target.value)}/></div></div><div className="result-box" aria-live="polite"><strong>{cityById[from].name[locale]}:</strong> {DateTime.fromISO(`${date}T${time}`,{zone:cityById[from].zone}).setLocale(d.locale as string).toFormat("cccc, yyyy-LL-dd HH:mm ZZZZ")}<br/><strong>{cityById[to].name[locale]}:</strong> {result.setLocale(d.locale as string).toFormat("cccc, yyyy-LL-dd HH:mm ZZZZ")}<br/><span className="small">{result.toUTC().toFormat("yyyy-LL-dd HH:mm 'UTC'")}</span></div></div>;
}

export function DstChecker({ locale }: { locale: Locale }) {
  const d=getDictionary(locale); const copy=uiCopy[locale]; const [cityId,setCityId]=useState("london"); const [year,setYear]=useState(DateTime.local().year);
  const changes=useMemo(()=>scanDstTransitions(year,cityById[cityId].zone),[year,cityId]);
  return <div className="tool-panel"><div className="grid-2"><div className="field"><label htmlFor="dst-city">{d.city}</label><CitySelect id="dst-city" value={cityId} onChange={setCityId} locale={locale}/></div><div className="field"><label htmlFor="dst-year">{copy.year}</label><input id="dst-year" type="number" min="1970" max="2100" value={year} onChange={(e)=>setYear(Number(e.target.value))}/></div></div><div className="result-box" aria-live="polite"><h3>{cityById[cityId].name[locale]} · {cityById[cityId].zone}</h3>{changes.length ? <ul>{changes.map(change=><li key={change.date}><strong>{change.date}</strong>: {change.from} → {change.to}</li>)}</ul>:<p>{copy.noOffsetChange}</p>}<p className="small">{d.limits}</p></div></div>;
}

export function DateLineVisualizer({ locale }: { locale: Locale }) {
  const d=getDictionary(locale); const [date,setDate]=useState(DateTime.local().toISODate() || "2026-06-29"); const [time,setTime]=useState("12:00"); const [base,setBase]=useState("honolulu");
  const utc=useMemo(()=>localDateToUtc(date,time,cityById[base].zone),[date,time,base]);
  const selected=["honolulu","auckland","seoul","los-angeles","london"];
  const baseDay=utc.setZone(cityById[base].zone).startOf("day");
  return <div className="tool-panel"><div className="grid-3"><div className="field"><label htmlFor="line-base">{d.city}</label><CitySelect id="line-base" value={base} onChange={setBase} locale={locale}/></div><div className="field"><label htmlFor="line-date">{d.date}</label><input id="line-date" type="date" value={date} onChange={e=>setDate(e.target.value)}/></div><div className="field"><label htmlFor="line-time">{d.localTime}</label><input id="line-time" type="time" value={time} onChange={e=>setTime(e.target.value)}/></div></div><div className="grid-3" style={{marginTop:16}}>{selected.map(id=>{const local=utc.setZone(cityById[id].zone);const relation=Math.round(local.startOf("day").diff(baseDay,"days").days);return <div className="card" key={id}><strong>{cityById[id].name[locale]}</strong><p>{local.setLocale(d.locale as string).toFormat("cccc, yyyy-LL-dd HH:mm")}</p><span className="badge">{relation<0?d.previousDay:relation>0?d.nextDay:d.sameDay}</span></div>})}</div></div>
}

export function OffsetExplainer({ locale }: { locale: Locale }) {
  const d=getDictionary(locale); const copy=uiCopy[locale]; const [cityId,setCityId]=useState("new-york"); const [winter,setWinter]=useState("2026-01-15"); const [summer,setSummer]=useState("2026-07-15");
  const zone=cityById[cityId].zone;
  const winterIso=DateTime.fromISO(winter,{zone}).toUTC().toISO() || ""; const summerIso=DateTime.fromISO(summer,{zone}).toUTC().toISO() || "";
  return <div className="tool-panel"><div className="field"><label htmlFor="offset-city">{d.city}</label><CitySelect id="offset-city" value={cityId} onChange={setCityId} locale={locale}/></div><div className="grid-2"><div className="field"><label htmlFor="winter-date">{copy.dateA}</label><input id="winter-date" type="date" value={winter} onChange={e=>setWinter(e.target.value)}/></div><div className="field"><label htmlFor="summer-date">{copy.dateB}</label><input id="summer-date" type="date" value={summer} onChange={e=>setSummer(e.target.value)}/></div></div><div className="result-box"><p><strong>{zone}</strong> {copy.namedZoneExplanation}</p><p>{winter}: <strong>{utcOffsetLabel(winterIso,zone)}</strong></p><p>{summer}: <strong>{utcOffsetLabel(summerIso,zone)}</strong></p><p className="small">{copy.fixedOffsetExplanation}</p></div></div>
}
