"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowClockwise } from "@phosphor-icons/react";
import { Header } from "@/components/Header";
import { WeekSelector } from "@/components/WeekSelector";
import { Timetable } from "@/components/Timetable";
import { getCurrentPeriodId, getVietnamNow } from "@/lib/time";
import { periodTimes, weekdays, type WeekdayKey } from "@/lib/timetable";

export default function Page() {
  const prefersReduced = useReducedMotion();
  const animate = !prefersReduced;

  // Real current weekday resolved in Vietnam TZ. null = weekend or pre-mount.
  const [todayKey, setTodayKey] = useState<WeekdayKey | null>(null);
  const [dateLabel, setDateLabel] = useState<string | null>(null);
  const [currentPeriodId, setCurrentPeriodId] = useState<number | null>(null);
  const [isWeekend, setIsWeekend] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Selected (previewed) weekday. Defaults to Monday until the client resolves
  // the real day, then snaps to today (or stays on a weekday over the weekend).
  const [selected, setSelected] = useState<WeekdayKey>("monday");

  // Resolve the real "now" in Asia/Ho_Chi_Minh after mount (client only, so the
  // weekday is never wrong due to host / server timezone, and no hydration gap).
  useEffect(() => {
    function sync() {
      const now = getVietnamNow();
      setTodayKey(now.weekdayKey);
      setDateLabel(now.dateLabel);
      setIsWeekend(now.weekdayKey === null);
      setCurrentPeriodId(getCurrentPeriodId(now));
    }
    sync();
    setMounted(true);
    // Re-sync every minute so "current period" and date stay live.
    const id = window.setInterval(sync, 60_000);
    return () => window.clearInterval(id);
  }, []);

  // When today is first resolved, select it (weekend keeps the default weekday).
  useEffect(() => {
    if (todayKey) setSelected(todayKey);
  }, [todayKey]);

  // On mobile, scroll the selected weekday chip into view when it changes.
  useEffect(() => {
    if (!mounted) return;
    const el = document.querySelector<HTMLElement>(
      `[data-weekday="${selected}"]`
    );
    if (el) {
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selected, mounted, prefersReduced]);

  const previewing = mounted && todayKey !== null && selected !== todayKey;

  const hasPeriodTimes = periodTimes.length > 0;
  const selectedLabel = useMemo(
    () => weekdays.find((w) => w.key === selected)?.label ?? "",
    [selected]
  );

  return (
    <main className="relative min-h-[100dvh] w-full">
      <div className="app-ambient" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1040px] flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
        <Header dateLabel={dateLabel} previewing={previewing} weekend={isWeekend} />

        <motion.section
          initial={animate ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1], delay: 0.05 }}
          className="flex flex-col gap-3"
          aria-label="Bộ chọn thứ trong tuần"
        >
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "var(--text-dim)" }}
            >
              Đang xem: {selectedLabel}
            </span>
            {previewing && todayKey && (
              <button
                onClick={() => setSelected(todayKey)}
                className="focus-ring inline-flex items-center gap-1.5 rounded-[var(--r-sm)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors"
                style={{ color: "var(--accent-strong)" }}
              >
                <ArrowClockwise size={12} weight="bold" />
                Về hôm nay
              </button>
            )}
          </div>
          <WeekSelector
            selected={selected}
            todayKey={todayKey}
            onSelect={setSelected}
            animate={animate}
          />
        </motion.section>

        <section aria-label="Thời khóa biểu" className="flex-1">
          <Timetable
            activeKey={selected}
            todayKey={todayKey}
            currentPeriodId={currentPeriodId}
            animate={animate}
          />
          {!hasPeriodTimes && (
            <p className="mt-3 text-xs" style={{ color: "var(--text-dim)" }}>
              Chưa cấu hình giờ từng tiết, nên chưa hiển thị tiết hiện tại.
            </p>
          )}
        </section>

        <footer className="mt-auto pt-4">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: "var(--text-dim)" }}
          >
            Tự động cập nhật theo ngày hiện tại
          </p>
        </footer>
      </div>
    </main>
  );
}
