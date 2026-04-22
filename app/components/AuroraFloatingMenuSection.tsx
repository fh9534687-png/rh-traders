"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";

type MenuCard = {
  title: string;
  desc: string;
  href: string;
  iconSrc: string;
  accent: "blue" | "cyan" | "indigo";
};

const MENU: MenuCard[] = [
  { title: "Market", desc: "Live prices & movers.", href: "/market", iconSrc: "/globe.svg", accent: "cyan" },
  { title: "Charts", desc: "Read structure cleanly.", href: "/charts", iconSrc: "/charts/line-chart.svg", accent: "blue" },
  { title: "Coins", desc: "Explore assets fast.", href: "/coins", iconSrc: "/file.svg", accent: "indigo" },
  { title: "FAQ", desc: "Instant answers.", href: "/faq", iconSrc: "/faq-thumb.svg", accent: "cyan" },
  { title: "Blog", desc: "Learn for free.", href: "/blog", iconSrc: "/window.svg", accent: "blue" },
  { title: "Contact", desc: "Support & help.", href: "/contact", iconSrc: "/globe.svg", accent: "indigo" },
  { title: "Plans", desc: "Upgrade access.", href: "/plans", iconSrc: "/icons/icon-192.svg", accent: "cyan" },
  { title: "Tools", desc: "Risk & sizing.", href: "/tools/risk", iconSrc: "/charts/risk-management.svg", accent: "blue" },
];

function accentGlow(a: MenuCard["accent"]) {
  if (a === "cyan") return "shadow-[0_0_60px_rgba(34,211,238,0.18)]";
  if (a === "indigo") return "shadow-[0_0_60px_rgba(99,102,241,0.16)]";
  return "shadow-[0_0_60px_rgba(59,130,246,0.18)]";
}

function accentBorder(a: MenuCard["accent"]) {
  if (a === "cyan") return "border-cyan-300/25";
  if (a === "indigo") return "border-indigo-300/25";
  return "border-sky-300/25";
}

function floating(delay = 0) {
  return {
    animate: { y: [0, -10, 0] as number[] },
    transition: {
      duration: 6.2,
      repeat: Infinity,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
}

function previewLine(accent: MenuCard["accent"]) {
  const stroke =
    accent === "cyan"
      ? "rgba(34,211,238,0.55)"
      : accent === "indigo"
        ? "rgba(99,102,241,0.52)"
        : "rgba(59,130,246,0.55)";
  const glow =
    accent === "cyan"
      ? "rgba(34,211,238,0.16)"
      : accent === "indigo"
        ? "rgba(99,102,241,0.14)"
        : "rgba(59,130,246,0.16)";

  return (
    <svg viewBox="0 0 260 74" className="h-8 w-full">
      <path
        d="M0 52 C 32 24, 62 68, 96 40 S 150 26, 176 44 S 214 68, 260 24"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
      />
      <path
        d="M0 52 C 32 24, 62 68, 96 40 S 150 26, 176 44 S 214 68, 260 24"
        fill="none"
        stroke={glow}
        strokeWidth="10"
      />
    </svg>
  );
}

export function AuroraFloatingMenuSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.25, once: true });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = window.setInterval(() => setIdx((v) => (v + 1) % MENU.length), 1750);
    return () => window.clearInterval(t);
  }, [inView]);

  const left = useMemo(() => MENU.slice(0, 4), []);
  const right = useMemo(() => MENU.slice(4), []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden rounded-[3rem] border border-sky-400/15 bg-[#020617] px-5 py-16 shadow-[0_0_140px_rgba(2,6,23,0.88)] sm:px-10 sm:py-20"
      aria-label="Aurora menu showcase"
    >
      {/* Aurora backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 680px at 50% 35%, rgba(34,211,238,0.12), transparent 62%), radial-gradient(980px 620px at 20% 20%, rgba(59,130,246,0.20), transparent 62%), radial-gradient(980px 620px at 80% 30%, rgba(99,102,241,0.14), transparent 62%), linear-gradient(180deg,#020617 0%, #050b17 45%, #020617 100%)",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        animate={{ opacity: [0.14, 0.28, 0.14] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(640px 260px at 50% 15%, rgba(34,211,238,0.18), transparent 62%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.55) 0.6px, transparent 0.7px), radial-gradient(rgba(56,189,248,0.55) 0.5px, transparent 0.7px)",
          backgroundSize: "22px 22px, 34px 34px",
          backgroundPosition: "0 0, 9px 14px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-400">
            Aurora workstation
          </p>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">
            A premium trading platform feel — instantly
          </h2>
          <p className="mt-3 text-pretty text-base leading-8 text-slate-300">
            Hover the floating cards. Click to jump into real pages. The screen stays calm, clean,
            and expensive — like a pro dashboard.
          </p>
        </motion.div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.3fr_0.85fr] lg:gap-10 [perspective:1600px]">
          {/* Left floating phones */}
          <div className="hidden lg:block">
            <div className="space-y-4">
              {left.map((c, i) => {
                const active = MENU[idx]?.href === c.href;
                return (
                  <motion.div
                    key={c.href}
                    {...floating(i * 0.35)}
                    whileHover={{ scale: 1.02, rotateY: -6, rotateX: 3 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Link
                      href={c.href}
                      className={[
                        "group relative block overflow-hidden rounded-[2.1rem] border bg-slate-950/30 p-3 backdrop-blur-xl transition",
                        accentBorder(c.accent),
                        accentGlow(c.accent),
                        "hover:-translate-y-0.5 hover:bg-slate-900/35 hover:shadow-[0_0_90px_rgba(56,189,248,0.14)]",
                      ].join(" ")}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_260px_at_30%_20%,rgba(56,189,248,0.10),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {active ? (
                        <motion.div
                          className="pointer-events-none absolute inset-0"
                          animate={{ opacity: [0.35, 0.85, 0.35] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            background:
                              "radial-gradient(420px 180px at 55% 20%, rgba(59,130,246,0.22), transparent 62%)",
                          }}
                          aria-hidden
                        />
                      ) : null}

                      <div className="relative">
                        <div className="mx-auto h-1.5 w-14 rounded-full bg-white/10" aria-hidden />
                        <div className="mt-3 rounded-2xl border border-white/10 bg-[#0b1220] p-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/25">
                              <Image src={c.iconSrc} alt="" width={18} height={18} className="opacity-90" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-extrabold text-white">{c.title}</p>
                              <p className="truncate text-xs text-slate-400">{c.desc}</p>
                            </div>
                          </div>
                          <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/25 px-3 py-2">
                            {previewLine(c.accent)}
                          </div>
                          <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
                            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-sky-400/70 via-blue-500/70 to-cyan-300/70" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Center neon screen */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 1.0, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="pointer-events-none absolute -inset-8 rounded-[3.2rem] bg-[radial-gradient(680px_320px_at_50%_10%,rgba(34,211,238,0.26),transparent_60%)] blur-3xl" />

            {/* Gradient border shell (more like the reference) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[3rem] p-[1.5px] shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_0_140px_rgba(34,211,238,0.18),0_60px_140px_-80px_rgba(0,0,0,0.92)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,211,238,0.35), rgba(59,130,246,0.25), rgba(99,102,241,0.22), rgba(16,185,129,0.20))",
              }}
            >
              <div className="relative overflow-hidden rounded-[2.9rem] border border-white/10 bg-slate-950/55 backdrop-blur-xl">
                {/* nav strip */}
                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-slate-950/30 px-6 py-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-400">
                    RH TRADERS • WORKSTATION
                  </p>
                  <div className="hidden items-center gap-5 text-xs font-semibold text-slate-500 sm:flex">
                    {["Home", "Market", "Charts", "Coins", "FAQ", "Tools"].map((t) => (
                      <span key={t} className="transition hover:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-extrabold text-emerald-100">
                    Online
                  </span>
                </div>

                <div className="relative px-7 py-10 sm:px-10 sm:py-12">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(860px_520px_at_50%_15%,rgba(34,211,238,0.12),transparent_62%)]" />

                  <div className="relative mx-auto max-w-[520px] text-center">
                    <h3 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">
                      Intelligence. Security. Growth.
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Enter a clean, neon-lit trading environment built for serious execution and learning.
                    </p>

                    {/* Add a “real chart strip” to stop it feeling empty */}
                    <div className="mx-auto mt-7 max-w-[620px] overflow-hidden rounded-3xl border border-white/10 bg-[#060b14] p-4 shadow-[0_0_60px_rgba(34,211,238,0.10)]">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                          Chart feed (demo)
                        </p>
                        <span className="rounded-full border border-sky-400/20 bg-slate-950/30 px-3 py-1 text-[11px] font-extrabold text-slate-200">
                          BTC/USDT • 1H
                        </span>
                      </div>
                      <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/25 px-3 py-2">
                        {previewLine("cyan")}
                      </div>
                    </div>

                    <motion.div
                      className="mx-auto mt-8 grid max-w-[520px] grid-cols-2 gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : undefined}
                      transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {[
                        { k: "BTC", v: "$62,350" },
                        { k: "P/L", v: "+3.8%" },
                        { k: "Alerts", v: "2" },
                        { k: "Latency", v: "8ms" },
                      ].map((s) => (
                        <div
                          key={s.k}
                          className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 shadow-[0_0_40px_rgba(16,185,129,0.10)]"
                        >
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                            {s.k}
                          </p>
                          <p className="mt-1 text-lg font-black text-white">{s.v}</p>
                        </div>
                      ))}
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} className="mt-8">
                      <Link
                        href="/plans"
                        className="inline-flex items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-500/10 px-7 py-3 text-sm font-extrabold text-white shadow-[0_0_70px_rgba(16,185,129,0.18)] transition hover:bg-emerald-500/14"
                      >
                        Open the platform →
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right floating phones */}
          <div className="hidden lg:block">
            <div className="space-y-4">
              {right.map((c, i) => {
                const active = MENU[idx]?.href === c.href;
                return (
                  <motion.div
                    key={c.href}
                    {...floating(0.2 + i * 0.35)}
                    whileHover={{ scale: 1.02, rotateY: 6, rotateX: 3 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Link
                      href={c.href}
                      className={[
                        "group relative block overflow-hidden rounded-[2.1rem] border bg-slate-950/30 p-3 backdrop-blur-xl transition",
                        accentBorder(c.accent),
                        accentGlow(c.accent),
                        "hover:-translate-y-0.5 hover:bg-slate-900/35 hover:shadow-[0_0_90px_rgba(56,189,248,0.14)]",
                      ].join(" ")}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_260px_at_30%_20%,rgba(56,189,248,0.10),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {active ? (
                        <motion.div
                          className="pointer-events-none absolute inset-0"
                          animate={{ opacity: [0.35, 0.85, 0.35] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          style={{
                            background:
                              "radial-gradient(420px 180px at 55% 20%, rgba(34,211,238,0.20), transparent 62%)",
                          }}
                          aria-hidden
                        />
                      ) : null}

                      <div className="relative">
                        <div className="mx-auto h-1.5 w-14 rounded-full bg-white/10" aria-hidden />
                        <div className="mt-3 rounded-2xl border border-white/10 bg-[#0b1220] p-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/25">
                              <Image src={c.iconSrc} alt="" width={18} height={18} className="opacity-90" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-extrabold text-white">{c.title}</p>
                              <p className="truncate text-xs text-slate-400">{c.desc}</p>
                            </div>
                          </div>
                          <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/25 px-3 py-2">
                            {previewLine(c.accent)}
                          </div>
                          <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
                            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300/70 via-sky-400/70 to-blue-500/70" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: swipeable floating cards */}
        <div className="mt-10 lg:hidden">
          <p className="mb-3 text-center text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            Explore pages
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {MENU.map((c, i) => (
              <motion.div
                key={c.href}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-[240px]"
              >
                <Link
                  href={c.href}
                  className={[
                    "group block overflow-hidden rounded-[2rem] border bg-slate-950/30 p-3 backdrop-blur-md transition hover:bg-slate-900/35",
                    accentBorder(c.accent),
                  ].join(" ")}
                >
                  <div className="mx-auto h-1.5 w-14 rounded-full bg-white/10" aria-hidden />
                  <div className="mt-3 rounded-2xl border border-white/10 bg-[#0b1220] p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/25">
                        <Image src={c.iconSrc} alt="" width={18} height={18} className="opacity-90" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-white">{c.title}</p>
                        <p className="truncate text-xs text-slate-400">{c.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-sky-400/70 via-blue-500/70 to-cyan-300/70" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

