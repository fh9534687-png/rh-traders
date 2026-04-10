import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Pillar = {
  slug: string;
  title: string;
  oneLine: string;
  definition: string;
  whyItMatters: string[];
  beginnerSteps: string[];
};

const PILLARS: Pillar[] = [
  {
    slug: "market-trend",
    title: "Market Trend",
    oneLine: "Bull vs bear direction",
    definition:
      "Market trend is the main direction price is moving. A bull trend is mostly up. A bear trend is mostly down.",
    whyItMatters: [
      "Trading with the trend is usually easier than fighting it.",
      "Trends help you choose better entries and avoid random trades.",
      "Trend gives you context: it explains why price keeps pushing or dropping.",
    ],
    beginnerSteps: [
      "Zoom out on the chart (higher timeframes).",
      "Ask: are highs and lows going up (bull) or down (bear)?",
      "Only take beginner trades in the direction of the bigger trend.",
    ],
  },
  {
    slug: "support-resistance",
    title: "Support & Resistance",
    oneLine: "Key price levels",
    definition:
      "Support and resistance are important price zones. Support is where price often stops falling. Resistance is where price often stops rising.",
    whyItMatters: [
      "They help you plan entries and exits instead of guessing.",
      "They explain common bounces and rejections.",
      "They help you set realistic targets and stop losses.",
    ],
    beginnerSteps: [
      "Mark the last 2–3 big highs and lows.",
      "Treat lines as zones, not perfect lines.",
      "Look for reactions: bounce at support, rejection at resistance.",
    ],
  },
  {
    slug: "volume",
    title: "Volume",
    oneLine: "Market strength",
    definition:
      "Volume is how much buying and selling is happening. Higher volume usually means stronger interest and more reliable moves.",
    whyItMatters: [
      "It helps you see if a breakout is strong or weak.",
      "It can confirm when a trend move has real support.",
      "Low volume moves can be traps, especially in smaller coins.",
    ],
    beginnerSteps: [
      "Compare volume on the breakout candle vs recent candles.",
      "Prefer moves that rise with volume and pull back with lower volume.",
      "Avoid chasing pumps when volume looks exhausted.",
    ],
  },
  {
    slug: "risk-management",
    title: "Risk Management",
    oneLine: "Control loss",
    definition:
      "Risk management is how you protect your money. It includes position sizing, stop losses, and rules so one mistake can’t wipe you out.",
    whyItMatters: [
      "It keeps you in the market long enough to learn.",
      "It reduces panic because you already know your maximum loss.",
      "It turns trading into a repeatable process, not gambling.",
    ],
    beginnerSteps: [
      "Risk small per trade (example: 1% or less).",
      "Use a stop loss before entering the trade.",
      "Write your plan: entry, target, stop.",
    ],
  },
];

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> | Metadata {
  return params.then(({ pillar }) => {
    const p = PILLARS.find((x) => x.slug === pillar);
    if (!p) return { title: "Pillar | RH Traders" };
    return {
      title: `${p.title} | RH Traders`,
      description: `${p.title} explained for beginners: ${p.oneLine}.`,
    };
  });
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar } = await params;
  const p = PILLARS.find((x) => x.slug === pillar);
  if (!p) notFound();

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="rh-wrap px-5 py-14">
        <div className="rh-content">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90">
            PILLAR
          </p>
          <h1 className="mt-5">{p.title}</h1>
          <p className="text-lg leading-9 text-white/90">{p.definition}</p>

          <div className="rh-card mt-8 rounded-3xl p-6">
            <h2>Why this pillar matters</h2>
            <ul className="mt-4 list-disc pl-6 text-white/90">
              {p.whyItMatters.map((x) => (
                <li key={x} className="mt-2">
                  {x}
                </li>
              ))}
            </ul>

            <h2>Beginner steps</h2>
            <ol className="mt-4 list-decimal pl-6 text-white/90">
              {p.beginnerSteps.map((x) => (
                <li key={x} className="mt-2">
                  {x}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#home"
              className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold text-white/95 transition"
            >
              Back to Home
            </Link>
            <Link
              href="/coins"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff1a1a] via-[#ff0000] to-[#a10000] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,26,26,0.34)] transition hover:shadow-[0_0_46px_rgba(255,26,26,0.72)]"
            >
              Explore Coins
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

