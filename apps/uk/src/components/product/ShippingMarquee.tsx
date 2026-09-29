export function ShippingMarquee() {
  return (
    <div
      id="shopify-section-template--24203751129433__scrolling_text_P3gRex"
      className="shopify-section scrolling-text-section shipping-marquee"
      aria-label="Free shipping on all orders"
    >
      <div className="shipping-marquee__track" aria-hidden="true">
        {[0, 1].map((set) => (
          <div className="shipping-marquee__set" key={set}>
            {[0, 1, 2, 3].map((item) => (
              <span key={item}>Free shipping on all orders</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
