# SEO keyword map

Updated: 2026-06-30

## Page ownership

| Search intent | English | Korean | Japanese | Spanish | Primary route |
|---|---|---|---|---|---|
| Multi-city meeting planning | time zone meeting planner | 시간대 회의 플래너 | タイムゾーン会議プランナー | planificador de reuniones por zonas horarias | `/{lang}/planner/` |
| One-time conversion | time zone converter | 시간대 변환기, 시차 계산기 | タイムゾーン変換, 時差計算 | conversor de zonas horarias, diferencia horaria | `/{lang}/resources/time-converter/` |
| Shared business hours | working hours overlap calculator | 업무시간 겹침 계산 | 勤務時間の重なり | horarios laborales coincidentes | `/{lang}/resources/working-hours-overlap/` |
| Seasonal offset changes | daylight saving time checker | 서머타임 확인 | 夏時間チェッカー | comprobar horario de verano | `/{lang}/resources/dst-checker/` |
| Date relationship | international date line converter | 날짜 변경선 시간 비교 | 日付変更線の時刻比較 | línea internacional de cambio de fecha | `/{lang}/resources/date-line-visualizer/` |
| Offset education | UTC offset vs time zone | UTC 오프셋과 시간대 차이 | UTCオフセットとタイムゾーンの違い | diferencia entre desfase UTC y zona horaria | `/{lang}/resources/utc-offset-explainer/` |
| Educational scheduling questions | topic-specific long-tail query | 주제별 정보 검색 | テーマ別の情報検索 | consulta educativa específica | `/{lang}/guides/{topic}/` |

## Conflict prevention

- The planner is the only page optimized primarily for multi-participant meeting planning.
- The converter does not target the planner title; it focuses on converting a known date and time.
- The overlap page focuses on intersecting working intervals rather than general time conversion.
- Each guide targets a distinct question and links to a tool instead of reproducing the tool page's title and description.
- No automatically generated city-pair landing pages are included.

Research notes and sources are recorded in `KEYWORD_RESEARCH.md`.
