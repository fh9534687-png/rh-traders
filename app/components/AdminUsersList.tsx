"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAllUsers, type UserData } from "../lib/firebase/db";

const VIEWS = ["total", "paid", "basic", "premium", "signals"] as const;
type AdminUsersView = (typeof VIEWS)[number];

function parseView(raw: string | null): AdminUsersView {
  if (raw && (VIEWS as readonly string[]).includes(raw)) return raw as AdminUsersView;
  return "total";
}

function formatWhen(ts: number) {
  try {
    return new Date(ts).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

function displayName(u: UserData) {
  const n = [u.firstName, u.lastName]
    .map((s) => (s ?? "").trim())
    .filter(Boolean)
    .join(" ");
  return n || u.email.split("@")[0] || u.email;
}

function sortByName(a: UserData, b: UserData) {
  return displayName(a).localeCompare(displayName(b), undefined, { sensitivity: "base" });
}

function titleFor(view: AdminUsersView) {
  if (view === "total") return "All users";
  if (view === "paid") return "Paid users";
  if (view === "basic") return "Basic plan";
  if (view === "premium") return "Premium plan";
  return "Signals plan";
}

export function AdminUsersList() {
  const searchParams = useSearchParams();
  const view = parseView(searchParams.get("view"));
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openEmail, setOpenEmail] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        setUsers(await getAllUsers());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (view === "total") return [...users].sort(sortByName);
    if (view === "paid") return users.filter((u) => u.isPaid).sort(sortByName);
    return users.filter((u) => u.plan === view).sort(sortByName);
  }, [users, view]);

  return (
    <div className="mt-8 rounded-3xl border-2 border-sky-400/30 bg-slate-950/75 p-6 shadow-[0_0_50px_rgba(56,189,248,0.12)] sm:p-8">
      <div className="flex flex-col gap-2 border-b border-sky-400/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-sky-300/90">
            Users overview
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {titleFor(view)}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {filtered.length} {filtered.length === 1 ? "person" : "people"} in this list. Click a
            name to expand email and account details.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(VIEWS as readonly AdminUsersView[]).map((v) => (
            <Link
              key={v}
              href={`/admin/users?view=${v}`}
              scroll={false}
              className={[
                "rounded-full border px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide transition",
                v === view
                  ? "border-sky-300/60 bg-sky-500/20 text-white"
                  : "border-sky-400/25 bg-slate-900/50 text-slate-300 hover:border-sky-400/45 hover:text-white",
              ].join(" ")}
            >
              {v === "total" ? "All" : v === "paid" ? "Paid" : v}
            </Link>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="mt-10 text-center text-slate-400">Loading users…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-10 text-center text-slate-400">No users in this list.</p>
      ) : (
        <ul className="mt-6 space-y-2">
          {filtered.map((u) => {
            const open = openEmail === u.email;
            return (
              <li
                key={u.email}
                className="overflow-hidden rounded-2xl border border-sky-400/25 bg-slate-950/60"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenEmail((e) => (e === u.email ? null : u.email))}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-slate-900/50"
                >
                  <span className="min-w-0 truncate text-base font-extrabold text-white">
                    {displayName(u)}
                  </span>
                  <span className="shrink-0 text-slate-500" aria-hidden>
                    {open ? "▴" : "▾"}
                  </span>
                </button>
                {open ? (
                  <div className="space-y-2 border-t border-sky-400/20 px-4 py-4 text-sm text-slate-300">
                    <p>
                      <span className="font-extrabold text-slate-500">Email </span>
                      <span className="break-all text-slate-100">{u.email}</span>
                    </p>
                    <p>
                      <span className="font-extrabold text-slate-500">Role </span>
                      <span className="text-slate-100">{u.role}</span>
                    </p>
                    <p>
                      <span className="font-extrabold text-slate-500">Plan </span>
                      <span className="capitalize text-slate-100">{u.plan ?? "—"}</span>
                    </p>
                    <p>
                      <span className="font-extrabold text-slate-500">Paid </span>
                      <span className="text-slate-100">{u.isPaid ? "Yes" : "No"}</span>
                    </p>
                    <p>
                      <span className="font-extrabold text-slate-500">Payment status </span>
                      <span className="text-slate-100">{u.paymentStatus ?? "none"}</span>
                    </p>
                    <p>
                      <span className="font-extrabold text-slate-500">Member since </span>
                      <span className="text-slate-100">{formatWhen(u.enrolledAt)}</span>
                    </p>
                    {u.authUid ? (
                      <p className="break-all text-xs">
                        <span className="font-extrabold text-slate-500">Auth UID </span>
                        <span className="text-slate-500">{u.authUid}</span>
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
