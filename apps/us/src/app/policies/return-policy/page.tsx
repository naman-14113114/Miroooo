import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Return Policy | Miroooo US",
  description:
    "Miroooo US 30-day defective return policy, RMA authorization requirements, and return process.",
  alternates: { canonical: "https://miroooo.us/policies/return-policy" },
};

export default function Page() {
  return <PolicyPage slug="return-policy" />;
}
