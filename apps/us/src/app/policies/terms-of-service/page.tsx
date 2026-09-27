import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Terms of Service | Miroooo US",
  description:
    "Terms and conditions governing the use of the Miroooo US website and purchase of Miroooo oral care products.",
  alternates: { canonical: "https://miroooo.us/policies/terms-of-service" },
};

export default function Page() {
  return <PolicyPage slug="terms-of-service" />;
}
