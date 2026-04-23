"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

function CheckIcon() {
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-500/10 shadow-[0_0_18px_rgba(16,185,129,0.25)]"
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 12 12" className="text-emerald-200">
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

function MiniChart({ tone }: { tone: "blue" | "green" }) {
  const stroke = tone === "green" ? "rgba(16,185,129,0.70)" : "rgba(56,189,248,0.70)";
  const glow = tone === "green" ? "rgba(16,185,129,0.16)" : "rgba(56,189,248,0.16)";
  return (
    <svg viewBox="0 0 320 90" className="h-10 w-full">
      <path
        d="M0 62 C 42 26, 72 82, 110 48 S 182 22, 214 52 S 262 86, 320 30"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
      />
      <path
        d="M0 62 C 42 26, 72 82, 110 48 S 182 22, 214 52 S 262 86, 320 30"
        fill="none"
        stroke={glow}
        strokeWidth="10"
      />
    </svg>
  );
}

function PhoneShell({
  children,
  accent = "blue",
  className = "",
}: {
  children: React.ReactNode;
  accent?: "blue" | "green";
  className?: string;
}) {
  const border = accent === "green" ? "border-emerald-300/20" : "border-sky-300/20";
  const glow =
    accent === "green"
      ? "shadow-[0_0_110px_rgba(16,185,129,0.18)]"
      : "shadow-[0_0_110px_rgba(59,130,246,0.18)]";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[2.2rem] border bg-slate-950/35 p-3 backdrop-blur-xl",
        border,
        glow,
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_260px_at_30%_20%,rgba(34,211,238,0.10),transparent_60%)] opacity-70" />
      <div className="relative rounded-[1.75rem] border border-white/10 bg-[#070c15] p-4">
        <div className="mx-auto h-1.5 w-14 rounded-full bg-white/10" aria-hidden />
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

type FloatCard = {
  id: string;
  kind: "balance" | "chart" | "profit";
  className: string;
  z: number;
  delay: number;
  rotateZ: number;
};

export function PremiumFintechHeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.35, once: true });

  const floatCards: FloatCard[] = useMemo(
    () => [
      {
        id: "balance",
        kind: "balance",
        className: "left-0 top-8 w-[290px] sm:w-[320px]",
        z: 30,
        delay: 0.05,
        rotateZ: -8,
      },
      {
        id: "chart",
        kind: "chart",
        className: "left-14 top-40 w-[320px] sm:w-[360px]",
        z: 50,
        delay: 0.16,
        rotateZ: 7,
      },
      {
        id: "profit",
        kind: "profit",
        className: "left-48 top-14 w-[260px] sm:w-[290px]",
        z: 60,
        delay: 0.30,
        rotateZ: 12,
      },
    ],
    [],
  );

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#020617] py-16 sm:py-20"
      aria-label="Premium trading platform hero"
    >
      {/* Background glow + particles */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 680px at 35% 40%, rgba(59,130,246,0.18), transparent 62%), radial-gradient(900px 600px at 70% 30%, rgba(16,185,129,0.14), transparent 62%), linear-gradient(180deg, #020617 0%, #050b17 45%, #020617 100%)",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        animate={{ opacity: [0.10, 0.22, 0.10] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(640px 280px at 55% 20%, rgba(16,185,129,0.22), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.55) 0.6px, transparent 0.7px), radial-gradient(rgba(16,185,129,0.50) 0.5px, transparent 0.7px)",
          backgroundSize: "22px 22px, 38px 38px",
          backgroundPosition: "0 0, 12px 18px",
        }}
        aria-hidden
      />

      <div className="rh-wrap relative px-5">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left: floating mobile cards */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[520px] overflow-visible [perspective:1400px]"
          >
            <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[radial-gradient(680px_340px_at_45%_30%,rgba(59,130,246,0.22),transparent_62%)] blur-3xl" />

            {floatCards.map((c) => (
              <motion.div
                key={c.id}
                className={["absolute", c.className].join(" ")}
                style={{ zIndex: c.z, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 22, rotateZ: c.rotateZ - 6, scale: 0.98 }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        y: [0, -10, 0],
                        rotateZ: c.rotateZ,
                        rotateY: c.rotateZ > 0 ? 10 : -10,
                        rotateX: 6,
                        scale: 1,
                      }
                    : undefined
                }
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                  delay: c.delay,
                }}
                whileHover={{
                  scale: 1.04,
                  rotateZ: c.rotateZ * 0.7,
                  rotateY: c.rotateZ > 0 ? 14 : -14,
                  boxShadow: "0 0 120px rgba(59,130,246,0.22)",
                }}
              >
                {c.kind === "balance" ? (
                  <PhoneShell accent="blue">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                      Balance <span className="text-slate-600">·</span> Vault / Wallet
                    </p>
                    <p className="mt-3 text-2xl font-black tracking-tight text-white">
                      $12,540<span className="text-slate-400">.24</span>
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {[
                        { k: "Spot", v: "$8,140" },
                        { k: "Futures", v: "$4,400" },
                      ].map((x) => (
                        <div
                          key={x.k}
                          className="rounded-2xl border border-white/10 bg-slate-950/25 px-3 py-2.5"
                        >
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                            {x.k}
                          </p>
                          <p className="mt-1 text-sm font-extrabold text-slate-200">{x.v}</p>
                        </div>
                      ))}
                    </div>
                  </PhoneShell>
                ) : null}

                {c.kind === "chart" ? (
                  <PhoneShell accent="blue">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                          BTC/USDT
                        </p>
                        <p className="mt-1 text-sm font-extrabold text-white">Live chart</p>
                      </div>
                      <span className="rounded-full border border-sky-400/20 bg-slate-950/25 px-3 py-1 text-[11px] font-extrabold text-slate-200">
                        1H
                      </span>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/25 px-3 py-2">
                      <MiniChart tone="blue" />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        { k: "Entry", v: "64,200" },
                        { k: "TP", v: "67,000" },
                        { k: "Risk", v: "1%" },
                      ].map((x) => (
                        <div
                          key={x.k}
                          className="rounded-2xl border border-white/10 bg-slate-950/25 px-3 py-2"
                        >
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                            {x.k}
                          </p>
                          <p className="mt-1 text-xs font-extrabold text-slate-200">{x.v}</p>
                        </div>
                      ))}
                    </div>
                  </PhoneShell>
                ) : null}

                {c.kind === "profit" ? (
                  <PhoneShell accent="green">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                      Profit <span className="text-slate-600">·</span> Today
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <p className="text-3xl font-black tracking-tight text-white">+3.8%</p>
                      <p className="text-xs font-semibold text-slate-400">24h</p>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/25 px-3 py-2">
                      <MiniChart tone="green" />
                    </div>
                    <p className="mt-3 text-xs text-slate-400">
                      Auto risk controls • Calm execution
                    </p>
                  </PhoneShell>
                ) : null}
              </motion.div>
            ))}
          </motion.div>

          {/* Right: premium content */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.95, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-500/10 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-emerald-100">
              PREMIUM TRADING PLATFORM
            </p>

            <h1 className="mt-5 text-balance text-4xl font-black tracking-tight text-white sm:text-5xl">
              Trade Smarter. Execute With Confidence.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-8 text-slate-300">
              RH Traders gives you a complete trading ecosystem — from structured learning and real-time signals to disciplined execution frameworks. No noise. No hype. Just strategies that work in real market conditions.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Institutional-style trading concepts simplified for real learners",
                "Clean signal delivery with clear entry, TP, and risk control",
                "Structured learning paths — from beginner to advanced execution",
                "Calm, distraction-free dashboard designed for focused decision-making",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckIcon />
                  <p className="text-sm leading-7 text-slate-200">{t}</p>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/plans"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-300/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.22),rgba(59,130,246,0.18),rgba(34,211,238,0.10))] px-8 py-3.5 text-sm font-extrabold text-white shadow-[0_0_90px_rgba(16,185,129,0.18)] transition hover:shadow-[0_0_120px_rgba(34,211,238,0.18)]"
                >
                  Start Your Trading Journey
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

