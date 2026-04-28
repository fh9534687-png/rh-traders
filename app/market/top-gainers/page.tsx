import type { Metadata } from "next";
import Link from "next/link";
import { MarketMoversTable } from "../components/MarketMoversTable";

export const metadata: Metadata = {
  title: "Top Gainers in Crypto Market | RH Traders",
  description:
    "Learn what top gainers mean, why coins pump, how to analyze momentum safely, and the risks—written for traders.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2.25rem] border border-white/10 bg-white/5 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:p-10">
      <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 text-[15px] leading-8 text-slate-200 sm:text-base">
        {children}
      </div>
    </section>
  );
}

function MiniDiagram({
  title,
  desc,
  lines,
}: {
  title: string;
  desc: string;
  lines: Array<{ label: string; pct: number; tone: "sky" | "orange" | "danger" }>;
}) {
  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-6">
      <p className="text-sm font-extrabold text-white">{title}</p>
      <p className="mt-1 text-sm leading-7 text-slate-300">{desc}</p>
      <div className="mt-4 space-y-3">
        {lines.map((l) => (
          <div key={l.label} className="flex items-center gap-3">
            <div className="w-36 text-xs font-extrabold text-slate-200">
              {l.label}
            </div>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className={[
                  "absolute inset-y-0 left-0 rounded-full",
                  l.tone === "sky"
                    ? "bg-[color:var(--rh-skyblue)]"
                    : l.tone === "danger"
                      ? "bg-red-400"
                      : "bg-[color:var(--rh-accent)]",
                ].join(" ")}
                style={{ width: `${Math.max(6, Math.min(100, l.pct))}%` }}
              />
            </div>
            <div className="w-12 text-right text-xs font-extrabold text-slate-300">
              {l.pct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TopGainersPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="rh-wrap px-5 py-14">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
          MARKET
        </p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Top Gainers in Crypto Market
        </h1>
        <section className="mt-6 max-w-4xl">
          <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            INTRO: Top Gainers
          </h2>
          <p className="mt-3 text-lg leading-9 text-slate-300">
            Top Gainers refer to cryptocurrencies that have shown the highest price increase within a specific time
            period, such as 24 hours or 7 days.
          </p>
          <p className="mt-5 text-lg leading-9 text-slate-300">
            These coins often attract traders due to their strong momentum and rapid price movement. However,
            understanding why a coin is gaining is more important than just chasing price.
          </p>
          <p className="mt-5 text-lg leading-9 text-slate-300">
            This page helps you understand how top gainers work, what types of coins usually appear in this list, and
            how to analyze them properly before making trading decisions.
          </p>
        </section>

        <MarketMoversTable
          mode="gainers"
          title="Top gainers (sorted by 24h %)"
          timeframe="24h"
          limit={20}
        />

        <div className="mt-10 grid gap-6">
          <Section title="What Are Top Gainers?">
            <p>
              Top gainers are cryptocurrencies that have experienced the highest percentage increase in price over a
              selected time frame.
            </p>
            <p className="mt-5">
              For example, if a coin moves from $1 to $1.50, it has gained 50% in value, making it a potential top
              gainer.
            </p>
            <p className="mt-5">
              These coins are usually highlighted on exchanges and market platforms to help traders identify trending
              opportunities in the market.
            </p>
            <MiniDiagram
              title="Diagram: percent gain example"
              desc="A simple way to visualize a 50% move."
              lines={[
                { label: "$1 → $1.50", pct: 50, tone: "orange" },
                { label: "$1 → $1.10", pct: 10, tone: "sky" },
              ]}
            />
          </Section>

          <Section title="Types of Coins That Become Top Gainers">
            <p>
              Different types of cryptocurrencies can appear in the top gainers list depending on market conditions.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                {
                  h: "Large Cap Coins",
                  p: "Established coins like Bitcoin and Ethereum can become top gainers during strong market trends.",
                  tone: "border-[color:var(--rh-accent)]/60",
                },
                {
                  h: "Mid Cap Coins",
                  p: "These coins often show faster growth compared to large cap coins and attract active traders.",
                  tone: "border-[color:var(--rh-skyblue)]/70",
                },
                {
                  h: "Low Cap Coins",
                  p: "Smaller market cap coins can rise quickly due to lower liquidity and higher volatility, but they also carry higher risk.",
                  tone: "border-white/10",
                },
                {
                  h: "Trending Tokens",
                  p: "Coins related to new trends such as AI, DeFi, or NFTs often gain rapid attention and price movement.",
                  tone: "border-white/10",
                },
                {
                  h: "New Listings",
                  p: "Recently listed coins on exchanges often experience sudden price spikes due to hype and early demand.",
                  tone: "border-white/10",
                },
              ].map((x) => (
                <div key={x.h} className={`rounded-3xl border ${x.tone} bg-black/20 p-6`}>
                  <p className="text-lg font-extrabold text-white">{x.h}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{x.p}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Why Coins Become Top Gainers">
            <p>There are several reasons why a cryptocurrency becomes a top gainer.</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                { h: "Market Demand", p: "When more buyers enter the market, the price increases due to higher demand." },
                { h: "Positive News", p: "Announcements, partnerships, or updates can push prices higher." },
                { h: "Low Supply", p: "Coins with limited supply can rise quickly when demand increases." },
                { h: "Whale Activity", p: "Large investors buying big amounts can cause strong upward movement." },
                { h: "Market Trends", p: "Bullish market conditions often push multiple coins into the top gainers list." },
              ].map((x) => (
                <div key={x.h} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                  <p className="text-lg font-extrabold text-white">{x.h}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{x.p}</p>
                </div>
              ))}
            </div>
            <MiniDiagram
              title="Diagram: what usually drives pumps"
              desc="Not exact science—just a learning view of common drivers."
              lines={[
                { label: "Demand", pct: 70, tone: "orange" },
                { label: "News", pct: 55, tone: "sky" },
                { label: "Whales", pct: 45, tone: "orange" },
                { label: "Supply", pct: 35, tone: "sky" },
              ]}
            />
          </Section>

          <Section title="How to Analyze Top Gainers">
            <p>Before trading top gainers, it is important to analyze them carefully.</p>
            <ul className="mt-6 space-y-3 text-slate-200">
              {[
                "Check Volume  \nHigh trading volume confirms strong interest and reduces fake moves.",
                "Avoid FOMO  \nDo not enter trades just because the price is already moving fast.",
                "Look for Pullbacks  \nWait for small corrections instead of buying at the top.",
                "Study the Chart  \nUse technical analysis to identify entry and exit points.",
                "Understand the Reason  \nAlways know why a coin is rising before taking a position.",
              ].map((t) => {
                const [h, p] = t.split("  \n");
                return (
                  <li key={h} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--rh-skyblue)] text-xs font-black text-[#0b1220]"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className="min-w-0">
                      <span className="block font-extrabold text-white">{h}</span>
                      <span className="mt-1 block text-sm leading-7 text-slate-300">{p}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <MiniDiagram
              title="Diagram: volume confirmation"
              desc="Volume helps confirm whether a move has real participation."
              lines={[
                { label: "High volume", pct: 75, tone: "orange" },
                { label: "Low volume", pct: 35, tone: "danger" },
              ]}
            />
          </Section>

          <Section title="Risks of Trading Top Gainers">
            <p>While top gainers offer opportunities, they also carry risks.</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                { h: "Sudden Reversals", p: "Prices can drop quickly after a strong rise." },
                { h: "Market Manipulation", p: "Some coins are pumped artificially and then dumped." },
                { h: "High Volatility", p: "Fast price movement can lead to losses if not managed properly." },
                { h: "Emotional Trading", p: "FOMO can cause traders to enter at the wrong time." },
              ].map((x) => (
                <div key={x.h} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                  <p className="text-lg font-extrabold text-white">{x.h}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{x.p}</p>
                </div>
              ))}
            </div>
          </Section>

          <section className="rounded-[2.25rem] border border-white/10 bg-white/5 p-7 sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Trade Smarter, Not Faster
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-slate-200 sm:text-base">
              Top gainers can offer great opportunities, but only when approached with the right strategy.
            </p>
            <p className="mt-5 text-[15px] leading-8 text-slate-200 sm:text-base">
              At RH Traders, you learn how to analyze market movements, understand price behavior, and make informed
              trading decisions instead of following hype.
            </p>
            <p className="mt-5 text-[15px] leading-8 text-slate-200 sm:text-base">
              Start your journey with structured learning and real market insights.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/plans"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--rh-accent)] px-7 py-3 text-sm font-extrabold text-white shadow-[0_0_24px_rgba(255,106,0,0.28)] transition hover:bg-[color:var(--rh-accent-bright)]"
              >
                Start learning
              </Link>
              <Link
                href="/market/top-losers"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-white/8"
              >
                View Top Losers
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/market"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/8"
          >
            Market Overview
          </Link>
          <Link
            href="/market/top-losers"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--rh-accent)] px-6 py-3 text-sm font-extrabold text-white shadow-[0_0_22px_rgba(255,106,0,0.28)] transition hover:bg-[color:var(--rh-accent-bright)]"
          >
            View Top Losers
          </Link>
        </div>
      </div>
    </main>
  );
}

