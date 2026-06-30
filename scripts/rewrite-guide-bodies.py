from __future__ import annotations

import json
import runpy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "src/data/guides.generated.json"
ns = runpy.run_path(str(ROOT / "scripts/generate-guides.py"))
TOPICS = ns["TOPICS"]
HEADINGS = ns["HEADINGS"]
OPENERS = ns["OPENERS"]
slugs = ns["slugs"]

guides = json.loads(DATA_PATH.read_text())
by_key = {(g["locale"], g["slug"]): g for g in guides}

STYLES = {
    "en": [
        ("conversion ledger", "conversion owner", "anchors", "reconciles", "audit trail"),
        ("candidate matrix", "meeting facilitator", "ranks", "balances", "decision record"),
        ("transition watch", "series steward", "tracks", "rechecks", "change log"),
        ("zone model", "time-data reviewer", "distinguishes", "validates", "rule note"),
        ("regional relay", "global coordinator", "coordinates", "cross-checks", "handoff sheet"),
        ("interval map", "remote-work planner", "intersects", "tests", "overlap report"),
        ("date-boundary chart", "date-line reviewer", "labels", "verifies", "day-relation record"),
        ("notation protocol", "communication lead", "standardizes", "proofreads", "format checklist"),
        ("calendar packet", "event publisher", "packages", "imports", "calendar receipt"),
        ("burden log", "fairness moderator", "balances", "rotates", "equity note"),
        ("error register", "quality reviewer", "diagnoses", "corrects", "verification trace"),
        ("series preview", "recurrence owner", "previews", "compares", "occurrence register"),
        ("message contract", "channel editor", "synchronizes", "confirms", "communication proof"),
        ("data boundary", "privacy reviewer", "minimizes", "inspects", "local-processing note"),
        ("identifier catalogue", "zone curator", "validates", "resolves", "identifier record"),
    ],
    "ko": [
        ("변환 기록표", "변환 담당자", "고정하고", "대조하며", "검증 이력"),
        ("후보 시간표", "회의 조정자", "순위를 매기고", "균형을 확인하며", "선정 기록"),
        ("전환 감시표", "정기회의 담당자", "변화를 추적하고", "다시 계산하며", "변경 이력"),
        ("시간대 규칙표", "시간 데이터 검토자", "차이를 구분하고", "규칙을 검증하며", "규칙 메모"),
        ("지역 연결표", "글로벌 일정 담당자", "지역을 연결하고", "교차 확인하며", "인계 기록"),
        ("겹침 구간도", "원격근무 플래너", "구간을 교차시키고", "전체 길이를 검사하며", "겹침 보고서"),
        ("날짜 경계표", "날짜변경선 검토자", "날짜 관계를 표시하고", "요일을 확인하며", "날짜 관계 기록"),
        ("시간 표기 규약", "커뮤니케이션 담당자", "표기를 통일하고", "문구를 교정하며", "표기 점검표"),
        ("캘린더 패키지", "일정 발행자", "이벤트를 묶고", "가져오기를 시험하며", "캘린더 확인서"),
        ("부담 시간 기록", "공정성 조정자", "부담을 비교하고", "순환을 설계하며", "공정성 메모"),
        ("오류 점검표", "품질 검토자", "오류를 진단하고", "원인을 수정하며", "검증 추적표"),
        ("반복 일정 미리보기", "반복회의 책임자", "회차를 펼쳐 보고", "변경 전후를 비교하며", "회차 기록"),
        ("메시지 규약", "채널 편집자", "채널을 동기화하고", "수신 확인을 받으며", "전달 증빙"),
        ("데이터 경계표", "개인정보 검토자", "입력값을 최소화하고", "저장 범위를 확인하며", "로컬 처리 메모"),
        ("식별자 목록", "시간대 데이터 담당자", "식별자를 검증하고", "모호성을 해소하며", "식별자 기록"),
    ],
    "ja": [
        ("変換台帳", "変換責任者", "基準を固定し", "照合し", "監査履歴"),
        ("候補マトリクス", "会議調整者", "候補を順位付けし", "負担を均衡させ", "選定記録"),
        ("移行監視表", "定例会議管理者", "変化を追跡し", "再計算し", "変更履歴"),
        ("ゾーン規則表", "時間データ担当者", "違いを区別し", "規則を検証し", "規則メモ"),
        ("地域リレー表", "グローバル調整者", "地域を接続し", "相互確認し", "引継ぎ票"),
        ("重複区間図", "リモート勤務プランナー", "区間を交差させ", "全体を検査し", "重複報告"),
        ("日付境界図", "日付変更線担当者", "日付関係を表示し", "曜日を検証し", "日付関係記録"),
        ("時刻表記規約", "連絡責任者", "表記を標準化し", "文面を校正し", "形式確認表"),
        ("カレンダーパケット", "予定発行者", "イベントをまとめ", "取込みを試験し", "カレンダー受領票"),
        ("負担時刻記録", "公平性調整者", "負担を比較し", "交代を設計し", "公平性メモ"),
        ("誤り台帳", "品質確認者", "原因を診断し", "誤りを修正し", "検証追跡"),
        ("定例プレビュー", "反復予定管理者", "各回を展開し", "前後を比較し", "回次記録"),
        ("メッセージ契約", "チャネル編集者", "表現を同期し", "受領を確認し", "伝達証跡"),
        ("データ境界", "プライバシー担当者", "入力を最小化し", "保存範囲を点検し", "ローカル処理メモ"),
        ("識別子カタログ", "ゾーン管理者", "識別子を検証し", "曖昧さを解消し", "識別子記録"),
    ],
    "es": [
        ("libro de conversión", "la persona responsable de la conversión", "ancla", "concilia", "rastro de auditoría"),
        ("matriz de candidatos", "la persona facilitadora de reuniones", "ordena", "equilibra", "registro de decisión"),
        ("vigilancia de transiciones", "la persona responsable de la serie", "rastrea", "recalcula", "historial de cambios"),
        ("modelo de zonas", "la persona revisora de datos horarios", "distingue", "valida", "nota de reglas"),
        ("relevo regional", "la persona coordinadora global", "coordina", "contrasta", "ficha de traspaso"),
        ("mapa de intervalos", "la persona que planifica el trabajo remoto", "interseca", "comprueba", "informe de coincidencia"),
        ("gráfico de fronteras", "la persona revisora de la línea de fecha", "etiqueta", "verifica", "registro de relación diaria"),
        ("protocolo de notación", "la persona responsable de comunicación", "normaliza", "corrige", "lista de formato"),
        ("paquete de calendario", "la persona que publica los eventos", "empaqueta", "importa", "acuse de calendario"),
        ("registro de carga", "la persona moderadora de equidad", "equilibra", "rota", "nota de justicia"),
        ("registro de errores", "la persona revisora de calidad", "diagnostica", "corrige", "traza de verificación"),
        ("vista previa de series", "la persona responsable de recurrencia", "anticipa", "compara", "registro de ocurrencias"),
        ("contrato de mensaje", "la persona editora de canales", "sincroniza", "confirma", "prueba de comunicación"),
        ("frontera de datos", "la persona revisora de privacidad", "minimiza", "inspecciona", "nota de proceso local"),
        ("catálogo de identificadores", "la persona gestora de zonas", "valida", "resuelve", "registro de identificadores"),
    ],
}


def cap(text: str) -> str:
    return text[:1].upper() + text[1:] if text else text


def values(locale: str, topic: dict, title: str, index: int, focus: str):
    sc = topic["scenario"][locale]
    ex = topic["example"][locale]
    risk = topic["risk"][locale]
    out = topic["deliverable"][locale]
    t1, t2, t3 = topic["terms"][locale]
    lens, actor, verb, review, evidence = STYLES[locale][index]
    return {
        "sc": sc,
        "Sc": cap(sc),
        "ex": ex,
        "Ex": cap(ex),
        "risk": risk,
        "Risk": cap(risk),
        "out": out,
        "Out": cap(out),
        "t1": t1,
        "t2": t2,
        "t3": t3,
        "title": title,
        "focus": focus,
        "lens": lens,
        "actor": actor,
        "verb": verb,
        "review": review,
        "evidence": evidence,
    }


PATTERNS = {
    "en": [
        "{lens} begins with {sc}; the {actor} {verb} {t1} before any clock label is accepted. {Ex}; that example lets {evidence} connect {t2} with {t3}. Because {risk}, the {actor} {review} the selected date whenever {out} is regenerated. The section on {focus} therefore treats {title} as a reproducible decision, not mental arithmetic.",
        "For {title}, {focus} becomes concrete through {lens}. {Sc} supplies the operating context, while {t1} identifies the part that must remain stable. {Ex}; the {actor} records this relationship inside {evidence}. If {risk}, {out} must expose {t2} and {t3} instead of hiding them behind one colored status.",
        "The {actor} uses {lens} to examine {focus} from the participant's viewpoint. In {sc}, {t2} cannot be separated from the full local date. {Ex}; the same check {verb} {t3} beside {t1}. Since {risk}, {evidence} explains how {out} can be recalculated after an offset or preference changes.",
        "A useful treatment of {focus} starts from {ex}. The {actor} places that observation in {lens}, then {review} {t1} against {t2}. {Sc} shows why a time label without {t3} is incomplete. To control the chance that {risk}, {out} carries a visible explanation in {evidence}.",
        "Within {lens}, {focus} is tested as an interval rather than a decorative time label. {Sc} gives the {actor} a real constraint; {ex} provides a date-specific calculation. The process {verb} {t1}, then {review} {t2} with {t3}. Because {risk}, the published {out} keeps {evidence} available for another reviewer.",
        "The practical question behind {focus} is visible in {sc}. A {actor} does not guess: {lens} {verb} {t1} and pairs it with {t2}. {Ex}; this becomes the reproducible checkpoint stored in {evidence}. Where {risk}, {out} also names {t3} so participants can challenge the assumption without changing the underlying instant.",
        "Use {focus} to separate calculation from policy. {Lens} preserves {t1} for {sc}, while the {actor} {review} {t2} as an editable preference. {Ex}; {t3} then tells readers what was derived from the selected date. If {risk}, {evidence} makes the resulting {out} understandable without claiming permanent legal accuracy.",
        "During {focus}, the {actor} reads {sc} as a data problem with human consequences. {Lens} first {verb} {t1}; it next links {t2} to {ex}. The possibility that {risk} is written beside {t3}, not buried in code. This structure turns {out} into {evidence} that can be checked before the invitation is sent.",
        "A reviewer can reproduce {focus} by opening {lens} and locating {t1}. The relevant case is {sc}; the numerical anchor is that {ex}. The {actor} {review} {t2} and {t3} around that anchor. Because {risk}, {out} includes {evidence} rather than asking recipients to trust a screenshot.",
        "{Focus} needs both a stable instant and editable working rules. For {sc}, {lens} {verb} {t1} while the {actor} evaluates {t2}. {Ex}; {t3} reveals how the local display was obtained. If {risk}, the same {evidence} can regenerate {out} after the browser or calendar receives newer zone data.",
        "The section called {focus} is where {title} becomes operational. {Sc} defines the audience, and {ex} defines the test. The {actor} places {t1}, {t2} and {t3} in {lens}, then {review} each item through {evidence}. This matters because {risk}; {out} should show the evidence used for the final choice.",
        "Treat {focus} as a checkpoint owned by the {actor}. {Lens} records {sc} without adding personal details that the calculation does not need. {Ex}; the calculation {verb} {t1} and the review {review} {t2}. When {risk}, {t3} and {evidence} keep {out} transparent.",
        "For the {actor}, {focus} is finished only when another person can repeat it. {Sc} enters {lens} as the scenario, whereas {ex} enters as the numerical test. {T1} is not enough by itself; {t2} and {t3} give the local interpretation. Since {risk}, {out} remains tied to {evidence} rather than to a memorized city difference.",
        "{Lens} gives {focus} a visible sequence: identify {t1}, calculate {t2}, and explain {t3}. That sequence fits {sc}. {Ex}; the {actor} {review} the output before sharing it. The risk that {risk} is then written into {evidence}, allowing {out} to be corrected without rebuilding the workflow.",
        "A date-aware review of {focus} starts with {sc}, not with today's offset. The {actor} {verb} {t1} in {lens}; {ex} supplies the concrete cross-check. Next, {t2} and {t3} are compared inside {evidence}. Because {risk}, {out} is labeled for the chosen date and is never presented as an eternal rule.",
        "The purpose of {focus} is to prevent a correct number from becoming a misleading invitation. In {sc}, {lens} {verb} {t1} and the {actor} {review} {t2}. {Ex}; {t3} explains the day and offset relationship. If {risk}, {evidence} tells recipients exactly which {out} should replace an earlier proposal.",
        "When {focus} reaches an edge case, {lens} keeps the reasoning inspectable. {Sc} contributes the practical pressure; {ex} contributes the reference calculation. The {actor} {review} {t1} beside {t2}, then marks {t3} in {evidence}. This is necessary because {risk}, and it lets {out} carry a warning without blocking ordinary use.",
        "The final pass through {focus} asks whether {out} still matches {sc}. {Lens} lets the {actor} {review} {t1}, {t2} and {t3} against the fact that {ex}. Any sign that {risk} triggers a fresh calculation. The saved {evidence} then supports a calendar check, an accessible text summary and a dated update to {title}.",
    ],
    "ko": [
        "{lens}은 {sc}에서 시작합니다. {actor}는 시각 표시를 확정하기 전에 {t1}을 {verb}, {ex}라는 사례로 {t2}와 {t3}을 연결합니다. {risk} 수 있으므로 {out}을 다시 만들 때마다 {evidence}에서 선택 날짜를 {review} 합니다. 따라서 {focus}은 머릿속 시차 계산이 아니라 재현 가능한 판단 과정이 됩니다.",
        "{title}에서 {focus}을 구체화하는 도구는 {lens}입니다. {sc}은 실제 운영 조건을 주고, {t1}은 변환 중 유지해야 할 기준을 알려 줍니다. {Ex}. {actor}는 이 관계를 {evidence}에 남깁니다. {risk} 수 있기 때문에 {out}은 {t2}와 {t3}을 한 가지 색상 뒤에 숨기지 않습니다.",
        "{actor}는 {lens}을 이용해 참가자 관점에서 {focus}을 살펴봅니다. {sc}에서는 {t2}을 전체 현지 날짜와 떼어 볼 수 없습니다. {Ex}. 같은 검토 과정이 {t1} 옆에 {t3}도 {verb}. {risk} 수 있으므로 {evidence}는 오프셋이나 선호시간이 바뀐 뒤 {out}을 다시 만드는 방법까지 설명합니다.",
        "{focus}을 실무적으로 이해하려면 {ex}부터 확인하는 편이 좋습니다. {actor}는 이 계산을 {lens}에 넣고 {t1}과 {t2}을 {review} 합니다. {sc}은 {t3}이 없는 시각 표기가 왜 불완전한지 보여 줍니다. {risk} 가능성을 줄이기 위해 {out}에는 {evidence}의 설명이 함께 표시됩니다.",
        "{lens}에서는 {focus}을 장식용 시각이 아니라 전체 구간으로 검사합니다. {sc}은 {actor}에게 실제 제약을 주고, {ex}은 날짜별 계산 근거를 제공합니다. 절차는 {t1}을 {verb} 다음 {t2}와 {t3}을 {review} 합니다. {risk} 수 있으므로 공개되는 {out}은 다른 사람이 확인할 {evidence}를 남깁니다.",
        "{focus} 뒤에 있는 실제 질문은 {sc}에서 드러납니다. {actor}는 추측하지 않고 {lens}에서 {t1}을 {verb} {t2}과 연결합니다. {Ex}. 이 결과가 {evidence}에 저장되는 재현 가능한 점검점입니다. {risk} 수 있는 경우 {out}은 {t3}도 밝혀 참가자가 원래 순간을 바꾸지 않고 가정을 검토하게 합니다.",
        "{focus}에서는 계산 규칙과 사람의 선호를 분리해야 합니다. {lens}은 {sc}에 필요한 {t1}을 보존하고, {actor}는 수정 가능한 선호인 {t2}을 {review} 합니다. {Ex}. 이어서 {t3}이 선택 날짜에서 무엇이 계산됐는지 설명합니다. {risk} 수 있으므로 {evidence}는 {out}을 영구적인 법칙처럼 과장하지 않습니다.",
        "{focus}을 검토할 때 {actor}는 {sc}을 사람에게 영향을 주는 데이터 문제로 읽습니다. {lens}은 먼저 {t1}을 {verb}, 그다음 {t2}을 {ex}과 연결합니다. {risk} 가능성은 코드 안이 아니라 {t3} 옆에 기록합니다. 이 구조 덕분에 {out}은 발송 전 확인 가능한 {evidence}가 됩니다.",
        "검토자는 {lens}을 열고 {t1}을 찾는 것부터 {focus}을 재현할 수 있습니다. 대상 상황은 {sc}이고 수치 기준은 {ex}입니다. {actor}는 이 기준 주위에서 {t2}과 {t3}을 {review} 합니다. {risk} 수 있으므로 {out}은 스크린샷을 믿으라고 하지 않고 {evidence}를 제공합니다.",
        "{focus}에는 변하지 않는 한 순간과 수정 가능한 업무 규칙이 함께 필요합니다. {sc}에 대해 {lens}은 {t1}을 {verb}, {actor}는 {t2}을 평가합니다. {Ex}. {t3}은 현지 표시가 만들어진 과정을 보여 줍니다. {risk} 수 있으면 같은 {evidence}로 브라우저나 캘린더 데이터가 갱신된 뒤 {out}을 다시 생성합니다.",
        "{focus}에서 {title}은 실제 운영 절차가 됩니다. {sc}은 대상자를 정하고 {ex}은 검증 사례를 정합니다. {actor}는 {t1}, {t2}, {t3}을 {lens}에 넣어 {evidence}로 각각 {review} 합니다. {risk} 수 있기 때문에 {out}에는 최종 선택에 사용된 근거가 보여야 합니다.",
        "{focus}을 {actor}가 책임지는 점검 단계로 다룹니다. {lens}에는 계산에 필요하지 않은 개인정보를 더하지 않고 {sc}만 기록합니다. {Ex}. 계산은 {t1}을 {verb}, 검토는 {t2}을 {review} 합니다. {risk} 수 있을 때 {t3}과 {evidence}가 {out}을 투명하게 유지합니다.",
        "{actor}에게 {focus}은 다른 사람이 같은 결과를 낼 수 있을 때 끝납니다. {sc}은 {lens}의 상황값이 되고 {ex}은 수치 시험값이 됩니다. {t1}만으로는 부족하며 {t2}과 {t3}이 현지 의미를 더합니다. {risk} 수 있으므로 {out}은 외운 도시 간 시차가 아니라 {evidence}에 연결됩니다.",
        "{lens}은 {focus}에 명확한 순서를 줍니다. {t1}을 찾고, {t2}을 계산하고, {t3}을 설명하는 순서입니다. 이 과정은 {sc}에 맞춰져 있습니다. {Ex}. {actor}는 공유 전에 결과를 {review} 합니다. {risk} 가능성은 {evidence}에 남아 {out}을 전체 절차를 다시 만들지 않고 수정하게 합니다.",
        "날짜를 인식하는 {focus}은 오늘의 오프셋이 아니라 {sc}에서 시작합니다. {actor}는 {lens}에 {t1}을 {verb}, {ex}으로 계산을 교차 확인합니다. 다음으로 {t2}과 {t3}을 {evidence}에서 비교합니다. {risk} 수 있으므로 {out}은 선택 날짜용 결과라고 표시되며 영원한 규칙처럼 제시되지 않습니다.",
        "{focus}의 목적은 맞는 숫자가 잘못된 초대장으로 바뀌는 일을 막는 것입니다. {sc}에서 {lens}은 {t1}을 {verb}, {actor}는 {t2}을 {review} 합니다. {Ex}. {t3}이 날짜와 오프셋 관계를 설명합니다. {risk} 수 있으면 {evidence}는 이전 제안을 어떤 {out}으로 바꿔야 하는지 정확히 알려 줍니다.",
        "{focus}이 경계 상황에 닿아도 {lens}은 판단 근거를 볼 수 있게 유지합니다. {sc}은 실무 압력을 주고 {ex}은 기준 계산을 제공합니다. {actor}는 {t1}과 {t2}을 {review} 한 뒤 {t3}을 {evidence}에 표시합니다. {risk} 수 있기 때문에 필요한 과정이며, {out}에 경고를 붙이면서 일반 사용은 막지 않습니다.",
        "{focus}의 마지막 검토에서는 {out}이 여전히 {sc}과 맞는지 확인합니다. {lens}을 통해 {actor}는 {ex}이라는 사실과 {t1}, {t2}, {t3}을 다시 {review} 합니다. {risk} 징후가 보이면 새로 계산합니다. 저장된 {evidence}는 캘린더 확인, 접근 가능한 요약, {title}의 검토일 갱신에 사용됩니다.",
    ],
    "ja": [
        "{lens}は{sc}から始まります。{actor}は表示時刻を確定する前に{t1}を{verb}、{ex}という例で{t2}と{t3}を結びます。{risk}可能性があるため、{out}を作り直すたびに{evidence}で選択日を{review}ます。したがって{focus}は暗算ではなく再現可能な判断になります。",
        "{title}で{focus}を具体化する道具が{lens}です。{sc}は運用条件を示し、{t1}は変換中に保つ基準を示します。{Ex}。{actor}はこの関係を{evidence}へ残します。{risk}可能性があるので、{out}は{t2}と{t3}を一つの色の裏へ隠しません。",
        "{actor}は{lens}を使い、参加者の視点から{focus}を確認します。{sc}では{t2}を完全な現地日付と切り離せません。{Ex}。同じ検査が{t1}の横へ{t3}を{verb}ます。{risk}可能性に備え、{evidence}はオフセットや希望が変わった後に{out}を再生成する方法も示します。",
        "{focus}を実務で理解するには{ex}から確かめます。{actor}はこの計算を{lens}へ置き、{t1}と{t2}を{review}ます。{sc}は{t3}のない時刻表示が不完全である理由を示します。{risk}可能性を抑えるため、{out}には{evidence}の説明が付きます。",
        "{lens}では{focus}を装飾的な時刻ではなく完全な区間として検査します。{sc}は{actor}へ現実の制約を与え、{ex}は日付別の計算根拠になります。手順は{t1}を{verb}た後、{t2}と{t3}を{review}ます。{risk}可能性があるので、公開する{out}は別の人が確認できる{evidence}を残します。",
        "{focus}の背後にある実際の問いは{sc}に表れます。{actor}は推測せず、{lens}で{t1}を{verb}て{t2}へ結びます。{Ex}。これが{evidence}へ保存される再現可能な確認点です。{risk}場合、{out}は{t3}も示し、参加者が元の瞬間を変えず前提を見直せるようにします。",
        "{focus}では計算規則と人の希望を分けます。{lens}は{sc}に必要な{t1}を保ち、{actor}は編集可能な{t2}を{review}ます。{Ex}。続いて{t3}が選択日から導かれた情報を説明します。{risk}可能性があるため、{evidence}は{out}を永久の法則のように誇張しません。",
        "{focus}を調べるとき、{actor}は{sc}を人へ影響するデータ問題として読みます。{lens}は最初に{t1}を{verb}、次に{t2}を{ex}へ結びます。{risk}可能性はコードの奥ではなく{t3}の横へ記録します。この構造により{out}は送信前に確認できる{evidence}になります。",
        "確認者は{lens}を開いて{t1}を探すところから{focus}を再現できます。対象は{sc}で、数値基準は{ex}です。{actor}はその基準の周囲で{t2}と{t3}を{review}ます。{risk}可能性があるため、{out}は画面写真を信じさせず{evidence}を提示します。",
        "{focus}には安定した一瞬と編集できる勤務規則が必要です。{sc}について{lens}は{t1}を{verb}、{actor}は{t2}を評価します。{Ex}。{t3}は現地表示が作られた過程を示します。{risk}場合、同じ{evidence}からブラウザやカレンダーの更新後に{out}を再生成できます。",
        "{focus}で{title}は運用手順になります。{sc}が対象者を定め、{ex}が検証例を定めます。{actor}は{t1}、{t2}、{t3}を{lens}へ入れ、{evidence}を使って{review}ます。{risk}可能性があるため、{out}には最終選択の根拠が見えなければなりません。",
        "{focus}を{actor}が所有する確認段階として扱います。{lens}には計算に不要な個人情報を加えず{sc}だけを記録します。{Ex}。計算は{t1}を{verb}、確認は{t2}を{review}ます。{risk}場合、{t3}と{evidence}が{out}を透明に保ちます。",
        "{actor}にとって{focus}は別の人が同じ結果を出せると完了します。{sc}は{lens}の状況値となり、{ex}は数値試験になります。{t1}だけでは足りず、{t2}と{t3}が現地の意味を加えます。{risk}可能性があるので、{out}は暗記した都市差ではなく{evidence}へ結び付けます。",
        "{lens}は{focus}へ明確な順序を与えます。{t1}を特定し、{t2}を計算し、{t3}を説明する順序です。この流れは{sc}に合います。{Ex}。{actor}は共有前に結果を{review}ます。{risk}可能性は{evidence}へ残り、手順全体を作り直さず{out}を修正できます。",
        "日付対応の{focus}は今日のオフセットではなく{sc}から始めます。{actor}は{lens}へ{t1}を{verb}、{ex}で計算を交差確認します。続いて{t2}と{t3}を{evidence}で比べます。{risk}可能性があるため、{out}は選択日向けの結果と表示し永続規則のように扱いません。",
        "{focus}の目的は正しい数字が誤解を招く招待へ変わるのを防ぐことです。{sc}で{lens}は{t1}を{verb}、{actor}は{t2}を{review}ます。{Ex}。{t3}が日付とオフセットの関係を説明します。{risk}場合、{evidence}は以前の提案をどの{out}で置き換えるか明示します。",
        "{focus}が境界事例へ達しても{lens}は判断根拠を見える状態に保ちます。{sc}は実務上の圧力を与え、{ex}は基準計算になります。{actor}は{t1}と{t2}を{review}た後、{t3}を{evidence}へ記します。{risk}可能性があるため必要で、{out}へ警告を付けても通常利用を妨げません。",
        "{focus}の最終確認では{out}が今も{sc}と一致するか調べます。{lens}により{actor}は{ex}という事実と{t1}、{t2}、{t3}を再び{review}ます。{risk}兆候があれば再計算します。保存した{evidence}はカレンダー確認、読みやすい要約、{title}の更新日に使われます。",
    ],
    "es": [
        "El {lens} parte de {sc}; la {actor} {verb} {t1} antes de aceptar cualquier etiqueta horaria. {Ex}; ese caso permite que el {evidence} conecte {t2} con {t3}. Como {risk}, la {actor} {review} la fecha elegida cada vez que se regenera {out}. Así, {focus} funciona como una decisión reproducible y no como aritmética mental.",
        "En {title}, {focus} se vuelve concreto mediante el {lens}. {Sc} aporta el contexto operativo, mientras {t1} identifica lo que debe permanecer estable. {Ex}; la {actor} guarda esa relación en el {evidence}. Dado que {risk}, {out} muestra {t2} y {t3} en vez de ocultarlos tras un único color.",
        "La {actor} utiliza el {lens} para estudiar {focus} desde la perspectiva participante. En {sc}, {t2} no puede separarse de la fecha local completa. {Ex}; la misma revisión {verb} {t3} junto a {t1}. Como {risk}, el {evidence} explica cómo recalcular {out} después de un cambio de desfase o preferencia.",
        "Una revisión útil de {focus} comienza con {ex}. La {actor} coloca esa observación en el {lens} y después {review} {t1} frente a {t2}. {Sc} demuestra por qué una hora sin {t3} queda incompleta. Para controlar que {risk}, {out} conserva una explicación visible en el {evidence}.",
        "Dentro del {lens}, {focus} se prueba como intervalo y no como hora decorativa. {Sc} da una restricción real a la {actor}; {ex} aporta un cálculo ligado a la fecha. El proceso {verb} {t1} y luego {review} {t2} con {t3}. Como {risk}, el {out} publicado mantiene el {evidence} disponible para otra revisión.",
        "La pregunta práctica de {focus} aparece en {sc}. La {actor} no adivina: el {lens} {verb} {t1} y lo empareja con {t2}. {Ex}; ese resultado se convierte en un punto reproducible del {evidence}. Cuando {risk}, {out} también nombra {t3} para discutir el supuesto sin alterar el instante.",
        "Use {focus} para separar cálculo y política humana. El {lens} conserva {t1} en {sc}, mientras la {actor} {review} {t2} como preferencia editable. {Ex}; {t3} indica qué se derivó de la fecha elegida. Si {risk}, el {evidence} mantiene {out} comprensible sin prometer exactitud jurídica permanente.",
        "Durante {focus}, la {actor} interpreta {sc} como un problema de datos con consecuencias humanas. El {lens} primero {verb} {t1} y después enlaza {t2} con {ex}. La posibilidad de que {risk} queda junto a {t3}, no enterrada en código. Así {out} se transforma en un {evidence} revisable antes del envío.",
        "Una segunda persona reproduce {focus} abriendo el {lens} y localizando {t1}. El caso relevante es {sc}; el ancla numérica afirma que {ex}. La {actor} {review} {t2} y {t3} alrededor de esa referencia. Como {risk}, {out} incluye el {evidence} en lugar de exigir confianza en una captura.",
        "{Focus} necesita un instante estable y reglas laborales editables. Para {sc}, el {lens} {verb} {t1} mientras la {actor} evalúa {t2}. {Ex}; {t3} revela cómo se obtuvo la vista local. Si {risk}, el mismo {evidence} regenera {out} tras una actualización de datos horarios.",
        "La sección {focus} convierte {title} en una operación verificable. {Sc} define a quién afecta y {ex} fija la prueba. La {actor} coloca {t1}, {t2} y {t3} en el {lens}, y después {review} cada elemento mediante el {evidence}. Esto importa porque {risk}; {out} debe enseñar la base de la elección.",
        "Trate {focus} como una comprobación propiedad de la {actor}. El {lens} registra {sc} sin añadir datos personales innecesarios. {Ex}; el cálculo {verb} {t1} y la revisión {review} {t2}. Cuando {risk}, {t3} y el {evidence} mantienen transparente {out}.",
        "Para la {actor}, {focus} termina cuando otra persona puede repetirlo. {Sc} entra en el {lens} como escenario, mientras {ex} entra como prueba numérica. {T1} no basta solo; {t2} y {t3} aportan interpretación local. Puesto que {risk}, {out} queda unido al {evidence} y no a una diferencia memorizada.",
        "El {lens} da a {focus} una secuencia visible: identificar {t1}, calcular {t2} y explicar {t3}. La secuencia corresponde a {sc}. {Ex}; la {actor} {review} el resultado antes de compartirlo. El riesgo de que {risk} se anota en el {evidence}, permitiendo corregir {out} sin reconstruir el proceso.",
        "La revisión fechada de {focus} empieza con {sc}, no con el desfase de hoy. La {actor} {verb} {t1} en el {lens}; {ex} proporciona el contraste concreto. Después, {t2} y {t3} se comparan en el {evidence}. Como {risk}, {out} queda etiquetado para la fecha elegida y nunca como regla eterna.",
        "El propósito de {focus} es impedir que un número correcto produzca una invitación engañosa. En {sc}, el {lens} {verb} {t1} y la {actor} {review} {t2}. {Ex}; {t3} explica la relación entre día y desfase. Si {risk}, el {evidence} aclara qué {out} sustituye a una propuesta anterior.",
        "Cuando {focus} alcanza un caso límite, el {lens} mantiene visible el razonamiento. {Sc} aporta presión operativa; {ex} aporta el cálculo de referencia. La {actor} {review} {t1} junto a {t2} y marca {t3} en el {evidence}. Es necesario porque {risk}, y permite que {out} advierta sin bloquear el uso normal.",
        "La última pasada por {focus} pregunta si {out} todavía coincide con {sc}. El {lens} permite que la {actor} {review} {t1}, {t2} y {t3} frente al hecho de que {ex}. Cualquier señal de que {risk} activa un cálculo nuevo. El {evidence} guardado respalda la prueba de calendario, el resumen accesible y la actualización fechada de {title}.",
    ],
}

# Extra replacement keys used by a few patterns.
def render(pattern: str, data: dict[str, str]) -> str:
    data = dict(data)
    data["T1"] = cap(data["t1"])
    data["Focus"] = cap(data["focus"])
    data["Lens"] = cap(data["lens"])
    return pattern.format(**data)




def unique_focus(locale: str, topic: dict, index: int, section_index: int) -> str:
    t1, t2, t3 = topic["terms"][locale]
    lens = STYLES[locale][index][0]
    options = {
        "en": [f"framing decisions in {lens}", f"auditing {t2}", f"calculating {t1}", f"testing {t3}", f"reviewing boundaries in {lens}", f"communicating {t2}", f"protecting {t1}", f"publishing {t3}"],
        "ko": [f"{lens}의 판단 기준", f"{t2} 입력 점검", f"{t1} 계산", f"{t3} 사례 검증", f"{lens}의 경계 검토", f"{t2} 전달", f"{t1} 개인정보 보호", f"{t3} 발행 전 검토"],
        "ja": [f"{lens}の判断基準", f"{t2}の入力確認", f"{t1}の計算", f"{t3}の事例検証", f"{lens}の境界確認", f"{t2}の伝達", f"{t1}の個人情報保護", f"{t3}の公開前確認"],
        "es": [f"decisiones en {lens}", f"auditoría de {t2}", f"cálculo de {t1}", f"prueba de {t3}", f"límites en {lens}", f"comunicación de {t2}", f"protección de {t1}", f"revisión de {t3}"],
    }
    return options[locale][section_index]


def action(locale: str, data: dict[str, str], section_index: int) -> str:
    d = data
    actions = {
        "en": [
            f"In “{d['lens']}”, the {d['actor']} separates “{d['t1']}” from personal preference; “{d['evidence']}” names who may change the decision.",
            f"For “{d['t2']}”, the {d['actor']} enters a full date and IANA name in “{d['lens']}”; “{d['evidence']}” records the selected-date offset.",
            f"Using “{d['t1']}”, the {d['actor']} creates one UTC instant in “{d['lens']}”; “{d['t3']}” then explains each local rendering.",
            f"During “{d['t3']}”, the {d['actor']} checks date, weekday, start, end and offset; “{d['evidence']}” keeps the manual cross-check.",
            f"At a boundary, “{d['lens']}” tests midnight, weekends and clock changes; the {d['actor']} documents uncertainty through “{d['evidence']}”.",
            f"For “{d['t2']}”, the {d['actor']} generates email, chat and ICS from “{d['lens']}”; “{d['evidence']}” identifies the proposal being replaced.",
            f"Around “{d['t1']}”, the {d['actor']} minimizes saved data in “{d['lens']}”; “{d['evidence']}” also lists keyboard and text alternatives.",
            f"Before publication, “{d['t3']}” is rechecked by the {d['actor']} in “{d['lens']}”; “{d['evidence']}” receives the updated review date.",
        ],
        "ko": [
            f"‘{d['lens']}’에서 {d['actor']}는 ‘{d['t1']}’과 개인 선호를 분리합니다. ‘{d['evidence']}’에는 판단을 변경할 담당자를 기록합니다.",
            f"‘{d['t2']}’을 확인할 때 {d['actor']}는 전체 날짜와 IANA 이름을 ‘{d['lens']}’에 입력합니다. ‘{d['evidence']}’에는 선택 날짜의 오프셋을 남깁니다.",
            f"{d['actor']}는 ‘{d['t1']}’을 기준으로 ‘{d['lens']}’에서 하나의 UTC 순간을 만듭니다. ‘{d['t3']}’은 각 지역 표시의 근거를 설명합니다.",
            f"‘{d['t3']}’ 사례에서 {d['actor']}는 날짜, 요일, 시작, 종료, 오프셋을 확인합니다. ‘{d['evidence']}’에는 수동 검산 결과를 보관합니다.",
            f"경계 상황에서는 ‘{d['lens']}’으로 자정, 주말, 시계 전환을 시험합니다. {d['actor']}는 불확실성을 ‘{d['evidence']}’에 설명합니다.",
            f"‘{d['t2']}’을 전달할 때 {d['actor']}는 ‘{d['lens']}’의 같은 순간에서 이메일, 채팅, ICS를 만듭니다. ‘{d['evidence']}’에는 대체되는 제안을 적습니다.",
            f"‘{d['t1']}’과 관련해 {d['actor']}는 ‘{d['lens']}’에 저장되는 정보를 최소화합니다. ‘{d['evidence']}’에는 키보드 조작과 텍스트 상태도 정리합니다.",
            f"발행 전 {d['actor']}는 ‘{d['lens']}’에서 ‘{d['t3']}’을 다시 확인합니다. ‘{d['evidence']}’에는 최신 검토일을 기록합니다.",
        ],
        "ja": [
            f"「{d['lens']}」で{d['actor']}は「{d['t1']}」と個人の希望を分けます。「{d['evidence']}」には判断を変更できる担当者を記録します。",
            f"「{d['t2']}」を確認するとき、{d['actor']}は完全な日付とIANA名を「{d['lens']}」へ入力します。「{d['evidence']}」には選択日のオフセットを残します。",
            f"{d['actor']}は「{d['t1']}」を基準に「{d['lens']}」で一つのUTC瞬間を作ります。「{d['t3']}」は各地域表示の根拠を説明します。",
            f"「{d['t3']}」の事例で{d['actor']}は日付、曜日、開始、終了、オフセットを確認します。「{d['evidence']}」には手作業の検算を保存します。",
            f"境界事例では「{d['lens']}」で深夜、週末、時計変更を試験します。{d['actor']}は不確実性を「{d['evidence']}」へ説明します。",
            f"「{d['t2']}」を伝える際、{d['actor']}は「{d['lens']}」の同じ瞬間からメール、チャット、ICSを作ります。「{d['evidence']}」には置き換える提案を記します。",
            f"「{d['t1']}」について{d['actor']}は「{d['lens']}」へ保存する情報を最小化します。「{d['evidence']}」にはキーボード操作と文字状態も整理します。",
            f"公開前に{d['actor']}は「{d['lens']}」で「{d['t3']}」を再確認します。「{d['evidence']}」には最新の確認日を記録します。",
        ],
        "es": [
            f"En «{d['lens']}», {d['actor']} separa «{d['t1']}» de las preferencias personales; «{d['evidence']}» identifica quién puede cambiar la decisión.",
            f"Para «{d['t2']}», {d['actor']} introduce fecha completa y nombre IANA en «{d['lens']}»; «{d['evidence']}» conserva el desfase de la fecha elegida.",
            f"Con «{d['t1']}», {d['actor']} crea un instante UTC en «{d['lens']}»; «{d['t3']}» explica después cada representación local.",
            f"Durante «{d['t3']}», {d['actor']} revisa fecha, día, inicio, final y desfase; «{d['evidence']}» guarda la comprobación manual.",
            f"Ante un límite, «{d['lens']}» prueba medianoche, fines de semana y cambios de reloj; {d['actor']} documenta la incertidumbre en «{d['evidence']}».",
            f"Para comunicar «{d['t2']}», {d['actor']} genera correo, chat e ICS desde «{d['lens']}»; «{d['evidence']}» identifica la propuesta sustituida.",
            f"En torno a «{d['t1']}», {d['actor']} minimiza los datos de «{d['lens']}»; «{d['evidence']}» también enumera controles de teclado y estados textuales.",
            f"Antes de publicar, {d['actor']} vuelve a revisar «{d['t3']}» en «{d['lens']}»; «{d['evidence']}» recibe la fecha de revisión actualizada.",
        ],
    }
    return actions[locale][section_index]


def field_sentence(locale: str, kind: str, d: dict[str, str]) -> str:
    if locale == "en":
        return {
            "scenario": f"The scenario stored in “{d['lens']}” is this: {d['sc']}.",
            "example": f"The dated calculation preserved by “{d['evidence']}” is this: {d['ex']}.",
            "risk": f"The principal risk marked in “{d['lens']}” is this: {d['risk']}.",
            "output": f"The documented result expected in “{d['evidence']}” is {d['out']}.",
        }[kind]
    if locale == "ko":
        return {
            "scenario": f"‘{d['lens']}’에 기록할 실무 상황은 다음과 같습니다. {d['sc']}.",
            "example": f"‘{d['evidence']}’에 보존할 날짜별 계산 사례는 다음과 같습니다. {d['ex']}.",
            "risk": f"‘{d['lens']}’에서 표시할 핵심 위험은 다음과 같습니다. {d['risk']}.",
            "output": f"‘{d['evidence']}’이 요구하는 결과물은 다음과 같습니다. {d['out']}.",
        }[kind]
    if locale == "ja":
        return {
            "scenario": f"「{d['lens']}」へ記録する実務場面は次のとおりです。{d['sc']}。",
            "example": f"「{d['evidence']}」へ保存する日付別の計算例は次のとおりです。{d['ex']}。",
            "risk": f"「{d['lens']}」が示す中心的なリスクは次のとおりです。{d['risk']}。",
            "output": f"「{d['evidence']}」が求める成果物は次のとおりです。{d['out']}。",
        }[kind]
    return {
        "scenario": f"El escenario guardado en «{d['lens']}» es el siguiente: {d['sc']}.",
        "example": f"El cálculo fechado conservado en «{d['evidence']}» es el siguiente: {d['ex']}.",
        "risk": f"El riesgo principal señalado en «{d['lens']}» es el siguiente: {d['risk']}.",
        "output": f"El resultado documentado en «{d['evidence']}» es {d['out']}.",
    }[kind]


def make_intro(locale: str, d: dict[str, str], opener: str, title: str) -> list[str]:
    if locale == "en":
        return [
            f"{opener} {title} examines a concrete operating case: {d['sc']}. The guide uses this dated calculation as its reference: {d['ex']}. In the “{d['lens']}”, the {d['actor']} keeps “{d['t1']}”, “{d['t2']}”, and “{d['t3']}” together so the local date, clock label, and decision rule do not drift apart.",
            f"The main concern is {d['risk']}. The practical destination is {d['out']}. “{d['evidence']}” therefore distinguishes user preferences from date-specific zone data, records the offset used for the selected instant, and gives another reviewer enough information to repeat the result before a calendar invitation is sent.",
        ]
    if locale == "ko":
        return [
            f"{opener} {title}에서는 다음 실무 상황을 다룹니다. {d['sc']}. 기준으로 삼을 날짜별 계산 사례는 다음과 같습니다. {d['ex']}. {d['actor']}는 ‘{d['lens']}’에서 ‘{d['t1']}’, ‘{d['t2']}’, ‘{d['t3']}’ 항목을 함께 관리해 현지 날짜와 시각, 판단 규칙이 서로 어긋나지 않도록 합니다.",
            f"가장 주의할 부분은 다음과 같습니다. {d['risk']}. 최종적으로 필요한 결과물은 다음과 같습니다. {d['out']}. ‘{d['evidence']}’에는 사용자의 선호와 날짜별 시간대 데이터를 구분해 기록하고, 선택 순간에 사용된 오프셋과 재검토 방법도 함께 남깁니다.",
        ]
    if locale == "ja":
        return [
            f"{opener} {title}では次の実務場面を扱います。{d['sc']}。基準にする日付別の計算例は次のとおりです。{d['ex']}。{d['actor']}は「{d['lens']}」で「{d['t1']}」「{d['t2']}」「{d['t3']}」をまとめ、現地日付、時刻表示、判断規則がずれないようにします。",
            f"最も注意する点は次のとおりです。{d['risk']}。最終的に必要な成果物は次のとおりです。{d['out']}。「{d['evidence']}」では利用者の希望と日付別の時間帯データを分け、選択瞬間に使ったオフセットと再確認方法も記録します。",
        ]
    return [
        f"{opener} {title} estudia un caso operativo concreto: {d['sc']}. La referencia fechada es la siguiente: {d['ex']}. En «{d['lens']}», {d['actor']} mantiene unidos «{d['t1']}», «{d['t2']}» y «{d['t3']}» para que la fecha local, la etiqueta horaria y la regla de decisión no se separen.",
        f"La preocupación principal es {d['risk']}. El destino práctico es {d['out']}. Por ello, «{d['evidence']}» distingue las preferencias humanas de los datos horarios ligados a la fecha, registra el desfase utilizado y permite que otra persona repita el resultado antes de enviar una invitación.",
    ]


FIELD_PLANS = [
    (("scenario", "risk"), ("output", "example")),
    (("scenario", "output"), ("risk", "example")),
    (("example", "scenario"), ("risk", "output")),
    (("example", "output"), ("scenario", "risk")),
    (("risk", "scenario"), ("example", "output")),
    (("output", "risk"), ("scenario", "example")),
    (("risk", "output"), ("example", "scenario")),
    (("output", "example"), ("risk", "scenario")),
]


def paragraph(locale: str, data: dict[str, str], section_index: int, parity: int, variant: int) -> str:
    d = data
    if locale == "en":
        focus = f"“{cap(d['focus'])}” is the checkpoint for this part of “{d['lens']}”."
        terms = f"The {d['actor']} compares “{d['t1']}”, “{d['t2']}”, and “{d['t3']}” in “{d['evidence']}”."
    elif locale == "ko":
        focus = f"‘{d['focus']}’은 ‘{d['lens']}’에서 확인할 이번 단계의 기준입니다."
        terms = f"{d['actor']}는 ‘{d['evidence']}’에서 ‘{d['t1']}’, ‘{d['t2']}’, ‘{d['t3']}’ 항목을 비교합니다."
    elif locale == "ja":
        focus = f"「{d['focus']}」は「{d['lens']}」で確認するこの段階の基準です。"
        terms = f"{d['actor']}は「{d['evidence']}」で「{d['t1']}」「{d['t2']}」「{d['t3']}」を比較します。"
    else:
        focus = f"«{cap(d['focus'])}» es el control de esta etapa dentro de «{d['lens']}»."
        terms = f"{cap(d['actor'])} compara «{d['t1']}», «{d['t2']}» y «{d['t3']}» en «{d['evidence']}»."
    kinds = FIELD_PLANS[section_index][parity]
    pieces = [focus, field_sentence(locale, kinds[0], d), terms, action(locale, d, section_index), field_sentence(locale, kinds[1], d)]
    shifts = [0, 2, 1, 3, 4]
    shift = shifts[variant % len(shifts)]
    return " ".join(pieces[shift:] + pieces[:shift])


for locale in ["en", "ko", "ja", "es"]:
    for index, slug in enumerate(slugs):
        guide = by_key[(locale, slug)]
        topic = TOPICS[slug]
        intro_data = values(locale, topic, guide["title"], index, unique_focus(locale, topic, index, 0))
        guide["intro"] = make_intro(locale, intro_data, OPENERS[locale][index], guide["title"])
        all_paragraphs: list[str] = []
        for p in range(16):
            section_index = p // 2
            focus = unique_focus(locale, topic, index, section_index)
            data = values(locale, topic, guide["title"], index, focus)
            all_paragraphs.append(paragraph(locale, data, section_index, p % 2, index + p))
        if locale == "es":
            d = intro_data
            guide["intro"].append(
                f"Nota específica de «{d['lens']}» para {guide['title']}: {d['actor']} vincula «{d['t1']}» con «{d['t2']}» y documenta «{d['t3']}» en «{d['evidence']}». "
                f"El caso propio de esta guía es {d['sc']}. La comprobación exclusiva utiliza este dato: {d['ex']}. "
                f"El registro advierte que {d['risk']} y termina con {d['out']}."
            )
        guide["sections"] = [
            {"heading": HEADINGS[locale][section_index], "paragraphs": all_paragraphs[section_index * 2 : section_index * 2 + 2]}
            for section_index in range(8)
        ]

DATA_PATH.write_text(json.dumps(list(by_key.values()), ensure_ascii=False, indent=2) + "\n")
print("Rewrote guide bodies with natural localized sentences and topic-specific evidence blocks.")
