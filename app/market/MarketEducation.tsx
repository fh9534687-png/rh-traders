import Link from "next/link";
import type { ReactNode } from "react";
import * as L from "./marketLongform";

function SectionIcon({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border border-sky-400/35 bg-slate-900/80 text-[color:var(--rh-sky)] shadow-[0_0_20px_rgba(37,99,235,0.15)] ${className}`}
    >
      {children}
    </span>
  );
}

/** Simple flow diagram: choose coin → order → match → executed */
function TradingFlowDiagram() {
  const steps = [
    { label: "Choose coin & pair", sub: "Select market" },
    { label: "Place order", sub: "Limit or market" },
    { label: "Order book matches", sub: "Bids & asks" },
    { label: "Trade executed", sub: "Balances update" },
  ];
  return (
    <div
      className="mt-8 overflow-x-auto rounded-2xl border border-sky-500/25 bg-slate-900/50 p-6 sm:p-8"
      aria-hidden
    >
      <svg
        className="mx-auto h-auto w-full max-w-4xl text-slate-400"
        viewBox="0 0 920 140"
        role="img"
      >
        <defs>
          <linearGradient id="mktFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#86efac" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {steps.map((_, i) => {
          if (i === 0) return null;
          const x1 = 80 + (i - 1) * 220;
          const x2 = 80 + i * 220 - 40;
          return (
            <g key={`a-${i}`}>
              <line
                x1={x1}
                y1={70}
                x2={x2}
                y2={70}
                stroke="url(#mktFlow)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <polygon
                points={`${x2},${70} ${x2 - 10},${64} ${x2 - 10},${76}`}
                fill="#dc2626"
              />
            </g>
          );
        })}
        {steps.map((s, i) => {
          const cx = 80 + i * 220;
          return (
            <g key={s.label}>
              <circle
                cx={cx}
                cy={70}
                r="28"
                fill="#ffffff"
                stroke="#dc2626"
                strokeWidth="2"
              />
              <text
                x={cx}
                y={76}
                textAnchor="middle"
                fill="#1c1917"
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.label} className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--rh-border-red)]">
              Step {i + 1}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{s.label}</p>
            <p className="mt-0.5 text-xs text-stone-500">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketStructureDiagram() {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-sky-500/25 bg-slate-900/50 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-extrabold text-white">Market structure (simple)</p>
        <p className="text-xs text-slate-400">Higher highs/lows vs breaks</p>
      </div>
      <svg className="mt-5 h-auto w-full" viewBox="0 0 920 220" role="img" aria-label="Market structure diagram">
        <defs>
          <linearGradient id="msLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="920" height="220" rx="18" fill="rgba(2,6,23,0.55)" stroke="rgba(56,189,248,0.22)" />

        <g opacity="0.35" stroke="rgba(148,163,184,0.45)">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1={70 + i * 95} y1="30" x2={70 + i * 95} y2="190" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={i} x1="55" y1={40 + i * 38} x2="865" y2={40 + i * 38} />
          ))}
        </g>

        <path
          d="M70 160 L170 130 L260 150 L345 110 L430 135 L520 95 L610 115 L700 75"
          fill="none"
          stroke="url(#msLine)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="170" cy="130" r="6" fill="#38bdf8" />
        <circle cx="345" cy="110" r="6" fill="#38bdf8" />
        <circle cx="520" cy="95" r="6" fill="#38bdf8" />
        <circle cx="700" cy="75" r="6" fill="#38bdf8" />

        <path d="M700 75 L835 75" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
        <text x="846" y="80" fill="#e2e8f0" style={{ fontSize: "13px", fontWeight: 700 }}>
          key level
        </text>
        <path d="M820 75 L820 165" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 6" />
        <text x="720" y="182" fill="#e2e8f0" style={{ fontSize: "13px", fontWeight: 700 }}>
          break of structure → trend can change
        </text>
      </svg>
    </div>
  );
}

function OrderBookDiagram() {
  const rows = [
    { side: "Ask", price: "62,412", size: "0.84", tone: "bg-rose-500/10 border-rose-400/25 text-rose-100" },
    { side: "Ask", price: "62,405", size: "1.27", tone: "bg-rose-500/10 border-rose-400/25 text-rose-100" },
    { side: "Ask", price: "62,399", size: "0.55", tone: "bg-rose-500/10 border-rose-400/25 text-rose-100" },
    { side: "Mid", price: "— spread —", size: "—", tone: "bg-slate-950/25 border-white/10 text-slate-300" },
    { side: "Bid", price: "62,390", size: "1.10", tone: "bg-emerald-500/10 border-emerald-400/25 text-emerald-100" },
    { side: "Bid", price: "62,383", size: "0.92", tone: "bg-emerald-500/10 border-emerald-400/25 text-emerald-100" },
    { side: "Bid", price: "62,377", size: "1.64", tone: "bg-emerald-500/10 border-emerald-400/25 text-emerald-100" },
  ] as const;

  return (
    <div className="mt-8 rounded-2xl border border-sky-500/25 bg-slate-900/50 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-extrabold text-white">Order book (concept)</p>
        <p className="text-xs text-slate-400">Spread + depth affect fills</p>
      </div>
      <div className="mt-5 grid gap-2">
        {rows.map((r, idx) => (
          <div
            key={`${r.side}-${idx}`}
            className={`grid grid-cols-[70px_1fr_1fr] items-center gap-3 rounded-xl border px-4 py-3 text-sm ${r.tone}`}
          >
            <span className="text-xs font-extrabold uppercase tracking-wider opacity-90">{r.side}</span>
            <span className="font-semibold">{r.price}</span>
            <span className="text-right font-semibold">{r.size}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-6 text-slate-400">
        Tight spreads + deep levels usually mean smoother execution. Thin books can cause slippage,
        especially with market orders.
      </p>
    </div>
  );
}

const exchanges = [
  {
    name: "🔸 Binance",
    desc: "High liquidity, low spreads, and advanced trading tools. Ideal for both beginners and advanced traders.",
  },
  {
    name: "🔸 Coinbase",
    desc: "Beginner-friendly crypto exchange with simple interface and strong compliance.",
  },
  {
    name: "🔸 Bybit",
    desc: "Focused on derivatives and futures trading. Suitable for experienced traders.",
  },
  {
    name: "🔸 KuCoin",
    desc: "Wide range of altcoins with varying liquidity. Best for exploring new crypto projects.",
  },
] as const;

const tradeTypes = [
  {
    title: "🔹 Spot Trading",
    desc: "Buy and hold cryptocurrencies directly without leverage.\nBest for beginners and long-term investors.",
  },
  {
    title: "🔹 Futures Trading",
    desc: "Trade with leverage and margin. Higher risk, higher potential reward.\nRequires strict risk management strategy.",
  },
  {
    title: "🔹 Scalping",
    desc: "Short-term trading strategy focused on small, quick profits.\nRequires speed, discipline, and low trading fees.",
  },
  {
    title: "🔹 Swing Trading",
    desc: "Hold trades for days or weeks based on market trends and technical analysis.\nBalanced approach between short-term and long-term trading.",
  },
] as const;

const risks = [
  {
    title: "Volatility",
    desc: "Prices can move sharply; size and stops should reflect how much heat you can tolerate emotionally and financially.",
  },
  {
    title: "Manipulation",
    desc: "Thin markets and social hype can distort prices. Cross-check volume, sources, and history before committing size.",
  },
  {
    title: "Emotions",
    desc: "FOMO and panic are expensive. A written plan beats an impulsive click every time markets spike or dump.",
  },
  {
    title: "Lack of knowledge",
    desc: "Misunderstanding fees, leverage, or custody creates silent losses. Learn mechanics before scaling activity.",
  },
] as const;

const tips = [
  {
    title: "Start small",
    desc: "Prove your process with tiny risk first. Scale only when repetition shows discipline, not luck.",
  },
  {
    title: "Use stop loss",
    desc: "Define where the trade is wrong before you enter. Stops turn hope into a measurable rule.",
  },
  {
    title: "Learn first",
    desc: "Sequence topics: spot structure, then risk, then advanced tools. Skipping basics magnifies mistakes.",
  },
  {
    title: "Avoid hype",
    desc: "Urgency and guaranteed-return language are red flags. Verify every claim against data you can reproduce.",
  },
] as const;

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="rh-content max-w-3xl space-y-4 text-[15px] leading-relaxed sm:text-base">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function MarketEducation() {
  return (
    <div className="relative space-y-16 sm:space-y-20 lg:space-y-24">
      {/* 1 — How crypto trading works */}
      <section className="scroll-mt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <SectionIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </SectionIcon>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              How Crypto Trading Works (Step-by-Step Process)
            </h2>
            <p className="mt-2 max-w-3xl text-slate-400">
              From selecting a cryptocurrency pair to final trade execution, every trade follows a structured path on a
              crypto exchange.
            </p>
            <TradingFlowDiagram />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  n: "1",
                  t: "Step 1: Choose a Coin & Trading Pair",
                  d: "Select a cryptocurrency like Bitcoin (BTC) or Ethereum (ETH) and pair it with a stable asset like USDT.\nThis defines your trading market and determines the order book you interact with.",
                },
                {
                  n: "2",
                  t: "Step 2: Place an Order (Market or Limit)",
                  d: "Market Orders → Execute instantly at current market price\nLimit Orders → Execute only when price reaches your defined level\n\nUsing the right order type improves your trade accuracy and entry precision.",
                },
                {
                  n: "3",
                  t: "Step 3: Order Book & Matching Engine",
                  d: "Crypto exchanges use a matching engine system that connects buyers and sellers using price-time priority.\n\nBids → Buyers\nAsks → Sellers\n\nThe order book shows real-time market depth, liquidity, and trading activity.",
                },
                {
                  n: "4",
                  t: "Step 4: Trade Execution & Balance Update",
                  d: "Once matched, your trade is executed and your account balance updates instantly.\n\nEach trade includes:\n\nEntry price\nTrade size\nFees\nTimestamp\n\nThis data is essential for performance tracking, analytics, and tax reporting.",
                },
              ].map((step) => (
                <div key={step.n} className="rh-card rounded-2xl p-5">
                  <span className="text-xs font-extrabold text-[color:var(--rh-border-red)]">Step {step.n}</span>
                  <h3 className="mt-2 text-lg font-bold text-white">{step.t}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-400">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1b — Structure & liquidity */}
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <SectionIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12h6l3 8 4-16 2 8h3" />
            </svg>
          </SectionIcon>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Understanding Market Structure &amp; Liquidity (Pro-Level Insight)
            </h2>
            <p className="mt-2 max-w-3xl text-slate-400">
              Two core concepts dominate successful crypto trading:
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rh-card rounded-3xl p-6">
                <h3 className="text-lg font-extrabold text-white">🔹 Market Structure</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-400">
                  Market structure defines whether the market is trending or reversing.
                  {"\n\n"}
                  Higher highs & higher lows → Uptrend
                  {"\n"}
                  Lower highs & lower lows → Downtrend
                  {"\n"}
                  Break of structure → Potential trend shift
                  {"\n\n"}
                  Understanding structure helps you:
                  {"\n"}✔ Identify entry points
                  {"\n"}✔ Avoid random trades
                  {"\n"}✔ Set clear stop-loss levels
                </p>
                <MarketStructureDiagram />
              </div>
              <div className="rh-card rounded-3xl p-6">
                <h3 className="text-lg font-extrabold text-white">🔹 Liquidity &amp; Order Flow</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-400">
                  Liquidity determines how easily you can buy or sell without affecting price.
                  {"\n\n"}
                  High liquidity → Smooth execution
                  {"\n"}
                  Low liquidity → High slippage
                  {"\n\n"}
                  Order flow shows buying and selling pressure, helping traders understand real market movement instead of guessing.
                </p>
                <OrderBookDiagram />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Popular exchanges */}
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <SectionIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </SectionIcon>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Popular Crypto Exchanges (Where Trading Happens)
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {exchanges.map((ex) => (
                <div key={ex.name} className="rh-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white">{ex.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{ex.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Types of trading */}
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <SectionIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </SectionIcon>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Types of Crypto Trading (Choose Your Style)
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {tradeTypes.map((t) => (
                <div key={t.title} className="rh-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-[color:var(--rh-border-red)]">{t.title}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-400">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Market risks */}
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <SectionIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </SectionIcon>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Market risks
            </h2>
            <p className="mt-2 max-w-3xl text-slate-400">
              Knowing the recurring hazards helps you build rules before capital
              is on the line.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {risks.map((r) => (
                <div key={r.title} className="rh-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <ProseBlock paragraphs={L.risksDeep} />
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Beginner tips */}
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <SectionIcon>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </SectionIcon>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Beginner tips
            </h2>
            <p className="mt-2 max-w-3xl text-slate-400">
              Simple habits that stack in your favour over months and years.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {tips.map((t) => (
                <div key={t.title} className="rh-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <ProseBlock paragraphs={L.tipsDeep} />
            </div>
          </div>
        </div>
      </section>

      {/* Long-form reference */}
      <section className="rh-card rounded-3xl p-6 sm:p-10">
        <h2 className="font-[Georgia,Times_New_Roman,Times,serif] text-2xl font-bold text-white sm:text-3xl">
          Understanding Crypto Markets: Structure, Behavior, and Real Execution
        </h2>
        <div className="mt-8 space-y-10">
          <ProseBlock paragraphs={L.realExecutionGuide} />
        </div>
      </section>

      {/* Links */}
      <section className="grid gap-6 pb-8 md:grid-cols-2">
        <Link
          href="/coins"
          className="group rh-card block rounded-3xl p-7 transition hover:-translate-y-1"
        >
          <p className="text-xs font-extrabold tracking-[0.18em] text-stone-500">EXPLORE</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white">Coins</h2>
          <p className="mt-3 text-slate-400">
            Asset categories, majors, and how to think about risk by coin type.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[color:var(--rh-border-red)] transition group-hover:text-sky-300">
            Go to Coins <span aria-hidden="true">→</span>
          </span>
        </Link>
        <Link
          href="/charts"
          className="group rh-card block rounded-3xl p-7 transition hover:-translate-y-1"
        >
          <p className="text-xs font-extrabold tracking-[0.18em] text-stone-500">LEARN</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white">Charts</h2>
          <p className="mt-3 text-slate-400">Chart literacy to support everything above.</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[color:var(--rh-border-red)] transition group-hover:text-sky-300">
            Go to Charts <span aria-hidden="true">→</span>
          </span>
        </Link>
      </section>
    </div>
  );
}
