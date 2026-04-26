"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PricesRow = {
  name: string;
  symbol: string;
  priceUsd: number | null;
  change24h: number | null;
  marketCapUsd: number | null;
};

type PricesResponse = { rows?: PricesRow[] };
type ChartPoint = { t: number; v: number };
type ChartsResponse = { btc?: ChartPoint[]; eth?: ChartPoint[] };

function fmtMoney(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtPrice(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n >= 1000 ? 0 : 2,
  }).format(n);
}

function pctClass(pct: number | null) {
  if (pct === null) return "text-slate-300";
  return pct >= 0 ? "text-emerald-300" : "text-red-300";
}

function pctText(pct: number | null) {
  if (pct === null || Number.isNaN(pct)) return "—";
  const v = Math.round(pct * 100) / 100;
  return `${v >= 0 ? "+" : ""}${v}%`;
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-sky-400/15 bg-slate-900/35 shadow-[0_0_60px_rgba(37,99,235,0.10)] backdrop-blur-md",
        "transition hover:-translate-y-0.5 hover:border-sky-400/25 hover:bg-slate-900/45 hover:shadow-[0_0_70px_rgba(56,189,248,0.12)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function BtcTicker({ btc }: { btc: PricesRow | null }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-sky-400/20 bg-slate-950/30 px-4 py-2 text-sm text-slate-200 backdrop-blur">
      <span className="text-xs font-extrabold tracking-[0.2em] text-slate-400">
        LIVE BTC
      </span>
      <span className="font-extrabold text-white">
        {btc?.priceUsd ? fmtPrice(btc.priceUsd) : "Loading…"}
      </span>
      <span className={["text-xs font-extrabold", pctClass(btc?.change24h ?? null)].join(" ")}>
        {pctText(btc?.change24h ?? null)}
      </span>
    </div>
  );
}

function TradingViewWidget() {
  useEffect(() => {
    const container = document.getElementById("rh-tradingview-widget");
    if (!container) return;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      const tv = (window as unknown as { TradingView?: unknown }).TradingView as
        | undefined
        | {
            widget: (cfg: Record<string, unknown>) => void;
          };
      if (!tv?.widget) return;
      tv.widget({
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "60",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        hide_top_toolbar: true,
        hide_legend: true,
        save_image: false,
        container_id: "rh-tradingview-widget",
      });
    };
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <GlassCard className="h-[420px] overflow-hidden sm:h-[520px]">
      <div className="flex items-center justify-between gap-3 border-b border-sky-400/10 px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            Advanced chart
          </p>
          <p className="mt-1 truncate text-sm font-extrabold text-white">
            BTC/USDT (TradingView)
          </p>
        </div>
        <span className="rounded-full border border-sky-400/15 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-slate-200">
          Education preview
        </span>
      </div>
      <div className="h-[calc(420px-57px)] sm:h-[calc(520px-57px)]">
        <div id="rh-tradingview-widget" className="h-full w-full" />
      </div>
    </GlassCard>
  );
}

function MiniCharts({ btc, eth }: { btc: ChartPoint[]; eth: ChartPoint[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function toData(list: ChartPoint[]) {
    return list.map((p) => ({ t: p.t, v: p.v }));
  }
  const btcData = useMemo(() => toData(btc), [btc]);
  const ethData = useMemo(() => toData(eth), [eth]);

  const axisStyle = { fontSize: 10, fill: "#94a3b8" };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {[
        { label: "BTC mini chart", data: btcData, stroke: "#38bdf8" },
        { label: "ETH mini chart", data: ethData, stroke: "#60a5fa" },
      ].map((c) => (
        <GlassCard key={c.label} className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-extrabold text-white">{c.label}</p>
            <span className="text-xs font-bold text-slate-500">24h</span>
          </div>
          <div className="mt-4 h-[180px]">
            {mounted ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
                minWidth={0}
                minHeight={0}
              >
                <LineChart data={c.data}>
                  <XAxis
                    dataKey="t"
                    tickFormatter={() => ""}
                    tick={axisStyle}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={axisStyle}
                    axisLine={false}
                    tickLine={false}
                    width={44}
                    domain={["auto", "auto"]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(2,6,23,0.9)",
                      border: "1px solid rgba(56,189,248,0.18)",
                      borderRadius: 16,
                      color: "#e2e8f0",
                    }}
                    labelFormatter={() => ""}
                    formatter={(v) =>
                      typeof v === "number" ? fmtPrice(v) : String(v)
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke={c.stroke}
                    strokeWidth={2.5}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full rounded-2xl border border-sky-400/10 bg-gradient-to-b from-slate-950/20 to-slate-900/20" />
            )}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

export function TradingViewInspiredHome() {
  const [prices, setPrices] = useState<PricesRow[] | null>(null);
  const [charts, setCharts] = useState<ChartsResponse | null>(null);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const res = await fetch("/api/prices", { cache: "no-store" });
        const json = (await res.json()) as PricesResponse;
        if (alive) setPrices(Array.isArray(json.rows) ? json.rows : []);
      } catch {
        if (alive) setPrices([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const res = await fetch("/api/market/charts", { cache: "no-store" });
        const json = (await res.json()) as ChartsResponse;
        if (alive) setCharts(json);
      } catch {
        if (alive) setCharts({ btc: [], eth: [] });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const btc = useMemo(() => prices?.find((r) => r.symbol === "BTC") ?? null, [prices]);
  const eth = useMemo(() => prices?.find((r) => r.symbol === "ETH") ?? null, [prices]);
  const totalMarketCap = useMemo(() => {
    if (!prices) return null;
    const sum = prices.reduce((acc, r) => acc + (r.marketCapUsd ?? 0), 0);
    return sum > 0 ? sum : null;
  }, [prices]);

  const cards = useMemo(() => {
    const btcPrice = btc?.priceUsd ?? null;
    const ethPrice = eth?.priceUsd ?? null;
    const btcChange = btc?.change24h ?? null;
    const marketCap = totalMarketCap;
    return [
      { title: "Bitcoin", value: btcPrice ? fmtPrice(btcPrice) : "—", pct: btcChange },
      { title: "Ethereum", value: ethPrice ? fmtPrice(ethPrice) : "—", pct: eth?.change24h ?? null },
      { title: "Crypto market cap", value: marketCap ? fmtMoney(marketCap) : "—", pct: null },
      { title: "24h change", value: pctText(btcChange), pct: btcChange },
    ] as const;
  }, [btc, eth, totalMarketCap]);

  return (
    <div className="relative">
      {/* SECTION 1: HERO */}
      <section className="rh-wrap px-5 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Learn Crypto Trading with Real Market Insights
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              RH Traders helps you learn trading online with structured lessons, practical dashboards,
              and signals designed to be verified on your own chart before execution.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/auth"
                className="rh-btn-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-extrabold text-white"
              >
                Start Learning
              </Link>
              <Link
                href="/signals/how-signals-work"
                className="inline-flex items-center justify-center rounded-full border border-sky-400/30 bg-slate-950/25 px-7 py-3 text-base font-extrabold text-white transition hover:bg-slate-900/35"
              >
                View Signals
              </Link>
              <div className="sm:ml-auto">
                <BtcTicker btc={btc} />
              </div>
            </div>
          </div>

          <GlassCard className="p-5 sm:p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Platform overview
            </p>
            <div className="mt-4 grid gap-3">
              {[
                "Structured crypto trading course (beginner → advanced)",
                "Signals with clear entries, TP/SL, and reasoning",
                "Risk-first tools (position size, P/L, risk calc)",
                "Clean dashboard for focused execution",
              ].map((x) => (
                <div key={x} className="flex gap-3 rounded-2xl border border-sky-400/10 bg-slate-950/20 px-4 py-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--rh-sky)] shadow-[0_0_10px_rgba(56,189,248,0.45)]" />
                  <p className="text-sm font-semibold text-slate-200">{x}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* SECTION 2: MARKET OVERVIEW */}
      <section className="rh-wrap px-5 py-12 sm:py-14">
        <SectionHeading
          eyebrow="Market overview"
          title="A fast snapshot (TradingView-inspired)"
          subtitle="Lightweight market cards for context—education-first, not a trading terminal."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <GlassCard key={c.title} className="p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                {c.title}
              </p>
              <p className="mt-3 text-xl font-extrabold text-white">{c.value}</p>
              <p className={["mt-2 text-sm font-extrabold", pctClass(c.pct)].join(" ")}>
                {c.pct === null ? " " : pctText(c.pct)}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION 3: MINI CHARTS */}
      <section className="rh-wrap px-5 py-12 sm:py-14">
        <SectionHeading
          eyebrow="Mini charts"
          title="Glowing lines, lightweight data"
          subtitle="24h sparklines for BTC and ETH—enough to teach context without slowing the page."
        />
        <MiniCharts btc={charts?.btc ?? []} eth={charts?.eth ?? []} />
      </section>

      {/* SECTION 4: ADVANCED CHART */}
      <section className="rh-wrap px-5 py-12 sm:py-14">
        <TradingViewWidget />
      </section>

      {/* SECTION 5: LEARNING SECTION */}
      <section className="rh-wrap px-5 py-12 sm:py-14">
        <SectionHeading
          eyebrow="Learning"
          title="Learn Crypto Trading Step by Step"
          subtitle="A structured path that builds skills you can execute with discipline."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Market Structure", desc: "Trend, ranges, and context—what price is actually doing." },
            { title: "Support & Resistance", desc: "Key zones, liquidity, and reaction areas for planning entries." },
            { title: "Risk Management", desc: "Position sizing, invalidation, and protecting your equity curve." },
            { title: "Trading Psychology", desc: "Rules, routines, and calm execution when markets move fast." },
          ].map((c) => (
            <GlassCard key={c.title} className="p-6">
              <h3 className="text-lg font-extrabold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{c.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION 6: SIGNALS PREVIEW */}
      <section className="rh-wrap px-5 py-12 sm:py-14">
        <SectionHeading
          eyebrow="Signals"
          title="Signals preview (education-first)"
          subtitle="Examples only. You’re meant to verify every setup on your own chart."
        />
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-sm">
              <thead className="border-b border-sky-400/10 bg-slate-950/30">
                <tr className="text-slate-200">
                  {["Coin", "Entry", "Target", "Stop loss", "Status"].map((h) => (
                    <th key={h} className="px-5 py-4 font-extrabold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-slate-200">
                {[
                  { coin: "BTC", entry: "66,200", target: "67,800", sl: "65,400", status: "Active" },
                  { coin: "ETH", entry: "3,240", target: "3,340", sl: "3,170", status: "Waiting" },
                  { coin: "SOL", entry: "148.0", target: "156.0", sl: "143.5", status: "Active" },
                ].map((r) => (
                  <tr key={r.coin} className="border-b border-sky-400/10">
                    <td className="px-5 py-4 font-extrabold text-white">{r.coin}</td>
                    <td className="px-5 py-4">{r.entry}</td>
                    <td className="px-5 py-4">{r.target}</td>
                    <td className="px-5 py-4">{r.sl}</td>
                    <td className="px-5 py-4">
                      <span
                        className={[
                          "inline-flex rounded-full border px-3 py-1 text-xs font-extrabold",
                          r.status === "Active"
                            ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
                            : "border-slate-400/20 bg-slate-900/40 text-slate-200",
                        ].join(" ")}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t border-sky-400/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-300">
              Unlock signals and manage access from your dashboard.
            </p>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-full border border-sky-400/25 bg-slate-950/25 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-slate-900/35"
            >
              Unlock Signals
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* SECTION 7: TOOLS */}
      <section className="rh-wrap px-5 py-12 sm:py-14">
        <SectionHeading
          eyebrow="Tools"
          title="Risk-first calculators"
          subtitle="Lightweight tools built for learning and execution discipline."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Risk Calculator", href: "/tools/risk", desc: "Set risk per trade and avoid oversized positions." },
            { title: "Position Size Calculator", href: "/tools/position-size", desc: "Compute size from entry, stop, and risk." },
            { title: "Trade Journal", href: "/dashboard", desc: "Review performance inside your learning dashboard." },
          ].map((c) => (
            <Link key={c.title} href={c.href} className="block">
              <GlassCard className="p-6">
                <h3 className="text-lg font-extrabold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{c.desc}</p>
                <p className="mt-4 text-sm font-extrabold text-sky-300">Open →</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="rh-wrap px-5 py-12 sm:py-14">
        <SectionHeading
          eyebrow="Testimonials"
          title="What learners say"
          subtitle="Real learning is about clarity and consistency—not promises."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { name: "Adeel", text: "The course explains structure and risk in a way that finally makes sense. The dashboard keeps me focused." },
            { name: "Hira", text: "Signals are written clearly. I learned to verify setups myself instead of blindly copying." },
            { name: "Usman", text: "The tools helped me control position size. My trades are calmer and more planned now." },
          ].map((t) => (
            <GlassCard key={t.name} className="p-6">
              <p className="text-sm leading-7 text-slate-200">“{t.text}”</p>
              <p className="mt-4 text-sm font-extrabold text-white">{t.name}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION 9: PRICING */}
      <section className="rh-wrap px-5 py-12 sm:py-14">
        <SectionHeading
          eyebrow="Pricing"
          title="Choose the plan that fits your learning pace"
          subtitle="Basic for getting started. Premium for the full course + signals workflow."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <GlassCard className="p-6">
            <h3 className="text-lg font-extrabold text-white">Basic</h3>
            <p className="mt-1 text-sm text-slate-300">Core curriculum + dashboard access.</p>
            <p className="mt-4 text-3xl font-extrabold text-white">$20</p>
            <p className="text-sm text-slate-500">per month</p>
            <Link href="/plans" className="mt-6 inline-flex rounded-full border border-sky-400/25 bg-slate-950/25 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-slate-900/35">
              View Basic
            </Link>
          </GlassCard>
          <GlassCard className="p-6 border-sky-400/30 shadow-[0_0_80px_rgba(56,189,248,0.14)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-extrabold text-white">Premium</h3>
              <span className="rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs font-extrabold text-sky-200">
                Recommended
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-300">Full curriculum + signals + mentorship workflow.</p>
            <p className="mt-4 text-3xl font-extrabold text-white">$140</p>
            <p className="text-sm text-slate-500">one-time</p>
            <Link href="/plans" className="mt-6 inline-flex rounded-full bg-[color:var(--rh-accent)] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[color:var(--rh-accent-bright)]">
              Highlight Premium
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="rh-wrap px-5 pb-14 sm:pb-20">
        <GlassCard className="p-7 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Start Your Trading Journey Today
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
                Learn with structure, practice with tools, and execute with rules—built for real market conditions.
              </p>
            </div>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--rh-accent)] px-8 py-3.5 text-base font-extrabold text-white transition hover:bg-[color:var(--rh-accent-bright)]"
            >
              Start now
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

