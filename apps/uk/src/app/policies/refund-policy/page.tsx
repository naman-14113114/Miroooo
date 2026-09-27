import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Refund Policy | Miroooo UK",
  description:
    "Refund processing timelines, payment method credits, and return inspection policies.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/refund-policy" },
};

export default function Page() {
  return <PolicyPage slug="refund-policy" />;
}
