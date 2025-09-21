// app/(site)/layout.tsx
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import RouteKey from "@/components/RouteKey";
import ScrollToTop from "@/components/ScrollToTop";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <ScrollToTop />
      <RouteKey>
        <div className="pt-16">{children}</div>
      </RouteKey>
      <Footer />
      <BackToTop />
    </>
  );
}
