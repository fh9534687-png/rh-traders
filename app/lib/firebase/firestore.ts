import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  type Firestore,
  updateDoc,
  where,
  addDoc,
} from "firebase/firestore";
import { getFirebaseApp } from "./client";
import { isAdminEmail } from "../rhSession";

export type Role = "admin" | "user";
export type Plan = "basic" | "premium" | "signals";

export type UserPaymentStatus = "none" | "pending" | "approved" | "rejected";
export type PaymentStatus = "pending" | "approved" | "rejected";
export type SignalsRequestStatus = "pending" | "approved" | "rejected";

export type UserData = {
  email: string;
  authUid?: string;
  role: Role;
  plan: Plan | null;
  isPaid: boolean;
  paymentStatus?: UserPaymentStatus;
  paymentSubmittedAt?: number | null;
  latestPaymentId?: string | null;
  signalsRequestStatus?: UserPaymentStatus;
  signalsRequestSubmittedAt?: number | null;
  latestSignalsRequestId?: string | null;
  firstName?: string;
  lastName?: string;
  enrolledAt: number;
};

export type PaymentData = {
  id: string;
  email: string;
  authUid?: string;
  name: string;
  whatsapp: string;
  plan: Plan;
  trxId: string;
  amount: number;
  method: "JazzCash" | "EasyPaisa" | "Bank";
  status: PaymentStatus;
  createdAt: number;
  updatedAt?: number;
  reviewedBy?: string;
};

export type LectureData = {
  id: string;
  plan: Exclude<Plan, "signals">;
  title: string;
  module: string;
  url: string;
  zoom?: string;
  createdAt: number;
  createdBy?: string;
};

export type SignalData = {
  id: string;
  pair: string;
  direction: "Long" | "Short";
  entry: string;
  sl: string;
  tp: string;
  status: "active" | "hit_tp" | "stopped" | "cancelled";
  createdAt: number;
};

export type LiveSessionRequest = {
  id: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  meetingLink?: string;
  createdAt: number;
  updatedAt?: number;
};

export type SignalCallRequest = {
  id: string;
  email: string;
  name: string;
  whatsapp: string;
  status: "pending" | "approved" | "rejected";
  meetingLink?: string;
  createdAt: number;
  updatedAt?: number;
  reviewedBy?: string;
};

export type SignalsRequest = {
  id: string;
  email: string;
  phone: string;
  plan: "signals";
  status: SignalsRequestStatus;
  createdAt: number;
  updatedAt?: number;
  reviewedBy?: string;
};

export type SelectiveDashboard = "basic" | "premium" | "signals";
export type SelectiveAccessStatus = "pending" | "accepted" | "rejected";
export type SelectiveAccessRequest = {
  id: string;
  email: string;
  name: string;
  dashboard: SelectiveDashboard;
  status: SelectiveAccessStatus;
  createdAt: number;
  updatedAt?: number;
  createdBy?: string;
};

function getFs(): Firestore | null {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}

function mustFs(): Firestore {
  const fs = getFs();
  if (!fs) {
    throw new Error(
      "Firebase Firestore is not configured. Add NEXT_PUBLIC_FIREBASE_* env vars in Vercel and redeploy.",
    );
  }
  return fs;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function userDocId(email: string) {
  // Use normalized email as document id so rules can reference request.auth.token.email.
  return normalizeEmail(email);
}

function omitUndefined<T extends Record<string, unknown>>(obj: T): T {
  const out = { ...obj };
  for (const k of Object.keys(out)) {
    if (out[k] === undefined) delete out[k];
  }
  return out as T;
}

function effectiveRole(existingRole: unknown, desired: Role, email: string): Role {
  const existing = existingRole === "admin" || existingRole === "user" ? (existingRole as Role) : "user";
  if (existing === "admin") return "admin";
  if (desired === "admin") return "admin";
  if (isAdminEmail(email)) return "admin";
  return "user";
}

function roleFromEmail(email: string): Role {
  return isAdminEmail(normalizeEmail(email)) ? "admin" : "user";
}

async function updateUserPaymentSnapshot(
  email: string,
  patch: Partial<Pick<UserData, "paymentStatus" | "paymentSubmittedAt" | "latestPaymentId" | "plan">>,
) {
  const safeEmail = normalizeEmail(email);
  await setDoc(
    doc(mustFs(), "users", userDocId(safeEmail)),
    omitUndefined({ ...patch, email: safeEmail, updatedAt: Date.now() } as Record<string, unknown>),
    { merge: true },
  );
}

async function updateUserSignalsRequestSnapshot(
  email: string,
  patch: Partial<
    Pick<UserData, "signalsRequestStatus" | "signalsRequestSubmittedAt" | "latestSignalsRequestId">
  >,
) {
  const safeEmail = normalizeEmail(email);
  await setDoc(
    doc(mustFs(), "users", userDocId(safeEmail)),
    omitUndefined({ ...patch, email: safeEmail, updatedAt: Date.now() } as Record<string, unknown>),
    { merge: true },
  );
}

export async function getUserData(email: string): Promise<UserData | null> {
  const safeEmail = normalizeEmail(email);
  const ref = doc(mustFs(), "users", userDocId(safeEmail));
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const d = snap.data() as Partial<UserData>;
  return {
    email: safeEmail,
    role: (d.role === "admin" ? "admin" : "user") as Role,
    plan: (d.plan === "basic" || d.plan === "premium" || d.plan === "signals" ? d.plan : null) as Plan | null,
    isPaid: Boolean(d.isPaid),
    enrolledAt: typeof d.enrolledAt === "number" ? d.enrolledAt : Date.now(),
    authUid: typeof d.authUid === "string" ? d.authUid : undefined,
    paymentStatus: (d.paymentStatus as UserPaymentStatus | undefined) ?? "none",
    paymentSubmittedAt: typeof d.paymentSubmittedAt === "number" ? d.paymentSubmittedAt : null,
    latestPaymentId: typeof d.latestPaymentId === "string" ? d.latestPaymentId : null,
    signalsRequestStatus: (d.signalsRequestStatus as UserPaymentStatus | undefined) ?? "none",
    signalsRequestSubmittedAt: typeof d.signalsRequestSubmittedAt === "number" ? d.signalsRequestSubmittedAt : null,
    latestSignalsRequestId:
      typeof d.latestSignalsRequestId === "string" ? d.latestSignalsRequestId : null,
    firstName: typeof d.firstName === "string" ? d.firstName : undefined,
    lastName: typeof d.lastName === "string" ? d.lastName : undefined,
  };
}

export function subscribeUserData(
  email: string,
  onNext: (user: UserData | null) => void,
  onError?: (err: unknown) => void,
) {
  const safeEmail = normalizeEmail(email);
  const fs = getFs();
  if (!fs) {
    onNext(null);
    return () => {};
  }
  return onSnapshot(
    doc(fs, "users", userDocId(safeEmail)),
    (snap) => {
      if (!snap.exists()) {
        onNext(null);
        return;
      }
      const d = snap.data() as Partial<UserData>;
      onNext({
        email: safeEmail,
        role: (d.role === "admin" ? "admin" : "user") as Role,
        plan:
          (d.plan === "basic" || d.plan === "premium" || d.plan === "signals"
            ? d.plan
            : null) as Plan | null,
        isPaid: Boolean(d.isPaid),
        enrolledAt: typeof d.enrolledAt === "number" ? d.enrolledAt : Date.now(),
        authUid: typeof d.authUid === "string" ? d.authUid : undefined,
        paymentStatus: (d.paymentStatus as UserPaymentStatus | undefined) ?? "none",
        paymentSubmittedAt: typeof d.paymentSubmittedAt === "number" ? d.paymentSubmittedAt : null,
        latestPaymentId: typeof d.latestPaymentId === "string" ? d.latestPaymentId : null,
        signalsRequestStatus: (d.signalsRequestStatus as UserPaymentStatus | undefined) ?? "none",
        signalsRequestSubmittedAt:
          typeof d.signalsRequestSubmittedAt === "number" ? d.signalsRequestSubmittedAt : null,
        latestSignalsRequestId:
          typeof d.latestSignalsRequestId === "string" ? d.latestSignalsRequestId : null,
        firstName: typeof d.firstName === "string" ? d.firstName : undefined,
        lastName: typeof d.lastName === "string" ? d.lastName : undefined,
      });
    },
    (err) => onError?.(err),
  );
}

export async function saveUserData(
  email: string,
  role: Role,
  plan: Plan | null,
  opts?: { authUid?: string },
): Promise<UserData> {
  const safeEmail = normalizeEmail(email);
  const refUser = doc(mustFs(), "users", userDocId(safeEmail));
  const snap = await getDoc(refUser);
  const existing = snap.exists() ? (snap.data() as Partial<UserData>) : null;

  const enrolledAt = typeof existing?.enrolledAt === "number" ? existing.enrolledAt : Date.now();
  const nextRole = effectiveRole(existing?.role, role, safeEmail);

  const next: Partial<UserData> = {
    email: safeEmail,
    authUid: opts?.authUid ?? existing?.authUid,
    role: nextRole,
    plan: plan ?? (existing?.plan as Plan | null) ?? null,
    isPaid: Boolean(existing?.isPaid),
    paymentStatus: (existing?.paymentStatus as UserPaymentStatus | undefined) ?? "none",
    paymentSubmittedAt: typeof existing?.paymentSubmittedAt === "number" ? existing.paymentSubmittedAt : null,
    latestPaymentId: typeof existing?.latestPaymentId === "string" ? existing.latestPaymentId : null,
    signalsRequestStatus: (existing?.signalsRequestStatus as UserPaymentStatus | undefined) ?? "none",
    signalsRequestSubmittedAt:
      typeof existing?.signalsRequestSubmittedAt === "number" ? existing.signalsRequestSubmittedAt : null,
    latestSignalsRequestId:
      typeof existing?.latestSignalsRequestId === "string" ? existing.latestSignalsRequestId : null,
    firstName: typeof existing?.firstName === "string" ? existing.firstName : undefined,
    lastName: typeof existing?.lastName === "string" ? existing.lastName : undefined,
    enrolledAt,
  };

  await setDoc(
    refUser,
    omitUndefined({ ...next, updatedAt: Date.now() } as Record<string, unknown>),
    { merge: true },
  );
  return (await getUserData(safeEmail)) ?? {
    email: safeEmail,
    role: nextRole,
    plan: next.plan ?? null,
    isPaid: Boolean(next.isPaid),
    enrolledAt,
  };
}

export async function getAllUsers() {
  const q = query(collection(mustFs(), "users"), orderBy("enrolledAt", "desc"), limit(2000));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ ...(d.data() as UserData), email: (d.data() as UserData).email ?? d.id }))
    .filter((u) => typeof u.email === "string") as UserData[];
}

export async function savePayment(
  email: string,
  input: { name: string; whatsapp: string; trxId: string; amount: number; method: PaymentData["method"] },
  status: PaymentStatus = "pending",
  plan?: Plan,
  authUid?: string,
) {
  const safeEmail = normalizeEmail(email);
  const trxId = input.trxId.trim();
  if (!trxId) throw new Error("Transaction ID is required.");
  if (!input.name.trim()) throw new Error("Full name is required.");
  if (!input.whatsapp.trim()) throw new Error("WhatsApp number is required.");
  if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error("Amount is required.");

  const fs = mustFs();
  const dupQ = query(collection(fs, "payments"), where("trxId", "==", trxId), limit(1));
  const dup = await getDocs(dupQ);
  if (!dup.empty) throw new Error("Transaction ID already used");

  const now = Date.now();
  const docRef = await addDoc(collection(fs, "payments"), {
    email: safeEmail,
    authUid: authUid?.trim() || undefined,
    name: input.name.trim(),
    whatsapp: input.whatsapp.trim(),
    plan: plan ?? "basic",
    trxId,
    amount: input.amount,
    method: input.method,
    status,
    createdAt: now,
  });

  const data: PaymentData = {
    id: docRef.id,
    email: safeEmail,
    authUid: authUid?.trim() || undefined,
    name: input.name.trim(),
    whatsapp: input.whatsapp.trim(),
    plan: plan ?? "basic",
    trxId,
    amount: input.amount,
    method: input.method,
    status,
    createdAt: now,
  };

  await updateUserPaymentSnapshot(safeEmail, {
    paymentStatus: "pending",
    paymentSubmittedAt: now,
    latestPaymentId: docRef.id,
    plan: plan ?? "basic",
  });

  return data;
}

export async function getAllPayments() {
  const q = query(collection(mustFs(), "payments"), orderBy("createdAt", "desc"), limit(2000));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PaymentData, "id">) })) as PaymentData[];
}

export async function approvePayment(paymentId: string, reviewedByEmail: string) {
  const fs = mustFs();
  const pRef = doc(fs, "payments", paymentId);
  const snap = await getDoc(pRef);
  if (!snap.exists()) throw new Error("Payment not found.");
  const p = { id: paymentId, ...(snap.data() as Omit<PaymentData, "id">) } as PaymentData;
  const reviewedBy = normalizeEmail(reviewedByEmail);

  await updateDoc(pRef, { status: "approved", reviewedBy, updatedAt: Date.now() });

  const userRole = roleFromEmail(p.email);
  await saveUserData(p.email, userRole, p.plan, { authUid: p.authUid });
  await setDoc(
    doc(fs, "users", userDocId(p.email)),
    { isPaid: true, plan: p.plan, paymentStatus: "approved", updatedAt: Date.now() },
    { merge: true },
  );
}

export async function rejectPayment(paymentId: string, reviewedByEmail: string) {
  const fs = mustFs();
  const pRef = doc(fs, "payments", paymentId);
  const snap = await getDoc(pRef);
  if (!snap.exists()) throw new Error("Payment not found.");
  const p = snap.data() as PaymentData;
  const reviewedBy = normalizeEmail(reviewedByEmail);
  const email = normalizeEmail(p.email);

  await updateDoc(pRef, { status: "rejected", reviewedBy, updatedAt: Date.now() });

  const user = await getUserData(email);
  if (user?.latestPaymentId === paymentId) {
    await updateUserPaymentSnapshot(email, { paymentStatus: "rejected" });
  }

  await deleteDoc(pRef);
}

export async function deletePaymentRequest(paymentId: string) {
  const fs = mustFs();
  const pRef = doc(fs, "payments", paymentId);
  const snap = await getDoc(pRef);
  if (!snap.exists()) return;
  const p = snap.data() as PaymentData;
  const email = normalizeEmail(p.email);

  await deleteDoc(pRef);

  const user = await getUserData(email);
  if (user?.latestPaymentId === paymentId && user.paymentStatus !== "approved") {
    await updateUserPaymentSnapshot(email, {
      latestPaymentId: null,
      paymentStatus: "none",
      paymentSubmittedAt: null,
    });
  }
}

export async function saveCourseLecture(
  plan: Exclude<Plan, "signals">,
  input: { title: string; videoUrl: string; category: string; zoom?: string; createdBy?: string },
) {
  const fs = mustFs();
  const now = Date.now();
  const docRef = await addDoc(collection(fs, "lectures"), {
    plan,
    title: input.title.trim(),
    module: input.category.trim() || "General",
    url: input.videoUrl.trim(),
    zoom: input.zoom?.trim() || undefined,
    createdAt: now,
    createdBy: input.createdBy?.trim().toLowerCase() || undefined,
  });
  const data: LectureData = {
    id: docRef.id,
    plan,
    title: input.title.trim(),
    module: input.category.trim() || "General",
    url: input.videoUrl.trim(),
    zoom: input.zoom?.trim() || undefined,
    createdAt: now,
    createdBy: input.createdBy?.trim().toLowerCase() || undefined,
  };
  return data;
}

export async function getLectures(plan: Exclude<Plan, "signals">) {
  const q = query(
    collection(mustFs(), "lectures"),
    where("plan", "==", plan),
    orderBy("createdAt", "desc"),
    limit(5000),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<LectureData, "id">) })) as LectureData[];
}

export async function deleteLecture(plan: Exclude<Plan, "signals">, lectureId: string) {
  const fs = mustFs();
  const lRef = doc(fs, "lectures", lectureId);
  const snap = await getDoc(lRef);
  if (!snap.exists()) return;
  const data = snap.data() as { plan?: unknown };
  if (data.plan !== plan) throw new Error("Lecture plan mismatch.");
  await deleteDoc(lRef);
}

// ---- Signals / Requests / Live sessions / Selective access ----
// For now, keep schemas compatible with existing UI. These collections are:
// signalsRequests, signalCalls, liveSessions, selectiveAccessRequests

export async function getSignalsRequests() {
  const q = query(collection(mustFs(), "signalsRequests"), orderBy("createdAt", "desc"), limit(2000));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SignalsRequest, "id">) })) as SignalsRequest[];
}

export async function getLatestSignalsRequestForEmail(email: string) {
  const safeEmail = normalizeEmail(email);
  const q = query(
    collection(mustFs(), "signalsRequests"),
    where("email", "==", safeEmail),
    orderBy("createdAt", "desc"),
    limit(1),
  );
  const snap = await getDocs(q);
  const doc0 = snap.docs[0];
  return doc0 ? ({ id: doc0.id, ...(doc0.data() as Omit<SignalsRequest, "id">) } as SignalsRequest) : null;
}

export async function approveSignalsRequest(requestId: string, reviewedByEmail: string, meetingLink?: string) {
  const fs = mustFs();
  const rRef = doc(fs, "signalsRequests", requestId);
  const snap = await getDoc(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  const row = snap.data() as SignalsRequest;
  const reviewedBy = normalizeEmail(reviewedByEmail);
  const ml = meetingLink?.trim();
  await updateDoc(
    rRef,
    ml
      ? { status: "approved", reviewedBy, meetingLink: ml, updatedAt: Date.now() }
      : { status: "approved", reviewedBy, updatedAt: Date.now() },
  );
  await updateUserSignalsRequestSnapshot(row.email, { signalsRequestStatus: "approved" });
}

export async function rejectSignalsRequest(requestId: string, reviewedByEmail: string) {
  const fs = mustFs();
  const rRef = doc(fs, "signalsRequests", requestId);
  const snap = await getDoc(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  const row = snap.data() as SignalsRequest;
  const reviewedBy = normalizeEmail(reviewedByEmail);
  await updateDoc(rRef, { status: "rejected", reviewedBy, updatedAt: Date.now() });

  const user = await getUserData(row.email);
  if (user?.latestSignalsRequestId === requestId) {
    await updateUserSignalsRequestSnapshot(row.email, { signalsRequestStatus: "rejected" });
  }

  await deleteDoc(rRef);
}

export async function deleteSignalsRequest(requestId: string) {
  const fs = mustFs();
  const rRef = doc(fs, "signalsRequests", requestId);
  const snap = await getDoc(rRef);
  if (!snap.exists()) return;
  const row = snap.data() as SignalsRequest;
  const email = normalizeEmail(row.email);

  await deleteDoc(rRef);

  const user = await getUserData(email);
  if (user?.latestSignalsRequestId === requestId && user.signalsRequestStatus !== "approved") {
    await updateUserSignalsRequestSnapshot(email, {
      latestSignalsRequestId: null,
      signalsRequestStatus: "none",
      signalsRequestSubmittedAt: null,
    });
  }
}

export async function createSignalsRequest(input: { email: string; phone: string }) {
  const fs = mustFs();
  const now = Date.now();
  const safeEmail = normalizeEmail(input.email);
  const phone = input.phone.trim();
  if (!safeEmail) throw new Error("Email is required.");
  if (!phone) throw new Error("Phone number is required.");
  const docRef = await addDoc(collection(fs, "signalsRequests"), {
    email: safeEmail,
    phone,
    plan: "signals",
    status: "pending",
    createdAt: now,
  });
  await updateUserSignalsRequestSnapshot(safeEmail, {
    signalsRequestStatus: "pending",
    signalsRequestSubmittedAt: now,
    latestSignalsRequestId: docRef.id,
  });
  return {
    id: docRef.id,
    email: safeEmail,
    phone,
    plan: "signals" as const,
    status: "pending" as const,
    createdAt: now,
  } satisfies SignalsRequest;
}

export async function getLiveSessions() {
  const q = query(collection(mustFs(), "liveSessions"), orderBy("createdAt", "desc"), limit(2000));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<LiveSessionRequest, "id">) })) as LiveSessionRequest[];
}

export async function requestLiveSession(email: string) {
  const fs = mustFs();
  const safeEmail = normalizeEmail(email);
  if (!safeEmail) throw new Error("Email is required.");
  const now = Date.now();
  const docRef = await addDoc(collection(fs, "liveSessions"), {
    email: safeEmail,
    status: "pending",
    createdAt: now,
  });
  return docRef.id;
}

export async function approveLiveSession(requestId: string, reviewedByEmail: string, meetingLink: string) {
  await updateDoc(doc(mustFs(), "liveSessions", requestId), {
    status: "approved",
    reviewedBy: reviewedByEmail,
    meetingLink: meetingLink.trim(),
    updatedAt: Date.now(),
  });
}

export async function rejectLiveSession(requestId: string, reviewedByEmail: string) {
  await updateDoc(doc(mustFs(), "liveSessions", requestId), {
    status: "rejected",
    reviewedBy: reviewedByEmail,
    updatedAt: Date.now(),
  });
}

export async function getSignalCalls() {
  const q = query(collection(mustFs(), "signalCalls"), orderBy("createdAt", "desc"), limit(2000));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SignalCallRequest, "id">) })) as SignalCallRequest[];
}

export async function requestSignalCall(
  email: string,
  input: { name: string; whatsapp: string },
) {
  const fs = mustFs();
  const safeEmail = normalizeEmail(email);
  if (!safeEmail) throw new Error("Email is required.");
  if (!input.name.trim()) throw new Error("Name is required.");
  if (!input.whatsapp.trim()) throw new Error("WhatsApp is required.");
  const now = Date.now();
  const docRef = await addDoc(collection(fs, "signalCalls"), {
    email: safeEmail,
    name: input.name.trim(),
    whatsapp: input.whatsapp.trim(),
    status: "pending",
    createdAt: now,
  });
  return docRef.id;
}

export async function getSignals() {
  const q = query(collection(mustFs(), "signals"), orderBy("createdAt", "desc"), limit(5000));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SignalData, "id">) })) as SignalData[];
}

export async function addSignal(input: Omit<SignalData, "id" | "createdAt">) {
  const fs = mustFs();
  const now = Date.now();
  const docRef = await addDoc(collection(fs, "signals"), { ...input, createdAt: now });
  return { id: docRef.id, createdAt: now, ...input } satisfies SignalData;
}

export async function approveSignalCall(requestId: string, reviewedByEmail: string, meetingLink: string) {
  await updateDoc(doc(mustFs(), "signalCalls", requestId), {
    status: "approved",
    reviewedBy: reviewedByEmail,
    meetingLink: meetingLink.trim(),
    updatedAt: Date.now(),
  });
}

export async function rejectSignalCall(requestId: string, reviewedByEmail: string) {
  await updateDoc(doc(mustFs(), "signalCalls", requestId), {
    status: "rejected",
    reviewedBy: reviewedByEmail,
    updatedAt: Date.now(),
  });
}

export async function deleteSignalCallRequest(requestId: string) {
  await deleteDoc(doc(mustFs(), "signalCalls", requestId));
}

export async function getSelectiveAccessRequests() {
  const q = query(collection(mustFs(), "selectiveAccessRequests"), orderBy("createdAt", "desc"), limit(2000));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<SelectiveAccessRequest, "id">) })) as SelectiveAccessRequest[];
}

export async function getLatestSelectiveAccessRequestForEmail(email: string) {
  const safeEmail = normalizeEmail(email);
  if (!safeEmail) return null;
  const q = query(
    collection(mustFs(), "selectiveAccessRequests"),
    where("email", "==", safeEmail),
    orderBy("createdAt", "desc"),
    limit(1),
  );
  const snap = await getDocs(q);
  const d0 = snap.docs[0];
  return d0 ? ({ id: d0.id, ...(d0.data() as Omit<SelectiveAccessRequest, "id">) } as SelectiveAccessRequest) : null;
}

export async function createSelectiveAccessRequest(input: {
  email: string;
  name: string;
  dashboard: SelectiveDashboard;
  createdBy?: string;
}) {
  const fs = mustFs();
  const safeEmail = normalizeEmail(input.email);
  const name = input.name.trim();
  if (!safeEmail) throw new Error("Email is required.");
  if (!name) throw new Error("Name is required.");

  const now = Date.now();
  const docRef = await addDoc(collection(fs, "selectiveAccessRequests"), {
    email: safeEmail,
    name,
    dashboard: input.dashboard,
    status: "pending",
    createdAt: now,
    createdBy: input.createdBy?.trim().toLowerCase() || undefined,
  });

  const row: SelectiveAccessRequest = {
    id: docRef.id,
    email: safeEmail,
    name,
    dashboard: input.dashboard,
    status: "pending",
    createdAt: now,
    createdBy: input.createdBy?.trim().toLowerCase() || undefined,
  };
  return row;
}

export async function acceptSelectiveAccessRequest(requestId: string, acceptedByEmail: string) {
  const fs = mustFs();
  const rRef = doc(fs, "selectiveAccessRequests", requestId);
  const snap = await getDoc(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  const row = snap.data() as Omit<SelectiveAccessRequest, "id">;

  await updateDoc(rRef, { status: "accepted", updatedAt: Date.now() });

  const safeEmail = normalizeEmail(row.email);
  await setDoc(
    doc(fs, "selectiveAccessGrants", safeEmail),
    {
      email: safeEmail,
      name: row.name,
      dashboard: row.dashboard,
      grantedAt: Date.now(),
      grantedBy: normalizeEmail(acceptedByEmail),
    },
    { merge: true },
  );
  await setDoc(
    doc(fs, "selectedUsers", safeEmail),
    { email: safeEmail, addedAt: Date.now(), dashboard: row.dashboard },
    { merge: true },
  );

  return { id: requestId, ...(row as Omit<SelectiveAccessRequest, "id">) } as SelectiveAccessRequest;
}

export async function rejectSelectiveAccessRequest(requestId: string, rejectedByEmail: string) {
  const fs = mustFs();
  const rRef = doc(fs, "selectiveAccessRequests", requestId);
  const snap = await getDoc(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  await updateDoc(rRef, { status: "rejected", updatedAt: Date.now(), rejectedBy: normalizeEmail(rejectedByEmail) });
  await deleteDoc(rRef);
}

export async function deleteSelectiveAccessRequest(requestId: string) {
  await deleteDoc(doc(mustFs(), "selectiveAccessRequests", requestId));
}

