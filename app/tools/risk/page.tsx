"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const inputClass =
  "w-full rounded-[12px] border border-sky-500/30 bg-slate-950/80 px-4 py-3 text-[14px] text-slate-100 placeholder:text-slate-500 outline-none transition " +
  "focus:border-sky-400/55 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.14)]";

const cardClass =
  "rounded-3xl border border-sky-400/20 bg-slate-900/45 p-6 shadow-[0_0_60px_rgba(37,99,235,0.10)] backdrop-blur-sm sm:p-8";

function num(s: string) {
  const x = Number(s);
  return Number.isFinite(x) ? x : NaN;
}

export default function RiskToolPage() {
  const [balance, setBalance] = useState("");
  const [riskPct, setRiskPct] = useState("1");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => {
    const b = num(balance);
    const r = num(riskPct);
    if (!Number.isFinite(b) || !Number.isFinite(r) || b <= 0 || r <= 0 || r > 100) return null;
    return (b * r) / 100;
  }, [balance, riskPct]);

  function calculate() {
    setError(null);
    setResult(null);
    const b = num(balance);
    const r = num(riskPct);
    if (!Number.isFinite(b) || b <= 0) return setError("Enter a valid account balance.");
    if (!Number.isFinite(r) || r <= 0 || r > 100) return setError("Enter a valid risk % (0–100).");
    setResult((b * r) / 100);
  }

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-10 sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_-10%,rgba(37,99,235,0.14),transparent_55%)]" />
      <div className="rh-wrap relative max-w-[1100px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            ← Back
          </Link>
          <p className="rounded-full border border-sky-400/20 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-slate-300">
            Tools
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <section className={cardClass}>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/25 bg-slate-950/40 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
              RISK
            </p>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Trading Risk Calculator
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              A risk % is only useful when it becomes a number. This tool converts your
              risk rule into an exact amount so you can stay disciplined and consistent.
            </p>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-extrabold tracking-wide text-slate-400">
                  Account balance
                </label>
                <input
                  className={inputClass}
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="e.g. 1000"
                  inputMode="decimal"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-extrabold tracking-wide text-slate-400">
                  Risk %
                </label>
                <input
                  className={inputClass}
                  value={riskPct}
                  onChange={(e) => setRiskPct(e.target.value)}
                  placeholder="e.g. 1"
                  inputMode="decimal"
                />
                <p className="text-xs text-slate-500">
                  Step-by-step: choose a risk %, then use this amount as your maximum loss.
                </p>
              </div>

              <button
                type="button"
                onClick={calculate}
                className="rh-btn-primary mt-1 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold text-white"
              >
                Calculate
              </button>

              {error ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}
            </div>
          </section>

          <aside className={cardClass}>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Result
            </p>
            <h2 className="mt-2 text-lg font-extrabold text-white">Risk amount</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              This is the exact amount you can lose on one trade while staying inside your
              plan.
            </p>

            <div className="mt-5 rounded-3xl border border-sky-400/15 bg-slate-950/30 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Live preview
              </p>
              <p className="mt-2 text-2xl font-extrabold text-white">
                {preview === null ? "—" : preview.toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Preview updates as you type. Click Calculate to lock the result.
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-sky-400/15 bg-slate-950/30 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Output
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                {result === null ? "Enter values and click Calculate." : result.toFixed(2)}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

