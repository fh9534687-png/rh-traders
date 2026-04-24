"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  type Auth,
  updateProfile,
} from "firebase/auth";
import { isAdminEmail, setRhProfileName, setRhSession } from "../lib/rhSession";
import { firebaseAuth } from "../lib/firebase/auth";
import { markRhPaid, setRhPaymentStatus, setRhPlan, type RhPaymentStatus } from "../lib/rhEntitlements";
import { setRhSignalsRequestStatus } from "../lib/rhSignals";
import { getLatestSignalsRequestForEmail, getUserData, saveUserData, type Plan, type Role } from "../lib/firebase/db";

type Mode = "login" | "signup";

function mustAuth(): Auth {
  if (!firebaseAuth) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* environment variables (Vercel + .env.local).",
    );
  }
  return firebaseAuth;
}

function getFirebaseErrorMessage(err: unknown) {
  if (!err || typeof err !== "object") return null;
  const code = "code" in err ? (err as { code?: unknown }).code : undefined;
  if (typeof code !== "string") return null;

  // Most common setup issue.
  if (code === "auth/configuration-not-found") {
    return (
      "Firebase is not configured for Email/Password sign-in yet. " +
      "Go to Firebase Console → Authentication → Sign-in method → enable Email/Password. " +
      "Then restart the dev server."
    );
  }

  if (code === "auth/email-already-in-use") return "This email is already in use. Try logging in instead.";
  if (code === "auth/invalid-email") return "Please enter a valid email.";
  /** Firebase v10+ often returns this instead of wrong-password / user-not-found. */
  if (code === "auth/invalid-credential" || code === "auth/invalid-login-credentials") {
    return (
      "That email and password do not match our records. " +
      "Check the password, or use Signup if you have not created an account yet."
    );
  }
  if (code === "auth/wrong-password") return "Incorrect password.";
  if (code === "auth/user-not-found") {
    return "No account found for this email. Check the address or use Signup.";
  }
  if (code === "auth/weak-password") return "Password is too weak. Use at least 6 characters.";
  if (code === "auth/network-request-failed") return "Network error. Check your connection and try again.";
  if (code === "auth/too-many-requests") return "Too many attempts. Wait a minute and try again.";
  if (code === "auth/missing-email") return "Please enter your email address.";
  if (code === "auth/unauthorized-continue-uri") {
    return (
      "This site URL is not allowed for password reset links. " +
      "In Firebase Console → Authentication → Settings → Authorized domains, add your domain (e.g. localhost for dev)."
    );
  }
  if (code === "auth/expired-action-code") {
    return (
      "This reset link has expired or was already used. Request a new reset email from Forgot password. " +
      "Tip: some email apps preview links and use them up—try “Open in browser” or paste the link manually."
    );
  }
  if (code === "auth/invalid-action-code") {
    return (
      "This reset link is not valid. Request a new reset email. If you use Outlook or corporate email, " +
      "try opening the link in a private/incognito window or paste it into the address bar."
    );
  }

  return null;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-sm font-extrabold tracking-wide text-slate-400">
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-[12px] border border-sky-500/35 bg-slate-950/90 px-4 py-3 text-[15px] text-slate-100",
        "outline-none ring-0 transition duration-200",
        "placeholder:text-slate-500",
        "focus:border-sky-400/55 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.18)]",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative flex-1 rounded-full px-4 py-2 text-sm font-extrabold tracking-wide transition",
        active
          ? "text-white"
          : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function AuthCard() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  /** When the email opens /auth?mode=resetPassword&oobCode=… (custom action URL in Firebase). */
  const [oobFromEmail, setOobFromEmail] = useState<string | null>(null);
  const [resetNewPw, setResetNewPw] = useState("");
  const [resetConfirmPw, setResetConfirmPw] = useState("");
  const [resetDoneBanner, setResetDoneBanner] = useState(false);

  const buttonLabel = mode === "login" ? "Login" : "Create Account";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("reset") === "done") setResetDoneBanner(true);
    if (sp.get("mode") !== "resetPassword") return;
    const raw = sp.get("oobCode");
    if (!raw) return;
    /** `URLSearchParams` already decodes once—do not `decodeURIComponent` again (can corrupt the code). */
    const code = raw.replace(/\s+/g, "").trim();
    if (code.length < 8) return;
    setOobFromEmail(code);
  }, []);

  const canSubmit = useMemo(() => {
    if (mode === "signup") {
      if (!firstName.trim()) return false;
      if (!lastName.trim()) return false;
    }
    if (!isValidEmail(email)) return false;
    if (password.trim().length < 6) return false;
    return true;
  }, [email, firstName, lastName, mode, password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const auth = mustAuth();
    const cleanEmail = email.trim();
    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (mode === "signup") {
      if (!firstName.trim() || !lastName.trim()) {
        setError("Please enter your first and last name.");
        return;
      }
    }

    setSubmitting(true);
    try {
      await auth.authStateReady();

      const fullName = [firstName, lastName].map((s) => s.trim()).filter(Boolean).join(" ");

      if (mode === "signup") {
        const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        if (fullName) {
          await updateProfile(cred.user, { displayName: fullName });
        }
        // Mirror user data into cookies for route protection + dashboard greeting.
        const userEmail = cred.user.email ?? cleanEmail;
        const uid = cred.user.uid;
        const role: Role = isAdminEmail(userEmail) ? "admin" : "user";
        setRhSession(userEmail, { role });
        if (fullName) setRhProfileName(firstName, lastName);
        // Ensure a user record exists in DB.
        await saveUserData(userEmail, role, null, { authUid: uid });
        setRhPaymentStatus("none");
        router.push(role === "admin" ? "/admin" : "/plans");
        return;
      }

      // LOGIN
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const userEmail = cred.user.email ?? cleanEmail;
      const display = cred.user.displayName ?? "";

      const uid = cred.user.uid;

      // Prefer typed name, else derive from Firebase displayName.
      const nameSource = fullName || display;
      if (nameSource) {
        const parts = nameSource.trim().split(/\s+/).filter(Boolean);
        const f = (firstName.trim() || parts[0] || "").trim();
        const l = (lastName.trim() || parts.slice(1).join(" ") || "").trim();
        if (f || l) setRhProfileName(f, l);
      }

      let user = null as Awaited<ReturnType<typeof getUserData>>;
      try {
        user = await getUserData(userEmail);
      } catch (err) {
        // Avoid showing "permission denied" in UI during auth/RTDB timing/rules issues.
        // We'll still allow login and rely on allow-list + subsequent refresh to sync user profile.
        if (err instanceof Error) {
          const msg = err.message.toLowerCase();
          if (msg.includes("permission") || msg.includes("permission denied")) {
            user = null;
          } else {
            throw err;
          }
        } else {
          user = null;
        }
      }
      const role: Role =
        user?.role === "admin" || isAdminEmail(userEmail) ? "admin" : "user";
      setRhSession(userEmail, { role });
      // One write + merged snapshot (avoids a second RTDB read after login).
      const refreshed = await saveUserData(userEmail, role, null, { authUid: uid });
      if (refreshed?.plan) setRhPlan(refreshed.plan as Plan);
      if (refreshed?.isPaid) markRhPaid();
      const ps = (refreshed?.paymentStatus as RhPaymentStatus | undefined) ?? "none";
      const cookiePayment: RhPaymentStatus =
        ps === "pending" || ps === "rejected"
          ? ps
          : refreshed?.isPaid
            ? "approved"
            : "none";
      setRhPaymentStatus(cookiePayment);

      // Signals access (phone-based request). Store status in cookie so middleware can gate /signals-dashboard.
      try {
        const latestSignalsReq = await getLatestSignalsRequestForEmail(userEmail);
        const s = latestSignalsReq?.status ?? "none";
        setRhSignalsRequestStatus(
          s === "pending" || s === "approved" || s === "rejected" ? s : "none",
        );
      } catch {
        setRhSignalsRequestStatus("none");
      }

      if (role === "admin") {
        router.push("/admin");
      } else {
        // If user paid for Signals plan, or has approved SignalsRequest, send to /signals-dashboard.
        if (refreshed?.isPaid && refreshed?.plan === "signals") {
          router.push("/signals-dashboard");
          return;
        }
        try {
          const latestSignalsReq = await getLatestSignalsRequestForEmail(userEmail);
          if (latestSignalsReq?.status === "approved") {
            router.push("/signals-dashboard");
            return;
          }
        } catch {
          // ignore
        }
      }
      if (ps === "pending" && refreshed?.plan && !refreshed?.isPaid) {
        router.push("/payment/status");
      } else if (refreshed?.isPaid && refreshed.plan) {
        router.push(`/dashboard/${refreshed.plan}`);
      } else {
        router.push("/plans");
      }
    } catch (err) {
      setError(
        getFirebaseErrorMessage(err) ??
          (err instanceof Error ? err.message : "Authentication failed. Please try again."),
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function onSendPasswordReset() {
    setError(null);
    setResetSent(false);
    const auth = mustAuth();
    const cleanEmail = email.trim();
    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      await auth.authStateReady();
      /**
       * Do not pass `continueUrl` here: a mismatched or double-encoded URL can make Firebase’s
       * hosted action page treat the flow as invalid. Users complete reset on Firebase’s page,
       * or—if you set a custom “Email action handler” in Console to `/auth`—via `oobFromEmail` below.
       */
      await sendPasswordResetEmail(auth, cleanEmail);
      setResetSent(true);
    } catch (err) {
      setError(
        getFirebaseErrorMessage(err) ??
          (err instanceof Error ? err.message : "Could not send reset email. Try again."),
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function onSubmitNewPasswordFromLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!oobFromEmail) return;
    const auth = mustAuth();
    if (resetNewPw.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (resetNewPw !== resetConfirmPw) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await auth.authStateReady();
      await confirmPasswordReset(auth, oobFromEmail, resetNewPw);
      setOobFromEmail(null);
      setResetNewPw("");
      setResetConfirmPw("");
      router.replace("/auth?reset=done");
      setResetDoneBanner(true);
    } catch (err) {
      setError(
        getFirebaseErrorMessage(err) ??
          (err instanceof Error ? err.message : "Could not update password. Try requesting a new link."),
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (oobFromEmail) {
    return (
      <section className="rh-card relative w-full max-w-[640px] overflow-hidden rounded-[32px] p-7 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.16),transparent_58%)]" />
        <div className="relative space-y-4">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/25 bg-slate-950/40 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
            RESET PASSWORD
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Choose a new password
          </h1>
          <p className="text-base text-slate-300">
            Enter your new password below. This page opened from your reset email—do not refresh until
            you are finished.
          </p>

          <form onSubmit={onSubmitNewPasswordFromLink} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>New password</Label>
              <Input
                type="password"
                autoComplete="new-password"
                value={resetNewPw}
                onChange={(e) => setResetNewPw(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label>Confirm new password</Label>
              <Input
                type="password"
                autoComplete="new-password"
                value={resetConfirmPw}
                onChange={(e) => setResetConfirmPw(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {error ? (
              <div className="rounded-2xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}
            <button
              type="submit"
              disabled={
                submitting || resetNewPw.trim().length < 6 || resetNewPw !== resetConfirmPw
              }
              className={[
                "rh-btn-primary w-full rounded-[12px] px-5 py-3 text-base font-extrabold tracking-wide text-white",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
            >
              {submitting ? "Saving…" : "Save new password"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="rh-card relative w-full max-w-[640px] overflow-hidden rounded-[32px] p-7 sm:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.16),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />

      <div className="relative">
        <div className="mb-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/25 bg-slate-950/40 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
            SECURE ACCESS
          </p>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Welcome to RH Traders
          </h1>
          <p className="mt-2 text-base text-slate-300">
            {forgotOpen && mode === "login"
              ? "Enter the email on your account. We will send a link to set a new password."
              : mode === "login"
                ? "Login to continue your learning path."
                : "Create your account to unlock courses and the dashboard."}
          </p>
          {resetDoneBanner ? (
            <div className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-100">
              Your password was updated. You can log in with your new password.
            </div>
          ) : null}
        </div>

        <div className="mb-6">
          <div className="relative flex rounded-full border border-sky-500/30 bg-slate-950/80 p-1">
            <span
              className={[
                "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full",
                "bg-gradient-to-r from-[color:var(--rh-orange)] to-[color:var(--rh-orange-hover)]",
                "shadow-[0_0_16px_rgba(59,130,246,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                mode === "signup" ? "translate-x-full" : "translate-x-0",
              ].join(" ")}
            />
            <TabButton
              active={mode === "login"}
              onClick={() => {
                setMode("login");
                setError(null);
                setForgotOpen(false);
                setResetSent(false);
              }}
            >
              Login
            </TabButton>
            <TabButton
              active={mode === "signup"}
              onClick={() => {
                setMode("signup");
                setError(null);
                setForgotOpen(false);
                setResetSent(false);
              }}
            >
              Signup
            </TabButton>
          </div>
        </div>

        {forgotOpen && mode === "login" ? (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void onSendPasswordReset();
            }}
          >
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
              />
            </div>

            {resetSent ? (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-100">
                If an account exists for{" "}
                <span className="font-semibold text-white">{email.trim()}</span>, you should receive
                an email shortly with a link to reset your password. Check your spam folder.
                <span className="mt-2 block text-emerald-200/90">
                  If the link says expired right away, your email app may have opened a preview—use
                  “Open in browser”, paste the link manually, or try a private/incognito window, then
                  request a new link if needed.
                </span>
              </div>
            ) : null}

            {!resetSent && error ? (
              <div className="rounded-2xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!isValidEmail(email) || submitting}
              className={[
                "rh-btn-primary w-full rounded-[12px] px-5 py-3 text-base font-extrabold tracking-wide text-white",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
            >
              {submitting ? "Sending…" : "Send reset link"}
            </button>

            <button
              type="button"
              onClick={() => {
                setForgotOpen(false);
                setError(null);
                setResetSent(false);
              }}
              className="w-full text-center text-sm font-semibold text-sky-300/95 underline-offset-2 hover:text-sky-200 hover:underline"
            >
              ← Back to login
            </button>

            <div className="pt-1 grid gap-2 sm:grid-cols-3 text-xs text-slate-500">
              <p className="rounded-2xl border border-sky-400/15 bg-slate-950/40 px-3 py-2 text-center">
                SSL checkout ready
              </p>
              <p className="rounded-2xl border border-sky-400/15 bg-slate-950/40 px-3 py-2 text-center">
                Secure account access
              </p>
              <p className="rounded-2xl border border-sky-400/15 bg-slate-950/40 px-3 py-2 text-center">
                Premium dashboard
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>First name</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    autoComplete="given-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last name</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    autoComplete="family-name"
                  />
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label>Password</Label>
                {mode === "login" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setForgotOpen(true);
                      setError(null);
                      setResetSent(false);
                    }}
                    className="text-xs font-bold text-sky-300/95 underline-offset-2 hover:text-sky-200 hover:underline"
                  >
                    Forgot password?
                  </button>
                ) : null}
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className={[
                    "absolute right-2 top-1/2 -translate-y-1/2",
                    "inline-flex h-9 w-9 items-center justify-center rounded-lg",
                    "border border-sky-400/20 bg-slate-950/60 text-slate-200",
                    "transition hover:border-sky-400/35 hover:bg-slate-950/80",
                    "focus:outline-none focus:shadow-[0_0_0_2px_rgba(56,189,248,0.22)]",
                  ].join(" ")}
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path d="M4 4l16 16" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className={[
                "rh-btn-primary w-full rounded-[12px] px-5 py-3 text-base font-extrabold tracking-wide text-white",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
            >
              {submitting ? "Please wait…" : buttonLabel}
            </button>

            <div className="pt-1 grid gap-2 sm:grid-cols-3 text-xs text-slate-500">
              <p className="rounded-2xl border border-sky-400/15 bg-slate-950/40 px-3 py-2 text-center">
                SSL checkout ready
              </p>
              <p className="rounded-2xl border border-sky-400/15 bg-slate-950/40 px-3 py-2 text-center">
                Secure account access
              </p>
              <p className="rounded-2xl border border-sky-400/15 bg-slate-950/40 px-3 py-2 text-center">
                Premium dashboard
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
