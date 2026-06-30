from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "src/data/guides.generated.json"
old = json.loads(DATA_PATH.read_text())
base_by_key = {(g["locale"], g["slug"]): g for g in old}
slugs = [g["slug"] for g in old if g["locale"] == "en"]


def L(en, ko, ja, es):
    return {"en": en, "ko": ko, "ja": ja, "es": es}

TOPICS = {
"time-zone-converter-guide": {
 "scenario": L(
  "a project lead in Seoul must compare a 09:00 briefing with colleagues in New York and London without losing the calendar date",
  "서울의 프로젝트 담당자가 오전 9시 브리핑을 뉴욕과 런던 동료의 시간으로 바꾸면서 현지 날짜까지 정확히 전달해야 하는 상황",
  "ソウルの担当者が午前9時の説明会をニューヨークとロンドンへ変換し、現地の日付まで正確に伝える場面",
  "una responsable de proyecto en Seúl necesita comparar una sesión de las 09:00 con Nueva York y Londres sin perder la fecha local"),
 "example": L(
  "On 14 October 2026, 09:00 in Asia/Seoul corresponds to 00:00 UTC; every destination should be rendered from that single instant rather than by subtracting memorized differences",
  "2026년 10월 14일 09:00 Asia/Seoul은 00:00 UTC에 해당하며, 외운 시차를 연쇄적으로 빼지 말고 이 한 순간을 기준으로 각 도시를 표시해야 합니다",
  "2026年10月14日09:00のAsia/Seoulは00:00 UTCに対応し、暗記した時差を順番に引くのではなく、その一つの瞬間から各都市を表示します",
  "El 14 de octubre de 2026, las 09:00 en Asia/Seoul corresponden a las 00:00 UTC; cada destino debe representarse desde ese único instante"),
 "risk": L(
  "a familiar city difference may be wrong a few weeks later when only one region changes daylight-saving status",
  "한 지역만 서머타임 상태를 바꾸면 평소 익숙했던 도시 간 시차가 몇 주 뒤에는 달라질 수 있다는 점",
  "一方の地域だけが夏時間へ移行すると、慣れた都市間の差が数週間後には変わる点",
  "una diferencia habitual entre ciudades puede dejar de ser válida cuando solo una región cambia de horario estacional"),
 "deliverable": L(
  "a conversion list that names the city, IANA zone, full local date, weekday, clock time and applicable UTC offset",
  "도시명, IANA 시간대, 전체 현지 날짜, 요일, 시각, 적용 UTC 오프셋을 함께 적은 변환 목록",
  "都市名、IANAゾーン、現地の完全な日付、曜日、時刻、適用UTCオフセットをまとめた変換一覧",
  "una lista que muestre ciudad, zona IANA, fecha local completa, día, hora y desfase UTC aplicable"),
 "terms": L(["reference instant","local rendering","date-specific offset"],["기준 순간","현지 표시","날짜별 오프셋"],["基準瞬間","現地表示","日付別オフセット"],["instante de referencia","representación local","desfase según la fecha"]),
},
"best-meeting-time": {
 "scenario": L(
  "six participants across Singapore, Berlin and Chicago need a sixty-minute decision meeting during the next seven days",
  "싱가포르·베를린·시카고의 참가자 6명이 다음 7일 안에 60분 의사결정 회의를 잡아야 하는 상황",
  "シンガポール、ベルリン、シカゴの6人が今後7日以内に60分の意思決定会議を設定する場面",
  "seis participantes en Singapur, Berlín y Chicago necesitan una reunión decisoria de sesenta minutos durante los próximos siete días"),
 "example": L(
  "The planner can score every thirty-minute candidate by checking the complete meeting interval against each participant's preferred, acceptable and avoided hours",
  "플래너는 30분 단위 후보마다 회의 시작부터 종료까지를 각 참가자의 선호·허용·회피 시간과 비교해 평가할 수 있습니다",
  "プランナーは30分ごとの候補について、会議の開始から終了までを各参加者の希望、許容、回避時間と照合できます",
  "El planificador puede puntuar cada candidato de treinta minutos comparando todo el intervalo con las horas preferidas, aceptables y evitadas de cada persona"),
 "risk": L(
  "choosing the first technical overlap can repeatedly place the same office at dawn or late evening",
  "처음 발견한 겹치는 시간만 선택하면 같은 지역이 계속 새벽이나 늦은 저녁을 부담할 수 있다는 점",
  "最初に見つかった重複だけを選ぶと、同じ拠点が毎回早朝や深夜を負担する点",
  "elegir la primera coincidencia técnica puede condenar siempre a la misma oficina al amanecer o a la noche"),
 "deliverable": L(
  "a ranked shortlist showing local start and end times, convenience labels, day relations and a plain-language fairness note",
  "현지 시작·종료 시각, 편의 등급, 날짜 관계, 쉬운 공정성 설명을 포함한 추천 후보 목록",
  "現地の開始・終了、利便性ラベル、日付関係、分かりやすい公平性メモを含む候補一覧",
  "una lista ordenada con inicio y final local, etiquetas de conveniencia, relación de fechas y una nota clara de equidad"),
 "terms": L(["candidate ranking","complete interval","fairness rotation"],["후보 순위","전체 회의 구간","불편 시간 순환"],["候補順位","会議全体の区間","負担の交代"],["clasificación de candidatos","intervalo completo","rotación de la carga"]),
},
"daylight-saving-meetings": {
 "scenario": L(
  "a recurring call links London, New York and Seoul during the weeks when Europe and North America change clocks on different dates",
  "유럽과 북미가 서로 다른 날짜에 시계를 바꾸는 기간에 런던·뉴욕·서울 정기회의를 운영하는 상황",
  "欧州と北米が異なる日に時計を変更する時期に、ロンドン、ニューヨーク、ソウルの定例会議を行う場面",
  "una llamada recurrente une Londres, Nueva York y Seúl durante las semanas en que Europa y Norteamérica cambian el reloj en fechas distintas"),
 "example": L(
  "A meeting fixed at 15:00 UTC remains one UTC instant, but its local clock label can move by one hour for some participants after a transition",
  "15:00 UTC로 고정한 회의는 같은 순간을 유지하지만 전환 이후 일부 참가자의 현지 시계 표시는 한 시간 달라질 수 있습니다",
  "15:00 UTCに固定した会議は同じ瞬間ですが、移行後には一部参加者の現地表示が1時間動くことがあります",
  "Una reunión fijada a las 15:00 UTC conserva el mismo instante, pero la etiqueta local puede desplazarse una hora para algunos participantes"),
 "risk": L(
  "a recurring invitation may silently preserve either UTC time or local wall time, producing different expectations after a transition",
  "반복 초대가 UTC 순간을 고정하는지 현지 시각을 고정하는지에 따라 전환 후 결과가 달라질 수 있다는 점",
  "定期招待がUTCの瞬間を固定するのか現地の壁時計を固定するのかで、移行後の結果が変わる点",
  "una invitación recurrente puede conservar el instante UTC o la hora local y generar expectativas distintas tras la transición"),
 "deliverable": L(
  "a transition calendar that marks affected occurrences, old and new local labels, and the owner responsible for confirming the series",
  "영향받는 회차, 변경 전후 현지 시각, 반복 일정 확인 담당자를 표시한 전환 캘린더",
  "影響する回、変更前後の現地時刻、シリーズ確認担当者を示す移行カレンダー",
  "un calendario de transición que marque las ocurrencias afectadas, las horas locales antiguas y nuevas y la persona responsable de confirmar la serie"),
 "terms": L(["clock transition","recurrence rule","temporary offset gap"],["시계 전환","반복 규칙","일시적 시차 변화"],["時計移行","繰り返し規則","一時的な時差"],["cambio de reloj","regla de recurrencia","brecha temporal de desfase"]),
},
"utc-offset-vs-time-zone": {
 "scenario": L(
  "an operations document says only UTC-5 even though the team actually works in New York and expects future meetings to follow regional clock rules",
  "운영 문서에는 UTC-5만 적혀 있지만 실제 팀은 뉴욕에서 근무하며 미래 일정에 지역 시계 규칙이 적용되어야 하는 상황",
  "運用文書にはUTC-5とだけ書かれている一方、実際のチームはニューヨークで働き、将来の予定には地域の規則が必要な場面",
  "un documento operativo dice solo UTC-5 aunque el equipo trabaja en Nueva York y espera que las reuniones futuras sigan las reglas regionales"),
 "example": L(
  "UTC+09:00 describes a numerical displacement at an instant, while Asia/Seoul identifies a rule set that software can apply to a selected date",
  "UTC+09:00은 한 순간의 수치 차이를 뜻하지만 Asia/Seoul은 소프트웨어가 선택 날짜에 적용할 규칙 집합을 식별합니다",
  "UTC+09:00はある瞬間の数値差を示しますが、Asia/Seoulは選択日に適用できる規則集合を識別します",
  "UTC+09:00 describe un desplazamiento numérico en un instante, mientras Asia/Seoul identifica un conjunto de reglas aplicable a una fecha"),
 "risk": L(
  "storing only an offset discards regional history and future daylight-saving behavior, so a saved appointment can drift from local expectations",
  "오프셋만 저장하면 지역의 과거·미래 규칙을 잃어 저장된 일정이 현지 기대 시각과 어긋날 수 있다는 점",
  "オフセットだけを保存すると地域の履歴と将来規則を失い、保存済み予定が現地の期待からずれる点",
  "guardar solo un desfase elimina la historia y las reglas futuras, por lo que una cita puede alejarse de la expectativa local"),
 "deliverable": L(
  "a data model that stores an IANA zone and an instant, using the offset only as a human-readable diagnostic",
  "IANA 시간대와 기준 순간을 저장하고 오프셋은 사람이 확인하는 진단 정보로만 사용하는 데이터 구조",
  "IANAゾーンと瞬間を保存し、オフセットは人が確認する診断表示として使うデータモデル",
  "un modelo que guarde la zona IANA y el instante, usando el desfase solo como diagnóstico legible"),
 "terms": L(["numeric displacement","regional rule set","wall-clock expectation"],["수치 차이","지역 규칙 집합","현지 시계 기대"],["数値差","地域規則集合","現地時計の期待"],["desplazamiento numérico","reglas regionales","expectativa de reloj local"]),
},
"asia-europe-north-america": {
 "scenario": L(
  "a product group in Seoul, Madrid and San Francisco must meet without assuming that one permanent hour will be comfortable in all three regions",
  "서울·마드리드·샌프란시스코의 제품팀이 한 시각이 세 지역 모두에 늘 편할 것이라고 가정하지 않고 회의를 잡는 상황",
  "ソウル、マドリード、サンフランシスコの製品チームが、一つの固定時刻が常に全地域へ快適だと仮定せず会議を組む場面",
  "un equipo de producto en Seúl, Madrid y San Francisco debe reunirse sin suponer que una hora fija será cómoda para las tres regiones"),
 "example": L(
  "A Europe-afternoon candidate may be evening in East Asia and early morning on the American west coast, so the duration and weekday must be checked together",
  "유럽 오후 후보는 동아시아 저녁이면서 미국 서부의 이른 아침일 수 있으므로 회의 길이와 요일까지 함께 확인해야 합니다",
  "欧州の午後候補は東アジアの夜、米国西海岸の早朝になり得るため、時間と曜日を同時に確認します",
  "Una opción por la tarde europea puede ser noche en Asia oriental y primera hora en la costa oeste americana; hay que revisar duración y día"),
 "risk": L(
  "the narrow overlap encourages organizers to ignore lunch, commuting, school-run or handover constraints that are not visible in a basic world clock",
  "겹치는 시간이 좁다는 이유로 단순 세계시계에는 보이지 않는 점심·출퇴근·돌봄·인수인계 제약을 무시할 수 있다는 점",
  "重複が狭いため、世界時計には見えない昼食、通勤、育児、引き継ぎの制約を無視しやすい点",
  "la franja estrecha puede llevar a ignorar comida, desplazamientos, cuidados o relevos que un reloj mundial no muestra"),
 "deliverable": L(
  "a regional matrix with at least three candidate slots and an explicit rotation plan for early and late burdens",
  "최소 3개 후보와 이른·늦은 시간 부담의 순환 계획을 포함한 지역별 비교표",
  "少なくとも3候補と早朝・夜間負担の交代計画を含む地域マトリクス",
  "una matriz regional con al menos tres opciones y un plan explícito para rotar las cargas tempranas y tardías"),
 "terms": L(["three-region overlap","regional burden","rotation schedule"],["3개 권역 겹침","지역별 부담","순환 일정"],["三地域の重複","地域負担","交代日程"],["coincidencia de tres regiones","carga regional","calendario rotativo"]),
},
"working-hours-overlap": {
 "scenario": L(
  "a remote support team has standard daytime staff, a 22:00–06:00 night shift and different weekend rules across five offices",
  "5개 사무소에 일반 주간 근무자와 22:00~06:00 야간 근무자, 서로 다른 주말 규칙이 함께 있는 원격 지원팀 상황",
  "5拠点のリモートサポートに日勤、22:00〜06:00の夜勤、異なる週末規則が混在する場面",
  "un equipo remoto de soporte combina personal diurno, un turno de 22:00 a 06:00 y reglas de fin de semana distintas en cinco oficinas"),
 "example": L(
  "Each local interval should be projected onto UTC, split correctly when it crosses midnight, and intersected only after lunch and blocked periods are removed",
  "각 현지 업무구간을 UTC로 투영하고 자정을 넘으면 정확히 나눈 뒤 점심과 차단 시간을 제외한 후에 교집합을 계산해야 합니다",
  "各現地区間をUTCへ投影し、日付をまたぐ場合は正しく分割し、昼休みと除外時間を引いた後で交差を求めます",
  "Cada intervalo local debe proyectarse a UTC, dividirse al cruzar medianoche e intersectarse después de retirar comidas y periodos bloqueados"),
 "risk": L(
  "testing only the start time can approve a sixty-minute meeting whose final thirty minutes fall outside someone's shift",
  "시작 시각만 검사하면 60분 회의의 마지막 30분이 누군가의 근무시간 밖인데도 승인될 수 있다는 점",
  "開始時刻だけを見ると、60分会議の後半30分が誰かの勤務外でも承認される点",
  "comprobar solo el inicio puede aceptar una reunión de sesenta minutos cuyo final queda fuera del turno de alguien"),
 "deliverable": L(
  "a set of UTC intervals with participant-level reasons for every accepted or rejected candidate",
  "각 후보가 채택되거나 제외된 이유를 참가자별로 보여주는 UTC 공통 구간 목록",
  "各候補の採否理由を参加者別に示すUTC共通区間一覧",
  "un conjunto de intervalos UTC con razones por participante para cada candidato aceptado o rechazado"),
 "terms": L(["interval intersection","overnight shift","end-time validation"],["구간 교집합","야간 근무","종료 시각 검증"],["区間の交差","夜勤","終了時刻検証"],["intersección de intervalos","turno nocturno","validación del final"]),
},
"international-date-line": {
 "scenario": L(
  "a Monday afternoon in Los Angeles is already Tuesday morning in Auckland, creating different weekdays inside the same invitation",
  "로스앤젤레스의 월요일 오후가 오클랜드에서는 이미 화요일 아침이라 하나의 초대장에 서로 다른 요일이 생기는 상황",
  "ロサンゼルスの月曜午後がオークランドでは火曜朝となり、一つの招待に異なる曜日が現れる場面",
  "una tarde de lunes en Los Ángeles ya es martes por la mañana en Auckland, de modo que una invitación contiene días distintos"),
 "example": L(
  "The correct comparison begins with one UTC instant and labels each city as previous day, same day or next day relative to the organizer's selected date",
  "한 UTC 순간을 기준으로 삼고 주최자가 선택한 날짜와 비교해 각 도시를 전날·당일·다음 날로 표시하는 것이 올바른 방법입니다",
  "一つのUTC瞬間を基準にし、主催者の日付に対して各都市を前日、同日、翌日と表示します",
  "La comparación correcta parte de un instante UTC y marca cada ciudad como día anterior, mismo día o día siguiente respecto a la fecha del organizador"),
 "risk": L(
  "writing only Tuesday at 09:00 can cause the American participant to search the wrong calendar day or miss a deadline by twenty-four hours",
  "화요일 09:00만 적으면 미주 참가자가 잘못된 날짜를 찾거나 마감일을 24시간 착각할 수 있다는 점",
  "火曜09:00だけでは、米州の参加者が誤った日を探したり締切を24時間違えたりする点",
  "escribir solo martes a las 09:00 puede hacer que una persona en América busque el día equivocado o falle un plazo por veinticuatro horas"),
 "deliverable": L(
  "a date-line view that prints the full date, weekday and relative-day badge beside every local time",
  "각 현지 시각 옆에 전체 날짜·요일·날짜 관계 배지를 표시한 날짜 변경선 보기",
  "各現地時刻の横に完全な日付、曜日、相対日ラベルを示す日付変更線ビュー",
  "una vista de la línea de fecha que imprima fecha completa, día y etiqueta relativa junto a cada hora local"),
 "terms": L(["relative day","calendar boundary","single instant"],["날짜 관계","달력 경계","동일 순간"],["相対日","暦の境界","同一瞬間"],["día relativo","límite de calendario","instante único"]),
},
"12-vs-24-hour-time": {
 "scenario": L(
  "an email says 7:30 without AM, PM or a twenty-four-hour label, and recipients in several countries interpret it differently",
  "이메일에 오전·오후나 24시간제 표시 없이 7:30만 적혀 여러 국가의 수신자가 다르게 해석하는 상황",
  "メールにAM、PM、24時間表記なしで7:30とだけ書かれ、複数国の受信者が異なる解釈をする場面",
  "un correo dice 7:30 sin AM, PM ni formato de veinticuatro horas, y personas de varios países lo interpretan de forma distinta"),
 "example": L(
  "07:30 and 19:30 are unambiguous in twenty-four-hour notation, while 7:30 AM and 7:30 PM require the marker to stay attached in every copied message",
  "24시간제의 07:30과 19:30은 명확하지만 12시간제에서는 7:30 AM과 7:30 PM의 표시가 모든 복사 문구에 유지되어야 합니다",
  "24時間表記の07:30と19:30は明確ですが、12時間表記では7:30 AMと7:30 PMの記号を必ず保持します",
  "07:30 y 19:30 son inequívocas en formato de veinticuatro horas; 7:30 AM y 7:30 PM necesitan conservar siempre el indicador"),
 "risk": L(
  "interfaces may localize punctuation or omit the period markers, and screen readers can announce compact labels in unexpected ways",
  "인터페이스가 구두점이나 오전·오후 표기를 다르게 현지화하고 스크린리더가 축약 표기를 예상과 다르게 읽을 수 있다는 점",
  "画面が句読点や午前・午後記号を別形式にし、スクリーンリーダーが短縮表記を予想外に読む点",
  "las interfaces pueden localizar la puntuación u omitir marcadores, y los lectores de pantalla pueden anunciar abreviaturas de forma inesperada"),
 "deliverable": L(
  "a communication style that combines a clear clock format with full date, time zone and a local-time list for international recipients",
  "명확한 시각 형식에 전체 날짜·시간대·지역별 시각 목록을 결합한 국제 커뮤니케이션 표기법",
  "明確な時刻形式に完全な日付、タイムゾーン、地域別時刻一覧を組み合わせた国際表記",
  "un estilo que combine formato claro, fecha completa, zona horaria y lista de horas locales para destinatarios internacionales"),
 "terms": L(["clock notation","meridiem marker","localized display"],["시각 표기","오전·오후 표시","현지화 표시"],["時刻表記","午前午後記号","ローカライズ表示"],["notación horaria","marcador de meridiano","visualización localizada"]),
},
"calendar-events-multiple-zones": {
 "scenario": L(
  "an organizer wants one calendar file that opens correctly for attendees in Tokyo, Dubai and Toronto",
  "주최자가 도쿄·두바이·토론토 참석자의 캘린더에서 각각 올바르게 열리는 하나의 일정 파일을 만들려는 상황",
  "主催者が東京、ドバイ、トロントの参加者に正しく表示される一つのカレンダーファイルを作る場面",
  "una organizadora quiere un único archivo de calendario que se abra correctamente en Tokio, Dubái y Toronto"),
 "example": L(
  "The ICS event can store DTSTART and DTEND in UTC, escape commas, semicolons and new lines, and let each calendar render the recipient's local display",
  "ICS 일정은 DTSTART와 DTEND를 UTC로 저장하고 쉼표·세미콜론·줄바꿈을 이스케이프한 뒤 각 캘린더가 수신자의 현지 시각으로 표시하게 할 수 있습니다",
  "ICSはDTSTARTとDTENDをUTCで保存し、カンマ、セミコロン、改行をエスケープし、各カレンダーに現地表示を任せます",
  "El evento ICS puede guardar DTSTART y DTEND en UTC, escapar comas, puntos y coma y saltos, y dejar que cada calendario represente la hora local"),
 "risk": L(
  "an invalid line break, unescaped title or wrong end instant can make imports fail or create a meeting with the wrong duration",
  "잘못된 줄바꿈·이스케이프되지 않은 제목·오류 난 종료 순간 때문에 가져오기가 실패하거나 회의 길이가 달라질 수 있다는 점",
  "不正な改行、未エスケープの題名、誤った終了瞬間によりインポート失敗や時間違いが起こる点",
  "un salto inválido, un título sin escapar o un final incorrecto puede romper la importación o crear una duración equivocada"),
 "deliverable": L(
  "a standards-aware ICS file plus a human-readable preview listing every participant city before download",
  "다운로드 전에 모든 참가 도시를 보여주는 사람이 읽을 수 있는 미리보기와 형식 규칙을 지킨 ICS 파일",
  "ダウンロード前に全都市を示す人間向けプレビューと、形式に従ったICSファイル",
  "un archivo ICS compatible con el formato y una vista previa legible que enumere todas las ciudades antes de descargar"),
 "terms": L(["UTC event instant","ICS escaping","calendar import"],["UTC 일정 순간","ICS 이스케이프","캘린더 가져오기"],["UTCイベント瞬間","ICSエスケープ","カレンダー取込"],["instante UTC del evento","escape ICS","importación de calendario"]),
},
"fair-global-meetings": {
 "scenario": L(
  "a distributed leadership meeting has favored European afternoons for months, leaving East Asia late at night and western North America before dawn",
  "분산 리더십 회의가 수개월간 유럽 오후를 선호해 동아시아는 늦은 밤, 북미 서부는 새벽을 반복 부담한 상황",
  "分散型リーダー会議が数か月欧州午後に偏り、東アジアは深夜、北米西部は早朝を繰り返し負担する場面",
  "una reunión directiva distribuida ha favorecido durante meses la tarde europea, dejando a Asia oriental de noche y al oeste norteamericano antes del amanecer"),
 "example": L(
  "A simple fairness log can record who met inside preferred hours, who accepted an edge hour, and who carried a night penalty for each occurrence",
  "간단한 공정성 기록표에 회차마다 선호시간 참가자, 경계시간 부담자, 심야 부담자를 표시할 수 있습니다",
  "簡単な公平性ログで、各回の希望時間内、境界時間、夜間負担を記録できます",
  "Un registro sencillo puede anotar quién estuvo en horario preferido, quién aceptó una hora límite y quién soportó una penalización nocturna"),
 "risk": L(
  "a numerical score can hide caregiving, accessibility, safety or cultural constraints if the team treats it as an objective measure of wellbeing",
  "숫자 점수를 인간의 편안함에 대한 객관적 측정치처럼 사용하면 돌봄·접근성·안전·문화적 제약을 가릴 수 있다는 점",
  "数値を客観的な快適度と扱うと、介護、アクセシビリティ、安全、文化的制約を隠す点",
  "una puntuación puede ocultar cuidados, accesibilidad, seguridad o cultura si se trata como medida objetiva del bienestar"),
 "deliverable": L(
  "a transparent rotation policy with editable assumptions, meeting history and an exception process for people who cannot rotate",
  "수정 가능한 가정, 과거 회의 기록, 순환이 어려운 사람의 예외 절차를 포함한 투명한 시간 순환 정책",
  "編集可能な前提、会議履歴、交代できない人の例外手続を含む透明なローテーション方針",
  "una política transparente de rotación con supuestos editables, historial y un proceso de excepción para quien no pueda rotar"),
 "terms": L(["burden history","editable score","rotation policy"],["부담 이력","수정 가능한 점수","순환 정책"],["負担履歴","編集可能な評価","交代方針"],["historial de carga","puntuación editable","política de rotación"]),
},
"common-time-zone-mistakes": {
 "scenario": L(
  "a remote team has seen invitations with CST, copied offsets, missing dates and meeting links that disagree with the written message",
  "원격팀에서 CST 같은 모호한 약어, 복사한 오프셋, 빠진 날짜, 본문과 다른 회의 링크가 반복된 상황",
  "リモートチームでCSTのような曖昧略語、コピーしたオフセット、日付欠落、本文と異なる会議リンクが続く場面",
  "un equipo remoto ha recibido invitaciones con CST, desfases copiados, fechas ausentes y enlaces que contradicen el texto"),
 "example": L(
  "A correction workflow should identify the authoritative calendar event, replace ambiguous labels with IANA zones, and resend the full local-time list",
  "수정 절차에서는 기준이 되는 캘린더 일정을 정하고 모호한 표기를 IANA 시간대로 바꾼 뒤 전체 지역별 시각 목록을 다시 보내야 합니다",
  "訂正手順では正本のカレンダーイベントを決め、曖昧表記をIANA名へ置き換え、全現地時刻を再送します",
  "El proceso de corrección debe identificar el evento autoritativo, sustituir etiquetas ambiguas por zonas IANA y reenviar la lista completa"),
 "risk": L(
  "small-looking inconsistencies can create duplicate events, missed handovers or a twenty-four-hour date error around the international date line",
  "작아 보이는 불일치가 중복 일정·인수인계 누락·날짜 변경선 부근의 24시간 착오로 이어질 수 있다는 점",
  "小さな不一致が重複予定、引き継ぎ漏れ、日付変更線付近の24時間誤りにつながる点",
  "inconsistencias pequeñas pueden crear eventos duplicados, relevos perdidos o errores de veinticuatro horas cerca de la línea de fecha"),
 "deliverable": L(
  "an error-prevention checklist used before publishing, plus a visible correction message when an invitation changes",
  "발송 전 사용하는 오류 예방 체크리스트와 일정 변경 시 눈에 띄게 보내는 정정 메시지",
  "公開前の誤り防止チェックリストと、変更時に明確に送る訂正通知",
  "una lista preventiva antes de publicar y un mensaje visible de corrección cuando cambie la invitación"),
 "terms": L(["ambiguous abbreviation","source of truth","correction notice"],["모호한 약어","기준 일정","정정 안내"],["曖昧な略語","正本","訂正通知"],["abreviatura ambigua","fuente de verdad","aviso de corrección"]),
},
"recurring-meetings-dst": {
 "scenario": L(
  "a weekly New York–London meeting is created for six months and crosses several regional clock changes",
  "뉴욕·런던 주간회의를 6개월 동안 만들면서 여러 지역의 시계 전환을 지나가는 상황",
  "ニューヨークとロンドンの週次会議を6か月作成し、複数の時計移行をまたぐ場面",
  "una reunión semanal entre Nueva York y Londres se programa durante seis meses y cruza varios cambios regionales"),
 "example": L(
  "The series should be previewed occurrence by occurrence around every offset transition instead of assuming the first week's local labels will remain constant",
  "첫 주의 현지 시각이 계속 유지된다고 가정하지 말고 오프셋 전환 전후의 각 회차를 따로 미리 봐야 합니다",
  "初週の現地表示が続くと仮定せず、各オフセット移行の前後で回ごとに確認します",
  "La serie debe previsualizarse ocurrencia por ocurrencia alrededor de cada transición, sin suponer que la primera semana se mantendrá"),
 "risk": L(
  "editing one occurrence, the whole series or this-and-following can produce different calendar behavior and accidental duplicates",
  "한 회차·전체 시리즈·이후 회차 중 어디를 수정하는지에 따라 결과가 달라지고 중복 일정이 생길 수 있다는 점",
  "1回のみ、全系列、以後の系列のどれを編集するかで挙動が変わり、重複が生じる点",
  "editar una ocurrencia, toda la serie o esta y las siguientes produce comportamientos distintos y posibles duplicados"),
 "deliverable": L(
  "a recurrence review sheet listing transition weeks, changed local labels, exceptions and the calendar owner who will repair the series",
  "전환 주간, 달라지는 현지 시각, 예외 회차, 반복 일정 수정 담당자를 기록한 검토표",
  "移行週、変化する現地表示、例外回、修正担当者を記したレビュー表",
  "una hoja de revisión con semanas de transición, etiquetas locales cambiadas, excepciones y responsable de reparar la serie"),
 "terms": L(["occurrence preview","series scope","transition week"],["회차별 미리보기","시리즈 수정 범위","전환 주간"],["回別プレビュー","系列の編集範囲","移行週"],["vista por ocurrencia","alcance de la serie","semana de transición"]),
},
"communicate-times-email-slack": {
 "scenario": L(
  "an organizer must propose three options in email, confirm one in Slack and ensure the calendar invitation matches both messages",
  "주최자가 이메일로 3개 후보를 제안하고 Slack에서 하나를 확정한 뒤 캘린더 초대와 모두 일치시켜야 하는 상황",
  "主催者がメールで3候補を提示し、Slackで1つを確定し、カレンダー招待と一致させる場面",
  "una organizadora debe proponer tres opciones por correo, confirmar una en Slack y hacer que la invitación coincida con ambos mensajes"),
 "example": L(
  "A clear proposal includes the full date, weekday, local time for every key city, duration, UTC reference and a single sentence asking recipients to confirm",
  "명확한 제안에는 전체 날짜·요일·주요 도시별 현지 시각·회의 길이·UTC 기준·확인 요청 한 문장이 포함됩니다",
  "明確な提案には完全な日付、曜日、主要都市の現地時刻、所要時間、UTC基準、確認依頼を含めます",
  "Una propuesta clara incluye fecha completa, día, hora local de cada ciudad clave, duración, referencia UTC y una petición única de confirmación"),
 "risk": L(
  "editing the prose but not the attached event creates competing sources of truth and makes later corrections hard to audit",
  "본문만 수정하고 첨부 일정을 바꾸지 않으면 서로 다른 기준이 생겨 이후 정정 과정을 추적하기 어려워진다는 점",
  "本文だけを直して添付イベントを変えないと正本が競合し、後の訂正を追跡しにくい点",
  "editar el texto pero no el evento adjunto crea fuentes de verdad rivales y dificulta auditar correcciones"),
 "deliverable": L(
  "a reusable plain-text, Markdown and Slack format generated from the same selected instant as the calendar file",
  "캘린더 파일과 같은 선택 순간에서 생성한 일반 텍스트·Markdown·Slack용 공통 문구",
  "カレンダーファイルと同じ選択瞬間から生成するプレーンテキスト、Markdown、Slack形式",
  "formatos reutilizables de texto, Markdown y Slack generados desde el mismo instante que el archivo de calendario"),
 "terms": L(["complete timestamp","single source of truth","correction thread"],["완전한 시간 표기","단일 기준","정정 스레드"],["完全な日時表記","単一の正本","訂正スレッド"],["marca temporal completa","fuente única","hilo de corrección"]),
},
"browser-time-zone-privacy": {
 "scenario": L(
  "a team wants to compare cities and save preferences without creating accounts or sending participant schedules to a server",
  "팀이 계정을 만들거나 참가자 일정을 서버로 보내지 않고 도시 비교와 설정 저장을 사용하려는 상황",
  "アカウント作成や参加者予定のサーバー送信なしで都市比較と設定保存を使う場面",
  "un equipo quiere comparar ciudades y guardar preferencias sin crear cuentas ni enviar horarios de participantes a un servidor"),
 "example": L(
  "IANA conversion, overlap scoring, ICS generation and preference storage can all run locally with Intl, a verified time library and localStorage",
  "Intl·검증된 시간 라이브러리·localStorage를 사용하면 IANA 변환·겹침 평가·ICS 생성·설정 저장을 브라우저 안에서 처리할 수 있습니다",
  "Intl、検証済み時間ライブラリ、localStorageにより、IANA変換、重複評価、ICS生成、設定保存を端末内で実行できます",
  "La conversión IANA, el cálculo de coincidencias, la generación ICS y las preferencias pueden ejecutarse localmente con Intl, una biblioteca verificada y localStorage"),
 "risk": L(
  "share URLs, analytics and advertising can still disclose scheduling context if the operator adds sensitive fields or enables third-party scripts carelessly",
  "공유 URL·분석·광고 기능에 민감한 필드를 넣거나 외부 스크립트를 부주의하게 켜면 일정 맥락이 노출될 수 있다는 점",
  "共有URL、分析、広告に機密項目を入れたり外部スクリプトを不用意に有効化すると予定情報が漏れる点",
  "las URL compartidas, la analítica y la publicidad aún pueden revelar contexto si se añaden campos sensibles o scripts externos sin cuidado"),
 "deliverable": L(
  "a documented data map explaining what stays in memory, what enters localStorage, what appears in a URL and how a user deletes it",
  "메모리·localStorage·공유 URL에 각각 무엇이 들어가는지와 삭제 방법을 설명한 데이터 흐름 문서",
  "メモリ、localStorage、共有URLに何が入るかと削除方法を説明するデータマップ",
  "un mapa documentado de lo que queda en memoria, entra en localStorage, aparece en una URL y puede borrar la persona usuaria"),
 "terms": L(["local processing","storage boundary","share-link disclosure"],["로컬 처리","저장 경계","공유 링크 노출"],["ローカル処理","保存境界","共有リンク開示"],["procesamiento local","límite de almacenamiento","exposición del enlace"]),
},
"iana-time-zone-names": {
 "scenario": L(
  "a developer must store user choices such as America/New_York, Asia/Kolkata and Australia/Sydney without relying on ambiguous abbreviations",
  "개발자가 America/New_York·Asia/Kolkata·Australia/Sydney 같은 선택을 모호한 약어 없이 저장해야 하는 상황",
  "開発者がAmerica/New_York、Asia/Kolkata、Australia/Sydneyなどを曖昧略語なしで保存する場面",
  "una desarrolladora debe guardar opciones como America/New_York, Asia/Kolkata y Australia/Sydney sin abreviaturas ambiguas"),
 "example": L(
  "An IANA identifier names a rule-bearing region, while the display label can be localized separately so users see a familiar city and country",
  "IANA 식별자는 규칙이 있는 지역을 가리키고 화면 표시는 별도로 현지화해 이용자가 익숙한 도시와 국가명을 볼 수 있습니다",
  "IANA識別子は規則を持つ地域を示し、表示名は別にローカライズして親しみやすい都市・国名を見せられます",
  "Un identificador IANA nombra una región con reglas, mientras la etiqueta visible puede localizarse por separado con ciudad y país familiares"),
 "risk": L(
  "aliases, renamed zones and browser database versions can differ, so validation must accept known identifiers without inventing unsupported mappings",
  "별칭·이름 변경·브라우저 데이터 버전이 다를 수 있어 검증 과정에서 지원되지 않는 임의 매핑을 만들면 안 된다는 점",
  "別名、改名、ブラウザのデータ版が異なるため、未対応の独自マッピングを作らず既知名を検証する点",
  "los alias, cambios de nombre y versiones del navegador pueden diferir; la validación no debe inventar correspondencias no compatibles"),
 "deliverable": L(
  "a searchable city catalogue that stores canonical identifiers, localized labels, countries, aliases and the offset for the selected date",
  "정규 식별자·현지화 이름·국가·별칭·선택 날짜의 오프셋을 함께 제공하는 검색 가능한 도시 목록",
  "正規識別子、ローカライズ名、国、別名、選択日のオフセットを持つ検索可能な都市一覧",
  "un catálogo buscable con identificadores canónicos, etiquetas localizadas, países, alias y desfase de la fecha elegida"),
 "terms": L(["canonical identifier","localized label","database version"],["정규 식별자","현지화 이름","데이터 버전"],["正規識別子","ローカライズ表示","データ版"],["identificador canónico","etiqueta localizada","versión de datos"]),
},
}

# Add missing three topic definitions with the same depth.
TOPICS["calendar-events-multiple-zones"] = TOPICS["calendar-events-multiple-zones"]

# Topics not yet declared above.
TOPICS.update({
"common-time-zone-mistakes": TOPICS["common-time-zone-mistakes"],
"recurring-meetings-dst": TOPICS["recurring-meetings-dst"],
"communicate-times-email-slack": TOPICS["communicate-times-email-slack"],
"browser-time-zone-privacy": TOPICS["browser-time-zone-privacy"],
"iana-time-zone-names": TOPICS["iana-time-zone-names"],
})

# Validate all slugs before generation.
missing = [s for s in slugs if s not in TOPICS]
if missing:
    raise SystemExit(f"Missing topic data: {missing}")

HEADINGS = {
 "en": ["Define the scheduling question", "Collect the right inputs", "Calculate from one reference instant", "Work through a practical example", "Handle boundaries and changing rules", "Communicate the result clearly", "Protect people, privacy and accessibility", "Review limitations before publishing"],
 "ko": ["일정 문제를 정확히 정의하기", "필요한 입력값 모으기", "하나의 기준 순간에서 계산하기", "실제 사례로 검증하기", "경계와 변하는 규칙 다루기", "결과를 명확하게 전달하기", "사람·개인정보·접근성 보호하기", "발송 전 한계와 결과 검토하기"],
 "ja": ["予定調整の問いを定義する", "必要な入力を集める", "一つの基準瞬間から計算する", "実例で確認する", "境界と変化する規則を扱う", "結果を明確に伝える", "人・プライバシー・アクセシビリティを守る", "公開前に制約と結果を見直す"],
 "es": ["Definir la pregunta de planificación", "Reunir las entradas correctas", "Calcular desde un instante de referencia", "Comprobar un caso práctico", "Tratar límites y reglas cambiantes", "Comunicar el resultado con claridad", "Proteger a las personas, la privacidad y la accesibilidad", "Revisar los límites antes de publicar"],
}

OPENERS = {
 "en": ["Start with the decision, not the clock.","A useful planner makes assumptions visible.","International scheduling becomes easier when the data model is explicit.","The difficult part is rarely arithmetic alone.","Treat the invitation as a small, auditable specification.","A dependable workflow separates calculation from communication.","Good global scheduling begins before anyone drags a time slider.","The safest approach is to preserve meaning at every conversion.","Remote teams need repeatable rules rather than heroic mental math.","A calendar choice can be technically valid and still be operationally poor.","The organizer should be able to explain why a slot was chosen.","Time labels are user-interface output, not the underlying event.","Clarity improves when one source of truth drives every channel.","Privacy-aware scheduling minimizes the data needed for a correct result.","Named zones turn a vague clock label into a date-aware instruction."],
 "ko": ["시계부터 보지 말고 결정해야 할 문제부터 정리합니다.","좋은 플래너는 숨은 가정을 화면 밖에 두지 않습니다.","국제 일정은 데이터 구조를 명확히 할수록 쉬워집니다.","어려운 부분은 단순한 덧셈과 뺄셈만이 아닙니다.","초대장을 작고 검토 가능한 명세서처럼 다루는 것이 좋습니다.","계산과 전달을 분리하면 실수가 크게 줄어듭니다.","시간 슬라이더를 움직이기 전에 입력 조건부터 정리해야 합니다.","변환 과정에서 의미를 잃지 않는 방식이 가장 안전합니다.","원격팀에는 감각보다 반복 가능한 규칙이 필요합니다.","기술적으로 가능한 시간도 실제 운영에서는 나쁠 수 있습니다.","주최자는 왜 이 시간을 골랐는지 설명할 수 있어야 합니다.","화면의 시각 표시는 사건 자체가 아니라 표현 결과입니다.","모든 채널이 하나의 기준에서 생성되면 혼란이 줄어듭니다.","개인정보를 지키려면 정확한 계산에 필요한 정보만 다룹니다.","이름 있는 시간대는 모호한 시각을 날짜 인식 지시로 바꿉니다."],
 "ja": ["時計を見る前に、決めるべき問いを整理します。","良いプランナーは前提を見える形にします。","国際日程はデータ構造を明確にすると扱いやすくなります。","難しさは単純な足し算と引き算だけではありません。","招待を小さく監査可能な仕様として扱います。","計算と伝達を分けると誤りが減ります。","スライダーを動かす前に入力条件を整えます。","変換中に意味を失わない方法が安全です。","リモートチームには感覚より再現可能な規則が必要です。","技術的に可能でも運用上は不適切な時間があります。","主催者は選択理由を説明できる必要があります。","画面の時刻は出来事そのものではなく表示結果です。","すべてのチャネルを一つの正本から作ると混乱が減ります。","プライバシー配慮では正しい計算に必要な情報だけを扱います。","名前付きゾーンは曖昧な時刻を日付対応の指示へ変えます。"],
 "es": ["Empiece por la decisión, no por el reloj.","Un buen planificador hace visibles sus supuestos.","La planificación internacional mejora cuando el modelo de datos es explícito.","La dificultad rara vez consiste solo en sumar horas.","Conviene tratar la invitación como una especificación pequeña y auditable.","Separar cálculo y comunicación reduce errores.","Antes de mover un control horario hay que ordenar las condiciones.","La opción más segura conserva el significado durante cada conversión.","Los equipos remotos necesitan reglas repetibles, no cálculo mental heroico.","Una hora técnicamente válida puede ser operativamente mala.","La organización debe poder explicar por qué eligió una franja.","La etiqueta visible es una representación, no el evento subyacente.","La claridad aumenta cuando todos los canales nacen de una fuente única.","La planificación privada utiliza solo los datos necesarios.","Las zonas nombradas convierten una hora vaga en una instrucción sensible a la fecha."],
}


def list_terms(topic, locale):
    return topic["terms"][locale]


def build_content(locale: str, topic: dict, title: str, index: int):
    sc, ex, risk, out = topic["scenario"][locale], topic["example"][locale], topic["risk"][locale], topic["deliverable"][locale]
    t1, t2, t3 = list_terms(topic, locale)
    opener = OPENERS[locale][index]

    if locale == "en":
        intro = [
            f"{opener} {title} addresses {sc}. The central question is how to preserve one real instant while presenting useful local information to every participant. A reliable answer keeps the selected date, meeting duration and named time zones together; otherwise an apparently simple conversion can lose the weekday, use a stale offset or approve a slot that ends outside someone's working day. This guide uses {t1}, {t2} and {t3} as practical checkpoints rather than treating them as abstract terminology.",
            f"The working example is concrete: {ex}. From there, the process tests the full interval, explains {risk}, and produces {out}. The goal is not to claim perfect knowledge of future political time-zone decisions. It is to create a transparent workflow that can be recalculated, checked in a calendar and communicated without exposing unnecessary personal information. Each recommendation below therefore separates facts supplied by the user, rules supplied by the time-zone database and human preferences that remain editable.",
        ]
        paras = [
            [f"The first task is to state what must be decided in {sc}. Write down whether the team is converting an already chosen event, searching for candidates, or maintaining a recurring series. That distinction changes the calculation. A conversion needs an unambiguous local start; a search needs work windows and duration; a recurring series needs an occurrence-by-occurrence review. Naming the decision also prevents the group from mixing {t1} with convenience preferences that should be discussed separately.",
             f"Define success in observable terms. For this topic, the result should be {out}. Avoid vague requirements such as “make it reasonable for everyone.” Replace them with editable rules: accepted weekdays, preferred hours, lunch blocks, maximum early or late time, and whether the meeting may cross midnight. When a rule has an owner and a visible reason, participants can challenge it without disputing the underlying conversion."],
            [f"Collect the local date, local clock time, duration and IANA identifier for each relevant location. City labels help people, but software should retain names such as Asia/Seoul or America/New_York. Record work windows as local intervals, including overnight patterns and weekend exceptions. For {title}, the three terms {t1}, {t2} and {t3} should appear in the input review so a missing value is noticed before calculation begins.",
             f"Do not substitute a bare abbreviation when it can refer to more than one region. Do not save only the current UTC offset for a future event. An offset is useful evidence for the selected instant, but it does not contain a region's complete rule history. Inputs should also identify which calendar date belongs to the organizer, because {risk}. A complete input sheet is easier to audit than a collection of screenshots and chat fragments."],
            [f"Convert the chosen local date and time into one UTC instant with the named source zone. Then render that same instant in every destination. Searching for a slot follows the same principle: create candidates on a UTC timeline and evaluate each candidate locally. This avoids chained city-to-city arithmetic. In the example, {ex}. The calculation should preserve seconds consistently, even when the interface displays only minutes.",
             f"Evaluate the complete interval, not just the start. Add the meeting duration in UTC, render the ending in each zone, and test both endpoints against work, lunch, weekend and avoided periods. If a local shift crosses midnight, treat it as a wrapped interval rather than an invalid range. Keep rejected candidates with a short reason; those records explain why a visually attractive time was not recommended and make {t2} understandable to non-specialists."],
            [f"Walk through the example slowly before automating it: {ex}. Verify the UTC value, then inspect every local date and weekday. If a participant sees a previous-day or next-day label, include that relation beside the time. Next, check the duration and the applicable offset at both the start and end. This manual pass is especially useful when the candidate falls close to midnight, a clock transition or a weekend boundary.",
             f"Interpretation matters as much as arithmetic. A candidate may be labeled preferred when the entire interval lies near the center of a participant's workday, acceptable near an edge, and poor during sleep hours. Those labels are policy choices, not scientific measurements. For this guide, {out} should show enough detail for a person to reproduce the decision. A single green badge without local times, dates and reasons is not adequate evidence."],
            [f"Boundary cases deserve deliberate tests. Check midnight in the organizer's zone, midnight in every remote zone, leap-day inputs, short or nonexistent local times around clock changes, and the end of an overnight shift. The main operational risk here is {risk}. A date-aware library may resolve an unusual local time differently from a simple numeric input, so the interface should warn rather than silently pretending every wall-clock label exists exactly once.",
             f"Time-zone rules can change after software is released. Browser and operating-system databases may also differ in version. Store the IANA name, show the offset used for the selected date and recalculate future events when they are opened. Very old historical dates and distant future dates require extra caution. For critical meetings, compare the generated result with the participants' actual calendars, particularly when {t3} is central to the decision."],
            [f"Turn the calculation into communication by generating every channel from the same selected instant. The proposal should include the full date, weekday, local start and end for key cities, duration and a UTC reference. If the group discusses alternatives, label them consistently. Once one is chosen, update the calendar file, email and chat message together. The intended artifact is {out}, not an isolated clock value that recipients must reinterpret.",
             f"Use plain text that survives copying. A compact Markdown list can help in documentation, while a short Slack format can support quick confirmation. An ICS file should escape user text and store start and end safely. Ask recipients to confirm the displayed local time rather than asking them to redo the calculation. When a correction is needed, keep it in the same thread and state exactly which prior proposal is replaced."],
            [f"A browser-based tool can process zones, work settings and ICS generation locally. Save only reusable preferences such as city order or display format, and explain what localStorage contains. Share links should normally include zones, date, selected instant and duration—not participant names, email addresses or confidential meeting titles. This privacy boundary is particularly important when {sc}, because the scheduling pattern itself may reveal working arrangements.",
             f"Accessibility requires more than color. Pair Best, Good, Possible or Poor states with text; give every time input a label; expose date relationships to screen readers; and provide numeric controls as an alternative to dragging. Keyboard users should be able to add, remove and reorder cities. The output {out} should remain understandable in a narrow mobile layout and should not be covered by advertising or fixed interface elements."],
            [f"Before publishing, separate known facts from assumptions. Known facts include the selected instant and the offsets returned by the available time-zone database. Assumptions include work hours, preferred periods and fairness weights. Unknowns include future political changes and a participant's private constraints. Documenting those categories keeps {t1} useful without presenting a convenience label as absolute truth.",
             f"Finish with a reproducible review: reopen the saved link, compare all local dates, import the ICS file into a test calendar, and inspect the event on a mobile viewport. Recalculate near any identified transition. Confirm that {out} matches the calendar event exactly. If the browser data, organization policy or participant feedback changes, update the result and its review date rather than relying on an old screenshot."],
        ]
        table = [["Review item","What to record","Reason"],[t1,sc,"Defines the actual scheduling problem"],[t2,ex,"Provides a reproducible calculation"],[t3,risk,"Surfaces the main edge case"],["Final output",out,"Lets recipients verify the decision"]]
        checklist = [f"Write the full local date and named zone for {sc}",f"Verify {t1} before comparing convenience",f"Calculate the ending as well as the start",f"Show previous, same or next day when relevant",f"Record the offset used for the selected date",f"Generate {out} from the selected instant",f"Test keyboard and mobile access",f"Recheck important events in participant calendars"]
        mistakes = [f"Treating {t1} as a memorized city difference",f"Saving a current offset instead of a named zone",f"Checking the start but not the meeting end",f"Hiding {risk} from recipients",f"Using color without a text explanation",f"Letting email, chat and calendar contain different times"]
        faqs = [
          [f"What is the minimum information needed for {title}?",f"Use a complete local date, clock time, duration and IANA zone. If the task is a search, also collect local work windows and blocked periods. These inputs make {t1} reproducible."],
          ["Why not calculate with a fixed UTC offset?",f"A fixed offset describes one displacement but not future regional rules. Because {risk}, storing the named zone is safer and the offset should be shown only as date-specific evidence."],
          ["Should the meeting start or the whole interval fit working hours?",f"The whole interval should be tested. A candidate that begins inside a shift but ends outside it should be downgraded or rejected according to the team's explicit policy."],
          ["How should a daylight-saving warning be handled?",f"Recalculate the affected date, show old and new local labels where useful, and ask participants to confirm in their calendars. Do not claim that browser data predicts every future political decision."],
          ["Can the result be shared without an account?",f"Yes. A carefully limited URL and a locally generated ICS file can share the scheduling result. Review the URL first and avoid adding names, emails or confidential titles unless deliberately required."],
          ["What makes the result fair?",f"Fairness depends on transparent, editable preferences and history. {out.capitalize()} should explain who receives an early or late burden and support rotation across recurring meetings."],
        ]
    elif locale == "ko":
        intro = [
            f"{opener} ‘{title}’은 {sc}을 해결하기 위한 안내입니다. 핵심은 한 실제 순간을 유지하면서도 참가자마다 이해할 수 있는 현지 날짜와 시각을 제공하는 데 있습니다. 선택 날짜·회의 길이·IANA 시간대를 함께 보존하지 않으면 요일이 바뀌거나 오래된 오프셋을 쓰거나 회의 종료가 근무시간 밖으로 넘어가는 문제가 생깁니다. 이 글에서는 {t1}, {t2}, {t3}을 실제 검토 기준으로 사용합니다.",
            f"계산 사례는 구체적입니다. {ex}. 이 과정을 바탕으로 전체 회의 구간을 검사하고, {risk}을 설명하며, 최종적으로 {out}을 만듭니다. 먼 미래의 시간대 정책을 완벽하게 예측한다고 주장하지 않습니다. 이용자가 입력한 사실, 시간대 데이터베이스가 제공한 규칙, 수정 가능한 업무 선호를 구분해 누구나 다시 계산하고 캘린더에서 확인할 수 있게 하는 것이 목적입니다.",
        ]
        paras = [
            [f"먼저 {sc}에서 실제로 결정해야 할 것이 무엇인지 적습니다. 이미 정해진 일정을 변환하는지, 여러 후보를 찾는지, 반복 일정을 유지하는지에 따라 필요한 입력과 검증 방식이 달라집니다. 단일 변환에는 명확한 현지 시작점이 필요하고, 후보 탐색에는 업무시간과 회의 길이가 필요하며, 반복 일정에는 회차별 검토가 필요합니다. 이 구분을 해두면 {t1}과 사람의 편의 선호를 뒤섞지 않을 수 있습니다.",
             f"성공 기준은 관찰 가능한 형태로 바꿉니다. 이 주제에서 결과는 {out}이어야 합니다. ‘모두에게 적당한 시간’ 같은 표현 대신 허용 요일, 선호시간, 점심 제외, 이른·늦은 시간의 한계, 자정 통과 허용 여부를 기록합니다. 규칙의 이유와 담당자가 보이면 참가자는 시간 변환 자체를 다시 논쟁하지 않고도 선호 조건을 조정할 수 있습니다."],
            [f"각 지역의 현지 날짜, 시각, 회의 길이, IANA 식별자를 수집합니다. 도시명은 사람이 읽기 좋지만 계산에는 Asia/Seoul이나 America/New_York 같은 이름을 유지해야 합니다. 업무시간은 현지 구간으로 저장하고 야간근무와 주말 예외도 포함합니다. {title}에서는 {t1}, {t2}, {t3}이 입력 검토표에 드러나야 빠진 조건을 계산 전에 찾을 수 있습니다.",
             f"여러 지역을 뜻할 수 있는 약어를 자동 확정하지 않습니다. 미래 일정에 현재 UTC 오프셋만 저장하지도 않습니다. 오프셋은 선택 순간을 설명하는 유용한 정보지만 지역의 전체 규칙을 담지는 못합니다. 또한 주최자가 기준으로 삼는 달력 날짜를 분명히 해야 합니다. {risk}. 완성된 입력표는 여러 캡처 화면과 흩어진 채팅보다 훨씬 쉽게 검토할 수 있습니다."],
            [f"선택한 현지 날짜와 시각을 출발 시간대의 규칙으로 하나의 UTC 순간으로 변환합니다. 그다음 같은 순간을 모든 지역에서 다시 표시합니다. 후보를 찾을 때도 UTC 타임라인에 일정한 간격의 후보를 만들고 각 지역에서 평가합니다. {ex}. 도시 A에서 B로, 다시 C로 시차를 연쇄 계산하지 않기 때문에 중간 단계의 날짜 오류를 줄일 수 있습니다.",
             f"시작점만 보지 말고 회의 전체 구간을 검사합니다. UTC에서 회의 길이를 더한 후 각 지역의 종료 시각을 구하고 업무·점심·주말·회피시간과 비교합니다. 자정을 넘는 근무는 잘못된 범위가 아니라 감싸는 구간으로 처리해야 합니다. 제외된 후보에도 짧은 이유를 남기면 겉으로 좋아 보이는 시간이 추천되지 않은 까닭과 {t2}의 의미를 쉽게 설명할 수 있습니다."],
            [f"자동화 전에 사례를 천천히 따라가 봅니다. {ex}. UTC 값을 확인하고 모든 지역의 날짜와 요일을 살핍니다. 전날이나 다음 날이면 현지 시각 옆에 날짜 관계를 표시합니다. 이어서 회의 종료와 시작·종료 순간에 적용되는 오프셋을 봅니다. 자정·시계 전환·주말 경계에 가까운 후보일수록 이 수동 검토가 중요합니다.",
             f"해석 규칙도 계산만큼 중요합니다. 회의 전체가 업무시간 중앙에 있으면 선호, 가장자리에 가까우면 가능, 수면시간이면 불리함처럼 분류할 수 있습니다. 이런 라벨은 과학적 측정치가 아니라 수정 가능한 운영정책입니다. {out}에는 다른 사람이 같은 결정을 재현할 만큼 충분한 근거가 있어야 하며, 현지 날짜와 이유 없는 초록색 표시 하나만으로는 부족합니다."],
            [f"경계 사례를 의도적으로 시험합니다. 주최자와 참가자 지역의 자정, 윤일, 시계 전환 부근의 존재하지 않거나 두 번 나타나는 현지 시각, 야간근무 종료를 확인합니다. 이 주제의 핵심 위험은 {risk}입니다. 날짜를 이해하는 라이브러리는 단순 숫자 입력과 다르게 비정상 현지 시각을 해석할 수 있으므로 조용히 임의 값을 만들기보다 경고를 보여주는 편이 안전합니다.",
             f"시간대 규칙은 정치적 결정으로 바뀔 수 있고 브라우저나 운영체제의 데이터 버전도 다를 수 있습니다. IANA 이름을 저장하고 선택 날짜에 사용한 오프셋을 보여주며 미래 일정은 열 때 다시 계산합니다. 아주 오래된 역사 날짜와 먼 미래 날짜는 추가 확인이 필요합니다. 특히 {t3}이 중요한 일정은 참가자의 실제 캘린더와 비교해야 합니다."],
            [f"같은 선택 순간에서 이메일·채팅·캘린더 문구를 함께 생성합니다. 제안에는 전체 날짜, 요일, 주요 도시별 시작·종료 시각, 회의 길이, UTC 기준을 넣습니다. 여러 후보에는 같은 번호를 사용하고 하나를 확정하면 모든 채널을 함께 수정합니다. 최종 산출물은 단독 시각이 아니라 {out}이어야 하며, 수신자가 다시 계산하도록 떠넘기지 않습니다.",
             f"복사해도 의미가 유지되는 일반 텍스트를 사용합니다. 문서에는 Markdown 목록을, 빠른 확인에는 짧은 Slack 형식을 쓸 수 있습니다. ICS 파일은 사용자 문자를 이스케이프하고 시작·종료 순간을 안전하게 저장해야 합니다. 수신자에게 계산을 다시 하라고 하기보다 캘린더에 표시되는 현지 시각을 확인해 달라고 요청합니다. 정정은 같은 스레드에서 어떤 이전 제안을 대체하는지 분명히 적습니다."],
            [f"브라우저 기반 도구는 시간대·업무설정·ICS 생성을 로컬에서 처리할 수 있습니다. 도시 순서나 표시 방식처럼 반복 사용에 필요한 설정만 localStorage에 저장하고 저장 항목을 설명합니다. 공유 링크에는 보통 시간대·날짜·선택 순간·길이만 넣고 이름·이메일·비공개 제목은 제외합니다. {sc}에서는 일정 패턴 자체도 업무정보가 될 수 있으므로 이 경계가 중요합니다.",
             f"접근성은 색상만으로 해결되지 않습니다. 최적·양호·가능·불리함에 텍스트를 붙이고 모든 시간 입력에 라벨을 제공하며 날짜 관계를 스크린리더가 읽게 합니다. 드래그 대신 숫자 입력과 키보드 조정 기능을 제공하고 도시 추가·삭제·순서 변경도 키보드로 가능해야 합니다. {out}은 모바일의 좁은 화면에서도 읽혀야 하며 광고나 고정 요소가 결과를 가리지 않아야 합니다."],
            [f"발송 전 알려진 사실과 가정을 분리합니다. 선택 순간과 현재 데이터베이스가 반환한 오프셋은 확인 가능한 사실입니다. 업무시간·선호구간·공정성 가중치는 수정 가능한 가정입니다. 미래 정책 변화와 개인의 비공개 제약은 알 수 없는 영역입니다. 이 구분을 문서화하면 {t1}을 유용하게 쓰면서 편의 라벨을 절대적인 진실처럼 표현하지 않을 수 있습니다.",
             f"마지막으로 저장 링크를 다시 열고 모든 현지 날짜를 비교하며 ICS 파일을 시험 캘린더에 가져옵니다. 모바일 화면과 키보드 탐색도 확인합니다. 전환일이 가까우면 다시 계산하고, {out}과 캘린더 일정이 정확히 일치하는지 봅니다. 브라우저 데이터·조직 규칙·참가자 의견이 바뀌면 오래된 캡처를 믿지 말고 결과와 최종 검토일을 갱신합니다."],
        ]
        table = [["검토 항목","기록 내용","필요한 이유"],[t1,sc,"실제 일정 문제를 정의합니다"],[t2,ex,"다시 계산할 수 있는 근거가 됩니다"],[t3,risk,"핵심 경계 위험을 드러냅니다"],["최종 결과",out,"수신자가 결정을 확인할 수 있습니다"]]
        checklist = [f"{sc}의 전체 날짜와 IANA 시간대를 적기",f"편의 평가 전에 {t1} 확인하기","시작뿐 아니라 종료 시각도 계산하기","전날·당일·다음 날 관계 표시하기","선택 날짜에 사용된 오프셋 기록하기",f"같은 순간에서 {out} 생성하기","키보드와 모바일 화면 시험하기","중요 일정은 참가자 캘린더에서 재확인하기"]
        mistakes = [f"{t1}을 외운 도시 시차로 처리하기","현재 오프셋만 저장하고 IANA 이름을 버리기","회의 시작만 검사하고 종료를 놓치기",f"수신자에게 {risk}을 알리지 않기","텍스트 없이 색상만으로 상태를 표시하기","이메일·채팅·캘린더에 서로 다른 시각을 남기기"]
        faqs = [[f"{title}에 필요한 최소 정보는 무엇인가요?",f"전체 현지 날짜, 시각, 회의 길이, IANA 시간대가 필요합니다. 후보를 찾는다면 업무시간과 제외시간도 모아야 {t1}을 다시 계산할 수 있습니다."],["고정 UTC 오프셋만 사용하면 안 되나요?",f"고정 오프셋은 한 순간의 차이는 설명하지만 미래 지역 규칙을 담지 못합니다. {risk} 때문에 IANA 이름을 저장하고 오프셋은 날짜별 확인정보로 쓰는 편이 안전합니다."],["회의 시작만 업무시간 안이면 충분한가요?","아닙니다. 회의 전체 구간을 검사해야 합니다. 시작은 근무 중이어도 종료가 근무 밖이면 조직 규칙에 따라 낮게 평가하거나 제외해야 합니다."],["서머타임 경고가 보이면 어떻게 하나요?","해당 날짜를 다시 계산하고 필요하면 변경 전후 현지 시각을 보여주며 참가자 캘린더에서 확인합니다. 브라우저 데이터가 미래 정책을 완벽하게 예측한다고 단정하지 않습니다."],["계정 없이 결과를 공유할 수 있나요?","가능합니다. 제한된 공유 URL과 브라우저에서 생성한 ICS 파일을 사용할 수 있습니다. URL에는 이름·이메일·비공개 제목을 넣지 않는 것이 좋습니다."],["공정한 시간은 어떻게 판단하나요?",f"수정 가능한 업무 선호와 과거 부담을 함께 봅니다. {out}은 누가 이른 시간이나 늦은 시간을 부담하는지 설명하고 반복회의에서는 순환을 지원해야 합니다."]]
    elif locale == "ja":
        intro = [f"{opener}「{title}」は、{sc}を解決するための実務ガイドです。中心となる考え方は、一つの実際の瞬間を保ちながら、各参加者に役立つ現地日付と時刻を示すことです。選択日、所要時間、IANAタイムゾーンを一緒に保持しなければ、曜日のずれ、古いオフセット、終了時刻の勤務外化が起こります。本稿では{t1}、{t2}、{t3}を具体的な確認項目として扱います。",f"例は具体的です。{ex}。この例から会議全体を検査し、{risk}を説明し、最終的に{out}を作ります。将来の政治的なタイムゾーン変更を完全に予測するとは主張しません。利用者が入力した事実、データベースの規則、編集可能な勤務上の希望を分け、再計算とカレンダー確認ができる透明な手順を目指します。"]
        paras = [
          [f"最初に、{sc}で何を決めるのかを書きます。確定済みイベントの変換、候補検索、定例シリーズの維持では必要な入力が異なります。変換には明確な現地開始、検索には勤務時間と所要時間、定例には各回の確認が必要です。この区別により、{t1}と人の利便性を混同せずに済みます。",f"成功条件を観察可能な形にします。このテーマの成果は{out}です。「全員に妥当」のような曖昧な表現を、許容曜日、希望時間、昼休み、早朝・夜間の限界、日付をまたぐ可否へ置き換えます。理由と担当者を示せば、変換結果そのものを争わずに希望条件を調整できます。"],
          [f"現地日付、時計時刻、所要時間、各場所のIANA識別子を集めます。都市名は人向け表示に使い、計算ではAsia/SeoulやAmerica/New_Yorkを保持します。勤務時間は現地区間として保存し、夜勤と週末例外も含めます。{title}では{t1}、{t2}、{t3}を入力確認に含めます。",f"複数地域を指す略語を自動決定せず、将来イベントに現在のUTCオフセットだけを保存しません。オフセットは選択瞬間の証拠ですが、地域の全規則ではありません。主催者が基準とする日付も明記します。{risk}。完成した入力表は、散らばったスクリーンショットより監査しやすくなります。"],
          [f"選択した現地日付と時刻を、出発ゾーンの規則で一つのUTC瞬間へ変換します。その同じ瞬間をすべての地域で表示します。候補検索でもUTC上に一定間隔の候補を作り、現地条件で評価します。{ex}。都市間の差を連鎖的に計算しないため、途中の日付誤りを減らせます。",f"開始だけでなく区間全体を検査します。UTCで所要時間を加え、各地域の終了時刻を勤務、昼休み、週末、回避時間と比較します。日付をまたぐ勤務は不正な範囲ではなくラップ区間として扱います。除外理由を残すと、{t2}と推薦結果を説明しやすくなります。"],
          [f"自動化前に例を手作業で追います。{ex}。UTC値、各地域の日付と曜日を確認し、前日・翌日なら相対日を表示します。次に終了時刻と開始・終了時のオフセットを見ます。午前0時、時計移行、週末境界に近い候補ほど手動確認が重要です。",f"解釈規則も必要です。会議全体が勤務中央なら希望、端なら許容、睡眠時間なら厳しいと分類できます。ただしラベルは科学的測定ではなく編集可能な方針です。{out}には決定を再現できる情報が必要で、日付と理由のない色だけでは十分ではありません。"],
          [f"境界ケースを意図的に試します。各地域の午前0時、うるう日、時計移行付近の存在しない時刻や重複時刻、夜勤終了を確認します。主な危険は{risk}です。日時ライブラリが特殊な現地時刻をどのように解決したかを警告し、黙って通常時刻のように扱わない設計が安全です。",f"タイムゾーン規則は政治判断で変わり、ブラウザやOSのデータ版も異なります。IANA名と選択日に使ったオフセットを保持し、将来イベントは再表示時に再計算します。古い歴史日付や遠い未来は追加確認が必要です。特に{t3}が重要なら参加者の実カレンダーと比較します。"],
          [f"同じ選択瞬間からメール、チャット、カレンダーを生成します。完全な日付、曜日、主要都市の開始・終了、所要時間、UTC基準を記載します。候補には一貫した番号を付け、確定後は全チャネルを一緒に更新します。成果は単独の時刻ではなく{out}です。",f"コピーしても意味が残るプレーンテキストを使います。文書にはMarkdown、確認には短いSlack形式が便利です。ICSは入力文字をエスケープし、開始と終了を安全に保存します。受信者には再計算ではなく、カレンダーに表示された現地時刻の確認を依頼します。訂正は同じスレッドで旧提案を明示します。"],
          [f"ブラウザ内でゾーン計算、勤務設定、ICS生成を処理できます。都市順や表示形式など再利用設定だけをlocalStorageへ保存し、保存内容を説明します。共有URLには通常、ゾーン、日付、選択瞬間、所要時間だけを入れ、氏名、メール、機密題名を除外します。{sc}では予定パターン自体も業務情報になり得ます。",f"アクセシビリティでは色だけに頼りません。状態に文字ラベルを付け、時間入力へlabelを与え、相対日をスクリーンリーダーへ伝えます。ドラッグの代替として数値入力とキーボード操作を用意します。{out}は狭いモバイル画面でも理解でき、広告や固定要素で隠れてはいけません。"],
          [f"公開前に事実と前提を分けます。選択瞬間とデータベースが返したオフセットは確認可能な事実です。勤務時間、希望帯、公平性重みは編集可能な前提です。将来の政治変更と個人の非公開制約は未知です。この分類により{t1}を絶対的な快適度のように表現せずに済みます。",f"最後に保存リンクを開き直し、全現地日付を比較し、ICSを試験カレンダーへ取り込みます。モバイルとキーボードも確認し、移行日付近なら再計算します。{out}とイベントが一致することを確認し、データや方針が変わったら古い画像ではなく結果と最終確認日を更新します。"],
        ]
        table = [["確認項目","記録内容","理由"],[t1,sc,"実際の調整問題を定義"],[t2,ex,"再現可能な計算根拠"],[t3,risk,"主要な境界リスク"],["最終出力",out,"受信者が確認可能"]]
        checklist = [f"{sc}の完全な日付とIANAゾーンを書く",f"利便性評価前に{t1}を確認","開始と終了の両方を計算","前日・同日・翌日を表示","選択日のオフセットを記録",f"同じ瞬間から{out}を生成","キーボードとモバイルを試験","重要イベントを実カレンダーで再確認"]
        mistakes = [f"{t1}を暗記した都市差で扱う","現在オフセットだけを保存","開始だけを検査","受信者へ主要リスクを示さない","色だけで状態を表す","メール、チャット、カレンダーを不一致にする"]
        faqs = [[f"{title}に最低限必要な情報は何ですか。",f"完全な現地日付、時刻、所要時間、IANAゾーンです。候補検索では勤務時間と除外時間も集めると{t1}を再計算できます。"],["固定UTCオフセットだけでは不十分ですか。",f"オフセットは一瞬の差ですが将来の地域規則ではありません。{risk}ためIANA名を保存し、オフセットは日付別の証拠として表示します。"],["開始が勤務内なら十分ですか。","会議全体を検査します。開始が勤務内でも終了が外なら方針に従って評価を下げるか除外します。"],["夏時間警告が出たらどうしますか。","該当日を再計算し、必要なら変更前後の現地表示を示し、参加者のカレンダーで確認します。"],["アカウントなしで共有できますか。","限定したURLとローカル生成ICSを使えます。氏名、メール、機密題名をURLへ自動追加しないことが重要です。"],["公平性はどう判断しますか。",f"編集可能な勤務希望と過去の負担を見ます。{out}は早朝・夜間負担を説明し、定例では交代を支援します。"]]
    else:
        intro = [f"{opener} {title} resuelve {sc}. La idea central es conservar un único instante real y, al mismo tiempo, ofrecer fecha y hora local útiles para cada participante. Si la fecha elegida, la duración y las zonas IANA no permanecen juntas, pueden aparecer días incorrectos, desfases antiguos o finales fuera de jornada. Esta guía utiliza {t1}, {t2} y {t3} como comprobaciones operativas.",f"El caso de trabajo es concreto: {ex}. A partir de él se revisa el intervalo completo, se explica que {risk} y se produce {out}. No se promete predecir todas las decisiones políticas futuras sobre husos horarios. El objetivo es un proceso transparente que se pueda recalcular, verificar en un calendario y comunicar sin exponer información personal innecesaria."]
        paras = [
          [f"Primero hay que escribir qué se decide en {sc}. Convertir un evento ya elegido, buscar candidatos o mantener una serie recurrente son tareas distintas. La conversión necesita un inicio local inequívoco; la búsqueda requiere jornadas y duración; la serie exige revisar cada ocurrencia. Esta separación evita confundir {t1} con preferencias humanas de comodidad.",f"El éxito debe expresarse de forma observable. En este tema, el resultado es {out}. Sustituya “una hora razonable” por reglas editables: días permitidos, horas preferidas, comida, límites tempranos o tardíos y posibilidad de cruzar medianoche. Cuando cada regla tiene motivo y responsable, el grupo puede cambiar preferencias sin discutir de nuevo la conversión."],
          [f"Reúna fecha local, hora, duración e identificador IANA de cada lugar. Las ciudades ayudan a leer, pero el cálculo debe conservar nombres como Asia/Seoul o America/New_York. Guarde las jornadas como intervalos locales, incluidos turnos nocturnos y excepciones de fin de semana. En {title}, {t1}, {t2} y {t3} deben aparecer en la revisión de entradas.",f"No resuelva automáticamente una abreviatura ambigua ni guarde solo el desfase actual para un evento futuro. El desfase documenta el instante elegido, pero no contiene todo el historial regional. También debe quedar clara la fecha de referencia de la organización, porque {risk}. Una hoja de entradas completa se audita mejor que capturas y mensajes dispersos."],
          [f"Convierta la fecha y hora locales en un instante UTC mediante la zona de origen. Después represente ese mismo instante en todos los destinos. Para buscar opciones, cree candidatos en una línea UTC y evalúelos localmente. {ex}. Así se evita encadenar restas de ciudad a ciudad y se conservan correctamente las fechas.",f"Compruebe todo el intervalo, no solo el inicio. Sume la duración en UTC, represente el final en cada zona y contraste ambos extremos con trabajo, comida, fin de semana y horas evitadas. Un turno que cruza medianoche es un intervalo envolvente, no un dato inválido. Conservar el motivo de rechazo explica {t2} a quien no conoce la implementación."],
          [f"Recorra el ejemplo manualmente antes de automatizarlo: {ex}. Verifique UTC, fecha y día de cada ciudad. Muestre si se trata del día anterior o siguiente. Luego revise duración y desfase al principio y al final. Esta comprobación es especialmente valiosa cerca de medianoche, de una transición o de un límite semanal.",f"La interpretación es tan importante como la aritmética. Una opción puede ser preferida si todo el intervalo cae en el centro de la jornada, aceptable en un borde y difícil durante el sueño. Son políticas editables, no mediciones científicas. {out.capitalize()} debe contener datos suficientes para reproducir la decisión; un color sin fechas ni razones no basta."],
          [f"Pruebe deliberadamente los límites: medianoche en cada zona, años bisiestos, horas inexistentes o duplicadas alrededor de cambios de reloj y fin de un turno nocturno. El riesgo principal es que {risk}. Una biblioteca sensible a fechas puede resolver una hora extraña de forma distinta a un campo numérico; la interfaz debe advertir en lugar de fingir que toda etiqueta existe una sola vez.",f"Las reglas horarias pueden cambiar y los navegadores pueden incluir versiones distintas de IANA. Guarde el nombre, muestre el desfase usado y recalcule eventos futuros cuando se abran. Las fechas históricas muy antiguas o lejanas requieren más cautela. Cuando {t3} sea decisivo, confirme el resultado en los calendarios reales."],
          [f"Genere correo, chat y calendario desde el mismo instante seleccionado. La propuesta debe incluir fecha completa, día, inicio y final de ciudades clave, duración y referencia UTC. Numere alternativas de forma estable y actualice todos los canales cuando se elija una. El artefacto final es {out}, no una hora aislada que cada persona deba reinterpretar.",f"Use texto que sobreviva al copiado. Markdown sirve para documentación y un formato corto para Slack facilita confirmar. El ICS debe escapar texto y guardar inicio y final de forma segura. Pida confirmar la hora mostrada por el calendario, no repetir el cálculo. Si hay una corrección, manténgala en el mismo hilo y diga qué propuesta anterior sustituye."],
          [f"Una herramienta web puede calcular zonas, preferencias e ICS localmente. Guarde en localStorage solo ajustes reutilizables y explique su contenido. Un enlace compartido debe limitarse normalmente a zonas, fecha, instante y duración, sin nombres, correos ni títulos confidenciales. En {sc}, incluso el patrón horario puede revelar información laboral.",f"La accesibilidad no puede depender del color. Añada texto a cada estado, label a cada entrada y relaciones de fecha comprensibles para lectores de pantalla. Ofrezca controles numéricos y teclado como alternativa al arrastre. {out.capitalize()} debe seguir siendo legible en móvil y no quedar cubierto por anuncios o elementos fijos."],
          [f"Antes de publicar, separe hechos y supuestos. El instante y los desfases devueltos por la base disponible son hechos verificables. Jornadas, preferencias y pesos de equidad son supuestos editables. Las decisiones políticas futuras y restricciones privadas son desconocidas. Esta clasificación mantiene {t1} útil sin presentarlo como verdad absoluta sobre el bienestar.",f"Termine con una revisión reproducible: abra el enlace guardado, compare fechas locales, importe el ICS en un calendario de prueba y revise un viewport móvil. Recalcule cerca de transiciones. Confirme que {out} coincide con el evento. Si cambian datos, políticas o comentarios, actualice el resultado y la fecha de revisión en vez de confiar en una captura antigua."],
        ]
        table = [["Elemento","Qué registrar","Motivo"],[t1,sc,"Define el problema real"],[t2,ex,"Permite reproducir el cálculo"],[t3,risk,"Muestra el riesgo principal"],["Salida final",out,"Permite verificar la decisión"]]
        checklist = [f"Escribir fecha completa y zona IANA para {sc}",f"Confirmar {t1} antes de valorar comodidad","Calcular inicio y final","Mostrar día anterior, igual o siguiente","Registrar el desfase de la fecha elegida",f"Generar {out} desde el mismo instante","Probar teclado y móvil","Confirmar eventos importantes en calendarios reales"]
        mistakes = [f"Tratar {t1} como diferencia memorizada","Guardar el desfase actual en vez de la zona","Comprobar inicio pero no final",f"Ocultar que {risk}","Explicar estados solo con color","Dejar horas distintas en correo, chat y calendario"]
        faqs = [[f"¿Qué información mínima necesita {title}?",f"Fecha local completa, hora, duración y zona IANA. Para buscar opciones, añada jornadas y bloqueos; así {t1} puede reproducirse."],["¿Por qué no basta un desfase fijo?",f"Describe una diferencia en un instante, no las reglas futuras. Como {risk}, es más seguro guardar la zona y mostrar el desfase como evidencia de la fecha."],["¿Basta con que el inicio quede en jornada?","No. Hay que comprobar todo el intervalo. Si empieza dentro pero termina fuera, debe degradarse o rechazarse según la política."],["¿Qué hago ante un aviso de horario estacional?","Recalcule la fecha, muestre etiquetas antiguas y nuevas si ayuda y confirme en calendarios. No afirme que los datos predicen toda decisión futura."],["¿Se puede compartir sin cuenta?","Sí, mediante una URL limitada y un ICS local. Revise la URL y evite nombres, correos o títulos confidenciales."],["¿Qué hace justa una opción?",f"La equidad depende de preferencias editables e historial de cargas. {out.capitalize()} debe explicar quién asume horas tempranas o tardías y permitir rotarlas."]]

    sections = [{"heading": HEADINGS[locale][i], "paragraphs": paras[i]} for i in range(8)]
    return intro, sections, table, checklist, mistakes, faqs

new_guides = []
for locale in ["en", "ko", "ja", "es"]:
    for index, slug in enumerate(slugs):
        base = dict(base_by_key[(locale, slug)])
        intro, sections, table, checklist, mistakes, faqs = build_content(locale, TOPICS[slug], base["title"], index)
        base.update({"intro": intro, "sections": sections, "table": table, "checklist": checklist, "mistakes": mistakes, "faqs": faqs})
        new_guides.append(base)

DATA_PATH.write_text(json.dumps(new_guides, ensure_ascii=False, indent=2) + "\n")
print(f"Generated {len(new_guides)} substantive localized guides.")
