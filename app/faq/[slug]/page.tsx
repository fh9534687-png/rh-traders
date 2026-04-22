import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaqCardThumbnail } from "../../components/FaqCardThumbnail";
import { getFaqBySlug, faqItems } from "../../../data/faqData";
import { FaqArticleForSlug } from "../articles/FaqArticlePages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return faqItems.map((item) => ({ slug: item.slug }));
}

const FAQ_META_DESCRIPTIONS: Record<string, string> = {
  "what-is-crypto-trading":
    "Definition of cryptocurrency trading: trading pairs, venues and order flow, spot vs derivatives at a high level, P&L and fees, and risk basics for RH Academy learners.",
  "how-to-start-crypto-trading-safely":
    "Step-by-step onboarding for crypto trading: security, capital budgeting, smallest live size, journaling, and when to scale exposure.",
  "best-platforms-cex-vs-dex":
    "Compare centralized vs decentralized crypto platforms: custody, liquidity, fees, UX, and how to choose what matches your skill level.",
  "how-to-read-crypto-charts":
    "Read crypto price charts: candle OHLC, timeframe bias, trend vs range, volume context, and how to pair chart work with RH pillars.",
  "spot-vs-futures-vs-margin":
    "Spot, margin, and futures/perps explained: different loss paths, funding and liquidation basics, and a sensible learning order.",
  "why-traders-lose-money":
    "Why active traders fail: sizing, fees, missing invalidations, emotional loops, and process fixes that improve discipline.",
  "best-strategies-for-beginners":
    "Beginner crypto strategies: DCA structure, scheduled review, indicators as context, and habits to avoid early on.",
  "avoid-scams-dyor":
    "Avoid crypto scams with a DYOR checklist: impersonation, contracts, approvals, red-flag language, and containment steps.",
  "complete-beginner-roadmap":
    "A phased crypto learning roadmap from definitions through journaling, small live trading, risk tools, and specialization.",
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getFaqBySlug(slug);
  if (!item) return { title: "FAQ | RH Traders" };
  return {
    title: `${item.title} | RH Traders FAQ`,
    ...(FAQ_META_DESCRIPTIONS[slug] ? { description: FAQ_META_DESCRIPTIONS[slug] } : {}),
  };
}

export default async function FaqArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = getFaqBySlug(slug);
  if (!item) notFound();

  const article = <FaqArticleForSlug slug={slug} item={item} />;
  if (article) return article;

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,140,0,0.06),transparent_58%)]" />

      <article className="rh-wrap relative mx-auto max-w-3xl">
        <Link
          href="/faq"
          className="text-sm font-semibold text-[color:var(--rh-border-red)] hover:text-sky-300"
        >
          ← Back to FAQ
        </Link>

        <h1 className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {item.title}
        </h1>

        <div className="relative mt-8 aspect-[2.15/1] w-full overflow-hidden rounded-2xl border border-sky-400/35 bg-slate-900/60 shadow-[0_0_32px_rgba(37,99,235,0.12)]">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover object-center"
              priority={false}
            />
          ) : (
            <FaqCardThumbnail
              variant={item.thumbVariant}
              title={item.title}
              className="absolute inset-0 h-full w-full [shape-rendering:geometricPrecision]"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent" />
        </div>

        <div className="rh-content mt-10">
          <p>
            <strong>Placeholder content.</strong> This article is coming soon.
            Check back for the full guide covering this topic.
          </p>
          <p>
            In the meantime, explore our{" "}
            <Link href="/charts" className="text-[color:var(--rh-border-red)] hover:underline">
              Charts
            </Link>{" "}
            hub,{" "}
            <Link href="/coins" className="text-[color:var(--rh-border-red)] hover:underline">
              Coins
            </Link>{" "}
            guide, or{" "}
            <Link href="/plans" className="text-[color:var(--rh-border-red)] hover:underline">
              Plans
            </Link>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
