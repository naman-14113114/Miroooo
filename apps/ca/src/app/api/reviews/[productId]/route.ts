import { mirooooX2Reviews, mirooooXReviews, type ProductId } from "@miroooo/shared";
import { NextResponse, type NextRequest } from "next/server";

const records = { "miroooo-x": mirooooXReviews, "miroooo-x2": mirooooX2Reviews } as const;
const sorts = ["most-recent", "oldest", "with-photos", "highest-rating", "lowest-rating"] as const;
type ReviewSort = (typeof sorts)[number];

export function GET(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  return params.then(({ productId }) => {
    if (!(productId in records)) return NextResponse.json({ error: "Unknown product" }, { status: 404 });
    const source = records[productId as ProductId];
    const rating = Number(request.nextUrl.searchParams.get("rating") || 0);
    const offset = Math.max(0, Number(request.nextUrl.searchParams.get("offset") || 0));
    const limit = Math.min(24, Math.max(1, Number(request.nextUrl.searchParams.get("limit") || 6)));
    const requestedSort = request.nextUrl.searchParams.get("sort");
    const sort: ReviewSort = sorts.includes(requestedSort as ReviewSort) ? requestedSort as ReviewSort : "most-recent";
    const photos = request.nextUrl.searchParams.get("photos") === "true";
    const verified = request.nextUrl.searchParams.get("verified") === "true";
    let filtered = rating >= 1 && rating <= 5 ? source.filter((review) => review.rating === rating) : [...source];
    if (photos) filtered = filtered.filter((review) => review.images.length > 0);
    if (verified) filtered = filtered.filter((review) => review.verified);
    if (sort === "oldest") filtered.reverse();
    if (sort === "with-photos") filtered.sort((a, b) => Number(b.images.length > 0) - Number(a.images.length > 0));
    if (sort === "highest-rating") filtered.sort((a, b) => b.rating - a.rating);
    if (sort === "lowest-rating") filtered.sort((a, b) => a.rating - b.rating);
    return NextResponse.json({ reviews: filtered.slice(offset, offset + limit), total: filtered.length });
  });
}
