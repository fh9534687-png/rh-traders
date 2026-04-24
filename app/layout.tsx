import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { SiteFooter } from "./components/SiteFooter";
import { PwaRegistrar } from "./components/PwaRegistrar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rhtraders.com";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RH Traders | Crypto Trading Courses, Signals, and Dashboards",
    template: "%s | RH Traders",
  },
  description:
    "RH Traders is a learning platform for structured crypto trading education, practical dashboards, and trading signals designed for disciplined execution.",
  manifest: "/manifest.json",
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RH Traders",
    description:
      "RH Traders is a trading platform and learning system offering a crypto trading course, structured dashboards, and trading signals for serious learners.",
    url: siteUrl,
    sameAs: [`${siteUrl}/contact`],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#020617] text-slate-100 antialiased transition-colors duration-300">
        <PwaRegistrar />
        <script
          type="application/ld+json"
          // JSON-LD must be a string to avoid escaping issues.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
