import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Đoán Đồ Vật Qua Gợi Ý',
  description: 'Một trò chơi thú vị để kiểm tra trí thông minh của bạn qua các gợi ý',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body>{children}</body>
    </html>
  )
}
