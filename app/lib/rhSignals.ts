export type RhSignalsRequestStatus = "none" | "pending" | "approved" | "rejected";

const COOKIE_SIGNALS_STATUS = "rh_signals_request_status";

function setCookie(name: string, value: string, days = 30) {
  if (typeof window === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}; Expires=${expires}; Path=/; SameSite=Lax`;
}

export function setRhSignalsRequestStatus(status: RhSignalsRequestStatus) {
  setCookie(COOKIE_SIGNALS_STATUS, status, 30);
}

