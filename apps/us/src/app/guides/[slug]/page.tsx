import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplateHtml } from "@/lib/template";

const GUIDE_SLUGS = [
  "sonic-vs-oscillating-electric-toothbrush",
  "how-often-replace-electric-toothbrush-head",
  "electric-toothbrush-travel-guide",
  "how-to-use-two-minute-toothbrush-timer",
];

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!GUIDE_SLUGS.includes(slug)) {
    return {};
  }
  const titleMap: Record<string, string> = {
    "sonic-vs-oscillating-electric-toothbrush": "Sonic vs Oscillating Electric Toothbrush Guide | Miroooo UK",
    "how-often-replace-electric-toothbrush-head": "How Often Should You Replace Your Toothbrush Head? | Miroooo UK",
    "electric-toothbrush-travel-guide": "Electric Toothbrush Travel Guide | Miroooo UK",
    "how-to-use-two-minute-toothbrush-timer": "How to Use a 2-Minute Toothbrush Timer | Miroooo UK",
  };
  return {
    title: titleMap[slug] || "Oral Care Guide | Miroooo UK",
    alternates: { canonical: `https://www.trymiroooo.com/guides/${slug}` },
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!GUIDE_SLUGS.includes(slug)) {
    notFound();
  }
  try {
    const content = getTemplateHtml(`guides/${slug}.html`);
    return (
      <div
        id="miroooo-page-root"
        dangerouslySetInnerHTML={{ __html: content }}
        suppressHydrationWarning
      />
    );
  } catch {
    notFound();
  }
}
