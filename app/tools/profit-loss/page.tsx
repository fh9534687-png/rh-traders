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

export default function ProfitLossToolPage() {
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [lotSize, setLotSize] = useState("1");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => {
    const e = num(entry);
    const x = num(exit);
    const l = num(lotSize);
    if (!Number.isFinite(e) || !Number.isFinite(x) || !Number.isFinite(l) || l <= 0) return null;
    return (x - e) * l;
  }, [entry, exit, lotSize]);

  function calculate() {
    setError(null);
    setResult(null);
    const e = num(entry);
    const x = num(exit);
    const l = num(lotSize);
    if (!Number.isFinite(e) || e <= 0) return setError("Enter a valid entry price.");
    if (!Number.isFinite(x) || x <= 0) return setError("Enter a valid exit price.");
    if (!Number.isFinite(l) || l <= 0) return setError("Enter a valid lot size.");
    setResult((x - e) * l);
  }

  const tone =
    result === null
      ? "border-sky-400/15 bg-slate-950/30"
      : result >= 0
        ? "border-emerald-400/25 bg-emerald-500/10"
        : "border-red-400/25 bg-red-500/10";

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
              P/L
            </p>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Trading Profit &amp; Loss Calculator
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              This tool estimates profit or loss from entry, exit, and position size. Use it
              to validate targets and avoid “hope-based” exits.
            </p>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-extrabold tracking-wide text-slate-400">
                  Entry price
                </label>
                <input
                  className={inputClass}
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder="e.g. 64000"
                  inputMode="decimal"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-extrabold tracking-wide text-slate-400">
                  Exit price
                </label>
                <input
                  className={inputClass}
                  value={exit}
                  onChange={(e) => setExit(e.target.value)}
                  placeholder="e.g. 67000"
                  inputMode="decimal"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-extrabold tracking-wide text-slate-400">
                  Lot size
                </label>
                <input
                  className={inputClass}
                  value={lotSize}
                  onChange={(e) => setLotSize(e.target.value)}
                  placeholder="e.g. 1"
                  inputMode="decimal"
                />
                <p className="text-xs text-slate-500">
                  Step-by-step: set entry/exit first, then size (lot size) to estimate outcome.
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
            <h2 className="mt-2 text-lg font-extrabold text-white">Estimated outcome</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Positive means profit, negative means loss. (This is a simplified estimate:
              it doesn’t include fees/spread.)
            </p>

            <div className="mt-5 rounded-3xl border border-sky-400/15 bg-slate-950/30 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Live preview
              </p>
              <p className="mt-2 text-2xl font-extrabold text-white">
                {preview === null ? "—" : preview.toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Preview updates as you type.
              </p>
            </div>

            <div className={`mt-4 rounded-3xl border p-5 ${tone}`}>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Output
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                {result === null
                  ? "Enter values and click Calculate."
                  : result >= 0
                    ? `Profit: ${result.toFixed(2)}`
                    : `Loss: ${Math.abs(result).toFixed(2)}`}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

