"use client";

import type { Lesson } from "@/lib/timetable";

interface LessonCellProps {
  lesson: Lesson;
  /** True when this cell belongs to the active (today or previewed) column. */
  active: boolean;
  /** True when this exact cell is the current period right now. */
  current: boolean;
}

/**
 * A single lesson slot. Subject is prominent, teacher subordinate.
 * Cells are grouped visually by column tint rather than being isolated cards.
 */
export function LessonCell({ lesson, active, current }: LessonCellProps) {
  if (lesson.empty) {
    return (
      <div className="flex h-full min-h-[68px] flex-col justify-center px-3 py-2.5">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: "var(--text-dim)" }}
        >
          Trống
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-full min-h-[68px] flex-col justify-center px-3 py-2.5"
      style={{
        background: current ? "var(--accent-tint-strong)" : "transparent",
      }}
    >
      {current && (
        <span
          className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em]"
          style={{ color: "var(--accent-strong)" }}
        >
          Tiết hiện tại
        </span>
      )}
      <span
        className="text-[15px] font-medium leading-tight"
        style={{ color: active ? "var(--text)" : "var(--text)" }}
      >
        {lesson.subject}
      </span>
      <span className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
        {lesson.teacher}
      </span>
    </div>
  );
}
