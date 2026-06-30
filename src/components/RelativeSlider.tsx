"use client";

import { useEffect, useRef } from "react";

function clamp(value: number, min: number, max: number) { return Math.min(max, Math.max(min, value)); }
function roundToStep(value: number, min: number, step: number) { return min + Math.round((value - min) / step) * step; }

export function RelativeSlider({ id, label, min, max, step = 1, value, onChange, valueText }: {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  valueText?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startValue: number } | null>(null);
  const safeValue = clamp(roundToStep(value, min, step), min, max);
  const percentage = max === min ? 0 : ((safeValue - min) / (max - min)) * 100;

  useEffect(() => () => {
    const drag = dragRef.current;
    if (drag && trackRef.current?.hasPointerCapture(drag.pointerId)) trackRef.current.releasePointerCapture(drag.pointerId);
    dragRef.current = null;
  }, []);

  const update = (next: number) => {
    if (!Number.isFinite(next)) return;
    onChange(clamp(roundToStep(next, min, step), min, max));
  };
  const finish = (pointerId: number) => {
    if (trackRef.current?.hasPointerCapture(pointerId)) trackRef.current.releasePointerCapture(pointerId);
    dragRef.current = null;
  };

  return <div className="relative-slider-field">
    <label id={`${id}-label`} htmlFor={`${id}-number`}>{label}</label>
    <div className="relative-slider-row">
      <div
        id={id}
        ref={trackRef}
        className="relative-slider"
        role="slider"
        tabIndex={0}
        aria-labelledby={`${id}-label`}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={safeValue}
        aria-valuetext={valueText}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startValue: safeValue };
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.focus();
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current;
          const width = trackRef.current?.getBoundingClientRect().width || 0;
          if (!drag || drag.pointerId !== event.pointerId || width <= 0) return;
          const delta = ((event.clientX - drag.startX) / width) * (max - min);
          update(drag.startValue + delta);
        }}
        onPointerUp={(event) => finish(event.pointerId)}
        onPointerCancel={(event) => finish(event.pointerId)}
        onLostPointerCapture={() => { dragRef.current = null; }}
        onKeyDown={(event) => {
          const page = step * 10;
          let next: number | null = null;
          if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = safeValue - step;
          if (event.key === "ArrowRight" || event.key === "ArrowUp") next = safeValue + step;
          if (event.key === "Home") next = min;
          if (event.key === "End") next = max;
          if (event.key === "PageDown") next = safeValue - page;
          if (event.key === "PageUp") next = safeValue + page;
          if (next !== null) { event.preventDefault(); update(next); }
        }}
      >
        <span className="relative-slider-fill" style={{ width: `${percentage}%` }} />
        <span className="relative-slider-thumb" style={{ left: `${percentage}%` }} aria-hidden="true" />
      </div>
      <input id={`${id}-number`} className="slider-number" type="number" min={min} max={max} step={step} value={safeValue} onChange={(event) => update(Number(event.target.value))} />
    </div>
  </div>;
}
