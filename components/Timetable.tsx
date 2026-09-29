"use client";

import { motion } from "motion/react";
import { TimetableRow } from "@/components/TimetableRow";
import { periods, weekdays, type WeekdayKey } from "@/lib/timetable";

interface TimetableProps {
  /** The column that gets the accent treatment (previewed or today). */
  activeKey: WeekdayKey | null;
  /** The real current weekday (drives the column header "Hôm nay"). */
  todayKey: WeekdayKey | null;
  currentPeriodId: number | null;
  animate: boolean;
}

/**
 * The timetable grid: the hero of the product. Proper table semantics
 * (thead / tbody, row + column headers). Horizontally scrollable on mobile;
 * the rest of the UI stays responsive without squeezing the columns.
 */
export function Timetable({
  activeKey,
  todayKey,
  currentPeriodId,
  animate,
}: TimetableProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      className="glass overflow-hidden rounded-[var(--r-lg)]"
    >
      <div className="tt-scroll overflow-x-auto">
        <table
          className="w-full border-collapse text-left"
          style={{ minWidth: 640, tableLayout: "fixed" }}
        >
          <caption className="sr-only">
            Thời khóa biểu 5 tiết mỗi ngày, từ Thứ 2 đến Thứ 6
          </caption>
          <colgroup>
            <col style={{ width: 72 }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 px-3 py-3 text-left"
                style={{
                  background: "var(--bg-elev)",
                  borderRight: "1px solid var(--line)",
                }}
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{ color: "var(--text-dim)" }}
                >
                  Tiết
                </span>
              </th>
              {weekdays.map((day) => {
                const isActive = day.key === activeKey;
                const isToday = day.key === todayKey;
                return (
                  <th
                    key={day.key}
                    scope="col"
                    aria-current={isToday ? "date" : undefined}
                    className="px-3 py-3 text-left"
                    style={{
                      background: isActive ? "var(--accent-tint-strong)" : "transparent",
                      borderLeft: isActive
                        ? "1px solid var(--accent-line)"
                        : "1px solid transparent",
                      borderRight: isActive
                        ? "1px solid var(--accent-line)"
                        : "1px solid transparent",
                      borderTop: isActive
                        ? "1px solid var(--accent-line)"
                        : "1px solid transparent",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-sm font-semibold"
                        style={{
                          color: isActive ? "var(--accent-strong)" : "var(--text)",
                        }}
                      >
                        {day.label}
                      </span>
                      {isToday && (
                        <span
                          className="font-mono text-[9px] uppercase tracking-[0.14em]"
                          style={{ color: "var(--accent)" }}
                        >
                          Hôm nay
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {periods.map((p, i) => (
              <TimetableRow
                key={p.id}
                periodIndex={i}
                periodLabel={p.label}
                activeKey={activeKey}
                currentPeriodId={currentPeriodId}
                currentDayKey={todayKey}
                isLastRow={i === periods.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
