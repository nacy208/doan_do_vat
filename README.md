# 🤖 Đoán Đồ Vật Qua Gợi Ý

Web game giáo dục dành cho học sinh tiểu học — đấu trí với AI qua các gợi ý về đồ vật.

---

## 🎮 Các chế độ chơi

| Chế độ | Thời gian | AI delay |
|--------|-----------|----------|
| 🟢 Dễ | 40s | 18–24s |
| 🟡 Trung Bình | 30s | 12–16s |
| 🔴 Khó | 20s | 7–10s |

**Flow:** Chọn chế độ → Chọn giới tính → Đếm ngược 3-2-1 → Chơi 5 câu → Xem kết quả

---

## 📁 Cấu trúc thư mục

```
├── index.html              # Giao diện chính
├── style.css               # Thiết kế giao diện
├── game.js                 # Logic game + Decision Tree AI
├── logo.png                # Logo hiển thị góc phải dưới
├── cam_xuc_robot/          # Ảnh cảm xúc AI (12 trạng thái)
├── cap_độ_robot/           # Ảnh robot cho 3 chế độ
└── gioi_tinh_player/       # Ảnh đại diện nam/nữ
```

---

## 🚀 Cách chạy

### Yêu cầu
- Python 3 (có sẵn trên hầu hết máy tính)

### Chạy local

```bash
# Di chuyển vào thư mục project
cd đường-dẫn-đến-thư-mục

# Khởi động server
python -m http.server 3000

# Mở trình duyệt tại
http://localhost:3000
```

### Deploy lên web (Netlify)

1. Nén toàn bộ thư mục thành file `.zip`
2. Vào [app.netlify.com/drop](https://app.netlify.com/drop)
3. Kéo thả file `.zip` vào → nhận link ngay

---

## 🧠 Thuật toán

Game sử dụng **Cây Quyết Định (Decision Tree)** để AI phân loại đồ vật dựa trên 15 đặc trưng:

- `dungDienNang`, `coManHinh`, `coBanPhim`, `coTheGapLai`
- `diDong`, `coPin`, `coLoa`, `coCamera`
- `dungDeHoc`, `coNhieu`, `coNuoc`, `coLua`
- `hinhDang`, `chatLieu`, `coVach`

AI đọc gợi ý → chạy Decision Tree → đưa ra đáp án sau thời gian delay tùy chế độ.

---

## 📦 Công nghệ

- HTML / CSS / JavaScript thuần — không cần framework
- Font: [Nunito](https://fonts.google.com/specimen/Nunito) + [Patrick Hand](https://fonts.google.com/specimen/Patrick+Hand) (Google Fonts)
