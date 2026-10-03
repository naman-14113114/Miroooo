const MARQUEE_ITEMS = [
  'Free shipping on all orders',
  'Easy return and refund',
  'Ultra Light Weight',
];

export function ShippingMarquee() {
  return (
    <div
      id="shopify-section-template--24203751129433__scrolling_text_P3gRex"
      className="shopify-section scrolling-text-section shipping-marquee"
      aria-label="Free shipping on all orders, Easy return and refund, Ultra Light Weight"
    >
      <div className="shipping-marquee__track" aria-hidden="true">
        {[0, 1].map((set) => (
          <div className="shipping-marquee__set" key={set}>
            {MARQUEE_ITEMS.map((text, idx) => (
              <span key={`set-${set}-item-${idx}`}>{text}</span>
            ))}
            {MARQUEE_ITEMS.map((text, idx) => (
              <span key={`set-${set}-item-dup-${idx}`}>{text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

