"use client";

import { buildBuudyCheckoutUrl, type ProductColour, type ProductMedia, type ProductPageContent } from "@miroooo/shared";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Clock3, Expand, ShieldCheck, Truck, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "./store-provider";

export function ProductPurchase({ product }: { product: ProductPageContent }) {
  const { attribution, openCart } = useStore();
  const [mediaIndex, setMediaIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [quantity, setQuantity] = useState<1 | 2 | 3>(product.defaultQuantity);
  const [colours, setColours] = useState<ProductColour[]>(["Grey", "Pink", "Silver"]);
  const media = product.media[mediaIndex];
  const primaryColour = colours[0] ?? "Grey";
  const variant = product.variants.find((item) => item.colour === primaryColour) ?? product.variants[0];
  const checkoutUrl = useMemo(() => buildBuudyCheckoutUrl({ product, primaryVariantId: variant.id, quantity, attribution }), [attribution, product, quantity, variant.id]);
  const isX = product.id === "miroooo-x";

  useEffect(() => {
    if (!lightbox) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowLeft") setMediaIndex((index) => (index - 1 + product.media.length) % product.media.length);
      if (event.key === "ArrowRight") setMediaIndex((index) => (index + 1) % product.media.length);
    };
    document.addEventListener("keydown", key);
    document.body.classList.add("drawer-open");
    return () => { document.removeEventListener("keydown", key); document.body.classList.remove("drawer-open"); };
  }, [lightbox, product.media.length]);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const add = () => openCart({ product, quantity, colour: primaryColour, checkoutUrl });
  const selectColour = (index: number, colour: ProductColour) => setColours((current) => current.map((value, itemIndex) => itemIndex === index ? colour : value));

  return <>
    <section className="product-hero" aria-labelledby="product-title">
      <div className="product-gallery">
        <div className="product-gallery__mosaic">{product.media.map((item, index) => <button type="button" onClick={() => { setMediaIndex(index); setLightbox(true); }} aria-label={`Open media ${index + 1}`} key={item.id}><Media media={item} priority={index === 0} /><span className="product-gallery__expand"><Expand aria-hidden="true" size={18} /></span></button>)}</div>
        <button className="product-gallery__stage" type="button" onClick={() => setLightbox(true)} aria-label="Open product media lightbox"><Media media={media} priority /><span className="product-gallery__expand"><Expand aria-hidden="true" size={18} /></span></button>
        <div className="product-gallery__thumbs" aria-label="Product media">{product.media.map((item, index) => <button type="button" className={index === mediaIndex ? "is-active" : undefined} onClick={() => setMediaIndex(index)} key={item.id} aria-label={`View media ${index + 1}`}><Media media={item} priority={index === 0} /></button>)}</div>
      </div>
      <div className="product-buybox">
        <a className="product-rating" href="#reviews"><span aria-hidden="true">★★★★★</span><strong>{product.rating} · TRUSTED BY {product.customerCount} CUSTOMERS</strong></a>
        <h1 id="product-title">{product.name}</h1>
        <div className="product-price"><strong>{product.price}</strong><s>{product.compareAt}</s><span>50% OFF</span></div>
        <ul className="product-highlights">{product.highlights.map((highlight) => <li key={highlight}><Check aria-hidden="true" size={17} /> <span>{highlight}</span></li>)}</ul>
        {isX && <div className="colour-picker"><div><span>Colour:</span><strong>{primaryColour}</strong></div><div className="colour-picker__swatches">{product.variants.map((item) => <button type="button" className={item.colour === primaryColour ? "is-active" : undefined} style={{ backgroundColor: item.swatch }} onClick={() => selectColour(0, item.colour)} title={item.label} aria-label={item.label} key={item.id} />)}</div><p><span /> In Stock, ready to ship</p></div>}
        {!isX && <PurchaseCta quantity={quantity} add={add} />}
        {!isX && <TrustStrip />}
        {!isX && <DeliveryNote />}
        <div className="bundle-divider"><span />BUNDLE & SAVE + FREE SHIPPING & GIFTS<span /></div>
        <div className="bundle-list">{product.bundles.map((bundle) => <article className={`bundle-tier${bundle.quantity === quantity ? " is-selected" : ""}`} key={bundle.quantity}>{bundle.badge && <span className="bundle-tier__badge">{bundle.badge}</span>}<button type="button" onClick={() => setQuantity(bundle.quantity)} aria-pressed={bundle.quantity === quantity}><span className="bundle-tier__radio"><i /></span><span className="bundle-tier__copy"><strong>{bundle.name}</strong><small>{bundle.description}</small></span><span className="bundle-tier__price"><strong>{bundle.price}</strong><s>{bundle.compareAt}</s><small>{bundle.saving}</small></span></button>{bundle.quantity === quantity && <div className="bundle-colours">{Array.from({ length: bundle.quantity }, (_, index) => <div key={index}><span>{bundle.quantity === 1 ? "Brush Colour:" : `#${index + 1} Brush Colour:`}</span><div>{product.variants.map((item) => <button type="button" key={item.id} className={colours[index] === item.colour ? "is-active" : undefined} style={{ backgroundColor: item.swatch }} onClick={() => selectColour(index, item.colour)} aria-label={`${index + 1} ${item.label}`} title={item.label} />)}</div></div>)}</div>}</article>)}</div>
        {isX && <DeliveryNote />}
        {isX && <PurchaseCta quantity={quantity} add={add} />}
        {isX && <TrustStrip />}
        <div className="gift-strip"><div><p>Miroooo Free Gifts</p><strong>{(product.price.startsWith("£") ? "£" : "$") + product.gifts.filter((gift) => gift.minimumQuantity <= quantity).reduce((total, gift) => total + (Number(gift.value?.replace(/[^0-9.]/g, "")) || 0), 0).toFixed(2)} VALUE OF FREE GIFTS FOR TODAY ONLY</strong></div><div>{product.gifts.filter((gift) => gift.minimumQuantity <= quantity).map((gift) => <span key={gift.id}>{gift.image && <Image src={gift.image} alt="" width={72} height={72} />}<small>{gift.name}</small></span>)}</div></div>
      </div>
    </section>
    <div className={`sticky-buy${stickyVisible ? " is-visible" : ""}`}><div><strong>{product.name}</strong><span>{product.bundles.find((bundle) => bundle.quantity === quantity)?.price} · Buy {quantity}</span></div><button type="button" onClick={add}>Add to cart</button></div>
    {lightbox && <div className="media-lightbox" role="dialog" aria-modal="true" aria-label="Product media"><button className="media-lightbox__close" type="button" onClick={() => setLightbox(false)} aria-label="Close lightbox"><X /></button><button type="button" className="media-lightbox__previous" onClick={() => setMediaIndex((index) => (index - 1 + product.media.length) % product.media.length)} aria-label="Previous media"><ChevronLeft /></button><div className="media-lightbox__stage"><Media media={media} /></div><button type="button" className="media-lightbox__next" onClick={() => setMediaIndex((index) => (index + 1) % product.media.length)} aria-label="Next media"><ChevronRight /></button></div>}
  </>;
}

function PurchaseCta({ quantity, add }: { quantity: number; add: () => void }) {
  return <button className="product-primary-cta" type="button" onClick={add}>Add To Cart + {quantity === 1 ? "1 Free Gift" : `${quantity} Free Gifts`}</button>;
}

function TrustStrip() {
  return <div className="product-trust"><div><ShieldCheck /><span>2-Year<br />Warranty</span></div><div><Clock3 /><span>90-Day<br />Trial</span></div><div><Truck /><span>Free Tracked<br />Shipping</span></div></div>;
}

function DeliveryNote() {
  return <div className="product-delivery"><Clock3 aria-hidden="true" size={18} /><span>Orders are processed in 1–3 business days. Tracked CA transit is usually 4–10 business days.</span></div>;
}

function Media({ media, priority = false }: { media: ProductMedia; priority?: boolean }) {
  if (media.type === "video") return <video src={media.src} poster={media.poster} autoPlay muted loop playsInline controls preload="metadata" />;
  return <Image src={media.src} alt={media.alt} width={media.width} height={media.height} loading={priority ? "eager" : "lazy"} />;
}
