import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Benefits of Crypto Trading | RH Traders",
  description:
    "Learn the key benefits of crypto trading: liquidity, volatility, 24/7 markets, diverse assets, advanced tools, and lower fees—with clear diagrams.",
};

function AccentPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
      {children}
    </span>
  );
}

function Block({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2.25rem] border border-white/10 bg-white/5 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:p-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm font-extrabold tracking-wide text-[color:var(--rh-skyblue)]">
            {subtitle}
          </p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
          {icon}
        </div>
      </div>
      <div className="mt-6 text-[15px] leading-8 text-slate-200 sm:text-base">
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
  lines: Array<{ label: string; pct: number; tone: "sky" | "orange" }>;
}) {
  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-6">
      <p className="text-sm font-extrabold text-white">{title}</p>
      <p className="mt-1 text-sm leading-7 text-slate-300">{desc}</p>
      <div className="mt-4 space-y-3">
        {lines.map((l) => (
          <div key={l.label} className="flex items-center gap-3">
            <div className="w-28 text-xs font-extrabold text-slate-200">
              {l.label}
            </div>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className={[
                  "absolute inset-y-0 left-0 rounded-full",
                  l.tone === "sky"
                    ? "bg-[color:var(--rh-skyblue)]"
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

export default function BenefitsOfCryptoTradingPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="rh-wrap px-5 py-14">
        <AccentPill>CRYPTOCURRENCIES</AccentPill>
        <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Benefits of Crypto Trading
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-9 text-slate-300">
          Crypto trading offers exciting opportunities due to high liquidity, constant market access, and a wide range
          of assets. The key is discipline: a plan, risk management, and learning the market context.
        </p>

        <div className="mt-10 grid gap-6">
          <Block
            title="High Liquidity and Price Volatility"
            subtitle="Liquidity + volatility = opportunity (with risk)"
            icon={
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 text-[color:var(--rh-accent)]">
                <path
                  d="M4 18c2-6 6-10 10-10s6 3 6 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12c2 1 4 1 6 0s4-1 6 0 4 1 6 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          >
            <p>
              One of the biggest advantages of crypto trading is the high liquidity and frequent price movements in the
              market. Cryptocurrencies such as Bitcoin and Ethereum often show noticeable price changes within short
              time periods.
            </p>
            <p className="mt-5">
              While this volatility can increase risk, it also creates multiple opportunities for traders to earn
              profits from quick market moves. Since the crypto market is still growing and smaller compared to
              traditional financial markets, price swings are often larger and more frequent.
            </p>
            <p className="mt-5">
              For example, daily price changes of 5–10% are quite common, which allows traders to take advantage of
              short-term trading strategies.
            </p>
            <MiniDiagram
              title="Diagram: typical daily movement"
              desc="Visualizing how volatility can be larger in crypto compared to many traditional markets."
              lines={[
                { label: "Crypto", pct: 70, tone: "orange" },
                { label: "Stocks", pct: 25, tone: "sky" },
                { label: "FX", pct: 18, tone: "sky" },
              ]}
            />
          </Block>

          <Block
            title="24/7 Market Access"
            subtitle="24/7 Market Availability"
            icon={
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 text-[color:var(--rh-skyblue)]">
                <path
                  d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 6v6l4 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            <p>
              Unlike traditional markets, the cryptocurrency market operates 24 hours a day, 7 days a week. This gives
              traders full flexibility to enter or exit trades at any time.
            </p>
            <p className="mt-5">
              You don’t have to wait for market opening hours, which means you can respond instantly to global news and
              events. For example, if something happens in the US market, traders from Asia or Europe can react
              immediately without delay.
            </p>
            <p className="mt-5">
              This continuous access allows traders to manage their positions according to their own schedule.
            </p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm font-extrabold text-white">Diagram: always open</p>
              <p className="mt-1 text-sm leading-7 text-slate-300">
                Crypto is open 24/7, so the skill is learning when *you* should trade—according to your plan and energy.
              </p>
              <div className="mt-4 grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={[
                      "h-2 rounded-full",
                      i % 7 === 0
                        ? "bg-[color:var(--rh-accent)]"
                        : "bg-[color:var(--rh-skyblue)]",
                    ].join(" ")}
                    aria-hidden
                  />
                ))}
              </div>
            </div>
          </Block>

          <Block
            title="Diverse Assets"
            subtitle="Wide Range of Crypto Assets"
            icon={
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 text-[color:var(--rh-accent)]">
                <path
                  d="M4 6h6v6H4V6Zm10 0h6v6h-6V6ZM4 16h6v2H4v-2Zm10 0h6v2h-6v-2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            <p>
              The crypto market offers thousands of digital assets, including coins and tokens with different use
              cases. Traders can explore various categories such as DeFi projects, NFTs, stablecoins, meme coins, and
              utility tokens.
            </p>
            <p className="mt-5">
              This variety helps traders diversify their portfolios and explore different opportunities within the
              market. It also allows traders to spread risk and find assets that may have strong future potential.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {["DeFi", "NFTs", "Stablecoins", "Utility"].map((x) => (
                <div
                  key={x}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold text-white"
                >
                  <span className="text-[color:var(--rh-skyblue)]">●</span> {x}
                </div>
              ))}
            </div>
          </Block>

          <Block
            title="Advanced Tools"
            subtitle="Advanced Trading Tools"
            icon={
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 text-[color:var(--rh-skyblue)]">
                <path
                  d="M12 2v4m0 12v4M4.9 4.9l2.8 2.8m8.6 8.6 2.8 2.8M2 12h4m12 0h4M4.9 19.1l2.8-2.8m8.6-8.6 2.8-2.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          >
            <p>
              Many crypto platforms provide advanced features such as margin trading, futures, and leveraged positions.
              These tools allow traders to apply different strategies and potentially increase their returns.
            </p>
            <p className="mt-5">
              For example, leverage enables traders to open larger positions than their actual balance. However, it is
              important to understand that while leverage can increase profits, it also increases risk. Proper risk
              management is essential.
            </p>
            <MiniDiagram
              title="Diagram: leverage = bigger swings"
              desc="Leverage can magnify outcomes—good and bad—so risk limits matter."
              lines={[
                { label: "1x", pct: 25, tone: "sky" },
                { label: "5x", pct: 55, tone: "orange" },
                { label: "10x", pct: 80, tone: "orange" },
              ]}
            />
          </Block>

          <Block
            title="Lower Fees"
            subtitle="Lower Transaction Costs"
            icon={
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 text-[color:var(--rh-accent)]">
                <path
                  d="M7 7h10v3H7V7Zm0 7h6v3H7v-3Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 4h14v16H5V4Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            <p>
              Crypto trading often involves lower fees compared to traditional financial systems. Because blockchain
              technology reduces the need for middlemen, transaction costs can be more affordable.
            </p>
            <p className="mt-5">
              This is especially useful for active traders who make frequent trades, as lower fees help increase overall
              profitability.
            </p>
            <MiniDiagram
              title="Diagram: cost impact"
              desc="Lower fees matter more when you trade frequently."
              lines={[
                { label: "High fees", pct: 75, tone: "orange" },
                { label: "Low fees", pct: 35, tone: "sky" },
              ]}
            />
          </Block>
        </div>

        <section className="mt-10 rounded-[2.5rem] border border-white/10 bg-white/5 p-7 sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Short conclusion
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-200 sm:text-base">
            Crypto trading offers exciting opportunities due to its high liquidity, constant market access, and wide
            range of assets. However, it also comes with risks such as volatility and market uncertainty.
          </p>
          <p className="mt-5 text-[15px] leading-8 text-slate-200 sm:text-base">
            To succeed, traders need proper knowledge, discipline, and risk management. With the right strategy, crypto
            trading can become a powerful skill for long-term growth.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--rh-accent)] px-7 py-3 text-sm font-extrabold text-white shadow-[0_0_24px_rgba(255,106,0,0.28)] transition hover:bg-[color:var(--rh-accent-bright)]"
            >
              Start learning
            </Link>
            <Link
              href="/cryptocurrencies/what-are-cryptocurrencies"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-white/8"
            >
              What are cryptocurrencies?
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

