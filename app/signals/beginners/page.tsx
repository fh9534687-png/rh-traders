import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signals for Beginners | RH Traders",
  description:
    "How beginners can use trading signals as a learning tool with discipline and proper risk management.",
};

export default function SignalsBeginnersPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <main className="rh-wrap px-5 py-14">
        <div className="w-full max-w-none">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-slate-900/70 px-4 py-2 text-xs font-semibold tracking-widest text-slate-400 shadow-[0_0_20px_rgba(37,99,235,0.12)]">
            SIGNALS
          </p>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Is this suitable for beginners?
          </h1>
          <p className="mt-4 max-w-[1100px] text-lg leading-9 text-slate-300">
            Yes—if you treat signals as structured practice, not a shortcut. The
            best results come from disciplined execution and controlled risk.
          </p>

          <article className="mt-12 max-w-[1100px] space-y-12 text-[17px] leading-9 text-slate-200">
            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                How beginners should use signals
              </h2>
              <ul className="mt-5 list-disc pl-6 text-slate-300">
                <li className="mt-2">
                  Focus on learning the structure: entry, stop loss, targets.
                </li>
                <li className="mt-2">
                  Use small size and strict risk rules (1–2% per trade).
                </li>
                <li className="mt-2">
                  Practice on higher timeframes to avoid noise-driven mistakes.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Common beginner mistakes
              </h2>
              <ul className="mt-5 list-disc pl-6 text-slate-300">
                <li className="mt-2">Entering late because of FOMO.</li>
                <li className="mt-2">Moving stops or removing them entirely.</li>
                <li className="mt-2">Over-leveraging to “get rich quickly.”</li>
                <li className="mt-2">Taking random trades outside the plan.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                The learning approach (best long-term)
              </h2>
              <p className="mt-4">
                Don’t just copy. Study why the signal exists:
              </p>
              <ul className="mt-5 list-disc pl-6 text-slate-300">
                <li className="mt-2">What trend is the market in?</li>
                <li className="mt-2">Which level is the entry based on?</li>
                <li className="mt-2">Why is the stop placed there?</li>
                <li className="mt-2">What makes the targets logical?</li>
              </ul>
              <div className="mt-8 border-l-4 border-sky-400/70 pl-5">
                <p className="text-base font-extrabold text-white">
                  Quick rule
                </p>
                <p className="mt-2 text-slate-300">
                  If you can’t explain the signal in one sentence, reduce size or
                  skip—learn first, then scale.
                </p>
              </div>
            </section>
          </article>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signals/how-signals-work"
              className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold transition"
            >
              ← How signals work
            </Link>
            <Link
              href="/signals/markets"
              className="rh-btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition"
            >
              Markets we cover →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

