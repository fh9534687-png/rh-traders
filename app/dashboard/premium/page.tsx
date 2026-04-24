import { cookies } from "next/headers";
import { CourseDashboard } from "../components/CourseDashboard";

export const metadata = {
  title: "Dashboard (Premium)",
  description:
    "Open your RH Traders premium dashboard to access the complete crypto trading course and lectures library.",
  robots: { index: false, follow: false },
};

export default async function PremiumDashboardPage() {
  const cookieStore = await cookies();
  return (
    <CourseDashboard
      tier="premium"
      email={cookieStore.get("rh_email")?.value ?? ""}
      first={cookieStore.get("rh_first")?.value ?? ""}
      last={cookieStore.get("rh_last")?.value ?? ""}
      enrolledRaw={cookieStore.get("rh_enrolled")?.value ?? ""}
    />
  );
}

