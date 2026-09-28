// Timetable domain data + types.
// Data is kept fully separate from presentation. Edit this file to change
// the schedule; no component needs to change.

export type WeekdayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export interface Lesson {
  /** Subject name shown prominently, e.g. "Toán". */
  subject: string;
  /** Teacher name, visually subordinate, e.g. "T.Hồng". Empty string when the slot is free. */
  teacher: string;
  /** True for a free / empty period ("Trống"). */
  empty?: boolean;
}

export interface WeekdayMeta {
  key: WeekdayKey;
  /** Vietnamese label, e.g. "Thứ 2". */
  label: string;
  /** JS Date.getDay() value this weekday maps to (1 = Monday ... 5 = Friday). */
  jsDay: number;
  /** Column index, 1-based, matching the brief (Thứ 2 = 1 ... Thứ 6 = 5). */
  column: number;
}

// Period labels (rows). 5 periods.
export const periods: { id: number; label: string }[] = [
  { id: 1, label: "Tiết 1" },
  { id: 2, label: "Tiết 2" },
  { id: 3, label: "Tiết 3" },
  { id: 4, label: "Tiết 4" },
  { id: 5, label: "Tiết 5" },
];

// Weekday metadata. Only Mon-Fri exist in this timetable.
export const weekdays: WeekdayMeta[] = [
  { key: "monday", label: "Thứ 2", jsDay: 1, column: 1 },
  { key: "tuesday", label: "Thứ 3", jsDay: 2, column: 2 },
  { key: "wednesday", label: "Thứ 4", jsDay: 3, column: 3 },
  { key: "thursday", label: "Thứ 5", jsDay: 4, column: 4 },
  { key: "friday", label: "Thứ 6", jsDay: 5, column: 5 },
];

// The schedule. Index 0 = Tiết 1 ... index 4 = Tiết 5.
export const timetable: Record<WeekdayKey, Lesson[]> = {
  monday: [
    { subject: "Hoá", teacher: "H.Trâm" },
    { subject: "Toán", teacher: "T.Hồng" },
    { subject: "Văn", teacher: "V.Hiền" },
    { subject: "Toán", teacher: "T.Hồng" },
    { subject: "HĐTN", teacher: "H.Trâm" },
  ],
  tuesday: [
    { subject: "Lý", teacher: "L.Hạnh" },
    { subject: "HĐTN", teacher: "L.Hạnh" },
    { subject: "CN", teacher: "Si.Linh" },
    { subject: "Sinh", teacher: "Si.Năm" },
    { subject: "AV", teacher: "A.XHà" },
  ],
  wednesday: [
    { subject: "Văn", teacher: "V.Hiền" },
    { subject: "Văn", teacher: "V.Hiền" },
    { subject: "AV", teacher: "A.XHà" },
    { subject: "Sử", teacher: "Su.Anh" },
    { subject: "Toán", teacher: "T.Hồng" },
  ],
  thursday: [
    { subject: "CN", teacher: "Si.Linh" },
    { subject: "Lý", teacher: "L.Hạnh" },
    { subject: "Sinh", teacher: "Si.Năm" },
    { subject: "Toán", teacher: "T.Hồng" },
    { subject: "Trống", teacher: "", empty: true },
  ],
  friday: [
    { subject: "Hoá", teacher: "H.Trâm" },
    { subject: "AV", teacher: "A.XHà" },
    { subject: "Lý", teacher: "L.Hạnh" },
    { subject: "Hoá", teacher: "H.Trâm" },
    { subject: "HĐTN", teacher: "H.Trâm" },
  ],
};

// ---------------------------------------------------------------------------
// Optional period bell times. LEFT EMPTY ON PURPOSE.
// The brief did not provide real school bell times, so none are invented.
// To enable the "Tiết hiện tại" (current period) indicator, fill this array
// with { period, start, end } entries using 24h "HH:MM" strings in Vietnam
// local time. Example (edit to match the real school schedule):
//
//   export const periodTimes: PeriodTime[] = [
//     { period: 1, start: "07:00", end: "07:45" },
//     { period: 2, start: "07:50", end: "08:35" },
//     { period: 3, start: "08:45", end: "09:30" },
//     { period: 4, start: "09:40", end: "10:25" },
//     { period: 5, start: "10:35", end: "11:20" },
//   ];
//
// While this array is empty, the app does NOT pretend to know the current
// lesson and the "Tiết hiện tại" indicator stays hidden.
// ---------------------------------------------------------------------------
export interface PeriodTime {
  period: number;
  /** 24h "HH:MM" in Vietnam local time. */
  start: string;
  /** 24h "HH:MM" in Vietnam local time. */
  end: string;
}

export const periodTimes: PeriodTime[] = [];
