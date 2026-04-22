"use client";

import Link from "next/link";
import { LogoutButton } from "../../components/LogoutButton";

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

export function CoursePlanDashboard({
  tier,
  email,
  first,
  last,
  enrolledRaw,
  isPaid,
  paymentStatus,
}: {
  tier: Tier;
  email: string;
  first: string;
  last: string;
  enrolledRaw: string;
  isPaid: boolean;
  paymentStatus: string;
}) {
  const fullName = [first, last].map((s) => s.trim()).filter(Boolean).join(" ");
  const planLabel = PLAN_LABEL[tier];

  const paymentLabel =
    paymentStatus === "pending"
      ? "Payment pending review"
      : paymentStatus === "rejected"
        ? "Payment rejected — re-upload proof"
        : paymentStatus === "approved"
          ? "Payment approved"
          : "No manual payment pending";

  const accessLabel = isPaid
    ? "Access: unlocked"
    : paymentStatus === "pending"
      ? "Access: pending review"
      : paymentStatus === "rejected"
        ? "Access: rejected (submit again)"
        : "Access: not unlocked yet";

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
                  className={[
                    "block rounded-2xl px-4 py-2.5 text-sm font-semibold transition",
                    i.label === "My Plan"
                      ? "bg-slate-950/55 text-white"
                      : "text-slate-200 hover:bg-slate-950/50 hover:text-white",
                  ].join(" ")}
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
            <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/25 bg-slate-950/40 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
                  LMS
                </p>
                <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  My Plan
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-200">
                  Your current plan, access status, and next steps.
                </p>
              </div>

              <div className="w-full max-w-none rounded-3xl border border-sky-400/15 bg-slate-950/30 p-4 sm:max-w-[340px]">
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

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-sky-400/20 bg-slate-950/40 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  Current plan
                </p>
                <p className="mt-2 text-xl font-extrabold text-white">{planLabel}</p>
                <p className="mt-2 text-sm text-slate-300">{accessLabel}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/dashboard/${tier}`}
                    className="inline-flex items-center justify-center rounded-full border border-sky-400/25 bg-slate-950/35 px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-slate-900/40"
                  >
                    Open courses →
                  </Link>
                  <Link
                    href="/profile"
                    className="inline-flex items-center justify-center rounded-full border border-sky-400/18 bg-slate-950/25 px-5 py-2.5 text-xs font-extrabold text-slate-200 transition hover:bg-slate-900/35"
                  >
                    Profile →
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-sky-400/20 bg-slate-950/40 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  Payment
                </p>
                <p className="mt-2 text-lg font-extrabold text-white">{paymentLabel}</p>
                <p className="mt-2 text-sm text-slate-300">
                  If your access is not unlocked, submit payment proof and wait for admin review.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/payment/status"
                    className="inline-flex items-center justify-center rounded-full border border-amber-400/25 bg-amber-500/10 px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-amber-500/15"
                  >
                    Payment status →
                  </Link>
                  <Link
                    href="/plans"
                    className="inline-flex items-center justify-center rounded-full border border-sky-400/18 bg-slate-950/25 px-5 py-2.5 text-xs font-extrabold text-slate-200 transition hover:bg-slate-900/35"
                  >
                    View plans →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

