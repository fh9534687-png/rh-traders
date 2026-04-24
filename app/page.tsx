import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "./components/HomeHero";
import { LivePricesTable } from "./components/LivePricesTable";
import { EnrollCountdownBanner } from "./components/EnrollCountdownBanner";
import { HomeTradingBackground } from "./components/HomeTradingBackground";
import { HomeSectionsClient } from "./components/HomeSectionsClient";

export const metadata = {
  title: "Crypto Trading Course and Signals",
  description:
    "RH Traders is a structured trading platform where you can learn trading online through a guided crypto trading course, practical dashboards, and trading signals built around risk-first execution.",
};

/** Small accent checkmark for table cells (no emoji). */
function RhBlueTick({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 text-[color:var(--rh-border-red)] ${className}`}
      aria-hidden
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 12 12"
        className="drop-shadow-[0_0_6px_rgba(56,189,248,0.45)]"
      >
        <path
          d="M2 6l2.5 2.5L10 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Accent dot for list-style rows (replaces emoji bullets). */
function RhBlueDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full bg-[color:var(--rh-border-red)] shadow-[0_0_10px_rgba(59,130,246,0.5)] ${className}`}
      aria-hidden
    />
  );
}

function RhMutedDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full bg-slate-500 ${className}`}
      aria-hidden
    />
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white">
      <HomeTradingBackground />
      <main id="home" className="flex flex-col">
        <HomeHero />
        <HomeSectionsClient />

        <section className="rh-wrap w-full px-5 py-14">
          <div>
            <h2 className="font-[Georgia,Times_New_Roman,Times,serif] text-xl font-bold tracking-tight text-white sm:text-2xl">
              A practical overview of crypto trading
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-400 sm:text-base">
              Cryptocurrency trading is the buying and selling of digital assets
              on exchanges to profit from price changes. Markets operate
              continuously; prices reflect supply, demand, liquidity, and news.
              Sustainable results depend on understanding charts, managing risk,
              and following a defined process rather than short-term speculation.
              RH Traders is designed to make that process clear, measurable, and
              repeatable for learners.
            </p>

            <h3 className="mt-10 font-[Georgia,Times_New_Roman,Times,serif] text-lg font-bold text-white sm:text-xl">
              Plans comparison
            </h3>
            <div className="rh-dark-data mt-4 overflow-hidden">
              <div className="overflow-x-auto">
                <table
                  className="rh-table rh-table-premium min-w-[520px] w-full text-left text-base"
                  aria-label="Plans comparison"
                >
                  <thead>
                    <tr className="text-white">
                      {["Feature", "Basic Plan", "Premium Plan"].map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="px-5 py-4 font-semibold tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="transition">
                      <td className="px-5 py-4 font-bold text-white">Price</td>
                      <td className="px-5 py-4 font-semibold text-zinc-200">
                        $20 / month
                      </td>
                      <td className="px-5 py-4 font-semibold text-zinc-200">
                        <span className="inline-flex flex-wrap items-center gap-2">
                          $140 (one-time)
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--rh-red)]/50 bg-[color:var(--rh-red)]/12 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                            <RhBlueDot className="h-1.5 w-1.5" />
                            Featured
                          </span>
                        </span>
                      </td>
                    </tr>
                    <tr className="transition">
                      <td className="px-5 py-4 font-bold text-white">
                        Course access
                      </td>
                      <td className="px-5 py-4 text-zinc-200">
                        <span className="inline-flex items-center gap-2">
                          <RhBlueTick />
                          Core beginner curriculum
                        </span>
                      </td>
                      <td className="px-5 py-4 text-zinc-200">
                        <span className="inline-flex items-center gap-2">
                          <RhBlueTick />
                          Full advanced curriculum
                        </span>
                      </td>
                    </tr>
                    <tr className="transition">
                      <td className="px-5 py-4 font-bold text-white">Signals</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-xs font-semibold text-slate-400">
                          <RhMutedDot className="h-1.5 w-1.5" />
                          Not included
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rh-red)]/55 bg-[color:var(--rh-red)]/12 px-3 py-1 text-xs font-semibold text-slate-300">
                          <RhBlueTick />
                          Included
                        </span>
                      </td>
                    </tr>
                    <tr className="transition">
                      <td className="px-5 py-4 font-bold text-white">
                        Live classes
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-xs font-semibold text-slate-400">
                          <RhMutedDot className="h-1.5 w-1.5" />
                          Not included
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rh-red)]/55 bg-[color:var(--rh-red)]/12 px-3 py-1 text-xs font-semibold text-slate-300">
                          <RhBlueTick />
                          Live examples &amp; mentorship
                        </span>
                      </td>
                    </tr>
                    <tr className="transition">
                      <td className="px-5 py-4 font-bold text-white">Support</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rh-red)]/55 bg-[color:var(--rh-red)]/12 px-3 py-1 text-xs font-semibold text-slate-300">
                          <RhBlueTick />
                          Standard
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rh-red)]/55 bg-[color:var(--rh-red)]/12 px-3 py-1 text-xs font-semibold text-slate-300">
                          <RhBlueTick />
                          Enhanced / mentorship
                        </span>
                      </td>
                    </tr>
                    <tr className="transition">
                      <td className="px-5 py-4 font-bold text-white">Duration</td>
                      <td className="px-5 py-4 text-zinc-200">
                        <span className="inline-flex items-center gap-2">
                          <RhBlueTick />
                          1 month (monthly plan)
                        </span>
                      </td>
                      <td className="px-5 py-4 text-zinc-200">
                        <span className="inline-flex items-center gap-2">
                          <RhBlueTick />
                          2–3 month mastery path
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="mt-10 font-[Georgia,Times_New_Roman,Times,serif] text-lg font-bold text-white sm:text-xl">
              Course content
            </h3>
            <div className="rh-dark-data mt-4 overflow-hidden">
              <div className="overflow-x-auto">
                <table
                  className="rh-table rh-table-premium min-w-[480px] w-full text-left text-base"
                  aria-label="Course content by module"
                >
                  <thead>
                    <tr className="text-white">
                      {["Module", "Description"].map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="px-5 py-4 font-semibold tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        [
                          "Crypto basics",
                          "Blockchain, wallets, exchanges, and how spot markets work.",
                        ],
                        [
                          "Candlesticks",
                          "Reading price action, timeframes, and basic chart structure.",
                        ],
                        [
                          "TA",
                          "Trend, support and resistance, volume, and core technical tools.",
                        ],
                        [
                          "Market psychology",
                          "Bias, discipline, and decision-making under uncertainty.",
                        ],
                        [
                          "Risk management",
                          "Stops, position sizing, and protecting capital while learning.",
                        ],
                      ] as const
                    ).map(([mod, desc]) => (
                      <tr key={mod} className="transition">
                        <td className="px-5 py-4 font-bold text-white">{mod}</td>
                        <td className="px-5 py-4 text-zinc-200">
                          <span className="flex items-start gap-3">
                            <RhBlueDot className="mt-1.5" />
                            <span>{desc}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Plan details match the{" "}
              <Link
                href="/plans"
                className="font-semibold text-[color:var(--rh-border-red)] underline-offset-2 opacity-90 hover:opacity-100 hover:text-sky-300 hover:underline"
              >
                Plans
              </Link>{" "}
              page; pricing and inclusions may be updated there.
            </p>
          </div>
        </section>

        <EnrollCountdownBanner />

        <section className="rh-wrap w-full px-5 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Features built for serious traders
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Signals, courses, and analysis—delivered with a premium,
                distraction-free experience.
              </p>
            </div>
            <Link
              href="/plans"
              className="rh-btn-secondary hidden rounded-full px-6 py-3 text-base font-extrabold sm:inline-flex"
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
                className="group rh-card relative overflow-hidden rounded-3xl p-6 transition duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_0_70px_rgba(56,189,248,0.10)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(520px_260px_at_30%_20%,rgba(56,189,248,0.09),transparent_62%)]" />
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-extrabold text-white">{c.title}</p>
                    <span className="h-10 w-10 rounded-2xl border border-sky-400/25 bg-slate-900/60 shadow-[0_0_30px_rgba(56,189,248,0.10)] transition group-hover:border-sky-400/45" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="signals" className="rh-wrap w-full px-5 py-14">
          <div className="rh-card rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Signals Table
                </h2>
                <p className="mt-2 text-slate-400">
                  Live-style signal layout with clear entries, targets, and stops.
                </p>
              </div>
              <Link
                href="/plans"
                className="rh-btn-primary inline-flex w-fit items-center justify-center rounded-full px-6 py-3 text-base font-extrabold text-white transition"
              >
                Unlock All Signals
              </Link>
            </div>

            <div className="rh-dark-data mt-6 overflow-hidden">
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
                            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--rh-red)] shadow-[0_0_10px_rgba(255,140,0,0.35)]" />
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
                                ? "border-sky-400/50 bg-blue-500/15 text-white"
                                : "border-slate-600 bg-slate-800/80 text-slate-200",
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
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                FAQ Preview
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Quick answers, clean layout, and a premium card experience.
              </p>
            </div>
            <Link
              href="/contact"
              className="rh-btn-secondary hidden rounded-full px-6 py-3 text-base font-extrabold sm:inline-flex"
            >
              Ask a Question
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                q: "How do RH Traders signals work?",
                d: "Clear entries, targets, and stops—designed for disciplined execution.",
                href: "/signals/how-signals-work",
                imageSrc: "/signals-cards/signals-live-trading.png",
                imageAlt: "Live trading chart with signal highlight and execution concept",
              },
              {
                q: "Crypto Trading for Beginners: Step-by-Step Learning Guide",
                d: "Start your crypto journey with a structured beginner-friendly approach. Learn trading basics, charts, risk management, and strategies step by step without confusion.",
                href: "/blog/crypto-trading-for-beginners",
                imageSrc: "/signals-cards/beginners.png",
                imageAlt: "Professional traders at workstations with market screens",
              },
              {
                q: "Crypto Markets Explained: BTC, ETH & Altcoins Trading Guide",
                d: "Understand how BTC leads cycles, why ETH behaves differently, and how to approach altcoins with smart risk and liquidity awareness.",
                href: "/signals/markets",
                imageSrc: "/signals-cards/markets.png",
                imageAlt: "Candlestick chart with market statistics",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="group rh-card overflow-hidden rounded-3xl transition hover:-translate-y-1"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center opacity-95 transition duration-300 group-hover:scale-[1.02]"
                    priority={false}
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg font-extrabold text-white">
                    {item.q}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {item.d}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[color:var(--rh-red)] transition hover:text-[color:var(--rh-red-hover)]"
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
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Learn & Blog
              </h2>
              <p className="mt-3 max-w-2xl text-slate-400">
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
                  <div className="absolute inset-0 bg-[radial-gradient(540px_280px_at_30%_20%,rgba(255,140,0,0.06),transparent_64%)]" />
                </div>
                <div className="relative">
                  <p className="text-lg font-extrabold text-white">
                    {a.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {a.desc}
                  </p>
                  <Link
                    href="/blog"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[color:var(--rh-red)] transition hover:text-[color:var(--rh-red-hover)]"
                  >
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rh-wrap w-full px-5 py-14">
          <div className="rounded-[2.5rem] border border-sky-400/25 bg-[linear-gradient(180deg,rgba(56,189,248,0.14),rgba(2,6,23,0.55))] p-6 shadow-[0_30px_90px_rgba(2,6,23,0.55)] backdrop-blur-sm sm:p-10">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative">
                <div className="relative mx-auto w-full max-w-[520px]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950/20 shadow-[0_0_70px_rgba(56,189,248,0.18)]">
                    <Image
                      src="/images/welcome/trainer-1.png"
                      alt="Raja Haseeb Nawaz — Founder of RH Traders"
                      fill
                      sizes="(max-width: 1024px) 100vw, 520px"
                      className="object-cover object-[50%_25%]"
                      priority={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#020617]/55 via-transparent to-transparent" />
                  </div>
                  <p className="mt-3 text-xs font-semibold tracking-wide text-slate-300">
                    Raja Haseeb Nawaz <span className="text-slate-400">· Founder, RH Traders</span>
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--rh-border-red)]">
                    Raja Haseeb Nawaz
                  </p>
                  <span
                    className="h-[2px] w-14 rounded-full bg-[color:var(--rh-border-red)]/70"
                    aria-hidden
                  />
                  <span
                    className="h-[2px] w-4 rounded-full bg-[color:var(--rh-border-red)]/35"
                    aria-hidden
                  />
                </div>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Message &amp; Our Mission
                </h2>

                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-200 sm:text-base">
                  As a trader, my focus is simple: build a process that you can execute under pressure.
                  RH Traders is designed to help you read structure, understand liquidity behavior, and
                  follow clear rules for entries, exits, and risk—so decisions stay consistent even when
                  markets move fast.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-3xl border border-sky-400/20 bg-slate-950/30 p-5 shadow-[0_0_40px_rgba(56,189,248,0.10)]">
                    <p className="text-sm font-extrabold text-white">Our Mission</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Provide structured trading education, practical execution models, and risk
                      standards that help traders improve consistency over time.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-sky-400/20 bg-slate-950/30 p-5 shadow-[0_0_40px_rgba(56,189,248,0.10)]">
                    <p className="text-sm font-extrabold text-white">Support System</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Our support system is available 24/7 to answer questions, remove confusion, and
                      keep you aligned with the learning path and execution rules.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href="/plans"
                    className="rh-btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-extrabold text-white transition"
                  >
                    Explore Plans
                  </Link>
                  <Link
                    href="/contact"
                    className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-extrabold"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="join" className="sr-only" />
      </main>
    </div>
  );
}
