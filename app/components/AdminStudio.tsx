"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { firebaseAuth } from "../lib/firebase/auth";
import {
  approvePayment as approveDbPayment,
  approveSignalCall,
  deleteLecture,
  deletePaymentRequest,
  deleteSignalCallRequest,
  deleteSignalsRequest,
  createSelectiveAccessRequest,
  deleteSelectiveAccessRequest,
  getSelectiveAccessRequests,
  type SelectiveAccessRequest,
  getAllPayments,
  getAllUsers,
  getLectures,
  getLiveSessions,
  getSignalCalls,
  approveLiveSession,
  rejectSignalCall,
  rejectLiveSession,
  rejectPayment as rejectDbPayment,
  approveSignalsRequest as approveDbSignalsRequest,
  getSignalsRequests,
  rejectSignalsRequest as rejectDbSignalsRequest,
  saveCourseLecture,
  type LectureData,
  type LiveSessionRequest,
  type PaymentData,
  type Plan,
  type SignalCallRequest,
  type SignalsRequest,
  type UserData,
} from "../lib/firebase/db";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

const inputClass =
  "w-full rounded-[12px] border-2 border-sky-500/35 bg-slate-950/75 px-4 py-3 text-[16px] text-white placeholder:text-slate-400 outline-none transition " +
  "focus:border-sky-400/70 focus:shadow-[0_0_0_2px_rgba(56,189,248,0.20)]";

const cardClass =
  "rounded-3xl border-[2.5px] border-sky-400/35 bg-slate-950/70 p-7 shadow-[0_0_70px_rgba(56,189,248,0.18),0_28px_70px_-32px_rgba(2,6,23,0.85)] backdrop-blur-sm min-h-[420px]";

function formatRequestWhen(ts: number) {
  try {
    return new Date(ts).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "—";
  }
}

export function AdminStudio() {
  const aliveRef = useRef(true);
  const [authOk, setAuthOk] = useState<boolean | null>(null);
  const [lectureListOpen, setLectureListOpen] = useState(false);
  const [paymentRequests, setPaymentRequests] = useState<PaymentData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [openPaymentId, setOpenPaymentId] = useState<string | null>(null);
  const [requestsOpen, setRequestsOpen] = useState(false);

  const [lecturesBasic, setLecturesBasic] = useState<LectureData[]>([]);
  const [lecturesPremium, setLecturesPremium] = useState<LectureData[]>([]);
  const [liveSessions, setLiveSessions] = useState<LiveSessionRequest[]>([]);
  const [signalCalls, setSignalCalls] = useState<SignalCallRequest[]>([]);
  const [signalsRequests, setSignalsRequests] = useState<SignalsRequest[]>([]);
  const [signalRequestsOpen, setSignalRequestsOpen] = useState(false);
  const [openSignalId, setOpenSignalId] = useState<string | null>(null);
  const [openSignalCallId, setOpenSignalCallId] = useState<string | null>(null);

  const [selectiveRequests, setSelectiveRequests] = useState<SelectiveAccessRequest[]>([]);
  const [selectiveOpen, setSelectiveOpen] = useState(false);
  const [openSelectiveId, setOpenSelectiveId] = useState<string | null>(null);
  const [selEmail, setSelEmail] = useState("");
  const [selName, setSelName] = useState("");
  const [selDashboard, setSelDashboard] = useState<"basic" | "premium" | "signals">("premium");

  const [title, setTitle] = useState("");
  const [module, setModule] = useState("General");
  const [url, setUrl] = useState("");
  const [zoom, setZoom] = useState("");
  const [lecturePlan, setLecturePlan] = useState<Exclude<Plan, "signals">>("basic");

  const [meetingLink, setMeetingLink] = useState("");

  useEffect(() => {
    aliveRef.current = true;
    void (async () => {
      try {
        await firebaseAuth.authStateReady();
        if (!aliveRef.current) return;
        setAuthOk(Boolean(firebaseAuth.currentUser));
      } catch {
        if (!aliveRef.current) return;
        setAuthOk(false);
      }
      // If auth is missing (or revoked mid-refresh), RTDB calls can throw "permission denied".
      // Do not overwrite already-loaded admin data in that case.
      try {
        const v = await getAllPayments();
        if (!aliveRef.current) return;
        setPaymentRequests(v);
      } catch {}
      try {
        const v = await getAllUsers();
        if (!aliveRef.current) return;
        setUsers(v);
      } catch {}
      try {
        const v = await getLectures("basic");
        if (!aliveRef.current) return;
        setLecturesBasic(v);
      } catch {}
      try {
        const v = await getLectures("premium");
        if (!aliveRef.current) return;
        setLecturesPremium(v);
      } catch {}
      try {
        const v = await getLiveSessions();
        if (!aliveRef.current) return;
        setLiveSessions(v);
      } catch {}
      try {
        const v = await getSignalCalls();
        if (!aliveRef.current) return;
        setSignalCalls(v);
      } catch {}
      try {
        const v = await getSignalsRequests();
        if (!aliveRef.current) return;
        setSignalsRequests(v);
      } catch {}
      try {
        const v = await getSelectiveAccessRequests();
        if (!aliveRef.current) return;
        setSelectiveRequests(v);
      } catch {}
    })();
    return () => {
      aliveRef.current = false;
    };
  }, []);

  // Stored in Realtime Database now.

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const paidUsers = users.filter((u) => u.isPaid).length;
    const byPlan = {
      basic: users.filter((u) => u.plan === "basic").length,
      premium: users.filter((u) => u.plan === "premium").length,
      signals: users.filter((u) => u.plan === "signals").length,
    };
    return { totalUsers, paidUsers, byPlan };
  }, [users]);

  /** Pending first, then newest. Rejected rows are stripped server-side / in `getAllPayments`. */
  const paymentList = useMemo(() => {
    return [...paymentRequests].sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return b.createdAt - a.createdAt;
    });
  }, [paymentRequests]);

  const pendingPaymentCount = useMemo(
    () => paymentList.filter((r) => r.status === "pending").length,
    [paymentList],
  );

  const signalList = useMemo(() => {
    return [...signalsRequests].sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return b.createdAt - a.createdAt;
    });
  }, [signalsRequests]);

  const pendingSignalCount = useMemo(
    () => signalList.filter((r) => r.status === "pending").length,
    [signalList],
  );

  const selectiveList = useMemo(() => {
    return [...selectiveRequests].sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return b.createdAt - a.createdAt;
    });
  }, [selectiveRequests]);

  const pendingSelectiveCount = useMemo(
    () => selectiveList.filter((r) => r.status === "pending").length,
    [selectiveList],
  );

  async function refreshData() {
    try {
      const v = await getAllPayments();
      if (aliveRef.current) setPaymentRequests(v);
    } catch {}
    try {
      const v = await getAllUsers();
      if (aliveRef.current) setUsers(v);
    } catch {}
    try {
      const v = await getLectures("basic");
      if (aliveRef.current) setLecturesBasic(v);
    } catch {}
    try {
      const v = await getLectures("premium");
      if (aliveRef.current) setLecturesPremium(v);
    } catch {}
    try {
      const v = await getLiveSessions();
      if (aliveRef.current) setLiveSessions(v);
    } catch {}
    try {
      const v = await getSignalCalls();
      if (aliveRef.current) setSignalCalls(v);
    } catch {}
    try {
      const v = await getSignalsRequests();
      if (aliveRef.current) setSignalsRequests(v);
    } catch {}
    try {
      const v = await getSelectiveAccessRequests();
      if (aliveRef.current) setSelectiveRequests(v);
    } catch {}
  }

  async function addSelective() {
    if (!selEmail.trim()) return;
    if (!isEmail(selEmail.trim())) return;
    if (!selName.trim()) return;
    setBusyId("sel:add");
    try {
      await createSelectiveAccessRequest({
        email: selEmail.trim().toLowerCase(),
        name: selName.trim(),
        dashboard: selDashboard,
        createdBy: getCurrentEmail(),
      });
      await refreshData();
      setSelEmail("");
      setSelName("");
    } finally {
      setBusyId(null);
    }
  }

  async function removeSelective(id: string) {
    if (!window.confirm("Delete this selective access request?")) return;
    setBusyId(`sel:del:${id}`);
    try {
      await deleteSelectiveAccessRequest(id);
      await refreshData();
      setOpenSelectiveId((v) => (v === id ? null : v));
    } finally {
      setBusyId(null);
    }
  }

  async function approvePayment(paymentId: string) {
    setBusyId(paymentId);
    try {
      const adminEmail = getCurrentEmail();
      await approveDbPayment(paymentId, adminEmail);
      await refreshData();
    } finally {
      setBusyId(null);
    }
  }

  async function rejectPayment(paymentId: string) {
    setBusyId(paymentId);
    try {
      const adminEmail = getCurrentEmail();
      await rejectDbPayment(paymentId, adminEmail);
      await refreshData();
      setOpenPaymentId((id) => (id === paymentId ? null : id));
    } finally {
      setBusyId(null);
    }
  }

  async function removePayment(paymentId: string) {
    if (!window.confirm("Delete this payment request?")) return;
    setBusyId(`delpay:${paymentId}`);
    try {
      await deletePaymentRequest(paymentId);
      await refreshData();
      setOpenPaymentId((id) => (id === paymentId ? null : id));
    } finally {
      setBusyId(null);
    }
  }

  const lecturesByModuleBasic = useMemo(() => {
    const map = new Map<string, LectureData[]>();
    for (const l of lecturesBasic) {
      const key = l.module || "General";
      map.set(key, [...(map.get(key) ?? []), l]);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [lecturesBasic]);

  const lecturesByModulePremium = useMemo(() => {
    const map = new Map<string, LectureData[]>();
    for (const l of lecturesPremium) {
      const key = l.module || "General";
      map.set(key, [...(map.get(key) ?? []), l]);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [lecturesPremium]);

  const lectureFlatList = useMemo(() => {
    const all = [
      ...lecturesBasic.map((l) => ({ ...l, plan: "basic" as const })),
      ...lecturesPremium.map((l) => ({ ...l, plan: "premium" as const })),
    ];
    return all.sort((a, b) => b.createdAt - a.createdAt);
  }, [lecturesBasic, lecturesPremium]);

  function getCurrentEmail() {
    const key = `${encodeURIComponent("rh_email")}=`;
    const parts = document.cookie.split(";").map((p) => p.trim());
    const hit = parts.find((p) => p.startsWith(key));
    if (!hit) return "";
    return decodeURIComponent(hit.slice(key.length)).trim().toLowerCase();
  }

  async function handleSaveLecture() {
    const lectureTitle = title.trim();
    const videoUrl = url.trim();
    const category = module.trim() || "General";
    if (!lectureTitle) {
      window.alert("Please enter a lecture title.");
      return;
    }
    if (!/^https?:\/\//i.test(videoUrl)) {
      window.alert("Please enter a valid video URL starting with http(s)://");
      return;
    }

    setBusyId("lecture");
    try {
      await firebaseAuth.authStateReady();
      if (!firebaseAuth.currentUser) {
        window.alert("Firebase session not ready. Please log out and log back in, then try again.");
        return;
      }
      await saveCourseLecture(lecturePlan, {
        title: lectureTitle,
        videoUrl,
        category,
        zoom: zoom.trim() || undefined,
        createdBy: getCurrentEmail(),
      });
      await refreshData();
      window.alert("Lecture saved successfully.");
      setTitle("");
      setModule("General");
      setUrl("");
      setZoom("");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to save lecture.";
      window.alert(msg);
    } finally {
      setBusyId(null);
    }
  }

  // Signals + selective users are intentionally hidden from this admin console view.

  async function approveCall(id: string) {
    if (!meetingLink.trim()) return;
    setBusyId(id);
    try {
      await approveLiveSession(id, meetingLink, getCurrentEmail());
      setLiveSessions(await getLiveSessions());
      setMeetingLink("");
    } finally {
      setBusyId(null);
    }
  }

  async function rejectCall(id: string) {
    setBusyId(id);
    try {
      await rejectLiveSession(id, getCurrentEmail());
      setLiveSessions(await getLiveSessions());
    } finally {
      setBusyId(null);
    }
  }

  async function approveSignal(requestId: string) {
    setBusyId(`sig:${requestId}`);
    try {
      await approveDbSignalsRequest(requestId, getCurrentEmail());
      await refreshData();
    } finally {
      setBusyId(null);
    }
  }

  async function rejectSignal(requestId: string) {
    setBusyId(`sig:${requestId}`);
    try {
      await rejectDbSignalsRequest(requestId, getCurrentEmail());
      await refreshData();
      setOpenSignalId((id) => (id === requestId ? null : id));
    } finally {
      setBusyId(null);
    }
  }

  async function approveSignalCallRequest(id: string) {
    if (!meetingLink.trim()) return;
    setBusyId(`sigcall:${id}`);
    try {
      await approveSignalCall(id, meetingLink, getCurrentEmail());
      await refreshData();
      setMeetingLink("");
    } finally {
      setBusyId(null);
    }
  }

  async function rejectSignalCallRequest(id: string) {
    setBusyId(`sigcall:${id}`);
    try {
      await rejectSignalCall(id, getCurrentEmail());
      await refreshData();
      setOpenSignalCallId((v) => (v === id ? null : v));
    } finally {
      setBusyId(null);
    }
  }

  async function removeSignalCallRequest(id: string) {
    if (!window.confirm("Delete this signal call request?")) return;
    setBusyId(`delsigcall:${id}`);
    try {
      await deleteSignalCallRequest(id);
      await refreshData();
      setOpenSignalCallId((v) => (v === id ? null : v));
    } finally {
      setBusyId(null);
    }
  }

  async function removeSignalsRequest(id: string) {
    if (!window.confirm("Delete this signal request?")) return;
    setBusyId(`delsigreq:${id}`);
    try {
      await deleteSignalsRequest(id);
      await refreshData();
      setOpenSignalId((v) => (v === id ? null : v));
    } finally {
      setBusyId(null);
    }
  }

  async function removeLecture(plan: Exclude<Plan, "signals">, id: string) {
    if (!window.confirm("Delete this lecture?")) return;
    setBusyId(`dellec:${plan}:${id}`);
    try {
      await deleteLecture(plan, id);
      await refreshData();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="mt-8 grid gap-5 text-base text-white lg:grid-cols-2">
      <section className={cardClass}>
        <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
          Payments
        </p>
        <h2 className="mt-2 text-xl font-extrabold text-white">
          Payment Requests
        </h2>
        <p className="mt-3 text-base leading-8 text-white/90">
          Review requests from Pakistani manual payments. Approve to unlock access.
        </p>

        <div className="mt-5 rounded-3xl border-2 border-sky-400/28 bg-slate-950/42 p-6 shadow-[0_0_40px_rgba(56,189,248,0.10)]">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            Users overview
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Click a tile to open a full-page user list. There you can switch filters and expand each
            name for email and account details. Use &quot;← Admin console&quot; on that page to come
            back here.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Link
              href="/admin/users?view=total"
              className="block rounded-2xl border-2 border-sky-400/22 bg-slate-950/55 px-5 py-4 text-left shadow-[0_0_24px_rgba(56,189,248,0.08)] transition hover:border-sky-400/45 hover:bg-slate-900/50"
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Total users
              </p>
              <p className="mt-1 text-lg font-extrabold text-white">{stats.totalUsers}</p>
            </Link>
            <Link
              href="/admin/users?view=paid"
              className="block rounded-2xl border-2 border-sky-400/22 bg-slate-950/55 px-5 py-4 text-left shadow-[0_0_24px_rgba(56,189,248,0.08)] transition hover:border-sky-400/45 hover:bg-slate-900/50"
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Paid users
              </p>
              <p className="mt-1 text-lg font-extrabold text-white">{stats.paidUsers}</p>
            </Link>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {(["basic", "premium", "signals"] as Plan[]).map((p) => (
              <Link
                key={p}
                href={`/admin/users?view=${p}`}
                className="block rounded-2xl border-2 border-sky-400/22 bg-slate-950/55 px-5 py-4 text-left shadow-[0_0_24px_rgba(56,189,248,0.08)] transition hover:border-sky-400/45 hover:bg-slate-900/50"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                  {p}
                </p>
                <p className="mt-1 text-lg font-extrabold text-white">
                  {stats.byPlan[p]}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border-2 border-sky-400/28 bg-slate-950/42 shadow-[0_0_24px_rgba(56,189,248,0.08)]">
          <button
            type="button"
            aria-expanded={requestsOpen}
            onClick={() => {
              setRequestsOpen((v) => {
                const next = !v;
                if (!next) setOpenPaymentId(null);
                return next;
              });
            }}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-slate-900/35"
          >
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-white">
                Requests
              </span>
              <span className="rounded-full border border-sky-400/35 bg-slate-900/60 px-2.5 py-0.5 text-xs font-extrabold text-sky-100">
                {paymentList.length}
              </span>
              {pendingPaymentCount > 0 ? (
                <span className="rounded-full border border-amber-400/35 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-100">
                  {pendingPaymentCount} pending
                </span>
              ) : null}
            </div>
            <span className="shrink-0 text-slate-400" aria-hidden>
              {requestsOpen ? "▴" : "▾"}
            </span>
          </button>

          {requestsOpen ? (
            <div className="border-t-2 border-sky-400/25 px-5 pb-5 pt-4">
              {paymentList.length === 0 ? (
                <p className="text-sm text-slate-300">
                  No payment requests right now.
                </p>
              ) : (
                <>
                  <p className="mb-3 text-xs text-slate-400">
                    Click a name to open details (sent time, email, status, trxId, amount, method).
                  </p>
                  <div className="max-h-[min(70vh,520px)] space-y-2 overflow-y-auto pr-1">
                    {paymentList.map((r) => {
                      const open = openPaymentId === r.id;
                      const displayName = r.name.trim() || r.email;
                      return (
                        <div
                          key={r.id}
                          className="overflow-hidden rounded-2xl border-2 border-sky-400/28 bg-slate-950/40 shadow-[0_0_24px_rgba(56,189,248,0.08)]"
                        >
                          <button
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpenPaymentId((id) => (id === r.id ? null : r.id))}
                            className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-slate-900/35"
                          >
                            <span className="min-w-0 truncate text-sm font-extrabold text-white">
                              {displayName}
                            </span>
                            <span className="flex shrink-0 items-center gap-2">
                              {r.status === "pending" ? (
                                <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-100">
                                  Pending
                                </span>
                              ) : (
                                <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-emerald-100">
                                  Approved
                                </span>
                              )}
                              <span className="text-slate-500" aria-hidden>
                                {open ? "▴" : "▾"}
                              </span>
                            </span>
                          </button>

                          {open ? (
                            <div className="space-y-4 border-t-2 border-sky-400/20 px-4 pb-4 pt-4">
                              <div className="grid gap-2 text-sm">
                                <p className="text-slate-300">
                                  <span className="font-extrabold text-slate-500">Email </span>
                                  <span className="break-all text-white">{r.email}</span>
                                </p>
                                <p className="text-slate-300">
                                  <span className="font-extrabold text-slate-500">Submitted </span>
                                  <span className="text-white">
                                    {formatRequestWhen(r.createdAt)}
                                  </span>
                                </p>
                                <p className="text-slate-300">
                                  <span className="font-extrabold text-slate-500">Plan </span>
                                  <span className="font-semibold capitalize text-white">
                                    {r.plan}
                                  </span>
                                </p>
                                <p className="text-slate-300">
                                  <span className="font-extrabold text-slate-500">Transaction ID </span>
                                  <span className="break-all text-white">{r.trxId}</span>
                                </p>
                                <p className="text-slate-300">
                                  <span className="font-extrabold text-slate-500">WhatsApp </span>
                                  <span className="break-all text-white">{r.whatsapp}</span>
                                </p>
                                <p className="text-slate-300">
                                  <span className="font-extrabold text-slate-500">Amount </span>
                                  <span className="text-white">{r.amount}</span>
                                </p>
                                <p className="text-slate-300">
                                  <span className="font-extrabold text-slate-500">Method </span>
                                  <span className="text-white">{r.method}</span>
                                </p>
                                <p className="flex flex-wrap items-center gap-2 text-slate-300">
                                  <span className="font-extrabold text-slate-500">Status </span>
                                  <span
                                    className={[
                                      "rounded-full border px-3 py-1 text-xs font-extrabold",
                                      r.status === "approved"
                                        ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
                                        : r.status === "rejected"
                                          ? "border-red-400/25 bg-red-500/10 text-red-200"
                                          : "border-amber-400/25 bg-amber-500/10 text-amber-200",
                                    ].join(" ")}
                                  >
                                    {r.status.toUpperCase()}
                                  </span>
                                </p>
                              </div>

                              {r.status === "pending" ? (
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => void approvePayment(r.id)}
                                    disabled={busyId === r.id}
                                    className="inline-flex flex-1 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-500/10 px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-emerald-500/15 sm:flex-none"
                                  >
                                    {busyId === r.id ? "Approving…" : "Approve"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => void rejectPayment(r.id)}
                                    disabled={busyId === r.id}
                                    className="inline-flex flex-1 items-center justify-center rounded-full border border-red-400/25 bg-red-500/10 px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-red-500/15 sm:flex-none"
                                  >
                                    {busyId === r.id ? "Rejecting…" : "Reject"}
                                  </button>
                                </div>
                              ) : null}

                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => void removePayment(r.id)}
                                  disabled={busyId === `delpay:${r.id}`}
                                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/35 px-5 py-2.5 text-xs font-extrabold text-white/90 transition hover:bg-slate-900/45"
                                >
                                  {busyId === `delpay:${r.id}` ? "Deleting…" : "Delete"}
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </section>

      <section className={cardClass}>
        <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
          Content
        </p>
        <h2 className="mt-2 text-xl font-extrabold text-white">Course upload</h2>
        <p className="mt-3 text-base leading-8 text-white/90">
          Add lecture links from anywhere (YouTube, Drive, Vimeo, etc.). These are
          saved in Firebase Realtime Database and shown in dashboards.
        </p>

        {authOk === false ? (
          <div className="mt-5 rounded-2xl border-2 border-amber-400/25 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
            Firebase Auth is not active in this browser session, so saves can fail with “permission denied”.
            Log out and log back in, then refresh `/admin`.
          </div>
        ) : null}

        <div className="mt-5 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              className={inputClass}
              value={lecturePlan}
              onChange={(e) => setLecturePlan(e.target.value as "basic" | "premium")}
            >
              <option value="basic">Basic users</option>
              <option value="premium">Premium users</option>
            </select>
            <div className="rounded-2xl border-2 border-sky-400/25 bg-slate-950/45 px-5 py-4 text-base text-white/90">
              Upload target:{" "}
              <span className="font-extrabold text-white">{lecturePlan}</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Lecture title"
            />
            <input
              className={inputClass}
              value={module}
              onChange={(e) => setModule(e.target.value)}
              placeholder="Module (e.g. Basics, Risk)"
            />
          </div>
          <input
            className={inputClass}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Video URL (https://...)"
          />
          <input
            className={inputClass}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            placeholder="Zoom link or Meeting ID (optional)"
          />

          <button
            type="button"
            onClick={() => void handleSaveLecture()}
            disabled={busyId === "lecture"}
            className="rh-btn-primary mt-2 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-extrabold text-white"
          >
            {busyId === "lecture" ? "Saving…" : "Save lecture"}
          </button>

          <p className="text-sm text-white/85">
            Tip: Use a full URL starting with <span className="font-semibold text-white">https://</span>.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          <div className="overflow-hidden rounded-3xl border-2 border-sky-400/25 bg-slate-950/40">
            <button
              type="button"
              aria-expanded={lectureListOpen}
              onClick={() => setLectureListOpen((v) => !v)}
              className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left transition hover:bg-slate-900/35"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-white">
                  Saved lectures
                </span>
                <span className="rounded-full border border-sky-400/35 bg-slate-900/60 px-2.5 py-0.5 text-xs font-extrabold text-sky-100">
                  {lectureFlatList.length}
                </span>
              </div>
              <span className="shrink-0 text-slate-400" aria-hidden>
                {lectureListOpen ? "▴" : "▾"}
              </span>
            </button>

            {lectureListOpen ? (
              <div className="border-t-2 border-sky-400/15 px-6 pb-6 pt-5">
                {lectureFlatList.length === 0 ? (
                  <p className="text-sm text-slate-300">No lectures saved yet.</p>
                ) : (
                  <div className="max-h-[min(70vh,520px)] space-y-2 overflow-y-auto pr-1">
                    {lectureFlatList.map((l) => (
                      <div
                        key={`${l.plan}:${l.id}`}
                        className="rounded-2xl border border-sky-400/15 bg-slate-950/25 px-4 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-extrabold text-white">
                              {l.title}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              Plan: <span className="font-semibold text-slate-200">{l.plan}</span>
                              {" "}• Module: <span className="font-semibold text-slate-200">{l.module}</span>
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Saved: {formatRequestWhen(l.createdAt)}
                              {l.createdBy ? (
                                <>
                                  {" "}• By: <span className="text-slate-300">{l.createdBy}</span>
                                </>
                              ) : null}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-sky-400/15 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-slate-200 transition hover:bg-slate-900/45"
                            >
                              Open →
                            </a>
                            <button
                              type="button"
                              onClick={() => void removeLecture(l.plan, l.id)}
                              disabled={busyId === `dellec:${l.plan}:${l.id}`}
                              className="rounded-full border border-white/10 bg-slate-950/30 px-3 py-1 text-xs font-extrabold text-white/90 transition hover:bg-slate-900/45"
                            >
                              {busyId === `dellec:${l.plan}:${l.id}` ? "Deleting…" : "Delete"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border-2 border-sky-400/25 bg-slate-950/40 p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
              Basic lectures
            </p>
            <p className="mt-2 text-base text-white/90">{lecturesBasic.length} total</p>
            {lecturesByModuleBasic.length === 0 ? (
              <div className="mt-4 rounded-2xl border-2 border-sky-400/20 bg-slate-950/45 px-5 py-4 text-base text-white/90">
                No lectures yet.
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {lecturesByModuleBasic.map(([m, list]) => (
                  <div key={m}>
                    <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/85">
                      {m}
                    </p>
                    <div className="mt-3 grid gap-3">
                      {list.slice(0, 4).map((l) => (
                        <a
                          key={l.id}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-2xl border-2 border-sky-400/18 bg-slate-950/45 px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-950/55"
                        >
                          {l.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-sky-400/15 bg-slate-950/25 p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Premium lectures
            </p>
            <p className="mt-2 text-sm text-slate-400">{lecturesPremium.length} total</p>
            {lecturesByModulePremium.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-sky-400/10 bg-slate-900/30 px-4 py-4 text-sm text-slate-400">
                No lectures yet.
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {lecturesByModulePremium.map(([m, list]) => (
                  <div key={m}>
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                      {m}
                    </p>
                    <div className="mt-3 grid gap-3">
                      {list.slice(0, 4).map((l) => (
                        <a
                          key={l.id}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-2xl border border-sky-400/10 bg-slate-900/30 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-900/45"
                        >
                          {l.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:col-span-2 lg:grid-cols-2">
        <section className={cardClass}>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            Calls
          </p>
          <h2 className="mt-2 text-lg font-extrabold text-white">Live sessions</h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Approve requests, attach a Zoom/meeting link, and send it to users.
          </p>

          <input
            className={`${inputClass} mt-5`}
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="Meeting link (paste once, then approve requests)"
          />

          <div className="mt-4 grid gap-2">
            {liveSessions.length === 0 ? (
              <div className="rounded-2xl border-2 border-sky-400/25 bg-slate-950/35 px-4 py-4 text-sm text-slate-300">
                No live session requests yet.
              </div>
            ) : (
              liveSessions.slice(0, 8).map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl border border-sky-400/15 bg-slate-950/25 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-white">{r.email}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        Status: <span className="text-slate-200">{r.status}</span>
                        {r.meetingLink ? (
                          <>
                            {" "}
                            •{" "}
                            <a
                              className="font-extrabold text-sky-300 hover:text-sky-200"
                              href={r.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open link →
                            </a>
                          </>
                        ) : null}
                      </p>
                    </div>
                    {r.status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => void approveCall(r.id)}
                          disabled={busyId === r.id}
                          className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-emerald-500/15"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => void rejectCall(r.id)}
                          disabled={busyId === r.id}
                          className="rounded-full border border-red-400/25 bg-red-500/10 px-4 py-2 text-xs font-extrabold text-white transition hover:bg-red-500/15"
                        >
                          Reject
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className={cardClass}>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
            Signals
          </p>
          <h2 className="mt-2 text-lg font-extrabold text-white">Signal Requests</h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Users submit their phone number from the Signals page. Approve to unlock access to
            <span className="font-extrabold text-sky-200"> /signals-dashboard</span>.
          </p>

          <div className="mt-5 rounded-2xl border-2 border-sky-400/28 bg-slate-950/42 p-5 shadow-[0_0_24px_rgba(56,189,248,0.08)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Signal calls
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Users book a call from <span className="font-extrabold text-white">/signals-dashboard</span>.
              Paste meeting link above (same input), then approve.
            </p>
            <div className="mt-4 grid gap-2">
              {signalCalls.length === 0 ? (
                <div className="rounded-2xl border border-sky-400/15 bg-slate-950/25 px-4 py-4 text-sm text-slate-300">
                  No signal call requests yet.
                </div>
              ) : (
                signalCalls.slice(0, 8).map((r) => {
                  const open = openSignalCallId === r.id;
                  return (
                    <div
                      key={r.id}
                      className="overflow-hidden rounded-2xl border border-sky-400/15 bg-slate-950/25"
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setOpenSignalCallId((v) => (v === r.id ? null : r.id))}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-slate-900/35"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-white">{r.name}</p>
                          <p className="mt-1 truncate text-xs text-slate-400">
                            {r.email} • {r.whatsapp}
                          </p>
                        </div>
                        <span className="flex shrink-0 items-center gap-2">
                          {r.status === "pending" ? (
                            <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-100">
                              Pending
                            </span>
                          ) : r.status === "approved" ? (
                            <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-emerald-100">
                              Approved
                            </span>
                          ) : (
                            <span className="rounded-full border border-red-400/25 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-red-100">
                              Rejected
                            </span>
                          )}
                          <span className="text-slate-500" aria-hidden>
                            {open ? "▴" : "▾"}
                          </span>
                        </span>
                      </button>

                      {open ? (
                        <div className="space-y-3 border-t border-sky-400/10 px-4 pb-4 pt-4 text-sm">
                          {r.meetingLink ? (
                            <a
                              className="inline-flex items-center font-extrabold text-sky-300 hover:text-sky-200"
                              href={r.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open meeting link →
                            </a>
                          ) : null}

                          {r.status === "pending" ? (
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => void approveSignalCallRequest(r.id)}
                                disabled={busyId === `sigcall:${r.id}`}
                                className="inline-flex flex-1 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-500/10 px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-emerald-500/15 sm:flex-none"
                              >
                                {busyId === `sigcall:${r.id}` ? "Approving…" : "Approve"}
                              </button>
                              <button
                                type="button"
                                onClick={() => void rejectSignalCallRequest(r.id)}
                                disabled={busyId === `sigcall:${r.id}`}
                                className="inline-flex flex-1 items-center justify-center rounded-full border border-red-400/25 bg-red-500/10 px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-red-500/15 sm:flex-none"
                              >
                                {busyId === `sigcall:${r.id}` ? "Rejecting…" : "Reject"}
                              </button>
                            </div>
                          ) : null}

                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => void removeSignalCallRequest(r.id)}
                              disabled={busyId === `delsigcall:${r.id}`}
                              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/35 px-5 py-2.5 text-xs font-extrabold text-white/90 transition hover:bg-slate-900/45"
                            >
                              {busyId === `delsigcall:${r.id}` ? "Deleting…" : "Delete"}
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border-2 border-sky-400/28 bg-slate-950/42 shadow-[0_0_24px_rgba(56,189,248,0.08)]">
            <button
              type="button"
              aria-expanded={signalRequestsOpen}
              onClick={() => {
                setSignalRequestsOpen((v) => {
                  const next = !v;
                  if (!next) setOpenSignalId(null);
                  return next;
                });
              }}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-slate-900/35"
            >
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-white">
                  Signal requests
                </span>
                <span className="rounded-full border border-sky-400/35 bg-slate-900/60 px-2.5 py-0.5 text-xs font-extrabold text-sky-100">
                  {signalList.length}
                </span>
                {pendingSignalCount > 0 ? (
                  <span className="rounded-full border border-amber-400/35 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-100">
                    {pendingSignalCount} pending
                  </span>
                ) : null}
              </div>
              <span className="shrink-0 text-slate-400" aria-hidden>
                {signalRequestsOpen ? "▴" : "▾"}
              </span>
            </button>

            {signalRequestsOpen ? (
              <div className="border-t-2 border-sky-400/25 px-5 pb-5 pt-4">
                {signalList.length === 0 ? (
                  <p className="text-sm text-slate-300">
                    No signal requests yet.
                  </p>
                ) : (
                  <>
                    <p className="mb-3 text-xs text-slate-400">
                      Click a row to expand details and actions.
                    </p>
                    <div className="max-h-[min(70vh,520px)] space-y-2 overflow-y-auto pr-1">
                      {signalList.map((r) => {
                        const open = openSignalId === r.id;
                        return (
                          <div
                            key={r.id}
                            className="overflow-hidden rounded-2xl border-2 border-sky-400/28 bg-slate-950/40 shadow-[0_0_24px_rgba(56,189,248,0.08)]"
                          >
                            <button
                              type="button"
                              aria-expanded={open}
                              onClick={() => setOpenSignalId((id) => (id === r.id ? null : r.id))}
                              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-slate-900/35"
                            >
                              <span className="min-w-0 truncate text-sm font-extrabold text-white">
                                {r.email}
                              </span>
                              <span className="flex shrink-0 items-center gap-2">
                                <span className="hidden text-[11px] font-extrabold uppercase tracking-wide text-slate-400 sm:inline">
                                  {r.phone}
                                </span>
                                {r.status === "pending" ? (
                                  <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-100">
                                    Pending
                                  </span>
                                ) : (
                                  <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-emerald-100">
                                    Approved
                                  </span>
                                )}
                                <span className="text-slate-500" aria-hidden>
                                  {open ? "▴" : "▾"}
                                </span>
                              </span>
                            </button>

                            {open ? (
                              <div className="space-y-4 border-t-2 border-sky-400/20 px-4 pb-4 pt-4">
                                <div className="grid gap-2 text-sm">
                                  <p className="text-slate-300">
                                    <span className="font-extrabold text-slate-500">Phone </span>
                                    <span className="font-semibold text-white">{r.phone}</span>
                                  </p>
                                  <p className="text-slate-300">
                                    <span className="font-extrabold text-slate-500">Submitted </span>
                                    <span className="text-white">{formatRequestWhen(r.createdAt)}</span>
                                  </p>
                                  <p className="flex flex-wrap items-center gap-2 text-slate-300">
                                    <span className="font-extrabold text-slate-500">Status </span>
                                    <span
                                      className={[
                                        "rounded-full border px-3 py-1 text-xs font-extrabold",
                                        r.status === "approved"
                                          ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
                                          : "border-amber-400/25 bg-amber-500/10 text-amber-200",
                                      ].join(" ")}
                                    >
                                      {r.status.toUpperCase()}
                                    </span>
                                  </p>
                                </div>

                                {r.status === "pending" ? (
                                  <div className="flex flex-wrap gap-2">
                                    <button
                                      type="button"
                                      onClick={() => void approveSignal(r.id)}
                                      disabled={busyId === `sig:${r.id}`}
                                      className="inline-flex flex-1 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-500/10 px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-emerald-500/15 sm:flex-none"
                                    >
                                      {busyId === `sig:${r.id}` ? "Approving…" : "Approve"}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => void rejectSignal(r.id)}
                                      disabled={busyId === `sig:${r.id}`}
                                      className="inline-flex flex-1 items-center justify-center rounded-full border border-red-400/25 bg-red-500/10 px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-red-500/15 sm:flex-none"
                                    >
                                      {busyId === `sig:${r.id}` ? "Removing…" : "Reject"}
                                    </button>
                                  </div>
                                ) : null}

                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => void removeSignalsRequest(r.id)}
                                    disabled={busyId === `delsigreq:${r.id}`}
                                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/35 px-5 py-2.5 text-xs font-extrabold text-white/90 transition hover:bg-slate-900/45"
                                  >
                                    {busyId === `delsigreq:${r.id}` ? "Deleting…" : "Delete"}
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>

          <div className="mt-5 rounded-2xl border-2 border-sky-400/28 bg-slate-950/42 p-5 shadow-[0_0_24px_rgba(56,189,248,0.08)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
              Selective users
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Create an invitation for a specific user to access a specific dashboard. The user can accept/reject from their profile.
            </p>

            <div className="mt-4 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  value={selEmail}
                  onChange={(e) => setSelEmail(e.target.value)}
                  placeholder="User email (gmail)"
                />
                <input
                  className={inputClass}
                  value={selName}
                  onChange={(e) => setSelName(e.target.value)}
                  placeholder="User name"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  className={inputClass}
                  value={selDashboard}
                  onChange={(e) => setSelDashboard(e.target.value as "basic" | "premium" | "signals")}
                >
                  <option value="basic">Basic dashboard</option>
                  <option value="premium">Premium dashboard</option>
                  <option value="signals">Signals dashboard</option>
                </select>
                <button
                  type="button"
                  onClick={() => void addSelective()}
                  disabled={busyId === "sel:add" || !isEmail(selEmail) || !selName.trim()}
                  className="rh-btn-primary inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-extrabold text-white"
                >
                  {busyId === "sel:add" ? "Sending…" : "Create request"}
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-sky-400/15 bg-slate-950/25">
              <button
                type="button"
                aria-expanded={selectiveOpen}
                onClick={() => {
                  setSelectiveOpen((v) => {
                    const next = !v;
                    if (!next) setOpenSelectiveId(null);
                    return next;
                  });
                }}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-slate-900/35"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-white">
                    Requests
                  </span>
                  <span className="rounded-full border border-sky-400/35 bg-slate-900/60 px-2.5 py-0.5 text-xs font-extrabold text-sky-100">
                    {selectiveList.length}
                  </span>
                  {pendingSelectiveCount > 0 ? (
                    <span className="rounded-full border border-amber-400/35 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-100">
                      {pendingSelectiveCount} pending
                    </span>
                  ) : null}
                </div>
                <span className="shrink-0 text-slate-400" aria-hidden>
                  {selectiveOpen ? "▴" : "▾"}
                </span>
              </button>

              {selectiveOpen ? (
                <div className="border-t border-sky-400/10 px-4 pb-4 pt-4">
                  {selectiveList.length === 0 ? (
                    <p className="text-sm text-slate-300">No selective access requests yet.</p>
                  ) : (
                    <div className="max-h-[min(60vh,420px)] space-y-2 overflow-y-auto pr-1">
                      {selectiveList.map((r) => {
                        const open = openSelectiveId === r.id;
                        return (
                          <div
                            key={r.id}
                            className="overflow-hidden rounded-2xl border border-sky-400/15 bg-slate-950/20"
                          >
                            <button
                              type="button"
                              aria-expanded={open}
                              onClick={() => setOpenSelectiveId((v) => (v === r.id ? null : r.id))}
                              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-slate-900/35"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-sm font-extrabold text-white">{r.name}</p>
                                <p className="mt-1 truncate text-xs text-slate-400">
                                  {r.email} • {r.dashboard}
                                </p>
                              </div>
                              <span className="flex shrink-0 items-center gap-2">
                                {r.status === "pending" ? (
                                  <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-100">
                                    Pending
                                  </span>
                                ) : r.status === "accepted" ? (
                                  <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-emerald-100">
                                    Accepted
                                  </span>
                                ) : (
                                  <span className="rounded-full border border-red-400/25 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-red-100">
                                    Rejected
                                  </span>
                                )}
                                <span className="text-slate-500" aria-hidden>
                                  {open ? "▴" : "▾"}
                                </span>
                              </span>
                            </button>

                            {open ? (
                              <div className="space-y-3 border-t border-sky-400/10 px-4 pb-4 pt-4 text-sm">
                                <p className="text-slate-300">
                                  <span className="font-extrabold text-slate-500">Created </span>
                                  <span className="text-white">{formatRequestWhen(r.createdAt)}</span>
                                </p>
                                <p className="text-slate-300">
                                  <span className="font-extrabold text-slate-500">Status </span>
                                  <span className="font-semibold text-white">{r.status}</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => void removeSelective(r.id)}
                                    disabled={busyId === `sel:del:${r.id}`}
                                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/35 px-5 py-2.5 text-xs font-extrabold text-white/90 transition hover:bg-slate-900/45"
                                  >
                                    {busyId === `sel:del:${r.id}` ? "Deleting…" : "Delete"}
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

