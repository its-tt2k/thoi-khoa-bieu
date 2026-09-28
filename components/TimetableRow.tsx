"use client";

import { LessonCell } from "@/components/LessonCell";
import { timetable, weekdays, type WeekdayKey } from "@/lib/timetable";

interface TimetableRowProps {
  /** Zero-based period index (0 = Tiết 1). */
  periodIndex: number;
  periodLabel: string;
  activeKey: WeekdayKey | null;
  /** Current period id (1-based) or null. */
  currentPeriodId: number | null;
  /** The weekday key that "current period" applies to (only the real today). */
  currentDayKey: WeekdayKey | null;
  isLastRow: boolean;
}

/**
 * One period across all five weekdays, plus its leading period label.
 * The active column receives left/right accent hairlines so the whole column
 * reads as a single connected region rather than isolated cards.
 */
export function TimetableRow({
  periodIndex,
  periodLabel,
  activeKey,
  currentPeriodId,
  currentDayKey,
  isLastRow,
}: TimetableRowProps) {
  return (
    <tr>
      <th
        scope="row"
        className="sticky left-0 z-10 whitespace-nowrap px-3 py-2.5 text-left align-middle"
        style={{
          background: "var(--bg-elev)",
          borderTop: "1px solid var(--line)",
          borderRight: "1px solid var(--line)",
        }}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.16em]"
          style={{ color: "var(--text-dim)" }}
        >
          {periodLabel}
        </span>
      </th>

      {weekdays.map((day) => {
        const isActive = day.key === activeKey;
        const lesson = timetable[day.key][periodIndex];
        const isCurrentCell =
          currentPeriodId !== null &&
          currentDayKey === day.key &&
          currentPeriodId === periodIndex + 1;

        return (
          <td
            key={day.key}
            className="p-0 align-middle"
            style={{
              borderTop: "1px solid var(--line)",
              borderLeft: isActive ? "1px solid var(--accent-line)" : "1px solid transparent",
              borderRight: isActive ? "1px solid var(--accent-line)" : "1px solid transparent",
              borderBottom: isActive && isLastRow ? "1px solid var(--accent-line)" : "none",
              background: isActive ? "var(--accent-tint)" : "transparent",
            }}
          >
            <LessonCell lesson={lesson} active={isActive} current={isCurrentCell} />
          </td>
        );
      })}
    </tr>
  );
}
