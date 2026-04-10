import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coins Guide | RH Traders",
  description:
    "Beginner-friendly guide to popular crypto coins: what they are, why they matter, risks, and how to learn safely.",
};

export default function CoinsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="rh-wrap px-5 py-14">
        <div className="rh-content">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90">
            COINS GUIDE
          </p>
          <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            Popular Crypto Coins Explained (Beginner Friendly)
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-zinc-200/90">
            This page is written like a simple school lesson. If you are new to
            crypto, read it slowly.
          </p>
          <p className="text-pretty text-lg leading-8 text-zinc-200/90">
            You don’t need to memorize everything. The goal is to understand the
            big ideas, the risks, and the words people use.
          </p>
        </div>

        <div className="rh-content mt-10">
          <h2>1) What is a crypto coin?</h2>
          <p>
            A crypto coin (or token) is a digital unit of value that lives on a
            blockchain. A blockchain is like a public record book that many
            computers share. When you send coins, the blockchain records the
            transfer so everyone can verify it.
          </p>
          <p>
            Some coins are used like money. Some coins power apps. Some coins
            are created mainly for fun or community. And some coins try to stay
            stable, so people can trade without the price changing too much.
          </p>

          <h2>2) Why do coins have different prices?</h2>
          <p>
            The price changes because of supply and demand. If many people want
            to buy a coin, the price often rises. If many people want to sell,
            the price often falls. News, hype, fear, and big investors can
            change demand very quickly.
          </p>

          <h2>3) The 4 simple categories you must know</h2>
          <h3>Major coins</h3>
          <p>
            Major coins are the biggest and most widely known. They usually have
            the most trading volume and the most learning content. Examples are
            Bitcoin (BTC) and Ethereum (ETH).
          </p>
          <h3>Altcoins</h3>
          <p>
            Altcoins are “alternative coins.” Many altcoins try to improve speed
            or add features. They can grow fast, but they can also drop fast.
            Examples include Solana (SOL) and XRP (XRP).
          </p>
          <h3>Meme coins</h3>
          <p>
            Meme coins are driven mostly by community and hype. They can pump
            hard, but they can crash hard too. Dogecoin (DOGE) is a famous
            example. Beginners should be careful with meme coins.
          </p>
          <h3>Stablecoins</h3>
          <p>
            Stablecoins try to keep a steady price, usually close to 1 US dollar.
            People use them to move money and to avoid price swings. Tether
            (USDT) is a common stablecoin.
          </p>

          <h2>4) Popular coins explained</h2>
          <h3>Bitcoin (BTC): the “digital gold” idea</h3>
          <p>
            Bitcoin was the first big cryptocurrency. Many people treat it like
            a long-term store of value. When beginners ask “Where do I start?”
            BTC is often the first coin people learn.
          </p>
          <p>
            <strong>Simple way to think about it:</strong> BTC is like the
            biggest, most recognized coin in crypto. It is not perfect, but it
            is the one most people trust and watch.
          </p>
          <p>
            <strong>Risk:</strong> BTC still moves up and down a lot compared to
            normal money. But compared to small meme coins, it is often more
            stable.
          </p>

          <h3>Ethereum (ETH): the “apps on blockchain” idea</h3>
          <p>
            Ethereum is a platform where developers can build smart contracts.
            A smart contract is like a small program on the blockchain. This is
            why ETH is important in many crypto projects.
          </p>
          <p>
            <strong>Simple way to think about it:</strong> ETH is like a big
            operating system for crypto apps.
          </p>
          <p>
            <strong>Risk:</strong> ETH can be volatile. Also, the world of apps
            can change quickly. Still, ETH is one of the main coins people study.
          </p>

          <h3>Solana (SOL): fast and popular for apps</h3>
          <p>
            Solana is known for speed and low fees in many cases. Many projects
            and communities like building on it because it feels quick.
          </p>
          <p>
            <strong>Simple way to think about it:</strong> SOL is like a fast
            highway where many crypto apps try to run smoothly.
          </p>
          <p>
            <strong>Risk:</strong> Altcoins can be more risky than majors. SOL
            can move fast in both directions.
          </p>

          <h3>XRP (XRP): focused on payments</h3>
          <p>
            XRP is often discussed as a coin for fast payments and transfers.
            Many traders watch it because it has strong community interest and
            can move quickly during big news.
          </p>
          <p>
            <strong>Risk:</strong> XRP is an altcoin with high volatility. It
            can pump on news and it can dump on fear.
          </p>

          <h3>Dogecoin (DOGE): meme coin with real popularity</h3>
          <p>
            DOGE started as a joke, but it became very popular. It shows that
            community attention can move prices a lot.
          </p>
          <p>
            <strong>Beginner warning:</strong> Meme coins can be exciting, but
            they can also be a trap. Many beginners buy after a big pump and
            then panic sell after a dump.
          </p>

          <h3>Tether (USDT): the stablecoin people use to trade</h3>
          <p>
            USDT tries to stay close to $1. People use it to move money between
            exchanges, and to “park” value during volatile times.
          </p>
          <p>
            <strong>Risk:</strong> Stablecoins have different kinds of risks than
            normal coins. The price might be stable, but you should still learn
            about the company, reserves, and how it works.
          </p>

          <h2>5) Beginner rules (simple and safe)</h2>
          <h3>Rule 1: Start with learning coins first</h3>
          <p>
            If you are new, start with BTC and ETH. These have the most guides,
            the most examples, and the most liquidity. When you learn with major
            coins, you reduce confusion.
          </p>
          <h3>Rule 2: Avoid meme coins early</h3>
          <p>
            Meme coins can teach bad habits, because hype becomes the reason for
            buying. In the beginning, you want to learn structure, trend, and
            risk management—not just excitement.
          </p>
          <h3>Rule 3: Never risk money you can’t lose</h3>
          <p>
            Crypto is volatile. If you trade with rent money, you will panic.
            Learning needs calm thinking. Use small amounts first.
          </p>
          <h3>Rule 4: Write down your plan</h3>
          <p>
            A simple plan answers: entry, target, and stop loss. If you can’t
            write it, it is not a plan.
          </p>

          <h2>6) A simple glossary (easy words)</h2>
          <p>
            <strong>Market cap:</strong> A rough size measure (price × supply).
            <br />
            <strong>Volatility:</strong> How fast and how far price moves.
            <br />
            <strong>Liquidity:</strong> How easily you can buy/sell without big
            price changes.
            <br />
            <strong>Trend:</strong> The general direction (up or down).
            <br />
            <strong>Support/Resistance:</strong> Important price zones.
          </p>

          <h2>7) Next step</h2>
          <p>
            Now that you understand the basic coin types, go back to the home
            page and study the core pillars: trend, support/resistance, volume,
            and risk management. Those skills matter more than any single coin.
          </p>
          <p>
            When you are ready, you can explore more coins. But always keep the
            beginner rules: learn first, risk small, and stay consistent.
          </p>
        </div>

        <div className="rh-card mt-10 rounded-3xl p-6">
          <div className="rh-content">
            <h2>Quick Tables: Popular Coins</h2>
            <p>
            These tables are a simple overview. If you want deep details for
            every coin, we can expand this page with more sections.
            </p>
          </div>

          <div className="rh-card mt-8 overflow-hidden rounded-2xl">
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
            <p className="mt-8 text-sm leading-7 text-zinc-400">
              Note: This is educational content, not financial advice. Always do
              your own research and manage risk.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-5 py-10 text-center text-sm text-zinc-400">
          © 2026 RH Traders. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

