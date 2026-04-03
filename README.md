# Đoán Đồ Vật Qua Gợi Ý - Guess the Object Game

Một trò chơi tương tác thú vị nơi bạn cạnh tranh với AI để đoán đồ vật dựa trên gợi ý!

## 🎮 Chế Độ Chơi

- **Dễ** (Easy): 40 giây mỗi câu, AI chậm
- **Trung Bình** (Medium): 30 giây, có sự kiện ngẫu nhiên
- **Khó** (Hard): 20 giây, AI siêu nhanh, nhiều sự kiện
- **Đoán Ý AI** (Predict): Đoán xem AI sẽ chọn gì

## 📋 Yêu Cầu

- Node.js 16+ 
- npm hoặc yarn

## 🚀 Cách Chạy Locally

1. Clone repository:
```bash
git clone <your-repo-url>
cd game-doan-do-vat
```

2. Cài dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Chạy development server:
```bash
npm run dev
# hoặc
yarn dev
```

4. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt

## 🌐 Deploy lên Vercel

### Cách 1: Dùng Vercel CLI

```bash
npm install -g vercel
vercel
```

### Cách 2: Connect GitHub (Recommended)

1. Push code lên GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Vào [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import repository của bạn
5. Vercel sẽ tự động detect Next.js và deploy

### Cách 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/game-doan-do-vat)

## 📁 Cấu Trúc Dự Án

```
.
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── GameClient.tsx   # Game component
│   ├── globals.css      # Global styles
│   └── game.module.css  # Game module styles
├── public/
│   └── game.js          # Game logic
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## 🛠️ Build cho Production

```bash
npm run build
npm run start
```

## 📊 Tính Năng

- ✅ 4 chế độ chơi với độ khó khác nhau
- ✅ AI dùng decision tree để đoán
- ✅ Hệ thống điểm và Boss AI
- ✅ Power-up kỹ năng
- ✅ Responsive design cho mobile
- ✅ Giao diện theme tối (dark theme)
- ✅ Hiệu ứng và animation
- ✅ 20 đồ vật khác nhau

## 🎯 Cách Chơi

1. Chọn chế độ chơi từ menu
2. Đọc gợi ý từng cái để đoán đồ vật
3. Chọn đáp án từ 4 lựa chọn
4. So sánh kết quả với AI
5. Kiếm điểm bằng cách đoán đúng
6. Sau 5 câu, chiến đấu với Boss AI
7. Dùng power-up để cản AI hoặc tăng điểm

## 🤖 AI Logic

Game sử dụng **Decision Tree Algorithm** để AI đoán đồ vật:
- Phân tích từng đặc điểm của vật
- Đưa ra dự đoán dựa trên logic
- Phản ứng nhanh hơn ở các chế độ khó

## 🤝 Góp Ý & Báo Cáo Lỗi

Tạo issue hoặc pull request nếu bạn tìm thấy bug hoặc có ý tưởng cải thiện!

## 📝 License

MIT License - Thoải mái sử dụng trong dự án của bạn!
