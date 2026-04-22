import { cookies } from "next/headers";
import { CourseDashboard } from "../components/CourseDashboard";

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

