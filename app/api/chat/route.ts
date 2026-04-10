export const runtime = "nodejs";

function buildLocalReply(message: string) {
  const text = message.toLowerCase();

  const hits = {
    crypto: text.includes("crypto"),
    bitcoin: text.includes("bitcoin"),
    trading: text.includes("trading"),
    chart: text.includes("chart"),
  };

  const parts: string[] = [];

  if (hits.crypto) {
    parts.push(
      [
        "Crypto (cryptocurrency) is a form of digital money that runs on blockchains.",
        "A blockchain is a shared ledger that records transactions in a way that’s hard to tamper with.",
        "Most crypto projects use tokens to power networks (payments, apps, ownership, governance).",
        "Key ideas: wallets & private keys (ownership), supply (scarcity), and network utility (demand).",
      ].join(" "),
    );
  }

  if (hits.bitcoin) {
    parts.push(
      [
        "Bitcoin is the first and most widely known cryptocurrency.",
        "It’s designed to be scarce: the supply is capped at 21 million BTC.",
        "Transactions are validated by miners (proof-of-work), which helps secure the network.",
        "People value Bitcoin for its decentralization, predictable supply, and global portability.",
      ].join(" "),
    );
  }

  if (hits.trading) {
    parts.push(
      [
        "Trading is the practice of buying and selling assets to manage risk and pursue profit.",
        "A solid trading process usually includes: a thesis, entry criteria, invalidation, and position sizing.",
        "Risk management matters more than predictions—many traders focus on keeping losses small and consistent.",
        "Common pitfalls: over-leverage, revenge trading, and ignoring your stop/exit plan.",
      ].join(" "),
    );
  }

  if (hits.chart) {
    parts.push(
      [
        "Charts visualize price over time to help you understand trends and market behavior.",
        "Common chart types include line charts and candlesticks (open/high/low/close).",
        "Basic tools: support/resistance (key levels), trendlines, and moving averages (smoothing).",
        "A useful habit is to mark levels first, then look for confirmation rather than guessing every move.",
      ].join(" "),
    );
  }

  if (parts.length === 0) {
    return "I'm still learning. Please ask about crypto, trading, or charts.";
  }

  return parts.join("\n\n");
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { message?: unknown }
    | null;

  const message = typeof body?.message === "string" ? body.message : "";
  if (!message.trim()) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  const reply = buildLocalReply(message);
  return Response.json({ reply });
}

