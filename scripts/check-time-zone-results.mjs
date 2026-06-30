import { DateTime } from "luxon";
const cases=[
  ["Seoul winter offset",DateTime.fromISO("2026-01-15T09:00",{zone:"Asia/Seoul"}).offset,540],
  ["New York winter offset",DateTime.fromISO("2026-01-15T09:00",{zone:"America/New_York"}).offset,-300],
  ["New York summer offset",DateTime.fromISO("2026-07-15T09:00",{zone:"America/New_York"}).offset,-240],
  ["London winter offset",DateTime.fromISO("2026-01-15T09:00",{zone:"Europe/London"}).offset,0],
  ["London summer offset",DateTime.fromISO("2026-07-15T09:00",{zone:"Europe/London"}).offset,60],
  ["Date line relation",DateTime.fromISO("2026-06-29T12:00",{zone:"Pacific/Honolulu"}).toUTC().setZone("Pacific/Auckland").day,30]
];let fail=false;for(const [name,actual,expected] of cases){if(actual!==expected){console.error(`${name}: ${actual} !== ${expected}`);fail=true;}else console.log(`PASS ${name}: ${actual}`);}if(fail)process.exit(1);console.log("Time-zone result checks passed.");
