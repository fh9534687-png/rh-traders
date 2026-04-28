"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./motion/Reveal";
import { PremiumTradingShowcaseSection } from "./PremiumTradingShowcaseSection";
import { FuturisticFintechPreviewSection } from "./FuturisticFintechPreviewSection";

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

export function HomeSectionsClient() {
  return (
    <>
      <PremiumTradingShowcaseSection />

      <section className="rh-wrap w-full px-5 py-10 sm:py-12">
        <Reveal>
          <div className="rh-card overflow-hidden rounded-[2.5rem] p-6 shadow-[0_30px_90px_rgba(2,6,23,0.45)] sm:p-10">
            <div className="grid items-stretch gap-12 lg:grid-cols-2">
              <div className="relative flex flex-col">
                <div className="relative w-full flex-1">
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <Image
                      src="/images/welcome/trainer-3.png"
                      alt="RH Traders mentor"
                      fill
                      sizes="(max-width: 1024px) 100vw, 520px"
                      className="object-cover object-center"
                      priority={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#020617]/45 via-transparent to-transparent" />
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold tracking-wide text-slate-400">
                  Raja Haseeb Nawaz
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--rh-border-red)]">
                    Intro RH Traders
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
                  Welcome to RH Traders
                </h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-300 sm:text-base">
                  RH Traders is a trading platform focused on education and execution. You get a structured
                  crypto trading course, a learning dashboard that keeps your progress organized, and optional
                  trading signals that are designed to be reviewed on your own chart before you act.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div className="rh-card rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(56,189,248,0.08)]">
                    <p className="text-sm font-extrabold text-white">Our Mission</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      Deliver clear trading education with practical rules so learners can plan trades,
                      manage risk, and build repeatable habits that translate to real market conditions.
                    </p>
                  </div>
                  <div className="rh-card rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(56,189,248,0.08)]">
                    <p className="text-sm font-extrabold text-white">Structured learning</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      Lessons are organized by topic and skill level, so you always know what to learn next
                      and how each concept connects to execution on a live chart.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href="/plans"
                    className="rh-btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-extrabold text-white transition hover:brightness-110 hover:shadow-[0_0_45px_rgba(56,189,248,0.18)]"
                  >
                    Choose a Plan
                  </Link>
                  <Link
                    href="/contact"
                    className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-extrabold"
                  >
                    Talk to Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="rh-wrap w-full px-5 py-10 sm:py-12">
        <Reveal>
          <div>
            <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
              What matters most when you learn trading online
            </h2>
            <p className="mt-3 max-w-3xl text-slate-400">
              A reliable process is built on a few fundamentals: market structure, context, and risk control.
              These short guides explain the concepts you will use inside the RH Traders dashboard and course
              modules.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
          {[
            {
              title: "Market Trend",
              desc: "Figuring out whether the market is broadly pushing up, drifting down, or going nowhere saves you from buying every tiny bounce in a dump.",
              href: "/pillars/market-trend",
            },
            {
              title: "Support & Resistance",
              desc: "Those zones on the chart aren’t magic—they’re just places where price has reacted before, and people tend to react again.",
              href: "/pillars/support-resistance",
            },
            {
              title: "Volume",
              desc: "Volume is the crowd noise under the price. A move with nobody showing up is often a move you shouldn’t trust yet.",
              href: "/pillars/volume",
            },
            {
              title: "Risk Management",
              desc: "How much you put on, where you tap out if you’re wrong, and how you keep one bad day from erasing a month of progress.",
              href: "/pillars/risk-management",
            },
          ].map((p) => (
            <Reveal key={p.href}>
              <Link
                href={p.href}
                className="group rh-card flex h-full flex-col rounded-3xl p-7 transition will-change-transform hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(56,189,248,0.10)]"
              >
                <div className="flex flex-1 items-start justify-between gap-6">
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-xl font-black tracking-tight text-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 min-h-[96px] text-base leading-8 text-slate-200">
                      {p.desc}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-white/90 transition group-hover:text-sky-300">
                      Learn more <span aria-hidden="true">→</span>
                    </span>
                  </div>
                  <span className="mt-1 h-12 w-12 shrink-0 rounded-2xl border border-sky-500/30 bg-slate-900/60 transition group-hover:border-sky-400/50 group-hover:shadow-[0_0_26px_rgba(56,189,248,0.20)]" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FuturisticFintechPreviewSection />

      {/* The rest of the homepage stays server-rendered in app/page.tsx (tables, FAQ, etc.). */}
      {/* This client wrapper only covers the sections we enhanced with scroll reveal + showcase. */}
    </>
  );
}

