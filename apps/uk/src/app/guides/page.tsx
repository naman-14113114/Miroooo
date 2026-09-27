import type { Metadata } from "next";
import { GuidesListPage } from "@/components/guides/GuidesListPage";

export const metadata: Metadata = {
  title: "Electric Toothbrush & Oral Care Guides | Miroooo",
  description:
    "Clear, source-backed guides to electric toothbrush types, two-minute brushing, replacement heads and travelling with a rechargeable toothbrush.",
  alternates: { canonical: "https://www.trymiroooo.com/guides" },
};

export default function Page() {
  return <GuidesListPage />;
}
