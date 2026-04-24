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

function SocialIcon({
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
      className={[
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition",
        "hover:scale-[1.04] hover:shadow-[0_14px_34px_rgba(0,0,0,0.35)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--rh-sky)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
        className,
      ].join(" ")}
      aria-label={label}
      title={label}
    >
      {children}
    </a>
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
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              RH Traders is an education-first, trustworthy crypto trading platform: clear
              courses, honest guidance, and support you can reach—no hype, no hidden promises.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
              You&apos;ll learn how markets move, how to read charts and context, risk and
              position sizing, when and how to use signals responsibly, and how to build
              discipline with a structured dashboard—so you can trade with a plan, not guesswork.
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
                href="mailto:rh6219289@gmail.com"
                className="w-fit transition hover:text-[color:var(--rh-sky)]"
              >
                rh6219289@gmail.com
              </a>
              <a
                href="tel:+923495357142"
                className="w-fit transition hover:text-[color:var(--rh-sky)]"
              >
                Phone / WhatsApp: +92 349 5357142
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-black tracking-wide text-white">
              Social
            </p>
            <div className="mt-4 flex items-center gap-3">
              <SocialIcon
                href="https://www.instagram.com/bulls_tradingzone?igsh=MXZ1amk1M2ZwZnBsNQ%3D%3D&utm_source=qr"
                label="Instagram"
                className="bg-[radial-gradient(circle_at_30%_20%,#feda75,transparent_55%),radial-gradient(circle_at_20%_90%,#fa7e1e,transparent_55%),radial-gradient(circle_at_90%_30%,#d62976,transparent_55%),radial-gradient(circle_at_80%_95%,#962fbf,transparent_55%),radial-gradient(circle_at_65%_50%,#4f5bd5,transparent_55%)]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.2 1.6a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </SocialIcon>

              <SocialIcon
                href="https://www.facebook.com/share/1BotTncw1F/?mibextid=wwXIfr"
                label="Facebook"
                className="bg-[#1877F2]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M13.5 22v-8h2.8l.5-3H13.5V9.1c0-.9.3-1.6 1.7-1.6h1.9V4.8c-.3 0-1.5-.1-2.8-.1-2.8 0-4.8 1.7-4.8 4.8V11H7v3h2.6v8h3.9Z" />
                </svg>
              </SocialIcon>

              <SocialIcon
                href="https://www.tiktok.com/@itssebi24?_r=1&_t=ZS-95bqlbwTi6P"
                label="TikTok"
                className="bg-[#0b1220]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M16.6 2c.2 1.8 1.2 3.3 2.7 4.3 1 0.7 2.1 1 2.7 1.1v3.1c-.7 0-2.7-.1-4.6-1.3v7.1c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .6 0 .9.1v3.4c-.3-.1-.6-.2-.9-.2-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V2h3.3Z" />
                </svg>
              </SocialIcon>

              <SocialIcon
                href="http://www.youtube.com/@RHworld-o9s"
                label="YouTube"
                className="bg-[#FF0000]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5A3 3 0 0 0 2.4 7.2 31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
                </svg>
              </SocialIcon>
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
