import { getApps, initializeApp, type FirebaseApp } from "firebase/app";

function env(name: string) {
  return (process.env[name] ?? "").trim();
}

let cachedApp: FirebaseApp | null | undefined;
let warnedMissingEnv = false;

export function getFirebaseApp(): FirebaseApp | null {
  // Prevent Next.js build/prerender from initializing Firebase Web SDK on the server.
  if (typeof window === "undefined") return null;
  if (cachedApp !== undefined) return cachedApp;

  const apiKey = env("NEXT_PUBLIC_FIREBASE_API_KEY");
  const authDomain = env("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  const projectId = env("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  const databaseURL = env("NEXT_PUBLIC_FIREBASE_DATABASE_URL");
  const storageBucket = env("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  const messagingSenderId = env("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  const appId = env("NEXT_PUBLIC_FIREBASE_APP_ID");

  // If env vars are missing in the browser, do NOT crash public pages.
  // Firebase features will show a friendly "not configured" error when used.
  if (
    !apiKey ||
    !authDomain ||
    !projectId ||
    !databaseURL ||
    !storageBucket ||
    !messagingSenderId ||
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
    databaseURL,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId: env("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID") || undefined,
  };

  cachedApp = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);
  return cachedApp;
}

export function isFirebaseConfigured(): boolean {
  return Boolean(getFirebaseApp());
}

