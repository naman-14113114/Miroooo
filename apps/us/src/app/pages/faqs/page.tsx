import type { Metadata } from "next";
import { FaqsPage } from "@/components/pages/FaqsPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Miroooo Help Center US",
  description:
    "Find fast answers to shipping queries, Miroooo X1 & X2 electric toothbrushes, return policy, and support info.",
  alternates: { canonical: "https://miroooo.us/pages/faqs" },
};

export default function Page() {
  return <FaqsPage />;
}
