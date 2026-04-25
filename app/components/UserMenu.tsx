"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged, type Auth } from "firebase/auth";
import { getFirebaseAuth } from "../lib/firebase/auth";
import { getUserData } from "../lib/firebase/firestore";
import { isAdminEmail, setRhSession } from "../lib/rhSession";
import {
  clearRhPaid,
  clearRhPlan,
  markRhPaid,
  setRhPaymentStatus,
  setRhPlan,
  type RhPaymentStatus,
} from "../lib/rhEntitlements";
import { LogoutButton } from "./LogoutButton";

function mustAuth(): Auth {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* environment variables (Vercel + .env.local).",
    );
  }
  return auth;
}

function Icon({
  name,
}: {
  name:
    | "profile"
    | "plan"
    | "dashboard"
    | "admin"
    | "contact"
    | "logout";
}) {
  const cls = "h-4 w-4 text-slate-200";
  if (name === "profile")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M20 21a8 8 0 0 0-16 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  if (name === "plan")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M7 8h10M7 12h10M7 16h7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 3h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "dashboard")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 13h7V4H4v9ZM13 20h7v-7h-7v7ZM13 11h7V4h-7v7ZM4 20h7v-5H4v5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "admin")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "contact")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 6h16v12H4V6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="m4 7 8 6 8-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 12H6m4 0 8 8m-8-8 8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getCookie(name: string) {
  const key = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const hit = parts.find((p) => p.startsWith(key));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(key.length));
}

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [plan, setPlan] = useState<string>("");
  const [isPaid, setIsPaid] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  /** Bumps on sign-out / unmount so late RTDB responses cannot restore cookies after logout. */
  const rtdbSyncGenRef = useRef(0);

  useEffect(() => {
    const authMaybe = getFirebaseAuth();
    if (!authMaybe) {
      setAuthReady(true);
      return;
    }

    const auth = mustAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        rtdbSyncGenRef.current += 1;
        setEmail(null);
        setName("");
        setRole("user");
        setPlan("");
        setIsPaid(false);
        setOpen(false);
        setAuthReady(true);
        return;
      }
      const e = (u.email || getCookie("rh_email") || "").trim().toLowerCase();
      if (!e) {
        setEmail(null);
        setAuthReady(true);
        return;
      }
      const first = getCookie("rh_first") ?? "";
      const last = getCookie("rh_last") ?? "";
      const fromCookies = [first, last]
        .map((s) => s.trim())
        .filter(Boolean)
        .join(" ");
      setEmail(e);
      setName(
        fromCookies || (u.displayName ?? "").trim() || (u.email ?? "").split("@")[0] || "Account",
      );
      // Optimistic: cookies, then Realtime DB overwrites (role, plan, paid) for accuracy.
      const optimisticRole: "admin" | "user" =
        isAdminEmail(e) || getCookie("rh_role") === "admin" ? "admin" : "user";
      setRole(optimisticRole);
      setPlan(getCookie("rh_plan") ?? "");
      setIsPaid(Boolean(getCookie("rh_paid")));
      setAuthReady(true);
      // Ensure header menu immediately reflects admin allow-list even if RTDB read is blocked.
      setRhSession(e, { role: optimisticRole });

      const genAtStart = rtdbSyncGenRef.current;
      void (async () => {
        let data = null as Awaited<ReturnType<typeof getUserData>>;
        try {
          data = await getUserData(u.uid);
        } catch (err) {
          // Common during login transitions: RTDB rules require auth, but token not ready yet.
          // Do not crash the whole app shell; keep cookie-based state until next refresh.
          if (err instanceof Error) {
            const msg = err.message.toLowerCase();
            if (msg.includes("permission") || msg.includes("permission denied")) return;
          }
          return;
        }
        if (genAtStart !== rtdbSyncGenRef.current) return;
        const cu = auth.currentUser;
        if (!cu?.email || cu.email.trim().toLowerCase() !== e) return;

        const r: "admin" | "user" =
          data?.role === "admin" || isAdminEmail(e) ? "admin" : "user";
        setRole(r);
        if (data?.plan) {
          setPlan(data.plan);
          setRhPlan(data.plan as "basic" | "premium" | "signals");
        } else {
          setPlan("");
          clearRhPlan();
        }
        const paid = Boolean(data?.isPaid);
        setIsPaid(paid);
        if (paid) markRhPaid();
        else clearRhPaid();

        setRhSession(e, { role: r });
        const ps = (data?.paymentStatus as RhPaymentStatus | undefined) ?? "none";
        const cookiePayment: RhPaymentStatus =
          ps === "pending" || ps === "rejected"
            ? ps
            : data?.isPaid
              ? "approved"
              : "none";
        setRhPaymentStatus(cookiePayment);
      })();
    });
    return () => {
      rtdbSyncGenRef.current += 1;
      unsub();
    };
  }, []);

  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(ev.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  const dashboardHref = useMemo(() => {
    if (role === "admin") return "/admin";
    if (!plan) return "/plans";
    return `/dashboard/${plan}`;
  }, [plan, role]);

  if (!authReady) {
    return (
      <div
        className="h-9 w-9 shrink-0 rounded-full bg-slate-800/20 md:h-9 md:w-[92px] md:rounded"
        aria-hidden
      />
    );
  }

  if (!email) {
    return (
      <Link
        href="/auth"
        className="inline-flex items-center justify-center rounded-full border border-sky-400/25 bg-[color:var(--rh-accent)] px-3 py-2 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_0_20px_rgba(37,99,235,0.28)] transition hover:bg-[color:var(--rh-accent-bright)] hover:shadow-[0_0_26px_rgba(59,130,246,0.40)] md:px-6 md:rounded"
      >
        <span className="md:hidden" aria-hidden>
          ↪
        </span>
        <span className="hidden md:inline">Login</span>
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-left text-sm font-extrabold text-white transition md:px-3",
          "border border-sky-400/35 bg-slate-950/35",
          "shadow-[0_0_0_1px_rgba(56,189,248,0.18),0_0_22px_rgba(56,189,248,0.20)]",
          "hover:border-sky-300/55 hover:bg-slate-900/35 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.22),0_0_28px_rgba(56,189,248,0.26)]",
          open
            ? "border-sky-300/70 shadow-[0_0_0_1px_rgba(56,189,248,0.28),0_0_34px_rgba(56,189,248,0.34)]"
            : "",
        ].join(" ")}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/25 bg-slate-900/45 text-[11px] font-black text-sky-200">
          {(name || email).slice(0, 1).toUpperCase()}
        </span>
        <span className="hidden max-w-[140px] truncate text-sm font-extrabold md:block">
          {name || "Account"}
        </span>
        <span className="hidden text-slate-300 md:inline" aria-hidden>
          ▾
        </span>
      </button>

      {open ? (
        <div className="absolute right-0 mt-3 w-[260px] overflow-hidden rounded-3xl border border-sky-400/20 bg-slate-950/90 shadow-[0_12px_50px_rgba(0,0,0,0.55)] backdrop-blur-md">
          <div className="px-5 py-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Menu
            </p>
            <p className="mt-2 truncate text-sm font-extrabold text-white">
              {name || "Account"}
            </p>
            <p className="mt-1 truncate text-xs text-slate-400">{email}</p>
          </div>
          <div className="border-t border-sky-400/10 p-2">
            {[
              { label: "Profile", href: "/profile" },
              { label: "My Plan", href: "/plans" },
              ...((role === "admin" || isPaid)
                ? [
                    {
                      label: role === "admin" ? "Admin console" : "Dashboard",
                      href: dashboardHref,
                    },
                  ]
                : []),
              { label: "Contact", href: "/contact" },
            ].map((i) => (
              <Link
                key={`${i.label}-${i.href}`}
                href={i.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-900/45 hover:text-white"
              >
                <Icon
                  name={
                    i.label === "Profile"
                      ? "profile"
                      : i.label === "My Plan"
                        ? "plan"
                        : i.label === "Admin console" || i.label === "Dashboard"
                          ? role === "admin"
                            ? "admin"
                            : "dashboard"
                          : "contact"
                  }
                />
                {i.label}
              </Link>
            ))}

            <div className="mt-2 px-1">
              <LogoutButton className="w-full rounded-2xl border border-[color:var(--rh-red)]/35 bg-[color:var(--rh-red)]/10 px-4 py-2.5 text-left text-sm font-extrabold text-white transition hover:border-[color:var(--rh-red-hover)]/55 hover:bg-[color:var(--rh-red)]/14" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

