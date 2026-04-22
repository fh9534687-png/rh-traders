import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

type Pillar = {
  slug: string;
  title: string;
  oneLine: string;
  definition: string;
  whyItMatters: string[];
  beginnerSteps: string[];
};

const PILLARS: Pillar[] = [
  {
    slug: "market-trend",
    title: "Market Trend",
    oneLine: "Bull vs bear direction",
    definition:
      "Market trend is the main direction price is moving. A bull trend is mostly up. A bear trend is mostly down.",
    whyItMatters: [
      "Trading with the trend is usually easier than fighting it.",
      "Trends help you choose better entries and avoid random trades.",
      "Trend gives you context: it explains why price keeps pushing or dropping.",
    ],
    beginnerSteps: [
      "Zoom out on the chart (higher timeframes).",
      "Ask: are highs and lows going up (bull) or down (bear)?",
      "Only take beginner trades in the direction of the bigger trend.",
    ],
  },
  {
    slug: "support-resistance",
    title: "Support & Resistance",
    oneLine: "Key price levels",
    definition:
      "Support and resistance are important price zones. Support is where price often stops falling. Resistance is where price often stops rising.",
    whyItMatters: [
      "They help you plan entries and exits instead of guessing.",
      "They explain common bounces and rejections.",
      "They help you set realistic targets and stop losses.",
    ],
    beginnerSteps: [
      "Mark the last 2–3 big highs and lows.",
      "Treat lines as zones, not perfect lines.",
      "Look for reactions: bounce at support, rejection at resistance.",
    ],
  },
  {
    slug: "volume",
    title: "Volume",
    oneLine: "Market strength",
    definition:
      "Volume is how much buying and selling is happening. Higher volume usually means stronger interest and more reliable moves.",
    whyItMatters: [
      "It helps you see if a breakout is strong or weak.",
      "It can confirm when a trend move has real support.",
      "Low volume moves can be traps, especially in smaller coins.",
    ],
    beginnerSteps: [
      "Compare volume on the breakout candle vs recent candles.",
      "Prefer moves that rise with volume and pull back with lower volume.",
      "Avoid chasing pumps when volume looks exhausted.",
    ],
  },
  {
    slug: "risk-management",
    title: "Risk Management",
    oneLine: "Control loss",
    definition:
      "Risk management is how you protect your money. It includes position sizing, stop losses, and rules so one mistake can’t wipe you out.",
    whyItMatters: [
      "It keeps you in the market long enough to learn.",
      "It reduces panic because you already know your maximum loss.",
      "It turns trading into a repeatable process, not gambling.",
    ],
    beginnerSteps: [
      "Risk small per trade (example: 1% or less).",
      "Use a stop loss before entering the trade.",
      "Write your plan: entry, target, stop.",
    ],
  },
];

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> | Metadata {
  return params.then(({ pillar }) => {
    const p = PILLARS.find((x) => x.slug === pillar);
    if (!p) return { title: "Pillar | RH Traders" };
    return {
      title: `${p.title} | RH Traders`,
      description: `${p.title} explained for beginners: ${p.oneLine}.`,
    };
  });
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar } = await params;
  const p = PILLARS.find((x) => x.slug === pillar);
  if (!p) notFound();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <main className="rh-wrap px-5 py-14">
        <div
          className={
            p.slug === "market-trend" ||
            p.slug === "support-resistance" ||
            p.slug === "volume" ||
            p.slug === "risk-management"
              ? "w-full max-w-none"
              : "rh-content"
          }
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-slate-900/70 px-4 py-2 text-xs font-semibold tracking-widest text-slate-400 shadow-[0_0_20px_rgba(37,99,235,0.12)]">
            PILLAR
          </p>
          <h1 className="mt-5">{p.title}</h1>
          <p className="text-lg leading-9 text-slate-400">{p.definition}</p>

          {p.slug === "market-trend" ? (
            <section className="mt-8 max-w-[1100px] text-slate-200">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Why this pillar matters
              </h2>
              <ul className="mt-4 list-disc pl-6 text-slate-300">
                {p.whyItMatters.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-white">
                Beginner steps
              </h2>
              <ol className="mt-4 list-decimal pl-6 text-slate-300">
                {p.beginnerSteps.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ol>
            </section>
          ) : p.slug === "support-resistance" ? (
            <section className="mt-8 max-w-[1100px] text-slate-200">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Why this pillar matters
              </h2>
              <ul className="mt-4 list-disc pl-6 text-slate-300">
                {p.whyItMatters.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-white">
                Beginner steps
              </h2>
              <ol className="mt-4 list-decimal pl-6 text-slate-300">
                {p.beginnerSteps.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ol>
            </section>
          ) : p.slug === "volume" ? (
            <section className="mt-8 max-w-[1100px] text-slate-200">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Why this pillar matters
              </h2>
              <ul className="mt-4 list-disc pl-6 text-slate-300">
                {p.whyItMatters.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-white">
                Beginner steps
              </h2>
              <ol className="mt-4 list-decimal pl-6 text-slate-300">
                {p.beginnerSteps.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ol>
            </section>
          ) : p.slug === "risk-management" ? (
            <section className="mt-8 max-w-[1100px] text-slate-200">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Why this pillar matters
              </h2>
              <ul className="mt-4 list-disc pl-6 text-slate-300">
                {p.whyItMatters.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-white">
                Beginner steps
              </h2>
              <ol className="mt-4 list-decimal pl-6 text-slate-300">
                {p.beginnerSteps.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ol>
            </section>
          ) : (
            <div className="rh-card mt-8 rounded-3xl p-6">
              <h2>Why this pillar matters</h2>
              <ul className="mt-4 list-disc pl-6 text-slate-400">
                {p.whyItMatters.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ul>

              <h2>Beginner steps</h2>
              <ol className="mt-4 list-decimal pl-6 text-slate-400">
                {p.beginnerSteps.map((x) => (
                  <li key={x} className="mt-2">
                    {x}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {p.slug === "market-trend" ? (
            <article className="mt-12 max-w-[1100px] space-y-12 text-[17px] leading-9 text-slate-200">
              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  What are market trends in crypto trading?
                </h2>
                <p className="mt-4">
                  Crypto market trends refer to the general direction in which a
                  market is moving over a period of time. Understanding trend is
                  one of the most important skills for any trader because it
                  helps you make better decisions about when to buy, sell, or
                  hold—and when to do nothing.
                </p>
                <p className="mt-6">
                  In simple words, a trend shows whether price is moving{" "}
                  <strong className="text-white">up</strong>,{" "}
                  <strong className="text-white">down</strong>, or{" "}
                  <strong className="text-white">sideways</strong>. Traders who
                  understand trends typically have a higher chance of success
                  than those who trade randomly without context.
                </p>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/market-trend-uptrend.svg"
                      alt="Uptrend: higher highs and higher lows"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                      priority
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Uptrend example: the swing structure steps higher.
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/market-trend-downtrend.svg"
                      alt="Downtrend: lower highs and lower lows"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Downtrend example: rallies fail and sell-offs extend.
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/market-trend-sideways.svg"
                      alt="Sideways: consolidation range"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Sideways example: price chops inside a range.
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Types of market trends
                </h2>
                <p className="mt-4">
                  There are three main trend states. The key is not memorizing
                  words like “bullish” or “bearish”—it’s learning what the
                  structure looks like on a chart and how you should behave in
                  each environment.
                </p>

                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  1) Uptrend (bullish market)
                </h3>
                <p className="mt-3">
                  An uptrend occurs when prices are consistently moving higher.
                  Buyers are stronger than sellers, and demand is increasing.
                  You can often identify an uptrend when price makes{" "}
                  <strong className="text-white">higher highs</strong> and{" "}
                  <strong className="text-white">higher lows</strong>.
                </p>
                <ul className="mt-4 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Pullbacks (drops) tend to be smaller and get bought quickly.
                  </li>
                  <li className="mt-2">
                    Breakouts above prior highs are more likely to follow
                    through.
                  </li>
                  <li className="mt-2">
                    “Bad news” often causes only a small dip before recovery.
                  </li>
                </ul>
                <p className="mt-4">
                  In an uptrend, beginners usually do best by looking for{" "}
                  <strong className="text-white">buying opportunities</strong>{" "}
                  on pullbacks instead of shorting every spike.
                </p>

                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  2) Downtrend (bearish market)
                </h3>
                <p className="mt-3">
                  A downtrend happens when prices fall continuously. Sellers
                  dominate the market and each rally gets sold. Signs include{" "}
                  <strong className="text-white">lower highs</strong> and{" "}
                  <strong className="text-white">lower lows</strong>.
                </p>
                <ul className="mt-4 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Rallies are sharp but short—then price rolls over again.
                  </li>
                  <li className="mt-2">
                    Support levels break more easily than they hold.
                  </li>
                  <li className="mt-2">
                    Many coins underperform BTC/ETH; “alts” bleed over time.
                  </li>
                </ul>
                <p className="mt-4">
                  In a downtrend, a simple beginner approach is to{" "}
                  <strong className="text-white">protect capital</strong>: trade
                  smaller, be selective, or stay in cash and study.
                </p>

                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  3) Sideways trend (consolidation)
                </h3>
                <p className="mt-3">
                  Sometimes the market doesn’t move clearly up or down. Instead,
                  it moves in a range—this is consolidation. In this phase price
                  often rotates between{" "}
                  <strong className="text-white">support</strong> and{" "}
                  <strong className="text-white">resistance</strong>, and
                  breakouts can happen anytime.
                </p>
                <ul className="mt-4 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Fake breakouts are common; patience matters.
                  </li>
                  <li className="mt-2">
                    Range highs/lows become the key decision zones.
                  </li>
                  <li className="mt-2">
                    Good traders wait for clarity instead of forcing trades.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Why trends matter (the real reasons)
                </h2>
                <p className="mt-4">
                  “Trend is your friend” is popular because it’s practical. A
                  trend gives you a{" "}
                  <strong className="text-white">probability advantage</strong>.
                  If the larger market is moving up, buying pullbacks tends to
                  work more often than selling them. If the larger market is
                  moving down, shorting rallies (or staying out) tends to hurt
                  less than buying every dip.
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    <strong className="text-white">Better timing</strong>: trend
                    helps you avoid entries in the wrong direction.
                  </li>
                  <li className="mt-2">
                    <strong className="text-white">Cleaner risk</strong>: stops
                    can be placed behind obvious swing points.
                  </li>
                  <li className="mt-2">
                    <strong className="text-white">Less emotion</strong>: you
                    stop chasing hype and start following a process.
                  </li>
                  <li className="mt-2">
                    <strong className="text-white">Fewer trades</strong>: you
                    filter out low-quality setups, which protects your account.
                  </li>
                </ul>
                <p className="mt-6">
                  Most beginners lose money because they ignore the trend and
                  trade randomly. Even a simple question before entering any
                  trade can save you:{" "}
                  <strong className="text-white">
                    Is the market going up, down, or sideways?
                  </strong>
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  How to identify market trends (step-by-step)
                </h2>
                <p className="mt-4">
                  There are many tools, but you don’t need complicated
                  indicators. The goal is to read the market in a consistent
                  way. Start with structure, then confirm with simple tools.
                </p>

                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  1) Zoom out (multi-timeframe)
                </h3>
                <p className="mt-3">
                  Beginners often get trapped because they only look at one
                  timeframe. A 5-minute chart can be “bullish” while the daily
                  chart is in a bigger downtrend. A simple framework:
                </p>
                <ul className="mt-4 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Use <strong className="text-white">daily</strong> to see the
                    big direction.
                  </li>
                  <li className="mt-2">
                    Use <strong className="text-white">4H / 1H</strong> for
                    entries and exits.
                  </li>
                  <li className="mt-2">
                    Ignore the noise if the higher timeframe is unclear.
                  </li>
                </ul>

                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  2) Trendlines (visual guide)
                </h3>
                <p className="mt-3">
                  Draw a line connecting lows in an uptrend or highs in a
                  downtrend. Trendlines are not magic—they are a{" "}
                  <strong className="text-white">visual tool</strong> to keep
                  your eyes disciplined. If price respects the line, trend is
                  healthy. If price breaks and fails to recover, trend may be
                  weakening.
                </p>

                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  3) Moving averages (simple filter)
                </h3>
                <p className="mt-3">
                  Moving averages smooth price data so you can see direction.
                  Two common ones:
                </p>
                <ul className="mt-4 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    <strong className="text-white">50 MA</strong> (short/medium
                    trend): price above often signals bullish conditions.
                  </li>
                  <li className="mt-2">
                    <strong className="text-white">200 MA</strong> (long trend):
                    institutions often watch it; above is generally healthier
                    than below.
                  </li>
                </ul>
                <p className="mt-4">
                  You don’t “buy because price touched the MA.” Instead use it
                  as a filter: if you only take longs when price is above the
                  200 MA, you avoid many bad trades in bear markets.
                </p>

                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  4) Price action (structure)
                </h3>
                <p className="mt-3">
                  The simplest rule of all:
                </p>
                <ul className="mt-4 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Higher highs + higher lows →{" "}
                    <strong className="text-white">uptrend</strong>
                  </li>
                  <li className="mt-2">
                    Lower highs + lower lows →{" "}
                    <strong className="text-white">downtrend</strong>
                  </li>
                  <li className="mt-2">
                    Repeating highs/lows in a band →{" "}
                    <strong className="text-white">sideways</strong>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Practical trading playbooks for each trend
                </h2>
                <p className="mt-4">
                  To turn knowledge into results, you need a repeatable
                  playbook. These are beginner-friendly ideas—not financial
                  advice—designed to keep you aligned with the trend.
                </p>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  Uptrend playbook
                </h3>
                <ul className="mt-4 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Wait for a pullback into support, then buy when price shows
                    strength again.
                  </li>
                  <li className="mt-2">
                    Use swing lows as your invalidation (stop area).
                  </li>
                  <li className="mt-2">
                    Take partial profits into prior highs; let a runner follow
                    the trend.
                  </li>
                </ul>

                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  Downtrend playbook
                </h3>
                <ul className="mt-4 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Prioritize capital protection: smaller size and fewer trades.
                  </li>
                  <li className="mt-2">
                    If you short, prefer rallies into resistance rather than
                    chasing breakdowns late.
                  </li>
                  <li className="mt-2">
                    Keep timeframes higher; downtrends can chop violently.
                  </li>
                </ul>

                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  Sideways playbook
                </h3>
                <ul className="mt-4 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Buy near range support and sell near range resistance (if
                    you have a clear range and risk plan).
                  </li>
                  <li className="mt-2">
                    Expect fakeouts—wait for confirmation before committing full
                    size.
                  </li>
                  <li className="mt-2">
                    If you’re unsure, stay out until a breakout holds.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Common beginner mistakes (and how to avoid them)
                </h2>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    <strong className="text-white">Trading against the trend</strong>{" "}
                    because a coin looks “cheap.” Cheap can get cheaper.
                  </li>
                  <li className="mt-2">
                    <strong className="text-white">Entering late</strong> after a
                    big move and placing a stop too tight, then getting shaken
                    out.
                  </li>
                  <li className="mt-2">
                    <strong className="text-white">Ignoring risk management</strong>{" "}
                    and letting one trade damage your account.
                  </li>
                  <li className="mt-2">
                    <strong className="text-white">Following hype (FOMO)</strong>{" "}
                    instead of waiting for pullbacks and structure.
                  </li>
                </ul>
                <div className="mt-8 border-l-4 border-sky-400/70 pl-5">
                  <p className="text-base font-extrabold text-white">Pro tip</p>
                  <p className="mt-2 text-slate-300">
                    <strong className="text-white">Trend is your friend.</strong>{" "}
                    Before every trade, ask: “Am I trading with the trend, or am
                    I fighting it?” If you’re fighting it, reduce size or wait.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Final thoughts
                </h2>
                <p className="mt-4">
                  Market trends are the foundation of successful crypto trading.
                  If you understand how the market is moving, you can make
                  smarter decisions and avoid unnecessary losses.
                </p>
                <p className="mt-6">
                  Before entering any trade, always ask yourself:
                </p>
                <p className="mt-4 text-2xl font-extrabold text-white">
                  “Is the market going up, down, or sideways?”
                </p>
                <p className="mt-4 text-slate-300">
                  This one question will immediately improve your discipline and
                  reduce random trades.
                </p>
              </section>
            </article>
          ) : p.slug === "support-resistance" ? (
            <article className="mt-12 max-w-[1100px] space-y-12 text-[17px] leading-9 text-slate-200">
              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  What is support and resistance in crypto trading?
                </h2>
                <p className="mt-4">
                  Support and resistance are key technical analysis levels where
                  buying interest (<strong className="text-white">support</strong>)
                  helps prevent price drops, and selling pressure (
                  <strong className="text-white">resistance</strong>) halts price
                  increases. Think of them as price{" "}
                  <strong className="text-white">floors</strong> and{" "}
                  <strong className="text-white">ceilings</strong>—psychological
                  zones where traders expect a bounce, a rejection, or a breakout.
                </p>
                <p className="mt-6">
                  These levels matter because they give you structure. Instead
                  of “guessing,” you can plan: where to enter, where you’re
                  wrong (stop-loss), and where to take profit.
                </p>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/support-resistance-basics.svg"
                      alt="Support and resistance zones on a price chart"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                      priority
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Support is where demand absorbs selling; resistance is where
                      supply absorbs buying.
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/support-resistance-role-reversal.svg"
                      alt="Role reversal: old resistance becomes new support after breakout and retest"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Role reversal: resistance breaks → becomes support on retest.
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/support-resistance-fakeout.svg"
                      alt="False breakout example: price breaks above resistance then fails and reverses"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Fakeouts: breaking a level doesn’t guarantee continuation.
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Understanding support (the floor)
                </h2>
                <p className="mt-4">
                  Support forms when price drops to a level where buyers believe
                  the asset is undervalued. As demand increases, price often
                  bounces.
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">Price repeatedly reacts near the same area.</li>
                  <li className="mt-2">Buying interest shows up after sell-offs.</li>
                  <li className="mt-2">Commonly found near previous swing lows.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Understanding resistance (the ceiling)
                </h2>
                <p className="mt-4">
                  Resistance forms when price rises into an area where sellers
                  step in. Traders take profit, short sellers enter, and price
                  often rejects.
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">Price gets rejected multiple times.</li>
                  <li className="mt-2">Selling pressure increases at prior highs.</li>
                  <li className="mt-2">The more touches, the more “visible” the level.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Role reversal: support becomes resistance (and vice versa)
                </h2>
                <p className="mt-4">
                  One of the most powerful concepts is{" "}
                  <strong className="text-white">role reversal</strong>. When a
                  resistance level breaks, it often turns into support later. The
                  same happens when support breaks—it can become resistance.
                </p>
                <p className="mt-6">
                  This happens because market psychology shifts. Traders who
                  missed the breakout want to buy on the retest; traders who
                  bought earlier defend their entry; trapped sellers may cover.
                </p>
                <p className="mt-6">
                  A simple way to trade it is: breakout first, then wait for the
                  retest. If the old resistance holds as support, you have a
                  cleaner invalidation point.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  How to identify support &amp; resistance (practical methods)
                </h2>
                <p className="mt-4">
                  You don’t need 20 indicators. Start with the obvious historical
                  levels and refine using confirmation.
                </p>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  1) Previous highs and lows
                </h3>
                <p className="mt-3">
                  Levels where major reversals happened before often remain
                  important. Higher timeframe levels (4H, daily) tend to be more
                  reliable than tiny levels on 5-minute charts.
                </p>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  2) Horizontal zones (not perfect lines)
                </h3>
                <p className="mt-3">
                  Treat support/resistance as a{" "}
                  <strong className="text-white">zone</strong>. Liquidity and
                  volatility mean price rarely respects an exact number.
                </p>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  3) Psychological round numbers
                </h3>
                <p className="mt-3">
                  Big round numbers (like 10k, 20k, 50k) attract attention, orders,
                  and headlines—so they often behave like key levels.
                </p>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  4) Moving averages as dynamic levels
                </h3>
                <p className="mt-3">
                  Common MAs like the 50 and 200 can behave like moving support or
                  resistance. They don’t replace structure—they add context.
                </p>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  5) Volume / high-activity areas
                </h3>
                <p className="mt-3">
                  Areas where lots of trading happened often become battlegrounds
                  later. Price may stall there, reverse, or break out with force.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Trading strategies using support &amp; resistance
                </h2>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  1) Bounce trading
                </h3>
                <p className="mt-3">
                  Traders buy near support and sell near resistance expecting the
                  level to hold. This works best in clear ranges and when you
                  can define risk tightly.
                </p>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  2) Breakout trading
                </h3>
                <p className="mt-3">
                  Traders enter when price breaks above resistance (or below
                  support) expecting continuation. The key is confirmation—many
                  breakouts fail quickly.
                </p>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  3) Retest strategy
                </h3>
                <p className="mt-3">
                  A safer approach is waiting for a breakout, then waiting for a
                  retest of the level to confirm the new support/resistance holds.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  False breakouts (fakeouts) and confirmation
                </h2>
                <p className="mt-4">
                  Not every breakout is real. Sometimes price briefly moves past
                  a level and then reverses hard—this is a{" "}
                  <strong className="text-white">false breakout</strong>. To
                  reduce fakeout entries:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Wait for a candle close beyond the level on the timeframe you
                    trade.
                  </li>
                  <li className="mt-2">
                    Look for volume expansion and follow-through.
                  </li>
                  <li className="mt-2">
                    Prefer breakouts aligned with the higher-timeframe trend.
                  </li>
                </ul>
                <p className="mt-6">
                  One of the most reliable filters is alignment: if the higher
                  timeframe trend is up, bullish breakouts tend to work better.
                  If the higher timeframe is down, many “breakouts” are just
                  short squeezes before the next drop.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Risk management (non‑negotiable)
                </h2>
                <p className="mt-4">
                  No support or resistance level is guaranteed. Always define
                  your risk with a stop-loss:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    For longs, place the stop just{" "}
                    <strong className="text-white">below support</strong>.
                  </li>
                  <li className="mt-2">
                    For shorts, place the stop just{" "}
                    <strong className="text-white">above resistance</strong>.
                  </li>
                  <li className="mt-2">
                    If your stop must be huge, your entry is probably too late.
                  </li>
                </ul>
                <div className="mt-8 border-l-4 border-sky-400/70 pl-5">
                  <p className="text-base font-extrabold text-white">
                    Before every trade
                  </p>
                  <p className="mt-2 text-slate-300">
                    Ask:{" "}
                    <strong className="text-white">
                      “Am I trading near support or resistance?”
                    </strong>{" "}
                    If you can’t answer clearly, you’re likely trading in the
                    middle of noise.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Final thoughts
                </h2>
                <p className="mt-4">
                  Support and resistance are the foundation of technical analysis.
                  Master them and you’ll trade with more structure, better
                  timing, and cleaner risk.
                </p>
              </section>
            </article>
          ) : p.slug === "volume" ? (
            <article className="mt-12 max-w-[1100px] space-y-12 text-[17px] leading-9 text-slate-200">
              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  What is volume in crypto trading?
                </h2>
                <p className="mt-4">
                  Volume is the total amount of a coin or token traded in a
                  specific time period. It is one of the clearest ways to judge
                  how much participation exists behind a price move.
                </p>
                <p className="mt-6">
                  In simple terms:{" "}
                  <strong className="text-white">
                    volume = how much buying and selling is happening
                  </strong>
                  . If price moves but volume is low, the move is often weak. If
                  price moves with high volume, the move is more likely to be
                  real and sustainable.
                </p>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/volume-basics.svg"
                      alt="Volume bars under a rising price chart"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                      priority
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Volume bars show activity and participation behind price.
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/volume-breakout-confirmation.svg"
                      alt="Breakout confirmation: price breaks resistance with a volume spike"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Strong breakouts usually come with a volume spike.
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/volume-divergence.svg"
                      alt="Volume divergence: price rises while volume falls"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Divergence can warn that momentum is weakening.
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Why volume is important
                </h2>
                <p className="mt-4">
                  Price alone can be misleading. Volume helps you understand the
                  strength behind a move. It answers questions like:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">Is this trend strong or weak?</li>
                  <li className="mt-2">Are buyers truly interested?</li>
                  <li className="mt-2">Is this breakout likely real or fake?</li>
                </ul>
                <p className="mt-6">
                  In crypto, where liquidity varies and hype can move price,
                  volume is a reality check. It shows whether the market is
                  actually participating or just drifting on thin trading.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Volume and market strength
                </h2>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  High volume
                </h3>
                <p className="mt-3">
                  High volume usually means stronger participation and stronger
                  conviction. If price breaks an important level with high
                  volume, it suggests many traders agreed with the move, which
                  increases the chances of follow-through.
                </p>
                <h3 className="mt-10 text-2xl font-extrabold text-white">
                  Low volume
                </h3>
                <p className="mt-3">
                  Low volume means weak interest. Moves can be fragile and
                  easily reversed. Low-volume breakouts are especially risky:
                  price may pop above a level, then fall back quickly (a fakeout).
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Volume and trends (confirmation logic)
                </h2>
                <p className="mt-4">
                  Volume often confirms whether a trend is healthy. A simple
                  beginner framework:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    <strong className="text-white">Uptrend</strong>: volume tends
                    to expand on pushes up and cool off on pullbacks.
                  </li>
                  <li className="mt-2">
                    <strong className="text-white">Downtrend</strong>: volume can
                    expand on sell-offs; low volume on drops can suggest sellers
                    are exhausting.
                  </li>
                </ul>
                <p className="mt-6">
                  This is not a perfect rule—crypto can be noisy—but it gives you
                  a consistent way to judge strength.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Volume in breakouts (real vs fake)
                </h2>
                <p className="mt-4">
                  Breakouts are where volume matters most. When price breaks
                  resistance:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    <strong className="text-white">High volume</strong> → more
                    likely valid breakout and continuation.
                  </li>
                  <li className="mt-2">
                    <strong className="text-white">Low volume</strong> → higher
                    chance of fake breakout and reversal.
                  </li>
                </ul>
                <p className="mt-6">
                  A practical rule: compare breakout volume to the last 20–30
                  candles. If it is not clearly stronger, be cautious.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Volume spikes (when “something important” happens)
                </h2>
                <p className="mt-4">
                  A sudden increase in volume is a{" "}
                  <strong className="text-white">volume spike</strong>. It often
                  appears around major levels, news events, liquidations, or big
                  orders. Spikes can signal:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">A breakout attempt with strong interest.</li>
                  <li className="mt-2">Panic selling or forced liquidations.</li>
                  <li className="mt-2">Large buyers/sellers stepping in.</li>
                </ul>
                <p className="mt-6">
                  The key is context: where did the spike happen, and did price
                  hold above/below the level afterward?
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  How to read volume on charts
                </h2>
                <p className="mt-4">
                  Volume is typically displayed as vertical bars at the bottom
                  of the chart. Bigger bars = more activity. Smaller bars = less.
                </p>
                <p className="mt-6">
                  Many platforms color volume bars green/red based on whether the
                  candle closed up or down. Don’t rely on color alone—focus on
                  whether volume is increasing or decreasing compared to recent
                  bars.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Volume + price action (the power combo)
                </h2>
                <p className="mt-4">
                  Volume becomes much more useful when combined with price action
                  and key levels:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">
                    Price up + volume up → strong bullish move ✅
                  </li>
                  <li className="mt-2">
                    Price up + volume down → weak move ⚠️
                  </li>
                  <li className="mt-2">
                    Price down + volume up → strong bearish move
                  </li>
                  <li className="mt-2">
                    Sideways + low volume → indecision / waiting
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Advanced concept: volume divergence
                </h2>
                <p className="mt-4">
                  Divergence happens when price and volume disagree. Example:
                  price keeps going up, but volume keeps decreasing. That can
                  indicate that buyers are getting weaker and the trend may be
                  running out of momentum.
                </p>
                <p className="mt-6">
                  Treat divergence as a warning, not a signal. Use it to tighten
                  risk, take partial profits, or wait for confirmation.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Common mistakes beginners make
                </h2>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">Ignoring volume completely.</li>
                  <li className="mt-2">Trading only price without confirmation.</li>
                  <li className="mt-2">Falling for fake breakouts repeatedly.</li>
                  <li className="mt-2">
                    Not checking volume on higher timeframes (4H / daily).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  A simple real strategy: breakout + volume confirmation
                </h2>
                <p className="mt-4">Use this beginner checklist:</p>
                <ol className="mt-5 list-decimal pl-6 text-slate-300">
                  <li className="mt-2">Mark a clear resistance level.</li>
                  <li className="mt-2">Wait for the breakout and candle close.</li>
                  <li className="mt-2">
                    Check volume: is it clearly higher than the recent average?
                  </li>
                  <li className="mt-2">
                    High volume → consider entry. Low volume → avoid or reduce
                    risk.
                  </li>
                </ol>
                <div className="mt-8 border-l-4 border-sky-400/70 pl-5">
                  <p className="text-base font-extrabold text-white">
                    Before every trade
                  </p>
                  <p className="mt-2 text-slate-300">
                    Ask:{" "}
                    <strong className="text-white">
                      “Is there strong volume behind this move?”
                    </strong>
                    . If the answer is no, be cautious—many weak moves reverse.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Final thoughts
                </h2>
                <p className="mt-4">
                  Volume is the backbone of technical analysis. It helps you
                  confirm moves, avoid fakeouts, and trade with better odds.
                </p>
                <p className="mt-6 text-2xl font-extrabold text-white">
                  Combine price + levels + volume.
                </p>
                <p className="mt-4 text-slate-300">
                  This simple habit will keep you out of many low-quality trades.
                </p>
              </section>
            </article>
          ) : p.slug === "risk-management" ? (
            <article className="mt-12 max-w-[1100px] space-y-12 text-[17px] leading-9 text-slate-200">
              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  What is risk management in crypto trading?
                </h2>
                <p className="mt-4">
                  Risk management is the process of protecting your capital while
                  trading. It is one of the most important parts of trading—and
                  one of the most ignored by beginners.
                </p>
                <p className="mt-6">
                  In simple terms, risk management means controlling how much you
                  can lose on a single trade so that one mistake does not destroy
                  your account. Many traders focus only on profit, but professional
                  traders focus first on{" "}
                  <strong className="text-white">staying in the game</strong>.
                </p>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/risk-stoploss.svg"
                      alt="Stop loss placement below support to define risk"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                      priority
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      A stop-loss defines your maximum loss before you enter.
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/risk-position-sizing.svg"
                      alt="Position sizing example using risk and stop distance"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Position sizing keeps your losses consistent.
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-3xl border-4 border-sky-400/60 bg-slate-950/30">
                    <Image
                      src="/pillars/risk-reward-ratio.svg"
                      alt="Risk-to-reward ratio example 1 to 3"
                      width={1400}
                      height={720}
                      className="h-auto w-full"
                    />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-slate-300">
                      Good R:R means you can be profitable even with some losses.
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Why risk management is important
                </h2>
                <p className="mt-4">
                  Crypto is volatile. Prices can move fast in both directions,
                  and without risk control, losses can happen quickly. Risk
                  management helps you:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">Protect your trading account.</li>
                  <li className="mt-2">Reduce emotional decisions.</li>
                  <li className="mt-2">Stay consistent over time.</li>
                  <li className="mt-2">Survive long enough to improve.</li>
                </ul>
                <p className="mt-6">
                  Most beginners lose not because they “don’t know charts,” but
                  because they risk too much, hold losers too long, or overtrade
                  after a loss. Risk management is your seatbelt.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  The 1%–2% rule (core principle)
                </h2>
                <p className="mt-4">
                  One of the most common professional rules is to risk only{" "}
                  <strong className="text-white">1% to 2%</strong> of your account
                  on a single trade.
                </p>
                <p className="mt-6">
                  Example: if your account is $1,000 then:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">1% risk = $10</li>
                  <li className="mt-2">2% risk = $20</li>
                </ul>
                <p className="mt-6">
                  This means even if you have multiple losing trades, your account
                  survives. You keep your confidence and you keep your capital.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Stop loss: your safety net
                </h2>
                <p className="mt-4">
                  A stop loss is a predefined level where your trade closes if
                  price goes against you. It prevents a small loss from turning
                  into a huge one.
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">It prevents large losses.</li>
                  <li className="mt-2">It removes emotional decision-making.</li>
                  <li className="mt-2">It keeps risk controlled and measurable.</li>
                </ul>
                <p className="mt-6">
                  The goal is not to avoid losses—losses are normal. The goal is
                  to make losses{" "}
                  <strong className="text-white">small and predictable</strong>.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Position sizing (how professionals control risk)
                </h2>
                <p className="mt-4">
                  Position sizing means deciding how much you will put into a
                  trade based on your risk and your stop-loss distance. This is
                  where most beginners get it wrong: they choose a random “size”
                  without calculating.
                </p>
                <p className="mt-6">
                  A simple formula:
                </p>
                <p className="mt-3 text-2xl font-extrabold text-white">
                  Position size = Account risk ÷ Stop distance
                </p>
                <p className="mt-6">
                  Example: account $1,000, risk 1% ($10). If your stop is 2% away,
                  your position size is roughly $10 ÷ 0.02 = $500. If your stop is
                  1% away, you can size smaller distance with $10 ÷ 0.01 = $1,000.
                </p>
                <p className="mt-6">
                  This is why stop placement and position sizing are connected.
                  You do not “move the stop” to fit your position. You adjust the
                  position to fit the stop.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Risk-to-reward ratio (R:R)
                </h2>
                <p className="mt-4">
                  Risk-to-reward compares how much you risk versus how much you
                  expect to gain.
                </p>
                <p className="mt-6">
                  Example: risk $10 to make $30 → that’s a{" "}
                  <strong className="text-white">1:3</strong> R:R.
                </p>
                <p className="mt-6">
                  With a good R:R, you can still be profitable even if you don’t
                  win every trade. For instance, if you take 10 trades and win 4
                  with a 1:3 average, you can be ahead even though you lost 6.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Avoid overtrading (protect your edge)
                </h2>
                <p className="mt-4">
                  Overtrading means taking too many trades without a clear setup.
                  It often happens because of greed, fear of missing out (FOMO),
                  or revenge trading after a loss.
                </p>
                <p className="mt-6">
                  A professional risk rule is to cap your activity. For example:
                  limit trades per day, or stop for the day after a maximum loss.
                  Less trading, higher quality.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Emotional control is part of risk management
                </h2>
                <p className="mt-4">
                  Trading is not just charts—it's psychology. Risk rules reduce
                  emotional pressure because you already know your maximum loss.
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">Closing winners too early out of fear.</li>
                  <li className="mt-2">Holding losers too long out of hope.</li>
                  <li className="mt-2">Doubling size after a loss to “get it back.”</li>
                </ul>
                <p className="mt-6">
                  Your job is to follow rules. Profits are a result of process,
                  not emotion.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Diversification (and the right balance)
                </h2>
                <p className="mt-4">
                  Diversification means not putting all your money into a single
                  coin, trade, or idea. Spreading risk can reduce the damage from
                  one bad move.
                </p>
                <p className="mt-6">
                  But too much diversification can also reduce focus. A balanced
                  approach: keep your risk per trade small, avoid correlated bets,
                  and don’t let one sector dominate your exposure.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Common risk management mistakes
                </h2>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">No stop-loss.</li>
                  <li className="mt-2">Risking too much on one trade.</li>
                  <li className="mt-2">Ignoring position sizing.</li>
                  <li className="mt-2">Chasing losses (revenge trading).</li>
                  <li className="mt-2">Trading without a plan.</li>
                </ul>
                <p className="mt-6">
                  Fixing these mistakes often improves results more than adding
                  new indicators.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Build a simple risk management plan
                </h2>
                <p className="mt-4">
                  Your plan should define rules before you trade:
                </p>
                <ul className="mt-5 list-disc pl-6 text-slate-300">
                  <li className="mt-2">Maximum risk per trade (1–2%).</li>
                  <li className="mt-2">Where stops go (based on structure).</li>
                  <li className="mt-2">Minimum R:R (example: 1:2 or better).</li>
                  <li className="mt-2">Max trades per day.</li>
                  <li className="mt-2">Daily max loss (when to stop trading).</li>
                </ul>
                <div className="mt-8 border-l-4 border-sky-400/70 pl-5">
                  <p className="text-base font-extrabold text-white">
                    Before entering any trade
                  </p>
                  <p className="mt-2 text-slate-300">
                    Ask:{" "}
                    <strong className="text-white">
                      “How much am I willing to lose on this trade?”
                    </strong>{" "}
                    If you can’t answer clearly, you’re not ready to enter.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Final thoughts
                </h2>
                <p className="mt-4">
                  Successful trading is not about winning every trade. It’s about
                  keeping losses small and staying consistent for the long term.
                  Protect your capital first—profits follow process.
                </p>
              </section>
            </article>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#home"
              className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold transition"
            >
              Back to Home
            </Link>
            <Link
              href="/coins"
              className="rh-btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition"
            >
              Explore Coins
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
