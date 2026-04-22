export type RhPlanId = "basic" | "premium" | "signals";

export type RhPaymentStatus = "none" | "pending" | "approved" | "rejected";

const COOKIE_PLAN = "rh_plan";
const COOKIE_PAID = "rh_paid";
const COOKIE_PAYMENT_STATUS = "rh_payment_status";

function setCookie(name: string, value: string, days = 30) {
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

export function setRhPlan(plan: RhPlanId) {
  if (typeof window === "undefined") return;
  setCookie(COOKIE_PLAN, plan);
}

export function markRhPaid() {
  if (typeof window === "undefined") return;
  setCookie(COOKIE_PAID, "1");
}

export function clearRhPlan() {
  if (typeof window === "undefined") return;
  clearCookie(COOKIE_PLAN);
}

export function clearRhPaid() {
  if (typeof window === "undefined") return;
  clearCookie(COOKIE_PAID);
}

export function setRhPaymentStatus(status: RhPaymentStatus) {
  if (typeof window === "undefined") return;
  setCookie(COOKIE_PAYMENT_STATUS, status, 30);
}

export function clearRhEntitlements() {
  if (typeof window === "undefined") return;
  clearCookie(COOKIE_PLAN);
  clearCookie(COOKIE_PAID);
  clearCookie(COOKIE_PAYMENT_STATUS);
}

