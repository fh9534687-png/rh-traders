import Link from "next/link";
import type { FaqItem } from "../../../data/faqData";
import { FaqArticleShell, FaqCallout, FaqFigure, FaqSectionH2 } from "./FaqArticleShell";
import { WhatIsCryptoTradingArticle } from "./WhatIsCryptoTradingArticle";

function DiagramStartFlow() {
  return (
    <FaqFigure
      title="Figure — Suggested onboarding sequence"
      caption="Order matters: risk rules and security before size."
    >
      <svg viewBox="0 0 720 100" className="h-auto w-full" aria-hidden>
        {["Learn basics", "Risk budget", "2FA + wallet hygiene", "Paper / micro", "Journal", "Scale"].map((t, i) => {
          const x = 36 + i * 112;
          return (
            <g key={t}>
              <rect x={x} y="22" width="100" height="56" rx="12" fill="rgba(15,23,42,0.95)" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
              <text x={x + 50} y="54" textAnchor="middle" fill="#f8fafc" style={{ fontSize: "10px", fontWeight: 700 }}>
                {t}
              </text>
              {i < 5 ? (
                <path d={`M ${x + 100} 50 L ${x + 112} 50`} stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrSafe)" />
              ) : null}
            </g>
          );
        })}
        <defs>
          <marker id="arrSafe" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
          </marker>
        </defs>
      </svg>
    </FaqFigure>
  );
}

function DiagramCexDex() {
  return (
    <FaqFigure
      title="Figure — Custody and execution paths (schematic)"
      caption="CEX: balances on operator-led systems. DEX: you sign transactions; assets follow contract logic."
    >
      <svg viewBox="0 0 720 200" className="h-auto w-full" aria-hidden>
        <text x="180" y="24" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "12px", fontWeight: 800 }}>
          Centralized exchange (CEX)
        </text>
        <rect x="40" y="36" width="280" height="140" rx="14" fill="rgba(37,99,235,0.15)" stroke="rgba(56,189,248,0.45)" strokeWidth="2" />
        <text x="180" y="72" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "11px" }}>
          Accounts · Order book · Custody
        </text>
        <text x="180" y="100" textAnchor="middle" fill="#cbd5e1" style={{ fontSize: "11px" }}>
          Fiat ramps, support, API
        </text>
        <text x="540" y="24" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "12px", fontWeight: 800 }}>
          Decentralized exchange (DEX)
        </text>
        <rect x="400" y="36" width="280" height="140" rx="14" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.35)" strokeWidth="2" />
        <text x="540" y="72" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "11px" }}>
          Smart contracts · Pools · Router
        </text>
        <text x="540" y="100" textAnchor="middle" fill="#cbd5e1" style={{ fontSize: "11px" }}>
          Self-custody wallet · Gas · MEV exposure
        </text>
        <text x="360" y="188" textAnchor="middle" fill="#64748b" style={{ fontSize: "10px" }}>
          You choose trade-offs: convenience vs control and operational responsibility.
        </text>
      </svg>
    </FaqFigure>
  );
}

function DiagramCandle() {
  return (
    <FaqFigure title="Figure — One candlestick (OHLC)">
      <svg viewBox="0 0 320 200" className="mx-auto h-auto max-w-full" aria-hidden>
        <line x1="160" y1="30" x2="160" y2="170" stroke="#64748b" strokeWidth="2" />
        <rect x="130" y="60" width="60" height="80" rx="4" fill="rgba(56,189,248,0.35)" stroke="#38bdf8" strokeWidth="2" />
        <text x="220" y="50" fill="#94a3b8" style={{ fontSize: "10px" }}>
          High
        </text>
        <line x1="160" y1="40" x2="215" y2="40" stroke="#475569" strokeDasharray="4 3" />
        <text x="220" y="105" fill="#94a3b8" style={{ fontSize: "10px" }}>
          Open / Close
        </text>
        <text x="220" y="175" fill="#94a3b8" style={{ fontSize: "10px" }}>
          Low
        </text>
        <line x1="160" y1="170" x2="215" y2="170" stroke="#475569" strokeDasharray="4 3" />
      </svg>
    </FaqFigure>
  );
}

function DiagramTrendBias() {
  return (
    <FaqFigure
      title="Figure — Simplified structure bias"
      caption="Uptrends often show higher highs (HH) and higher lows (HL); downtrends the inverse. Context is multi-timeframe."
    >
      <svg viewBox="0 0 720 120" className="h-auto w-full" aria-hidden>
        <path
          d="M 40 90 L 120 70 L 200 80 L 280 50 L 360 60 L 440 35 L 520 45 L 600 25 L 680 40"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.5"
        />
        <circle cx="200" cy="80" r="5" fill="#f8fafc" />
        <text x="200" y="100" textAnchor="middle" fill="#cbd5e1" style={{ fontSize: "9px" }}>
          HL
        </text>
        <circle cx="440" cy="35" r="5" fill="#f8fafc" />
        <text x="440" y="24" textAnchor="middle" fill="#cbd5e1" style={{ fontSize: "9px" }}>
          HH
        </text>
      </svg>
    </FaqFigure>
  );
}

function DiagramProductStack() {
  return (
    <FaqFigure
      title="Figure — Product complexity vs operational surface area"
      caption="Not “best,” but different risk engines. Margin and futures add liquidation and funding paths."
    >
      <svg viewBox="0 0 720 160" className="h-auto w-full" aria-hidden>
        {[
          { x: 60, h: 50, label: "Spot", sub: "Asset swap" },
          { x: 280, h: 90, label: "Margin", sub: "Borrow + liq." },
          { x: 500, h: 120, label: "Futures", sub: "Contract + funding" },
        ].map((b) => (
          <g key={b.label}>
            <rect
              x={b.x}
              y={140 - b.h}
              width="160"
              height={b.h}
              rx="10"
              fill="rgba(15,23,42,0.9)"
              stroke="rgba(56,189,248,0.35)"
              strokeWidth="2"
            />
            <text x={b.x + 80} y={125 - b.h / 2} textAnchor="middle" fill="#f8fafc" style={{ fontSize: "13px", fontWeight: 800 }}>
              {b.label}
            </text>
            <text x={b.x + 80} y={142 - b.h / 2} textAnchor="middle" fill="#94a3b8" style={{ fontSize: "10px" }}>
              {b.sub}
            </text>
          </g>
        ))}
      </svg>
    </FaqFigure>
  );
}

function DiagramDoomLoop() {
  const steps = ["Ad-hoc entry", "Adverse move", "Resize / revenge", "Larger loss"];
  return (
    <FaqFigure
      title="Figure — Discretionary breakdown loop (common)"
      caption="Breaking the cycle requires predefined risk and a post-trade review, not larger size."
    >
      <svg viewBox="0 0 320 300" className="mx-auto h-auto max-w-[260px]" aria-hidden>
        <defs>
          <marker id="arrLoop" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#38bdf8" />
          </marker>
        </defs>
        {steps.map((t, i) => {
          const y = 36 + i * 64;
          return (
            <g key={t}>
              <rect x="40" y={y} width="200" height="44" rx="10" fill="rgba(15,23,42,0.95)" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
              <text x="140" y={y + 28} textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "11px", fontWeight: 700 }}>
                {t}
              </text>
              {i < steps.length - 1 ? (
                <line x1="140" y1={y + 44} x2="140" y2={y + 56} stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrLoop)" />
              ) : null}
            </g>
          );
        })}
        <text x="140" y="292" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "10px" }}>
          Without predefined rules, behaviour loops to the top.
        </text>
      </svg>
    </FaqFigure>
  );
}

function DiagramDca() {
  return (
    <FaqFigure title="Figure — Fixed-interval purchases (DCA concept)" caption="Same nominal amount buys more units when price is lower and fewer when higher; fees still apply each slice.">
      <svg viewBox="0 0 720 140" className="h-auto w-full" aria-hidden>
        <line x1="40" y1="100" x2="680" y2="100" stroke="#475569" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <line x1={80 + i * 110} y1="100" x2={80 + i * 110} y2="95" stroke="#94a3b8" />
            <rect x={65 + i * 110} y={40 + (i % 3) * 8} width="30" height={100 - (40 + (i % 3) * 8)} rx="4" fill="rgba(56,189,248,0.35)" stroke="#38bdf8" />
            <text x={80 + i * 110} y="118" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "9px" }}>
              T{i + 1}
            </text>
          </g>
        ))}
      </svg>
    </FaqFigure>
  );
}

function DiagramDyorFunnel() {
  return (
    <FaqFigure title="Figure — Triangulate claims before capital" caption="Independent sources reduce single-point narrative risk; nothing eliminates it.">
      <svg viewBox="0 0 360 220" className="mx-auto h-auto max-w-[300px]" aria-hidden>
        <path d="M 180 20 L 320 200 L 40 200 Z" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
        <text x="180" y="90" textAnchor="middle" fill="#f8fafc" style={{ fontSize: "11px", fontWeight: 800 }}>
          Claim
        </text>
        <text x="180" y="150" textAnchor="middle" fill="#cbd5e1" style={{ fontSize: "10px" }}>
          Docs · explorers · filings
        </text>
        <text x="180" y="170" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "9px" }}>
          Team trace · contract · liquidity
        </text>
      </svg>
    </FaqFigure>
  );
}

function DiagramRoadmap() {
  return (
    <FaqFigure title="Figure — Learning phases (indicative)" caption="Durations vary; milestones are understanding checks, not income claims.">
      <svg viewBox="0 0 720 100" className="h-auto w-full" aria-hidden>
        {[
          { w: 120, l: "Literacy" },
          { w: 140, l: "Watch + notes" },
          { w: 150, l: "Journal rules" },
          { w: 150, l: "Small live" },
          { w: 120, l: "Deepen" },
        ].map((p, i, arr) => {
          let x = 40;
          for (let j = 0; j < i; j++) x += arr[j].w + 8;
          return (
            <g key={p.l}>
              <rect x={x} y="30" width={p.w} height="50" rx="10" fill="rgba(37,99,235,0.2)" stroke="rgba(56,189,248,0.45)" strokeWidth="2" />
              <text x={x + p.w / 2} y="60" textAnchor="middle" fill="#f8fafc" style={{ fontSize: "11px", fontWeight: 800 }}>
                {p.l}
              </text>
            </g>
          );
        })}
      </svg>
    </FaqFigure>
  );
}

function StartSafelyArticle({ item }: { item: FaqItem }) {
  return (
    <FaqArticleShell
      item={item}
      intro="A practical sequence for entering markets without skipping security, sizing, or review habits. The aim is controlled exposure while you build evidence about your own process."
    >
      <section>
        <FaqSectionH2 className="mt-0">Define “safe” as operational and financial</FaqSectionH2>
        <p>
          Safety is not a single product setting. It combines <strong className="text-white">account security</strong>{" "}
          (unique passwords, two-factor authentication, withdrawal allowlists where available),{" "}
          <strong className="text-white">product comprehension</strong> (spot before leveraged derivatives), and{" "}
          <strong className="text-white">loss budgeting</strong> (capital you can lose without changing lifestyle
          decisions).
        </p>
      </section>
      <DiagramStartFlow />
      <section>
        <FaqSectionH2>Step 1 — Build a minimal mental model</FaqSectionH2>
        <p>
          Before funding an account, you should be able to explain in your own words: pairs, order types, fees, where
          assets sit (custody), and how a stop or liquidation differs by product. The{" "}
          <Link href="/faq/what-is-crypto-trading" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            crypto trading primer
          </Link>{" "}
          is the intended starting point.
        </p>
      </section>
      <section>
        <FaqSectionH2>Step 2 — Capital plan and “single-trade” risk</FaqSectionH2>
        <p>
          Allocate a learning pool separate from emergency savings. Decide a maximum fraction of that pool exposed on one
          idea (many professionals think in single-digit percentages). Write the number down before you trade.
        </p>
      </section>
      <section>
        <FaqSectionH2>Step 3 — Venue selection and account hygiene</FaqSectionH2>
        <p>
          Compare jurisdictions, insurance or proof-of-reserves claims, downtime history, and support channels. Enable
          2FA on email and the exchange. Verify bookmarked URLs; phishing remains a primary loss vector.
        </p>
      </section>
      <section>
        <FaqSectionH2>Step 4 — Practice flow, then smallest live size</FaqSectionH2>
        <p>
          Walk through deposits, limit placement, partial fills, and withdrawals using the smallest meaningful notional.
          Keep screenshots or structured notes so errors become visible in review.
        </p>
      </section>
      <FaqCallout title="Checklist before first live order">
        <ul className="list-inside list-disc space-y-2 text-slate-200/90">
          <li>Risk per trade and daily max loss stated in writing</li>
          <li>Fee tier and minimum order size confirmed on the venue</li>
          <li>Network and address triple-checked for transfers</li>
          <li>Journal template ready (setup, trigger, size, invalidation)</li>
        </ul>
      </FaqCallout>
      <section>
        <FaqSectionH2>Step 5 — Journal and scale only with evidence</FaqSectionH2>
        <p>
          Increase size only when execution is consistent and reviews show you follow predefined rules. If reviews show
          repeated deviations, revert notional until behaviour stabilizes.
        </p>
        <p>
          See also{" "}
          <Link href="/faq/best-platforms-cex-vs-dex" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            CEX vs DEX
          </Link>{" "}
          and{" "}
          <Link href="/plans" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            Plans
          </Link>{" "}
          for structured curriculum options.
        </p>
      </section>
    </FaqArticleShell>
  );
}

function CexDexArticle({ item }: { item: FaqItem }) {
  return (
    <FaqArticleShell
      item={item}
      intro="Centralized and decentralized venues solve different problems. This article separates custody, execution, and user responsibility so you can match a platform type to your skill level and constraints."
    >
      <section>
        <FaqSectionH2 className="mt-0">What counts as a “platform”</FaqSectionH2>
        <p>
          In retail usage the term covers mobile apps, websites, and APIs that let you convert, trade, or route orders.
          The critical distinction is <strong className="text-white">who holds keys and who matches trades</strong>, not
          marketing labels alone.
        </p>
      </section>
      <DiagramCexDex />
      <section>
        <FaqSectionH2>Centralized exchanges (CEX)</FaqSectionH2>
        <p>
          CEXs typically custody balances on internal ledgers, offer fiat on-ramps, customer support, and deep aggregated
          liquidity on popular pairs. Trade-offs include counterparty exposure to the operator and account-level controls
          (freezes, maintenance windows).
        </p>
      </section>
      <section>
        <FaqSectionH2>Decentralized exchanges (DEX)</FaqSectionH2>
        <p>
          DEX interactions are usually wallet-driven smart-contract calls. You retain signing authority, pay network fees,
          and must understand approvals, slippage limits, and routing. Liquidity can be thinner; MEV and failed
          transactions are part of the engineering surface you accept.
        </p>
      </section>
      <section>
        <FaqSectionH2>Liquidity, fees, and execution quality</FaqSectionH2>
        <p>
          Tight spreads depend on resting liquidity and active market makers. Compare maker and taker fees, withdrawal
          fees, and any spread markup. Large orders on any venue benefit from patience, limits, and monitoring of book
          depth.
        </p>
      </section>
      <FaqCallout title="Selection heuristics (non-prescriptive)">
        <ul className="list-inside list-disc space-y-2 text-slate-200/90">
          <li>Beginners prioritizing support and fiat access often start with regulated CEX workflows.</li>
          <li>On-chain power users may prefer DEX routes when they can self-custody and simulate transactions.</li>
          <li>Hybrid usage is common: fiat on CEX, then self-custody or DEX for specific assets.</li>
        </ul>
      </FaqCallout>
      <section>
        <FaqSectionH2>How RH Traders uses this distinction</FaqSectionH2>
        <p>
          Education modules reference charting and risk concepts that apply regardless of venue. Operational specifics
          (wallet setup, approvals) are left to official documentation of the products you choose.
        </p>
      </section>
    </FaqArticleShell>
  );
}

function ReadChartsArticle({ item }: { item: FaqItem }) {
  return (
    <FaqArticleShell
      item={item}
      intro="Charts compress time and price into comparable shapes. The objective is not memorizing patterns but reading structure, volatility, and participation with consistent definitions."
    >
      <section>
        <FaqSectionH2 className="mt-0">Axes, sessions, and continuity</FaqSectionH2>
        <p>
          The horizontal axis is time; the vertical axis is price (or a derived scale such as logarithmic for long
          histories). Gaps can appear across maintenance or low-liquidity periods; decide whether your analysis treats gaps
          as information or noise for your timeframe.
        </p>
      </section>
      <section>
        <FaqSectionH2>Candlesticks encode four prices</FaqSectionH2>
        <p>
          Each candle summarizes <strong className="text-white">open, high, low, and close</strong> for its interval.
          Bodies show the open-to-close range; wicks show extensions where price traded but did not close.
        </p>
        <DiagramCandle />
      </section>
      <section>
        <FaqSectionH2>Timeframes nest; higher frames set bias</FaqSectionH2>
        <p>
          A signal on a one-minute chart can contradict the daily trend. A common workflow is to define bias on a higher
          timeframe, then time entries on a lower one with explicit invalidation. Avoid mixing frames without stating which
          one governs risk.
        </p>
      </section>
      <DiagramTrendBias />
      <section>
        <FaqSectionH2>Trend versus range</FaqSectionH2>
        <p>
          Trending regimes favour continuation tactics subject to pullback depth rules. Ranging regimes favour defined
          boundaries and mean-reversion discipline. Misclassifying the regime increases false signals from any indicator.
        </p>
      </section>
      <section>
        <FaqSectionH2>Volume and open interest (where available)</FaqSectionH2>
        <p>
          Volume approximates participation; spikes near extremes can highlight absorption or climactic behaviour. On
          derivatives, open interest changes help separate new positioning from unwinds. Treat any single print as
          contextual, not decisive.
        </p>
      </section>
      <section>
        <FaqSectionH2>Next steps in the RH stack</FaqSectionH2>
        <p>
          Pair this article with the{" "}
          <Link href="/charts" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            Charts hub
          </Link>{" "}
          and pillar notes on{" "}
          <Link href="/pillars/support-resistance" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            support and resistance
          </Link>
          .
        </p>
      </section>
    </FaqArticleShell>
  );
}

function SpotFuturesMarginArticle({ item }: { item: FaqItem }) {
  return (
    <FaqArticleShell
      item={item}
      intro="Spot, margin, and futures are different contract mechanics with different loss paths. “Best” depends on objectives and whether you can model liquidation, funding, and borrow costs."
    >
      <section>
        <FaqSectionH2 className="mt-0">Spot trading</FaqSectionH2>
        <p>
          You exchange assets at prevailing prices subject to fees. Maximum loss on a cash spot purchase is typically
          bounded by the notional paid (excluding operational errors and stablecoin peg assumptions). Complexity is
          comparatively lower, which is why pedagogy often begins here.
        </p>
      </section>
      <section>
        <FaqSectionH2>Margin (borrowed purchasing power)</FaqSectionH2>
        <p>
          Margin allows larger exposure than cash balances by borrowing against collateral. Liquidation occurs if
          collateral cannot support maintenance requirements. Interest accrues on borrow; thresholds vary by venue and
          asset.
        </p>
      </section>
      <section>
        <FaqSectionH2>Futures and perpetual contracts</FaqSectionH2>
        <p>
          Futures track an underlying index via contract specifications. Perpetuals add{" "}
          <strong className="text-white">funding</strong> to tether contract price to spot. P&amp;L is realized against
          margin, not full notional, but effective exposure can still be large relative to posted collateral.
        </p>
      </section>
      <DiagramProductStack />
      <FaqCallout title="Plain-language contrasts">
        <ul className="list-inside list-disc space-y-2 text-slate-200/90">
          <li>Spot: pay fully, own the asset on-platform per rules.</li>
          <li>Margin spot: borrow; liquidation pathway if equity falls.</li>
          <li>Futures / perps: contract P&amp;L; funding and basis matter.</li>
        </ul>
      </FaqCallout>
      <section>
        <FaqSectionH2>Learning order we recommend</FaqSectionH2>
        <p>
          Understand spot order flow and risk first. Add leverage only when you can compute worst-case loss including
          fees and forced-exit scenarios. See{" "}
          <Link href="/faq/why-traders-lose-money" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            why traders lose money
          </Link>{" "}
          for behavioural pitfalls that leverage amplifies.
        </p>
      </section>
    </FaqArticleShell>
  );
}

function WhyLoseArticle({ item }: { item: FaqItem }) {
  return (
    <FaqArticleShell
      item={item}
      intro="Failure rates in active trading are widely discussed; exact percentages vary by study and definition. What is reproducible in practice is a short list of structural mistakes and the process fixes that address them."
    >
      <section>
        <FaqSectionH2 className="mt-0">Oversized positions relative to plan</FaqSectionH2>
        <p>
          Undisciplined sizing converts normal variance into account-threatening drawdowns. If risk per trade is not
          defined before entry, outcomes become dominated by the last impulsive decision rather than edge.
        </p>
      </section>
      <section>
        <FaqSectionH2>No invalidation criteria</FaqSectionH2>
        <p>
          A trade without a pre-defined exit for being wrong is a lottery ticket with extra steps. Write the condition
          that proves the thesis false; if you cannot, skip the trade.
        </p>
      </section>
      <section>
        <FaqSectionH2>Ignoring fees, spread, and funding</FaqSectionH2>
        <p>
          High-frequency small gains can net negative after costs. Model fees at your actual tier; include expected
          slippage for your typical order size.
        </p>
      </section>
      <DiagramDoomLoop />
      <section>
        <FaqSectionH2>Process fixes that compound</FaqSectionH2>
        <p>
          Use a journal with screenshots and numeric risk. Review weekly for rule adherence, not only P&amp;L. Reduce
          size after drawdowns until adherence returns. Treat leverage as a magnifier of behavioural gaps, not a skill
          shortcut.
        </p>
      </section>
      <section>
        <FaqSectionH2>Further reading on site</FaqSectionH2>
        <p>
          <Link href="/pillars/risk-management" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            Risk management pillar
          </Link>{" "}
          and{" "}
          <Link href="/tools/risk" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            risk tools
          </Link>{" "}
          support the quantitative side of the same habits.
        </p>
      </section>
    </FaqArticleShell>
  );
}

function StrategiesArticle({ item }: { item: FaqItem }) {
  return (
    <FaqArticleShell
      item={item}
      intro="Beginner-friendly strategies emphasize repetition, bounded risk, and review—not complexity. The examples below are educational frameworks; they are not personalized advice or performance guarantees."
    >
      <section>
        <FaqSectionH2 className="mt-0">Dollar-cost averaging (DCA)</FaqSectionH2>
        <p>
          DCA means purchasing fixed amounts on a schedule or fixed count of tranches. It reduces timing concentration but
          does not remove market risk; in persistent downtrends, average cost still declines slowly while unrealized loss
          can grow.
        </p>
        <DiagramDca />
      </section>
      <section>
        <FaqSectionH2>Scheduled review instead of continuous screen time</FaqSectionH2>
        <p>
          Define when you update levels and when you are flat. Constant monitoring correlates with impulsive edits.
          Batch your analysis; execute only during predefined windows unless a published alert triggers an exception path
          you wrote in advance.
        </p>
      </section>
      <section>
        <FaqSectionH2>Indicators as context, not oracles</FaqSectionH2>
        <p>
          Moving averages and oscillators summarize history. Use them to describe regime and volatility, not as standalone
          buy signals. Confluence with structure (levels, trend bias) produces fewer, more testable setups.
        </p>
      </section>
      <FaqCallout title="Early-stage practices to avoid">
        <ul className="list-inside list-disc space-y-2 text-slate-200/90">
          <li>Stacking uncorrelated indicators without a primary thesis</li>
          <li>Curve-fitting rules to the last month of data</li>
          <li>Scaling into leverage before journaling spot results</li>
        </ul>
      </FaqCallout>
      <section>
        <FaqSectionH2>Where RH expands the topic</FaqSectionH2>
        <p>
          Strategy detail lives alongside market structure lessons in the{" "}
          <Link href="/dashboard" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            dashboard
          </Link>{" "}
          curriculum tiers. Start with definitions, then add execution drills.
        </p>
      </section>
    </FaqArticleShell>
  );
}

function ScamsDyorArticle({ item }: { item: FaqItem }) {
  return (
    <FaqArticleShell
      item={item}
      intro="Doing your own research (DYOR) is a set of verification steps, not a slogan. The goal is to reduce fraud and misunderstanding before capital leaves your control."
    >
      <section>
        <FaqSectionH2 className="mt-0">Common attack patterns</FaqSectionH2>
        <p>
          Impersonation of support staff, fake airdrop sites, seed phrase collection, and “guaranteed yield” liquidity
          pools share a structure: urgency plus custody transfer. Legitimate operators do not ask for seed phrases or
          remote desktop control.
        </p>
      </section>
      <DiagramDyorFunnel />
      <section>
        <FaqSectionH2>Contract and address verification</FaqSectionH2>
        <p>
          Copy addresses from multiple independent sources (official site, block explorer listings, audited docs). Read
          token permissions you approve; unlimited approvals have been common exploit paths. Revoke stale approvals
          periodically using reputable tools.
        </p>
      </section>
      <section>
        <FaqSectionH2>Team, disclosures, and incentives</FaqSectionH2>
        <p>
          Map who can mint, pause, or upgrade contracts. Search for prior projects and litigation. Incentives aligned
          with long-term usage differ from short-term emission schedules designed only to attract deposits.
        </p>
      </section>
      <FaqCallout title="Red-flag phrases (non-exhaustive)">
        <ul className="list-inside list-disc space-y-2 text-slate-200/90">
          <li>“Risk-free” or fixed high monthly returns</li>
          <li>Pressure to deposit immediately to “lock a tier”</li>
          <li>Requests to share screen or seed words</li>
        </ul>
      </FaqCallout>
      <section>
        <FaqSectionH2>If something is wrong</FaqSectionH2>
        <p>
          Stop sending funds; rotate credentials; collect transaction hashes; contact venue support through official
          channels only. Jurisdiction-specific reporting exists for fraud; keep contemporaneous notes for any claims
          process.
        </p>
      </section>
    </FaqArticleShell>
  );
}

function RoadmapArticle({ item }: { item: FaqItem }) {
  return (
    <FaqArticleShell
      item={item}
      intro="A roadmap is an ordered set of skills and habits. The version below is generic; your timeline depends on hours invested, prior numeracy, and whether you keep a written process."
    >
      <DiagramRoadmap />
      <section>
        <FaqSectionH2 className="mt-0">Phase 0 — Vocabulary and mechanics</FaqSectionH2>
        <p>
          Finish the{" "}
          <Link href="/faq/what-is-crypto-trading" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            trading definition
          </Link>{" "}
          article and the{" "}
          <Link href="/faq/best-platforms-cex-vs-dex" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            platform comparison
          </Link>
          . You should be able to draw the lifecycle of a limit order on a whiteboard.
        </p>
      </section>
      <section>
        <FaqSectionH2>Phase 1 — Read-only chart work</FaqSectionH2>
        <p>
          Mark levels on higher timeframes; note news events; do not trade. Goal: consistent labeling and agreement with
          definitions in{" "}
          <Link href="/faq/how-to-read-crypto-charts" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            how to read charts
          </Link>
          .
        </p>
      </section>
      <section>
        <FaqSectionH2>Phase 2 — Simulated or minimum-size live journaling</FaqSectionH2>
        <p>
          Introduce a journal template with risk, setup name, entry, invalidation, and post-trade notes. Compare planned
          versus actual behaviour weekly.
        </p>
      </section>
      <section>
        <FaqSectionH2>Phase 3 — Risk tooling and product depth</FaqSectionH2>
        <p>
          Study{" "}
          <Link href="/faq/spot-vs-futures-vs-margin" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            spot vs margin vs futures
          </Link>{" "}
          before enabling borrow or contracts. Use calculators under{" "}
          <Link href="/tools/risk" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            Risk tools
          </Link>{" "}
          to translate stop distance into position size.
        </p>
      </section>
      <section>
        <FaqSectionH2>Phase 4 — Specialization</FaqSectionH2>
        <p>
          Choose one style (swing, intraday, passive accumulation) based on evidence from your journal, not preference
          alone. Deepen with{" "}
          <Link href="/market" className="font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300 hover:underline">
            Market
          </Link>{" "}
          context and optional signals content where applicable.
        </p>
      </section>
      <FaqCallout title="Milestone tests (self-administered)">
        <ul className="list-inside list-disc space-y-2 text-slate-200/90">
          <li>Explain last three trades without looking at the platform</li>
          <li>State fee drag as a percentage of gross P&amp;L for the month</li>
          <li>List three ways you violated your plan and the corrective edit</li>
        </ul>
      </FaqCallout>
    </FaqArticleShell>
  );
}

export function FaqArticleForSlug({ slug, item }: { slug: string; item: FaqItem }) {
  switch (slug) {
    case "what-is-crypto-trading":
      return <WhatIsCryptoTradingArticle item={item} />;
    case "how-to-start-crypto-trading-safely":
      return <StartSafelyArticle item={item} />;
    case "best-platforms-cex-vs-dex":
      return <CexDexArticle item={item} />;
    case "how-to-read-crypto-charts":
      return <ReadChartsArticle item={item} />;
    case "spot-vs-futures-vs-margin":
      return <SpotFuturesMarginArticle item={item} />;
    case "why-traders-lose-money":
      return <WhyLoseArticle item={item} />;
    case "best-strategies-for-beginners":
      return <StrategiesArticle item={item} />;
    case "avoid-scams-dyor":
      return <ScamsDyorArticle item={item} />;
    case "complete-beginner-roadmap":
      return <RoadmapArticle item={item} />;
    default:
      return null;
  }
}
