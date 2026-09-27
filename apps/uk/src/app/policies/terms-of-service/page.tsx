import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Terms of Service | Miroooo UK",
  description:
    "Terms and conditions governing the use of the Miroooo UK website and purchase of Miroooo oral care products.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/terms-of-service" },
};

export default function Page() {
  return <PolicyPage slug="terms-of-service" />;
}
