import type { Metadata } from "next";
import { MarketHistoryClient } from "./history-client";

export const metadata: Metadata = {
  title: "Market History | RH Traders",
  description:
    "Explore top gainers and top losers across 24h, 7d, and 30d timeframes to learn how momentum changes over time.",
};

export default function MarketHistoryPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="rh-wrap px-5 py-14">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
          MARKET
        </p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Market History
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-9 text-slate-300">
          Use timeframe filters to study how leaders and laggards change. This is for learning context and building
          discipline—not for chasing random pumps.
        </p>

        <MarketHistoryClient />
      </div>
    </main>
  );
}

