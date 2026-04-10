import Link from "next/link";
import { Logo } from "./Logo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Coins", href: "/coins" },
  { label: "Market", href: "/market" },
  { label: "Charts", href: "/charts" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Chat Bot", href: "/chat-bot" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black">
      <div className="rh-wrap px-5">
        <div className="flex h-20 items-center justify-between border-b border-[color:var(--rh-red)]/35 shadow-[0_10px_40px_rgba(0,0,0,0.55)]">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-lg font-extrabold tracking-wide text-white/90 transition-colors hover:text-[color:var(--rh-red)]"
              >
                <span>{item.label}</span>
                <span className="pointer-events-none absolute -bottom-2 left-0 h-[3px] w-full origin-left scale-x-0 bg-[color:var(--rh-red)] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-extrabold text-white/95 transition hover:border-[color:var(--rh-red)]/50 md:inline-flex"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

