import { CourseLecturesPage } from "../../components/CourseLecturesPage";

export const metadata = {
  title: "Lectures (Basic)",
  description:
    "Browse your RH Traders lectures by section and open each lesson from the course content library.",
  robots: { index: false, follow: false },
};

export default function BasicLecturesPage() {
  return <CourseLecturesPage key="basic" tier="basic" />;
}

