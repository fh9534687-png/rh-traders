import type { Metadata } from "next";
import Link from "next/link";
import { MarketMoversTable } from "../components/MarketMoversTable";

export const metadata: Metadata = {
  title: "Top Losers in Crypto Market | RH Traders",
  description:
    "Learn what top losers mean, why coins drop, how to analyze sell pressure, and how to avoid traps—written for traders.",
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
            <div className="w-40 text-xs font-extrabold text-slate-200">
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

export default function TopLosersPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="rh-wrap px-5 py-14">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
          MARKET
        </p>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Top Losers in Crypto Market
        </h1>

        <section className="mt-6 max-w-4xl">
          <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            INTRO : Top Losers
          </h2>
          <p className="mt-3 text-lg leading-9 text-slate-300">
            Top losers are cryptocurrencies that have experienced the highest price decline within a specific time
            period, such as 24 hours or 7 days.
          </p>
          <p className="mt-5 text-lg leading-9 text-slate-300">
            These coins often indicate strong selling pressure in the market. While they may seem risky, they can also
            provide opportunities for traders who understand market behavior.
          </p>
          <p className="mt-5 text-lg leading-9 text-slate-300">
            This page explains how top losers work, why coins drop in value, and how traders can analyze them
            effectively.
          </p>
        </section>

        <MarketMoversTable
          mode="losers"
          title="Top losers (sorted by 24h %)"
          timeframe="24h"
          limit={20}
        />

        <div className="mt-10 grid gap-6">
          <Section title="What Are Top Losers?">
            <p>
              Top losers are cryptocurrencies that have dropped the most in percentage value over a selected time
              frame.
            </p>
            <p className="mt-5">
              For example, if a coin falls from $10 to $7, it has lost 30% of its value, making it a top loser.
            </p>
            <p className="mt-5">
              These coins are usually highlighted on trading platforms to show which assets are under heavy selling
              pressure.
            </p>
            <MiniDiagram
              title="Diagram: percent loss example"
              desc="A simple way to visualize a -30% move."
              lines={[
                { label: "$10 → $7", pct: 30, tone: "danger" },
                { label: "$10 → $9.5", pct: 5, tone: "sky" },
              ]}
            />
          </Section>

          <Section title="Types of Coins That Become Top Losers">
            <p>
              Different types of cryptocurrencies can appear in the top losers list depending on market conditions.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                {
                  h: "Large Cap Coins",
                  p: "Even strong coins like Bitcoin or Ethereum can drop during market corrections.",
                  tone: "border-[color:var(--rh-accent)]/60",
                },
                {
                  h: "Mid Cap Coins",
                  p: "These coins are more sensitive to market changes and can fall faster.",
                  tone: "border-[color:var(--rh-skyblue)]/70",
                },
                {
                  h: "Low Cap Coins",
                  p: "Small coins often drop sharply due to low liquidity and high volatility.",
                  tone: "border-white/10",
                },
                {
                  h: "Overhyped Tokens",
                  p: "Coins that rise quickly due to hype often fall just as fast.",
                  tone: "border-white/10",
                },
                {
                  h: "Failed Projects",
                  p: "Coins with weak fundamentals or bad news can lose value rapidly.",
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

          <Section title="Why Coins Become Top Losers">
            <p>There are several reasons why cryptocurrencies lose value.</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                { h: "Market Panic", p: "Fear in the market can cause massive selling." },
                { h: "Negative News", p: "Regulations, hacks, or bad updates can push prices down." },
                { h: "Profit Taking", p: "Traders sell after profits, causing price drops." },
                { h: "Whale Selling", p: "Large investors selling big amounts can crash prices." },
                { h: "Bearish Market Trend", p: "In a downtrend, most coins lose value together." },
              ].map((x) => (
                <div key={x.h} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                  <p className="text-lg font-extrabold text-white">{x.h}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{x.p}</p>
                </div>
              ))}
            </div>
            <MiniDiagram
              title="Diagram: common drivers of drops"
              desc="A learning view of what often creates heavy sell pressure."
              lines={[
                { label: "Panic", pct: 70, tone: "danger" },
                { label: "News", pct: 55, tone: "danger" },
                { label: "Whales", pct: 45, tone: "orange" },
                { label: "Trend", pct: 60, tone: "danger" },
              ]}
            />
          </Section>

          <Section title="How to Analyze Top Losers">
            <p>Instead of avoiding top losers, smart traders analyze them carefully.</p>
            <ul className="mt-6 space-y-3 text-slate-200">
              {[
                "Check Volume  \nHigh selling volume confirms strong downward movement.",
                "Look for Support Levels  \nPrices often react at strong support zones.",
                "Avoid Catching Falling Knife  \nDo not enter too early while price is still dropping.",
                "Wait for Confirmation  \nLook for reversal signals before entering a trade.",
                "Understand the Cause  \nAlways know why the coin is falling.",
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

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <p className="text-sm font-extrabold text-white">Diagram: support reaction</p>
                <p className="mt-1 text-sm leading-7 text-slate-300">
                  Price often pauses or bounces at support zones—look for confirmation before entry.
                </p>
                <div className="mt-4 h-24 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-black/30">
                    <div className="absolute inset-x-0 bottom-4 h-[2px] bg-[color:var(--rh-skyblue)]/80" />
                    <div className="absolute left-2 top-4 h-[2px] w-[85%] rotate-[9deg] bg-red-400/70" />
                    <div className="absolute left-2 top-7 h-[2px] w-[70%] rotate-[9deg] bg-red-400/40" />
                    <div className="absolute left-2 top-10 h-[2px] w-[55%] rotate-[9deg] bg-red-400/25" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <p className="text-sm font-extrabold text-white">Diagram: fake reversal trap</p>
                <p className="mt-1 text-sm leading-7 text-slate-300">
                  A quick bounce can trap buyers—wait for a real reversal structure.
                </p>
                <div className="mt-4 h-24 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-black/30">
                    <div className="absolute left-2 top-14 h-[2px] w-[55%] bg-red-400/70" />
                    <div className="absolute left-[45%] top-10 h-[2px] w-[25%] -rotate-[18deg] bg-[color:var(--rh-accent)]/80" />
                    <div className="absolute left-[62%] top-14 h-[2px] w-[30%] bg-red-400/70" />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Risks of Trading Top Losers">
            <p>Trading falling coins comes with serious risks.</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                { h: "Continued Downtrend", p: "Prices may keep falling further." },
                { h: "Fake Reversals", p: "Temporary bounce can trap traders." },
                { h: "High Volatility", p: "Sudden moves can cause unexpected losses." },
                { h: "Emotional Decisions", p: "Fear-based trading leads to mistakes." },
              ].map((x) => (
                <div key={x.h} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                  <p className="text-lg font-extrabold text-white">{x.h}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{x.p}</p>
                </div>
              ))}
            </div>
            <MiniDiagram
              title="Diagram: sell volume confirmation"
              desc="High sell volume can confirm strength of the down move."
              lines={[
                { label: "High sell volume", pct: 78, tone: "danger" },
                { label: "Low sell volume", pct: 35, tone: "sky" },
              ]}
            />
          </Section>

          <section className="rounded-[2.25rem] border border-white/10 bg-white/5 p-7 sm:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Learn to Trade Market Moves with Confidence
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-slate-200 sm:text-base">
              Top losers are not just losses — they are learning opportunities.
            </p>
            <p className="mt-5 text-[15px] leading-8 text-slate-200 sm:text-base">
              At RH Traders, you learn how to read market behavior, manage risk, and identify real opportunities in both
              rising and falling markets.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/plans"
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--rh-accent)] px-7 py-3 text-sm font-extrabold text-white shadow-[0_0_24px_rgba(255,106,0,0.28)] transition hover:bg-[color:var(--rh-accent-bright)]"
              >
                Start learning
              </Link>
              <Link
                href="/market/top-gainers"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-white/8"
              >
                View Top Gainers
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/market/crypto-prices"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/8"
          >
            Crypto Prices
          </Link>
          <Link
            href="/market/top-gainers"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--rh-accent)] px-6 py-3 text-sm font-extrabold text-white shadow-[0_0_22px_rgba(255,106,0,0.28)] transition hover:bg-[color:var(--rh-accent-bright)]"
          >
            View Top Gainers
          </Link>
        </div>
      </div>
    </main>
  );
}

