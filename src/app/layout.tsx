import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vui Cùng 20/10 | Vietnamese Women's Day Quiz",
  description: "Trò chơi trắc nghiệm tương tác chào mừng Ngày Phụ nữ Việt Nam 20/10.",
  keywords: [
    "20/10",
    "Ngày Phụ Nữ Việt Nam",
    "Vietnamese Women's Day",
    "Quiz 20/10",
    "Trắc nghiệm 20/10",
    "Game show 20/10",
  ],
  authors: [{ name: "20/10 Quiz Team" }],
  openGraph: {
    title: "Vui Cùng 20/10 | Vietnamese Women's Day Quiz",
    description: "Trò chơi trắc nghiệm tương tác chào mừng Ngày Phụ nữ Việt Nam 20/10.",
    type: "website",
    locale: "vi_VN",
    siteName: "Vui Cùng 20/10",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vui Cùng 20/10 | Vietnamese Women's Day Quiz",
    description: "Trò chơi trắc nghiệm tương tác chào mừng Ngày Phụ nữ Việt Nam 20/10.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full">
      <body className="min-h-full flex flex-col antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
