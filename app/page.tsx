import Image from "next/image";
import Link from "next/link";
import { LivePricesTable } from "./components/LivePricesTable";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main id="home" className="flex flex-col">
        <div className="rh-wrap w-full px-5 pt-6">
          <div className="flex justify-center">
            <Link
              href="#join"
              className="rh-btn-primary inline-flex min-w-[220px] items-center justify-center rounded-full border border-[color:var(--rh-red-deep)]/70 px-10 py-3.5 text-base font-extrabold text-white transition"
            >
              Join Now
            </Link>
          </div>
        </div>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#120000]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(900px 420px at 18% 26%, rgba(255,26,26,0.28), transparent 60%), radial-gradient(1000px 520px at 86% 18%, rgba(255,26,26,0.16), transparent 58%), radial-gradient(700px 360px at 50% 70%, rgba(255,26,26,0.10), transparent 62%)",
            }}
          />

          <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-[420px] max-w-[1200px] px-5 opacity-20">
            <svg
              viewBox="0 0 1200 420"
              className="h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="rhLine" x1="0" y1="0" x2="1200" y2="0">
                  <stop stopColor="#ff1a1a" stopOpacity="0.16" />
                  <stop offset="1" stopColor="#ff1a1a" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              <g opacity="0.55">
                {Array.from({ length: 8 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M0 ${60 + i * 44} H1200`}
                    stroke="white"
                    strokeOpacity="0.06"
                  />
                ))}
              </g>
              <path
                d="M40 320 C 150 250, 220 280, 330 215 C 420 160, 520 170, 610 135 C 690 105, 760 125, 850 90 C 950 50, 1030 78, 1160 42"
                stroke="url(#rhLine)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="relative rh-wrap px-5 pt-14 pb-10 sm:pt-16 sm:pb-12">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="rh-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--rh-red)] shadow-[0_0_18px_rgba(255,26,26,0.78)]" />
                  PREMIUM CRYPTO TRAINING PLATFORM
                </p>

                <h1 className="rh-fade-up-2 mt-5 text-balance text-5xl font-black tracking-tight sm:text-6xl">
                  Master Crypto Trading Like a Pro
                </h1>

                <p className="rh-fade-up-3 rh-secondary mt-4 max-w-xl text-pretty text-lg leading-8">
                  Learn strategies, signals, and market analysis from RH Traders
                </p>

                <div className="rh-fade-up-3 mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#learn"
                    className="rh-btn-primary inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-extrabold text-white transition"
                  >
                    Start Learning
                  </Link>
                  <Link
                    href="#signals"
                    className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-extrabold text-white transition"
                  >
                    View Signals
                  </Link>
                  <Link
                    href="/coins"
                    className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-extrabold text-white transition"
                  >
                    Explore Coins
                  </Link>
                </div>

                <div className="rh-fade-up-3 mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { k: "Level", v: "Beginner → Pro" },
                    { k: "Focus", v: "Education First" },
                    { k: "Style", v: "Simple & Clear" },
                    { k: "Goal", v: "Build Skill" },
                  ].map((s) => (
                    <div
                      key={s.k}
                      className="rh-card rounded-2xl p-4 hover:-translate-y-0.5"
                    >
                      <p className="rh-secondary text-xs font-semibold tracking-wide">
                        {s.k}
                      </p>
                      <p className="mt-2 text-lg font-black text-white">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(420px_240px_at_30%_20%,rgba(255,26,26,0.22),transparent_62%)] blur-2xl" />
                  <div className="grid gap-4">
                    {[
                      {
                        title: "Live Signals",
                        value: "BTC · ETH · ALTS",
                        hint: "Clear entry / target / stop",
                      },
                      {
                        title: "Learning Paths",
                        value: "Beginner → Pro",
                        hint: "Step-by-step strategy lessons",
                      },
                      {
                        title: "Market Notes",
                        value: "Daily Updates",
                        hint: "Levels, trend, and momentum",
                      },
                    ].map((c, idx) => (
                      <div
                        key={c.title}
                        className={[
                          "rh-card rounded-3xl p-5",
                          idx === 1 ? "translate-x-6" : "",
                          idx === 2 ? "translate-x-2" : "",
                        ].join(" ")}
                        style={{ animation: "rh-fade-up 900ms both" }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-extrabold tracking-wide text-white">
                            {c.title}
                          </p>
                          <span className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_22px_rgba(255,26,26,0.14)]" />
                        </div>
                        <p className="mt-4 text-xl font-black text-white">
                          {c.value}
                        </p>
                        <p className="rh-secondary mt-2 text-sm leading-7">
                          {c.hint}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rh-wrap w-full px-5 py-14">
          <div>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Learn the Core Pillars of Crypto Trading
            </h2>
            <p className="mt-3 max-w-3xl text-white/85">
              Understand the essential foundations every trader must master
              before entering the market
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Market Trend",
                desc: "Learn how to spot bull and bear markets so you stop fighting the bigger move.",
                href: "/pillars/market-trend",
              },
              {
                title: "Support & Resistance",
                desc: "Understand key price levels where markets often bounce or reject.",
                href: "/pillars/support-resistance",
              },
              {
                title: "Volume",
                desc: "Use volume to judge market strength and avoid weak breakouts.",
                href: "/pillars/volume",
              },
              {
                title: "Risk Management",
                desc: "Protect your account with position sizing, stop-loss logic, and discipline.",
                href: "/pillars/risk-management",
              },
            ].map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group rh-card block rounded-3xl p-7 transition hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-base leading-8 text-white/85">
                      {p.desc}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--rh-red)] drop-shadow-[0_0_16px_rgba(74,0,0,0.28)]">
                      Learn more <span aria-hidden="true">→</span>
                    </span>
                  </div>
                  <span className="mt-1 h-12 w-12 shrink-0 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_28px_rgba(255,26,26,0.16)] transition group-hover:shadow-[0_0_46px_rgba(255,26,26,0.30)]" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rh-wrap w-full px-5 py-14">
          <div className="rh-card rounded-3xl bg-gradient-to-b from-white/5 to-transparent p-6 sm:p-10">
            <div className="rh-content">
              <h2>Complete Guide to Crypto Trading for Beginners</h2>
              <p>
                If you are new, don’t worry. This guide is written in a simple,
                beginner-friendly way.
              </p>
              <p>
                We focus on the skills you need first, then slowly add more
                advanced ideas.
              </p>

              <h2>What is crypto trading?</h2>
              <p>
                Crypto trading is the act of buying and selling digital coins
                like Bitcoin or Ethereum to try to make a profit. Some people
                trade daily, and some people trade only a few times per month.
                The goal is the same: buy when a coin is undervalued and sell
                when it becomes more valuable.
              </p>
              <p>
                Trading is different from long-term investing. Investing is like
                planting a tree and waiting. Trading is like gardening every
                week: you watch the market, manage risk, and make smaller
                decisions more often.
              </p>

              <h2>How does the crypto market work?</h2>
              <p>
                The crypto market is open 24 hours a day, 7 days a week. Prices
                move because of supply and demand. When more people want to buy
                a coin than sell it, the price usually goes up. When more people
                want to sell than buy, the price usually goes down.
              </p>
              <h3>Why do prices move so fast?</h3>
              <p>
                Crypto can move quickly because it is still a young market. News
                can change sentiment fast. Big traders can move price. And
                emotions like fear and greed can cause people to rush in or rush
                out.
              </p>

              <h2>Why the core pillars matter</h2>
              <p>
                Beginners often look for “a perfect coin” or “a secret
                indicator.” But strong traders focus on foundations first. The
                pillars help you read the market clearly and avoid emotional
                decisions.
              </p>
              <h3>Pillar 1: Market trend</h3>
              <p>
                Trend means direction. In a bull trend, price generally rises.
                In a bear trend, price generally falls. Trading with the trend
                is usually easier than fighting it.
              </p>
              <h3>Pillar 2: Support &amp; resistance</h3>
              <p>
                Support is where price often stops falling and “bounces.” 
                Resistance is where price often stops rising and “rejects.”
                These are not magic lines. They are zones where many traders pay
                attention.
              </p>
              <h3>Pillar 3: Volume</h3>
              <p>
                Volume is how much trading is happening. Strong moves with
                strong volume are often more trustworthy than moves that happen
                with low volume.
              </p>
              <h3>Pillar 4: Risk management</h3>
              <p>
                Risk management is how you protect your money. It includes
                position sizing, stop losses, and not risking too much on one
                trade. Good risk control keeps you in the game long enough to
                learn.
              </p>

              <h2>Common beginner mistakes (and how to avoid them)</h2>
              <h3>1) Trading without a plan</h3>
              <p>
                A plan answers: where you enter, where you take profit, and
                where you exit if you are wrong. If you do not know those three
                things, you are guessing.
              </p>
              <h3>2) Risking too much</h3>
              <p>
                Beginners often put too much money into one trade. One bad move
                can then destroy confidence and capital. Start small and protect
                your learning.
              </p>
              <h3>3) Chasing hype</h3>
              <p>
                Viral coins and memes can pump fast, but they can dump just as
                fast. Learn the basics using more stable, liquid coins first.
              </p>
              <h3>4) Ignoring fees and emotions</h3>
              <p>
                Fees, spreads, and emotional decisions can silently break your
                results. Keep a simple journal: what you did, why you did it,
                and what you learned.
              </p>
            </div>
          </div>
        </section>

        <section className="rh-wrap w-full px-5 py-14">
          <div className="rh-content">
            <h2>Types of Crypto Coins Explained</h2>
            <p>
              Major coins, altcoins, meme coins, and stablecoins all behave
              differently.
            </p>
            <p>
              Understanding the category helps you choose smarter and avoid
              beginner mistakes.
            </p>
          </div>

          <div className="rh-card mt-8 overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="rh-table rh-table-premium min-w-full text-left text-base">
                <thead>
                  <tr className="text-white">
                    {["Coin Name", "Symbol", "Category", "Use Case", "Risk Level"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-5 py-4 font-semibold tracking-wide"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Bitcoin",
                      sym: "BTC",
                      cat: "Major",
                      use: "Store of value",
                      risk: "Medium",
                    },
                    {
                      name: "Ethereum",
                      sym: "ETH",
                      cat: "Major",
                      use: "Smart contracts",
                      risk: "Medium",
                    },
                    {
                      name: "Solana",
                      sym: "SOL",
                      cat: "Altcoin",
                      use: "Fast apps",
                      risk: "High",
                    },
                    {
                      name: "XRP",
                      sym: "XRP",
                      cat: "Altcoin",
                      use: "Payments",
                      risk: "High",
                    },
                    {
                      name: "Dogecoin",
                      sym: "DOGE",
                      cat: "Meme",
                      use: "Community coin",
                      risk: "Very High",
                    },
                    {
                      name: "Tether",
                      sym: "USDT",
                      cat: "Stable",
                      use: "Stable value",
                      risk: "Low",
                    },
                  ].map((r) => (
                    <tr
                      key={r.sym}
                      className="transition"
                    >
                      <td className="px-5 py-4 font-bold text-white">{r.name}</td>
                      <td className="px-5 py-4 font-semibold text-zinc-200">
                        {r.sym}
                      </td>
                      <td className="px-5 py-4 text-zinc-200">{r.cat}</td>
                      <td className="px-5 py-4 text-zinc-200">{r.use}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full border border-[color:var(--rh-red)]/60 bg-[color:var(--rh-red)]/15 px-3 py-1 text-xs font-semibold text-white">
                          {r.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rh-card rounded-3xl bg-gradient-to-b from-white/5 to-transparent p-6 sm:p-10">
              <div className="rh-content">
                <h2>Which Coins Should Beginners Start With?</h2>
                <p>
                  Beginners should usually start with <strong>BTC</strong> and{" "}
                  <strong>ETH</strong>.
                </p>
                <p>
                  These are the most popular coins with high liquidity. That
                  means it is easier to buy and sell without huge price jumps.
                </p>
                <p>
                  Meme coins can move fast, but they can drop fast too. Focus on
                  stability and learning first, then explore riskier coins later.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rh-card overflow-hidden rounded-2xl">
                <div className="bg-gradient-to-b from-black to-zinc-950 px-5 py-4">
                  <h3 className="text-base font-bold text-white">
                    Beginner Coins Table
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="rh-table rh-table-premium min-w-full text-left text-base">
                    <thead>
                      <tr>
                        {["Coin", "Reason to Choose", "Risk Level"].map((h) => (
                          <th
                            key={h}
                            className="px-5 py-4 font-semibold tracking-wide"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          coin: "BTC",
                          reason: "Most trusted major",
                          risk: "Medium",
                        },
                        {
                          coin: "ETH",
                          reason: "Top smart-contract coin",
                          risk: "Medium",
                        },
                      ].map((r) => (
                        <tr
                          key={r.coin}
                          className="transition"
                        >
                          <td className="px-5 py-4 font-bold text-white">
                            {r.coin}
                          </td>
                          <td className="px-5 py-4 text-zinc-200">
                            {r.reason}
                          </td>
                          <td className="px-5 py-4 text-zinc-200">
                            {r.risk}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rh-card overflow-hidden rounded-2xl">
                <div className="bg-gradient-to-b from-black to-zinc-950 px-5 py-4">
                  <h3 className="text-base font-bold text-white">
                    Advanced and High-Risk Coins
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="rh-table rh-table-premium min-w-full text-left text-base">
                    <thead>
                      <tr>
                        {["Coin", "Category", "Risk Level", "Potential"].map(
                          (h) => (
                            <th
                              key={h}
                              className="px-5 py-4 font-semibold tracking-wide"
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          coin: "SOL",
                          category: "Altcoin",
                          risk: "High",
                          potential: "Fast growth",
                        },
                        {
                          coin: "XRP",
                          category: "Altcoin",
                          risk: "High",
                          potential: "Payment use",
                        },
                        {
                          coin: "DOGE",
                          category: "Meme",
                          risk: "Very High",
                          potential: "Hype spikes",
                        },
                      ].map((r) => (
                        <tr
                          key={r.coin}
                          className="transition"
                        >
                          <td className="px-5 py-4 font-bold text-white">
                            {r.coin}
                          </td>
                          <td className="px-5 py-4 text-zinc-200">
                            {r.category}
                          </td>
                          <td className="px-5 py-4 text-zinc-200">{r.risk}</td>
                          <td className="px-5 py-4 text-zinc-200">
                            {r.potential}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rh-wrap w-full px-5 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Live Crypto Prices
              </h2>
              <p className="mt-3 max-w-3xl text-zinc-700">
                Live prices with 24h change and market cap. Colors update green/red
                as the price moves.
              </p>
            </div>
            <Link
              href="/coins"
              className="hidden rounded-full border border-black/10 bg-black/5 px-6 py-3 text-base font-extrabold text-zinc-950 transition hover:border-[color:var(--rh-red)]/70 hover:bg-black/10 sm:inline-flex"
            >
              Learn coins
            </Link>
          </div>

          <div className="mt-8">
            <LivePricesTable />
          </div>
        </section>

        <section className="rh-wrap w-full px-5 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Features built for serious traders
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-700">
                Signals, courses, and analysis—delivered with a premium,
                distraction-free experience.
              </p>
            </div>
            <Link
              href="#join"
              className="hidden rounded-full border border-black/10 bg-black/5 px-6 py-3 text-base font-extrabold text-zinc-950 transition hover:border-[color:var(--rh-red)]/70 hover:bg-black/10 sm:inline-flex"
            >
              Explore Membership
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Crypto Signals",
                desc: "High-clarity entries, targets, and stops with disciplined risk control.",
              },
              {
                title: "Trading Courses",
                desc: "Structured learning paths from fundamentals to pro-grade execution.",
              },
              {
                title: "Market Analysis",
                desc: "Clean, actionable breakdowns of trend, structure, and momentum.",
              },
              {
                title: "Daily Updates",
                desc: "Consistent notes, watchlists, and key level alerts—no clutter.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="group rh-card relative overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(520px_260px_at_30%_20%,rgba(74,0,0,0.12),transparent_62%)]" />
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-extrabold text-zinc-950">
                      {c.title}
                    </p>
                    <span className="h-10 w-10 rounded-2xl border border-black/10 bg-white shadow-[0_0_22px_rgba(74,0,0,0.14)]" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-700">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="signals" className="rh-wrap w-full px-5 py-14">
          <div className="rh-card rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Signals Table
                </h2>
                <p className="mt-2 text-zinc-700">
                  Professional, clean, dark theme with red highlights.
                </p>
              </div>
              <Link
                href="#join"
                className="inline-flex w-fit items-center justify-center rounded-full bg-[color:var(--rh-red)] px-6 py-3 text-base font-extrabold text-white shadow-[0_16px_50px_rgba(74,0,0,0.24)] transition hover:shadow-[0_20px_64px_rgba(74,0,0,0.34)]"
              >
                Unlock All Signals
              </Link>
            </div>

            <div className="rh-card mt-6 overflow-hidden rounded-2xl">
              <div className="overflow-x-auto">
                <table className="rh-table rh-table-premium min-w-full text-left text-base">
                  <thead>
                    <tr className="text-white">
                      {["Coin", "Entry Price", "Target Price", "Stop Loss", "Status"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-5 py-4 font-semibold tracking-wide"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        coin: "BTC",
                        entry: "$62,350",
                        target: "$66,900",
                        stop: "$60,980",
                        status: "Active",
                      },
                      {
                        coin: "ETH",
                        entry: "$3,180",
                        target: "$3,420",
                        stop: "$3,060",
                        status: "Waiting",
                      },
                    ].map((r) => (
                      <tr key={r.coin} className="transition">
                        <td className="px-5 py-4 font-bold text-white">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--rh-red)] shadow-[0_0_14px_rgba(74,0,0,0.30)]" />
                            {r.coin}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-zinc-200">{r.entry}</td>
                        <td className="px-5 py-4 text-zinc-200">{r.target}</td>
                        <td className="px-5 py-4 text-zinc-200">{r.stop}</td>
                        <td className="px-5 py-4">
                          <span
                            className={[
                              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                              r.status === "Active"
                                ? "border-[color:var(--rh-red)]/60 bg-[color:var(--rh-red)]/15 text-white"
                                : "border-white/20 bg-white/10 text-white/90",
                            ].join(" ")}
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="rh-wrap w-full px-5 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                FAQ Preview
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-700">
                Quick answers, clean layout, and a premium card experience.
              </p>
            </div>
            <Link
              href="#contact"
              className="hidden rounded-full border border-black/10 bg-black/5 px-6 py-3 text-base font-extrabold text-zinc-950 transition hover:border-[color:var(--rh-red)]/70 hover:bg-black/10 sm:inline-flex"
            >
              Ask a Question
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                q: "How do RH Traders signals work?",
                d: "Clear entries, targets, and stops—designed for disciplined execution.",
              },
              {
                q: "Is this suitable for beginners?",
                d: "Yes. Learn the foundations first, then level up with structured strategy modules.",
              },
              {
                q: "What markets do you cover?",
                d: "BTC, ETH, and select alts based on volatility, structure, and liquidity.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="group rh-card overflow-hidden rounded-3xl transition hover:-translate-y-1"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src="/faq-thumb.svg"
                    alt="Trading chart thumbnail"
                    fill
                    className="object-cover opacity-95"
                    priority={false}
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg font-extrabold text-zinc-950">
                    {item.q}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-700">
                    {item.d}
                  </p>
                  <Link
                    href="#faq"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[color:var(--rh-red)] transition group-hover:drop-shadow-[0_0_16px_rgba(74,0,0,0.18)]"
                  >
                    Read More
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="learn" className="rh-wrap w-full px-5 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Learn & Blog
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-700">
                Modern cards with clean typography and strong hierarchy.
              </p>
            </div>
            <div id="blog" className="hidden sm:block" />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "What is Crypto Trading?",
                desc: "Understand markets, volatility, and how traders find high-probability setups.",
              },
              {
                title: "How to Start Trading?",
                desc: "A premium beginner roadmap: exchanges, risk, position sizing, and execution.",
              },
              {
                title: "Best Strategies",
                desc: "A clean toolkit: trend, structure, breakouts, and smart risk management.",
              },
            ].map((a) => (
              <article
                key={a.title}
                className="group rh-card relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(540px_280px_at_30%_20%,rgba(74,0,0,0.10),transparent_64%)]" />
                </div>
                <div className="relative">
                  <p className="text-lg font-extrabold text-zinc-950">
                    {a.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-700">
                    {a.desc}
                  </p>
                  <Link
                    href="#learn"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-zinc-950 transition group-hover:text-[color:var(--rh-red)]"
                  >
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="market" className="mx-auto w-full max-w-6xl px-5 py-10">
          <div className="rh-card rounded-3xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Market
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-700">
              This section can evolve into a live market feed (prices, heatmap,
              news). For now, it keeps the premium structure and navigation flow.
            </p>
          </div>
        </section>

        <footer
          id="contact"
          className="mt-10 border-t border-black/10 bg-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-12">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[color:var(--rh-gold-1)] via-[#b98522] to-[color:var(--rh-gold-2)] drop-shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
                    RH
                  </span>
                  <span className="text-sm font-extrabold tracking-[0.25em] text-zinc-900">
                    TRADERS
                  </span>
                </div>
                <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-700">
                  Premium crypto signals, learning, and market analysis—built
                  with a clean, professional trading aesthetic.
                </p>
              </div>

              <div>
                <p className="text-sm font-black tracking-wide text-zinc-950">
                  Quick Links
                </p>
                <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-700">
                  {[
                    { label: "Home", href: "#home" },
                    { label: "Signals", href: "#signals" },
                    { label: "FAQ", href: "#faq" },
                    { label: "Contact", href: "#contact" },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="w-fit transition hover:text-[color:var(--rh-red)]"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-black tracking-wide text-zinc-950">
                  Contact
                </p>
                <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-700">
                  <a
                    href="mailto:hello@rhtraders.com"
                    className="w-fit transition hover:text-[color:var(--rh-red)]"
                  >
                    hello@rhtraders.com
                  </a>
                  <a
                    href="#"
                    className="w-fit transition hover:text-[color:var(--rh-red)]"
                  >
                    WhatsApp: +00 000 000 000
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-black tracking-wide text-zinc-950">
                  Social
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {["X", "IG", "YT"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/5 text-sm font-black text-zinc-900 transition hover:border-[color:var(--rh-red)]/60"
                      aria-label={s}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-black/10 pt-8 text-center text-sm text-zinc-600">
              © 2026 RH Traders. All rights reserved.
            </div>
          </div>
        </footer>

        <div id="join" className="sr-only" />
      </main>
    </div>
  );
}
