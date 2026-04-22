import Link from "next/link";
import { LogoutButton } from "../../components/LogoutButton";
import { CourseLectures } from "./CourseLectures";

type Tier = "basic" | "premium";

const PLAN_LABEL: Record<Tier, string> = {
  basic: "Basic Plan",
  premium: "Premium Plan",
};


function formatEnrolled(enrolledRaw: string) {
  const t = Number(enrolledRaw);
  if (!Number.isFinite(t) || t <= 0) return "—";
  try {
    return new Date(t).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return "—";
  }
}

export function CourseDashboard({
  tier,
  email,
  first,
  last,
  enrolledRaw,
}: {
  tier: Tier;
  email: string;
  first: string;
  last: string;
  enrolledRaw: string;
}) {
  const fullName = [first, last].map((s) => s.trim()).filter(Boolean).join(" ");
  const planLabel = PLAN_LABEL[tier];

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-7 sm:py-9">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(37,99,235,0.14),transparent_55%)]" />
      <div className="rh-wrap relative max-w-[1280px]">
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
                { label: "My Courses", href: `/dashboard/${tier}` },
                { label: "My Plan", href: `/dashboard/${tier}/plan` },
                { label: "Profile", href: "/profile" },
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
                <LogoutButton className="w-full rounded-2xl border border-[color:var(--rh-red)]/40 bg-[color:var(--rh-red)]/10 px-4 py-3 text-left text-sm font-extrabold text-white transition hover:border-[color:var(--rh-red-hover)]/60 hover:bg-[color:var(--rh-red)]/14" />
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
                  {fullName ? (
                    <>
                      <span className="font-extrabold text-white">{fullName}</span>, your
                      learning dashboard is ready.
                    </>
                  ) : (
                    <>Your learning dashboard is ready.</>
                  )}
                </p>
              </div>

              <div className="mt-3 w-full max-w-none rounded-3xl border border-sky-400/15 bg-slate-950/30 p-4 sm:mt-0 sm:max-w-[340px]">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  Account
                </p>
                <div className="mt-3 grid gap-2 text-sm">
                  <p className="text-slate-200">
                    <span className="text-slate-400">Name:</span>{" "}
                    <span className="font-semibold text-white">{fullName || "—"}</span>
                  </p>
                  <p className="text-slate-200">
                    <span className="text-slate-400">Email:</span>{" "}
                    <span className="font-semibold text-white">{email}</span>
                  </p>
                  <p className="text-slate-200">
                    <span className="text-slate-400">Enrolled:</span>{" "}
                    <span className="font-semibold text-white">
                      {formatEnrolled(enrolledRaw)}
                    </span>
                  </p>
                </div>
              </div>
            </header>

            <div className="mt-6">
              <CourseLectures tier={tier} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

