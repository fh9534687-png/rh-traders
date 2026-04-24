import Link from "next/link";
import Image from "next/image";
import { FaqCardThumbnail } from "../components/FaqCardThumbnail";
import { faqItems } from "../../data/faqData";

export const metadata = {
  title: "Crypto Trading FAQ and Learning Guides",
  description:
    "Find clear answers to common questions about crypto trading, exchanges, charts, and risk. RH Traders FAQ supports our crypto trading course and helps you learn trading online with confidence.",
};

export default function FaqPage() {
  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,140,0,0.06),transparent_58%)]" />

      <div className="rh-wrap relative">
        <header className="mx-auto max-w-[1280px] text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--rh-border-red)]">
            Guides
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
            Crypto trading FAQ
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
            These guides explain core concepts you will use inside the RH Traders learning dashboard, from reading charts
            to managing risk. Choose a topic below to support your course progress.
          </p>
        </header>

        <section className="mx-auto mt-12 grid max-w-[1280px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {faqItems.map((item, idx) => {
            const isTop = idx < 3;
            const cardClass = isTop
              ? [
                  "group flex flex-col overflow-hidden",
                  "rounded-[28px] border-2 border-[#03045e]/60",
                  "bg-[linear-gradient(180deg,rgba(202,240,248,0.16),rgba(2,6,23,0.88))]",
                  "shadow-[0_0_0_1px_rgba(202,240,248,0.15),0_0_60px_rgba(72,202,228,0.14),0_26px_70px_-36px_rgba(2,6,23,0.9)]",
                  "transition duration-300 hover:-translate-y-1",
                  "hover:border-[#00b4d8]/70 hover:shadow-[0_0_0_1px_rgba(202,240,248,0.18),0_0_80px_rgba(72,202,228,0.18),0_30px_80px_-36px_rgba(2,6,23,0.92)]",
                ].join(" ")
              : "group flex flex-col overflow-hidden rounded-2xl border border-sky-400/35 bg-slate-900/70 shadow-[0_0_28px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-[0_0_36px_rgba(37,99,235,0.15)]";

            const heroClass = isTop
              ? "relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[#caf0f8]/10"
              : "relative aspect-[2.15/1] w-full shrink-0 overflow-hidden bg-slate-950/80";

            const bodyClass = isTop
              ? "flex flex-1 flex-col border-t border-[#03045e]/35 bg-slate-950/55 px-6 py-6 sm:px-7"
              : "flex flex-1 flex-col border-t border-slate-800/80 bg-[#0a0f18] px-5 py-4 sm:px-6 sm:py-5";

            return (
            <Link
              key={item.slug}
              href={`/faq/${item.slug}`}
                className={cardClass}
            >
              {/* Landscape hero: wider than tall (~2.15:1) */}
                <div className={heroClass}>
                  {item.image ? (
                    <>
                      <Image
                        src={item.image}
                        alt={`${item.title} guide`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover object-center"
                        priority={idx < 3}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent opacity-70" />
                    </>
                  ) : (
                    <>
                      <FaqCardThumbnail
                        variant={item.thumbVariant}
                        title={item.title}
                        className="absolute inset-0 h-full w-full [shape-rendering:geometricPrecision]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent opacity-70" />
                    </>
                  )}
                </div>

                <div className={bodyClass}>
                  <h2
                    className={[
                      "text-left font-bold leading-snug tracking-tight text-white",
                      isTop ? "text-[17px] sm:text-lg" : "text-[15px] sm:text-base",
                    ].join(" ")}
                  >
                    {item.title}
                  </h2>
                  <p className={isTop ? "mt-3 text-left text-sm font-medium text-white/80" : "mt-3 text-left text-xs font-medium text-slate-500"}>
                    RH Traders{" "}
                    <span className={isTop ? "text-white/60" : "text-slate-600"} aria-hidden>
                      |
                    </span>{" "}
                    <time dateTime="2026-04-12">Apr 12, 2026</time>
                  </p>
                </div>
            </Link>
            );
          })}
        </section>

        <div className="mx-auto mt-16 flex max-w-[1280px] flex-col items-center gap-3 text-center">
          <p className="text-sm text-slate-500">Want help choosing a plan?</p>
          <Link
            href="/plans"
            className="rh-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-extrabold text-white"
          >
            View Plans
          </Link>
        </div>
      </div>
    </main>
  );
}
