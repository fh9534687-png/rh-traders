"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type NavCard = {
  title: string;
  desc: string;
  href: string;
  accent: "blue" | "cyan" | "indigo";
};

const navCards: NavCard[] = [
  { title: "Live Market", desc: "Prices, movers, and momentum.", href: "/market", accent: "cyan" },
  { title: "Charts", desc: "Clean chart workflows.", href: "/charts", accent: "blue" },
  { title: "Coins", desc: "Explore assets & structure.", href: "/coins", accent: "indigo" },
  { title: "Signals", desc: "Execution-ready ideas.", href: "/dashboard/signals", accent: "cyan" },
  { title: "Plans", desc: "Upgrade your access.", href: "/plans", accent: "blue" },
  { title: "Tools", desc: "Risk, sizing, P/L.", href: "/tools/risk", accent: "indigo" },
];

function accentClass(a: NavCard["accent"]) {
  if (a === "cyan") return "from-cyan-300/20 via-sky-400/10 to-blue-600/10 border-cyan-300/25";
  if (a === "indigo") return "from-indigo-300/18 via-blue-500/10 to-cyan-300/10 border-indigo-300/25";
  return "from-sky-300/18 via-blue-500/10 to-cyan-300/10 border-sky-300/25";
}

function CheckIcon() {
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-400/25 bg-blue-500/10 shadow-[0_0_16px_rgba(59,130,246,0.35)]"
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 12 12" className="text-sky-200">
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

export function PremiumTradingShowcaseSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.25, once: true });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(r.width, e.clientX - r.left));
      const y = Math.max(0, Math.min(r.height, e.clientY - r.top));
      setMouse({ x, y });
      setHasMouse(true);
    }

    function onLeave() {
      setHasMouse(false);
    }

    const el = rootRef.current;
    if (!el) return;
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const glowStyle = useMemo(() => {
    const x = Math.round(mouse.x);
    const y = Math.round(mouse.y);
    const center = `${x}px ${y}px`;
    return {
      background: hasMouse
        ? `radial-gradient(520px 320px at ${center}, rgba(59,130,246,0.18), rgba(34,211,238,0.08), transparent 62%)`
        : "radial-gradient(520px 320px at 65% 35%, rgba(59,130,246,0.14), rgba(34,211,238,0.06), transparent 62%)",
    } as const;
  }, [mouse.x, mouse.y, hasMouse]);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#020617] py-14 sm:py-20"
      aria-label="Premium trading platform showcase"
    >
      {/* Base gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 15% 15%, rgba(59,130,246,0.18), transparent 62%), radial-gradient(820px 480px at 85% 25%, rgba(34,211,238,0.10), transparent 60%), linear-gradient(180deg, #020617 0%, #0b1220 40%, #020617 100%)",
        }}
        aria-hidden
      />

      {/* Mouse-follow glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={glowStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      {/* Subtle particle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.55) 0.6px, transparent 0.7px), radial-gradient(rgba(56,189,248,0.55) 0.5px, transparent 0.7px)",
          backgroundSize: "22px 22px, 34px 34px",
          backgroundPosition: "0 0, 9px 14px",
          filter: "blur(0.2px)",
        }}
        aria-hidden
      />

      {/* Scanline */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-0 h-24 opacity-[0.08]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.35) 50%, transparent 100%)",
        }}
        animate={{ y: ["-40%", "140%"] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      <div className="rh-wrap relative px-5">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: floating cards + device mock */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 min-h-[420px] lg:order-1"
          >
            {/* Floating mini-cards around the laptop */}
            <motion.div
              className="pointer-events-none absolute -left-2 top-6 hidden w-[220px] rounded-3xl border border-sky-400/25 bg-slate-950/35 p-4 shadow-[0_0_70px_rgba(59,130,246,0.18)] backdrop-blur-md md:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Signal alert
              </p>
              <p className="mt-2 text-sm font-extrabold text-white">BTC/USDT • Long</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                {[
                  { k: "Entry", v: "64,200" },
                  { k: "TP", v: "67,000" },
                  { k: "SL", v: "62,980" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-white/10 bg-slate-950/30 px-3 py-2"
                  >
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                      {x.k}
                    </p>
                    <p className="mt-1 font-extrabold text-slate-200">{x.v}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute -right-2 top-24 hidden w-[210px] rounded-3xl border border-cyan-300/20 bg-slate-950/35 p-4 shadow-[0_0_70px_rgba(34,211,238,0.14)] backdrop-blur-md md:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Portfolio (sim)
              </p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-2xl font-black tracking-tight text-white">+3.8%</p>
                <p className="text-xs font-semibold text-slate-400">24h</p>
              </div>
              <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-300/70 via-sky-400/70 to-blue-500/70" />
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Risk-first execution, clean rules, consistent process.
              </p>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute bottom-8 left-10 hidden w-[240px] rounded-3xl border border-indigo-300/20 bg-slate-950/35 p-4 shadow-[0_0_70px_rgba(99,102,241,0.14)] backdrop-blur-md lg:block"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Chart pulse
              </p>
              <svg viewBox="0 0 320 80" className="mt-3 h-10 w-full">
                <defs>
                  <linearGradient id="rhPulse" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="rgba(59,130,246,0.20)" />
                    <stop offset="0.55" stopColor="rgba(34,211,238,0.34)" />
                    <stop offset="1" stopColor="rgba(99,102,241,0.22)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 52 C 42 28, 72 62, 108 40 S 175 18, 212 44 S 265 70, 320 26"
                  fill="none"
                  stroke="url(#rhPulse)"
                  strokeWidth="3"
                />
                <path
                  d="M0 52 C 42 28, 72 62, 108 40 S 175 18, 212 44 S 265 70, 320 26"
                  fill="none"
                  stroke="rgba(56,189,248,0.10)"
                  strokeWidth="10"
                />
              </svg>
              <p className="mt-2 text-xs text-slate-400">
                Structure, liquidity, execution — one view.
              </p>
            </motion.div>

            {/* Laptop + mobile mock */}
            <motion.div
              className="relative mx-auto max-w-[660px]"
              initial={{ opacity: 0, y: 18, scale: 0.99 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 1.0, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden rounded-[2.25rem] border border-sky-400/25 bg-slate-950/35 p-2 shadow-[0_0_0_1px_rgba(56,189,248,0.14),0_0_90px_rgba(59,130,246,0.16),0_50px_90px_-40px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#0b1220]">
                  {/* Top bar */}
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-slate-950/30 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/40" aria-hidden />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/40" aria-hidden />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/40" aria-hidden />
                    </div>
                    <p className="text-xs font-extrabold tracking-[0.22em] text-slate-400">
                      RH TRADERS • DASHBOARD
                    </p>
                    <span className="text-xs font-semibold text-slate-500">SIM</span>
                  </div>

                  {/* In-screen content */}
                  <div className="relative p-5 sm:p-6">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_30%_10%,rgba(59,130,246,0.10),transparent_60%)]" />
                    <div className="relative">
                      <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                            Workspace
                          </p>
                          <p className="mt-2 text-lg font-black tracking-tight text-white">
                            Live-style platform UI
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-sky-400/20 bg-slate-950/35 px-3 py-1 text-xs font-extrabold text-slate-200">
                            BTC $62,350
                          </span>
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-extrabold text-emerald-100">
                            +3.8%
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {navCards.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30 p-4 transition hover:-translate-y-0.5 hover:border-sky-400/25 hover:bg-slate-900/35"
                          >
                            <div
                              className={[
                                "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                                "bg-[radial-gradient(520px_220px_at_30%_20%,rgba(56,189,248,0.10),transparent_62%)]",
                              ].join(" ")}
                            />
                            <div className="relative">
                              <p className="text-sm font-extrabold text-white">{c.title}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-400">{c.desc}</p>
                              <div className="mt-3 flex items-center justify-between gap-3">
                                <span
                                  className={[
                                    "rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide",
                                    `bg-gradient-to-r ${accentClass(c.accent)}`,
                                  ].join(" ")}
                                >
                                  Open
                                </span>
                                <span className="text-xs font-extrabold text-slate-500 transition group-hover:text-sky-200">
                                  →
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* “Surprise” ribbon */}
                      <motion.div
                        className="mt-5 overflow-hidden rounded-2xl border border-sky-400/15 bg-slate-950/25 px-4 py-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                            Auto feed
                          </p>
                          <motion.span
                            className="text-xs font-extrabold text-sky-200"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            Updating…
                          </motion.span>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-slate-200">
                          New signal card detected • “ETH/USDT — Waiting confirmation”
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile mock */}
              <motion.div
                className="absolute bottom-6 right-6 hidden w-[220px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 shadow-[0_0_70px_rgba(56,189,248,0.16)] backdrop-blur-md sm:block"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="px-4 py-4">
                  <div className="mx-auto h-1.5 w-14 rounded-full bg-white/10" />
                  <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                    Signals
                  </p>
                  <div className="mt-3 space-y-2">
                    {[
                      { t: "BTC/USDT", s: "Active", v: "+2.1%" },
                      { t: "ETH/USDT", s: "Waiting", v: "+0.7%" },
                      { t: "SOL/USDT", s: "Alert", v: "+1.4%" },
                    ].map((r) => (
                      <div
                        key={r.t}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/30 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-xs font-extrabold text-white">{r.t}</p>
                          <p className="text-[11px] text-slate-400">{r.s}</p>
                        </div>
                        <p className="text-xs font-black text-sky-300">{r.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT: copy + bullets + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/25 bg-slate-950/35 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
              PREMIUM EXPERIENCE
            </p>

            <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">
              <span className="relative">
                <span className="absolute -inset-1 -z-10 rounded-2xl bg-[radial-gradient(280px_120px_at_30%_40%,rgba(59,130,246,0.35),transparent_65%)] blur-xl" />
                Understanding How Crypto Trading Works
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-8 text-slate-300">
              Crypto trading is the process of buying and selling digital assets based on price movements in the
              market. Unlike traditional markets, the crypto market operates continuously, allowing traders to react
              to changes at any time.
              <br />
              <br />
              Every trade follows a simple flow — a trader selects an asset, analyzes the market conditions, and
              places an order based on a strategy. Price movements are influenced by supply and demand, market
              sentiment, global news, and trading activity.
              <br />
              <br />
              To trade effectively, it is important to understand how orders work, how prices move, and how risk is
              managed during different market conditions.
            </p>

            <div className="mt-7 grid gap-3">
              {[
                "Market Structure – Understanding whether the market is trending or ranging",
                "Order Types – Learning how buy and sell orders are executed",
                "Price Movement – How supply and demand affect price changes",
                "Risk Control – Managing losses using stop-loss and position sizing",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckIcon />
                  <p className="text-sm leading-7 text-slate-200">{t}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-3xl border border-white/10 bg-slate-950/25 p-6">
              <p className="text-sm font-extrabold text-white">
                How Crypto Trading Works in Real Markets
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Crypto trading is built on a system where buyers and sellers interact through exchanges. When demand
                increases, prices rise, and when selling pressure increases, prices fall.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Each trade involves decision-making based on analysis rather than guesswork. Traders observe charts,
                identify patterns, and plan entries and exits before placing a trade.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Understanding this process helps reduce emotional trading and improves long-term consistency in the
                market.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/plans"
                  className="inline-flex items-center justify-center rounded-full border border-sky-400/25 bg-[linear-gradient(135deg,rgba(59,130,246,0.28),rgba(34,211,238,0.14))] px-8 py-3.5 text-sm font-extrabold text-white shadow-[0_0_70px_rgba(59,130,246,0.20)] transition hover:border-sky-400/45 hover:shadow-[0_0_90px_rgba(34,211,238,0.22)]"
                >
                  Access Dashboard
                </Link>
              </motion.div>
              <Link
                href="/market"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/25 px-8 py-3.5 text-sm font-extrabold text-slate-100 transition hover:bg-slate-900/35 hover:text-white"
              >
                View Market
              </Link>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Tip: hover the UI cards inside the laptop — they open real pages.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

