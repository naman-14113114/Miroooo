import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Delivery & Returns Overview | Miroooo UK",
  description:
    "Comprehensive overview of Miroooo UK shipping timelines (1-3 business days processing, 3-10 business days transit), order tracking, and returns eligibility.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/delivery-returns" },
};

export default function Page() {
  return <PolicyPage slug="delivery-returns" />;
}
