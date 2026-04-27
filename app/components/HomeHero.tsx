"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./motion/Reveal";

const miniCards = [
  {
    label: "Courses",
    sub: "Structured paths",
    icon: "▶",
    shellClass:
      "border border-sky-400/40 bg-slate-900/80 shadow-[0_0_20px_rgba(37,99,235,0.2)]",
    iconClass: "text-[color:var(--rh-skyblue)]",
  },
  {
    label: "Signals",
    sub: "Clear setups",
    icon: "◆",
    shellClass:
      "border border-sky-400/35 bg-slate-900/60 shadow-[0_0_16px_rgba(56,189,248,0.12)]",
    iconClass: "text-[color:var(--rh-accent-bright)]",
  },
  {
    label: "Updates",
    sub: "Market notes",
    icon: "↻",
    shellClass:
      "border border-sky-400/40 bg-slate-950/90 shadow-[0_0_24px_rgba(37,99,235,0.18)]",
    iconClass: "text-[color:var(--rh-skyblue)]",
  },
] as const;

const cryptoTradingFocus = [
  "Read candlestick charts, choose timeframes, and interpret structure, trend, support and resistance, and volume together.",
  "Build trade plans with explicit entry, profit targets, and stop loss (invalidation) before risking capital.",
  "Apply position sizing and per-trade risk limits so outcomes are controlled while you are still learning.",
  "Interpret signal notes field by field and cross-check each idea on your own chart before acting.",
  "Understand 24/7 spot markets for digital assets: liquidity, spreads, fees, and how news flows into price.",
] as const;

export function HomeHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#070b14] text-slate-100"
      aria-labelledby="hero-heading"
    >
      {/* TradeNation-like clean hero background (subtle stripes + vignette + soft glow). */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 20% 10%, rgba(255,106,0,0.18), transparent 60%), radial-gradient(850px 520px at 80% 20%, rgba(135,206,235,0.14), transparent 60%), linear-gradient(180deg, rgba(7,11,20,0.0) 0%, rgba(7,11,20,0.65) 55%, rgba(7,11,20,1) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, transparent 1px, transparent 14px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(0,0,0,0.05), rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.75) 100%)",
        }}
        aria-hidden
      />

      <div className="relative rh-wrap px-5 pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-16 lg:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Text column (keep existing content/buttons) */}
          <div className="order-1">
            <Reveal>
              <h1
                id="hero-heading"
                className="text-balance font-[Georgia,Times_New_Roman,Times,serif] text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-2xl lg:text-3xl xl:text-[2.05rem]"
              >
                RH Traders is a{" "}
                <span className="text-[color:var(--rh-skyblue)]">
                  crypto trading course
                </span>{" "}
                with dashboards and signals built for consistent execution.
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-200 sm:text-lg">
                If you want to learn trading online with a clear framework, RH Traders
                combines structured lessons, practical tools, and trading signals so you
                can plan trades, manage risk, and review performance like a professional.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl font-[Georgia,Times_New_Roman,Times,serif] text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
                What you will learn: crypto trading
              </h2>
              <ul className="mt-4 max-w-xl space-y-3">
                {cryptoTradingFocus.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--rh-skyblue)] text-[10px] font-bold text-[#0b1220] shadow-[0_0_12px_rgba(135,206,235,0.35)] sm:h-6 sm:w-6 sm:text-xs"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/auth"
                className="rh-btn-primary inline-flex items-center justify-center rounded px-8 py-3.5 text-base font-extrabold text-white transition will-change-transform hover:brightness-110 hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]"
              >
                Start Learning
              </Link>
              <Link
                href="/plans"
                className="inline-flex items-center justify-center rounded border border-[color:var(--rh-skyblue)] bg-transparent px-8 py-3.5 text-base font-extrabold text-white shadow-[0_0_20px_rgba(135,206,235,0.18)] transition hover:border-[color:var(--rh-accent)] hover:bg-white/5"
              >
                See Pricing
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded px-4 py-3.5 text-base font-bold text-slate-500 underline-offset-4 transition hover:text-[color:var(--rh-skyblue)]"
              >
                Browse Insights →
              </Link>
              </div>
            </Reveal>
          </div>

          {/* Visual column (clean 3D laptop like reference) */}
          <div className="order-2">
            <div className="relative mx-auto max-w-[640px]">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/15 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,106,0,0.18),transparent_55%),radial-gradient(circle_at_75%_35%,rgba(135,206,235,0.14),transparent_55%)]" />
                <div className="relative aspect-[4/3] p-2 sm:p-3">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050a14]">
                    <Image
                      src="/hero/hero-laptop-3d.svg"
                      alt="3D laptop preview with a crypto chart"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 92vw, 640px"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b14]/55 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {miniCards.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center backdrop-blur-md"
                  >
                    <div className={["text-lg font-black", c.iconClass].join(" ")} aria-hidden>
                      {c.icon}
                    </div>
                    <div className="mt-1 text-[11px] font-extrabold uppercase tracking-widest text-slate-200">
                      {c.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
