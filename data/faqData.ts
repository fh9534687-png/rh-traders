export type FaqItem = {
  slug: string;
  title: string;
  /** Unique 0–8: drives blue trading SVG thumbnail art on cards & article hero. */
  thumbVariant: number;
  /** Optional raster fallback (e.g. after `npm run faq:images`). */
  image?: string;
};

export const faqItems: FaqItem[] = [
  {
    slug: "what-is-crypto-trading",
    title: "What is Crypto Trading? (Beginner’s Complete Guide 2026)",
    thumbVariant: 0,
    image: "/images/faq-custom/faq-1.png",
  },
  {
    slug: "how-to-start-crypto-trading-safely",
    title: "How to Start Crypto Trading Safely (Step-by-Step for Beginners)",
    thumbVariant: 1,
    image: "/images/faq-custom/faq-2.png",
  },
  {
    slug: "best-platforms-cex-vs-dex",
    title: "Best Platforms for Crypto Trading (CEX vs DEX Explained Simply)",
    thumbVariant: 2,
    image: "/images/faq-custom/faq-3.png",
  },
  {
    slug: "how-to-read-crypto-charts",
    title: "How to Read Crypto Charts Like a Pro (Candlesticks + Trends)",
    thumbVariant: 3,
    image: "/images/faq-custom/faq-4.png",
  },
  {
    slug: "spot-vs-futures-vs-margin",
    title: "Spot vs Futures vs Margin Trading (Which One is Best?)",
    thumbVariant: 4,
    image: "/images/faq-custom/faq-5.png",
  },
  {
    slug: "why-traders-lose-money",
    title: "Why 90% of Traders Lose Money (And How You Can Avoid It)",
    thumbVariant: 5,
    image: "/images/faq-custom/faq-6.png",
  },
  {
    slug: "best-strategies-for-beginners",
    title: "Best Crypto Trading Strategies for Beginners (DCA + Indicators)",
    thumbVariant: 6,
    image: "/images/faq-custom/faq-7.png",
  },
  {
    slug: "avoid-scams-dyor",
    title: "How to Avoid Crypto Scams & Do Proper Research (DYOR Guide)",
    thumbVariant: 7,
    image: "/images/faq-custom/faq-8.png",
  },
  {
    slug: "complete-beginner-roadmap",
    title: "Complete Crypto Beginner Roadmap (From Zero to Pro Trader)",
    thumbVariant: 8,
    image: "/images/faq-custom/faq-9.png",
  },
];

export function getFaqBySlug(slug: string): FaqItem | undefined {
  return faqItems.find((item) => item.slug === slug);
}
