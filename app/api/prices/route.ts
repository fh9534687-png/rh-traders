import { NextResponse } from "next/server";

export const runtime = "edge";

const COINS = [
  { name: "Bitcoin", symbol: "BTC", id: "bitcoin" },
  { name: "Ethereum", symbol: "ETH", id: "ethereum" },
  { name: "Solana", symbol: "SOL", id: "solana" },
  { name: "XRP", symbol: "XRP", id: "ripple" },
  { name: "Dogecoin", symbol: "DOGE", id: "dogecoin" },
  { name: "Tether", symbol: "USDT", id: "tether" },
] as const;

type ApiCoin = (typeof COINS)[number];

export async function GET() {
  const ids = COINS.map((c) => c.id).join(",");
  const url =
    `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}` +
    "&vs_currencies=usd&include_24hr_change=true&include_market_cap=true";

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
    },
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch prices" },
      { status: 502 },
    );
  }

  const json = (await res.json()) as Record<
    string,
    { usd?: number; usd_market_cap?: number; usd_24h_change?: number }
  >;

  const rows = COINS.map((coin: ApiCoin) => {
    const v = json[coin.id] ?? {};
    return {
      name: coin.name,
      symbol: coin.symbol,
      priceUsd: v.usd ?? null,
      change24h: v.usd_24h_change ?? null,
      marketCapUsd: v.usd_market_cap ?? null,
      updatedAt: Date.now(),
    };
  });

  return NextResponse.json({ rows });
}

