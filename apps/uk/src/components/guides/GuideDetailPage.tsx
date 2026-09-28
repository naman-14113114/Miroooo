import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuide } from '@/data/guides';
import { GUIDE_REFERENCE } from '@/data/guideReference';

interface GuideDetailPageProps {
  slug: string;
}

export function GuideDetailPage({ slug }: GuideDetailPageProps) {
  const guide = getGuide(slug);
  const reference = GUIDE_REFERENCE[slug];
  if (!guide || !reference) notFound();

  return (
    <main id="main" style={{ background: '#fff', color: '#111311' }}>
      <header className="guide-hero">
        <div className="guide-shell guide-hero__inner">
          <p className="guide-kicker">{guide.kicker}</p>
          <h1>{guide.title}</h1>
          <p className="guide-deck">{guide.deck}</p>
          <p className="guide-meta">{guide.meta}</p>
        </div>
      </header>
      <div className="guide-shell guide-layout">
        <article className="guide-article" dangerouslySetInnerHTML={{ __html: reference.articleHtml }} />
        <aside className="guide-aside" aria-label="More Miroooo guides and products">
          {reference.asideCards.map((card) => (
            <div className="guide-aside__card" key={`${card.title}-${card.href}`}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <Link href={card.href}>{card.linkText}</Link>
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}
