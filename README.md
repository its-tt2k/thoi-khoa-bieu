# Thời khóa biểu

Ứng dụng thời khóa biểu cá nhân (lịch học 5 ngày, 5 tiết), giao diện tối sang trọng
với điểm nhấn vàng champagne. Ngày hiện tại được xác định tự động theo múi giờ
`Asia/Ho_Chi_Minh`.

## Tính năng

- Tự động xác định thứ hiện tại theo giờ Việt Nam và tô sáng cột tương ứng.
- Chọn xem trước một thứ khác mà không làm thay đổi ngày thực tế (nhãn "Đang xem").
- Nút "Về hôm nay" để quay lại ngày thực tế.
- Cuộn ngang bảng thời khóa biểu trên mobile, tự cuộn tới thứ đang chọn.
- Tôn trọng `prefers-reduced-motion` và có phương án dự phòng khi không hỗ trợ
  `backdrop-filter` (giao diện đặc, không trong suốt).

## Công nghệ

Next.js 15, React 19, Tailwind CSS v4, Motion (`motion/react`), `next/font` (Geist),
Phosphor Icons.

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
```

## Cấu trúc

```
app/            # layout, trang chính, CSS toàn cục
components/     # Header, WeekSelector, Timetable, TimetableRow, LessonCell, TodayIndicator
lib/timetable.ts  # dữ liệu thời khóa biểu (tách khỏi giao diện)
lib/time.ts       # logic ngày giờ theo múi giờ Việt Nam
```

## Tuỳ chỉnh

- **Đổi lịch học / giáo viên:** sửa `timetable` trong `lib/timetable.ts`.
- **Bật chỉ báo "Tiết hiện tại":** điền `periodTimes` trong `lib/timetable.ts`
  (hiện đang để trống vì chưa có giờ vào tiết thực tế).
