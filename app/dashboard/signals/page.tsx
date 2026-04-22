import { cookies } from "next/headers";
import { SignalsDashboard } from "../components/SignalsDashboard";

export default async function SignalsDashboardPage() {
  const cookieStore = await cookies();
  return <SignalsDashboard email={cookieStore.get("rh_email")?.value ?? ""} />;
}

