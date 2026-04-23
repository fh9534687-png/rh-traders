"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function clampInt(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.floor(n));
}

function getCountdown(targetMs: number): Countdown {
  const now = Date.now();
  const diff = targetMs - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    days: clampInt(days),
    hours: clampInt(hours),
    minutes: clampInt(minutes),
    seconds: clampInt(seconds),
    done: false,
  };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function EnrollCountdownBanner({
  deadlineIso = "2026-05-01T00:00:00Z",
}: {
  deadlineIso?: string;
}) {
  const parsedTargetMs = useMemo(() => {
    const t = Date.parse(deadlineIso);
    return Number.isFinite(t) ? t : null;
  }, [deadlineIso]);

  // Avoid hydration mismatch: `Date.now()` differs between SSR and the browser at first paint.
  const [c, setC] = useState<Countdown | null>(null);

  useEffect(() => {
    const targetMs = parsedTargetMs ?? Date.now();
    const tick = () => setC(getCountdown(targetMs));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [parsedTargetMs]);

  return (
    <section className="rh-wrap w-full px-5 pb-6 pt-2">
      <div className="rh-dark-data relative overflow-hidden p-5 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(56,189,248,0.16),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(99,102,241,0.14),transparent_60%)]" />

        <div className="relative grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-300">
              Registrations are open
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-[1.9rem]">
              Enroll Now
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-200">
              Join RH Traders to unlock structured learning, tools, and your dashboard.
              Enrolling on time helps you stay consistent with a clear roadmap and risk
              rules.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/plans"
                className="rh-btn-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold text-white"
              >
                Enroll now
              </Link>
              <p className="text-xs text-slate-300">
                Step-by-step: choose plan → submit payment → admin approves → dashboard unlocks.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-sky-400/20 bg-slate-950/35 p-4 shadow-[0_0_30px_rgba(56,189,248,0.08)]">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-400">
                Live countdown
              </p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[
                  { label: "Days", value: c ? String(c.days) : "—" },
                  { label: "Hours", value: c ? pad2(c.hours) : "—" },
                  { label: "Minutes", value: c ? pad2(c.minutes) : "—" },
                  { label: "Seconds", value: c ? pad2(c.seconds) : "—" },
                ].map((x) => (
                  <div
                    key={x.label}
                    className="rounded-2xl border border-sky-400/20 bg-slate-900/35 px-3 py-3 text-center"
                  >
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                      {x.label}
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-white">
                      {x.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">
                {!c
                  ? "Loading countdown…"
                  : c.done
                    ? "Countdown ended — enrollments may be paused. Check plans for latest availability."
                    : "Countdown updates in real-time. Enroll before the window closes."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

