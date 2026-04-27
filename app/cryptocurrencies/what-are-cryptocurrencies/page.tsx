import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Are Cryptocurrencies? | RH Traders",
  description:
    "A clear explanation of cryptocurrencies, blockchains, and how crypto markets work—written for beginners.",
};

function DiagramCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold tracking-tight text-white">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhatAreCryptocurrenciesPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <div className="rh-wrap px-5 py-14">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
          CRYPTOCURRENCIES
        </p>
        <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          What are cryptocurrencies?
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-9 text-slate-300">
          Cryptocurrencies are digital assets that can be transferred online without a bank. They run on
          blockchains—public ledgers that record transactions and help the network agree on what happened.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <DiagramCard
            title="Digital money"
            desc="Crypto is native to the internet. You can send value globally with a wallet address."
            icon={
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 text-[color:var(--rh-skyblue)]">
                <path
                  d="M4 7h16v10H4V7Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10h6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
          <DiagramCard
            title="Blockchain ledger"
            desc="Transactions are grouped into blocks and linked over time, creating an auditable history."
            icon={
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 text-[color:var(--rh-accent)]">
                <path
                  d="M7 7h10v10H7V7Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 12h-3m16 0h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
          />
          <DiagramCard
            title="Market trading"
            desc="Crypto prices move from supply, demand, news, liquidity, and trader behavior—24/7."
            icon={
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 text-emerald-300">
                <path
                  d="M4 19h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 15l4-5 3 3 5-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>

        <section className="mt-12 rounded-[2.5rem] border border-white/10 bg-white/5 p-7 sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Core Pillars of Cryptocurrency
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-300 sm:text-base">
            To understand cryptocurrency properly, it is important to know the key elements that make it work.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-[color:var(--rh-accent)]/60 bg-black/20 p-6">
              <p className="text-lg font-extrabold text-white">Decentralization</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Cryptocurrencies are not controlled by any central authority like a bank or government. Instead, they
                operate on a distributed network where control is shared among users.
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-extrabold tracking-[0.22em] text-slate-400">Diagram</p>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={[
                        "h-2 rounded-full",
                        i === 2 || i === 7
                          ? "bg-[color:var(--rh-accent)]"
                          : "bg-[color:var(--rh-skyblue)]/80",
                      ].join(" ")}
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  Many nodes share validation instead of one central controller.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[color:var(--rh-skyblue)]/70 bg-black/20 p-6">
              <p className="text-lg font-extrabold text-white">Blockchain Technology</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Every transaction is recorded on a blockchain, which acts as a secure and transparent digital ledger.
                This ensures that all transactions are verifiable and cannot be easily altered.
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-extrabold tracking-[0.22em] text-slate-400">Diagram</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Block", "Block", "Block", "Block"].map((b, idx) => (
                    <div
                      key={`${b}-${idx}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-sm font-extrabold text-slate-200"
                    >
                      <span className="h-2 w-2 rounded-full bg-[color:var(--rh-skyblue)]" aria-hidden />
                      {b}
                      <span className="text-[color:var(--rh-accent)]" aria-hidden>
                        →
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  Blocks link together over time, creating a transparent history.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] border border-white/10 bg-white/5 p-7 sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Types of Cryptocurrencies
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-300 sm:text-base">
            There are different types of cryptocurrencies, each serving a specific purpose in the market.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {[
              {
                h: "Bitcoin (BTC)",
                p: "Bitcoin is the first and most popular cryptocurrency. It is mainly used as a store of value and digital gold.",
                tone: "border-[color:var(--rh-accent)]/60",
              },
              {
                h: "Altcoins",
                p: "All cryptocurrencies other than Bitcoin are called altcoins. Examples include Ethereum, Solana, and Cardano.",
                tone: "border-[color:var(--rh-skyblue)]/70",
              },
              {
                h: "Stablecoins",
                p: "Stablecoins are designed to maintain a stable value by being linked to real-world assets like the US dollar. Examples include USDT and USDC.",
                tone: "border-white/10",
              },
              {
                h: "Utility Tokens",
                p: "These tokens are used within specific platforms or ecosystems to access services or features.",
                tone: "border-white/10",
              },
              {
                h: "Meme Coins",
                p: "Meme coins are community-driven cryptocurrencies that often gain popularity through social media trends, such as Dogecoin.",
                tone: "border-white/10",
              },
            ].map((x) => (
              <div
                key={x.h}
                className={`rounded-3xl border ${x.tone} bg-black/20 p-6`}
              >
                <p className="text-lg font-extrabold text-white">{x.h}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{x.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] border border-white/10 bg-white/5 p-7 sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            How Cryptocurrency Gains Value
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-300 sm:text-base">
            The value of a cryptocurrency is mainly driven by supply and demand. When more people want to buy a coin,
            its price increases. When selling pressure increases, the price falls.
          </p>
          <p className="mt-5 text-[15px] leading-8 text-slate-300 sm:text-base">
            Other factors that influence price include market sentiment, global news, adoption, and trading volume.
          </p>
          <p className="mt-5 text-[15px] leading-8 text-slate-300 sm:text-base">
            Understanding these factors helps traders make better decisions instead of relying on guesswork.
          </p>

          <div className="mt-7 rounded-3xl border border-white/10 bg-black/20 p-6">
            <p className="text-sm font-extrabold text-white">Diagram: demand vs supply</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-extrabold text-white">Demand increases</p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-[color:var(--rh-accent)]" />
                </div>
                <p className="mt-3 text-sm text-slate-300">Price tends to rise.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-extrabold text-white">Selling pressure increases</p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[70%] rounded-full bg-[color:var(--rh-skyblue)]" />
                </div>
                <p className="mt-3 text-sm text-slate-300">Price tends to fall.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] border border-white/10 bg-white/5 p-7 sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Why Learning Cryptocurrency is Important
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-300 sm:text-base">
            Before entering crypto trading, it is important to understand how cryptocurrencies work. Without proper
            knowledge, traders often make emotional decisions and face losses.
          </p>
          <p className="mt-5 text-[15px] leading-8 text-slate-300 sm:text-base">
            Learning the basics helps you build confidence, reduce risks, and trade with a clear strategy.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              {
                h: "Transparency",
                p: "All transactions are publicly available on the blockchain. This allows anyone to verify data, which increases trust and reduces manipulation.",
                tone: "text-[color:var(--rh-skyblue)]",
              },
              {
                h: "Security",
                p: "Cryptocurrencies use advanced cryptography to secure transactions and protect user data. This makes the system highly secure compared to traditional systems.",
                tone: "text-[color:var(--rh-accent)]",
              },
              {
                h: "Limited Supply",
                p: "Many cryptocurrencies, like Bitcoin, have a fixed supply. This scarcity can increase value over time as demand grows.",
                tone: "text-emerald-300",
              },
            ].map((x) => (
              <div key={x.h} className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <p className={`text-lg font-extrabold ${x.tone}`}>{x.h}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{x.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2.5rem] border border-white/10 bg-white/5 p-7 sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            The simple mental model
          </h2>
          <p className="mt-4 text-[15px] leading-8 text-slate-300 sm:text-base">
            Think of crypto as an open network where ownership is represented by balances on a ledger. When you trade,
            you’re not “printing money”—you’re exchanging assets at a market price. Your job as a trader is to build a
            plan: context → entry → invalidation (stop) → targets → position size.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { k: "Context", v: "Trend, structure, and key zones" },
              { k: "Risk", v: "Stop loss + position sizing rules" },
              { k: "Execution", v: "Follow a plan instead of emotions" },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-3xl border border-white/10 bg-black/20 p-6"
              >
                <p className="text-sm font-extrabold text-white">{x.k}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{x.v}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/cryptocurrencies/benefits-of-crypto-trading"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--rh-accent)] px-6 py-3 text-sm font-extrabold text-white shadow-[0_0_22px_rgba(255,106,0,0.28)] transition hover:bg-[color:var(--rh-accent-bright)]"
          >
            Read: Benefits of Crypto Trading
          </Link>
          <Link
            href="/market"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/8"
          >
            Market Overview
          </Link>
        </div>
      </div>
    </main>
  );
}

