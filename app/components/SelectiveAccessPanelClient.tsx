"use client";

import { useEffect, useMemo, useState } from "react";
import {
  acceptSelectiveAccessRequest,
  getLatestSelectiveAccessRequestForEmail,
  rejectSelectiveAccessRequest,
  type SelectiveAccessRequest,
} from "../lib/firebase/db";
import type { Auth } from "firebase/auth";
import { firebaseAuth } from "../lib/firebase/auth";

const cardClass =
  "overflow-hidden rounded-3xl border border-sky-400/20 bg-slate-900/45 p-6 shadow-[0_0_60px_rgba(37,99,235,0.10)] backdrop-blur-sm sm:p-8";

function mustAuth(): Auth {
  if (!firebaseAuth) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* environment variables (Vercel + .env.local).",
    );
  }
  return firebaseAuth;
}

function setCookie(name: string, value: string) {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=2592000; samesite=lax`;
}

export function SelectiveAccessPanelClient() {
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState<SelectiveAccessRequest | null>(null);
  const [busy, setBusy] = useState<"accept" | "reject" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const label = useMemo(() => {
    if (!row) return "";
    if (row.dashboard === "basic") return "Basic Dashboard";
    if (row.dashboard === "premium") return "Premium Dashboard";
    return "Signals Dashboard";
  }, [row]);

  useEffect(() => {
    let alive = true;
    void (async () => {
      setError(null);
      try {
        const auth = mustAuth();
        await auth.authStateReady();
        const u = auth.currentUser;
        if (!u?.email) {
          if (alive) {
            setRow(null);
            setLoading(false);
          }
          return;
        }
        const latest = await getLatestSelectiveAccessRequestForEmail(u.email);
        if (!alive) return;
        setRow(latest);
        setLoading(false);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load selective access request.");
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function accept() {
    if (!row) return;
    setBusy("accept");
    setError(null);
    try {
      const auth = mustAuth();
      await auth.authStateReady();
      const u = auth.currentUser;
      const email = u?.email?.trim().toLowerCase() || "";
      await acceptSelectiveAccessRequest(row.id, email);
      // This cookie is what the middleware uses to allow the specific dashboard immediately.
      setCookie("rh_selective_access", row.dashboard);
      setRow((r) => (r ? { ...r, status: "accepted" } : r));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to accept request.");
    } finally {
      setBusy(null);
    }
  }

  async function reject() {
    if (!row) return;
    setBusy("reject");
    setError(null);
    try {
      const auth = mustAuth();
      await auth.authStateReady();
      const u = auth.currentUser;
      const email = u?.email?.trim().toLowerCase() || "";
      await rejectSelectiveAccessRequest(row.id, email);
      setRow(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to reject request.");
    } finally {
      setBusy(null);
    }
  }

  if (loading) {
    return (
      <section className={cardClass}>
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
          Selective access
        </p>
        <p className="mt-3 text-sm text-slate-300">Checking for admin access requests…</p>
      </section>
    );
  }

  if (!row) {
    return null;
  }

  return (
    <section className={cardClass}>
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
        Selective access
      </p>
      <h2 className="mt-2 text-xl font-extrabold text-white">Admin invited you</h2>
      <p className="mt-2 text-sm leading-7 text-slate-300">
        You have been invited to access: <span className="font-extrabold text-white">{label}</span>.
      </p>

      {row.status === "accepted" ? (
        <div className="mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100">
          Accepted. You can open the dashboard now.
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void accept()}
            disabled={busy === "accept"}
            className="inline-flex items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-500/10 px-6 py-2.5 text-xs font-extrabold text-white transition hover:bg-emerald-500/15"
          >
            {busy === "accept" ? "Accepting…" : "Accept"}
          </button>
          <button
            type="button"
            onClick={() => void reject()}
            disabled={busy === "reject"}
            className="inline-flex items-center justify-center rounded-full border border-red-400/25 bg-red-500/10 px-6 py-2.5 text-xs font-extrabold text-white transition hover:bg-red-500/15"
          >
            {busy === "reject" ? "Rejecting…" : "Reject"}
          </button>
        </div>
      )}

      {error ? (
        <p className="mt-4 text-sm font-semibold text-red-200">{error}</p>
      ) : null}
    </section>
  );
}

