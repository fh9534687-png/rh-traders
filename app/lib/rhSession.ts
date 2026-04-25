export type RhSession = {
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: number;
};

const COOKIE_SESSION = "rh_session";
const COOKIE_EMAIL = "rh_email";
const COOKIE_ROLE = "rh_role";
const COOKIE_FIRST = "rh_first";
const COOKIE_LAST = "rh_last";
const COOKIE_ENROLLED = "rh_enrolled";
const COOKIE_UID = "rh_uid";

/**
 * Admin is NOT read from Firebase Auth custom claims in this app.
 * It comes from: (1) Realtime Database `users/{key}/role === "admin"`, and/or
 * (2) this allow-list (set in `.env.local` for extra admins without editing RTDB).
 *
 * `NEXT_PUBLIC_ADMIN_EMAILS` — comma-separated, e.g. `a@x.com,b@y.com`
 * `NEXT_PUBLIC_ADMIN_EMAIL` — single email (used if `ADMIN_EMAILS` is unset)
 */
function parseAdminAllowList(): string[] {
  const multi = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.trim();
  if (multi) {
    return multi
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }
  const single = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim();
  if (single) return [single.toLowerCase()];
  // Fallback admins for fresh deployments (can be overridden via env vars above).
  return ["rh6219289@gmail.com", "fh9534687@gmail.com"];
}

const ADMIN_EMAIL_LIST = parseAdminAllowList();

/** First entry (legacy / display); prefer `isAdminEmail` for checks. */
export const ADMIN_EMAIL = ADMIN_EMAIL_LIST[0] ?? "rh6219289@gmail.com";

export function isAdminEmail(email: string) {
  const e = email.trim().toLowerCase();
  return ADMIN_EMAIL_LIST.includes(e);
}

function getCookie(name: string) {
  if (typeof window === "undefined") return null;
  const key = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const hit = parts.find((p) => p.startsWith(key));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(key.length));
}

function setCookie(name: string, value: string, days = 14) {
  if (typeof window === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}; Expires=${expires}; Path=/; SameSite=Lax`;
}

function clearCookie(name: string) {
  if (typeof window === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax`;
}

export function setRhSession(email: string, opts?: { role?: "admin" | "user" }) {
  if (typeof window === "undefined") return;
  // Cookie-based session so middleware can protect routes.
  setCookie(COOKIE_SESSION, "1");
  setCookie(COOKIE_EMAIL, email);
  const role =
    opts?.role ?? (isAdminEmail(email) ? "admin" : "user");
  setCookie(COOKIE_ROLE, role);
  // "Member since" – set once, keep long-term.
  if (!getCookie(COOKIE_ENROLLED)) {
    setCookie(COOKIE_ENROLLED, String(Date.now()), 3650);
  }
}

export function setRhUid(uid: string) {
  if (typeof window === "undefined") return;
  const v = uid.trim();
  if (v) setCookie(COOKIE_UID, v);
}

export function setRhProfileName(firstName: string, lastName: string) {
  if (typeof window === "undefined") return;
  setCookie(COOKIE_FIRST, firstName.trim());
  setCookie(COOKIE_LAST, lastName.trim());
}

export function clearRhSession() {
  if (typeof window === "undefined") return;
  clearCookie(COOKIE_SESSION);
  clearCookie(COOKIE_EMAIL);
  clearCookie(COOKIE_ROLE);
  clearCookie(COOKIE_FIRST);
  clearCookie(COOKIE_LAST);
}

