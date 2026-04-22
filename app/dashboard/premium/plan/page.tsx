import { cookies } from "next/headers";
import { CoursePlanDashboard } from "../../components/CoursePlanDashboard";

export default async function PremiumPlanPage() {
  const cookieStore = await cookies();
  return (
    <CoursePlanDashboard
      tier="premium"
      email={cookieStore.get("rh_email")?.value ?? ""}
      first={cookieStore.get("rh_first")?.value ?? ""}
      last={cookieStore.get("rh_last")?.value ?? ""}
      enrolledRaw={cookieStore.get("rh_enrolled")?.value ?? ""}
      isPaid={cookieStore.get("rh_paid")?.value === "1"}
      paymentStatus={cookieStore.get("rh_payment_status")?.value ?? "none"}
    />
  );
}

