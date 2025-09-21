import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 공통 임포트
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import RouteKey from "@/components/RouteKey";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bunny Stock",
  description: "데이터 기반 투자 인텔리전스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b1220]`}
      >
        <Header />
          <ScrollToTop />
          <RouteKey>
            <div className="pt-16">{children}</div>
          </RouteKey>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
