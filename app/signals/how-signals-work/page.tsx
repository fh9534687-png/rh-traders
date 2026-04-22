import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Signals Work | RH Traders",
  description:
    "Learn what a professional trading signal includes: entry, targets, stop loss, and execution discipline.",
};

export default function HowSignalsWorkPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <main className="rh-wrap px-5 py-14">
        <div className="w-full max-w-none">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-slate-900/70 px-4 py-2 text-xs font-semibold tracking-widest text-slate-400 shadow-[0_0_20px_rgba(37,99,235,0.12)]">
            SIGNALS
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Introduction to Trading Signals
          </h1>
          <p className="mt-4 max-w-[1100px] text-lg leading-9 text-slate-300">
            Trading signals are structured trade ideas that guide traders on when
            to enter a trade, where to exit, and how to manage risk. Instead of
            guessing market direction, signals provide a clear plan based on
            technical analysis, market structure, and experience.
          </p>

          <div className="mt-8 max-w-lg">
            <div className="rh-card overflow-hidden rounded-3xl transition hover:-translate-y-0.5">
              <div className="relative h-44 w-full">
                <Image
                  src="/signals-cards/signals-live-trading.png"
                  alt="Live trading interface with chart, signal point, and buy and sell controls"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 512px) 100vw, 512px"
                  priority
                />
              </div>
            </div>
          </div>

          <article className="mt-12 max-w-[1100px] space-y-12 text-[17px] leading-9 text-slate-200">
            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                How RH Traders signals are designed
              </h2>
              <p className="mt-4">
                At RH Traders, signals are designed to simplify decision-making.
                They are not random tips or guesses. Each signal is built using
                a combination of chart analysis, trend evaluation, support and
                resistance levels, and risk management rules.
              </p>
              <p className="mt-6">
                For beginners, signals act as a learning tool. For experienced
                traders, they save time and improve execution. The goal is not
                just to follow signals—it’s to understand the logic behind them.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                What a signal includes
              </h2>
              <p className="mt-4">
                A professional trading signal usually contains three main
                components:
              </p>
              <ul className="mt-5 list-disc pl-6 text-slate-300">
                <li className="mt-2">
                  <strong className="text-white">Entry</strong>: where the trade
                  is activated.
                </li>
                <li className="mt-2">
                  <strong className="text-white">Targets</strong>: where profits
                  are taken.
                </li>
                <li className="mt-2">
                  <strong className="text-white">Stop loss</strong>: where the
                  trade is invalidated (risk limit).
                </li>
              </ul>
              <p className="mt-6">
                These elements form the complete structure of a trade. Instead of
                vague ideas, each signal clearly defines these levels so you can
                execute with confidence.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Entry points explained
              </h2>
              <p className="mt-4">
                The entry point is one of the most critical parts of a signal. It
                is the price level where a trade is activated. Entering too early
                or too late can reduce the effectiveness of a trade.
              </p>
              <p className="mt-6">
                At RH Traders, entries are based on confirmed setups. This means
                the market must meet certain conditions before the trade is
                considered valid—such as price reaching a support/resistance
                zone, a breakout confirmation, or a trend continuation pattern.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Take-profit targets
              </h2>
              <p className="mt-4">
                Take-profit levels define where traders should exit in profit.
                Targets remove emotion and give a clear plan for closing trades.
              </p>
              <p className="mt-6">
                RH Traders often provides multiple targets. This lets traders
                secure partial profits at different levels—for example, closing
                50% at the first target and letting the rest run to capture a
                larger move.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Stop loss and risk control
              </h2>
              <p className="mt-4">
                Stop loss is the most important part of any signal. It protects
                your capital if the trade goes against you. Without a stop loss,
                one bad trade can cause significant damage.
              </p>
              <p className="mt-6">
                RH Traders places stop loss levels at logical points on the
                chart—usually below support for longs or above resistance for
                shorts. This prevents getting stopped out by normal market noise
                while still keeping risk controlled.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                How signals are generated
              </h2>
              <p className="mt-4">
                Signals at RH Traders are created through a structured analysis
                process:
              </p>
              <ul className="mt-5 list-disc pl-6 text-slate-300">
                <li className="mt-2">Identify the overall trend.</li>
                <li className="mt-2">Mark key support and resistance zones.</li>
                <li className="mt-2">Analyze volume and momentum.</li>
                <li className="mt-2">Confirm entry conditions.</li>
              </ul>
              <p className="mt-6">
                Only when conditions align is a signal shared. This approach
                increases the probability of success over time.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Discipline matters more than the signal
              </h2>
              <p className="mt-4">
                Signals are only effective if they’re followed with discipline.
                Many traders lose money not because the signal is “wrong,” but
                because they don’t execute the plan properly.
              </p>
              <ul className="mt-5 list-disc pl-6 text-slate-300">
                <li className="mt-2">Entering late</li>
                <li className="mt-2">Ignoring stop loss</li>
                <li className="mt-2">Taking profit too early</li>
                <li className="mt-2">Over-leveraging</li>
              </ul>
              <p className="mt-6">
                The signal provides direction. Discipline and risk management
                determine the outcome.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Final thoughts
              </h2>
              <p className="mt-4">
                RH Traders signals are designed to provide structured, clear, and
                disciplined trade setups. They remove guesswork and help you
                focus on execution.
              </p>
              <p className="mt-6">
                Before entering any trade, review the signal carefully and make
                sure you understand the setup. Over time, this process improves
                both your results and your skill.
              </p>
            </section>
          </article>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#faq"
              className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold transition"
            >
              Back to Home
            </Link>
            <Link
              href="/signals/beginners"
              className="rh-btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition"
            >
              Beginners guide →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

