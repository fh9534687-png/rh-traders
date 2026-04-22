import Link from "next/link";
import { cookies } from "next/headers";
import { SelectiveAccessPanelClient } from "../components/SelectiveAccessPanelClient";

const PLAN_LABEL: Record<string, string> = {
  basic: "Basic Course",
  premium: "Pro Course",
  signals: "Signals Dashboard",
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

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("rh_email")?.value ?? "";
  const first = cookieStore.get("rh_first")?.value ?? "";
  const last = cookieStore.get("rh_last")?.value ?? "";
  const fullName = [first, last].map((s) => s.trim()).filter(Boolean).join(" ");
  const enrolledRaw = cookieStore.get("rh_enrolled")?.value ?? "";
  const plan = cookieStore.get("rh_plan")?.value ?? "";
  const planLabel = PLAN_LABEL[plan] ?? "Not selected";
  const paymentStatus = cookieStore.get("rh_payment_status")?.value ?? "none";
  const paymentLabel =
    paymentStatus === "pending"
      ? "Payment pending review"
      : paymentStatus === "rejected"
        ? "Payment rejected — re-upload proof"
        : paymentStatus === "approved"
          ? "Payment approved"
          : "No manual payment pending";

  const isPaid = cookieStore.get("rh_paid")?.value === "1";
  const dashboardHref =
    isPaid && plan ? `/dashboard/${plan}` : plan ? "/payment/status" : "/plans";

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-10 sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(37,99,235,0.14),transparent_55%)]" />
      <div className="rh-wrap relative max-w-[980px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-slate-950/40 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
            PROFILE
          </p>
          <Link
            href={dashboardHref}
            className="text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            {isPaid && plan ? "Visit dashboard →" : plan ? "Payment status →" : "Choose a plan →"}
          </Link>
        </div>

        <section className="overflow-hidden rounded-3xl border border-sky-400/20 bg-slate-900/45 p-6 shadow-[0_0_60px_rgba(37,99,235,0.10)] backdrop-blur-sm sm:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Account details
          </h1>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Your profile and plan details used for dashboard access.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-sky-400/15 bg-slate-950/30 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Name
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {fullName || "—"}
              </p>
            </div>

            <div className="rounded-3xl border border-sky-400/15 bg-slate-950/30 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Email
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{email || "—"}</p>
            </div>

            <div className="rounded-3xl border border-sky-400/15 bg-slate-950/30 p-5 sm:col-span-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Enrolled
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {formatEnrolled(enrolledRaw)}
              </p>
            </div>

            <div className="rounded-3xl border border-sky-400/15 bg-slate-950/30 p-5 sm:col-span-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Current plan
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{planLabel}</p>
              <p className="mt-2 text-sm text-slate-400">
                Need to switch plans? Go to{" "}
                <Link
                  href="/plans"
                  className="font-semibold text-sky-300 hover:text-sky-200"
                >
                  plans
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-sky-400/15 bg-slate-950/30 p-5 sm:col-span-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Manual payment
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{paymentLabel}</p>
              <p className="mt-2 text-sm text-slate-400">
                <Link href="/payment/status" className="font-semibold text-sky-300 hover:text-sky-200">
                  Open payment status
                </Link>{" "}
                for live updates from Firebase.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={dashboardHref}
              className="rh-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-extrabold text-white transition hover:brightness-110"
            >
              {isPaid && plan ? "Visit Dashboard" : plan ? "Payment status" : "Browse plans"}
            </Link>
            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-full border border-sky-400/20 bg-slate-950/30 px-8 py-3 text-sm font-extrabold text-white transition hover:bg-slate-900/40"
            >
              My Plan
            </Link>
          </div>
        </section>

        <div className="mt-5">
          <SelectiveAccessPanelClient />
        </div>
      </div>
    </main>
  );
}

