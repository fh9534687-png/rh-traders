"use client";

import { useState } from "react";
import { requestLiveSession } from "../../../lib/firebase/db";

function getCookie(name: string) {
  const key = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const hit = parts.find((p) => p.startsWith(key));
  if (!hit) return null;
  return decodeURIComponent(hit.slice(key.length));
}

export function BookLiveSessionButton() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onClick() {
    const email = (getCookie("rh_email") ?? "").trim();
    if (!email) return;
    setSubmitting(true);
    try {
      await requestLiveSession(email);
      setDone(true);
      setTimeout(() => setDone(false), 3500);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onClick()}
      disabled={submitting}
      className="rh-btn-primary mt-5 inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm font-extrabold text-white disabled:opacity-70"
    >
      {done ? "Request sent" : submitting ? "Sending…" : "Book live session"}
    </button>
  );
}

