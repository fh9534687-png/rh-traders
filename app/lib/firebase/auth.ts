import { getAuth, type Auth } from "firebase/auth";
import { getFirebaseApp } from "./client";

export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

