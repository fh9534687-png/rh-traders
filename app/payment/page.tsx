"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type Auth } from "firebase/auth";
import { setRhPaymentStatus, setRhPlan } from "../lib/rhEntitlements";
import { getFirebaseAuth } from "../lib/firebase/auth";
import { savePayment, type Plan } from "../lib/firebase/db";

function getCookie(name: string) {
  const key = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const hit = parts.find((p) => p.startsWith(key));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(key.length));
}

const inputClass =
  "w-full rounded-[12px] border-2 border-sky-500/35 bg-slate-950/85 px-4 py-3 text-[16px] text-white placeholder:text-slate-400 outline-none transition " +
  "focus:border-sky-400/70 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.20)]";

const cardClass =
  "rounded-3xl border-2 border-sky-400/30 bg-slate-950/55 p-7 shadow-[0_0_70px_rgba(56,189,248,0.14),0_28px_70px_-32px_rgba(2,6,23,0.85)] backdrop-blur-sm sm:p-10";

type RhPlanId = "basic" | "premium" | "signals";

const PLAN_LABEL: Record<RhPlanId, string> = {
  basic: "Basic Course",
  premium: "Pro Course",
  signals: "Signals Dashboard",
};

function mustAuth(): Auth {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* environment variables (Vercel + .env.local).",
    );
  }
  return auth;
}

export default function ManualPaymentPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [authEmail, setAuthEmail] = useState<string>("");
  const [plan, setPlan] = useState<RhPlanId>("basic");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [trxId, setTrxId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"JazzCash" | "EasyPaisa" | "Bank">("EasyPaisa");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const didPrefillName = useRef(false);

  useEffect(() => {
    if (!getFirebaseAuth()) {
      router.replace("/auth?next=/payment");
      return;
    }

    const auth = mustAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u?.email) {
        router.replace("/auth?next=/payment");
        return;
      }
      const e = u.email.trim().toLowerCase();
      setAuthEmail(e);
      setEmail(e);
      const display = (u.displayName ?? "").trim();
      if (display && !didPrefillName.current) {
        didPrefillName.current = true;
        setName((prev) => (prev.trim() ? prev : display));
      }
      setAuthReady(true);
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    const planCookie = getCookie("rh_plan");
    if (planCookie === "basic" || planCookie === "premium" || planCookie === "signals")
      setPlan(planCookie);

    const emailCookie = getCookie("rh_email");
    if (emailCookie) setEmail((e) => e || emailCookie);
  }, []);

  const planTitle = useMemo(() => PLAN_LABEL[plan], [plan]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const auth = mustAuth();
    await auth.authStateReady();
    const u = auth.currentUser;
    if (!u?.email) {
      setError("You must be signed in to submit a payment.");
      router.replace("/auth?next=/payment");
      return;
    }

    if (!name.trim()) return setError("Name is required.");
    if (!email.trim()) return setError("Email is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setError("Enter a valid email address.");
    if (email.trim().toLowerCase() !== u.email.trim().toLowerCase()) {
      return setError("Email must match the account you are signed in with.");
    }
    if (!whatsapp.trim()) return setError("WhatsApp number is required.");
    if (!trxId.trim()) return setError("Transaction ID is required.");
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) return setError("Amount is required.");

    setSubmitting(true);
    try {
      // Ensure the RTDB client has a fresh auth token before writing (prevents transient "permission denied").
      await u.getIdToken(true);
      await savePayment(
        email.trim().toLowerCase(),
        {
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          trxId: trxId.trim(),
          amount: amt,
          method,
        },
        "pending",
        plan as Plan,
        u.uid,
      );

      setDone(true);
      setRhPlan(plan);
      setRhPaymentStatus("pending");
      setTimeout(() => router.push("/payment/status"), 650);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to submit request.";
      if (typeof msg === "string" && msg.toLowerCase().includes("permission")) {
        setError(
          "Permission denied by Firebase. This usually means your Firebase Auth session is not active in this browser " +
            "(incognito/new profile) or RTDB rules are not published. Please log out, log in again, refresh, then try.",
        );
      } else {
        setError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-10 sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_-10%,rgba(255,140,0,0.10),transparent_55%)]" />
      <div className="rh-wrap relative max-w-[1100px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/plans"
            className="text-base font-semibold text-white/90 transition hover:text-white"
          >
            ← Back to plans
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/payment/status"
              className="rounded-full border-2 border-sky-400/30 bg-slate-950/40 px-4 py-1.5 text-sm font-extrabold text-sky-100 transition hover:border-sky-400/50 hover:bg-slate-900/50"
            >
              Payment status
            </Link>
            <p className="rounded-full border-2 border-sky-400/25 bg-slate-950/35 px-4 py-1.5 text-sm font-extrabold text-white">
              Manual payment (PK)
            </p>
          </div>
        </div>

        {!authReady ? (
          <div className="flex min-h-[40vh] items-center justify-center rounded-3xl border-2 border-sky-400/20 bg-slate-950/50 p-12">
            <p className="text-sm font-semibold text-slate-400">Checking your session…</p>
          </div>
        ) : null}

        <div className={`grid gap-6 lg:grid-cols-[1.2fr_0.8fr] ${!authReady ? "hidden" : ""}`}>
          <section className={cardClass}>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Manual Payment (Pakistan) — EasyPaisa / JazzCash / Meezan Bank
            </h1>
            <p className="mt-3 text-base leading-8 text-white/90">
              Send payment to any method below, then submit your transaction details for manual verification.
              Once approved, your dashboard unlocks automatically.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border-2 border-sky-400/22 bg-slate-950/45 p-6">
                <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
                  You selected
                </p>
                <p className="mt-2 text-lg font-extrabold text-white">
                  {planTitle}
                </p>
                <p className="mt-2 text-base text-white/85">
                  Keep your transaction ID ready.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border-2 border-sky-400/22 bg-slate-950/35 p-6">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
                Send payment to the following details
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-3xl border-2 border-sky-400/22 bg-slate-950/45 p-6">
                  <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
                    EasyPaisa
                  </p>
                  <p className="mt-2 text-base font-extrabold text-white">
                    03495357142
                  </p>
                  <p className="mt-1 text-sm text-white/85">Name: Muhammad Haseeb</p>
                </div>
                <div className="rounded-3xl border-2 border-sky-400/22 bg-slate-950/45 p-6">
                  <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
                    JazzCash
                  </p>
                  <p className="mt-2 text-base font-extrabold text-white">
                    03472063381
                  </p>
                  <p className="mt-1 text-sm text-white/85">Name: Muhammad Haseeb</p>
                </div>
                <div className="rounded-3xl border-2 border-sky-400/22 bg-slate-950/45 p-6 md:col-span-2">
                  <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
                    Meezan Bank
                  </p>
                  <p className="mt-1 text-sm text-white/85">Name: Muhammad Haseeb</p>
                  <p className="mt-2 text-sm font-extrabold text-white">
                    Account: 12510109947499
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    IBAN:{" "}
                    <span className="font-semibold text-white">
                      PK86MEZN0012510109947499
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    Branch: Daultala Branch
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border-2 border-sky-400/22 bg-slate-950/35 p-6">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
                Instructions
              </p>
              <ol className="mt-3 space-y-2 text-base leading-8 text-white/90">
                <li>
                  1) Send payment to any method above (EasyPaisa, JazzCash, or Meezan Bank).
                </li>
                <li>
                  2) Copy your <span className="font-semibold text-white">transaction ID</span> from the app/bank receipt.
                </li>
                <li>3) Fill the form below (name, transaction ID, amount, method) and submit for approval.</li>
                <li>
                  4) After admin approval, your dashboard will unlock.
                </li>
              </ol>
            </div>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-extrabold tracking-wide text-white/85">
                    Name
                  </label>
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-extrabold tracking-wide text-white/85">
                    Email
                  </label>
                  <input
                    className={inputClass}
                    value={email}
                    placeholder="you@email.com"
                    type="email"
                    readOnly
                    aria-readonly="true"
                  />
                  <p className="text-xs text-slate-500">
                    This must match your signed-in account:{" "}
                    <span className="font-semibold text-white/80">{authEmail || "—"}</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-extrabold tracking-wide text-white/85">
                  Selected plan
                </label>
                <select
                  className={inputClass}
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as RhPlanId)}
                >
                  <option value="basic">Basic</option>
                  <option value="premium">Pro</option>
                  <option value="signals">Signals</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-extrabold tracking-wide text-white/85">
                  WhatsApp number
                </label>
                <input
                  className={inputClass}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+92 3xx xxx xxxx"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-extrabold tracking-wide text-white/85">
                  Payment method
                </label>
                <select
                  className={inputClass}
                  value={method}
                  onChange={(e) => setMethod(e.target.value as typeof method)}
                >
                  <option value="JazzCash">JazzCash</option>
                  <option value="EasyPaisa">EasyPaisa</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-extrabold tracking-wide text-white/85">
                    Transaction ID
                  </label>
                  <input
                    className={inputClass}
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="e.g. EP1234567890"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-extrabold tracking-wide text-white/85">
                    Amount
                  </label>
                  <input
                    className={inputClass}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount paid (PKR)"
                    inputMode="decimal"
                  />
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              {done ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-200">
                  Request submitted. Opening your payment status page…
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting || !authReady}
                className="rh-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-extrabold text-white transition hover:brightness-110 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit for approval"}
              </button>
            </form>
          </section>

          <aside className="rounded-3xl border-2 border-sky-400/28 bg-slate-950/55 p-7 shadow-[0_0_70px_rgba(56,189,248,0.14),0_28px_70px_-32px_rgba(2,6,23,0.85)] backdrop-blur-sm">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
              Payment support
            </p>
            <p className="mt-2 text-xl font-extrabold text-white">
              Secure processing &amp; approval guidance
            </p>
            <p className="mt-3 text-base leading-8 text-white/90">
              Welcome to RH Traders. If you are serious about your trading journey, join the RH
              Academy and start learning in a supportive environment. You are in safe hands here.
            </p>
            <p className="mt-3 text-base leading-8 text-white/90">
              Payments are reviewed manually. If your status is still pending, contact support with
              your registered email and your transaction ID so we can verify and approve quickly.
            </p>

            <div className="mt-5 rounded-3xl border-2 border-sky-400/22 bg-slate-950/45 p-6">
              <p className="text-base font-extrabold text-white">Contact</p>
              <div className="mt-3 space-y-2 text-base text-white/90">
                <p>
                  <span className="text-white/85">EasyPaisa:</span>{" "}
                  <span className="font-extrabold text-white">03495357142</span>
                </p>
                <p>
                  <span className="text-white/85">JazzCash:</span>{" "}
                  <span className="font-extrabold text-white">03472063381</span>
                </p>
                <p>
                  <span className="text-white/85">Email:</span>{" "}
                  <span className="font-extrabold text-white">rh6219289@gmail.com</span>
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/80">
                When you message us, include your <span className="font-semibold text-white">email</span> and a{" "}
                <span className="font-semibold text-white">transaction ID</span>.
              </p>
            </div>

            <div className="mt-5 rounded-3xl border-2 border-sky-400/22 bg-slate-950/45 p-6">
              <p className="text-base font-extrabold text-white">Important notes</p>
              <ul className="mt-3 space-y-2 text-base leading-8 text-white/90">
                <li>
                  - If your payment is pending, contact us using the same email you used for your RH Traders account.
                </li>
                <li>
                  - Provide your transaction ID and amount from the receipt.
                </li>
                <li>
                  - Refund requests must be made within <span className="font-extrabold text-white">3 days</span> of payment confirmation. After 3 days, payments are not refundable.
                </li>
              </ul>
            </div>

            <div className="mt-5 rounded-3xl border-2 border-emerald-500/20 bg-emerald-950/20 p-6">
              <p className="text-base font-extrabold text-white">After approval</p>
              <p className="mt-2 text-base leading-8 text-white/90">
                Your dashboard will show approval status and your selected plan content will unlock automatically.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

