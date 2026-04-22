import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,140,0,0.06),transparent_58%)]" />

      <div className="rh-wrap relative">
        <header className="mx-auto max-w-[860px] text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-base text-slate-400 sm:text-lg">
            Reach us for support, plan questions, and partnership requests.
          </p>
        </header>

        <section className="mx-auto mt-10 grid max-w-[980px] gap-6 md:grid-cols-2">
          <div className="rh-card rounded-3xl p-7">
            <p className="text-xs font-extrabold tracking-[0.18em] text-slate-500">
              EMAIL
            </p>
            <a
              href="mailto:hello@rhtraders.com"
              className="mt-3 inline-flex text-lg font-extrabold text-white transition hover:text-[color:var(--rh-border-red)]"
            >
              hello@rhtraders.com
            </a>
            <p className="mt-3 leading-8 text-slate-400">
              Typical response time: within 24 hours (weekdays).
            </p>
          </div>

          <div className="rh-card rounded-3xl p-7">
            <p className="text-xs font-extrabold tracking-[0.18em] text-slate-500">
              NEXT STEPS
            </p>
            <p className="mt-3 leading-8 text-slate-400">
              If you’re ready to get started, choose a plan and unlock your
              dashboard access.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/plans"
                className="rh-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-extrabold text-white"
              >
                View Plans
              </Link>
              <Link
                href="/auth"
                className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-extrabold"
              >
                Join Now
              </Link>
            </div>
          </div>
        </section>

        <p className="mx-auto mt-10 max-w-[980px] text-center text-sm text-slate-500">
          Secure payment and lifetime access to your dashboard
        </p>
      </div>
    </main>
  );
}
