import Link from "next/link";
import type { FaqItem } from "../../../data/faqData";
import { FaqArticleShell, FaqCallout, FaqFigure, FaqSectionH2 } from "./FaqArticleShell";

function DiagramMarketFlow() {
  return (
    <FaqFigure
      title="Figure 1 — How a spot trade is intermediated"
      caption="You typically interact with a venue; the venue’s systems match orders and record ownership or contract positions according to product rules."
    >
      <svg viewBox="0 0 720 160" className="h-auto w-full text-slate-300" aria-hidden>
        <defs>
          <linearGradient id="faqFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {[
          { x: 40, label: "Trader", sub: "You place an order" },
          { x: 220, label: "Venue", sub: "Exchange / broker" },
          { x: 400, label: "Order book", sub: "Bids & asks" },
          { x: 580, label: "Settlement", sub: "Balances update" },
        ].map((b, i) => (
          <g key={b.label}>
            <rect
              x={b.x}
              y="36"
              width="140"
              height="88"
              rx="14"
              fill="rgba(15,23,42,0.9)"
              stroke="rgba(56,189,248,0.35)"
              strokeWidth="2"
            />
            <text x={b.x + 70} y="66" textAnchor="middle" fill="#f8fafc" style={{ fontSize: "13px", fontWeight: 800 }}>
              {b.label}
            </text>
            <text x={b.x + 70} y="92" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "11px" }}>
              {b.sub}
            </text>
            {i < 3 ? (
              <line
                x1={b.x + 140}
                y1="80"
                x2={b.x + 180}
                y2="80"
                stroke="url(#faqFlow)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ) : null}
          </g>
        ))}
      </svg>
    </FaqFigure>
  );
}

function DiagramPairNotation() {
  return (
    <FaqFigure title="Figure 2 — Reading a pair (example: BTC/USDT)">
      <svg viewBox="0 0 720 120" className="h-auto w-full" aria-hidden>
        <rect x="40" y="28" width="200" height="64" rx="12" fill="rgba(37,99,235,0.2)" stroke="rgba(56,189,248,0.45)" strokeWidth="2" />
        <text x="140" y="68" textAnchor="middle" fill="#f8fafc" style={{ fontSize: "18px", fontWeight: 800 }}>
          BTC
        </text>
        <text x="220" y="68" textAnchor="start" fill="#94a3b8" style={{ fontSize: "20px", fontWeight: 700 }}>
          /
        </text>
        <rect x="248" y="28" width="200" height="64" rx="12" fill="rgba(56,189,248,0.12)" stroke="rgba(56,189,248,0.35)" strokeWidth="2" />
        <text x="348" y="68" textAnchor="middle" fill="#f8fafc" style={{ fontSize: "18px", fontWeight: 800 }}>
          USDT
        </text>
        <text x="480" y="52" fill="#cbd5e1" style={{ fontSize: "12px", fontWeight: 600 }}>
          Base asset
        </text>
        <text x="480" y="76" fill="#94a3b8" style={{ fontSize: "11px" }}>
          Quantity you buy or sell
        </text>
        <text x="480" y="102" fill="#cbd5e1" style={{ fontSize: "12px", fontWeight: 600 }}>
          Quote asset
        </text>
        <text x="560" y="102" fill="#94a3b8" style={{ fontSize: "11px" }}>
          Denominator / pricing
        </text>
      </svg>
    </FaqFigure>
  );
}

function DiagramPnL() {
  return (
    <FaqFigure
      title="Figure 3 — P&amp;L depends on entry, exit, fees, and size"
      caption="Simplified view; funding and margin mechanics apply on derivatives."
    >
      <svg viewBox="0 0 720 140" className="h-auto w-full" aria-hidden>
        <line x1="60" y1="100" x2="660" y2="100" stroke="#475569" strokeWidth="2" />
        <text x="60" y="120" fill="#94a3b8" style={{ fontSize: "11px" }}>
          Time
        </text>
        <path
          d="M 80 88 L 180 72 L 260 90 L 340 48 L 420 62 L 520 30 L 620 44"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="340" cy="48" r="6" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
        <text x="330" y="40" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "10px", fontWeight: 700 }}>
          Exit
        </text>
        <circle cx="180" cy="72" r="6" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
        <text x="180" y="92" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "10px", fontWeight: 700 }}>
          Entry
        </text>
        <rect x="480" y="24" width="200" height="56" rx="10" fill="rgba(2,6,23,0.55)" stroke="rgba(56,189,248,0.25)" />
        <text x="580" y="56" textAnchor="middle" fill="#cbd5e1" style={{ fontSize: "11px", fontWeight: 700 }}>
          Net result = (Exit − Entry) × Size − Fees
        </text>
      </svg>
    </FaqFigure>
  );
}

export function WhatIsCryptoTradingArticle({ item }: { item: FaqItem }) {
  return (
    <FaqArticleShell
      item={item}
      imagePriority
      intro="This guide defines crypto trading in practical terms: what you exchange, where it happens, how orders and prices behave, and what separates a disciplined process from speculation."
    >
      <section>
        <FaqSectionH2 className="mt-0">Definition</FaqSectionH2>
        <p>
          <strong className="text-white">Cryptocurrency trading</strong> is the act of buying or selling digital
          assets—typically through a centralized exchange or broker—aiming to realize a favourable change in value
          relative to another asset (often a stablecoin or national currency). The activity is{" "}
          <em className="not-italic text-slate-300">continuous</em> on global markets: prices update as new orders
          arrive, liquidity shifts, and information is priced in.
        </p>
        <p>
          Trading is not the same as long-term holding. Holding can be passive; trading implies recurring decisions about
          entry, exit, size, and invalidation under uncertainty.
        </p>
      </section>

      <section>
        <FaqSectionH2>What you are actually exchanging</FaqSectionH2>
        <p>
          Most retail trades are expressed as a <strong className="text-white">pair</strong>, for example BTC/USDT. The
          first symbol is the <strong className="text-white">base</strong> (what you buy or sell in units of); the
          second is the <strong className="text-white">quote</strong> (the asset used to price the base).
        </p>
        <DiagramPairNotation />
        <p>
          When you “buy BTC with USDT,” you are offering USDT from your balance in return for BTC at a price determined
          by current supply and demand on that venue’s order book.
        </p>
      </section>

      <section>
        <FaqSectionH2>Where trades occur</FaqSectionH2>
        <p>
          Trading usually routes through an <strong className="text-white">exchange</strong> or{" "}
          <strong className="text-white">broker</strong> application. The venue maintains ledgers, risk checks, and
          matching logic. Retail users rarely know the counterparty; they interact with aggregated liquidity and
          published prices.
        </p>
        <DiagramMarketFlow />
      </section>

      <section>
        <FaqSectionH2>Orders, price, and execution</FaqSectionH2>
        <p>
          A <strong className="text-white">market order</strong> takes the best available prices immediately until the
          requested size is filled or liquidity is exhausted. A <strong className="text-white">limit order</strong>{" "}
          rests on the book at your price and fills when others trade against it.
        </p>
        <p>
          <strong className="text-white">Spread</strong> is the gap between the best bid and best ask.{" "}
          <strong className="text-white">Slippage</strong> is the difference between the expected average fill and the
          realized average fill, often driven by book depth, volatility, and order size.
        </p>
      </section>

      <section>
        <FaqSectionH2>Spot, derivatives, and leverage (conceptual)</FaqSectionH2>
        <p>
          <strong className="text-white">Spot</strong> trading exchanges assets outright subject to custody rules on the
          platform. <strong className="text-white">Derivatives</strong> (e.g., perpetual futures) reference price via
          contracts and margin; they introduce funding, liquidation, and sizing mechanics that must be modeled explicitly.
        </p>
        <p>
          RH Academy introduces spot structure and risk first; derivatives are appropriate only after you can state your
          maximum loss and margin requirements in plain numbers.
        </p>
      </section>

      <section>
        <FaqSectionH2>Profit, loss, and fees</FaqSectionH2>
        <p>
          Outcomes depend on purchase and sale prices, position size, and all costs (commissions, spread, and—where
          relevant—funding). A sound process records fees alongside gross movement so performance review reflects
          reality.
        </p>
        <DiagramPnL />
      </section>

      <FaqCallout title="Worked example (numeric illustration)">
        <p>
          Suppose you buy <strong className="text-white">0.10 BTC</strong> at{" "}
          <strong className="text-white">60,000 USDT</strong> per BTC and later sell at{" "}
          <strong className="text-white">61,000 USDT</strong>, with round-trip fees totaling{" "}
          <strong className="text-white">40 USDT</strong>.
        </p>
        <ul className="list-inside list-disc space-y-2 text-slate-200/90">
          <li>Gross change ≈ (61,000 − 60,000) × 0.10 = 100 USDT</li>
          <li>Net ≈ 100 − 40 = 60 USDT before any transfer or network costs</li>
        </ul>
        <p className="text-sm text-white/80">
          This is a teaching example only; live execution paths, partial fills, and tax treatment vary by venue and
          jurisdiction.
        </p>
      </FaqCallout>

      <section>
        <FaqSectionH2>Risk in one paragraph</FaqSectionH2>
        <p>
          Digital asset prices can move rapidly. Risk management means defining how much capital you expose per idea,
          where the thesis is invalidated, and how you avoid operational mistakes (wrong address, wrong network,
          misunderstood product). Without those rules, short-term outcomes dominate long-term learning.
        </p>
      </section>

      <section>
        <FaqSectionH2>How RH Traders frames “crypto trading” for learners</FaqSectionH2>
        <p>
          We treat trading as a <strong className="text-white">process</strong>: market context, level selection,
          execution plan, and review. The objective is competence—repeatable decisions and documented outcomes—not
          motivational language or guaranteed returns.
        </p>
        <p>
          Continue with the{" "}
          <Link href="/market" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            Market guide
          </Link>
          , the{" "}
          <Link href="/charts" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            Charts hub
          </Link>
          , and the{" "}
          <Link href="/coins" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            Coins overview
          </Link>{" "}
          when you are ready to go deeper.
        </p>
      </section>
    </FaqArticleShell>
  );
}
