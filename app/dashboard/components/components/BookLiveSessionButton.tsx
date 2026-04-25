"use client";

import { useState } from "react";
import { requestLiveSession } from "../../../lib/firebase/firestore";
import type { Auth } from "firebase/auth";
import { getFirebaseAuth } from "../../../lib/firebase/auth";

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

  function mustAuth(): Auth {
    const auth = getFirebaseAuth();
    if (!auth) {
      throw new Error("Firebase is not configured.");
    }
    return auth;
  }

  async function onClick() {
    const auth = mustAuth();
    await auth.authStateReady();
    const u = auth.currentUser;
    const email = (u?.email ?? "").trim();
    const uid = (u?.uid ?? "").trim();
    if (!email || !uid) return;
    setSubmitting(true);
    try {
      await requestLiveSession({ uid, email });
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

