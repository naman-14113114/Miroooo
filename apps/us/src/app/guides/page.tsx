import type { Metadata } from "next";
import { GuidesListPage } from "@/components/guides/GuidesListPage";

export const metadata: Metadata = {
  title: "Electric Toothbrush & Oral Care Guides | Miroooo",
  description:
    "Clear, source-backed guides to electric toothbrush types, two-minute brushing, replacement heads and traveling with a rechargeable toothbrush.",
  alternates: { canonical: "https://miroooo.us/guides" },
};

export default function Page() {
  return <GuidesListPage />;
}
