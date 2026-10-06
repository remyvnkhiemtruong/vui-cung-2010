# 🌸 Vui Cùng 20/10 – Vietnamese Women's Day Quiz Game

> Trò chơi trắc nghiệm tương tác chào mừng Ngày Phụ Nữ Việt Nam 20/10 mang phong cách game show hiện đại, tôn vinh truyền thống và kiến thức phụ nữ Việt Nam.

---

## 1. Giới thiệu

**Vui Cùng 20/10** là ứng dụng web game trắc nghiệm truyền cảm hứng và tôn vinh những người phụ nữ Việt Nam qua các thời kỳ lịch sử, văn hóa, xã hội và pháp luật bình đẳng giới.

### ✨ Các tính năng nổi bật:
- **Game Show Experience**: Giao diện sân khấu trực tiếp hiện đại, hiệu ứng cánh hoa rơi nhẹ nhàng, âm thanh Web Audio sống động (không cần tải file ngoài).
- **Bộ 12 câu hỏi chuẩn hóa**: Gồm trắc nghiệm lịch sử, văn hóa và các câu hỏi tình huống có hình ảnh minh họa.
- **Game Engine thông minh**:
  - Đếm ngược thời gian mỗi câu hỏi với cảnh báo gấp rút khi còn $\le 5$ giây.
  - Điểm cơ bản $100$ điểm + thưởng tốc độ tối đa $+50$ điểm + Combo Streak $+20$ điểm cho mỗi chuỗi đúng từ 3 câu liên tiếp.
  - Khóa đáp án chống spam click, tự động xử lý khi hết giờ.
- **Hỗ trợ phím tắt**: Bấm `1`, `2`, `3`, `4` hoặc `A`, `B`, `C`, `D` để chọn đáp án; bấm `Enter` để qua câu tiếp theo hoặc bắt đầu game.
- **Bảng thành tích & Xem lại (Review)**:
  - Phân loại 4 danh hiệu vinh danh kèm hiệu ứng pháo hoa Confetti rực rỡ.
  - Bảng xem lại toàn diện 12 câu với so sánh đáp án người chơi và lời giải chi tiết.
  - Lưu trữ kỷ lục điểm số cao nhất cục bộ trên thiết bị qua `localStorage`.
- **Hoàn toàn Client-Side & Static**: Không cần database backend, tải trang tức thì, tương thích tối đa với Vercel và GitHub Pages.

---

## 2. Công nghệ sử dụng

| Công nghệ | Phiên bản | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Next.js** | `16.3.8` (App Router, Turbopack) | React Framework tối ưu render tĩnh |
| **React** | `19.2.8` | Xây dựng giao diện thành phần phản ứng |
| **TypeScript** | `5.x` | Đảm bảo tính toàn vẹn kiểu dữ liệu |
| **Tailwind CSS** | `4.x` | Thiết kế giao diện hiện đại, responsive đa thiết bị |
| **Lucide React** | `1.52.0` | Hệ thống icon SVG sắc nét |
| **Canvas Confetti** | `1.9.4` | Hiệu ứng chúc mừng pháo hoa chiến thắng |
| **Web Audio API** | Native Browser | Tổng hợp âm thanh trò chơi không phụ thuộc file mp3 ngoài |

---

## 3. Cài đặt Node.js

Để chạy và biên dịch dự án, máy tính cần cài đặt **Node.js** phiên bản khuyến nghị **>= 18.18.0** hoặc **>= 20.x**.

1. Truy cập trang chủ chính thức: [https://nodejs.org/](https://nodejs.org/)
2. Tải về phiên bản **LTS (Long Term Support)** phù hợp với hệ điều hành của bạn (Windows, macOS hoặc Linux).
3. Chạy file cài đặt vừa tải về và làm theo hướng dẫn trên màn hình.
4. Kiểm tra cài đặt thành công bằng cách mở Terminal / PowerShell và gõ:
   ```bash
   node -v
   npm -v
   ```
   *(Nếu hiển thị số phiên bản như `v20.x.x` và `10.x.x` là đã thành công).*

---

## 4. Cài đặt thư viện (`npm install`)

Sau khi tải mã nguồn về máy, mở Terminal / Command Prompt tại thư mục dự án và chạy:

```bash
npm install
```

Lệnh này sẽ tự động tải và cài đặt toàn bộ dependencies được khai báo trong `package.json`.

---

## 5. Chạy môi trường phát triển (`npm run dev`)

Để khởi động máy chủ thử nghiệm cục bộ với tính năng Hot-Reload:

```bash
npm run dev
```

Mở trình duyệt web và truy cập địa chỉ:
```
http://localhost:3000
```

Mọi thay đổi trong mã nguồn sẽ được tự động cập nhật ngay lập tức trên trình duyệt.

---

## 6. Biên dịch Production (`npm run build`)

Để kiểm tra tính toàn vẹn, kiểm tra lỗi TypeScript/Linter và đóng gói mã nguồn thành bản tĩnh tối ưu:

```bash
npm run build
```

Khi build thành công, màn hình sẽ hiển thị:
```
✓ Compiled successfully
✓ Finished TypeScript
✓ Generating static pages (4/4)
Route (app)
○ / (Static)  prerendered as static content
```

Để chạy thử bản production vừa build trên máy:
```bash
npm run start
```

---

## 7. Hướng dẫn Deploy lên Vercel

Dự án được tối ưu hóa 100% để triển khai chỉ với 1 click lên nền tảng **Vercel**:

### Cách 1: Deploy qua GitHub (Khuyên dùng)
1. Đẩy mã nguồn dự án lên một kho lưu trữ (repository) trên [GitHub](https://github.com).
2. Đăng nhập vào [Vercel](https://vercel.com/) bằng tài khoản GitHub.
3. Bấm nút **"Add New..."** $\rightarrow$ chọn **"Project"**.
4. Chọn repository vừa tạo và nhấn **"Import"**.
5. Trong phần thiết lập Project:
   - **Framework Preset**: Chọn `Next.js` (Vercel tự động nhận diện).
   - **Root Directory**: `./` (để mặc định).
   - **Build Command**: `npm run build` (mặc định).
   - **Output Directory**: `.next` (mặc định).
   - Không cần cấu hình thêm bất kỳ biến môi trường (`Environment Variables`) nào.
6. Bấm nút **"Deploy"**. Trong vòng 1 phút, trang web của bạn sẽ hoạt động trực tuyến với chứng chỉ SSL miễn phí!

### Cách 2: Deploy qua Vercel CLI
Nếu bạn có Vercel CLI cài trên máy:
```bash
npm install -g vercel
vercel
```
Làm theo các bước hướng dẫn trên dòng lệnh để hoàn tất deploy.

---

## 8. Hướng dẫn cách thay đổi hoặc thêm câu hỏi

Toàn bộ ngân hàng câu hỏi được tách biệt hoàn toàn tại file:
```
src/data/questions.ts
```

### Cấu trúc một câu hỏi:
```typescript
{
  id: "cau-1",
  type: "text-choice", // Hoặc "multiple-choice" | "image-choice"
  question: "Nội dung câu hỏi ở đây...",
  options: [
    { key: "A", text: "Nội dung đáp án A" },
    { key: "B", text: "Nội dung đáp án B" },
    { key: "C", text: "Nội dung đáp án C" },
    { key: "D", text: "Nội dung đáp án D" },
  ],
  correctAnswer: "A", // "A" | "B" | "C" | "D"
  explanation: "Giải thích chi tiết tại sao đáp án này đúng...",
  image: "/questions/ten-anh.png", // Tùy chọn (chỉ dùng cho câu hỏi có ảnh)
}
```

### Cách chỉnh sửa:
1. Mở file `src/data/questions.ts`.
2. Để sửa câu hỏi có sẵn: tìm đến ID tương ứng và thay đổi trường `question`, `options`, `correctAnswer` hoặc `explanation`.
3. Để thêm câu hỏi mới: thêm một object vào mảng `questionBank`. Giao diện GameHUD và thanh tiến trình sẽ tự động tính toán tổng số câu hỏi theo mảng này.

---

## 9. Hướng dẫn cách thay hình ảnh minh họa

Dự án hỗ trợ các câu hỏi minh họa trực quan (`image-choice`).

### Vị trí lưu trữ ảnh:
Đặt các file hình ảnh vào thư mục:
```
public/questions/
```
*Ví dụ:* `public/questions/domestic-violence.png`, `public/questions/housework.png`.

### Cách gắn ảnh vào câu hỏi:
1. Chép file ảnh của bạn (định dạng `.png`, `.jpg`, `.webp`) vào thư mục `public/questions/`.
2. Mở file `src/data/questions.ts`, tìm câu hỏi muốn thêm ảnh và gán đường dẫn:
   ```typescript
   image: "/questions/ten-anh-cua-ban.png",
   type: "image-choice",
   ```
3. **Cơ chế an toàn (Fallback UI)**:
   - Nếu đường dẫn ảnh bị lỗi hoặc file chưa kịp tải lên, component `QuestionMedia` sẽ tự động hiển thị khung minh họa thay thế đẹp mắt kèm thông báo mà **tuyệt đối không làm crash ứng dụng**.
   - Hình ảnh hiển thị dạng `contain` để không bao giờ bị cắt mất chữ hoặc chi tiết quan trọng.

---

## 10. Hướng dẫn cách điều chỉnh thời gian Timer

Thời lượng đếm ngược cho mỗi câu hỏi được quản lý tập trung qua một hằng số duy nhất.

### Vị trí cấu hình:
Mở file `src/utils/gameEngine.ts` tại dòng 9:

```typescript
export const QUESTION_TIME_LIMIT = 20; // Số giây mỗi câu (mặc định là 20)
```

### Cách thay đổi:
- Đổi giá trị số `20` thành thời gian mong muốn (ví dụ: `15` giây hoặc `30` giây):
  ```typescript
  export const QUESTION_TIME_LIMIT = 30; // Chuyển sang 30 giây mỗi câu
  ```
- **Tự động đồng bộ**: Khi bạn thay đổi giá trị này:
  - Đồng hồ đếm ngược tròn SVG sẽ tự động cập nhật thời gian tối đa và tỉ lệ vòng đếm.
  - Cảnh báo đếm ngược gấp rút (vòng đỏ nhấp nháy, âm thanh tíc-tắc) tự động kích hoạt khi thời gian còn $\le 5$ giây.
  - Huy hiệu (Badge) và thẻ luật chơi trên màn hình trang chủ (Home Screen) sẽ **tự động cập nhật số giây mới** tương ứng.

---

## 🏆 Đánh giá kiểm tra trước khi Deploy (Pre-flight QA)

- [x] **Production Build**: `npm run build` đạt kết quả **PASS** (100% static prerendered).
- [x] **TypeScript & Linter**: 0 lỗi, 0 cảnh báo.
- [x] **Responsive**: Tương thích hoàn hảo trên Mobile 360px, iPad 768px, Laptop 1366px và màn chiếu hội trường Full HD 1080p.
- [x] **Accessibility**: Tương thích bàn phím, điều hướng số `1-4`, chữ `A-D`, `Enter`, hỗ trợ chế độ giảm chuyển động (`prefers-reduced-motion`).
- [x] **SEO & Metadata**: Đầy đủ Title, Description tiếng Việt, thẻ Open Graph và Twitter Card.

---

*Chúc các bạn có một chương trình kỷ niệm Ngày Phụ Nữ Việt Nam 20/10 thật ý nghĩa và tràn đầy niềm vui! 🌷*
