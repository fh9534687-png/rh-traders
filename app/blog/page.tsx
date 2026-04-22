import Link from "next/link";

const posts = [
  {
    title: "Crypto Trading Fundamentals",
    desc: "Understand trend, levels, and the mindset that keeps beginners safe.",
    href: "/pillars/market-trend",
  },
  {
    title: "Crypto Trading for Beginners",
    desc: "A step-by-step learning guide: basics, charts, risk management, and a simple routine.",
    href: "/blog/crypto-trading-for-beginners",
  },
  {
    title: "Support & Resistance (Simple)",
    desc: "How to mark zones that matter and avoid random entries.",
    href: "/pillars/support-resistance",
  },
  {
    title: "Risk Management Rules",
    desc: "Position sizing, stops, and discipline—your long-term edge.",
    href: "/pillars/risk-management",
  },
] as const;

export default function BlogPage() {
  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,140,0,0.06),transparent_58%)]" />

      <div className="rh-wrap relative">
        <header className="mx-auto max-w-[860px] text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Blog
          </h1>
          <p className="mt-3 text-base text-slate-400 sm:text-lg">
            Clean, educational reads—built to improve your trading decisions.
          </p>
        </header>

        <section className="mx-auto mt-10 grid max-w-[980px] gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group rh-card block rounded-3xl p-7 transition hover:-translate-y-1"
            >
              <h2 className="text-xl font-extrabold tracking-tight text-white">
                {p.title}
              </h2>
              <p className="mt-3 leading-8 text-slate-400">{p.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[color:var(--rh-border-red)] transition group-hover:text-sky-300">
                Read <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </section>

        <div className="mx-auto mt-10 flex max-w-[980px] flex-col items-center gap-3 text-center">
          <p className="text-sm text-slate-400">
            Ready to unlock the full course and signals?
          </p>
          <Link
            href="/plans"
            className="rh-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-extrabold text-white"
          >
            Choose a Plan
          </Link>
        </div>
      </div>
    </main>
  );
}
