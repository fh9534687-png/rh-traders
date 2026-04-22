import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { LogoutButton } from "../../components/LogoutButton";
import { AdminUsersList } from "../../components/AdminUsersList";

export default async function AdminUsersPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("rh_email")?.value ?? "Admin";

  return (
    <main className="relative min-h-[70vh] flex-1 px-5 py-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#03045e_0%,#023e8a_18%,#0077b6_36%,#0096c7_52%,#00b4d8_66%,#48cae4_78%,#90e0ef_88%,#ade8f4_94%,#caf0f8_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(2,6,23,0.45),rgba(2,6,23,0.86)_62%)]" />
      <div className="rh-wrap relative mx-auto max-w-[720px]">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--rh-red)]/35 bg-slate-900/60 px-4 py-2 text-xs font-extrabold tracking-[0.22em] text-slate-300">
              ADMIN
            </p>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              User directory
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Signed in as <span className="font-semibold text-slate-200">{email}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className="rh-btn-secondary inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-extrabold transition"
            >
              ← Admin console
            </Link>
            <LogoutButton className="inline-flex items-center justify-center rounded-full border border-[color:var(--rh-red)]/40 bg-[color:var(--rh-red)]/10 px-6 py-2.5 text-sm font-extrabold text-white transition hover:bg-[color:var(--rh-red)]/14" />
          </div>
        </header>

        <Suspense
          fallback={
            <div className="mt-10 rounded-3xl border-2 border-sky-400/25 bg-slate-950/60 px-6 py-12 text-center text-slate-400">
              Loading…
            </div>
          }
        >
          <AdminUsersList />
        </Suspense>
      </div>
    </main>
  );
}
