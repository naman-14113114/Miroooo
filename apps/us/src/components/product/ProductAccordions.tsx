import { productAccordions } from '@/data/productAccordions';

export function ProductAccordions({ model }: { model: 'x1' | 'x2' }) {
  return (
    <div className="product__accordions" style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: '14px' }}>
      {productAccordions[model].map((accordion, index) => (
        <details
          key={`${model}-${index}`}
          className="product__accordion details"
          style={accordion.style}
          dangerouslySetInnerHTML={{ __html: accordion.html }}
        />
      ))}
    </div>
  );
}
