import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Cookies Policy | Miroooo US",
  description:
    "Learn how Miroooo uses cookies, local storage, and analytical technologies to enhance your browsing experience.",
  alternates: { canonical: "https://miroooo.us/policies/cookies-policy" },
};

export default function Page() {
  return <PolicyPage slug="cookies-policy" />;
}
