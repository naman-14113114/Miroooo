import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "2-Year Warranty Policy | Miroooo US",
  description:
    "Comprehensive 2-year warranty terms covering Miroooo X1 & Miroooo X2 electric toothbrushes.",
  alternates: { canonical: "https://miroooo.us/policies/warranty" },
};

export default function Page() {
  return <PolicyPage slug="warranty" />;
}
