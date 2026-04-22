import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthCard } from "../components/AuthCard";

export default async function AuthPage() {
  const cookieStore = await cookies();
  const isLoggedIn = Boolean(cookieStore.get("rh_session")?.value);
  const role = cookieStore.get("rh_role")?.value ?? "user";
  const plan = cookieStore.get("rh_plan")?.value ?? "";
  const isPaid = Boolean(cookieStore.get("rh_paid")?.value);

  // If already logged in, do not show auth page again.
  if (isLoggedIn) {
    if (role === "admin") redirect("/admin");
    if (isPaid && plan === "signals") redirect("/signals-dashboard");
    if (isPaid && (plan === "basic" || plan === "premium")) redirect(`/dashboard/${plan}`);
    redirect("/");
  }

  return (
    <main className="relative flex flex-1 items-center justify-center px-5 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,140,0,0.08),transparent_55%)]" />
      <div className="relative w-full">
        <div className="rh-wrap flex justify-center">
          <AuthCard />
        </div>
      </div>
    </main>
  );
}

