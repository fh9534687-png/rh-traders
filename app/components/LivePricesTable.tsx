"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PriceRow = {
  name: string;
  symbol: string;
  priceUsd: number | null;
  change24h: number | null;
  marketCapUsd: number | null;
};

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

function formatCompactUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(n);
}

export function LivePricesTable() {
  const [rows, setRows] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const prevPrices = useRef<Record<string, number | null>>({});

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => a.symbol.localeCompare(b.symbol));
    return copy;
  }, [rows]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/prices", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { rows: PriceRow[] };
        if (cancelled) return;
        setRows(data.rows ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const id = window.setInterval(load, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  function priceMoveClass(symbol: string, price: number | null) {
    const prev = prevPrices.current[symbol];
    prevPrices.current[symbol] = price;
    if (prev == null || price == null) return "text-white";
    if (price > prev) return "text-emerald-400";
    if (price < prev) return "text-rose-400";
    return "text-white";
  }

  return (
    <div className="rh-card overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="rh-table rh-table-premium min-w-full text-left text-base">
          <thead>
            <tr className="text-white">
              {["Coin", "Price", "24h Change", "Market Cap"].map((h) => (
                <th key={h} className="px-5 py-4 font-semibold tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => {
              const change = r.change24h;
              const changeClass =
                change == null
                  ? "text-zinc-300"
                  : change >= 0
                    ? "text-emerald-400"
                    : "text-rose-400";

              return (
                <tr
                  key={r.symbol}
                  className="transition"
                >
                  <td className="px-5 py-4 font-bold text-white">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--rh-red)] shadow-[0_0_18px_rgba(255,26,26,0.35)]" />
                      {r.symbol}
                      <span className="hidden font-medium text-zinc-400 sm:inline">
                        · {r.name}
                      </span>
                    </span>
                  </td>
                  <td
                    className={[
                      "px-5 py-4 font-semibold tabular-nums",
                      priceMoveClass(r.symbol, r.priceUsd),
                    ].join(" ")}
                  >
                    {r.priceUsd == null ? "—" : formatUsd(r.priceUsd)}
                  </td>
                  <td className={["px-5 py-4 font-semibold tabular-nums", changeClass].join(" ")}>
                    {change == null ? "—" : `${change.toFixed(2)}%`}
                  </td>
                  <td className="px-5 py-4 text-white/90 tabular-nums">
                    {r.marketCapUsd == null ? "—" : formatCompactUsd(r.marketCapUsd)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-white/5 px-5 py-4 text-sm text-zinc-300">
        <span>
          {loading ? "Loading live prices…" : "Auto-updates every 30 seconds"}
        </span>
        <span className="text-zinc-500">Data: CoinGecko</span>
      </div>
    </div>
  );
}

