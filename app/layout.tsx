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
};

export const viewport = {
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socialProfiles = [
    "https://www.instagram.com/bulls_tradingzone?igsh=MXZ1amk1M2ZwZnBsNQ%3D%3D&utm_source=qr",
    "https://www.facebook.com/share/1BotTncw1F/?mibextid=wwXIfr",
    "https://www.tiktok.com/@itssebi24?_r=1&_t=ZS-95bqlbwTi6P",
    "http://www.youtube.com/@RHworld-o9s",
  ];

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RH Traders",
    url: siteUrl,
    description:
      "RH Traders is a learning platform for structured crypto trading education, dashboards, and trading signals.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RH Traders",
    description:
      "RH Traders is a trading platform and learning system offering a crypto trading course, structured dashboards, and trading signals for serious learners.",
    url: siteUrl,
    sameAs: [`${siteUrl}/contact`, ...socialProfiles],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "rh6219289@gmail.com",
        telephone: "+92 349 5357142",
        areaServed: "PK",
        availableLanguage: ["en", "ur"],
      },
    ],
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "RH Traders Dashboard",
    url: `${siteUrl}/dashboard`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "Member dashboard for RH Traders: course access, lectures library, tools, and trading signals (for eligible plans).",
    offers: [
      {
        "@type": "Offer",
        category: "subscription",
        url: `${siteUrl}/plans`,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  const toolsItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RH Traders Trading Tools",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trading Risk Calculator",
        url: `${siteUrl}/tools/risk`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trading Position Size Calculator",
        url: `${siteUrl}/tools/position-size`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Trading Profit & Loss Calculator",
        url: `${siteUrl}/tools/profit-loss`,
      },
    ],
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              websiteJsonLd,
              orgJsonLd,
              webAppJsonLd,
              toolsItemListJsonLd,
            ]),
          }}
        />
        <Header />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
