"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { clearRhSession } from "../lib/rhSession";
import { clearRhEntitlements } from "../lib/rhEntitlements";
import { firebaseAuth } from "../lib/firebase/auth";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        void (async () => {
          try {
            await signOut(firebaseAuth);
            await firebaseAuth.authStateReady();
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

