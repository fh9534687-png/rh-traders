import type { Metadata } from "next";
import Link from "next/link";
import { LivePricesTable } from "../components/LivePricesTable";

export const metadata: Metadata = {
  title: "Coins Guide | RH Traders",
  description:
    "A plain-English tour of popular cryptocurrencies: what they do, how they differ, where risk shows up, and how to learn without the hype.",
};

export default function CoinsPage() {
  return (
    <main className="relative flex-1 px-5 py-14 text-white">
      {/* Coolors palette background (matches Market/Charts) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#03045e_0%,#023e8a_18%,#0077b6_36%,#0096c7_52%,#00b4d8_66%,#48cae4_78%,#90e0ef_88%,#ade8f4_94%,#caf0f8_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(2,6,23,0.55),rgba(2,6,23,0.92)_62%)]" />

      <div className="rh-wrap relative">
        <div className="rh-content">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-slate-900/70 px-4 py-2 text-xs font-semibold tracking-widest text-slate-400 shadow-[0_0_20px_rgba(37,99,235,0.12)]">
            COINS GUIDE
          </p>
          <h1 className="mt-5 text-balance font-[Georgia,Times_New_Roman,Times,serif] text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Coins &amp; categories (practical guide)
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-slate-200/90">
            This page explains common coin categories and what typically matters from a trading
            perspective: liquidity, volatility, use case, and the risks that show up in execution.
          </p>
          <p className="text-pretty text-lg leading-8 text-slate-200/90">
            Use it as a reference. You do not need to memorize tickers—focus on understanding how
            majors, altcoins, memes, and stablecoins behave under stress and during trend moves.
          </p>
        </div>

        {/* Moved from Home → Coins page (no duplicates) */}
        <section className="mt-12">
          <div className="rh-content">
            <h2>Types of crypto coins (without the hype labels)</h2>
            <p>
              Not every asset trades the same. Deep, liquid majors often behave differently from
              thin books and long-tail tokens, especially around volatility.
            </p>
            <p>
              Knowing the category helps you set realistic expectations for spread, slippage,
              and risk controls.
            </p>
          </div>

          <div className="rh-dark-data mt-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="rh-table rh-table-premium min-w-full text-left text-base">
                <thead>
                  <tr className="text-white">
                    {["Coin Name", "Symbol", "Category", "Use Case", "Risk Level"].map(
                      (h) => (
                        <th key={h} className="px-5 py-4 font-semibold tracking-wide">
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
                    <tr key={r.sym} className="transition">
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
            <div className="rh-card rounded-3xl bg-slate-900/40 p-6 sm:p-10">
              <div className="rh-content">
                <h2>Which Coins Should Beginners Start With?</h2>
                <p>
                  Beginners should usually start with <strong>BTC</strong> and{" "}
                  <strong>ETH</strong>.
                </p>
                <p>
                  These are the most popular coins with high liquidity. That means
                  it is easier to buy and sell without huge price jumps.
                </p>
                <p>
                  Meme coins can move fast, but they can drop fast too. Focus on
                  stability and learning first, then explore riskier coins later.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rh-dark-data overflow-hidden">
                <div className="border-b border-slate-700/50 bg-[#0f172a] px-5 py-4">
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
                        <tr key={r.coin} className="transition">
                          <td className="px-5 py-4 font-bold text-white">{r.coin}</td>
                          <td className="px-5 py-4 text-zinc-200">{r.reason}</td>
                          <td className="px-5 py-4 text-zinc-200">{r.risk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rh-dark-data overflow-hidden">
                <div className="border-b border-slate-700/50 bg-[#0f172a] px-5 py-4">
                  <h3 className="text-base font-bold text-white">
                    Advanced and High-Risk Coins
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="rh-table rh-table-premium min-w-full text-left text-base">
                    <thead>
                      <tr>
                        {["Coin", "Category", "Risk Level", "Potential"].map((h) => (
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
                        <tr key={r.coin} className="transition">
                          <td className="px-5 py-4 font-bold text-white">{r.coin}</td>
                          <td className="px-5 py-4 text-zinc-200">{r.category}</td>
                          <td className="px-5 py-4 text-zinc-200">{r.risk}</td>
                          <td className="px-5 py-4 text-zinc-200">{r.potential}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Live Crypto Prices
              </h2>
              <p className="mt-3 max-w-3xl text-slate-400">
                Live prices with 24h change and market cap. Colors update green/red
                as the price moves.
              </p>
            </div>
            <Link
              href="/plans"
              className="rh-btn-secondary hidden rounded-full px-6 py-3 text-base font-extrabold sm:inline-flex"
            >
              Enroll now
            </Link>
          </div>

          <div className="mt-8">
            <LivePricesTable />
          </div>
        </section>

        <div className="rh-content mt-10">
          <h2>1) So what is a “coin” here, anyway?</h2>
          <p>
            Think of a crypto coin (people also say “token”) as a balance entry
            on a shared digital ledger—a blockchain. Lots of computers hold
            copies of that ledger, so when you send value, it’s recorded in a way
            strangers can verify without you calling a bank.
          </p>
          <p>
            Same word, different jobs in the wild: some act like spendable money,
            some fuel apps and smart contracts, some exist mostly because a
            community thought it was funny or interesting, and some are built
            to hug a dollar so traders can park value without riding every wiggle.
          </p>

          <h2>2) Why is one coin $60k and another fractions of a penny?</h2>
          <p>
            Still supply and demand, just louder. If buyers stack up and sellers
            thin out, price walks up; if everyone heads for the exit at once, it
            drops. Layer on news, TikTok momentum, fear, greed, and the
            occasional huge wallet moving size, and you get the volatility people
            love to complain about.
          </p>

          <h2>3) Four buckets worth knowing (seriously)</h2>
          <h3>Major coins</h3>
          <p>
            The heavyweights everyone’s heard of—tons of liquidity, deep charts,
            endless tutorials. Bitcoin and Ethereum are the usual starting points
            because there’s actually something to read and a market that doesn’t
            evaporate when you blink.
          </p>
          <h3>Altcoins</h3>
          <p>
            Everything that isn’t Bitcoin used to get dumped in the “alt” pile.
            Many are experiments: faster chains, different tradeoffs, niche use
            cases. They can rip higher in a hype cycle; they can also give it
            back just as fast. Solana and XRP are examples people argue about at
            dinner—do your own homework on each.
          </p>
          <h3>Meme coins</h3>
          <p>
            Narrative and community first, fundamentals… sometimes later.
            Dogecoin is the classic example—started as a joke, became a cultural
            object. Fun to watch; painful if you’re the last one in. Treat them
            like fireworks, not a retirement plan.
          </p>
          <h3>Stablecoins</h3>
          <p>
            Designed to sit near a buck (or another peg) so you can move value
            or sit out volatility without cashing all the way out to your bank.
            USDT is everywhere; still read up on how any stablecoin holds its peg—
            boring, but it matters.
          </p>

          <h2>4) A quick tour of the names you’ll keep hearing</h2>
          <h3>Bitcoin (BTC): the one people mean when they say “crypto”</h3>
          <p>
            Bitcoin was first out the gate and still carries the most name
            recognition. Some folks treat it like digital gold; others just use
            it as the benchmark everything else gets compared to. Either way,
            if someone says “I’m learning crypto,” they usually bump into BTC
            within a week.
          </p>
          <p>
            <strong>Simple way to think about it:</strong> It’s the biggest stage
            in the room—not always the flashiest act, but the one the crowd is
            watching when something important happens.
          </p>
          <p>
            <strong>Risk:</strong> It’s still volatile next to your savings
            account. Next to a thin meme coin, though, it often behaves like the
            grown-up in the conversation.
          </p>

          <h3>Ethereum (ETH): where a lot of the apps live</h3>
          <p>
            Ethereum isn’t just “another coin”—it’s a network where developers
            deploy smart contracts (tiny programs that run on-chain). That’s why
            NFTs, DeFi weirdness, and a pile of other experiments often tie
            back to ETH somewhere in the story.
          </p>
          <p>
            <strong>Simple way to think about it:</strong> If Bitcoin is the
            headline band, Ethereum is part concert venue, part toolkit for
            everyone trying to build on top.
          </p>
          <p>
            <strong>Risk:</strong> Still swings hard, and the app landscape
            changes fast. Worth understanding if you care about anything beyond
            “number go up.”
          </p>

          <h3>Solana (SOL): built for speed (and hot debates)</h3>
          <p>
            Solana gets attention because transactions can feel snappy and fees
            are often tiny next to some older chains—so builders and degens both
            flock there. That doesn’t make it “the winner forever”; it makes it
            worth understanding what tradeoffs the design chose.
          </p>
          <p>
            <strong>Simple way to think about it:</strong> A busy express lane
            where a lot of apps try to run—exciting when it’s humming, messy when
            something breaks.
          </p>
          <p>
            <strong>Risk:</strong> Alts can reprice violently. SOL is no
            exception—great for learning how fast your emotions can move with the
            chart.
          </p>

          <h3>XRP (XRP): payments narrative, loud community</h3>
          <p>
            People talk about XRP around cross-border payments and banking
            partnerships; traders also love it because it can sprint on headlines.
            Whatever story you buy into, treat the tape as the tiebreaker.
          </p>
          <p>
            <strong>Risk:</strong> Still an alt: regulatory news, sentiment
            swings, and plain old volatility can all show up in the same afternoon.
          </p>

          <h3>Dogecoin (DOGE): the meme that refused to leave</h3>
          <p>
            Started as a joke, ended up on everyone’s radar—classic example of
            narrative + attention = price action. That can be entertaining to
            watch and brutal to trade if you’re late.
          </p>
          <p>
            <strong>Honest heads-up:</strong> If your entry is “green candles on
            Twitter,” you’re volunteering to be someone else’s exit liquidity.
            Memes are a mood, not a business plan.
          </p>

          <h3>Tether (USDT): the dollar-ish parking spot</h3>
          <p>
            Traders use USDT to hop between positions or sit out a storm without
            fully off-ramping. It’s meant to hug about a dollar—useful, but not the
            same as FDIC peace of mind.
          </p>
          <p>
            <strong>Risk:</strong> Stable doesn’t mean “risk-free.” Read how the
            issuer backs the peg, what could break in a crisis, and why serious
            traders still ask uncomfortable questions here.
          </p>

          <h2>5) Rules we’d give a friend who just texted us “should I buy?”</h2>
          <h3>1) Learn on the big, boring coins first</h3>
          <p>
            BTC and ETH aren’t exciting answers at a party, but they’re where
            the liquidity and educational material actually are. Confusion goes
            down when you’re not fighting a chart that invents new colors every
            hour.
          </p>
          <h3>2) Don’t let memes be your first teacher</h3>
          <p>
            Hype buys feel good for ten minutes; they’re a lousy way to learn
            trend, levels, or how to size a loss. Get the boring reps in first.
          </p>
          <h3>3) Only use money you could literally set on fire</h3>
          <p>
            Not saying you should—but if losing it would wreck your month, you’ll
            trade like someone with their hair on fire. Small size keeps your
            brain online.
          </p>
          <h3>4) If you can’t write the trade, don’t take it</h3>
          <p>
            Entry, target, invalidation (stop). One sticky note. If you can’t
            fill that out, you’re not investing your genius—you’re clicking.
          </p>

          <h2>6) Tiny glossary so the Discord doesn’t sound like alien radio</h2>
          <p>
            <strong>Market cap:</strong> Rough “how big is this thing” (price ×
            circulating supply)—imperfect, but handy.
            <br />
            <strong>Volatility:</strong> How wild the ride is; calm seas vs.
            whitewater.
            <br />
            <strong>Liquidity:</strong> Can you get in and out without moving the
            price against yourself?
            <br />
            <strong>Trend:</strong> The bias of the chart—up, down, or sideways
            purgatory.
            <br />
            <strong>Support/Resistance:</strong> Zones where price has made
            memories before; sometimes it respects them, sometimes not.
          </p>

          <h2>7) Where to go from here</h2>
          <p>
            Coins are the cast; risk management and reading the chart are the
            script. Head back to the home page pillars—trend, support and
            resistance, volume, risk—and get those under your belt. That’s what
            keeps you in the game after the novelty wears off.
          </p>
          <p>
            Explore more tokens when you want, but keep the boring stuff: learn
            first, keep size humble, and show up consistently. The market rewards
            patience weirdly often—it just doesn’t advertise that part.
          </p>
        </div>

        <div className="rh-card mt-10 rounded-3xl p-6">
          <div className="rh-content">
            <h2>Quick tables: same coins, faster scan</h2>
            <p>
              Snapshot view if you’re the “just give me the grid” type. We can
              always go deeper on individual names if you want a follow-up page
              later.
            </p>
          </div>

          <div className="rh-dark-data mt-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="rh-table rh-table-premium min-w-full text-left text-base">
                <thead>
                  <tr className="text-white">
                    {["Coin", "Category", "What it’s known for", "Beginner level"].map(
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
                      category: "Major",
                      known: "Most trusted",
                      level: "Best start",
                    },
                    {
                      coin: "ETH",
                      category: "Major",
                      known: "Smart contracts",
                      level: "Great start",
                    },
                    {
                      coin: "SOL",
                      category: "Altcoin",
                      known: "Fast apps",
                      level: "After basics",
                    },
                    {
                      coin: "XRP",
                      category: "Altcoin",
                      known: "Payments",
                      level: "After basics",
                    },
                    {
                      coin: "DOGE",
                      category: "Meme",
                      known: "Hype moves",
                      level: "Advanced only",
                    },
                    {
                      coin: "USDT",
                      category: "Stable",
                      known: "Price stability",
                      level: "For trading",
                    },
                  ].map((r) => (
                    <tr
                      key={r.coin}
                      className="transition"
                    >
                      <td className="px-5 py-4 font-bold text-white">
                        {r.coin}
                      </td>
                      <td className="px-5 py-4 text-zinc-200">{r.category}</td>
                      <td className="px-5 py-4 text-zinc-200">{r.known}</td>
                      <td className="px-5 py-4 text-zinc-200">{r.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rh-content">
            <p className="mt-8 text-sm leading-7 text-slate-500">
              Note: This is educational content, not financial advice. Always do
              your own research and manage risk.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
