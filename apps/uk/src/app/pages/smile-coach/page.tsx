import type { Metadata } from "next";
import { SmileCoach } from "@/components/pages/SmileCoach";

export const metadata: Metadata = {
  title: "Smile Coach | 28-Day Habit Plan & 2-Minute Quad-Pacer Timer",
  description:
    "Free on-device oral care habit coach: guided 2-minute four-zone brush sessions, progress streaks, and replacement head care.",
  alternates: { canonical: "https://www.trymiroooo.com/pages/smile-coach" },
};

export default function Page() {
  return <SmileCoach />;
}
