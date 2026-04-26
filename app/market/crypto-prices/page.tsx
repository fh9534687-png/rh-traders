import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crypto Prices | RH Traders",
  description:
    "Live crypto prices for context: BTC, ETH and major assets with 24h change—built for learning, not hype.",
};

export default function CryptoPricesPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="rh-wrap px-5 py-14">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
          MARKET
        </p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Crypto Prices
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-9 text-slate-300">
          Fast price context for learning. Use it to compare assets, see volatility, and practice planning entries
          and stops—before risking capital.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm leading-7 text-slate-300">
            Tip: You already have a prices endpoint at{" "}
            <code className="rounded bg-black/30 px-1.5 py-0.5 text-slate-200">/api/prices</code>. Next step is
            rendering a clean table here (BTC/ETH + market cap + 24h change).
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/market"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/8"
          >
            Market Overview
          </Link>
          <Link
            href="/coins"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--rh-accent)] px-6 py-3 text-sm font-extrabold text-white shadow-[0_0_22px_rgba(255,106,0,0.28)] transition hover:bg-[color:var(--rh-accent-bright)]"
          >
            Browse Coins
          </Link>
        </div>
      </div>
    </main>
  );
}

