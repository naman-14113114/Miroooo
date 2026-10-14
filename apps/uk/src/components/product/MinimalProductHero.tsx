'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatGBP } from '@/lib/cart';
import {
  Check,
  ShieldCheck,
  Mail,
  Clock,
  Sparkles,
  Lock,
  Plus,
  Minus,
  ChevronDown,
  Star,
} from 'lucide-react';

interface MinimalProductHeroProps {
  product: Product;
}

export function MinimalProductHero({ product }: MinimalProductHeroProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [isAdding, setIsAdding] = useState(false);

  const isGiftCard = product.handle === 'miroooo-gift-card';

  const unitPrice = product.price || (isGiftCard ? 10 : 5);
  const totalPrice = unitPrice * quantity;
  const formattedTotalPrice = formatGBP(totalPrice);

  const imageSrc =
    product.galleryImages?.[0]?.src ||
    (isGiftCard
      ? '/assets_ref/gifts/miroooo-x2-silver-digital-gift-card.webp'
      : '/assets_ref/gifts/miroooo-package-protection-transit-guarantee.webp');

  const imageAlt =
    product.galleryImages?.[0]?.alt ||
    (isGiftCard
      ? 'Miroooo official digital gift card £10 voucher'
      : 'Miroooo official transit guarantee package protection');

  const eyebrow = isGiftCard ? 'OFFICIAL DIGITAL VOUCHER' : 'OFFICIAL TRANSIT GUARANTEE';

  const highlights = isGiftCard
    ? [
        { title: 'Instant Email Delivery', desc: 'Unique digital voucher code dispatched directly to your inbox immediately.' },
        { title: 'Expires in 3 Months', desc: 'Valid for 3 months from purchase date across all Miroooo products.' },
        { title: 'Site-Wide Redemption', desc: 'Applicable across all toothbrushes, replacement brush heads, and accessories.' },
      ]
    : [
        { title: 'Complete Transit Coverage', desc: 'Guaranteed protection against damage, courier loss, and doorstep package theft.' },
        { title: 'Expedited Unit Replacement', desc: 'Brand-new replacement unit dispatched immediately with zero extra fees.' },
        { title: '24/7 Priority Support', desc: 'Direct fast-track resolution via our dedicated customer care team.' },
      ];

  const accordions = isGiftCard
    ? [
        {
          title: 'Voucher Specifications & Terms',
          content:
            'The Miroooo Digital Gift Card is issued electronically as a secure 16-digit voucher. It holds a cash value of £10 and expires in 3 months. It can be redeemed individually or combined with promotional offers across the official Miroooo online store.',
        },
        {
          title: 'How Redemption Works',
          content:
            'Upon checkout completion, you will receive an automated confirmation email containing your gift card voucher code. During any future checkout on Miroooo, simply enter your code in the discount/voucher field to apply your balance instantly.',
        },
        {
          title: 'Miroooo Quality Guarantee',
          content:
            'Every digital gift card is 100% authentic, tamper-proof, and backed by the Miroooo global guarantee. If you require assistance or a re-sent code, our dedicated customer team is available 24/7.',
        },
      ]
    : [
        {
          title: 'Protection Coverage Scope',
          content:
            'Covers accidental damage in transit, lost shipments, defective carrier delivery, and doorstep theft. Once activated, your entire package is shielded until safely in your hands.',
        },
        {
          title: 'Hassle-Free Replacement Process',
          content:
            'If your order is damaged or fails to arrive, simply contact support with your order number. A replacement unit will be prepared and dispatched via expedited tracked courier within 24 hours at zero additional cost.',
        },
        {
          title: 'Official Guarantee Promise',
          content:
            'Official transit guarantee underwritten directly by Miroooo. Enjoy total peace of mind for your high-performance sonic oral care investment.',
        },
      ];

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      productHandle: product.handle,
      color: 'Default',
      quantity,
    });
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 150);
  };

  return (
    <div className="minimal-product-hero bg-[#080909] text-white pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-white/50 mb-8 uppercase tracking-widest font-semibold" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/all-products" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-white/90">{product.name}</span>
        </nav>

        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Imagery */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-[#121315] border border-white/10 shadow-2xl flex items-center justify-center p-8 sm:p-12">
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/15 text-white/90">
                {isGiftCard ? <Mail size={12} className="text-emerald-400" /> : <ShieldCheck size={12} className="text-emerald-400" />}
                {isGiftCard ? 'Instant Digital Code' : 'Transit Guarantee'}
              </span>

              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105"
                loading="eager"
                fetchPriority="high"
                width={800}
                height={800}
              />
            </div>

            {/* Delivery / Guarantee Banner Below Image */}
            <div className="mt-4 rounded-xl p-4 bg-white/[0.03] border border-white/10 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                {isGiftCard ? <Sparkles size={18} /> : <ShieldCheck size={18} />}
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-snug">
                {isGiftCard
                  ? 'Instant voucher dispatched straight to your email inbox immediately after checkout.'
                  : 'Zero-cost replacement guarantee actively protects your order throughout transit.'}
              </p>
            </div>
          </div>

          {/* Right Column: Buybox & Info */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Eyebrow */}
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 mb-2">
              {eyebrow}
            </span>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" stroke="none" />
                ))}
              </div>
              <span className="text-xs font-semibold text-white/70">
                4.9 · 4,275+ verified reviews
              </span>
            </div>

            {/* Single Direct Price (NO compare-at, NO discount badge) */}
            <div className="flex items-baseline gap-3 py-3 border-y border-white/10 mb-5">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {product.formattedPrice || (isGiftCard ? '£10' : '£5')}
              </span>
              <span className="text-xs text-white/50 uppercase tracking-wider font-medium">
                Single Price · No Hidden Fees
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Feature Highlights */}
            <div className="space-y-3 mb-6 bg-[#121315] border border-white/10 rounded-2xl p-4 sm:p-5">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-white/60 leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="quantity-selector-container my-4" style={{ margin: '18px 0 16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>Quantity:</span>
              </div>
              <div
                className="inline-flex items-center"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '9999px',
                  padding: '4px 6px',
                  gap: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: 'none',
                    cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                    opacity: quantity <= 1 ? 0.4 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                <span
                  style={{
                    minWidth: '32px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#ffffff',
                    userSelect: 'none',
                    fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  aria-label="Increase quantity"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Plus size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Delivery Countdown Timer Box */}
            <div
              className="delivery-timer-box rounded-xl p-3.5 my-4 flex items-center gap-3 text-sm"
              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.85)', margin: '16px 0', position: 'relative' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', width: '32px', height: '32px', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Clock size={16} />
              </div>
              <div className="flex-1 text-xs sm:text-sm leading-snug" style={{ fontSize: '13px', lineHeight: 1.4 }}>
                {isGiftCard ? (
                  <>Instant dispatch: voucher code delivered to your inbox within <strong className="font-mono font-bold" style={{ color: '#ffffff', fontWeight: 700 }}>60 seconds</strong></>
                ) : (
                  <>Transit guarantee active: official parcel coverage applied at <strong className="font-bold" style={{ color: '#ffffff', fontWeight: 700 }}>checkout</strong></>
                )}
              </div>
            </div>

            {/* Add To Cart Main Button */}
            <div className="main-cta-wrapper my-4" style={{ margin: '18px 0 14px 0' }}>
              <button
                type="button"
                id="hero-cta"
                className="button button--primary"
                style={{ width: '100%', fontSize: '1.05rem' }}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <span className="btn-fill" data-fill></span>
                <span className="btn-text" id="main-cta-text">
                  {isAdding ? 'Adding…' : `Add to Cart · ${formattedTotalPrice}`}
                </span>
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div
              className="grid grid-cols-3 gap-2 py-3 px-1 mb-6 text-center"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '12px 0 16px',
                marginBottom: '24px',
              }}
            >
              <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <Lock style={{ width: '22px', height: '22px', color: '#ffffff' }} strokeWidth={1.8} />
                <span className="text-[11px] font-bold uppercase tracking-tight leading-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                  256-Bit SSL<br />Encrypted
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <Clock style={{ width: '22px', height: '22px', color: '#ffffff' }} strokeWidth={1.8} />
                <span className="text-[11px] font-bold uppercase tracking-tight leading-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                  {isGiftCard ? <>Instant<br />Email Delivery</> : <>Instant<br />Fulfillment</>}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck style={{ width: '22px', height: '22px', color: '#ffffff' }} strokeWidth={1.8} />
                <span className="text-[11px] font-bold uppercase tracking-tight leading-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                  Official Miroooo<br />Guarantee
                </span>
              </div>
            </div>

            {/* Accordion Info */}
            <div className="divide-y divide-white/10 border-t border-white/10">
              {accordions.map((acc, idx) => {
                const isOpen = openAccordion === idx;
                return (
                  <div key={idx} className="py-3.5">
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-white hover:text-white/80 transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{acc.title}</span>
                      <ChevronDown
                        size={16}
                        className={`text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed pr-4">
                        {acc.content}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
