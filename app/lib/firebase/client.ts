import { getApps, initializeApp, type FirebaseApp } from "firebase/app";

function env(name: string) {
  return (process.env[name] ?? "").trim();
}

function canInitFirebaseInThisRuntime() {
  // Prevent Next.js build/prerender from initializing Firebase Web SDK on the server.
  return typeof window !== "undefined";
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!canInitFirebaseInThisRuntime()) return null;

  const apiKey = env("NEXT_PUBLIC_FIREBASE_API_KEY");
  const authDomain = env("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  const projectId = env("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  const databaseURL = env("NEXT_PUBLIC_FIREBASE_DATABASE_URL");
  const storageBucket = env("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  const messagingSenderId = env("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  const appId = env("NEXT_PUBLIC_FIREBASE_APP_ID");

  // If env vars are missing in the browser, fail loudly with a clear message.
  if (
    !apiKey ||
    !authDomain ||
    !projectId ||
    !databaseURL ||
    !storageBucket ||
    !messagingSenderId ||
    !appId
  ) {
    throw new Error(
      "Firebase is not configured. Missing NEXT_PUBLIC_FIREBASE_* environment variables.",
    );
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

  return getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig);
}

export const firebaseApp: FirebaseApp | null = getFirebaseApp();

