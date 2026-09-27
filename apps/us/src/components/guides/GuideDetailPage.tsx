import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuide } from '@/data/guides';

interface GuideDetailPageProps {
  slug: string;
}

export function GuideDetailPage({ slug }: GuideDetailPageProps) {
  const guide = getGuide(slug);
  if (!guide) {
    notFound();
  }

  return (
    <div className="guide-detail-page bg-[#080909] text-white min-h-screen py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumbs */}
        <nav className="text-xs text-white/50 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-white">Guides</Link>
          <span>/</span>
          <span className="text-white/80 truncate">{guide.title}</span>
        </nav>

        {/* Header */}
        <header className="space-y-4 border-b border-white/10 pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50">
            {guide.kicker}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {guide.title}
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            {guide.deck}
          </p>
          <p className="text-xs text-white/40 pt-1">
            {guide.meta}
          </p>
        </header>

        {/* Short Answer Callout Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-200 text-black border border-neutral-300 space-y-2 shadow-xl">
          <strong className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
            Short Answer
          </strong>
          <p className="text-base font-medium text-black leading-relaxed">
            {guide.shortAnswer}
          </p>
        </div>

        {/* Main Article Content */}
        <article
          className="guide-article-content space-y-6 text-[15px] text-white/80 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:pt-6 [&_p]:leading-relaxed [&_strong]:text-white"
          dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
        />

        {/* Next Guide & Shop Navigation */}
        <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#111213] border border-white/10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50 block">
              Compare Brushes
            </span>
            <strong className="text-lg font-bold text-white block">
              See X1 and X2 features and US pricing together.
            </strong>
            <Link
              href="/shop"
              className="inline-block pt-2 text-sm font-bold text-white underline hover:opacity-80"
            >
              Visit Miroooo Shop →
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-[#111213] border border-white/10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50 block">
              Next Guide
            </span>
            <strong className="text-lg font-bold text-white block">
              Continue reading practical routine advice.
            </strong>
            <Link
              href={guide.nextGuideHref}
              className="inline-block pt-2 text-sm font-bold text-white underline hover:opacity-80"
            >
              {guide.nextGuideTitle}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
