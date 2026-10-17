import { productAccordions } from '@/data/productAccordions';

export type ProductAccordionModel = keyof typeof productAccordions;

export function ProductAccordions({ model }: { model: ProductAccordionModel }) {
  const accordions = productAccordions[model] || [];
  return (
    <div className="product__accordions" style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: '14px' }}>
      {accordions.map((accordion, index) => (
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
