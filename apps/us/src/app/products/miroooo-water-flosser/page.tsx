import type { Metadata } from 'next';
import { ProductPage } from '@/components/product/ProductPage';

export const metadata: Metadata = {
  title: 'Miroooo Water Flosser | 60–138 PSI Deep Plaque Precision US',
  description:
    'Engineered with a medical-grade piston pump, 2,000 pulses/min, 4 modes, 320ml tank, and 60-day battery. Free US shipping.',
  alternates: {
    canonical: 'https://miroooo.us/products/miroooo-water-flosser',
  },
  openGraph: {
    title: 'Miroooo Water Flosser | 60–138 PSI Deep Plaque Precision US',
    description:
      'Engineered with a medical-grade piston pump, 2,000 pulses/min, 4 modes, 320ml tank, and 60-day battery. Free US shipping.',
    url: 'https://miroooo.us/products/miroooo-water-flosser',
    images: ['/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp'],
  },
};

export default async function Page(props: {
  searchParams?: Promise<{ color?: string }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Miroooo Water Flosser',
    description:
      'Engineered with a medical-grade piston pump, 2,000 pulses/min, 4 modes, 320ml tank, and 60-day battery. Free US shipping.',
    image: ['https://miroooo.us/assets_ref/flosser/gallery/miroooo-water-flosser-black-white-duo.webp'],
    brand: {
      '@type': 'Brand',
      name: 'Miroooo',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://miroooo.us/products/miroooo-water-flosser',
      price: '69.00',
      priceCurrency: 'USD',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Miroooo',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 3840,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductPage
        key={searchParams?.color || 'default'}
        handle="miroooo-water-flosser"
        searchParams={searchParams}
        isSimpleBuybox={true}
        isHalloween={true}
      />
    </>
  );
}
