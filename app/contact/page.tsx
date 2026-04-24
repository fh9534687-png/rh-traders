"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Subject =
  | "Support"
  | "Plans and billing"
  | "Signals access"
  | "Partnership"
  | "Other";

export default function ContactPage() {
  const subjects = useMemo<Subject[]>(
    () => ["Support", "Plans and billing", "Signals access", "Partnership", "Other"],
    []
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<Subject>("Support");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  return (
    <main className="relative flex-1 bg-[#020617] px-5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,140,0,0.06),transparent_58%)]" />

      <div className="rh-wrap relative">
        <header className="mx-auto max-w-[860px] text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-base text-slate-400 sm:text-lg">
            Reach us for support, plan questions, and partnership requests.
          </p>
        </header>

        <section className="mx-auto mt-10 grid max-w-[1120px] gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left panel (like reference) */}
          <div className="rh-card rounded-3xl p-7 sm:p-9">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[color:var(--rh-border-red)]">
              Get in touch now
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Have questions about RH Traders?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
              Send us a message and we will reply by email. This is the fastest way to get help with
              course access, signals, or plan questions.
            </p>

            <div className="mt-7 space-y-5">
              <div className="rounded-2xl border border-sky-400/15 bg-slate-950/35 p-5">
                <p className="text-xs font-extrabold tracking-[0.18em] text-slate-500">EMAIL</p>
                <a
                  href="mailto:rh6219289@gmail.com"
                  className="mt-2 inline-flex text-base font-extrabold text-white transition hover:text-[color:var(--rh-border-red)]"
                >
                  rh6219289@gmail.com
                </a>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  Typical response time: within 24 hours (weekdays).
                </p>
              </div>

              <div className="rounded-2xl border border-sky-400/15 bg-slate-950/35 p-5">
                <p className="text-xs font-extrabold tracking-[0.18em] text-slate-500">PHONE</p>
                <a
                  href="tel:+923495357142"
                  className="mt-2 inline-flex text-base font-extrabold text-white transition hover:text-[color:var(--rh-border-red)]"
                >
                  +92 349 5357142
                </a>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  Available on WhatsApp for quick questions.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-400/15 bg-slate-950/35 p-5">
                <p className="text-xs font-extrabold tracking-[0.18em] text-slate-500">LOCATION</p>
                <p className="mt-2 text-base font-extrabold text-white">Gujarkhan, Dultaala</p>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  Remote-first support. Reach out by email or WhatsApp.
                </p>
              </div>

              <div className="rounded-2xl border border-sky-400/15 bg-slate-950/35 p-5">
                <p className="text-xs font-extrabold tracking-[0.18em] text-slate-500">NEXT STEPS</p>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  If you are ready to get started, choose a plan and unlock your dashboard access.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/plans"
                    className="rh-btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold text-white"
                  >
                    View Plans
                  </Link>
                  <Link
                    href="/auth"
                    className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold"
                  >
                    Login / Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="rh-card rounded-3xl p-7 sm:p-9">
            <h2 className="text-xl font-extrabold tracking-tight text-white">Send a message</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Your message will be sent to the RH Traders admin email.
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSending(true);
                setStatus(null);
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, subject, message }),
                  });
                  if (!res.ok) {
                    const t = await res.text();
                    throw new Error(t || "Failed to send message");
                  }
                  setStatus({ kind: "ok", text: "Message sent. We will reply by email." });
                  setName("");
                  setEmail("");
                  setSubject("Support");
                  setMessage("");
                } catch (err: unknown) {
                  const msg =
                    typeof err === "object" && err && "message" in err
                      ? String((err as { message: unknown }).message)
                      : "Failed to send message";
                  setStatus({ kind: "error", text: msg });
                } finally {
                  setIsSending(false);
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-extrabold tracking-[0.18em] text-slate-500">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-2xl border border-sky-400/20 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/45 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.18)]"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-extrabold tracking-[0.18em] text-slate-500">
                    Email
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    className="mt-2 w-full rounded-2xl border border-sky-400/20 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/45 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.18)]"
                    required
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-extrabold tracking-[0.18em] text-slate-500">
                  Subject
                </span>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as Subject)}
                  className="mt-2 w-full rounded-2xl border border-sky-400/20 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/45 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.18)]"
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-extrabold tracking-[0.18em] text-slate-500">
                  Message
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message"
                  rows={6}
                  className="mt-2 w-full resize-none rounded-2xl border border-sky-400/20 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/45 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.18)]"
                  required
                />
              </label>

              {status ? (
                <div
                  className={[
                    "rounded-2xl border px-4 py-3 text-sm",
                    status.kind === "ok"
                      ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-100"
                      : "border-red-500/30 bg-red-500/10 text-red-100",
                  ].join(" ")}
                >
                  {status.text}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={isSending}
                  className="rh-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-extrabold text-white disabled:opacity-60"
                >
                  {isSending ? "Sending…" : "Send message"}
                </button>
                <p className="text-xs text-slate-500">
                  By submitting, you agree to be contacted by email about your request.
                </p>
              </div>
            </form>
          </div>
        </section>

        <p className="mx-auto mt-10 max-w-[980px] text-center text-sm text-slate-500">
          Secure payment and lifetime access to your dashboard
        </p>
      </div>
    </main>
  );
}
