import type { Locale } from "@/config/site";

export type StaticPageKey = "how-it-works"|"faq"|"about"|"contact"|"privacy"|"terms"|"cookie-policy"|"accessibility"|"editorial-policy"|"time-calculation-methodology";

type PageText = { title:string; description:string; sections:Array<{heading:string; paragraphs:string[]; bullets?:string[]}> };

const common: Record<Locale, Record<StaticPageKey, {title:string;description:string}>> = {
  en:{
    "how-it-works":{title:"How WorldTime Grid Works",description:"Learn how the planner compares named time zones, finds working-hour overlaps and creates shareable calendar events."},
    faq:{title:"Frequently Asked Questions",description:"Answers about time-zone conversion, daylight saving time, privacy, sharing and calendar files."},
    about:{title:"About WorldTime Grid",description:"Why WorldTime Grid exists and how it approaches reliable, privacy-aware global scheduling."},
    contact:{title:"Contact",description:"Contact WorldTime Grid about corrections, accessibility, privacy or product feedback."},
    privacy:{title:"Privacy Policy",description:"How WorldTime Grid handles browser settings, share links, advertising and data deletion."},
    terms:{title:"Terms of Use",description:"Terms for using the WorldTime Grid website and time calculation tools."},
    "cookie-policy":{title:"Cookie Policy",description:"Information about localStorage, optional advertising cookies and consent management."},
    accessibility:{title:"Accessibility Statement",description:"WorldTime Grid's accessibility goals, implemented controls and feedback process."},
    "editorial-policy":{title:"Editorial Policy",description:"How guides are researched, reviewed, corrected and separated from advertising."},
    "time-calculation-methodology":{title:"Time Calculation Methodology",description:"Technical explanation of IANA zones, UTC conversion, daylight saving calculations and known limits."}
  },
  ko:{
    "how-it-works":{title:"WorldTime Grid 이용 방법",description:"이름 있는 시간대 비교, 업무시간 겹침 계산, 공유 링크와 캘린더 생성 방식을 설명합니다."},faq:{title:"자주 묻는 질문",description:"시간대 변환, 서머타임, 개인정보 보호, 공유 링크와 캘린더 파일에 관한 답변입니다."},about:{title:"WorldTime Grid 소개",description:"국제 일정 조정을 더 정확하고 공정하게 만들기 위한 서비스 운영 원칙을 소개합니다."},contact:{title:"문의",description:"수정 요청, 접근성, 개인정보 보호 또는 서비스 의견을 전달하는 방법입니다."},privacy:{title:"개인정보처리방침",description:"브라우저 설정, 공유 링크, 광고와 데이터 삭제 방식을 안내합니다."},terms:{title:"이용약관",description:"WorldTime Grid 웹사이트와 시간 계산 도구 이용 조건입니다."},"cookie-policy":{title:"쿠키 정책",description:"localStorage, 선택적 광고 쿠키와 동의 관리에 관한 안내입니다."},accessibility:{title:"접근성 안내",description:"접근성 목표와 구현 기능, 의견 접수 방법을 설명합니다."},"editorial-policy":{title:"편집 정책",description:"가이드 조사, 검토, 수정 및 광고와의 분리 원칙을 설명합니다."},"time-calculation-methodology":{title:"시간 계산 방법론",description:"IANA 시간대, UTC 변환, 서머타임 계산과 알려진 한계를 설명합니다."}
  },
  ja:{
    "how-it-works":{title:"WorldTime Gridの使い方",description:"名前付きタイムゾーン、勤務時間の重なり、共有リンクとカレンダー生成を説明します。"},faq:{title:"よくある質問",description:"時刻変換、夏時間、プライバシー、共有、カレンダーに関する回答です。"},about:{title:"WorldTime Gridについて",description:"正確で公平な国際日程調整を目指す理由と運用方針です。"},contact:{title:"お問い合わせ",description:"訂正、アクセシビリティ、プライバシー、製品フィードバックの連絡方法です。"},privacy:{title:"プライバシーポリシー",description:"ブラウザ設定、共有リンク、広告、データ削除について説明します。"},terms:{title:"利用規約",description:"WorldTime Gridと時刻計算ツールの利用条件です。"},"cookie-policy":{title:"Cookieポリシー",description:"localStorage、任意の広告Cookie、同意管理の情報です。"},accessibility:{title:"アクセシビリティ声明",description:"アクセシビリティ目標、実装機能、連絡方法です。"},"editorial-policy":{title:"編集方針",description:"ガイドの調査、確認、訂正、広告との分離方針です。"},"time-calculation-methodology":{title:"時間計算方法",description:"IANAゾーン、UTC変換、夏時間計算、既知の制約を説明します。"}
  },
  es:{
    "how-it-works":{title:"Cómo funciona WorldTime Grid",description:"Cómo compara zonas nombradas, calcula coincidencias laborales y crea eventos compartibles."},faq:{title:"Preguntas frecuentes",description:"Respuestas sobre conversión horaria, horario de verano, privacidad, enlaces y calendarios."},about:{title:"Acerca de WorldTime Grid",description:"Por qué existe el servicio y cómo aborda la planificación global fiable y privada."},contact:{title:"Contacto",description:"Contacto para correcciones, accesibilidad, privacidad o comentarios del producto."},privacy:{title:"Política de privacidad",description:"Tratamiento de ajustes del navegador, enlaces, publicidad y eliminación de datos."},terms:{title:"Términos de uso",description:"Condiciones de uso del sitio y de las herramientas de cálculo horario."},"cookie-policy":{title:"Política de cookies",description:"Información sobre localStorage, cookies publicitarias opcionales y consentimiento."},accessibility:{title:"Declaración de accesibilidad",description:"Objetivos, controles implementados y proceso de comentarios de accesibilidad."},"editorial-policy":{title:"Política editorial",description:"Cómo se investigan, revisan y corrigen las guías y se separan de la publicidad."},"time-calculation-methodology":{title:"Metodología de cálculo horario",description:"Explicación de zonas IANA, UTC, horario de verano y límites conocidos."}
  }
};

const bodies: Record<Locale, string[]> = {
  en:[
    "WorldTime Grid performs the main calculation in the browser. The selected cities are represented by IANA time-zone identifiers, and the chosen local date is converted to one UTC instant before it is rendered for every participant. This prevents chains of local-to-local arithmetic and preserves date-specific daylight-saving behavior.",
    "Planner preferences such as favorite cities, order, working hours, time format and meeting duration may be stored in localStorage on the same device. No account is required and these preferences are not sent to a WorldTime Grid database. A reset control removes the stored planner value.",
    "A share link can include selected zones, date, chosen instant, duration and display format. It is intentionally designed not to require names, email addresses, confidential titles or meeting links. Anyone who receives the URL can see the scheduling information embedded in it, so users should still review the query string before sharing.",
    "Calendar files are generated locally with UTC start and end values. User-provided text is escaped before it enters the ICS document. Calendar applications remain responsible for showing the event under the recipient's own settings, and organizers should reopen the exported file before sending an important invitation.",
    "Time-zone rules are political data and may change. Browser and operating-system releases can contain different versions of the IANA database. WorldTime Grid therefore presents results as planning assistance, displays transition warnings where possible and recommends final verification in participant calendars.",
    "The site does not promise that a convenience score is an objective measure of human wellbeing. Labels such as Best, Good, Possible and Poor are simple interpretations of editable working-hour assumptions. Fairness should also be reviewed across a series of meetings, not only one event.",
    "Optional advertising services may use cookies or similar technologies only under the consent choices presented to the visitor. The privacy and cookie pages explain how to review or change those choices and how browser-stored preferences can be removed.",
    "Editorial pages are written to answer a distinct scheduling question rather than to create thousands of city-pair doorway pages. Corrections should identify the affected page, date, zone and source. Substantive corrections should update the review date and, when useful, explain the change.",
  ],
  ko:[
    "WorldTime Grid의 주요 계산은 브라우저에서 이루어집니다. 선택한 도시는 IANA 시간대 식별자로 유지되며, 현지 날짜를 하나의 UTC 순간으로 변환한 뒤 모든 참가자의 지역 규칙으로 다시 표시합니다. 이 방식은 현지시간을 연쇄적으로 더하고 빼는 오류를 줄이고 날짜별 서머타임 규칙을 반영합니다.",
    "즐겨찾는 도시, 표시 순서, 업무시간, 시간 표시 방식, 회의 길이는 같은 기기의 localStorage에 저장될 수 있습니다. 계정은 필요하지 않으며 이 설정을 WorldTime Grid 서버 데이터베이스로 전송하지 않습니다. 초기화 버튼을 누르면 저장된 플래너 값을 삭제할 수 있습니다.",
    "공유 링크에는 선택한 시간대, 날짜, 기준 순간, 회의 길이, 표시 방식이 들어갈 수 있습니다. 참가자 이름, 이메일, 비공개 회의 제목, 화상회의 주소를 기본적으로 요구하지 않습니다. URL을 받은 사람은 쿼리스트링 안의 일정 정보를 볼 수 있으므로 발송 전에 내용을 확인해야 합니다.",
    "캘린더 파일은 UTC 시작·종료 값을 사용해 브라우저에서 생성됩니다. 사용자가 입력한 문자는 ICS 규칙에 맞게 이스케이프합니다. 최종 현지 표시는 수신자의 캘린더 설정에 따라 달라질 수 있으므로 중요한 일정은 생성 파일을 다시 열어 확인하세요.",
    "시간대 규칙은 정치적 결정으로 바뀔 수 있고 브라우저나 운영체제마다 IANA 데이터 버전이 다를 수 있습니다. 이 사이트는 일정 계획을 돕는 도구이며 가능한 범위에서 전환 경고를 제공하고 실제 참가자 캘린더에서 최종 확인할 것을 권장합니다.",
    "최적·양호·가능·불리함 같은 평가는 수정 가능한 업무시간 가정을 단순하게 해석한 결과입니다. 인간의 편안함을 과학적으로 정밀하게 측정한다고 주장하지 않습니다. 반복회의의 공정성은 한 번이 아니라 여러 회차에서 누가 불편한 시간을 부담했는지 함께 봐야 합니다.",
    "선택적 광고 서비스가 사용되는 경우 방문자가 선택한 동의 범위 안에서 쿠키 또는 유사 기술이 사용될 수 있습니다. 개인정보처리방침과 쿠키 정책에서 선택 내용을 확인하거나 변경하는 방법과 브라우저 저장 정보를 삭제하는 방법을 안내합니다.",
    "편집 콘텐츠는 도시 이름만 바꾼 대량 페이지가 아니라 서로 다른 일정 문제를 해결하도록 구성합니다. 수정 요청에는 페이지, 날짜, 시간대, 확인 근거를 포함하는 것이 좋습니다. 중요한 수정은 최종 검토일을 갱신하고 필요한 경우 변경 이유를 설명합니다.",
  ],
  ja:[
    "WorldTime Gridの主要計算はブラウザ内で行われます。都市はIANA識別子で保持され、現地日付を一つのUTC瞬間へ変換した後、各参加者の地域規則で表示します。現地時間を連鎖的に足し引きする誤りを避け、日付ごとの夏時間を反映します。",
    "お気に入り都市、順序、勤務時間、表示形式、会議時間は同じ端末のlocalStorageへ保存できます。アカウントは不要で、設定をWorldTime Gridのデータベースへ送信しません。リセット操作で保存値を削除できます。",
    "共有リンクにはゾーン、日付、選択瞬間、所要時間、表示形式が含まれます。参加者名、メール、機密タイトル、会議URLは標準で不要です。受信者はURL内の情報を見られるため、送信前に確認してください。",
    "ICSファイルはUTCの開始・終了値を使いローカルで生成されます。入力文字は形式に従ってエスケープします。最終表示は受信者のカレンダー設定にも依存するため、重要な招待は生成ファイルを再度開いて確認します。",
    "タイムゾーン規則は政治判断で変わり、ブラウザやOSに異なるIANAデータ版が含まれる場合があります。本サイトは計画支援として結果と警告を示し、参加者の実カレンダーでの最終確認を勧めます。",
    "最適、良好、可能、厳しいという評価は編集可能な勤務時間前提を単純に解釈したものです。人の快適さを科学的に精密測定するものではありません。定例の公平性は複数回で確認します。",
    "任意の広告サービスを利用する場合、訪問者が選択した同意範囲でCookieなどが使われることがあります。プライバシーとCookieのページでは、選択の確認・変更方法とブラウザ保存情報の削除方法を案内します。",
    "編集記事は都市名だけを替えた大量ページではなく、別々の予定調整問題に答えます。訂正には対象ページ、日付、ゾーン、根拠を含め、重要な変更では確認日も更新します。",
  ],
  es:[
    "WorldTime Grid realiza el cálculo principal en el navegador. Las ciudades se conservan como identificadores IANA; la fecha local se transforma en un instante UTC y después se representa con las reglas de cada participante. Así se evitan cadenas de aritmética local y se mantiene el comportamiento estacional de la fecha.",
    "Las ciudades favoritas, el orden, la jornada, el formato y la duración pueden guardarse en localStorage del mismo dispositivo. No hace falta una cuenta y las preferencias no se envían a una base de datos de WorldTime Grid. El control de restablecimiento elimina el valor guardado.",
    "Un enlace compartido puede incluir zonas, fecha, instante, duración y formato. No necesita nombres, correos, títulos confidenciales ni enlaces de videollamada. Quien recibe la URL puede ver la información de planificación que contiene, por lo que conviene revisar la cadena antes de enviarla.",
    "Los archivos de calendario se generan localmente con inicio y final UTC. El texto se escapa antes de entrar en el documento ICS. La aplicación de calendario muestra finalmente el evento según los ajustes de cada receptor; abre de nuevo el archivo antes de una invitación importante.",
    "Las reglas horarias son datos políticos y pueden cambiar. Navegadores y sistemas operativos pueden incluir versiones distintas de IANA. El sitio ofrece ayuda de planificación, avisa cuando puede detectar transiciones y recomienda confirmar en los calendarios reales.",
    "Las etiquetas Óptima, Buena, Posible y Difícil interpretan supuestos laborales editables; no son una medida científica del bienestar. La equidad también debe revisarse a lo largo de una serie de reuniones.",
    "Los servicios publicitarios opcionales pueden usar cookies o tecnologías similares dentro de las preferencias de consentimiento elegidas por la persona visitante. Las páginas de privacidad y cookies explican cómo revisar esas opciones y borrar los datos guardados en el navegador.",
    "Las páginas editoriales responden a preguntas distintas y no crean miles de puertas por pares de ciudades. Una corrección debe indicar página, fecha, zona y fuente. Los cambios sustanciales actualizan la fecha de revisión.",
  ]
};

export function getStaticPage(locale:Locale,key:StaticPageKey):PageText{
  const base=common[locale][key];
  const headings={en:["Purpose and scope","How the browser tool handles data","Accuracy and limitations","Your choices and responsibilities"],ko:["목적과 적용 범위","브라우저 도구의 데이터 처리","정확성과 한계","이용자의 선택과 책임"],ja:["目的と範囲","ブラウザでのデータ処理","精度と制約","利用者の選択と責任"],es:["Objetivo y alcance","Tratamiento en el navegador","Precisión y límites","Opciones y responsabilidades"]}[locale];
  const sections: PageText["sections"] = headings.map((heading,index)=>({heading,paragraphs:[bodies[locale][index*2],bodies[locale][index*2+1]]}));
  if(key==="faq") sections.push({heading:locale==="ko"?"빠른 답변":locale==="ja"?"簡単な回答":locale==="es"?"Respuestas rápidas":"Quick answers",paragraphs:[],bullets:[
    locale==="ko"?"시간대는 IANA 이름으로 저장하고 날짜마다 오프셋을 계산합니다.":locale==="ja"?"IANA名を保存し、日付ごとにオフセットを計算します。":locale==="es"?"Se guarda el nombre IANA y se calcula el desfase para cada fecha.":"Store the IANA name and calculate the offset for each date.",
    locale==="ko"?"공유 URL에는 민감한 회의 정보를 넣지 않는 것이 좋습니다.":locale==="ja"?"共有URLには機密情報を入れないことを推奨します。":locale==="es"?"Conviene no incluir datos confidenciales en la URL.":"Avoid confidential meeting details in share URLs.",
    locale==="ko"?"중요한 일정은 참가자 캘린더에서 최종 확인하세요.":locale==="ja"?"重要な予定は参加者のカレンダーで最終確認します。":locale==="es"?"Confirma eventos importantes en los calendarios reales.":"Confirm important events in participants' calendars."
  ]});
  return {...base,sections};
}

export const staticPageKeys:StaticPageKey[]=["how-it-works","faq","about","contact","privacy","terms","cookie-policy","accessibility","editorial-policy","time-calculation-methodology"];
