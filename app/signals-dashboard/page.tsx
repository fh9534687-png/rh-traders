import { cookies } from "next/headers";
import { SignalsDashboardClient } from "./signals-dashboard-client";

export default async function SignalsDashboardPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("rh_email")?.value ?? "";
  const role = cookieStore.get("rh_role")?.value ?? "user";
  return <SignalsDashboardClient email={email} role={role} />;
}

