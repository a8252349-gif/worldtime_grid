import type { Locale } from "@/config/site";

export const uiCopy: Record<Locale, {
  serviceName: string;
  primaryNavigation: string;
  footerNavigation: string;
  languageMenu: string;
  redirecting: string;
  cookieMessage: string;
  accept: string;
  reject: string;
  adLabel: string;
  year: string;
  noOffsetChange: string;
  dateA: string;
  dateB: string;
  namedZoneExplanation: string;
  fixedOffsetExplanation: string;
  confirmCalendar: string;
  guideLabel: string;
  lastUpdated: string;
  contactUnavailable: string;
  fairnessBalanced: string;
  fairnessDifficult: (city: string) => string;
  featureList: string[];
  timeFormat24: string;
  timeFormat12: string;
}> = {
  en: {
    serviceName: "Time Zone Meeting Planner",
    primaryNavigation: "Primary navigation",
    footerNavigation: "Footer navigation",
    languageMenu: "Change language",
    redirecting: "Opening the appropriate language…",
    cookieMessage: "Advertising may use optional cookies. Choose whether these cookies may be used.",
    accept: "Accept",
    reject: "Reject",
    adLabel: "Advertisement",
    year: "Year",
    noOffsetChange: "No UTC offset change was detected for this year.",
    dateA: "Date A",
    dateB: "Date B",
    namedZoneExplanation: "is a named IANA time zone. Its UTC offset is calculated separately for each date.",
    fixedOffsetExplanation: "A fixed value such as UTC−5 cannot describe seasonal changes or later rule updates. Save the IANA zone name when the location matters.",
    confirmCalendar: "Please confirm this time in your calendar.",
    guideLabel: "WorldTime Grid guide",
    lastUpdated: "Last updated",
    contactUnavailable: "A public contact channel is not currently available. Privacy, accessibility and calculation details remain available in the site footer.",
    fairnessBalanced: "Balanced",
    fairnessDifficult: (city) => `Difficult for ${city}`,
    featureList: ["Compare up to 10 time zones", "Find working-hour overlap", "Use date-specific DST rules", "Export an ICS file", "Share a meeting link"],
    timeFormat24: "24-hour",
    timeFormat12: "12-hour",
  },
  ko: {
    serviceName: "시간대 회의 플래너",
    primaryNavigation: "주요 메뉴",
    footerNavigation: "하단 메뉴",
    languageMenu: "언어 변경",
    redirecting: "알맞은 언어 페이지를 여는 중입니다…",
    cookieMessage: "광고 제공 과정에서 선택적 쿠키가 사용될 수 있습니다. 사용 허용 여부를 선택해 주세요.",
    accept: "허용",
    reject: "거부",
    adLabel: "광고",
    year: "연도",
    noOffsetChange: "이 연도에는 UTC 오프셋 변화가 감지되지 않았습니다.",
    dateA: "날짜 A",
    dateB: "날짜 B",
    namedZoneExplanation: "은 IANA 이름으로 관리되는 시간대입니다. UTC 오프셋은 날짜마다 별도로 계산됩니다.",
    fixedOffsetExplanation: "UTC−5 같은 고정값만으로는 계절 변화나 이후 규칙 변경을 표현할 수 없습니다. 지역이 중요하다면 IANA 시간대 이름을 저장하세요.",
    confirmCalendar: "실제 캘린더에서 이 시간을 최종 확인해 주세요.",
    guideLabel: "WorldTime Grid 가이드",
    lastUpdated: "최종 수정",
    contactUnavailable: "현재 공개된 문의 채널은 없습니다. 개인정보 보호, 접근성, 계산 방식에 관한 안내는 사이트 하단에서 확인할 수 있습니다.",
    fairnessBalanced: "균형적",
    fairnessDifficult: (city) => `${city} 참가자에게 불리함`,
    featureList: ["최대 10개 시간대 비교", "업무시간 겹침 탐색", "날짜별 서머타임 반영", "ICS 캘린더 파일 생성", "회의시간 링크 공유"],
    timeFormat24: "24시간제",
    timeFormat12: "12시간제",
  },
  ja: {
    serviceName: "タイムゾーン会議プランナー",
    primaryNavigation: "メインナビゲーション",
    footerNavigation: "フッターナビゲーション",
    languageMenu: "言語を変更",
    redirecting: "適切な言語ページを開いています…",
    cookieMessage: "広告配信で任意のCookieを使用する場合があります。使用を許可するか選択してください。",
    accept: "許可する",
    reject: "拒否する",
    adLabel: "広告",
    year: "年",
    noOffsetChange: "この年にはUTCオフセットの変化が検出されませんでした。",
    dateA: "日付A",
    dateB: "日付B",
    namedZoneExplanation: "はIANA名で管理されるタイムゾーンです。UTCオフセットは日付ごとに計算されます。",
    fixedOffsetExplanation: "UTC−5のような固定値だけでは季節変化や将来の規則変更を表せません。地域が重要な場合はIANA名を保存してください。",
    confirmCalendar: "実際のカレンダーで時刻を最終確認してください。",
    guideLabel: "WorldTime Grid ガイド",
    lastUpdated: "最終更新",
    contactUnavailable: "現在、公開のお問い合わせ窓口はありません。プライバシー、アクセシビリティ、計算方法の案内はフッターから確認できます。",
    fairnessBalanced: "均衡している",
    fairnessDifficult: (city) => `${city}の参加者には厳しい時間`,
    featureList: ["最大10タイムゾーンを比較", "勤務時間の重なりを検索", "日付別の夏時間を反映", "ICSファイルを作成", "会議時間リンクを共有"],
    timeFormat24: "24時間表示",
    timeFormat12: "12時間表示",
  },
  es: {
    serviceName: "Planificador de reuniones por zonas horarias",
    primaryNavigation: "Navegación principal",
    footerNavigation: "Navegación del pie de página",
    languageMenu: "Cambiar idioma",
    redirecting: "Abriendo la página en el idioma adecuado…",
    cookieMessage: "La publicidad puede utilizar cookies opcionales. Elige si permites su uso.",
    accept: "Aceptar",
    reject: "Rechazar",
    adLabel: "Publicidad",
    year: "Año",
    noOffsetChange: "No se detectó ningún cambio de desfase UTC durante este año.",
    dateA: "Fecha A",
    dateB: "Fecha B",
    namedZoneExplanation: "es una zona horaria con nombre IANA. Su desfase UTC se calcula por separado para cada fecha.",
    fixedOffsetExplanation: "Un valor fijo como UTC−5 no representa los cambios estacionales ni futuras modificaciones. Guarda el nombre IANA cuando importe la ubicación.",
    confirmCalendar: "Confirma esta hora en tu calendario.",
    guideLabel: "Guía de WorldTime Grid",
    lastUpdated: "Última actualización",
    contactUnavailable: "Actualmente no hay un canal público de contacto. La información sobre privacidad, accesibilidad y cálculo está disponible en el pie de página.",
    fairnessBalanced: "Equilibrada",
    fairnessDifficult: (city) => `Difícil para participantes de ${city}`,
    featureList: ["Comparar hasta 10 zonas horarias", "Encontrar horarios laborales coincidentes", "Aplicar el horario de verano según la fecha", "Crear un archivo ICS", "Compartir un enlace de reunión"],
    timeFormat24: "Formato de 24 horas",
    timeFormat12: "Formato de 12 horas",
  },
};
