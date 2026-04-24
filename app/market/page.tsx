import type { Metadata } from "next";
import { MarketEducation } from "./MarketEducation";

export const metadata: Metadata = {
  title: "Crypto Market Guide | RH Traders",
  description:
    "Beginner-friendly guide: how crypto trading works, major exchanges, trading styles, risks, and practical tips—plus in-depth market education.",
};

export default function MarketPage() {
  return (
    <main className="relative flex-1 px-5 py-14">
      {/* Coolors palette background (blue scale) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#03045e_0%,#023e8a_18%,#0077b6_36%,#0096c7_52%,#00b4d8_66%,#48cae4_78%,#90e0ef_88%,#ade8f4_94%,#caf0f8_100%)]" />
      {/* Dark vignette for readability + RH style continuity */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(2,6,23,0.55),rgba(2,6,23,0.92)_62%)]" />

      <div className="rh-wrap relative">
        <header className="mx-auto max-w-[900px] text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--rh-border-red)] sm:text-sm">
            Education hub
          </p>
          <h1 className="mt-4 text-balance font-[Georgia,Times_New_Roman,Times,serif] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Crypto market education for better execution
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-pretty text-base text-slate-200/90 sm:text-lg">
            Learn trading online with a practical breakdown of how crypto markets work, how orders become fills, and how
            disciplined risk management fits into a trading platform workflow.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-pretty text-sm leading-7 text-slate-400 sm:text-base">
            You’ll learn how orders turn into fills, how order books and spreads affect your entry,
            how common trading styles differ, and which rules protect you when volatility increases.
          </p>
        </header>

        <div className="mx-auto mt-14 max-w-[980px]">
          <MarketEducation />
        </div>
      </div>
    </main>
  );
}
