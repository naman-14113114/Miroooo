import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPolicy } from '@/data/policies';

interface PolicyPageProps {
  slug: string;
}

export function PolicyPage({ slug }: PolicyPageProps) {
  const policy = getPolicy(slug);
  if (!policy) {
    notFound();
  }

  return (
    <div className="policy-page-root bg-[#080909] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 border-b border-white/10 pb-10">
          <span className="text-[11.5px] font-bold uppercase tracking-widest text-white/50 px-3 py-1 rounded-full bg-white/10 border border-white/10">
            Official UK Store Policy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {policy.title}
          </h1>
          <p className="text-xs text-white/50">
            Last Updated: {policy.lastUpdated} · Registered Storefront: Miroooo UK
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-[14.5px] leading-relaxed text-white/80">
          {policy.sections.map((section, idx) => (
            <section key={idx} className="p-6 sm:p-8 rounded-3xl bg-[#111213] border border-white/10 space-y-3 shadow-xl">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {section.heading}
              </h2>
              <div
                className="space-y-3 text-white/75 leading-relaxed [&_strong]:text-white [&_a]:text-white [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}
        </div>

        {/* Support Callout */}
        <div className="p-8 rounded-3xl bg-neutral-200 text-black border border-neutral-300 text-center space-y-3 shadow-2xl">
          <h3 className="text-xl font-bold text-black">Questions about our policies?</h3>
          <p className="text-sm text-neutral-700 max-w-lg mx-auto">
            Our London UK customer care desk is available Monday through Friday, 9am to 5pm GMT to answer any queries regarding delivery, warranty, or returns.
          </p>
          <div className="pt-2">
            <Link
              href="/pages/contact-us"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white font-bold text-xs hover:bg-neutral-800 transition-colors"
            >
              <span>Contact Support Desk</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
