"use client";

import { useEffect, useMemo, useState } from "react";

export type MarketRow = {
  id: string;
  symbol: string;
  name: string;
  image?: string;
  current_price?: number;
  total_volume?: number;
  market_cap?: number;
  price_change_percentage_24h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
};

type ApiResponse = {
  updatedAt?: number;
  rows?: MarketRow[];
  error?: string;
};

export function useCoinGeckoMarkets({
  refreshMs = 45000,
}: {
  refreshMs?: number;
}) {
  const [rows, setRows] = useState<MarketRow[] | null>(null);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load(signal?: AbortSignal) {
    try {
      setError(null);
      const res = await fetch("/api/market/coins", { cache: "no-store", signal });
      const json = (await res.json()) as ApiResponse;
      if (!res.ok) {
        throw new Error(json.error || "Failed to load market data");
      }
      setRows(Array.isArray(json.rows) ? json.rows : []);
      setUpdatedAt(typeof json.updatedAt === "number" ? json.updatedAt : Date.now());
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : "Failed to load market data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const ac = new AbortController();
    void load(ac.signal);
    const id = window.setInterval(() => void load(), refreshMs);
    return () => {
      ac.abort();
      window.clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshMs]);

  const safeRows = useMemo(() => rows ?? [], [rows]);

  return {
    rows: safeRows,
    updatedAt,
    loading,
    error,
    refresh: () => void load(),
  };
}

