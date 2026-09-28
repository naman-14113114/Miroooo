import { notFound } from 'next/navigation';
import { POLICY_REFERENCE } from '@/data/policyReference';

interface PolicyPageProps {
  slug: string;
}

export function PolicyPage({ slug }: PolicyPageProps) {
  const content = POLICY_REFERENCE[slug];
  if (!content) notFound();

  return <main id="main" dangerouslySetInnerHTML={{ __html: content }} />;
}
