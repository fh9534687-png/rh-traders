"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useCoinGeckoMarkets, type MarketRow } from "./useCoinGeckoMarkets";

type Mode = "gainers" | "losers";
type Timeframe = "24h" | "7d" | "30d";

function fmtMoney(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n >= 1000 ? 0 : 2,
  }).format(n);
}

function fmtNumber(n: number) {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(n);
}

function fmtPct(n: number) {
  const v = Math.round(n * 100) / 100;
  return `${v >= 0 ? "+" : ""}${v}%`;
}

function pctClass(v: number | undefined) {
  if (typeof v !== "number") return "text-slate-300";
  if (v > 0) return "text-emerald-300";
  if (v < 0) return "text-red-300";
  return "text-slate-300";
}

function getPct(row: MarketRow, tf: Timeframe) {
  if (tf === "24h") return row.price_change_percentage_24h_in_currency;
  if (tf === "7d") return row.price_change_percentage_7d_in_currency;
  return row.price_change_percentage_30d_in_currency;
}

function SkeletonRow({ idx }: { idx: number }) {
  return (
    <tr className="border-b border-white/10" aria-hidden>
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/10" />
          <div className="space-y-2">
            <div className="h-3 w-32 rounded bg-white/10" />
            <div className="h-3 w-16 rounded bg-white/10" />
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-20 rounded bg-white/10" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-16 rounded bg-white/10" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-16 rounded bg-white/10" />
      </td>
      <td className="px-5 py-4">
        <div className="h-3 w-24 rounded bg-white/10" />
      </td>
      <td className="hidden px-5 py-4 lg:table-cell">
        <div className="h-3 w-24 rounded bg-white/10" />
      </td>
    </tr>
  );
}

export function MarketMoversTable({
  mode,
  title,
  timeframe = "24h",
  limit = 15,
}: {
  mode: Mode;
  title: string;
  timeframe?: Timeframe;
  limit?: number;
}) {
  const { rows, loading, error, updatedAt, refresh } = useCoinGeckoMarkets({
    refreshMs: 45000,
  });

  const sorted = useMemo(() => {
    const next = [...rows];
    next.sort((a, b) => {
      const av = getPct(a, timeframe);
      const bv = getPct(b, timeframe);
      const aNum = typeof av === "number" ? av : -Infinity;
      const bNum = typeof bv === "number" ? bv : -Infinity;
      return mode === "gainers" ? bNum - aNum : aNum - bNum;
    });
    return next.slice(0, Math.max(5, limit));
  }, [rows, mode, timeframe, limit]);

  return (
    <section className="mt-10 rounded-[2.25rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-md">
      <div className="flex flex-col gap-3 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-extrabold tracking-[0.22em] text-slate-400">
            LIVE MARKET DATA
          </p>
          <h2 className="mt-1 text-lg font-extrabold text-white">{title}</h2>
          <p className="mt-1 text-xs text-slate-400">
            Auto refresh: 45s{updatedAt ? ` • Updated: ${new Date(updatedAt).toLocaleTimeString()}` : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={refresh}
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-extrabold text-white transition hover:bg-white/8"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <div className="px-6 py-6 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="min-w-[880px] w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-black/20">
            <tr className="text-slate-200">
              <th className="px-5 py-4 font-extrabold">Coin</th>
              <th className="px-5 py-4 font-extrabold">Price</th>
              <th className="px-5 py-4 font-extrabold">24h %</th>
              <th className="px-5 py-4 font-extrabold">7d %</th>
              <th className="px-5 py-4 font-extrabold">Volume</th>
              <th className="hidden px-5 py-4 font-extrabold lg:table-cell">
                Market cap
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-200">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} idx={i} />)
              : sorted.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-white/10 transition hover:bg-white/5"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white/5">
                          {r.image ? (
                            <Image
                              src={r.image}
                              alt={`${r.name} logo`}
                              fill
                              className="object-cover"
                              sizes="36px"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-extrabold text-white">
                            {r.name}
                          </p>
                          <p className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
                            {r.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-extrabold text-white">
                      {typeof r.current_price === "number" ? fmtMoney(r.current_price) : "—"}
                    </td>
                    <td className={["px-5 py-4 font-extrabold", pctClass(r.price_change_percentage_24h_in_currency)].join(" ")}>
                      {typeof r.price_change_percentage_24h_in_currency === "number"
                        ? fmtPct(r.price_change_percentage_24h_in_currency)
                        : "—"}
                    </td>
                    <td className={["px-5 py-4 font-extrabold", pctClass(r.price_change_percentage_7d_in_currency)].join(" ")}>
                      {typeof r.price_change_percentage_7d_in_currency === "number"
                        ? fmtPct(r.price_change_percentage_7d_in_currency)
                        : "—"}
                    </td>
                    <td className="px-5 py-4 font-extrabold text-slate-200">
                      {typeof r.total_volume === "number" ? `$${fmtNumber(r.total_volume)}` : "—"}
                    </td>
                    <td className="hidden px-5 py-4 font-extrabold text-slate-200 lg:table-cell">
                      {typeof r.market_cap === "number" ? `$${fmtNumber(r.market_cap)}` : "—"}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-5 text-xs text-slate-400">
        Source: CoinGecko • Sorted by {timeframe} change ({mode})
      </div>
    </section>
  );
}

