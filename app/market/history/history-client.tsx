"use client";

import { useMemo, useState } from "react";
import { MarketMoversTable } from "../components/MarketMoversTable";

type Timeframe = "24h" | "7d" | "30d";

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-extrabold transition",
        active
          ? "border-white/20 bg-white/10 text-white"
          : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/8 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function MarketHistoryClient() {
  const [tf, setTf] = useState<Timeframe>("24h");

  const subtitle = useMemo(() => {
    if (tf === "24h") return "Short-term momentum (24 hours)";
    if (tf === "7d") return "Weekly momentum (7 days)";
    return "Monthly momentum (30 days)";
  }, [tf]);

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-4 rounded-[2.25rem] border border-white/10 bg-white/5 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div className="min-w-0">
          <p className="text-xs font-extrabold tracking-[0.22em] text-slate-400">
            TIMEFRAME
          </p>
          <p className="mt-2 text-lg font-extrabold text-white">{subtitle}</p>
          <p className="mt-1 text-sm text-slate-300">
            Pick a timeframe, then compare gainers vs losers.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterButton active={tf === "24h"} onClick={() => setTf("24h")}>
            24h
          </FilterButton>
          <FilterButton active={tf === "7d"} onClick={() => setTf("7d")}>
            7d
          </FilterButton>
          <FilterButton active={tf === "30d"} onClick={() => setTf("30d")}>
            30d
          </FilterButton>
        </div>
      </div>

      <MarketMoversTable
        mode="gainers"
        title={`Top gainers (${tf})`}
        timeframe={tf}
        limit={15}
      />

      <MarketMoversTable
        mode="losers"
        title={`Top losers (${tf})`}
        timeframe={tf}
        limit={15}
      />
    </section>
  );
}

