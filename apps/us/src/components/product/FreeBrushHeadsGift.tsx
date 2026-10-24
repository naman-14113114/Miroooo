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

      <div className={styles.cardList}>
        {/* Card 1: Free Brush Heads */}
        {!onlyGiftCard && (
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <span className={styles.selectedCheck}><Checkmark /></span>
                <span className={styles.headerText}>Yes, include my free pair</span>
              </div>
              <span className={styles.selectedBadge}>SELECTED</span>
            </div>

            <div className={styles.product}>
              <div className={styles.imageWrap}>
                <img
                  src={isX1 ? '/assets_ref/x/gallery/miroooo-x1-replacement-brush-heads-beside-retail-carton.webp' : '/assets_ref/x2/heads/B1.webp'}
                  alt={isX1 ? 'One pair of Miroooo X1 replacement brush heads' : 'One pair of Miroooo X2 replacement brush heads'}
                  width={1254}
                  height={1254}
                  loading="eager"
                  decoding="async"
                  className={styles.image}
                />
              </div>
              <div className={styles.description}>
                <p className={styles.name}>2x Brush Heads</p>
                <p className={styles.subtitle}>Replacement pair</p>
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
              <span className={styles.quantity}>1 pair · 2 heads</span>
            </div>
          </div>
        )}

        {/* Card 2: Free Digital Gift Card */}
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.selectedCheck}><Checkmark /></span>
              <span className={styles.headerText}>
                {onlyGiftCard ? 'Free Miroooo Digital Gift Card ($10 Value) Included' : 'Yes, include my free gift card'}
              </span>
            </div>
            <span className={styles.selectedBadge}>
              {onlyGiftCard ? 'SELECTED / FREE' : 'SELECTED'}
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
    </section>
  );
}
