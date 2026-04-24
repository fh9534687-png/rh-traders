"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createSignalsRequest,
  getLatestSignalsRequestForEmail,
  type SignalsRequestStatus,
} from "../../../lib/firebase/firestore";
import { setRhSignalsRequestStatus } from "../../../lib/rhSignals";

function getCookie(name: string) {
  const key = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const hit = parts.find((p) => p.startsWith(key));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(key.length));
}

const inputClass =
  "w-full rounded-2xl border border-sky-400/20 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none transition " +
  "placeholder:text-slate-500 focus:border-sky-400/45";

function isValidPhone(v: string) {
  const s = v.trim();
  if (!s) return false;
  // permissive: allow +, digits, spaces, dashes, parentheses (min 7 digits)
  const digits = s.replace(/[^\d]/g, "");
  if (digits.length < 7) return false;
  return /^[\d\s()+-]+$/.test(s);
}

export function SignalsRequestPanel() {
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<SignalsRequestStatus | "none">("none");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const email = useMemo(() => (getCookie("rh_email") ?? "").trim().toLowerCase(), []);

  useEffect(() => {
    void (async () => {
      if (!email) {
        setLoading(false);
        return;
      }
      try {
        const latest = await getLatestSignalsRequestForEmail(email);
        if (!latest) {
          setStatus("none");
        } else {
          setStatus(latest.status);
          setRhSignalsRequestStatus(latest.status);
        }
      } catch {
        // Keep UI usable even if read fails.
      } finally {
        setLoading(false);
      }
    })();
  }, [email]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDone(false);

    if (!email) {
      setError("You need to be logged in to request signals.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    try {
      await createSignalsRequest({ email, phone });
      setStatus("pending");
      setRhSignalsRequestStatus("pending");
      setDone(true);
      setTimeout(() => setDone(false), 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <p className="mt-4 text-sm text-slate-400" aria-live="polite">
        Loading request status…
      </p>
    );
  }

  if (status === "approved") {
    return (
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Your signals access is <span className="font-extrabold">approved</span>.
        </div>
        <a
          href="/signals-dashboard"
          className="rh-btn-primary inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold text-white"
        >
          Open signals dashboard
        </a>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="mt-4 rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
        Status: <span className="font-extrabold">Pending approval</span>. You will get access after admin approval.
      </div>
    );
  }

  return (
    <form className="mt-4 space-y-3" onSubmit={(ev) => void onSubmit(ev)}>
      {status === "rejected" ? (
        <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          Your last request was <span className="font-extrabold">rejected</span>. You can submit again.
        </div>
      ) : null}

      <div>
        <label className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">
          Phone number
        </label>
        <input
          className={`${inputClass} mt-2`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+92 3xx xxx xxxx"
          required
        />
      </div>

      {error ? (
        <p className="text-sm text-red-200" role="alert">
          {error}
        </p>
      ) : null}
      {done ? (
        <p className="text-sm text-emerald-200" role="status">
          Request submitted. Please wait for approval.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="rh-btn-primary mt-2 inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold text-white disabled:opacity-70"
      >
        {submitting ? "Submitting…" : "Get Signals"}
      </button>
    </form>
  );
}

