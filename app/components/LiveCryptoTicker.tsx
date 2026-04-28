"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type CoinRow = {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  current_price?: number;
  price_change_percentage_24h_in_currency?: number;
};

type ApiResponse = {
  updatedAt: number;
  rows: CoinRow[];
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function pct(n: number) {
  const s = Math.abs(n).toFixed(2);
  return `${n >= 0 ? "+" : "-"}${s}%`;
}

export function LiveCryptoTicker() {
  const [rows, setRows] = useState<CoinRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setError(null);
        const res = await fetch("/api/market/coins", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load prices");
        const data = (await res.json()) as ApiResponse;
        if (!mounted) return;
        setRows(Array.isArray(data?.rows) ? data.rows : []);
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Failed to load prices");
        setRows([]);
      }
    }

    load();
    const t = window.setInterval(load, 30_000);
    return () => {
      mounted = false;
      window.clearInterval(t);
    };
  }, []);

  const coins = useMemo(() => {
    const list = rows ?? [];
    const byId = new Map(list.map((c) => [c.id, c]));
    const wanted = ["bitcoin", "ethereum"];
    const out: CoinRow[] = [];

    for (const id of wanted) {
      const c = byId.get(id);
      if (c) out.push(c);
    }

    for (const c of list) {
      if (out.length >= 12) break;
      if (wanted.includes(c.id)) continue;
      out.push(c);
    }

    return out;
  }, [rows]);

  const track = coins.length ? [...coins, ...coins] : [];

  return (
    <section aria-label="Live crypto ticker" className="mt-2">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/25 shadow-[0_0_90px_rgba(59,130,246,0.12)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 px-6 py-5 sm:px-7 sm:py-6">
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Live prices
            </p>
            <p className="mt-1 text-[15px] font-extrabold leading-6 text-white">
              BTC, ETH, and top coins — updated every 30 seconds
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(34,197,94,0.45)]" />
            <span className="text-xs font-semibold text-slate-400">
              {error ? "offline" : "live"}
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden border-t border-white/10 px-2 py-4 sm:py-5">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020617] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#020617] to-transparent"
            aria-hidden
          />

          <div className="rh-marquee">
            <div className="rh-marquee__track">
              {track.map((c, idx) => {
                const change = c.price_change_percentage_24h_in_currency ?? 0;
                const up = change >= 0;
                const price = c.current_price ?? 0;
                return (
                  <div
                    key={`${c.id}-${idx}`}
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#070c15]/70 px-5 py-3.5 shadow-[0_10px_30px_rgba(2,6,23,0.35)] backdrop-blur-md transition hover:border-sky-300/25 hover:shadow-[0_0_70px_rgba(56,189,248,0.10)]"
                  >
                    <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                      {c.image ? (
                        <Image
                          src={c.image}
                          alt={`${c.name} logo`}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-white">
                        {c.symbol?.toUpperCase() || c.name}
                      </p>
                      <p className="text-xs font-semibold text-slate-400">
                        {money.format(price)}
                      </p>
                    </div>
                    <span
                      className={[
                        "ml-2 inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-extrabold",
                        up
                          ? "border-emerald-300/25 bg-emerald-500/10 text-emerald-200"
                          : "border-rose-300/25 bg-rose-500/10 text-rose-200",
                      ].join(" ")}
                    >
                      {pct(change)}
                    </span>
                  </div>
                );
              })}

              {!track.length ? (
                <div className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400">
                  {error ? "Failed to load prices." : "Loading prices…"}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

