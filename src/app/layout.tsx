import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "English Club Mini Game | Vietnamese Women's Day";
const description = "12 English-language questions from Ms. Phan Thanh Thuy's Vietnamese Women's Day quiz, with a live game system developed by Truong Minh Khiem.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Vietnamese Women's Day", "October 20", "20/10", "English Club", "Mini Game", "Vietnamese Women"],
  authors: [{ name: "Phan Thanh Thuy" }, { name: "Truong Minh Khiem" }],
  creator: "Truong Minh Khiem",
  other: {
    "question-author": "Ms. Phan Thanh Thuy, English Teacher, Vo Van Kiet High School",
    "system-developer": "Truong Minh Khiem, Cohort 52 Student, Ho Chi Minh City University of Education"
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "Vietnamese Women's Day | English Club",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full min-h-0 antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
