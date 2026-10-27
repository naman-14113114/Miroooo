import styles from './FreeBrushHeadsGift.module.css';

function Checkmark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 36"
      fill="#a855f7"
      aria-hidden="true"
      className={className}
    >
      <path d="M32 14c1.2-3 2.8-5 4-5s1.8 1.5 2 3c3.5-3.5 9-6 16-3-2.5 3.5-3.5 7.5-3 12 3-1 6.5-1 9 1-4 4.5-9 6-14 4.5-2 3-5 5-8 7.5-1.5-3.5-4-6-6-7.5-2 1.5-4.5 4-6 7.5-3-2.5-6-4.5-8-7.5-5 1.5-10 0-14-4.5 2.5-2 6-2 9-1 .5-4.5-.5-8.5-3-12 7-3 12.5-.5 16 3 .2-1.5.8-3 2-3s2.8 2 4 5z" />
    </svg>
  );
}

interface FreeBrushHeadsGiftProps {
  model?: 'X1' | 'X2' | 'WaterFlosser';
  currency?: '£' | '$';
  onlyGiftCard?: boolean;
}

export function FreeBrushHeadsGift({ model = 'X2', currency = '$', onlyGiftCard = false }: FreeBrushHeadsGiftProps) {
  const isX1 = model === 'X1';
  const isFlosser = onlyGiftCard || model === 'WaterFlosser';

  const toothbrushGifts = [
    {
      id: 'travel-case',
      title: 'Luxury Travel Case',
      regularPrice: currency === '£' ? '£20' : '$25',
      image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp',
      alt: 'Miroooo Luxury Travel Case',
    },
    {
      id: 'wall-dock',
      title: 'Wall-Mounted Dock',
      regularPrice: currency === '£' ? '£9' : '$14',
      image: '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted-dock-storage.webp',
      alt: 'Miroooo Wall-Mounted Dock',
    },
    {
      id: 'brush-heads',
      title: '2x Brush Heads',
      regularPrice: currency === '£' ? '£10' : '$10',
      image: isX1
        ? '/assets_ref/x/gallery/miroooo-x1-replacement-brush-heads-beside-retail-carton.webp'
        : '/assets_ref/x2/heads/B1.webp',
      alt: isX1
        ? 'One pair of Miroooo X1 replacement brush heads'
        : 'One pair of Miroooo X2 replacement brush heads',
    },
  ];

  return (
    <section className={styles.section} id="special-flash-sale-gifts" aria-labelledby="free-heads-title">
      <h3 className={styles.heading} id="free-heads-title">
        <span className={styles.batWrapStart} aria-hidden="true">
          <BatIcon className={styles.batSvgStart} />
        </span>
        <span className={styles.headingText}>Halloween Smile Sale</span>
        <span className={styles.batWrapEnd} aria-hidden="true">
          <BatIcon className={styles.batSvgEnd} />
        </span>
      </h3>

      {isFlosser ? (
        <div className={styles.cardList}>
          {/* Card: Free Digital Gift Card for Water Flosser */}
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <span className={styles.selectedCheck}><Checkmark /></span>
                <span className={styles.headerText}>
                  {`Free Miroooo Digital Gift Card (${currency}10 Value) Included`}
                </span>
              </div>
              <span className={styles.selectedBadge}>
                SELECTED / FREE
              </span>
            </div>

            <div className={styles.product}>
              <div className={styles.imageWrapDark}>
                <img
                  src="/assets_ref/gifts/miroooo-x2-silver-digital-gift-card.webp"
                  alt={`Miroooo ${model} official digital gift card ${currency}10 complimentary voucher`}
                  width={1024}
                  height={1024}
                  loading="eager"
                  decoding="async"
                  className={styles.image}
                />
              </div>
              <div className={styles.description}>
                <p className={styles.name}>Miroooo Digital Gift Card</p>
                <p className={styles.subtitle}>Official Miroooo voucher</p>
              </div>
              <div className={styles.price}>
                <s className={styles.originalPrice}>{currency}10</s>
                <span className={styles.freePrice}>{currency}0.00</span>
                <span className={styles.freeLabel}>FREE</span>
              </div>
            </div>

            <div className={styles.footer}>
              <span className={styles.status}>
                <span className={styles.statusCheck}><Checkmark /></span>
                Included with your order
              </span>
              <span className={styles.quantity}>1 voucher · {currency}10 value</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.valuePillWrap}>
            <p className={styles.valuePill}>
              <span className={styles.valueAmount}>{currency === '£' ? '£39' : '$49'}</span>
              <span className={styles.valueText}>VALUE OF FREE GIFTS FOR TODAY ONLY</span>
            </p>
          </div>

          <div className={styles.giftsGrid}>
            {toothbrushGifts.map((gift) => (
              <div key={gift.id} className={styles.giftCard}>
                <div className={styles.cardBadge}>
                  <span className={styles.badgeFree}>FREE</span>
                  <span className={styles.badgeRegular}>{gift.regularPrice}</span>
                </div>
                <div className={styles.cardImageWrap}>
                  <img
                    src={gift.image}
                    alt={gift.alt}
                    width={200}
                    height={200}
                    loading="eager"
                    decoding="async"
                    className={styles.cardImage}
                  />
                </div>
                <p className={styles.cardTitle}>{gift.title}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
