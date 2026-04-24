import { CourseLecturesPage } from "../../components/CourseLecturesPage";

export const metadata = {
  title: "Lectures (Premium)",
  description:
    "Browse your premium RH Traders lectures by section and open lessons from the full course library.",
  robots: { index: false, follow: false },
};

export default function PremiumLecturesPage() {
  return <CourseLecturesPage key="premium" tier="premium" />;
}

