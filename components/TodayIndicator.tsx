"use client";

import { CalendarBlank } from "@phosphor-icons/react";

interface TodayIndicatorProps {
  /** Formatted Vietnamese date, or null before client hydration. */
  dateLabel: string | null;
  /** True while the user is previewing a day that is not the real today. */
  previewing: boolean;
  /** True when today is a weekend (no timetable day). */
  weekend: boolean;
}

/**
 * Compact current-date block. Shows "Hôm nay" + the real Vietnamese date,
 * and a subtle "Đang xem" note when previewing a different weekday.
 */
export function TodayIndicator({ dateLabel, previewing, weekend }: TodayIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid h-9 w-9 place-items-center rounded-[var(--r-md)] border"
        style={{ borderColor: "var(--line)", background: "var(--accent-tint)" }}
        aria-hidden="true"
      >
        <CalendarBlank size={18} weight="regular" style={{ color: "var(--accent)" }} />
      </span>
      <div className="leading-tight">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--text-dim)" }}
          >
            Hôm nay
          </span>
          {previewing && (
            <span
              className="rounded-[var(--r-sm)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{
                color: "var(--accent-strong)",
                background: "var(--accent-tint)",
                border: "1px solid var(--accent-line)",
              }}
            >
              Đang xem
            </span>
          )}
        </div>
        <div className="text-sm capitalize" style={{ color: "var(--text)" }}>
          {dateLabel ?? "\u00A0"}
          {weekend && dateLabel && (
            <span style={{ color: "var(--text-dim)" }}> · Cuối tuần</span>
          )}
        </div>
      </div>
    </div>
  );
}
