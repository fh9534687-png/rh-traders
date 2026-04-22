import Link from "next/link";

function FooterLogo() {
  return (
    <div className="flex items-baseline gap-2.5 select-none sm:gap-3">
      <span
        className="font-['Georgia'] text-3xl font-black leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[color:var(--rh-gold-1)] via-amber-400 to-[color:var(--rh-gold-2)] sm:text-4xl"
        aria-label="RH"
      >
        RH
      </span>
      <span className="font-['Georgia'] text-xs font-black tracking-[0.28em] text-slate-100 sm:text-sm">
        TRADERS
      </span>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="mt-auto border-t border-sky-500/20 bg-[#020617] text-slate-100 shadow-[0_-12px_48px_rgba(0,0,0,0.4)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <FooterLogo />
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              Premium crypto signals, learning, and market analysis—built
              with a clean, professional trading aesthetic.
            </p>
          </div>

          <div>
            <p className="text-sm font-black tracking-wide text-white">
              Quick Links
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-400">
              {[
                { label: "Home", href: "/" },
                { label: "Plans", href: "/plans" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="w-fit transition hover:text-[color:var(--rh-sky)]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black tracking-wide text-white">
              Contact
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <a
                href="mailto:hello@rhtraders.com"
                className="w-fit transition hover:text-[color:var(--rh-sky)]"
              >
                hello@rhtraders.com
              </a>
              <Link
                href="/contact"
                className="w-fit transition hover:text-[color:var(--rh-sky)]"
              >
                WhatsApp: +00 000 000 000
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-black tracking-wide text-white">
              Social
            </p>
            <div className="mt-4 flex items-center gap-3">
              {["X", "IG", "YT"].map((s) => (
                <Link
                  key={s}
                  href="/contact"
                  className="inline-flex h-12 w-12 items-center justify-center rounded border border-sky-500/35 bg-slate-900/80 text-sm font-black text-white transition hover:border-[color:var(--rh-sky)] hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                  aria-label={s}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © 2026 RH Traders. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
