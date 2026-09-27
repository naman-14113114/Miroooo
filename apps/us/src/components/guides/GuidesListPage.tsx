import React from 'react';
import Link from 'next/link';
import { getAllGuides } from '@/data/guides';

export function GuidesListPage() {
  const guides = getAllGuides();

  return (
    <div className="guides-list-page-root bg-[#080909] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[11.5px] font-bold uppercase tracking-widest text-white/50 px-3 py-1 rounded-full bg-white/10 border border-white/10">
            Miroooo Guides
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Better brushing, clearly explained.
          </h1>
          <p className="text-base text-white/70 font-light leading-relaxed">
            Practical answers to questions people ask before and after choosing an electric toothbrush—checked against recognised health and safety sources.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="p-8 rounded-3xl bg-[#111213] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-6 group shadow-xl"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                  {guide.kicker} · {guide.readTime}
                </span>
                <h2 className="text-2xl font-bold text-white group-hover:underline leading-snug">
                  <Link href={`/guides/${guide.slug}`}>
                    {guide.title}
                  </Link>
                </h2>
                <p className="text-sm text-white/70 leading-relaxed">
                  {guide.deck}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="text-sm font-bold text-white group-hover:underline flex items-center gap-1.5"
                >
                  <span>Read full guide</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
