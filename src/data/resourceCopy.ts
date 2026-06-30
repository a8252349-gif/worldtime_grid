import type { Locale } from "@/config/site";

export type ResourceSlug = "time-converter" | "working-hours-overlap" | "dst-checker" | "date-line-visualizer" | "utc-offset-explainer";

type ToolCopy = { title: string; description: string };

export const resourceCopy: Record<Locale, {
  eyebrow: string;
  indexTitle: string;
  indexDescription: string;
  methodTitle: string;
  methodParagraph: string;
  privacyParagraph: string;
  guideIndexEyebrow: string;
  guideIndexDescription: string;
  toolNumber: (index: number) => string;
  guideNumber: (index: number) => string;
  tools: Record<ResourceSlug, ToolCopy>;
}> = {
  en: {
    eyebrow: "WorldTime Grid tool",
    indexTitle: "Time-zone tools",
    indexDescription: "Browser-based calculators for time conversion, working-hour overlap, daylight-saving transitions, the date line and UTC offsets.",
    methodTitle: "Method and limitations",
    methodParagraph: "This tool uses named IANA time zones and calculates the applicable offset for the selected date. Time-zone rules can change, browser data versions can differ, and important future events should be confirmed in participants’ calendars.",
    privacyParagraph: "No account or server database is required. Values entered into the calculator remain in the browser unless you deliberately create and share a URL.",
    guideIndexEyebrow: "Knowledge base",
    guideIndexDescription: "Calculation principles and practical workflows for using global scheduling tools accurately.",
    toolNumber: (index) => `Tool ${index}`,
    guideNumber: (index) => `Guide ${String(index).padStart(2,"0")}`,
    tools: {
      "time-converter": { title: "Single Time Converter", description: "Convert one city’s local date and time into another named time zone." },
      "working-hours-overlap": { title: "Working Hours Overlap Calculator", description: "Find candidate meeting times for two to ten cities using local work preferences." },
      "dst-checker": { title: "Daylight Saving Time Checker", description: "Inspect date-specific UTC offset changes detected for a city and year." },
      "date-line-visualizer": { title: "International Date Line Visualizer", description: "See how one instant maps to the previous, same or next date across regions." },
      "utc-offset-explainer": { title: "UTC Offset vs IANA Time Zone", description: "Compare a fixed UTC offset with a named zone whose rules can vary by date." },
    },
  },
  ko: {
    eyebrow: "WorldTime Grid 도구",
    indexTitle: "시간대 계산 도구",
    indexDescription: "시간 변환, 업무시간 겹침, 서머타임 전환, 날짜 변경선, UTC 오프셋을 브라우저에서 계산할 수 있습니다.",
    methodTitle: "계산 방식과 한계",
    methodParagraph: "이 도구는 IANA 시간대 이름을 사용하고 선택한 날짜에 실제 적용되는 UTC 오프셋을 계산합니다. 시간대 규칙은 바뀔 수 있고 브라우저별 데이터 버전도 다를 수 있으므로 중요한 미래 일정은 참가자 캘린더에서 최종 확인하세요.",
    privacyParagraph: "계정이나 서버 데이터베이스는 필요하지 않습니다. 직접 공유 URL을 만들지 않는 한 입력한 값은 브라우저 안에서 처리됩니다.",
    guideIndexEyebrow: "지식 가이드",
    guideIndexDescription: "국제 일정 도구를 정확하게 활용하기 위한 계산 원리와 실무 절차를 정리했습니다.",
    toolNumber: (index) => `도구 ${index}`,
    guideNumber: (index) => `가이드 ${String(index).padStart(2,"0")}`,
    tools: {
      "time-converter": { title: "단일 시간 변환기", description: "한 도시의 현지 날짜와 시간을 다른 시간대의 현지시간으로 변환합니다." },
      "working-hours-overlap": { title: "업무시간 겹침 계산기", description: "2개부터 10개 도시까지 업무시간을 비교해 가능한 회의시간을 찾습니다." },
      "dst-checker": { title: "서머타임 전환 확인기", description: "도시와 연도를 선택해 날짜별 UTC 오프셋 변화 여부를 확인합니다." },
      "date-line-visualizer": { title: "날짜 변경선 시각화", description: "하나의 순간이 지역별로 전날, 당일, 다음 날 중 어디에 해당하는지 보여줍니다." },
      "utc-offset-explainer": { title: "UTC 오프셋과 IANA 시간대 비교", description: "고정 UTC 오프셋과 날짜별 규칙이 있는 이름 기반 시간대의 차이를 비교합니다." },
    },
  },
  ja: {
    eyebrow: "WorldTime Grid ツール",
    indexTitle: "タイムゾーン計算ツール",
    indexDescription: "時刻変換、勤務時間の重なり、夏時間の切り替え、日付変更線、UTCオフセットをブラウザで確認できます。",
    methodTitle: "計算方法と制約",
    methodParagraph: "このツールはIANAタイムゾーン名を使い、選択日に適用されるUTCオフセットを計算します。規則の変更やブラウザごとのデータ差があるため、重要な将来予定は参加者のカレンダーで最終確認してください。",
    privacyParagraph: "アカウントやサーバーデータベースは不要です。共有URLを自分で作成しない限り、入力値はブラウザ内で処理されます。",
    guideIndexEyebrow: "ナレッジガイド",
    guideIndexDescription: "国際日程ツールを正確に使うための計算原理と実務手順をまとめています。",
    toolNumber: (index) => `ツール ${index}`,
    guideNumber: (index) => `ガイド ${String(index).padStart(2,"0")}`,
    tools: {
      "time-converter": { title: "単一時刻変換", description: "一つの都市の現地日時を別のタイムゾーンへ変換します。" },
      "working-hours-overlap": { title: "勤務時間重複計算", description: "2〜10都市の勤務条件を比較し、会議候補を探します。" },
      "dst-checker": { title: "夏時間切り替え確認", description: "都市と年を選び、日付別のUTCオフセット変化を確認します。" },
      "date-line-visualizer": { title: "日付変更線の可視化", description: "同じ瞬間が地域ごとに前日、同日、翌日のどれになるか表示します。" },
      "utc-offset-explainer": { title: "UTCオフセットとIANAタイムゾーン", description: "固定オフセットと日付別規則を持つ名前付きゾーンの違いを比較します。" },
    },
  },
  es: {
    eyebrow: "Herramienta de WorldTime Grid",
    indexTitle: "Herramientas de zonas horarias",
    indexDescription: "Calculadoras en el navegador para convertir horas, comparar jornadas, revisar cambios estacionales, visualizar la línea de fecha y entender desfases UTC.",
    methodTitle: "Método y limitaciones",
    methodParagraph: "La herramienta usa nombres IANA y calcula el desfase UTC aplicable a la fecha elegida. Las reglas pueden cambiar y los navegadores pueden tener versiones distintas de los datos; confirma los eventos futuros importantes en los calendarios de los participantes.",
    privacyParagraph: "No hace falta una cuenta ni una base de datos del servidor. Los valores permanecen en el navegador salvo que decidas crear y compartir una URL.",
    guideIndexEyebrow: "Base de conocimiento",
    guideIndexDescription: "Principios de cálculo y procedimientos prácticos para utilizar con precisión las herramientas de planificación global.",
    toolNumber: (index) => `Herramienta ${index}`,
    guideNumber: (index) => `Guía ${String(index).padStart(2,"0")}`,
    tools: {
      "time-converter": { title: "Conversor de una hora", description: "Convierte la fecha y hora local de una ciudad a otra zona horaria con nombre." },
      "working-hours-overlap": { title: "Calculadora de horarios laborales coincidentes", description: "Busca posibles horas de reunión para entre dos y diez ciudades según sus jornadas." },
      "dst-checker": { title: "Comprobador de cambios estacionales", description: "Revisa los cambios de desfase UTC detectados para una ciudad y un año." },
      "date-line-visualizer": { title: "Visualizador de la línea internacional de cambio de fecha", description: "Muestra si un mismo instante corresponde al día anterior, al mismo día o al siguiente en cada región." },
      "utc-offset-explainer": { title: "Desfase UTC frente a zona IANA", description: "Compara un desfase fijo con una zona con nombre cuyas reglas pueden variar según la fecha." },
    },
  },
};
