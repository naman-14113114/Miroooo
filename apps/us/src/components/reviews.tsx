"use client";

import type { ProductId, Review, ReviewSummary } from "@miroooo/shared";
import { Check, ThumbsUp, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type ReviewSort = "most-recent" | "oldest" | "with-photos" | "highest-rating" | "lowest-rating";

export function Reviews({ productId, title, intro, summary, initialReviews }: { productId: ProductId; title: string; intro?: string; summary: ReviewSummary; initialReviews: Review[] }) {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(initialReviews);
  const [total, setTotal] = useState(summary.total);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<ReviewSort>("most-recent");
  const [photos, setPhotos] = useState(false);
  const [verified, setVerified] = useState(false);
  const [writing, setWriting] = useState(false);
  const [thanks, setThanks] = useState(false);
  const modalClose = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!writing) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setWriting(false);
    document.addEventListener("keydown", close);
    requestAnimationFrame(() => modalClose.current?.focus());
    return () => {
      document.removeEventListener("keydown", close);
      previousFocus?.focus();
    };
  }, [writing]);

  const request = async (nextRating: number, nextSort: ReviewSort, nextPhotos: boolean, nextVerified: boolean, offset: number) => {
    setLoading(true);
    const query = new URLSearchParams({ rating: String(nextRating), sort: nextSort, photos: String(nextPhotos), verified: String(nextVerified), offset: String(offset), limit: "12" });
    const response = await fetch(`/api/reviews/${productId}?${query}`);
    const data = await response.json() as { reviews: Review[]; total: number };
    setReviews((current) => offset === 0 ? data.reviews : [...current, ...data.reviews]);
    setTotal(data.total);
    setLoading(false);
  };

  const stars = useMemo(() => [5, 4, 3, 2, 1] as const, []);
  const clearFilters = () => {
    setRating(0);
    setSort("most-recent");
    setPhotos(false);
    setVerified(false);
    void request(0, "most-recent", false, false, 0);
  };
  return <section className="reviews-section" id="reviews" aria-labelledby="reviews-title"><div className="reviews-shell"><div className="reviews-heading"><span className="reviews-eyebrow"><i /> Verified owners</span><h2 id="reviews-title">{title}</h2>{intro && <p>{intro}</p>}</div><div className="reviews-overview"><div className="reviews-score"><strong>{summary.average}</strong><span aria-hidden="true">★★★★★</span><p>Based on {summary.total.toLocaleString("en-US")} reviews</p></div><div className="reviews-bars">{stars.map((star) => <button type="button" aria-pressed={rating === star} onClick={() => { const next = rating === star ? 0 : star; setRating(next); void request(next, sort, photos, verified, 0); }} key={star}><span>{star} ★</span><i><b style={{ width: `${(summary.distribution[star] / summary.total) * 100}%` }} /></i><small>{summary.distribution[star]}</small></button>)}</div><button className="reviews-write" type="button" onClick={() => { setThanks(false); setWriting(true); }}>Write a Review</button></div><div className="reviews-toolbar"><div className="reviews-toolbar__controls"><label>Filter reviews<select value={rating} onChange={(event) => { const value = Number(event.target.value); setRating(value); void request(value, sort, photos, verified, 0); }}><option value="0">All ratings</option>{stars.map((star) => <option value={star} key={star}>{star} stars</option>)}</select></label><label>Sort reviews<select value={sort} onChange={(event) => { const value = event.target.value as ReviewSort; setSort(value); void request(rating, value, photos, verified, 0); }}><option value="most-recent">Most recent</option><option value="oldest">Oldest</option><option value="with-photos">With photos first</option><option value="highest-rating">Highest rating</option><option value="lowest-rating">Lowest rating</option></select></label><button type="button" aria-pressed={photos} onClick={() => { const next = !photos; setPhotos(next); void request(rating, sort, next, verified, 0); }}>With photos</button><button type="button" aria-pressed={verified} onClick={() => { const next = !verified; setVerified(next); void request(rating, sort, photos, next, 0); }}>Verified only</button>{(rating !== 0 || sort !== "most-recent" || photos || verified) && <button type="button" onClick={clearFilters}>Clear filters</button>}</div><span>{total.toLocaleString("en-US")} reviews</span></div>{reviews.length > 0 ? <div className="reviews-grid">{reviews.map((review) => <article className="review-card" key={review.id}><div className="review-card__top"><span aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span><time dateTime={review.date}>{review.date}</time></div><h3>{review.title}</h3><p>{review.body}</p><div className="review-card__author"><strong>{review.author}</strong>{review.verified && <span><Check size={13} /> Verified buyer</span>}</div><button type="button"><ThumbsUp size={14} /> Helpful ({review.helpful})</button></article>)}</div> : <div className="reviews-empty"><p>No reviews match these filters.</p><button type="button" onClick={clearFilters}>View all reviews</button></div>}{reviews.length < total && <button className="reviews-more" type="button" disabled={loading} onClick={() => void request(rating, sort, photos, verified, reviews.length)}>{loading ? "Loading…" : "Load more reviews"}</button>}</div>{writing && <div className="review-modal" role="dialog" aria-modal="true" aria-label="Write a review"><button className="review-modal__backdrop" type="button" onClick={() => setWriting(false)} aria-label="Close review form" /><div className="review-modal__panel"><button ref={modalClose} className="review-modal__close" type="button" onClick={() => setWriting(false)} aria-label="Close"><X /></button>{thanks ? <div className="review-thanks"><Check /><h3>Thank You For Your Review!</h3><p>Your simulated review has been received for this local storefront.</p></div> : <form onSubmit={(event) => { event.preventDefault(); setThanks(true); }}><p className="eyebrow">Miroooo owners</p><h3>Write a Review</h3><label>Rating<select required defaultValue="5"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label><label>Review title<input required /></label><label>Your review<textarea rows={5} required /></label><label>Your name<input required /></label><button className="button" type="submit">Submit review</button></form>}</div></div>}</section>;
}
