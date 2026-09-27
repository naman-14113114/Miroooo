import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Return Policy | Miroooo UK",
  description:
    "Miroooo UK 30-day defective return policy, RMA authorization requirements, and return process.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/return-policy" },
};

export default function Page() {
  return <PolicyPage slug="return-policy" />;
}
