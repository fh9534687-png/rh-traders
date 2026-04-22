"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";
import { ToolsMenu } from "./ToolsMenu";

function NavIcon({
  name,
}: {
  name:
    | "home"
    | "market"
    | "charts"
    | "coins"
    | "faq"
    | "contact"
    | "blog";
}) {
  const cls = "h-4 w-4 text-slate-200 transition group-hover:text-white";
  if (name === "home")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 10.5 12 3l9 7.5V21a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 21V10.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 22.8V14.2h5v8.6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "market")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 19h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7 15V9m5 6V6m5 9v-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  if (name === "charts")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 19h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7 15l4-5 3 3 3-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "coins")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 21c4.4 0 8-2 8-4.5S16.4 12 12 12s-8 2-8 4.5S7.6 21 12 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M20 16.5V7.5C20 5 16.4 3 12 3S4 5 4 7.5v9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M4 7.5C4 10 7.6 12 12 12s8-2 8-4.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "faq")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 4h16v12H7l-3 3V4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 12v-.5c1.6-.7 2.5-1.6 2.5-3A2.8 2.8 0 0 0 11.6 6c-1.4 0-2.5.6-3.1 1.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 14.8h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
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
        d="M6 4h9l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 11h8M8 15h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 4v3h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navItems = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Market", href: "/market", icon: "market" },
  { label: "Charts", href: "/charts", icon: "charts" },
  { label: "Coins", href: "/coins", icon: "coins" },
  { label: "FAQ", href: "/faq", icon: "faq" },
  // Tools dropdown is inserted separately (with its own icon).
  { label: "Contact", href: "/contact", icon: "contact" },
  { label: "Blog", href: "/blog", icon: "blog" },
] as const;

function HamburgerIcon({ open }: { open: boolean }) {
  const cls = "h-5 w-5 text-slate-100";
  return open ? (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeHref = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.pathname;
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-500/15 bg-[color:var(--rh-header-bg)] shadow-[0_8px_26px_rgba(0,0,0,0.35)] backdrop-blur-md">
      {/* Header gets a bit more width so the right user menu never clips */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
        <div className="flex h-16 items-center gap-3">
          <Link href="/" className="-ml-1 flex items-center gap-3 md:-ml-2">
            <Logo variant="dark" />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-3 md:flex lg:gap-4"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative inline-flex items-center gap-2 rounded-xl px-1.5 py-1 text-[13px] font-extrabold tracking-wide text-slate-100 transition hover:bg-slate-900/35 hover:text-white"
              >
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
                <span className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-[color:var(--rh-sky)] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
            <ToolsMenu />
          </nav>

          <div className="ml-auto flex flex-none items-center gap-2 pl-2 pr-2 sm:gap-3 sm:pr-0">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-2xl border border-sky-400/20 bg-slate-950/30 px-3 py-2 transition hover:bg-slate-900/40 md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
            <UserMenu />
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/55"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-[min(92vw,380px)] overflow-y-auto border-l border-sky-400/15 bg-[#020617]/95 shadow-[0_0_70px_rgba(2,6,23,0.85)] backdrop-blur-md">
            <div className="p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-400">
                Menu
              </p>
              <div className="mt-4 grid gap-2">
                {navItems.map((item) => {
                  const active = activeHref === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-extrabold transition",
                        active
                          ? "border-sky-400/25 bg-slate-900/60 text-white"
                          : "border-sky-400/10 bg-slate-950/30 text-slate-200 hover:bg-slate-900/40 hover:text-white",
                      ].join(" ")}
                    >
                      <NavIcon name={item.icon} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 rounded-3xl border border-sky-400/15 bg-slate-950/30 p-3">
                <div className="px-2 pb-2 text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  Tools
                </div>
                <ToolsMenu />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
