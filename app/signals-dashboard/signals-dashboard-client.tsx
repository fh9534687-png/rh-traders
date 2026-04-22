"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { onValue, ref } from "firebase/database";
import { addSignal, db, requestSignalCall, type SignalData } from "../lib/firebase/db";
import { LogoutButton } from "../components/LogoutButton";

const inputClass =
  "w-full rounded-[12px] border-2 border-sky-500/35 bg-slate-950/75 px-4 py-3 text-[15px] text-white placeholder:text-slate-400 outline-none transition " +
  "focus:border-sky-400/70 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.20)]";

function statusLabel(s: SignalData["status"]) {
  if (s === "active") return "Active";
  if (s === "hit_tp") return "Hit TP";
  if (s === "stopped") return "Stopped";
  return "Cancelled";
}

function statusPill(status: SignalData["status"]) {
  if (status === "active") return "border-emerald-400/25 bg-emerald-500/10 text-emerald-200";
  if (status === "hit_tp") return "border-sky-400/25 bg-blue-500/10 text-sky-200";
  if (status === "stopped") return "border-red-500/25 bg-red-500/10 text-red-200";
  return "border-slate-400/20 bg-slate-900/40 text-slate-300";
}

export function SignalsDashboardClient({ email, role }: { email: string; role: string }) {
  const [signals, setSignals] = useState<SignalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Book call form (user)
  const [callOpen, setCallOpen] = useState(false);
  const [callName, setCallName] = useState("");
  const [callWhatsapp, setCallWhatsapp] = useState("");
  const [callBusy, setCallBusy] = useState(false);
  const [callDone, setCallDone] = useState(false);

  // Admin add-signal form
  const isAdmin = role === "admin";
  const [pair, setPair] = useState("");
  const [direction, setDirection] = useState<SignalData["direction"]>("Long");
  const [entry, setEntry] = useState("");
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const r = ref(db, "signals");
    const unsub = onValue(
      r,
      (snap) => {
        const raw = (snap.exists() ? (snap.val() as Record<string, SignalData>) : null) ?? null;
        const list = raw ? Object.values(raw) : [];
        list.sort((a, b) => b.createdAt - a.createdAt);
        setSignals(list);
        setLoading(false);
      },
      (err) => {
        setError(err?.message ?? "Failed to load signals.");
        setLoading(false);
      },
    );

    return () => unsub();
  }, []);

  const activeSignals = useMemo(() => signals.filter((s) => s.status === "active"), [signals]);

  async function onAddSignal(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!pair.trim() || !entry.trim() || !tp.trim() || !sl.trim()) {
      setError("Please fill pair, entry, TP and SL.");
      return;
    }
    setSaving(true);
    try {
      await addSignal({
        pair: pair.trim().toUpperCase(),
        direction,
        entry: entry.trim(),
        sl: sl.trim(),
        tp: tp.trim(),
        status: "active",
      });
      setPair("");
      setEntry("");
      setTp("");
      setSl("");
      setDirection("Long");
      setSavedBanner(true);
      setTimeout(() => setSavedBanner(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add signal.");
    } finally {
      setSaving(false);
    }
  }

  async function onSubmitCall(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!callName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!callWhatsapp.trim()) {
      setError("Please enter your WhatsApp number.");
      return;
    }
    setCallBusy(true);
    try {
      await requestSignalCall(email, { name: callName, whatsapp: callWhatsapp });
      setCallDone(true);
      setTimeout(() => setCallDone(false), 3500);
      setCallOpen(false);
      setCallName("");
      setCallWhatsapp("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit call request.");
    } finally {
      setCallBusy(false);
    }
  }

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-7 sm:py-9">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(37,99,235,0.14),transparent_55%)]" />
      <div className="rh-wrap relative max-w-[1280px]">
        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="overflow-hidden rounded-3xl border border-sky-400/25 bg-slate-900/55 shadow-[0_0_40px_rgba(37,99,235,0.12)] backdrop-blur-sm">
            <div className="p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">Dashboard</p>
              <p className="mt-2 text-sm font-extrabold text-white">Signals</p>
              <p className="mt-1 text-xs text-slate-400">{email}</p>
            </div>
            <nav className="border-t border-sky-400/15 p-3">
              {[
                { label: "Signals", href: "/signals-dashboard" },
                { label: "Request page", href: "/dashboard/signals" },
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

          <div className="space-y-5">
            <header className="overflow-hidden rounded-3xl border border-sky-400/20 bg-slate-900/45 p-6 shadow-[0_0_60px_rgba(37,99,235,0.10)] backdrop-blur-sm sm:p-8">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/25 bg-slate-950/40 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
                SIGNALS DASHBOARD
              </p>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Live signals & history
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-200">
                Real-time updates from Firebase. Active signals stay on top.
              </p>
            </header>

            {error ? (
              <div className="rounded-3xl border border-red-400/20 bg-red-500/10 px-6 py-4 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_60px_rgba(37,99,235,0.08)] backdrop-blur-sm">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">Live</p>
                    <h2 className="mt-2 text-lg font-extrabold text-white">Active signals</h2>
                  </div>
                  <p className="rounded-full border border-sky-400/20 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-slate-300">
                    {loading ? "…" : `${activeSignals.length} active`}
                  </p>
                </div>

                {loading ? (
                  <p className="mt-5 text-sm text-slate-300">Loading…</p>
                ) : activeSignals.length === 0 ? (
                  <div className="mt-5 rounded-2xl border border-sky-400/15 bg-slate-950/30 px-4 py-4 text-sm text-slate-300">
                    No active signals right now.
                  </div>
                ) : (
                  <div className="mt-5 grid gap-3">
                    {activeSignals.slice(0, 8).map((s) => (
                      <div key={s.id} className="rounded-2xl border border-sky-400/15 bg-slate-950/30 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-extrabold text-white">
                              {s.pair} <span className="text-slate-400">• {s.direction}</span>
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {new Date(s.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <span className={["rounded-full border px-3 py-1 text-xs font-extrabold", statusPill(s.status)].join(" ")}>
                            {statusLabel(s.status)}
                          </span>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          {[
                            { k: "Entry", v: s.entry },
                            { k: "SL", v: s.sl },
                            { k: "TP", v: s.tp },
                          ].map((x) => (
                            <div key={x.k} className="rounded-2xl border border-sky-400/10 bg-slate-900/30 px-4 py-3">
                              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">{x.k}</p>
                              <p className="mt-1 text-sm font-extrabold text-white">{x.v}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <aside className="space-y-5">
                <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_40px_rgba(37,99,235,0.08)] backdrop-blur-sm">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">Plan</p>
                  <h2 className="mt-2 text-lg font-extrabold text-white">Signals access</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    If you can see this page, your request is approved.
                  </p>
                </section>

                <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_40px_rgba(37,99,235,0.08)] backdrop-blur-sm">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">Calls</p>
                  <h2 className="mt-2 text-lg font-extrabold text-white">Book a call</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Submit your details and we&apos;ll approve a session request.
                  </p>

                  {callDone ? (
                    <div className="mt-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                      Request submitted. Please wait for admin approval.
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setCallOpen(true)}
                    className="rh-btn-primary mt-4 inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold text-white"
                  >
                    Book call
                  </button>
                </section>

                {isAdmin ? (
                  <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_40px_rgba(37,99,235,0.08)] backdrop-blur-sm">
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">Admin</p>
                    <h2 className="mt-2 text-lg font-extrabold text-white">Add signal</h2>
                    <form className="mt-4 space-y-3" onSubmit={(ev) => void onAddSignal(ev)}>
                      <input className={inputClass} value={pair} onChange={(e) => setPair(e.target.value)} placeholder="Pair (e.g. BTC/USDT)" />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <select className={inputClass} value={direction} onChange={(e) => setDirection(e.target.value as SignalData["direction"])}>
                          <option value="Long">Long</option>
                          <option value="Short">Short</option>
                        </select>
                        <input className={inputClass} value={entry} onChange={(e) => setEntry(e.target.value)} placeholder="Entry" />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input className={inputClass} value={tp} onChange={(e) => setTp(e.target.value)} placeholder="Take profit (TP)" />
                        <input className={inputClass} value={sl} onChange={(e) => setSl(e.target.value)} placeholder="Stop loss (SL)" />
                      </div>
                      {savedBanner ? (
                        <p className="text-sm text-emerald-200" role="status">
                          Signal saved.
                        </p>
                      ) : null}
                      <button
                        type="submit"
                        disabled={saving}
                        className="rh-btn-primary mt-1 inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold text-white disabled:opacity-70"
                      >
                        {saving ? "Saving…" : "Add signal"}
                      </button>
                    </form>
                  </section>
                ) : null}
              </aside>
            </div>

            <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_60px_rgba(37,99,235,0.08)] backdrop-blur-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">Feed</p>
                  <h2 className="mt-2 text-lg font-extrabold text-white">Latest signals + history</h2>
                </div>
                <p className="rounded-full border border-sky-400/20 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-slate-300">
                  {loading ? "…" : `${signals.length} items`}
                </p>
              </div>

              <div className="mt-5 overflow-hidden rounded-3xl border border-sky-400/15">
                <div className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr_0.7fr_0.7fr] gap-0 bg-slate-950/50 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  <div>Pair</div>
                  <div>Status</div>
                  <div>Dir</div>
                  <div>Entry</div>
                  <div>SL</div>
                  <div>TP</div>
                </div>
                <div className="divide-y divide-sky-400/10 bg-slate-900/30">
                  {loading ? (
                    <div className="px-4 py-4 text-sm text-slate-300">Loading…</div>
                  ) : signals.length === 0 ? (
                    <div className="px-4 py-4 text-sm text-slate-300">No signals yet.</div>
                  ) : (
                    signals.slice(0, 30).map((s) => (
                      <div
                        key={s.id}
                        className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr_0.7fr_0.7fr] gap-0 px-4 py-3 text-sm text-slate-200"
                      >
                        <div className="font-semibold text-white">
                          {s.pair}
                          <div className="text-xs text-slate-500">
                            {new Date(s.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className={["inline-flex rounded-full border px-3 py-1 text-xs font-extrabold", statusPill(s.status)].join(" ")}>
                            {statusLabel(s.status)}
                          </span>
                        </div>
                        <div className="font-semibold">{s.direction}</div>
                        <div className="font-semibold">{s.entry}</div>
                        <div className="font-semibold">{s.sl}</div>
                        <div className="font-semibold">{s.tp}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {callOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-[520px] overflow-hidden rounded-3xl border border-sky-400/25 bg-slate-950/90 shadow-[0_0_80px_rgba(56,189,248,0.18)] backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3 border-b border-sky-400/15 px-6 py-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">Signals</p>
                <p className="mt-1 text-lg font-extrabold text-white">Book call</p>
              </div>
              <button
                type="button"
                onClick={() => setCallOpen(false)}
                className="rounded-full border border-sky-400/20 bg-slate-900/40 px-4 py-2 text-xs font-extrabold text-white hover:bg-slate-900/55"
              >
                Close
              </button>
            </div>

            <form className="space-y-4 px-6 py-6" onSubmit={(ev) => void onSubmitCall(ev)}>
              <div className="grid gap-2">
                <label className="text-sm font-extrabold tracking-wide text-white/85">Name</label>
                <input
                  className={inputClass}
                  value={callName}
                  onChange={(e) => setCallName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-extrabold tracking-wide text-white/85">WhatsApp number</label>
                <input
                  className={inputClass}
                  value={callWhatsapp}
                  onChange={(e) => setCallWhatsapp(e.target.value)}
                  placeholder="+92 3xx xxx xxxx"
                />
              </div>

              <button
                type="submit"
                disabled={callBusy}
                className="rh-btn-primary inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold text-white disabled:opacity-70"
              >
                {callBusy ? "Submitting…" : "Apply"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}

