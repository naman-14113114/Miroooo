import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Delivery & Returns Overview | Miroooo UK",
  description:
    "Comprehensive overview of Miroooo UK shipping timelines, order tracking, returns eligibility, and 2-year warranty.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/delivery-returns" },
};

export default function Page() {
  return <PolicyPage slug="delivery-returns" />;
}
