'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatedIcon } from '@/components/ui/AnimatedIcon';
import { x1Gallery } from '@/data/x1Gallery';
import { x2Gallery } from '@/data/x2Gallery';
import { ProductAccordions } from './ProductAccordions';
import { Product } from '@/data/products';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface ProductHeroProps {
  product: Product;
  initialColor?: string;
  onColorChange?: (color: string) => void;
  isSimpleBuybox?: boolean;
}

interface GallerySlide {
  type: 'image' | 'video';
  src?: string;
  alt: string;
  thumbImg: string;
  videoSrc?: string;
  poster?: string;
  badge?: {
    pos: string;
    title: string;
    sub: string;
  };
  isModesBadge?: boolean;
}

export function ProductHero({
  product,
  initialColor = 'Silver',
  onColorChange,
  isSimpleBuybox = false,
}: ProductHeroProps) {
  const router = useRouter();
  const { addItem, addBundle } = useCart();
  const isX2 = product.handle === 'miroooo-x2';

  // Active color & tier state
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [selectedTier, setSelectedTier] = useState<'single' | 'bundle-2' | 'bundle-3'>('single');
  const [quantity, setQuantity] = useState(1);

  // Color choices per tier
  const [singleColor, setSingleColor] = useState<string>(initialColor);
  const [bundle2Colors, setBundle2Colors] = useState<[string, string]>([initialColor, isX2 ? initialColor : 'Grey']);
  const [bundle3Colors, setBundle3Colors] = useState<[string, string, string]>([initialColor, 'Grey', isX2 ? 'Pink' : 'Silver']);

  // Addon checkbox for Buy 1 tier
  const [buy1HeadsChecked, setBuy1HeadsChecked] = useState(false);

  // Gallery active index & Lightbox state
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLightboxZoomed, setIsLightboxZoomed] = useState(false);
  const [isShippingTooltipOpen, setIsShippingTooltipOpen] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  // Urgency banner countdown timer
  const [urgencyTime, setUrgencyTime] = useState('09:15:54');
  // Delivery timer countdown
  const [deliveryCountdown, setDeliveryCountdown] = useState('14:38');
  const [deliveryDateStr, setDeliveryDateStr] = useState('Friday 21 Aug');

  const heroCtaRef = useRef<HTMLButtonElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  // Calculate midnight countdown & delivery date
  useEffect(() => {
    let deliverySeconds = 14 * 60 + 38;
    const updateTimers = () => {
      const now = new Date();

      // Countdown to midnight UK time (Europe/London)
      const londonParts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }).formatToParts(now);
      const londonValue = (type: string) => Number(londonParts.find((part) => part.type === type)?.value || 0);
      const remaining = 86400 - ((londonValue('hour') % 24) * 3600 + londonValue('minute') * 60 + londonValue('second'));
      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;
      setUrgencyTime(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );

      // The reference displays a repeating 14:38 delivery countdown and a date five days ahead.
      setDeliveryCountdown(`${String(Math.floor(deliverySeconds / 60)).padStart(2, '0')}:${String(deliverySeconds % 60).padStart(2, '0')}`);
      deliverySeconds = deliverySeconds > 0 ? deliverySeconds - 1 : 14 * 60 + 38;
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + 5);
      setDeliveryDateStr(targetDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }).replace(',', ''));
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync standalone color with gallery & tier choices
  const handleSelectStandaloneColor = (color: string) => {
    setSelectedColor(color);
    onColorChange?.(color);
    setSingleColor(color);
    setBundle2Colors([color, bundle2Colors[1]]);
    setBundle3Colors([color, bundle3Colors[1], bundle3Colors[2]]);
    setActiveMediaIndex(0);
  };

  // Sticky Bar Scroll Observer
  useEffect(() => {
    const handleScroll = () => {
      if (!heroCtaRef.current) return;
      const rect = heroCtaRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setIsStickyVisible(true);
      } else {
        setIsStickyVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>('#MirooooGallerySlides video');
    videos.forEach((video) => {
      if (video.closest('.is-active')) video.play().catch(() => {});
      else video.pause();
    });
  }, [activeMediaIndex]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('gallery-open');
    return () => { document.body.style.overflow = overflow; document.body.classList.remove('gallery-open'); };
  }, [isLightboxOpen]);

  // Scroll thumbnails into view with active thumbnail centered
  useEffect(() => {
    if (navRef.current) {
      const container = navRef.current;
      const activeThumb = container.children[activeMediaIndex] as HTMLElement;
      if (activeThumb) {
        const containerRect = container.getBoundingClientRect();
        const thumbRect = activeThumb.getBoundingClientRect();

        const currentScrollTop = container.scrollTop;
        const thumbRelativeTop = thumbRect.top - containerRect.top + currentScrollTop;
        const targetScrollTop = thumbRelativeTop - (container.clientHeight - thumbRect.height) / 2;

        const currentScrollLeft = container.scrollLeft;
        const thumbRelativeLeft = thumbRect.left - containerRect.left + currentScrollLeft;
        const targetScrollLeft = thumbRelativeLeft - (container.clientWidth - thumbRect.width) / 2;

        container.scrollTo({
          top: Math.max(0, targetScrollTop),
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth',
        });
      }
    }
  }, [activeMediaIndex]);

  // Thumbnail scrolling arrow handler
  const scrollThumbnails = (dir: 'up' | 'down') => {
    if (navRef.current) {
      const offset = dir === 'up' ? -120 : 120;
      navRef.current.scrollBy({ top: offset, left: offset, behavior: 'smooth' });
    }
  };

  // Pricing calculations
  const singlePrice = 69;
  const singleCompare = 139;
  const bundle2Price = 128;
  const bundle2Compare = 278;
  const bundle3Price = 177;
  const bundle3Compare = 417;

  const currentPrice =
    selectedTier === 'single'
      ? singlePrice + (buy1HeadsChecked ? 10 : 0)
      : selectedTier === 'bundle-2'
      ? bundle2Price
      : bundle3Price;

  const addToCartLabel = isSimpleBuybox
    ? `Add to Cart — £${(singlePrice * quantity).toFixed(2)}`
    : `Add to Cart ${selectedTier === 'single' ? (buy1HeadsChecked ? '+ 2 Brush Heads' : '') : selectedTier === 'bundle-2' ? '+ Free 2 Brush Heads' : '+ Free 4 Brush Heads'}`.trim();

  // Add to Cart handler
  const handleAddToCart = () => {
    if (isSimpleBuybox) {
      addItem({
        productHandle: product.handle,
        color: selectedColor,
        quantity,
      });
      router.push('/cart');
      return;
    }

    if (selectedTier === 'single') {
      addItem({
        productHandle: product.handle,
        color: singleColor,
        quantity: 1,
      });
      if (buy1HeadsChecked) {
        addItem({
          productHandle: isX2 ? 'miroooo-x2-heads' : 'miroooo-x1-heads',
          color: 'Default',
          quantity: 1,
        });
      }
    } else if (selectedTier === 'bundle-2') {
      addBundle(product.handle, 2, bundle2Colors);
    } else {
      addBundle(product.handle, 3, bundle3Colors);
    }
    router.push('/cart');
  };

  // Gallery items for X2 (dynamically reactive to selected color)
  const getX2Slides = (): GallerySlide[] => {
    const colorLower = selectedColor.toLowerCase();
    const uprightGrip =
      colorLower === 'pink'
        ? '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-upright-grip.webp'
        : colorLower === 'grey'
        ? '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-upright-grip.webp'
        : '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp';

    const inHandGrip =
      colorLower === 'pink'
        ? '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-in-hand.webp'
        : colorLower === 'grey'
        ? '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-in-hand.webp'
        : '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-in-hand.webp';

    const slides: GallerySlide[] = [
      {
        type: 'image',
        src: uprightGrip,
        alt: `Miroooo X2 Sonic Electric Toothbrush ${selectedColor} Upright Grip in Hand`,
        thumbImg: uprightGrip,
      },
      {
        type: 'video',
        videoSrc: '/assets_ref/x2/vbj9qc-h264-hd.mp4',
        poster: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-video-thumbnail.webp',
        alt: 'Miroooo X2 Video Showcase',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-video-thumbnail.webp',
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp',
        alt: 'Miroooo X2 Complete Set Presentation Packaging with Box, Travel Case and Accessories',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-complete-set-packaging.webp',
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted-dock-storage.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush Wall-Mounted Storage Dock Cradle',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted-dock-storage.webp',
        badge: {
          pos: 'miroooo-infographic-badge--top-left',
          title: 'Free Wall-Mounted<br>Storage',
          sub: 'Hygienic Magnetic<br>Floating Storage',
        },
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush Luxury Travel Case Lifestyle Presentation',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp',
        badge: {
          pos: 'miroooo-infographic-badge--top-right miroooo-infographic-badge--white',
          title: 'Ultra<br>Lightweight (51g)',
          sub: 'Travel-Friendly Slim Case',
        },
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-ipx7-waterproof-submersion.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush IPX7 Full Immersion Waterproof Design',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-ipx7-waterproof-submersion.webp',
        badge: {
          pos: 'miroooo-infographic-badge--bottom-right',
          title: 'IPX7 100% Waterproof',
          sub: 'Shower-Safe & Fully Submersible',
        },
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-45-degree-bass-sweep-action.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush 45-Degree Bass Sweep Method Sonic Vibration',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-45-degree-bass-sweep-action.webp',
        badge: {
          pos: 'miroooo-infographic-badge--bottom-left',
          title: '45° Bass Sweep<br>Motion',
          sub: 'Dentist-Approved<br>Gumline Cleaning',
        },
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-usbc-fast-charging-port.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush Concealed USB-C Fast Charging Port',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-usbc-fast-charging-port.webp',
        badge: {
          pos: 'miroooo-infographic-badge--top-right',
          title: '90-Day Battery<br>Life',
          sub: 'Universal USB-C<br>Fast Recharge',
        },
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-aerospace-aluminum-body.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush Aerospace Grade Aluminum Alloy Finish',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-aerospace-aluminum-body.webp',
        badge: {
          pos: 'miroooo-infographic-badge--top-left miroooo-infographic-badge--white',
          title: 'Aerospace<br>Aluminium Body',
          sub: 'Precision CNC<br>Anodized Unibody',
        },
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-handbag-travel-case.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush Portable Luxury Travel Case in Handbag',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-handbag-travel-case.webp',
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-ventilated-travel-case.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush Ventilated Protective Travel Case',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-ventilated-travel-case.webp',
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-smart-microchip-architecture.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush Intelligent Microprocessor and Internal Circuitry',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-smart-microchip-architecture.webp',
        badge: {
          pos: 'miroooo-infographic-badge--top-left',
          title: 'Smart Pressure Sensor',
          sub: 'Intelligent Microchip Protects Gums',
        },
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-precision-bristle-head-halo-ring.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush Precision DuPont Bristle Head and LED Halo Ring',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-precision-bristle-head-halo-ring.webp',
        isModesBadge: true,
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-dupont-bristle-head-macro.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush DuPont Multi-Action Replacement Bristle Head',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-dupont-bristle-head-macro.webp',
        badge: {
          pos: 'miroooo-infographic-badge--top-left',
          title: 'DuPont™<br>Premium Bristles',
          sub: 'End-Rounded For<br>Gentle Enamel Care',
        },
      },
      {
        type: 'image',
        src: inHandGrip,
        alt: `Miroooo X2 Sonic Electric Toothbrush ${selectedColor} Dynamic Grip in Hand`,
        thumbImg: inHandGrip,
        badge: {
          pos: 'miroooo-infographic-badge--top-right',
          title: 'Whisper-Quiet<br>Operation',
          sub: 'Sub-45dB Acoustic<br>Sonic Motor',
        },
      },
      {
        type: 'image',
        src: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-smile-coach-app.webp',
        alt: 'Miroooo X2 Sonic Electric Toothbrush and Smile Coach Companion App on Smartphone',
        thumbImg: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-smile-coach-app.webp',
      },
    ];
    const variant = x2Gallery[selectedColor as keyof typeof x2Gallery] || x2Gallery.Silver;
    let imageIndex = 0;
    return slides.map((slide) => {
      if (slide.type === 'video') return slide;
      const index = imageIndex++;
      return { ...slide, src: variant.images[index], thumbImg: variant.thumbnails[index], alt: variant.alts[index] };
    });
  };

  const getX1Slides = (): GallerySlide[] => {
    const variant = x1Gallery[selectedColor as keyof typeof x1Gallery] || x1Gallery.Pink;
    return variant.images.map((src, index): GallerySlide => {
      const isVideo = src.endsWith('.mp4');
      const thumb = variant.thumbnails[index];

      let badge: GallerySlide['badge'] | undefined;
      let isModesBadge = false;

      if (src.includes('Pink-2.webp') || src.includes('Grey-2.webp') || src.includes('Silver-1.webp')) {
        badge = {
          pos: 'miroooo-infographic-badge--top-right',
          title: 'Whisper-Quiet<br>Operation',
          sub: 'Sub-50dB Acoustic<br>Sonic Motor',
        };
      } else if (src.includes('luxury-travel-case-lifestyle.webp')) {
        badge = {
          pos: 'miroooo-infographic-badge--top-right miroooo-infographic-badge--white',
          title: 'Ultra<br>Lightweight (51g)',
          sub: 'Travel-Friendly Slim Case',
        };
      } else if (src.includes('Pink-4.webp') || src.includes('Grey-8.webp') || src.includes('Silver-2.webp')) {
        isModesBadge = true;
      } else if (src.includes('Grey-4.webp')) {
        badge = {
          pos: 'miroooo-infographic-badge--top-left',
          title: 'Aerospace<br>Aluminium Body',
          sub: 'Precision CNC<br>Anodized Unibody',
        };
      } else if (src.includes('Pink-5.webp')) {
        badge = {
          pos: 'miroooo-infographic-badge--bottom-right',
          title: 'IPX7 100% Waterproof',
          sub: 'Shower-Safe & Fully Submersible',
        };
      } else if (src.includes('Grey-5.webp') || src.includes('Silver-3.webp')) {
        badge = {
          pos: 'miroooo-infographic-badge--bottom-right miroooo-infographic-badge--white',
          title: 'IPX7 100% Waterproof',
          sub: 'Shower-Safe & Fully Submersible',
        };
      } else if (src.includes('Pink-6.webp') || src.includes('Grey-6.webp')) {
        badge = {
          pos: 'miroooo-infographic-badge--top-left miroooo-infographic-badge--white',
          title: '60+ Day Battery<br>Life',
          sub: 'Magnetic USB-C Dock Recharge',
        };
      } else if (src.includes('Pink-8.webp') || src.includes('Silver-11.webp')) {
        badge = {
          pos: 'miroooo-infographic-badge--top-left',
          title: 'DuPont™<br>Precision Bristles',
          sub: 'End-Rounded For<br>Gentle Enamel Care',
        };
      }

      return {
        type: isVideo ? 'video' : 'image',
        ...(isVideo ? { videoSrc: src, poster: thumb } : { src }),
        thumbImg: thumb,
        alt: `Miroooo X1 ${selectedColor} product view ${index + 1}`,
        badge,
        isModesBadge,
      };
    });
  };

  const gallerySlides = isX2 ? getX2Slides() : getX1Slides();
  const totalSlides = gallerySlides.length;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsShippingTooltipOpen(false);
        setIsLightboxOpen(false);
        setIsLightboxZoomed(false);
      }
      if (!isLightboxOpen || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      setIsLightboxZoomed(false);
      setActiveMediaIndex((index) => (index + (event.key === 'ArrowRight' ? 1 : totalSlides - 1)) % totalSlides);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, totalSlides]);


  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (!touch) return;
    const diffX = touch.clientX - touchStartXRef.current;
    const diffY = touch.clientY - touchStartYRef.current;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        // Swipe left -> next
        setActiveMediaIndex((prev) => (prev + 1) % totalSlides);
      } else {
        // Swipe right -> prev
        setActiveMediaIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }
  };

  // Helper to get checkout thumbnail image for sticky bar
  const getColorThumbnail = (color: string) => {
    const col = color.toLowerCase();
    if (isX2) {
      if (col === 'pink') return '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-pink-checkout.webp';
      if (col === 'grey') return '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-grey-checkout.webp';
      return '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-checkout.webp';
    } else {
      if (col === 'pink') return '/assets_ref/x/gallery/Miroooo_x_Pink-hero.webp';
      if (col === 'grey') return '/assets_ref/x/gallery/Miroooo_x_Grey-hero.webp';
      return '/assets_ref/x/gallery/Hand-Holding-Branded-Silver-Toothbrush.webp';
    }
  };

  return (
    <div id="shopify-section-template--24203751129433__main-product" className="shopify-section">
      <div className="section section--padding section--rounded relative">
        <div className="page-width relative">
          {isX2 && <div id="miroooo-x2-urgency-banner" className="x2-urgency-banner" role="region" aria-label="Limited Time Upgrade Offer">
            <div className="x2-urgency-banner__left">
              <span className="x2-urgency-banner__icon" aria-hidden="true">🔥</span>
              <div className="x2-urgency-banner__text-wrap">
                <span className="x2-urgency-banner__eyebrow">LIMITED-TIME EXTRA SAVINGS</span>
                <strong className="x2-urgency-banner__headline">
                  Get X2 at price of X1 for today only
                </strong>
              </div>
            </div>

            <div className="x2-urgency-banner__right">
              <div className="x2-urgency-banner__applied" id="x2BannerApplied" role="status" aria-label="Discount applied">
                <svg className="x2-applied-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M16.667 5 7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="x2-applied-text">APPLIED</span>
              </div>

              <div className="x2-urgency-banner__timer-block">
                <span className="x2-timer-label">OFFER ENDS IN</span>
                <span className="x2-timer-digits" id="x2CountdownTimer" aria-live="off" aria-label="Offer ends at UK midnight">
                  {urgencyTime}
                </span>
              </div>
            </div>
          </div>}

          <div className="featured-product product product--columns flex flex-col items-start lg:grid gap-5 w-full relative">
            {/* Left: Product Gallery */}
            <div className="product__gallery product__gallery--full_width block w-full relative" aria-label="Product Gallery">
              <div className="miroooo-minmun-gallery" id="MirooooMainGallery">
                {/* Thumbnails Navigation Strip */}
                <div className="miroooo-gallery__nav-wrap" aria-label="Product image thumbnails">
                  <button
                    type="button"
                    className="miroooo-gallery__nav-arrow miroooo-gallery__nav-arrow--prev"
                    id="MirooooGalleryNavPrev"
                    aria-label="Scroll thumbnails up"
                    onClick={() => scrollThumbnails('up')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>

                  <div className="miroooo-gallery__nav" id="MirooooGalleryNav" ref={navRef}>
                    {gallerySlides.map((slide, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`miroooo-gallery__thumb ${activeMediaIndex === idx ? 'is-active' : ''}`}
                        data-index={idx}
                        aria-label={slide.alt}
                        aria-current={activeMediaIndex === idx ? 'true' : 'false'}
                        onClick={() => setActiveMediaIndex(idx)}
                      >
                        <div className={`thumb-inner ${slide.type === 'video' ? 'thumb-video-inner' : ''}`}>
                          <img src={slide.thumbImg} alt={slide.alt} loading="eager" decoding="async" />
                          {slide.type === 'video' && (
                            <span className="thumb-play-icon" aria-hidden="true">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="miroooo-gallery__nav-arrow miroooo-gallery__nav-arrow--next"
                    id="MirooooGalleryNavNext"
                    aria-label="Scroll thumbnails down"
                    onClick={() => scrollThumbnails('down')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>

                {/* Main 1:1 Featured Media Stage */}
                <div className="miroooo-gallery__stage-wrap">
                  <div
                    className="miroooo-gallery__stage"
                    id="MirooooGalleryStage"
                    role="region"
                    aria-label="Product media carousel"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <button
                      type="button"
                      className="miroooo-gallery__arrow miroooo-gallery__arrow--prev"
                      id="MirooooGalleryPrevBtn"
                      aria-label="Previous product image"
                      onClick={() => setActiveMediaIndex((prev) => (prev - 1 + totalSlides) % totalSlides)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>

                    <div className="miroooo-gallery__slides" id="MirooooGallerySlides">
                      {gallerySlides.map((slide, idx) => {
                        return (
                          <div
                            key={idx}
                            className={`miroooo-gallery__slide gallery-zoom-cursor ${activeMediaIndex === idx ? 'is-active' : ''}`}
                            aria-hidden={activeMediaIndex !== idx}
                            inert={activeMediaIndex !== idx}
                            data-media-type={slide.type}
                            data-index={idx}
                            onClick={() => {
                              setIsLightboxOpen(true);
                              setIsLightboxZoomed(false);
                            }}
                          >
                            {slide.type === 'video' ? (
                              <div className="video-wrapper">
                                <video
                                  id="gallery-featured-video"
                                  src={slide.videoSrc}
                                  poster={slide.poster}
                                  autoPlay={activeMediaIndex === idx}
                                  loop
                                  muted
                                  playsInline
                                  disablePictureInPicture
                                  controlsList="nodownload nofullscreen noremoteplayback"
                                  preload={activeMediaIndex === idx ? 'auto' : 'none'}
                                ></video>
                              </div>
                            ) : (
                              <>
                                <img
                                  src={slide.src}
                                  alt={slide.alt}
                                  width="1000"
                                  height="1000"
                                  fetchPriority={activeMediaIndex === idx ? 'high' : 'auto'}
                                  loading={activeMediaIndex === idx ? 'eager' : 'lazy'}
                                  decoding="async"
                                />
                                {slide.badge && (
                                  <div className={`miroooo-infographic-badge ${slide.badge.pos}`}>
                                    <div className="miroooo-infographic-badge__header">
                                      <span
                                        className="miroooo-infographic-badge__title"
                                        dangerouslySetInnerHTML={{ __html: slide.badge.title }}
                                      ></span>
                                    </div>
                                    <span
                                      className="miroooo-infographic-badge__sub"
                                      dangerouslySetInnerHTML={{ __html: slide.badge.sub }}
                                    ></span>
                                  </div>
                                )}
                                {slide.isModesBadge && (
                                  <div className="miroooo-infographic-badge miroooo-infographic-badge--top-left">
                                    <div className="miroooo-infographic-badge__header">
                                      <span className="miroooo-infographic-badge__title">
                                        {isX2 ? (
                                          <>3 Tailored<br />Clean Modes</>
                                        ) : (
                                          <>3 Cleaning<br />Modes</>
                                        )}
                                      </span>
                                    </div>
                                    <div className="miroooo-infographic-modes">
                                      <div className="miroooo-infographic-mode-item">
                                        <span className="miroooo-infographic-mode-ring miroooo-infographic-mode-ring--purple" aria-hidden="true"></span>
                                        <span className="miroooo-infographic-mode-text">{isX2 ? 'Standard' : 'Clean'}</span>
                                      </div>
                                      <div className="miroooo-infographic-mode-item">
                                        <span className="miroooo-infographic-mode-ring miroooo-infographic-mode-ring--blue" aria-hidden="true"></span>
                                        <span className="miroooo-infographic-mode-text">{isX2 ? 'Whitening' : 'Soft'}</span>
                                      </div>
                                      <div className="miroooo-infographic-mode-item">
                                        <span className="miroooo-infographic-mode-ring miroooo-infographic-mode-ring--green" aria-hidden="true"></span>
                                        <span className="miroooo-infographic-mode-text">{isX2 ? 'Deep Clean' : 'White'}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="miroooo-gallery__arrow miroooo-gallery__arrow--next"
                      id="MirooooGalleryNextBtn"
                      aria-label="Next product image"
                      onClick={() => setActiveMediaIndex((prev) => (prev + 1) % totalSlides)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Info / Buy Box */}
            <div
              id="ProductInfo-template--24203751129433__main-product-9593510658393"
              className="product__info block sticky w-full"
            >
              {/* 1. Green Stars Rating Badge */}
              <div className="product__title">
                <a
                  href="#shopify-section-template--24203751129433__reviews"
                  className="product__reviews-badge inline-flex items-center gap-2 mb-2 no-underline hover:opacity-80 transition-opacity cursor-pointer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px', textDecoration: 'none' }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }} aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <img
                        key={i}
                        src="/assets/star.png"
                        alt="★"
                        width="16"
                        height="15"
                        style={{ width: '16px', height: '15px', display: 'block', objectFit: 'contain' }}
                        loading="eager"
                        decoding="async"
                      />
                    ))}
                  </div>
                  <span
                    className="product__reviews-text"
                    style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}
                  >
                    4.9 · TRUSTED BY 40,000+ CUSTOMERS
                  </span>
                </a>
                <h1
                  className="heading leading-none product-title-sm mobile:product-title-sm col-span-full font-bold"
                  id="main-product-title"
                  style={{ fontSize: '40px', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', margin: '4px 0 2px 0', color: '#ffffff' }}
                >
                  {product.name} - {selectedColor}
                </h1>
              </div>

              {/* 2. Price Display */}
              <div className="product__price grid gap-2 mt-1" id="main-product-price-section">
                <div className="flex flex-wrap items-baseline gap-2" style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white" id="main-price-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
                    £{singlePrice}
                  </span>
                  <span className="text-base sm:text-lg price-compare-strike" id="main-compare-price-display" style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '1.15rem' }}>
                    £{singleCompare}
                  </span>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    id="main-discount-badge"
                    style={{ background: '#e6e6e6', color: '#111111', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '9999px', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center' }}
                  >
                    50% OFF
                  </span>
                </div>
              </div>

              {/* 3. Bullet Features */}
              <div className="product__features-list my-4" style={{ margin: '16px 0' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255, 255, 255, 0.9)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0, background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                    </span>
                    <span>{isX2 ? <><strong>Ultra Lightweight</strong> ergonomic aerospace-grade aluminium body.</> : <><strong>Ultra Lightweight</strong> at only 51g for effortless daily handling.</>}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0, background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line><polyline points="11 9 9 12 12 12 10 15"></polyline></svg>
                    </span>
                    <span>Brushes up to <strong>{isX2 ? '90 days' : '60 days'}</strong> on a single charge.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0, background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="14" rx="2"></rect><path d="M8 7V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3"></path><line x1="3" y1="13" x2="21" y2="13"></line></svg>
                    </span>
                    <span>{isX2 ? <>Includes <strong>free luxury travel case</strong>.</> : <>Includes free luxury <strong>Travel Case</strong>.</>}</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', flexShrink: 0, background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10v4"></path><path d="M6 7v10"></path><path d="M10 4v16"></path><path d="M14 7v10"></path><path d="M18 10v4"></path><path d="M22 12v0"></path></svg>
                    </span>
                    <span><strong>Whisper Quiet</strong> acoustic motor operating below {isX2 ? '45' : '50'} dB.</span>
                  </li>
                </ul>
              </div>

              {/* Standalone 3-Color Selector (Silver, Pink, Grey) */}
              <div className="standalone-color-selector my-4" style={{ margin: '20px 0 16px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '14px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>Color:</span>
                  <span id="standalone-color-name" style={{ color: '#ffffff', fontWeight: 700 }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} id="standalone-swatches-group">
                  {['Silver', 'Pink', 'Grey'].map((col) => (
                    <button
                      key={col}
                      type="button"
                      className={`standalone-swatch-btn swatch-${col.toLowerCase()} ${selectedColor === col ? 'is-active' : ''}`}
                      data-color={col}
                      onClick={() => handleSelectStandaloneColor(col)}
                      title={col}
                      aria-label={col}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector Bar for Simple Buybox */}
              {isSimpleBuybox && (
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    <span
                      style={{
                        minWidth: '32px',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '15px',
                        color: '#ffffff',
                        userSelect: 'none',
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {!isSimpleBuybox && (
                <>
                  {/* Bundle Divider */}
                  <div className="bundle-header-divider flex items-center gap-3 my-4">
                <span className="h-px flex-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', height: '1px', flex: 1 }}></span>
                <span className="font-bold uppercase" style={{ fontSize: 15, lineHeight: 'normal', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.7)' }}>
                  BUNDLE &amp; SAVE + FREE SHIPPING
                </span>
                <span className="h-px flex-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', height: '1px', flex: 1 }}></span>
              </div>

              {/* 3 Tier Cards */}
              <div className="bundle-tiers-container flex flex-col gap-4" id="bundle-tiers" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Tier 1: Buy 1 */}
                <div
                  className={`bundle-tier-card ${selectedTier === 'single' ? 'is-selected' : ''}`}
                  data-tier="single"
                  onClick={() => setSelectedTier('single')}
                >
                  <button type="button" className="tier-header-btn" aria-label="Select Buy 1 Tier">
                    <div className="tier-radio"><div className="tier-radio-dot"></div></div>
                    <div className="flex-1 flex justify-between items-start gap-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-normal text-[13px] sm:text-[15px] leading-[1.6] uppercase tracking-tight" style={{ color: '#111111' }}>Buy 1</span>
                        </div>
                        <p className="text-xs sm:text-sm mt-0.5" style={{ color: '#555555' }}>Includes 1 {product.name} set</p>
                      </div>
                      <div className="text-right" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', flexShrink: 0 }}>
                        <div className="flex items-baseline gap-1.5 justify-end" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '6px' }}>
                          <span className="font-bold text-base sm:text-lg" id="tier-single-price" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#111111' }}>
                            £{singlePrice}
                          </span>
                          <span className="text-xs sm:text-sm price-compare-strike" id="tier-single-compare-price" style={{ fontSize: 12, color: '#777777' }}>
                            £{singleCompare}
                          </span>
                        </div>
                        <span className="tier-badge-pill mt-0.5" style={{ background: 'rgba(0, 0, 0, 0.08)', color: '#111111', fontSize: '10.5px', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px', display: 'inline-block' }}>
                          50% OFF
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Row (Tier 1) */}
                  <div className="tier-expanded-panel" id="panel-single" style={{ display: selectedTier === 'single' ? 'flex' : 'none' }}>
                    <div className="brush-selection-row">
                      <span className="text-xs sm:text-sm font-medium" style={{ color: '#444444' }}>Brush Color:</span>
                      <div className="brush-color-swatches" data-brush-index="0">
                        {['Grey', 'Pink', 'Silver'].map((col) => (
                          <button
                            key={col}
                            type="button"
                            className={`color-swatch-btn swatch-${col.toLowerCase()} ${singleColor === col ? 'is-active' : ''}`}
                            title={col}
                            aria-label={col}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectStandaloneColor(col);
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Embedded Addon Strip (Buy 1) */}
                  <div
                    className="tier-gift-strip tier-addon-strip"
                    id="buy1-heads-addon-strip"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBuy1HeadsChecked(selectedTier !== 'single' || !buy1HeadsChecked);
                      setSelectedTier('single');
                    }}
                    title="Add 2 Brush Heads"
                  >
                    <div className="tier-gift-strip-left">
                      <label className="tier-addon-checkbox-wrap" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          id="buy1-heads-checkbox"
                          className="tier-addon-checkbox"
                          checked={buy1HeadsChecked}
                          onChange={(e) => { setBuy1HeadsChecked(e.target.checked); setSelectedTier('single'); }}
                          aria-label="Add 2 brush heads"
                        />
                        <span className="tier-addon-custom-check" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      </label>
                      <span className="tier-gift-strip-title">+ 2 Brush Heads</span>
                    </div>
                    <div className="tier-gift-strip-right">
                      <span className="tier-addon-price-tag" id="tier-single-heads-price">+£10</span>
                    </div>
                  </div>
                </div>

                {/* Tier 2: Buy 2 (Most Popular) */}
                <div
                  className={`bundle-tier-card has-top-badge ${selectedTier === 'bundle-2' ? 'is-selected' : ''}`}
                  data-tier="bundle-2"
                  onClick={() => { setSelectedTier('bundle-2'); setBuy1HeadsChecked(false); }}
                >
                  <div className="tier-popular-badge-wrap badge-popular">
                    <div className="tier-popular-seal">
                      <svg width="84" height="53" viewBox="0 0 90 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 85.0 28.0 Q 80.2 31.2 83.0 35.1 Q 76.8 37.3 77.4 41.5 Q 70.2 42.5 68.5 46.6 Q 61.2 46.3 57.4 49.9 Q 50.6 48.2 45.0 51.0 Q 39.4 48.2 32.6 49.9 Q 28.8 46.3 21.5 46.6 Q 19.8 42.5 12.6 41.5 Q 13.2 37.3 7.0 35.1 Q 9.8 31.2 5.0 28.0 Q 9.8 24.8 7.0 20.9 Q 13.2 18.7 12.6 14.5 Q 19.8 13.5 21.5 9.4 Q 28.8 9.7 32.6 6.1 Q 39.4 7.8 45.0 5.0 Q 50.6 7.8 57.4 6.1 Q 61.2 9.7 68.5 9.4 Q 70.2 13.5 77.4 14.5 Q 76.8 18.7 83.0 20.9 Q 80.2 24.8 85.0 28.0 Z" fill="#22c55e" />
                        <ellipse cx="45" cy="28" rx="34" ry="18.5" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.9" strokeDasharray="2 1.5" fill="none" />
                        <text x="45" y="23" textAnchor="middle" fill="#ffffff" fontFamily="'Playfair Display', Georgia, serif" fontSize="12.5" fontStyle="italic" fontWeight="600" letterSpacing="0.3">Most</text>
                        <text x="45" y="37.5" textAnchor="middle" fill="#ffffff" fontFamily="'Inter', -apple-system, sans-serif" fontSize="11" fontWeight="800" letterSpacing="0.5">Popular</text>
                      </svg>
                    </div>
                  </div>
                  <button type="button" className="tier-header-btn" aria-label="Select Buy 2 Tier">
                    <div className="tier-radio"><div className="tier-radio-dot"></div></div>
                    <div className="flex-1 flex justify-between items-start gap-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-normal text-[13px] sm:text-[15px] leading-[1.6] uppercase tracking-tight" style={{ color: '#111111' }}>Buy 2</span>
                          <span className="tier-badge-pill" id="tier-bundle-2-discount-badge" style={{ background: 'rgba(0, 0, 0, 0.08)', color: '#111111' }}>£10 OFF</span>
                        </div>
                        <p className="text-xs sm:text-sm mt-0.5" style={{ color: '#555555', lineHeight: 1.4 }}>Includes 2 {product.name} sets</p>
                      </div>
                      <div className="text-right" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', flexShrink: 0, marginTop: '14px' }}>
                        <div className="flex items-baseline gap-1.5 justify-end" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '6px' }}>
                          <span className="font-bold text-base sm:text-lg" id="tier-bundle-2-price" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#111111' }}>
                            £{bundle2Price}
                          </span>
                          <span className="text-xs sm:text-sm price-compare-strike" id="tier-bundle-2-compare-price" style={{ fontSize: 12, color: '#777777' }}>
                            £{bundle2Compare}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5 justify-end" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '4px' }}>
                          <span className="font-bold text-xs sm:text-sm" id="tier-bundle-2-each-price" style={{ color: '#111111', fontWeight: 700, fontSize: '11.5px' }}>
                            (£{Math.round(bundle2Price / 2)} each)
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Rows (Tier 2) */}
                  <div className="tier-expanded-panel" id="panel-bundle-2" style={{ display: selectedTier === 'bundle-2' ? 'flex' : 'none' }}>
                    {/* Row 1 */}
                    <div className="brush-selection-row">
                      <span className="text-xs sm:text-sm font-medium" style={{ color: '#444444' }}>#1 Brush Color:</span>
                      <div className="brush-color-swatches" data-brush-index="0">
                        {['Grey', 'Pink', 'Silver'].map((col) => (
                          <button
                            key={col}
                            type="button"
                            className={`color-swatch-btn swatch-${col.toLowerCase()} ${bundle2Colors[0] === col ? 'is-active' : ''}`}
                            title={col}
                            aria-label={col}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBundle2Colors([col, bundle2Colors[1]]);
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>
                    {/* Row 2 */}
                    <div className="brush-selection-row">
                      <span className="text-xs sm:text-sm font-medium" style={{ color: '#444444' }}>#2 Brush Color:</span>
                      <div className="brush-color-swatches" data-brush-index="1">
                        {['Grey', 'Pink', 'Silver'].map((col) => (
                          <button
                            key={col}
                            type="button"
                            className={`color-swatch-btn swatch-${col.toLowerCase()} ${bundle2Colors[1] === col ? 'is-active' : ''}`}
                            title={col}
                            aria-label={col}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBundle2Colors([bundle2Colors[0], col]);
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Free Gift Strip (Buy 2) */}
                  <a className="tier-gift-strip" href={isX2 ? '/products/miroooo-x2-heads' : '/products/miroooo-x1-heads'} onClick={(event) => event.stopPropagation()}>
                    <div className="tier-gift-strip-left">
                      <span className="tier-gift-strip-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="20 12 20 22 4 22 4 12"></polyline>
                          <rect x="2" y="7" width="20" height="5"></rect>
                          <line x1="12" y1="22" x2="12" y2="7"></line>
                          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                        </svg>
                      </span>
                      <span className="tier-gift-strip-title">+ 2 Brush Heads</span>
                    </div>
                    <div className="tier-gift-strip-right">
                      <span className="tier-gift-original-price" id="tier-bundle-2-gift-price">£10</span>
                      <span className="tier-gift-free-badge">FREE</span>
                    </div>
                  </a>
                </div>

                {/* Tier 3: Buy 3 (Best Value) */}
                <div
                  className={`bundle-tier-card has-top-badge ${selectedTier === 'bundle-3' ? 'is-selected' : ''}`}
                  data-tier="bundle-3"
                  onClick={() => { setSelectedTier('bundle-3'); setBuy1HeadsChecked(false); }}
                >
                  <div className="tier-best-value-wrap badge-value">
                    <div className="tier-best-value-ribbon">
                      BEST VALUE
                    </div>
                  </div>
                  <button type="button" className="tier-header-btn" aria-label="Select Buy 3 Tier">
                    <div className="tier-radio"><div className="tier-radio-dot"></div></div>
                    <div className="flex-1 flex justify-between items-start gap-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-normal text-[13px] sm:text-[15px] leading-[1.6] uppercase tracking-tight" style={{ color: '#111111' }}>Buy 3</span>
                          <span className="tier-badge-pill" id="tier-bundle-3-discount-badge" style={{ background: 'rgba(0, 0, 0, 0.08)', color: '#111111' }}>£30 OFF</span>
                        </div>
                        <p className="text-xs sm:text-sm mt-0.5" style={{ color: '#555555', lineHeight: 1.4 }}>Includes 3 {product.name} sets</p>
                      </div>
                      <div className="text-right" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', flexShrink: 0 }}>
                        <div className="flex items-baseline gap-1.5 justify-end" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '6px' }}>
                          <span className="font-bold text-base sm:text-lg" id="tier-bundle-3-price" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#111111' }}>
                            £{bundle3Price}
                          </span>
                          <span className="text-xs sm:text-sm price-compare-strike" id="tier-bundle-3-compare-price" style={{ fontSize: 12, color: '#777777' }}>
                            £{bundle3Compare}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5 justify-end" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '4px' }}>
                          <span className="font-bold text-xs sm:text-sm" id="tier-bundle-3-each-price" style={{ color: '#111111', fontWeight: 700, fontSize: '11.5px' }}>
                            (£{Math.round(bundle3Price / 3)} each)
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Rows (Tier 3) */}
                  <div className="tier-expanded-panel" id="panel-bundle-3" style={{ display: selectedTier === 'bundle-3' ? 'flex' : 'none' }}>
                    {/* Row 1 */}
                    <div className="brush-selection-row">
                      <span className="text-xs sm:text-sm font-medium" style={{ color: '#444444' }}>#1 Brush Color:</span>
                      <div className="brush-color-swatches" data-brush-index="0">
                        {['Grey', 'Pink', 'Silver'].map((col) => (
                          <button
                            key={col}
                            type="button"
                            className={`color-swatch-btn swatch-${col.toLowerCase()} ${bundle3Colors[0] === col ? 'is-active' : ''}`}
                            title={col}
                            aria-label={col}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBundle3Colors([col, bundle3Colors[1], bundle3Colors[2]]);
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>
                    {/* Row 2 */}
                    <div className="brush-selection-row">
                      <span className="text-xs sm:text-sm font-medium" style={{ color: '#444444' }}>#2 Brush Color:</span>
                      <div className="brush-color-swatches" data-brush-index="1">
                        {['Grey', 'Pink', 'Silver'].map((col) => (
                          <button
                            key={col}
                            type="button"
                            className={`color-swatch-btn swatch-${col.toLowerCase()} ${bundle3Colors[1] === col ? 'is-active' : ''}`}
                            title={col}
                            aria-label={col}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBundle3Colors([bundle3Colors[0], col, bundle3Colors[2]]);
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>
                    {/* Row 3 */}
                    <div className="brush-selection-row">
                      <span className="text-xs sm:text-sm font-medium" style={{ color: '#444444' }}>#3 Brush Color:</span>
                      <div className="brush-color-swatches" data-brush-index="2">
                        {['Grey', 'Pink', 'Silver'].map((col) => (
                          <button
                            key={col}
                            type="button"
                            className={`color-swatch-btn swatch-${col.toLowerCase()} ${bundle3Colors[2] === col ? 'is-active' : ''}`}
                            title={col}
                            aria-label={col}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBundle3Colors([bundle3Colors[0], bundle3Colors[1], col]);
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Free Gift Strip (Buy 3) */}
                  <a className="tier-gift-strip" href={isX2 ? '/products/miroooo-x2-heads' : '/products/miroooo-x1-heads'} onClick={(event) => event.stopPropagation()}>
                    <div className="tier-gift-strip-left">
                      <span className="tier-gift-strip-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="20 12 20 22 4 22 4 12"></polyline>
                          <rect x="2" y="7" width="20" height="5"></rect>
                          <line x1="12" y1="22" x2="12" y2="7"></line>
                          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                        </svg>
                      </span>
                      <span className="tier-gift-strip-title">+ 4 Brush Heads (2 Sets)</span>
                    </div>
                    <div className="tier-gift-strip-right">
                      <span className="tier-gift-original-price" id="tier-bundle-3-gift-price">£20</span>
                      <span className="tier-gift-free-badge">FREE</span>
                    </div>
                  </a>
                </div>
              </div>
              </>
              )}

              {/* Delivery Countdown Timer Box */}
              <div
                className="delivery-timer-box rounded-xl p-3.5 my-4 flex items-center gap-3 text-sm"
                style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.85)', margin: '16px 0', position: 'relative' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', width: '32px', height: '32px', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="flex-1 text-xs sm:text-sm leading-snug" style={{ fontSize: '13px', lineHeight: 1.4 }}>
                  Order within <strong className="font-mono font-bold" id="bundle-countdown-timer" style={{ color: '#ffffff', fontWeight: 700, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>{deliveryCountdown}</strong> to receive it by <strong className="font-bold" id="bundle-delivery-date" style={{ color: '#ffffff', fontWeight: 700 }}>{deliveryDateStr}</strong>
                </div>

                {/* Tooltip / Question Mark Button */}
                <div className="shipping-info-wrapper" style={{ position: 'relative', flexShrink: 0 }}>
                  <button
                    type="button"
                    className="shipping-info-btn"
                    aria-label="Shipping information"
                    aria-expanded={isShippingTooltipOpen}
                    onClick={() => setIsShippingTooltipOpen((prev) => !prev)}
                    style={{ width: '18px', height: '18px', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'rgba(255, 255, 255, 0.6)', fontSize: '10px', fontWeight: 700, lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, transition: 'all 0.2s ease' }}
                  >
                    ?
                  </button>
                  {isShippingTooltipOpen && (
                    <div
                      className="shipping-info-tooltip"
                      style={{ display: 'block', position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 50, width: '270px', background: '#18191a', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '12px 14px', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)', textAlign: 'left', color: 'rgba(255, 255, 255, 0.85)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 700, fontSize: '12px', color: '#ffffff' }}>Delivery Estimate</span>
                        <button
                          type="button"
                          className="shipping-info-close"
                          style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.6)', fontSize: '13px', cursor: 'pointer', padding: 0, lineHeight: 1 }}
                          aria-label="Close"
                          onClick={() => setIsShippingTooltipOpen(false)}
                        >
                          ✕
                        </button>
                      </div>
                      <p style={{ fontSize: '11.5px', lineHeight: 1.5, margin: 0, color: 'rgba(255, 255, 255, 0.8)' }}>
                        This is the estimated delivery timeframe based on 1–3 business days processing and 7–20 business days standard transit across the UK. For more information, please visit our <a href="/policies/shipping-policy" style={{ color: '#ffffff', textDecoration: 'underline' }}>shipping policy</a> page.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Add To Cart Main Button */}
              <div
                className="main-cta-wrapper my-4"
                style={{ margin: '18px 0 14px 0' }}
              >
                <button
                  ref={heroCtaRef}
                  type="button"
                  id="hero-cta"
                  className="button button--primary"
                  style={{ width: '100%', fontSize: '1.05rem' }}
                  onClick={handleAddToCart}
                >
                  <span className="btn-fill" data-fill></span>
                  <span className="btn-text" id="main-cta-text">
                    {addToCartLabel}
                  </span>
                </button>
              </div>

              {isSimpleBuybox && (
                <div
                  className="gift-incentive-banner"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 15px',
                    borderRadius: '12px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#86efac',
                    fontSize: '13px',
                    fontWeight: 600,
                    marginBottom: '20px',
                    lineHeight: 1.45,
                  }}
                >
                  <span>
                    🎁 Includes £65 in Free Gifts: Travel Case, {isX2 ? '90-Day' : '60-Day'} Battery, 2x Brush Heads
                  </span>
                </div>
              )}

              {/* Trust Badges Strip */}
              <div
                className="grid grid-cols-3 gap-2 py-3 px-1 mb-6 text-center"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', padding: '12px 0 16px', marginBottom: '24px' }}
              >
                <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7"><rect x="2" y="7" width="16" height="10" rx="2" ry="2" /><line x1="22" y1="11" x2="22" y2="13" /><polyline points="11 9 9 12 12 12 10 15" /></svg>
                  <span className="text-[11px] font-bold uppercase tracking-tight leading-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{isX2 ? '90-Day' : '60-Day'}<br />Battery</span>
                </div>
                <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" /></svg>
                  <span className="text-[11px] font-bold uppercase tracking-tight leading-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{isX2 ? '45° Bass' : 'Aerospace'}<br />{isX2 ? 'Sweep' : 'Aluminium'}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#ffffff' }} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7"><rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16 8 20 8 23 11 23 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                  <span className="text-[11px] font-bold uppercase tracking-tight leading-tight" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Free Tracked<br />Shipping</span>
                </div>
              </div>

              <ProductAccordions model={isX2 ? 'x2' : 'x1'} />
            </div>
          </div>

          {/* Floating Sticky Add To Cart Pill */}
          <div className={`miroooo-sticky-cart-wrap ${isStickyVisible ? 'is-visible' : ''}`} id="miroooo-sticky-cart" aria-hidden={!isStickyVisible}>
            <div className="miroooo-sticky-pill">
              <div className="miroooo-sticky-left">
                <div className="miroooo-sticky-img-stack" id="sticky-bar-img-stack" aria-hidden="true">
                  {isSimpleBuybox ? (
                    <div className="miroooo-sticky-img-thumb" style={{ zIndex: 1 }}>
                      <img src={getColorThumbnail(selectedColor)} alt={`${product.name} - ${selectedColor}`} width="50" height="50" decoding="async" />
                    </div>
                  ) : (
                    <>
                      {(selectedTier === 'single' ? [singleColor] : selectedTier === 'bundle-2' ? bundle2Colors : bundle3Colors).map((color, index) => (
                        <div className="miroooo-sticky-img-thumb" key={index} style={{ zIndex: index + 1 }}>
                          <img src={getColorThumbnail(color)} alt={`${product.name} - ${color}`} width="50" height="50" decoding="async" />
                        </div>
                      ))}
                      {selectedTier === 'single' && buy1HeadsChecked && (
                        <div className="miroooo-sticky-img-thumb" style={{ zIndex: 2 }}>
                          <img src={isX2 ? '/assets_ref/x2/heads/B1.webp' : '/assets_ref/x/heads/B1.webp'} alt={`${product.name} Heads`} width="50" height="50" decoding="async" />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="miroooo-sticky-info">
                  <p className="miroooo-sticky-title" id="sticky-bar-title">
                    {isSimpleBuybox
                      ? `${product.name} - ${selectedColor}`
                      : selectedTier === 'single'
                      ? `${product.name} - ${singleColor}${buy1HeadsChecked ? ' + Heads' : ''}`
                      : selectedTier === 'bundle-2'
                      ? `Buy 2 - ${product.name} (${bundle2Colors[0]} + ${bundle2Colors[1]})`
                      : `Buy 3 - ${product.name} (${bundle3Colors[0]} + ${bundle3Colors[1]} + ${bundle3Colors[2]})`}
                  </p>
                  <p className="miroooo-sticky-sub" id="sticky-bar-subtitle">
                    {isSimpleBuybox ? (
                      <>
                        <span style={{ marginRight: '8px', color: 'rgba(255, 255, 255, 0.7)' }}>Qty: {quantity}</span>
                        <span id="sticky-bar-price" style={{ fontWeight: 700, color: '#ffffff' }}>
                          £{singlePrice * quantity}
                        </span>
                      </>
                    ) : (
                      <span id="sticky-bar-price" style={{ fontWeight: 700, color: '#ffffff' }}>
                        £{currentPrice}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="sticky-bar-cta-btn"
                className="button button--primary miroooo-sticky-btn"
                aria-label="Add to cart"
                onClick={handleAddToCart}
              >
                <span className="btn-fill" data-fill></span>
                <span className="btn-text">
                  <AnimatedIcon kind="cart" className="miroooo-lottie-cart" />
                  <span id="sticky-bar-cta-text">
                    {addToCartLabel}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Lightbox Modal */}
      {isLightboxOpen && (
        <div
          id="MirooooGalleryLightbox"
          className="miroooo-gallery-lightbox is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded Product Gallery"
          style={{ display: 'flex' }}
        >
          <div
            className="miroooo-gallery-lightbox__backdrop"
            onClick={() => {
              setIsLightboxOpen(false);
              setIsLightboxZoomed(false);
            }}
            aria-hidden="true"
          ></div>

          <button
            type="button"
            className="miroooo-gallery-lightbox__close"
            id="MirooooGalleryLightboxClose"
            aria-label="Close product gallery"
            onClick={() => {
              setIsLightboxOpen(false);
              setIsLightboxZoomed(false);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button
            type="button"
            className="miroooo-gallery-lightbox__arrow miroooo-gallery-lightbox__prev"
            id="MirooooGalleryLightboxPrev"
            aria-label="Previous product media"
            onClick={() => {
              setActiveMediaIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
              setIsLightboxZoomed(false);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div
            className="miroooo-gallery-lightbox__stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="miroooo-gallery-lightbox__media-box"
              id="MirooooGalleryLightboxMediaBox"
              key={activeMediaIndex}
              style={{
                cursor: gallerySlides[activeMediaIndex].type === 'image' ? (isLightboxZoomed ? 'zoom-out' : 'url("/cursor-zoom-in.svg") 20 20, zoom-in') : 'default',
                transform: isLightboxZoomed ? 'scale(1.75)' : 'scale(1)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '90vw',
                maxHeight: '85vh',
                position: 'relative',
              }}
              onClick={() => {
                if (gallerySlides[activeMediaIndex].type === 'image') {
                  setIsLightboxZoomed((z) => !z);
                }
              }}
            >
              {gallerySlides[activeMediaIndex].type === 'video' ? (
                <video
                  src={gallerySlides[activeMediaIndex].videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
                ></video>
              ) : (
                <>
                  <img
                    src={gallerySlides[activeMediaIndex].src}
                    alt={gallerySlides[activeMediaIndex].alt}
                    style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', userSelect: 'none' }}
                  />
                  {gallerySlides[activeMediaIndex].badge && !isLightboxZoomed && (
                    <div className={`miroooo-infographic-badge ${gallerySlides[activeMediaIndex].badge?.pos}`}>
                      <div className="miroooo-infographic-badge__header">
                        <span
                          className="miroooo-infographic-badge__title"
                          dangerouslySetInnerHTML={{ __html: gallerySlides[activeMediaIndex].badge?.title || '' }}
                        ></span>
                      </div>
                      <span
                        className="miroooo-infographic-badge__sub"
                        dangerouslySetInnerHTML={{ __html: gallerySlides[activeMediaIndex].badge?.sub || '' }}
                      ></span>
                    </div>
                  )}
                  {gallerySlides[activeMediaIndex].isModesBadge && !isLightboxZoomed && (
                    <div className="miroooo-infographic-badge miroooo-infographic-badge--top-left">
                      <div className="miroooo-infographic-badge__header">
                        <span className="miroooo-infographic-badge__title">
                          {isX2 ? (
                            <>3 Tailored<br />Clean Modes</>
                          ) : (
                            <>3 Cleaning<br />Modes</>
                          )}
                        </span>
                      </div>
                      <div className="miroooo-infographic-modes">
                        <div className="miroooo-infographic-mode-item">
                          <span className="miroooo-infographic-mode-ring miroooo-infographic-mode-ring--purple" aria-hidden="true"></span>
                          <span className="miroooo-infographic-mode-text">{isX2 ? 'Standard' : 'Clean'}</span>
                        </div>
                        <div className="miroooo-infographic-mode-item">
                          <span className="miroooo-infographic-mode-ring miroooo-infographic-mode-ring--blue" aria-hidden="true"></span>
                          <span className="miroooo-infographic-mode-text">{isX2 ? 'Whitening' : 'Soft'}</span>
                        </div>
                        <div className="miroooo-infographic-mode-item">
                          <span className="miroooo-infographic-mode-ring miroooo-infographic-mode-ring--green" aria-hidden="true"></span>
                          <span className="miroooo-infographic-mode-text">{isX2 ? 'Deep Clean' : 'White'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            className="miroooo-gallery-lightbox__arrow miroooo-gallery-lightbox__next"
            id="MirooooGalleryLightboxNext"
            aria-label="Next product media"
            onClick={() => {
              setActiveMediaIndex((prev) => (prev + 1) % totalSlides);
              setIsLightboxZoomed(false);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="miroooo-gallery-lightbox__counter" id="MirooooGalleryLightboxCounter" aria-live="polite">
            <span id="MirooooGalleryLightboxCurrent">{activeMediaIndex + 1}</span> / <span id="MirooooGalleryLightboxTotal">{totalSlides}</span>
          </div>
        </div>
      )}
    </div>
  );
}
