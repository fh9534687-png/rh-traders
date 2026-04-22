import Link from "next/link";
import { LifetimeLectures } from "../../components/LifetimeLectures";

export default function DashboardPreviewPage() {
  const email = "trader@example.com";
  const planLabel = "Pro Course";
  const fullName = "Alex Johnson";
  const enrolledDate = "Apr 15, 2026";

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-7 sm:py-9">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(37,99,235,0.14),transparent_55%)]" />
      <div className="rh-wrap relative max-w-[1280px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-slate-950/40 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
            PREVIEW
          </p>
          <Link
            href="/"
            className="text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            Back home →
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="overflow-hidden rounded-3xl border border-sky-400/25 bg-slate-900/55 shadow-[0_0_40px_rgba(37,99,235,0.12)] backdrop-blur-sm">
            <div className="p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Dashboard
              </p>
              <p className="mt-2 text-sm font-extrabold text-white">{planLabel}</p>
              <p className="mt-1 text-xs text-slate-400">{email}</p>
            </div>

            <nav className="border-t border-sky-400/15 p-3">
              {[
                { label: "My Courses", href: "/dashboard/preview" },
                { label: "Signals", href: "/signals/how-signals-work" },
                { label: "Profile", href: "/dashboard/preview#profile" },
              ].map((i) => (
                <Link
                  key={i.label}
                  href={i.href}
                  className="block rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-950/50 hover:text-white"
                >
                  {i.label}
                </Link>
              ))}

              <div className="mt-2 px-1">
                <button
                  type="button"
                  className="w-full rounded-2xl border border-[color:var(--rh-red)]/40 bg-[color:var(--rh-red)]/10 px-4 py-3 text-left text-sm font-extrabold text-white transition hover:border-[color:var(--rh-red-hover)]/60 hover:bg-[color:var(--rh-red)]/14"
                >
                  Logout
                </button>
              </div>
            </nav>
          </aside>

          <section className="overflow-hidden rounded-3xl border border-sky-400/25 bg-slate-900/45 p-6 shadow-[0_0_60px_rgba(37,99,235,0.10)] backdrop-blur-sm sm:p-8">
            <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Welcome back
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-200">
                  <span className="font-extrabold text-white">{fullName}</span>, your
                  learning area is unlocked. Stay consistent, manage risk, and build
                  skill with structured lectures.
                </p>
              </div>

              <div className="mt-3 w-full max-w-none rounded-3xl border border-sky-400/15 bg-slate-950/30 p-4 sm:mt-0 sm:max-w-[340px]">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  Account
                </p>
                <div className="mt-3 grid gap-2 text-sm">
                  <p className="text-slate-200">
                    <span className="text-slate-400">Name:</span>{" "}
                    <span className="font-semibold text-white">{fullName}</span>
                  </p>
                  <p className="text-slate-200">
                    <span className="text-slate-400">Email:</span>{" "}
                    <span className="font-semibold text-white">{email}</span>
                  </p>
                  <p className="text-slate-200">
                    <span className="text-slate-400">Enrolled:</span>{" "}
                    <span className="font-semibold text-white">{enrolledDate}</span>
                  </p>
                </div>
              </div>
            </header>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-sky-400/20 bg-slate-950/40 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  Unlocked course
                </p>
                <p className="mt-2 text-lg font-extrabold text-white">{planLabel}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Placeholder for the course curriculum. Next: real video lectures
                  + progress tracking.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-slate-200">
                  {[
                    "Market structure & trends",
                    "Support / resistance basics",
                    "Risk management and sizing",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-0.5 h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-sky-400/20 bg-slate-950/40 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  Video lectures
                </p>
                <p className="mt-2 text-lg font-extrabold text-white">Coming soon</p>
                <div className="mt-4 grid gap-3">
                  {["Lecture 1: Intro", "Lecture 2: Candles", "Lecture 3: Risk"].map(
                    (t) => (
                      <div
                        key={t}
                        className="flex items-center justify-between rounded-2xl border border-sky-400/15 bg-slate-900/40 px-4 py-3"
                      >
                        <span className="text-sm font-semibold text-slate-200">
                          {t}
                        </span>
                        <span className="text-xs font-extrabold text-slate-500">
                          Placeholder
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <LifetimeLectures />
            </div>

            <div
              id="profile"
              className="mt-6 rounded-3xl border border-sky-400/15 bg-slate-950/30 p-5"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Profile
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Email: <span className="font-semibold text-white">{email}</span>
              </p>
              <p className="mt-1 text-sm text-slate-400">
                This is a design preview page.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

