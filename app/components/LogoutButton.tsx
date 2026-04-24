"use client";

import { useRouter } from "next/navigation";
import { signOut, type Auth } from "firebase/auth";
import { clearRhSession } from "../lib/rhSession";
import { clearRhEntitlements } from "../lib/rhEntitlements";
import { firebaseAuth } from "../lib/firebase/auth";

function mustAuth(): Auth {
  if (!firebaseAuth) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* environment variables (Vercel + .env.local).",
    );
  }
  return firebaseAuth;
}

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        void (async () => {
          try {
            const auth = mustAuth();
            await signOut(auth);
            await auth.authStateReady();
          } catch {
            // Still clear local session so the UI and middleware line up.
          }
          clearRhEntitlements();
          clearRhSession();
          router.refresh();
          router.replace("/auth");
        })();
      }}
      className={className}
    >
      Logout
    </button>
  );
}

