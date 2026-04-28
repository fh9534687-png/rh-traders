import { NextResponse } from "next/server";

export const runtime = "edge";

type CoinGeckoMarketRow = {
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

export async function GET() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd" +
    "&order=market_cap_desc" +
    "&per_page=50" +
    "&page=1" +
    "&price_change_percentage=24h,7d,30d";

  const res = await fetch(url, {
    headers: { accept: "application/json" },
    // Cache on the server; clients still poll for fresh.
    next: { revalidate: 45 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch CoinGecko markets" },
      { status: 502 },
    );
  }

  const rows = (await res.json()) as CoinGeckoMarketRow[];
  if (!Array.isArray(rows)) {
    return NextResponse.json(
      { error: "Unexpected CoinGecko response" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    updatedAt: Date.now(),
    rows,
  });
}

