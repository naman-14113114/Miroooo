import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Cookies & Tracking Policy | Miroooo UK",
  description:
    "Learn how Miroooo uses cookies, local storage, and analytical technologies to enhance your browsing experience.",
  alternates: { canonical: "https://www.trymiroooo.com/policies/cookies-policy" },
};

export default function Page() {
  return <PolicyPage slug="cookies-policy" />;
}
