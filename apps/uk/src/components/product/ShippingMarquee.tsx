const BRUSH_MARQUEE_ITEMS = [
  'Free shipping on all orders',
  'Easy return and refund',
  'Ultra Light Weight',
];

const FLOSSER_MARQUEE_ITEMS = [
  'Free shipping on all orders',
  'Easy return and refund',
  'IPX7 Waterproof & 60-Day Battery',
];

interface ShippingMarqueeProps {
  isFlosser?: boolean;
}

export function ShippingMarquee({ isFlosser = false }: ShippingMarqueeProps) {
  const items = isFlosser ? FLOSSER_MARQUEE_ITEMS : BRUSH_MARQUEE_ITEMS;
  const label = items.join(', ');

  return (
    <div
      id="shopify-section-template--24203751129433__scrolling_text_P3gRex"
      className="shopify-section scrolling-text-section shipping-marquee"
      aria-label={label}
    >
      <div className="shipping-marquee__track" aria-hidden="true">
        {[0, 1].map((set) => (
          <div className="shipping-marquee__set" key={set}>
            {items.map((text, idx) => (
              <span key={`set-${set}-item-${idx}`}>{text}</span>
            ))}
            {items.map((text, idx) => (
              <span key={`set-${set}-item-dup-${idx}`}>{text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

