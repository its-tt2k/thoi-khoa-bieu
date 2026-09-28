"use client";

import { TodayIndicator } from "@/components/TodayIndicator";

interface HeaderProps {
  dateLabel: string | null;
  previewing: boolean;
  weekend: boolean;
}

/**
 * Page header: strong title, quiet supporting text, and the today indicator.
 */
export function Header({ dateLabel, previewing, weekend }: HeaderProps) {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
        >
          Thời khóa biểu
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "var(--text-muted)" }}>
          Lịch học của bạn
        </p>
      </div>
      <TodayIndicator dateLabel={dateLabel} previewing={previewing} weekend={weekend} />
    </header>
  );
}
