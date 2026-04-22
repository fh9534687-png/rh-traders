"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const items = [
  { label: "AI Trading Assistant", href: "/chat-bot", desc: "Ask questions, get structured trading help.", icon: "ai" },
  { label: "Position Size Calculator", href: "/tools/position-size", desc: "Size positions using risk + stop loss.", icon: "size" },
  { label: "Risk Calculator", href: "/tools/risk", desc: "Convert risk % into exact amount.", icon: "risk" },
  { label: "Profit/Loss Calculator", href: "/tools/profit-loss", desc: "Estimate P/L from entry, exit, lot size.", icon: "pl" },
] as const;

function Icon({ name }: { name: (typeof items)[number]["icon"] }) {
  const cls = "h-4 w-4 text-slate-200";
  if (name === "ai")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M8 9V6a4 4 0 0 1 8 0v3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 10h12v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M10 13h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  if (name === "size")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 18V6m16 12V6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 12h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10 9 8 12l2 3M14 9l2 3-2 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "risk")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 8v5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 16h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 16l4-5 3 3 3-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 8h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg
      className="h-4 w-4 text-slate-200 transition group-hover:text-white"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M14.7 6.3 17.7 3.3a1.6 1.6 0 0 1 2.3 0l.7.7a1.6 1.6 0 0 1 0 2.3l-3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 7a5 5 0 0 0-7 7l8 8a2.6 2.6 0 0 0 3.7 0l5.3-5.3a2.6 2.6 0 0 0 0-3.7l-8-8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 11.5h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ToolsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(ev.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  const activeHref = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.pathname;
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative inline-flex items-center gap-2 rounded-xl px-1.5 py-1 text-[13px] font-extrabold tracking-wide text-slate-100 transition hover:bg-slate-900/35 hover:text-white"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2">
          <ToolsIcon />
          Tools <span className="text-slate-400" aria-hidden>▾</span>
        </span>
        <span className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-[color:var(--rh-sky)] transition-transform duration-300 group-hover:scale-x-100" />
      </button>

      {open ? (
        <div className="absolute left-0 z-50 mt-3 w-[340px] overflow-hidden rounded-3xl border-2 border-sky-400/25 bg-[#020617] shadow-[0_18px_70px_rgba(2,6,23,0.85),0_0_0_1px_rgba(56,189,248,0.12)]">
          <div className="px-5 py-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-300">
              Tools
            </p>
            <p className="mt-2 text-sm text-slate-200/90">
              Practical calculators and the AI assistant for disciplined execution.
            </p>
          </div>
          <div className="border-t border-sky-400/15 p-2">
            {items.map((i) => {
              const active = activeHref === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "block rounded-2xl px-4 py-3 transition",
                    active
                      ? "bg-slate-900/70"
                      : "hover:bg-slate-900/60 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.10)_inset]",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl border border-sky-400/20 bg-slate-950/60">
                      <Icon name={i.icon} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-white">{i.label}</p>
                      <p className="mt-1 text-xs text-slate-300/80">{i.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

