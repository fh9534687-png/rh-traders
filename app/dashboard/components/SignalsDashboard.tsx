import Link from "next/link";
import { LogoutButton } from "../../components/LogoutButton";
import { BookLiveSessionButton } from "./components/BookLiveSessionButton";
import { SignalsRequestPanel } from "./components/SignalsRequestPanel";

type SignalStatus = "Active" | "Hit TP" | "Stopped" | "Cancelled";

type Signal = {
  id: string;
  pair: string;
  direction: "Long" | "Short";
  entry: string;
  sl: string;
  tp: string;
  status: SignalStatus;
  createdAtLabel: string;
};

const demoActiveSignals: Signal[] = [
  {
    id: "sig_1",
    pair: "BTC/USDT",
    direction: "Long",
    entry: "64,200",
    sl: "62,980",
    tp: "67,000",
    status: "Active",
    createdAtLabel: "Today",
  },
  {
    id: "sig_2",
    pair: "ETH/USDT",
    direction: "Short",
    entry: "3,120",
    sl: "3,220",
    tp: "2,920",
    status: "Active",
    createdAtLabel: "Yesterday",
  },
];

const demoLatestSignals: Signal[] = [
  ...demoActiveSignals,
  {
    id: "sig_3",
    pair: "SOL/USDT",
    direction: "Long",
    entry: "148.5",
    sl: "142.0",
    tp: "162.0",
    status: "Hit TP",
    createdAtLabel: "2 days ago",
  },
  {
    id: "sig_4",
    pair: "BNB/USDT",
    direction: "Short",
    entry: "585",
    sl: "598",
    tp: "550",
    status: "Stopped",
    createdAtLabel: "4 days ago",
  },
];

function statusPill(status: SignalStatus) {
  if (status === "Active")
    return "border-emerald-400/25 bg-emerald-500/10 text-emerald-200";
  if (status === "Hit TP")
    return "border-sky-400/25 bg-blue-500/10 text-sky-200";
  if (status === "Stopped")
    return "border-red-500/25 bg-red-500/10 text-red-200";
  return "border-slate-400/20 bg-slate-900/40 text-slate-300";
}

export function SignalsDashboard({ email }: { email: string }) {
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
              <p className="mt-2 text-sm font-extrabold text-white">Signals Plan</p>
              <p className="mt-1 text-xs text-slate-400">{email}</p>
            </div>

            <nav className="border-t border-sky-400/15 p-3">
              {[
                { label: "Signals", href: "/dashboard/signals" },
                { label: "My Plan", href: "/plans" },
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
                SIGNALS
              </p>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Active signals & execution
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-200">
                Clear entries, SL/TP, and status tracking—built for disciplined execution.
              </p>
            </header>

            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_60px_rgba(37,99,235,0.08)] backdrop-blur-sm">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                      Live
                    </p>
                    <h2 className="mt-2 text-lg font-extrabold text-white">
                      Active signals
                    </h2>
                  </div>
                  <p className="rounded-full border border-sky-400/20 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-slate-300">
                    {demoActiveSignals.length} active
                  </p>
                </div>

                <div className="mt-5 grid gap-3">
                  {demoActiveSignals.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-2xl border border-sky-400/15 bg-slate-950/30 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-extrabold text-white">
                            {s.pair}{" "}
                            <span className="text-slate-400">• {s.direction}</span>
                          </p>
                          <p className="mt-1 text-xs text-slate-400">{s.createdAtLabel}</p>
                        </div>
                        <span
                          className={[
                            "rounded-full border px-3 py-1 text-xs font-extrabold",
                            statusPill(s.status),
                          ].join(" ")}
                        >
                          {s.status}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {[
                          { k: "Entry", v: s.entry },
                          { k: "SL", v: s.sl },
                          { k: "TP", v: s.tp },
                        ].map((x) => (
                          <div
                            key={x.k}
                            className="rounded-2xl border border-sky-400/10 bg-slate-900/30 px-4 py-3"
                          >
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                              {x.k}
                            </p>
                            <p className="mt-1 text-sm font-extrabold text-white">
                              {x.v}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="space-y-5">
                <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_40px_rgba(37,99,235,0.08)] backdrop-blur-sm">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                    Contact
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold text-white">
                    WhatsApp / Telegram
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Use your preferred channel for quick confirmations and updates.
                  </p>
                  <div className="mt-5 grid gap-3">
                    <a
                      href="#"
                      className="rounded-2xl border border-sky-400/15 bg-slate-950/30 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-900/40"
                    >
                      WhatsApp contact →
                    </a>
                    <a
                      href="#"
                      className="rounded-2xl border border-sky-400/15 bg-slate-950/30 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-900/40"
                    >
                      Telegram contact →
                    </a>
                  </div>
                </section>

                <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_40px_rgba(37,99,235,0.08)] backdrop-blur-sm">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                    Live session
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold text-white">
                    Book a live session
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Schedule a 1:1 session to review setups and improve execution.
                  </p>
                  <BookLiveSessionButton />
                </section>

                <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_40px_rgba(37,99,235,0.08)] backdrop-blur-sm">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                    Signal requests
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold text-white">Get Signals</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Enter your phone number and submit a request. An admin will review and approve your access.
                  </p>
                  <SignalsRequestPanel />
                </section>
              </aside>
            </div>

            <section className="rounded-3xl border border-sky-400/20 bg-slate-900/35 p-6 shadow-[0_0_60px_rgba(37,99,235,0.08)] backdrop-blur-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                    Feed
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold text-white">
                    Latest signals + history
                  </h2>
                </div>
                <p className="rounded-full border border-sky-400/20 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-slate-300">
                  {demoLatestSignals.length} items
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
                  {demoLatestSignals.map((s) => (
                    <div
                      key={s.id}
                      className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr_0.7fr_0.7fr] gap-0 px-4 py-3 text-sm text-slate-200"
                    >
                      <div className="font-semibold text-white">
                        {s.pair}
                        <div className="text-xs text-slate-500">{s.createdAtLabel}</div>
                      </div>
                      <div>
                        <span
                          className={[
                            "inline-flex rounded-full border px-3 py-1 text-xs font-extrabold",
                            statusPill(s.status),
                          ].join(" ")}
                        >
                          {s.status}
                        </span>
                      </div>
                      <div className="font-semibold">{s.direction}</div>
                      <div className="font-semibold">{s.entry}</div>
                      <div className="font-semibold">{s.sl}</div>
                      <div className="font-semibold">{s.tp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

