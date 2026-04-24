import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact RH Traders",
  description:
    "Contact RH Traders for support, plan questions, or partnership requests. Send a message and our team will reply by email.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

