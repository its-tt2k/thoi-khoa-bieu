"use client";

import { motion } from "motion/react";
import { weekdays, type WeekdayKey } from "@/lib/timetable";

interface WeekSelectorProps {
  /** Currently selected (viewed) weekday. */
  selected: WeekdayKey;
  /** The real current weekday, or null on weekend / before hydration. */
  todayKey: WeekdayKey | null;
  onSelect: (key: WeekdayKey) => void;
  /** Whether restrained motion is enabled. */
  animate: boolean;
}

/**
 * Compact weekly selector. Each day is a semantic button with complete
 * interaction states (default / hover / active / selected / focus) and a
 * "Hôm nay" marker on the real current weekday.
 */
export function WeekSelector({
  selected,
  todayKey,
  onSelect,
  animate,
}: WeekSelectorProps) {
  return (
    <div
      role="tablist"
      aria-label="Chọn thứ trong tuần"
      className="tt-scroll flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 sm:gap-2.5 sm:overflow-visible"
    >
      {weekdays.map((day) => {
        const isSelected = day.key === selected;
        const isToday = day.key === todayKey;
        return (
          <motion.button
            key={day.key}
            role="tab"
            aria-selected={isSelected}
            data-weekday={day.key}
            onClick={() => onSelect(day.key)}
            whileTap={animate ? { scale: 0.97 } : undefined}
            className="focus-ring group relative flex min-w-[92px] flex-1 flex-col items-start gap-1 rounded-[var(--r-md)] px-3.5 py-3 text-left transition-colors duration-200"
            style={{
              background: isSelected ? "var(--accent-tint-strong)" : "var(--surface)",
              border: isSelected
                ? "1px solid var(--accent-line)"
                : "1px solid var(--line)",
              boxShadow: isSelected ? "var(--shadow-soft)" : "none",
              backdropFilter: "blur(var(--blur))",
              WebkitBackdropFilter: "blur(var(--blur))",
            }}
          >
            <span
              className="text-sm font-medium transition-colors"
              style={{ color: isSelected ? "var(--accent-strong)" : "var(--text)" }}
            >
              {day.label}
            </span>
            {isToday ? (
              <span
                className="font-mono text-[9px] uppercase tracking-[0.16em]"
                style={{ color: isSelected ? "var(--accent)" : "var(--accent-strong)" }}
              >
                Hôm nay
              </span>
            ) : (
              <span
                className="font-mono text-[9px] uppercase tracking-[0.16em]"
                style={{ color: "var(--text-dim)" }}
              >
                5 tiết học
              </span>
            )}
            {isSelected && (
              <motion.span
                layoutId={animate ? "week-underline" : undefined}
                className="absolute inset-x-3.5 bottom-1.5 h-px"
                style={{ background: "var(--accent-line)" }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
