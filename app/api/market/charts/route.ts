import { NextResponse } from "next/server";

export const runtime = "edge";

type Point = { t: number; v: number };

async function fetchSeries(id: string): Promise<Point[]> {
  const url =
    `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(id)}/market_chart` +
    "?vs_currency=usd&days=1&interval=hourly";
  const res = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch chart data");
  const json = (await res.json()) as { prices?: Array<[number, number]> };
  const raw = Array.isArray(json.prices) ? json.prices : [];
  // Limit points for lightweight charts.
  return raw.slice(-24).map(([t, v]) => ({ t, v }));
}

export async function GET() {
  try {
    const [btc, eth] = await Promise.all([
      fetchSeries("bitcoin"),
      fetchSeries("ethereum"),
    ]);
    return NextResponse.json({ btc, eth });
  } catch {
    return NextResponse.json({ btc: [], eth: [] }, { status: 200 });
  }
}

