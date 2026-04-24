import {
  getDatabase,
  type Database,
  ref,
  get,
  set,
  push,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
  limitToLast,
} from "firebase/database";
import { firebaseApp } from "./client";
import { isAdminEmail } from "../rhSession";

export type Role = "admin" | "user";
export type Plan = "basic" | "premium" | "signals";

export type UserPaymentStatus = "none" | "pending" | "approved" | "rejected";

export type UserData = {
  email: string;
  /** Firebase Auth UID (stored for correlation; RTDB path remains email-based key). */
  authUid?: string;
  role: Role;
  plan: Plan | null;
  isPaid: boolean;
  /** Manual payment / access gate synced with latest admin review. */
  paymentStatus?: UserPaymentStatus;
  /** Timestamp (ms) when the latest proof was submitted for review. */
  paymentSubmittedAt?: number | null;
  /** Latest `payments/{id}` key for support lookup. */
  latestPaymentId?: string | null;
  /** Phone-based request approval for the Signals dashboard (/signals-dashboard). */
  signalsRequestStatus?: UserPaymentStatus;
  signalsRequestSubmittedAt?: number | null;
  latestSignalsRequestId?: string | null;
  firstName?: string;
  lastName?: string;
  enrolledAt: number;
};

export type PaymentStatus = "pending" | "approved" | "rejected";

export type PaymentData = {
  id: string;
  email: string;
  /** Submitter Firebase Auth UID when logged in during payment. */
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

export type SignalsRequestStatus = "pending" | "approved" | "rejected";

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

export type SelectedUser = {
  email: string;
  addedAt: number;
  dashboard?: "basic" | "premium" | "signals";
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

export const db: Database | null = firebaseApp ? getDatabase(firebaseApp) : null;

function mustDb(): Database {
  if (!db) {
    throw new Error(
      "Firebase Realtime Database is not configured. Add NEXT_PUBLIC_FIREBASE_* environment variables.",
    );
  }
  return db;
}

export function keyFromEmail(email: string) {
  return email.trim().toLowerCase().replace(/\./g, ",");
}

/** Realtime Database rejects `undefined` on any key in `.set()` payloads. */
function omitUndefined<T extends Record<string, unknown>>(obj: T): T {
  const out = { ...obj };
  for (const k of Object.keys(out)) {
    if (out[k] === undefined) delete out[k];
  }
  return out as T;
}

function roleFromEmail(email: string): Role {
  return isAdminEmail(email) ? "admin" : "user";
}

export async function saveUserData(
  email: string,
  role: Role,
  plan: Plan | null,
  opts?: { authUid?: string },
) {
  const safeEmail = email.trim().toLowerCase();
  const userKey = keyFromEmail(safeEmail);
  const userRef = ref(mustDb(), `users/${userKey}`);
  const snap = await get(userRef);
  const existing = (snap.exists() ? (snap.val() as Partial<UserData>) : null) ?? null;

  const enrolledAt =
    typeof existing?.enrolledAt === "number" ? existing.enrolledAt : Date.now();

  const paymentStatus: UserPaymentStatus =
    (existing?.paymentStatus as UserPaymentStatus | undefined) ?? "none";

  const signalsRequestStatus: UserPaymentStatus =
    (existing?.signalsRequestStatus as UserPaymentStatus | undefined) ?? "none";

  /** Do not clear admin from RTDB when writes pass role "user" by mistake. */
  const existingRole = (existing?.role as Role | undefined) ?? "user";
  const effectiveRole: Role =
    role === "admin" || existingRole === "admin" || isAdminEmail(safeEmail) ? "admin" : "user";

  const next: UserData = {
    email: safeEmail,
    authUid: opts?.authUid ?? existing?.authUid,
    role: effectiveRole,
    plan: plan ?? (existing?.plan as Plan | null) ?? null,
    isPaid: Boolean(existing?.isPaid),
    paymentStatus,
    paymentSubmittedAt:
      typeof existing?.paymentSubmittedAt === "number" ? existing.paymentSubmittedAt : null,
    latestPaymentId: typeof existing?.latestPaymentId === "string" ? existing.latestPaymentId : null,
    signalsRequestStatus,
    signalsRequestSubmittedAt:
      typeof existing?.signalsRequestSubmittedAt === "number"
        ? existing?.signalsRequestSubmittedAt
        : null,
    latestSignalsRequestId:
      typeof existing?.latestSignalsRequestId === "string" ? existing.latestSignalsRequestId : null,
    firstName: existing?.firstName,
    lastName: existing?.lastName,
    enrolledAt,
  };

  const payload = omitUndefined(next as unknown as Record<string, unknown>) as UserData;
  await set(userRef, payload);
  return payload;
}

export async function updateUserPaymentSnapshot(
  email: string,
  patch: Partial<Pick<UserData, "paymentStatus" | "paymentSubmittedAt" | "latestPaymentId" | "plan">>,
) {
  const safeEmail = email.trim().toLowerCase();
  const userRef = ref(mustDb(), `users/${keyFromEmail(safeEmail)}`);
  await update(userRef, { ...patch, email: safeEmail });
}

export async function updateUserSignalsRequestSnapshot(
  email: string,
  patch: Partial<
    Pick<UserData, "signalsRequestStatus" | "signalsRequestSubmittedAt" | "latestSignalsRequestId">
  >,
) {
  const safeEmail = email.trim().toLowerCase();
  const userRef = ref(mustDb(), `users/${keyFromEmail(safeEmail)}`);
  await update(userRef, { ...patch, email: safeEmail });
}

export async function getUserData(email: string) {
  const safeEmail = email.trim().toLowerCase();
  const userKey = keyFromEmail(safeEmail);
  const snap = await get(ref(mustDb(), `users/${userKey}`));
  return snap.exists() ? (snap.val() as UserData) : null;
}

export async function createSignalsRequest(input: { email: string; phone: string }) {
  const safeEmail = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  if (!phone) throw new Error("Phone number is required.");

  const idRef = push(ref(mustDb(), "signalsRequests"));
  const id = idRef.key!;
  const now = Date.now();
  const data: SignalsRequest = {
    id,
    email: safeEmail,
    phone,
    plan: "signals",
    status: "pending",
    createdAt: now,
  };
  await set(idRef, data);
  await updateUserSignalsRequestSnapshot(safeEmail, {
    signalsRequestStatus: "pending",
    signalsRequestSubmittedAt: now,
    latestSignalsRequestId: id,
  });
  return data;
}

export async function getSignalsRequests() {
  const snap = await get(ref(mustDb(), "signalsRequests"));
  if (!snap.exists()) return [] as SignalsRequest[];
  const raw = snap.val() as Record<string, SignalsRequest>;
  return Object.values(raw).sort((a, b) => b.createdAt - a.createdAt);
}

export async function getLatestSignalsRequestForEmail(email: string) {
  const safeEmail = email.trim().toLowerCase();
  if (!safeEmail) return null;
  const q = query(ref(mustDb(), "signalsRequests"), orderByChild("email"), equalTo(safeEmail), limitToLast(1));
  const snap = await get(q);
  if (!snap.exists()) return null;
  const raw = snap.val() as Record<string, SignalsRequest>;
  const list = Object.values(raw).sort((a, b) => b.createdAt - a.createdAt);
  return list[0] ?? null;
}

export async function approveSignalsRequest(requestId: string, reviewedByEmail: string) {
  const rRef = ref(mustDb(), `signalsRequests/${requestId}`);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  const row = snap.val() as SignalsRequest;
  await update(rRef, {
    status: "approved",
    updatedAt: Date.now(),
    reviewedBy: reviewedByEmail.trim().toLowerCase(),
  });
  await updateUserSignalsRequestSnapshot(row.email, { signalsRequestStatus: "approved" });
}

export async function rejectSignalsRequest(requestId: string, reviewedByEmail: string) {
  const rRef = ref(mustDb(), `signalsRequests/${requestId}`);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  const row = snap.val() as SignalsRequest;
  await update(rRef, {
    status: "rejected",
    updatedAt: Date.now(),
    reviewedBy: reviewedByEmail.trim().toLowerCase(),
  });
  const user = await getUserData(row.email);
  if (user?.latestSignalsRequestId === requestId) {
    await updateUserSignalsRequestSnapshot(row.email, {
      signalsRequestStatus: "rejected",
    });
  }

  // Auto-remove rejected requests from admin queue (requested behavior).
  await remove(rRef);
}

export async function savePayment(
  email: string,
  input: {
    name: string;
    whatsapp: string;
    trxId: string;
    amount: number;
    method: "JazzCash" | "EasyPaisa" | "Bank";
  },
  status: PaymentStatus = "pending",
  plan?: Plan,
  authUid?: string,
) {
  const safeEmail = email.trim().toLowerCase();

  const trxId = input.trxId.trim();
  if (!trxId) throw new Error("Transaction ID is required.");
  if (!input.name.trim()) throw new Error("Full name is required.");
  if (!input.whatsapp.trim()) throw new Error("WhatsApp number is required.");
  if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error("Amount is required.");

  // Duplicate protection (critical): block any repeated trxId.
  const trxQ = query(ref(mustDb(), "payments"), orderByChild("trxId"), equalTo(trxId), limitToLast(1));
  const dupSnap = await get(trxQ);
  if (dupSnap.exists()) {
    throw new Error("Transaction ID already used");
  }

  const idRef = push(ref(mustDb(), "payments"));
  const id = idRef.key!;
  const now = Date.now();
  const data: PaymentData = {
    id,
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
  await set(idRef, data);
  await updateUserPaymentSnapshot(safeEmail, {
    paymentStatus: "pending",
    paymentSubmittedAt: now,
    latestPaymentId: id,
    plan: plan ?? "basic",
  });
  return data;
}

export async function getAllPayments() {
  const snap = await get(ref(mustDb(), "payments"));
  if (!snap.exists()) return [] as PaymentData[];
  const raw = snap.val() as Record<string, PaymentData>;
  return Object.values(raw).sort((a, b) => b.createdAt - a.createdAt);
}

export async function getAllUsers() {
  const snap = await get(ref(mustDb(), "users"));
  if (!snap.exists()) return [] as UserData[];
  const raw = snap.val() as Record<string, UserData>;
  return Object.values(raw).sort((a, b) => b.enrolledAt - a.enrolledAt);
}

export async function addLecture(input: Omit<LectureData, "id" | "createdAt">) {
  // Backwards compatible wrapper: store under `courses/{plan}/{lectureId}`.
  return await saveCourseLecture(input.plan, {
    title: input.title,
    videoUrl: input.url,
    category: input.module,
    zoom: input.zoom,
  });
}

export type CourseLectureRow = {
  title: string;
  videoUrl: string;
  category: string;
  createdAt: number;
  zoom?: string;
  createdBy?: string;
};

export async function saveCourseLecture(
  plan: Exclude<Plan, "signals">,
  input: { title: string; videoUrl: string; category: string; zoom?: string; createdBy?: string },
) {
  const idRef = push(ref(mustDb(), `courses/${plan}`));
  const id = idRef.key!;
  const row: CourseLectureRow = {
    title: input.title.trim(),
    videoUrl: input.videoUrl.trim(),
    category: input.category.trim() || "General",
    createdAt: Date.now(),
    zoom: input.zoom?.trim() || undefined,
    createdBy: input.createdBy?.trim().toLowerCase() || undefined,
  };
  await set(idRef, omitUndefined(row as unknown as Record<string, unknown>));

  const data: LectureData = {
    id,
    plan,
    title: row.title,
    module: row.category,
    url: row.videoUrl,
    zoom: row.zoom,
    createdAt: row.createdAt,
    createdBy: row.createdBy,
  };
  return data;
}

export async function getLectures(plan: Exclude<Plan, "signals">) {
  // Preferred structure: `courses/{plan}/{lectureId}`
  const snap = await get(ref(mustDb(), `courses/${plan}`));
  if (snap.exists()) {
    const raw = snap.val() as Record<string, Partial<CourseLectureRow>>;
    return Object.entries(raw)
      .map(([id, r]) => {
        const title = String(r.title ?? "").trim();
        const videoUrl = String(r.videoUrl ?? "").trim();
        const category = String(r.category ?? "General").trim() || "General";
        const createdAt = typeof r.createdAt === "number" ? r.createdAt : 0;
        const zoom = typeof r.zoom === "string" ? r.zoom : undefined;
        const createdBy = typeof r.createdBy === "string" ? r.createdBy : undefined;
        return {
          id,
          plan,
          title,
          module: category,
          url: videoUrl,
          zoom,
          createdAt,
          createdBy,
        } satisfies LectureData;
      })
      .filter((l) => Boolean(l.title) && Boolean(l.url))
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  // Legacy fallback: `lectures` flat collection.
  const legacy = await get(ref(mustDb(), "lectures"));
  if (!legacy.exists()) return [] as LectureData[];
  const raw = legacy.val() as Record<string, LectureData>;
  return Object.values(raw)
    .filter((l) => l.plan === plan)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function addSignal(input: Omit<SignalData, "id" | "createdAt">) {
  const idRef = push(ref(mustDb(), "signals"));
  const id = idRef.key!;
  const data: SignalData = { id, createdAt: Date.now(), ...input };
  await set(idRef, data);
  return data;
}

export async function getSignals() {
  const snap = await get(ref(mustDb(), "signals"));
  if (!snap.exists()) return [] as SignalData[];
  const raw = snap.val() as Record<string, SignalData>;
  return Object.values(raw).sort((a, b) => b.createdAt - a.createdAt);
}

export async function requestLiveSession(email: string) {
  const idRef = push(ref(mustDb(), "liveSessions"));
  const id = idRef.key!;
  const data: LiveSessionRequest = {
    id,
    email: email.trim().toLowerCase(),
    status: "pending",
    createdAt: Date.now(),
  };
  await set(idRef, data);
  return data;
}

export async function getLiveSessions() {
  const snap = await get(ref(mustDb(), "liveSessions"));
  if (!snap.exists()) return [] as LiveSessionRequest[];
  const raw = snap.val() as Record<string, LiveSessionRequest>;
  return Object.values(raw).sort((a, b) => b.createdAt - a.createdAt);
}

export async function approveLiveSession(
  requestId: string,
  meetingLink: string,
  reviewedByEmail: string,
) {
  const rRef = ref(mustDb(), `liveSessions/${requestId}`);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  await update(rRef, {
    status: "approved",
    meetingLink: meetingLink.trim(),
    updatedAt: Date.now(),
    reviewedBy: reviewedByEmail.trim().toLowerCase(),
  });
}

export async function rejectLiveSession(requestId: string, reviewedByEmail: string) {
  const rRef = ref(mustDb(), `liveSessions/${requestId}`);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  await update(rRef, {
    status: "rejected",
    updatedAt: Date.now(),
    reviewedBy: reviewedByEmail.trim().toLowerCase(),
  });
}

export async function requestSignalCall(email: string, input: { name: string; whatsapp: string }) {
  const safeEmail = email.trim().toLowerCase();
  const name = input.name.trim();
  const whatsapp = input.whatsapp.trim();
  if (!safeEmail) throw new Error("Email is required.");
  if (!name) throw new Error("Name is required.");
  if (!whatsapp) throw new Error("WhatsApp number is required.");

  const idRef = push(ref(mustDb(), "signalCalls"));
  const id = idRef.key!;
  const row: SignalCallRequest = {
    id,
    email: safeEmail,
    name,
    whatsapp,
    status: "pending",
    createdAt: Date.now(),
  };
  await set(idRef, row);
  return row;
}

export async function getSignalCalls() {
  const snap = await get(ref(mustDb(), "signalCalls"));
  if (!snap.exists()) return [] as SignalCallRequest[];
  const raw = snap.val() as Record<string, SignalCallRequest>;
  return Object.values(raw).sort((a, b) => b.createdAt - a.createdAt);
}

export async function approveSignalCall(requestId: string, meetingLink: string, reviewedByEmail: string) {
  const rRef = ref(mustDb(), `signalCalls/${requestId}`);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  await update(rRef, {
    status: "approved",
    meetingLink: meetingLink.trim(),
    updatedAt: Date.now(),
    reviewedBy: reviewedByEmail.trim().toLowerCase(),
  });
}

export async function rejectSignalCall(requestId: string, reviewedByEmail: string) {
  const rRef = ref(mustDb(), `signalCalls/${requestId}`);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  await update(rRef, {
    status: "rejected",
    updatedAt: Date.now(),
    reviewedBy: reviewedByEmail.trim().toLowerCase(),
  });

  // Auto-remove rejected requests from admin queue (requested behavior).
  await remove(rRef);
}

export async function addSelectedUser(email: string) {
  const safeEmail = email.trim().toLowerCase();
  const userKey = keyFromEmail(safeEmail);
  const data: SelectedUser = { email: safeEmail, addedAt: Date.now() };
  await set(ref(mustDb(), `selectedUsers/${userKey}`), data);
  return data;
}

export async function removeSelectedUser(email: string) {
  const safeEmail = email.trim().toLowerCase();
  const userKey = keyFromEmail(safeEmail);
  await set(ref(mustDb(), `selectedUsers/${userKey}`), null);
}

export async function getSelectedUsers() {
  const snap = await get(ref(mustDb(), "selectedUsers"));
  if (!snap.exists()) return [] as SelectedUser[];
  const raw = snap.val() as Record<string, SelectedUser>;
  return Object.values(raw).sort((a, b) => b.addedAt - a.addedAt);
}

export async function createSelectiveAccessRequest(input: {
  email: string;
  name: string;
  dashboard: SelectiveDashboard;
  createdBy?: string;
}) {
  const safeEmail = input.email.trim().toLowerCase();
  const name = input.name.trim();
  if (!safeEmail) throw new Error("Email is required.");
  if (!name) throw new Error("Name is required.");

  const idRef = push(ref(mustDb(), "selectiveAccessRequests"));
  const id = idRef.key!;
  const now = Date.now();
  const row: SelectiveAccessRequest = {
    id,
    email: safeEmail,
    name,
    dashboard: input.dashboard,
    status: "pending",
    createdAt: now,
    createdBy: input.createdBy?.trim().toLowerCase() || undefined,
  };
  await set(idRef, omitUndefined(row as unknown as Record<string, unknown>));
  return row;
}

export async function getSelectiveAccessRequests() {
  const snap = await get(ref(mustDb(), "selectiveAccessRequests"));
  if (!snap.exists()) return [] as SelectiveAccessRequest[];
  const raw = snap.val() as Record<string, SelectiveAccessRequest>;
  return Object.values(raw).sort((a, b) => b.createdAt - a.createdAt);
}

export async function getLatestSelectiveAccessRequestForEmail(email: string) {
  const safeEmail = email.trim().toLowerCase();
  if (!safeEmail) return null;
  const q = query(
    ref(mustDb(), "selectiveAccessRequests"),
    orderByChild("email"),
    equalTo(safeEmail),
    limitToLast(1),
  );
  const snap = await get(q);
  if (!snap.exists()) return null;
  const raw = snap.val() as Record<string, SelectiveAccessRequest>;
  const list = Object.values(raw).sort((a, b) => b.createdAt - a.createdAt);
  return list[0] ?? null;
}

export async function acceptSelectiveAccessRequest(requestId: string, acceptedByEmail: string) {
  const rRef = ref(mustDb(), `selectiveAccessRequests/${requestId}`);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  const row = snap.val() as SelectiveAccessRequest;

  await update(rRef, {
    status: "accepted",
    updatedAt: Date.now(),
  });

  // Store a simple grant keyed by email.
  const key = keyFromEmail(row.email);
  await set(ref(mustDb(), `selectiveAccessGrants/${key}`), {
    email: row.email,
    name: row.name,
    dashboard: row.dashboard,
    grantedAt: Date.now(),
    grantedBy: acceptedByEmail.trim().toLowerCase(),
  });

  // Back-compat: also mirror into selectedUsers (if you already use it elsewhere).
  await set(ref(mustDb(), `selectedUsers/${key}`), {
    email: row.email,
    addedAt: Date.now(),
    dashboard: row.dashboard,
  } satisfies SelectedUser);

  return row;
}

export async function rejectSelectiveAccessRequest(requestId: string, rejectedByEmail: string) {
  const rRef = ref(mustDb(), `selectiveAccessRequests/${requestId}`);
  const snap = await get(rRef);
  if (!snap.exists()) throw new Error("Request not found.");
  await update(rRef, {
    status: "rejected",
    updatedAt: Date.now(),
  });

  // Auto-remove rejected requests from the admin queue (matches your existing behavior).
  await remove(rRef);
  void rejectedByEmail;
}

export async function deleteSelectiveAccessRequest(requestId: string) {
  await remove(ref(mustDb(), `selectiveAccessRequests/${requestId}`));
}

export async function approvePayment(paymentId: string, reviewedByEmail: string) {
  const pRef = ref(mustDb(), `payments/${paymentId}`);
  const snap = await get(pRef);
  if (!snap.exists()) throw new Error("Payment not found.");
  const p = snap.val() as PaymentData;

  await update(pRef, {
    status: "approved",
    updatedAt: Date.now(),
    reviewedBy: reviewedByEmail.trim().toLowerCase(),
  });

  const userRole = roleFromEmail(p.email);
  const u = await saveUserData(p.email, userRole, p.plan);
  await update(ref(mustDb(), `users/${keyFromEmail(p.email)}`), {
    isPaid: true,
    plan: p.plan,
    paymentStatus: "approved",
  });
  return { payment: { ...p, status: "approved" as const }, user: { ...u, isPaid: true, plan: p.plan } };
}

export async function rejectPayment(paymentId: string, _reviewedByEmail: string) {
  const pRef = ref(mustDb(), `payments/${paymentId}`);
  const snap = await get(pRef);
  if (!snap.exists()) throw new Error("Payment not found.");
  const p = snap.val() as PaymentData;
  const email = p.email.trim().toLowerCase();
  await update(pRef, {
    status: "rejected",
    updatedAt: Date.now(),
    reviewedBy: (_reviewedByEmail ?? "").trim().toLowerCase(),
  });

  const user = await getUserData(email);
  if (user?.latestPaymentId === paymentId) {
    await updateUserPaymentSnapshot(email, {
      paymentStatus: "rejected",
    });
  }

  // Auto-remove rejected requests from admin queue (requested behavior).
  await remove(pRef);
}

export async function deletePaymentRequest(paymentId: string) {
  const pRef = ref(mustDb(), `payments/${paymentId}`);
  const snap = await get(pRef);
  if (!snap.exists()) return;
  const p = snap.val() as PaymentData;
  const email = p.email.trim().toLowerCase();

  await remove(pRef);

  // Keep entitlements intact; only clear "latest request" pointers if this was their latest and not approved.
  const user = await getUserData(email);
  if (user?.latestPaymentId === paymentId && user.paymentStatus !== "approved") {
    await updateUserPaymentSnapshot(email, {
      latestPaymentId: null,
      paymentStatus: "none",
      paymentSubmittedAt: null,
    });
  }
}

export async function deleteSignalsRequest(requestId: string) {
  const rRef = ref(mustDb(), `signalsRequests/${requestId}`);
  const snap = await get(rRef);
  if (!snap.exists()) return;
  const r = snap.val() as SignalsRequest;
  const email = r.email.trim().toLowerCase();

  await remove(rRef);

  const user = await getUserData(email);
  if (user?.latestSignalsRequestId === requestId && user.signalsRequestStatus !== "approved") {
    await updateUserSignalsRequestSnapshot(email, {
      latestSignalsRequestId: null,
      signalsRequestStatus: "none",
      signalsRequestSubmittedAt: null,
    });
  }
}

export async function deleteSignalCallRequest(callId: string) {
  const rRef = ref(mustDb(), `signalCalls/${callId}`);
  await remove(rRef);
}

export async function deleteLecture(plan: Exclude<Plan, "signals">, lectureId: string) {
  await remove(ref(mustDb(), `courses/${plan}/${lectureId}`));
}


