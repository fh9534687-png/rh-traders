"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type Auth } from "firebase/auth";
import { getFirebaseAuth } from "../../lib/firebase/auth";
import { subscribeUserData, type UserData } from "../../lib/firebase/firestore";
import { markRhPaid, setRhPaymentStatus, setRhPlan, type RhPlanId } from "../../lib/rhEntitlements";

function getCookie(name: string) {
  const key = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const hit = parts.find((p) => p.startsWith(key));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(key.length));
}

function hoursSince(ts: number | null | undefined) {
  if (typeof ts !== "number" || Number.isNaN(ts)) return null;
  const ms = Date.now() - ts;
  if (ms < 0) return 0;
  return Math.floor(ms / 3600000);
}

const card =
  "rounded-2xl border-2 border-sky-400/25 bg-slate-950/60 p-6 shadow-[0_0_40px_rgba(56,189,248,0.12)] backdrop-blur-sm transition hover:border-sky-400/40";

function mustAuth(): Auth {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* environment variables (Vercel + .env.local).",
    );
  }
  return auth;
}

export default function PaymentStatusPage() {
  const router = useRouter();
  const redirected = useRef(false);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [mismatch, setMismatch] = useState(false);
  /** `undefined` = loading, `null` = no RTDB row, else profile. */
  const [userSnap, setUserSnap] = useState<UserData | null | undefined>(undefined);

  useEffect(() => {
    if (!getFirebaseAuth()) {
      router.replace("/auth?next=/payment/status");
      return;
    }

    const auth = mustAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u?.email) {
        router.replace("/auth?next=/payment/status");
        return;
      }
      setUid(u.uid);
      const e = u.email.trim().toLowerCase();
      setEmail(e);
      const c = getCookie("rh_email");
      setMismatch(Boolean(c && c.trim().toLowerCase() !== e));
      setAuthReady(true);
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    if (!authReady || !uid) return;
    const unsub = subscribeUserData(
      uid,
      (u) => setUserSnap(u),
      () => setUserSnap(null),
    );
    return () => unsub();
  }, [authReady, uid]);

  const status = useMemo(() => {
    if (userSnap === undefined) return "loading" as const;
    if (userSnap === null) return "none" as const;
    if (userSnap.isPaid && userSnap.plan) return "approved" as const;
    if (userSnap.paymentStatus === "rejected") return "rejected" as const;
    if (userSnap.paymentStatus === "pending") return "pending" as const;
    return "none" as const;
  }, [userSnap]);

  useEffect(() => {
    if (userSnap === undefined) return;
    if (userSnap === null) {
      setRhPaymentStatus("none");
      return;
    }

    const paid = userSnap.isPaid;
    const ps = userSnap.paymentStatus ?? "none";

    if (paid && userSnap.plan) {
      if (!redirected.current) {
        redirected.current = true;
        setRhPlan(userSnap.plan as RhPlanId);
        markRhPaid();
        setRhPaymentStatus("approved");
        router.replace(userSnap.plan === "signals" ? "/signals-dashboard" : `/dashboard/${userSnap.plan}`);
      }
      return;
    }

    if (ps === "pending" || ps === "rejected") {
      setRhPaymentStatus(ps);
    } else {
      setRhPaymentStatus("none");
    }
  }, [userSnap, router]);

  const submittedHours = hoursSince(userSnap?.paymentSubmittedAt ?? undefined);
  const planLabel =
    userSnap?.plan === "premium"
      ? "Pro Course"
      : userSnap?.plan === "signals"
        ? "Signals"
        : userSnap?.plan === "basic"
          ? "Basic Course"
          : "—";

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_-10%,rgba(56,189,248,0.12),transparent_55%)]" />
      <div className="rh-wrap relative mx-auto max-w-[720px] space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/plans"
            className="text-sm font-semibold text-sky-300/90 transition hover:text-sky-200"
          >
            ← Back to plans
          </Link>
          <Link
            href="/payment"
            className="text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            Payment form
          </Link>
        </div>

        <header className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-300/90">Billing</p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Payment status</h1>
          <p className="text-base leading-relaxed text-slate-300">
            Live status from your account record. When an admin approves your request, you are redirected to the correct
            dashboard automatically.
          </p>
        </header>

        {mismatch ? (
          <div
            className="rounded-2xl border border-amber-500/40 bg-amber-950/30 p-4 text-sm text-amber-100"
            role="status"
          >
            Session email cookie does not match the signed-in Firebase account. Log out and sign in with the email you
            used for payment, or contact support.
          </div>
        ) : null}

        <div className={`grid gap-6 ${status === "loading" ? "animate-pulse" : ""}`}>
          <section className={card}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Current state</p>
            {status === "loading" ? (
              <div className="mt-4 h-12 rounded-xl bg-slate-800/80" />
            ) : (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {status === "pending" ? (
                  <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/15 px-4 py-1.5 text-sm font-bold text-amber-100">
                    Pending review
                  </span>
                ) : null}
                {status === "approved" ? (
                  <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1.5 text-sm font-bold text-emerald-100">
                    Approved — redirecting
                  </span>
                ) : null}
                {status === "rejected" ? (
                  <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-500/15 px-4 py-1.5 text-sm font-bold text-red-100">
                    Rejected
                  </span>
                ) : null}
                {status === "none" ? (
                  <span className="inline-flex items-center rounded-full border border-slate-500/40 bg-slate-800/60 px-4 py-1.5 text-sm font-bold text-slate-200">
                    {userSnap && userSnap !== null ? "No pending request" : "No active payment request"}
                  </span>
                ) : null}
              </div>
            )}

            {(status === "pending" || status === "rejected") && submittedHours !== null ? (
              <p className="mt-4 text-sm text-slate-300">
                Time since last submission:{" "}
                <span className="font-semibold text-white">
                  {submittedHours} hour{submittedHours === 1 ? "" : "s"}
                </span>
                {userSnap?.latestPaymentId ? (
                  <span className="block pt-1 text-xs text-slate-500">
                    Reference ID: {userSnap.latestPaymentId}
                  </span>
                ) : null}
              </p>
            ) : null}

            {status === "pending" ? (
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Your proof is queued. Keep this tab open or return later—status updates as soon as an admin reviews your
                payment.
              </p>
            ) : null}

            {status === "rejected" && submittedHours === null ? (
              <p className="mt-4 text-sm text-slate-400">No submission timestamp on file.</p>
            ) : null}

            {status === "rejected" ? (
              <div className="mt-6 space-y-4">
                <p className="text-sm leading-relaxed text-slate-300">
                  Your last submission was not accepted. Submit a new request from the payment page using the same
                  email and a valid, unused transaction ID.
                </p>
                <Link
                  href="/payment"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110"
                >
                  Submit new payment request
                </Link>
              </div>
            ) : null}

            {status === "none" && userSnap === null ? (
              <p className="mt-4 text-sm text-slate-400">
                No profile row found yet. Complete signup, pick a plan, then submit payment proof.
              </p>
            ) : null}

            {status === "none" && userSnap && !userSnap.isPaid ? (
              <p className="mt-4 text-sm text-slate-400">
                You do not have a pending manual payment.{" "}
                <Link href="/payment" className="font-semibold text-sky-300 hover:text-sky-200">
                  Submit proof
                </Link>{" "}
                after sending funds.
              </p>
            ) : null}
          </section>

          <section className={card}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Account snapshot</p>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
                <dd className="mt-1 text-sm font-medium text-white">{email ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Plan on file</dt>
                <dd className="mt-1 text-sm font-medium text-white">{planLabel}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}
