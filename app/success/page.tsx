import Link from "next/link";

const PLAN_NAME: Record<string, string> = {
  basic: "Basic Course",
  premium: "Premium Course",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) ?? {};
  const rawPlan = sp.plan;
  const planId = (Array.isArray(rawPlan) ? rawPlan[0] : rawPlan) ?? "basic";
  const planName = PLAN_NAME[planId] ?? "Your Plan";

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.10),transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />

      <section className="rh-wrap relative">
        <div className="mx-auto max-w-[760px] overflow-hidden rounded-3xl border border-emerald-400/25 bg-slate-900/60 p-7 shadow-[0_0_60px_rgba(34,197,94,0.12)] backdrop-blur-sm sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-200 shadow-[0_0_24px_rgba(34,197,94,0.18)]">
              <span className="text-xl font-black" aria-hidden>
                ✓
              </span>
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Payment Successful
              </h1>
              <p className="mt-2 text-base leading-8 text-slate-200">
                You unlocked <span className="font-extrabold text-white">{planName}</span>.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Your dashboard is ready. You can start watching lectures and
                following your learning path right away.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="rh-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-extrabold text-white"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/plans"
              className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-extrabold transition"
            >
              View plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

