import type { Metadata } from 'next';
import { ProductPage } from '@/components/product/ProductPage';

export const metadata: Metadata = {
  title: 'Miroooo Water Flosser | 60–138 PSI Deep Plaque Precision US',
  description:
    'Engineered with a medical-grade piston pump, 2,000 pulses/min, 4 modes, 320ml tank, and 60-day battery. Free US shipping.',
  alternates: {
    canonical: 'https://miroooo.us/products/miroooo-water-flosser',
  },
};

export default async function Page(props: {
  searchParams?: Promise<{ color?: string }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  return (
    <ProductPage
      key={searchParams?.color || 'default'}
      handle="miroooo-water-flosser"
      searchParams={searchParams}
      isSimpleBuybox={true}
    />
  );
}
