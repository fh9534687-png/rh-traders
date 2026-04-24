import { getApps, initializeApp, type FirebaseApp } from "firebase/app";

let cachedApp: FirebaseApp | null | undefined;
let warnedMissingEnv = false;

export function getFirebaseApp(): FirebaseApp | null {
  // Prevent Next.js build/prerender from initializing Firebase Web SDK on the server.
  if (typeof window === "undefined") return null;
  if (cachedApp !== undefined) return cachedApp;

  // IMPORTANT: NEXT_PUBLIC_* vars must be referenced statically for Next.js to inline them
  // into the client bundle. Do not use process.env[name] here.
  const apiKey = (process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "").trim();
  const authDomain = (process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "").trim();
  const projectId = (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "").trim();
  const databaseURL = (process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? "").trim();
  const storageBucket = (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "").trim();
  const messagingSenderId = (process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "").trim();
  const appId = (process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "").trim();
  const measurementId = (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "").trim();

  // If env vars are missing in the browser, do NOT crash public pages.
  // Firebase features will show a friendly "not configured" error when used.
  if (
    !apiKey ||
    !authDomain ||
    !projectId ||
    !appId
  ) {
    if (!warnedMissingEnv) {
      warnedMissingEnv = true;
      // Helpful in production debugging without leaking secret values.
      console.warn(
        "[RH Traders] Firebase env vars missing. Check Vercel env: NEXT_PUBLIC_FIREBASE_*",
      );
    }
    cachedApp = null;
    return cachedApp;
  }

  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    // Optional for Auth; required only if you use those products.
    databaseURL: databaseURL || undefined,
    storageBucket: storageBucket || undefined,
    messagingSenderId: messagingSenderId || undefined,
    appId,
    measurementId: measurementId || undefined,
  };

  cachedApp = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);
  return cachedApp;
}

export function isFirebaseConfigured(): boolean {
  return Boolean(getFirebaseApp());
}

