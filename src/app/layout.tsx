import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vietnamese Women's Day Quiz | October 20",
  description: "An interactive quiz celebrating Vietnamese Women's Day on October 20.",
  keywords: [
    "20/10",
    "Vietnamese Women's Day",
    "Vietnamese Women's Day",
    "Quiz 20/10",
    "October 20 Quiz",
    "Game show 20/10",
  ],
  authors: [{ name: "20/10 Quiz Team" }],
  openGraph: {
    title: "Vietnamese Women's Day Quiz | October 20",
    description: "An interactive quiz celebrating Vietnamese Women's Day on October 20.",
    type: "website",
    locale: "vi_VN",
    siteName: "Vietnamese Women's Day Quiz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vietnamese Women's Day Quiz | October 20",
    description: "An interactive quiz celebrating Vietnamese Women's Day on October 20.",
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
