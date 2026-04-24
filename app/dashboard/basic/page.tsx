import { cookies } from "next/headers";
import { CourseDashboard } from "../components/CourseDashboard";

export const metadata = {
  title: "Dashboard (Basic)",
  description:
    "Access your RH Traders learning dashboard to track course progress and open your lectures library.",
  robots: { index: false, follow: false },
};

export default async function BasicDashboardPage() {
  const cookieStore = await cookies();
  return (
    <CourseDashboard
      tier="basic"
      email={cookieStore.get("rh_email")?.value ?? ""}
      first={cookieStore.get("rh_first")?.value ?? ""}
      last={cookieStore.get("rh_last")?.value ?? ""}
      enrolledRaw={cookieStore.get("rh_enrolled")?.value ?? ""}
    />
  );
}

