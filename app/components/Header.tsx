"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";
import { ToolsMenu } from "./ToolsMenu";

function TopBarIcon({ kind }: { kind: "phone" | "email" | "pin" | "contact" }) {
  // Top bar sits on a light sky background; keep icons dark for contrast.
  const cls = "h-4 w-4 text-[#0b1b3a]";
  if (kind === "phone")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8.2 11.2c1.7 3 4.2 5.4 7.2 7.2l2.4-2.4c.4-.4 1-.5 1.5-.3 1 .4 2.2.7 3.4.7.8 0 1.3.6 1.3 1.3V21c0 .8-.6 1.4-1.3 1.4C10.2 22.4 1.6 13.8 1.6 3.7 1.6 3 2.2 2.4 3 2.4H6c.7 0 1.3.6 1.3 1.3 0 1.2.2 2.3.7 3.4.2.5.1 1.1-.3 1.5L8.2 11.2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (kind === "email")
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
  if (kind === "pin")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 22s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 13.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4h16v12H7l-3 3V4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 9.5h8M8 12.5h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TopSocialIcon({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={[
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white shadow-[0_10px_20px_rgba(0,0,0,0.25)] transition",
        "hover:scale-[1.04] hover:shadow-[0_14px_30px_rgba(0,0,0,0.32)]",
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}

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
    | "blog"
    | "courses"
    | "signals"
    | "crypto";
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
  if (name === "courses")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 7.5 12 4l8 3.5L12 11 4 7.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M4 12l8 3.5 8-3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M4 16.5 12 20l8-3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "signals")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 14l4-4 3 3 5-6 4 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 20h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  if (name === "crypto")
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
  { label: "Courses", href: "/plans", icon: "courses" },
  { label: "FAQ", href: "/faq", icon: "faq" },
  // Tools dropdown is inserted separately (with its own icon).
  { label: "Contact", href: "/contact", icon: "contact" },
  { label: "Blog", href: "/blog", icon: "blog" },
] as const;

const marketItems = [
  { label: "Market Overview", href: "/market" },
  { label: "Top Gainers", href: "/market/top-gainers" },
  { label: "Top Losers", href: "/market/top-losers" },
  { label: "Crypto Prices", href: "/market/crypto-prices" },
  { label: "Signals: How it works", href: "/signals/how-signals-work" },
  { label: "Signals: Market types", href: "/signals/markets" },
  { label: "Signals: Beginner guide", href: "/signals/beginners" },
] as const;

const cryptoItems = [
  { label: "What are Cryptocurrencies?", href: "/cryptocurrencies/what-are-cryptocurrencies" },
  { label: "Benefits of Crypto Trading", href: "/cryptocurrencies/benefits-of-crypto-trading" },
] as const;

function DropdownChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={[
        "h-4 w-4 text-slate-300 transition",
        open ? "rotate-180" : "rotate-0",
      ].join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavDropdown({
  label,
  icon,
  items,
  activeHref,
}: {
  label: string;
  icon: Parameters<typeof NavIcon>[0]["name"];
  items: ReadonlyArray<{ label: string; href: string }>;
  activeHref: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const active = items.some((i) => i.href === activeHref) || activeHref === items[0]?.href;

  useEffect(() => {
    if (!open) return;
    const onDown = (ev: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(ev.target as Node)) setOpen(false);
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "group relative inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-[13px] font-extrabold tracking-wide transition",
          active ? "text-white" : "text-slate-200 hover:text-white",
          "hover:bg-white/5",
        ].join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <NavIcon name={icon} />
        <span>{label}</span>
        <DropdownChevron open={open} />
        <span className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-[color:var(--rh-accent)] transition-transform duration-300 group-hover:scale-x-100" />
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#070b14]/95 shadow-[0_24px_70px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div className="p-2">
            {items.map((it) => {
              const isActive = activeHref === it.href;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-extrabold transition",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-200 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                >
                  <span className="min-w-0 truncate">{it.label}</span>
                  <span className="text-[color:var(--rh-skyblue)]">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

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
  const [mobileMarketOpen, setMobileMarketOpen] = useState(false);
  const [mobileCryptoOpen, setMobileCryptoOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070b14] shadow-[0_10px_35px_rgba(0,0,0,0.45)]">
      {/* Top info bar (TradeNation-style, compact) */}
      <div className="border-b border-black/10 bg-[#87CEEB]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 py-1.5 text-[11px] font-bold text-slate-900 sm:py-2">
            <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-slate-900">
              <a
                href="tel:+923495357142"
                className="inline-flex items-center gap-2 transition hover:text-slate-950"
              >
                <TopBarIcon kind="phone" />
                <span>+92 349 5357142</span>
              </a>
              <a
                href="mailto:rh6219289@gmail.com"
                className="hidden items-center gap-2 transition hover:text-slate-950 sm:inline-flex"
              >
                <TopBarIcon kind="email" />
                <span>rh6219289@gmail.com</span>
              </a>
              <span className="hidden items-center gap-2 text-slate-800 lg:inline-flex">
                <TopBarIcon kind="pin" />
                <span>Gujarkhan, Dultaala</span>
              </span>
              <Link
                href="/contact"
                className="hidden items-center gap-2 text-slate-900 transition hover:text-slate-950 md:inline-flex"
              >
                <TopBarIcon kind="contact" />
                <span>Contact</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <TopSocialIcon
                href="https://www.instagram.com/bulls_tradingzone?igsh=MXZ1amk1M2ZwZnBsNQ%3D%3D&utm_source=qr"
                label="Instagram"
                className="bg-[radial-gradient(circle_at_30%_20%,#feda75,transparent_55%),radial-gradient(circle_at_20%_90%,#fa7e1e,transparent_55%),radial-gradient(circle_at_90%_30%,#d62976,transparent_55%),radial-gradient(circle_at_80%_95%,#962fbf,transparent_55%),radial-gradient(circle_at_65%_50%,#4f5bd5,transparent_55%)]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.2 1.6a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </TopSocialIcon>

              <TopSocialIcon
                href="https://www.facebook.com/share/1BotTncw1F/?mibextid=wwXIfr"
                label="Facebook"
                className="bg-[#1877F2]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M13.5 22v-8h2.8l.5-3H13.5V9.1c0-.9.3-1.6 1.7-1.6h1.9V4.8c-.3 0-1.5-.1-2.8-.1-2.8 0-4.8 1.7-4.8 4.8V11H7v3h2.6v8h3.9Z" />
                </svg>
              </TopSocialIcon>

              <TopSocialIcon
                href="https://www.tiktok.com/@itssebi24?_r=1&_t=ZS-95bqlbwTi6P"
                label="TikTok"
                className="bg-[#0b1220]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M16.6 2c.2 1.8 1.2 3.3 2.7 4.3 1 0.7 2.1 1 2.7 1.1v3.1c-.7 0-2.7-.1-4.6-1.3v7.1c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .6 0 .9.1v3.4c-.3-.1-.6-.2-.9-.2-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V2h3.3Z" />
                </svg>
              </TopSocialIcon>

              <TopSocialIcon
                href="http://www.youtube.com/@RHworld-o9s"
                label="YouTube"
                className="bg-[#FF0000]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
                </svg>
              </TopSocialIcon>
            </div>
          </div>
        </div>
      </div>

      {/* Header gets a bit more width so the right user menu never clips */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
        <div className="flex h-16 items-center gap-3">
          <Link href="/" className="-ml-1 flex items-center gap-3 md:-ml-2">
            <Logo variant="dark" />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-3 lg:flex lg:gap-4"
            aria-label="Primary"
          >
            {navItems.slice(0, 1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-[13px] font-extrabold tracking-wide text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
                <span className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-[color:var(--rh-accent)] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}

            <NavDropdown
              label="Market"
              icon="market"
              items={marketItems}
              activeHref={activeHref}
            />

            <NavDropdown
              label="Cryptocurrencies"
              icon="crypto"
              items={cryptoItems}
              activeHref={activeHref}
            />

            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-[13px] font-extrabold tracking-wide text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
                <span className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-[color:var(--rh-accent)] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
            <ToolsMenu />
          </nav>

          <div className="ml-auto flex flex-none items-center gap-2 pl-2 pr-2 sm:gap-3 sm:pr-0">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/8 lg:hidden"
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
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/55"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed right-0 top-[calc(4rem+2.25rem)] z-50 h-[calc(100vh-4rem-2.25rem)] w-[min(92vw,380px)] overflow-y-auto border-l border-white/10 bg-[#070b14]/95 shadow-[0_0_80px_rgba(0,0,0,0.75)] backdrop-blur-md">
            <div className="p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-400">
                Menu
              </p>
              <div className="mt-4 grid gap-2">
                {/* Core links */}
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
                          ? "border-white/15 bg-white/8 text-white"
                          : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/8 hover:text-white",
                      ].join(" ")}
                    >
                      <NavIcon name={item.icon} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Market dropdown (mobile) */}
                <button
                  type="button"
                  onClick={() => setMobileMarketOpen((v) => !v)}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-extrabold text-slate-200 transition hover:bg-white/8 hover:text-white"
                  aria-expanded={mobileMarketOpen}
                >
                  <span className="inline-flex items-center gap-3">
                    <NavIcon name="market" />
                    Market
                  </span>
                  <DropdownChevron open={mobileMarketOpen} />
                </button>
                {mobileMarketOpen ? (
                  <div className="grid gap-2 pl-3">
                    {marketItems.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/8 hover:text-white"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                ) : null}

                {/* Cryptocurrencies dropdown (mobile) */}
                <button
                  type="button"
                  onClick={() => setMobileCryptoOpen((v) => !v)}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-extrabold text-slate-200 transition hover:bg-white/8 hover:text-white"
                  aria-expanded={mobileCryptoOpen}
                >
                  <span className="inline-flex items-center gap-3">
                    <NavIcon name="crypto" />
                    Cryptocurrencies
                  </span>
                  <DropdownChevron open={mobileCryptoOpen} />
                </button>
                {mobileCryptoOpen ? (
                  <div className="grid gap-2 pl-3">
                    {cryptoItems.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/8 hover:text-white"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-3">
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
