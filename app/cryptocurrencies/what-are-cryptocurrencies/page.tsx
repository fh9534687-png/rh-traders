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

