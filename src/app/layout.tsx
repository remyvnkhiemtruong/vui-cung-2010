import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Club Mini Game | Vietnamese Women's Day",
  description: "An English Club mini game: 10 random questions with vocabulary, inspiring women, and picture clues for October 20.",
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
    title: "English Club Mini Game | Vietnamese Women's Day",
    description: "An English Club mini game: 10 random questions with vocabulary, inspiring women, and picture clues for October 20.",
    type: "website",
    locale: "en_US",
    siteName: "Vietnamese Women's Day Quiz",
  },
  twitter: {
    card: "summary_large_image",
    title: "English Club Mini Game | Vietnamese Women's Day",
    description: "An English Club mini game: 10 random questions with vocabulary, inspiring women, and picture clues for October 20.",
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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
