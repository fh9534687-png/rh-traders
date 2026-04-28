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
      className="relative overflow-hidden bg-[#020617] text-slate-100"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 15% 20%, rgba(37, 99, 235, 0.18), transparent 55%), radial-gradient(ellipse 70% 45% at 85% 10%, rgba(56, 189, 248, 0.08), transparent 50%), linear-gradient(180deg, #020617 0%, #0f172a 55%, #020617 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(900px 520px at 80% 20%, rgba(56,189,248,0.08), transparent 60%), radial-gradient(720px 420px at 20% 75%, rgba(37,99,235,0.12), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="relative rh-wrap px-5 pt-3 pb-8 sm:pt-4 sm:pb-10 lg:pt-5 lg:pb-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-10">
          <div className="relative order-2 min-h-[300px] lg:order-1 lg:min-h-[380px]">
            <div
              className="relative mx-auto max-w-lg overflow-hidden rounded-[24px] border border-sky-400/45 bg-slate-900/40 p-1 shadow-[0_0_0_1px_rgba(56,189,248,0.2),0_0_60px_-10px_rgba(37,99,235,0.45),0_25px_50px_-12px_rgba(0,0,0,0.6)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-[#0b1220]">
                <Image
                  src="/hero/hero-home-visual-v2.png"
                  alt="Algorithmic trading concept with AI profile and financial charts"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 92vw, 512px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent opacity-90" />
              </div>
            </div>

            <div className="absolute left-0 right-0 top-3 z-10 flex justify-center gap-2 sm:-top-2 sm:gap-3 md:justify-start md:pl-4">
              {miniCards.map((c, i) => (
                <div
                  key={c.label}
                  className={`flex w-[30%] max-w-[104px] flex-col items-center rounded-lg px-2 py-2.5 text-center backdrop-blur-md sm:px-3 sm:py-3 ${c.shellClass}`}
                >
                  <span
                    className={`text-lg sm:text-xl ${c.iconClass}`}
                    aria-hidden
                  >
                    {c.icon}
                  </span>
                  <span className="mt-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-200 sm:text-xs">
                    {c.label}
                  </span>
                  <span className="mt-0.5 hidden text-[9px] text-slate-500 sm:block">
                    {c.sub}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="relative z-10 mx-auto mt-6 max-w-md rounded-xl border border-sky-400/40 bg-slate-900/85 p-5 shadow-[0_0_32px_rgba(37,99,235,0.15)] backdrop-blur-sm sm:mt-8 md:ml-4"
            >
              <p className="text-3xl font-black leading-none tracking-tight text-[color:var(--rh-skyblue)] sm:text-4xl">
                Flexible Crypto Trading Learning — Anytime, Anywhere
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-200 sm:text-base">
                Crypto markets run 24/7, but your learning should be structured
                and flexible. Access lessons, signals, and strategies anytime—
                without pressure, at your own pace.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <h1
                id="hero-heading"
                className="text-balance font-[Georgia,Times_New_Roman,Times,serif] text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-2xl lg:text-3xl xl:text-[2.05rem]"
              >
                Crypto trading course with RH traders
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-200 sm:text-lg">
                Due to Potential for High Returns people choose trading and due to limited knowledge they faces loses.
                Being Knowledgeable is the first step to achieve the highest achievements and the biggest solution is to
                join a result giving platform where at cheap cost first u will learn the hiddens secrets for crypto
                trading and that was the introduction to RH traders. Join now and stop loses in your trades.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-xl font-[Georgia,Times_New_Roman,Times,serif] text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
                You will learn the best ways to trade crypto
              </h2>
              <ul className="mt-4 max-w-xl space-y-3">
                {[
                  "Risk managements in tough situations",
                  "Hidden knowledge which is valuable in crypto trading",
                  "Read candlestick charts, choose timeframes, and interpret structure, trend, support and resistance, and volume together.",
                  "Building proper trade plan  before risking capital",
                  "We offers the best start for long-term consistency. Support is available 24/7 to resolve your issues.",
                  "You will be given lifetime access to lectures any new update in market will be shared quickly in your paid dashboard",
                ].map((line) => (
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
        </div>
      </div>
    </section>
  );
}
