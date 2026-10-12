import styles from './FreeBrushHeadsGift.module.css';

function Checkmark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FreeBrushHeadsGift({ model = 'X2' }: { model?: 'X1' | 'X2' }) {
  const isX1 = model === 'X1';
  return (
    <section className={styles.section} id="special-flash-sale-gifts" aria-labelledby="free-heads-title">
      <h3 className={styles.heading} id="free-heads-title">Flash Sale</h3>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.selectedCheck}><Checkmark /></span>
          <span className={styles.headerText}>Yes, include my free pair</span>
          <span className={styles.selectedBadge}>Selected</span>
        </div>
        <div className={styles.product}>
          <div className={styles.imageWrap}>
            <img
              src={isX1 ? '/assets_ref/x/heads/B1.webp' : '/assets_ref/x2/heads/B1.webp'}
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
            <s className={styles.originalPrice}>£10</s>
            <span className={styles.freePrice}>£0.00</span>
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
    </section>
  );
}
