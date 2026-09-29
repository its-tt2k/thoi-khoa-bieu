// Time helpers. All "current day / current time" logic is resolved in the
// Asia/Ho_Chi_Minh timezone explicitly, never the host machine timezone.

import { periodTimes, weekdays, type WeekdayKey } from "./timetable";

const TZ = "Asia/Ho_Chi_Minh";

export interface VietnamNow {
  /** JS-style weekday, 0 = Sunday ... 6 = Saturday, resolved in Vietnam TZ. */
  jsDay: number;
  /** Minutes since local midnight in Vietnam, e.g. 09:30 -> 570. */
  minutes: number;
  /** The timetable weekday key when today is Mon-Fri, else null (weekend). */
  weekdayKey: WeekdayKey | null;
  /** Formatted Vietnamese date, e.g. "Thứ Hai, 28 tháng 9, 2026". */
  dateLabel: string;
}

/**
 * Resolve "now" as seen in Vietnam, regardless of the host machine timezone.
 * Uses Intl.DateTimeFormat with an explicit timeZone so the weekday is correct
 * even when the server / browser runs in another region.
 */
export function getVietnamNow(base: Date = new Date()): VietnamNow {
  // Weekday number in Vietnam TZ.
  const weekdayName = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
  }).format(base);
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const jsDay = dayMap[weekdayName] ?? 0;

  // Hours + minutes in Vietnam TZ.
  const hm = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(base);
  const [h, m] = hm.split(":").map((n) => parseInt(n, 10));
  const minutes = (h % 24) * 60 + m;

  // Vietnamese formatted date.
  const dateLabel = new Intl.DateTimeFormat("vi-VN", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(base);

  const match = weekdays.find((w) => w.jsDay === jsDay);

  return {
    jsDay,
    minutes,
    weekdayKey: match ? match.key : null,
    dateLabel,
  };
}

/**
 * Day-of-month number (e.g. "29") for each weekday Mon-Fri of the week that
 * contains `base`, resolved in Vietnam TZ. Shown under each weekday chip so the
 * label carries real information instead of repeated filler text.
 */
export function getWeekDates(base: Date = new Date()): Record<WeekdayKey, string> {
  const now = getVietnamNow(base);
  const currentJs = now.jsDay === 0 ? 7 : now.jsDay; // Sunday -> end of week
  const result = {} as Record<WeekdayKey, string>;
  for (const w of weekdays) {
    const d = new Date(base.getTime() + (w.jsDay - currentJs) * 86_400_000);
    result[w.key] = new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ,
      day: "numeric",
    }).format(d);
  }
  return result;
}

/** Parse "HH:MM" into minutes since midnight. */
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  return h * 60 + m;
}

/**
 * Determine the current period id from configured periodTimes and the current
 * Vietnam time. Returns null when no times are configured (we do not invent
 * bell times) or when the current time is outside every configured window.
 */
export function getCurrentPeriodId(now: VietnamNow): number | null {
  if (!periodTimes.length) return null;
  // Only meaningful on an actual school weekday.
  if (now.weekdayKey === null) return null;
  for (const pt of periodTimes) {
    const start = toMinutes(pt.start);
    const end = toMinutes(pt.end);
    if (now.minutes >= start && now.minutes < end) {
      return pt.period;
    }
  }
  return null;
}
