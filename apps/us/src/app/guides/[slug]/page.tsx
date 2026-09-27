import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideDetailPage } from "@/components/guides/GuideDetailPage";
import { getGuide, getAllGuides } from "@/data/guides";

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const guide = getGuide(params.slug);
  if (!guide) {
    return {};
  }
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: guide.canonical },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const guide = getGuide(params.slug);
  if (!guide) {
    notFound();
  }
  return <GuideDetailPage slug={params.slug} />;
}
