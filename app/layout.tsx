import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OnTrack - 授業・プレゼンのためのタイマーアプリ",
    template: "%s | OnTrack",
  },
  description: "授業やプレゼンのためのタイムマネジメントアプリ。全体時間と現在の活動時間、簡易的な授業・発表計画を1画面で可視化し、授業・プレゼンをサポートします。",
  keywords: ["授業タイマー", "模擬授業", "教員便利ツール", "タイムキーパー", "OnTrack", "教育実習"],
  authors: [{ name: "Ryoga" }],
  openGraph: {
    title: "OnTrack - 授業用タイマーアプリ",
    description: "授業・発表の「今」と「あとどれくらい」が一目でわかる時間管理ツール。",
    url: "https://on-track-timer.vercel.app",
    siteName: "OnTrack",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Vercel Analytics */}
        <Analytics />
      </body>
      
      {/* Google Analytics */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}